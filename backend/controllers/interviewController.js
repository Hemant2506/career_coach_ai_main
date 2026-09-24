import Interview from '../models/Interview.js';
import InterviewQuestion from '../models/InterviewQuestion.js';
import UserProgress from '../models/UserProgress.js';
import { successResponse, errorResponse } from '../utils/response.js';
import { isDbConnected } from '../config/db.js';
import { evaluateInterviewAnswer, generateAggregatedResult } from '../services/aiService.js';
import { DEFAULT_INTERVIEW_QUESTIONS } from '../seed/seedData.js';

// In-memory store for fallback mode when MongoDB is offline
const inMemoryInterviews = new Map();

/**
 * @desc    Start a new AI mock interview session
 * @route   POST /api/interviews/start
 * @access  Private (or Public with guest/demo token)
 */
export const startInterview = async (req, res, next) => {
  try {
    const {
      category = 'Software Developer',
      difficulty = 'Intermediate',
      numberOfQuestions = 5,
      answerMode = 'text'
    } = req.body;

    const userId = req.user?._id || req.user?.id || 'demo_student';

    let selectedQuestions = [];

    if (isDbConnected()) {
      // Find questions matching category
      let questionsFromDb = await InterviewQuestion.find({
        category: { $regex: new RegExp(category, 'i') }
      });

      if (!questionsFromDb || questionsFromDb.length === 0) {
        questionsFromDb = await InterviewQuestion.find();
      }

      // Shuffle & take numberOfQuestions
      const shuffled = questionsFromDb.sort(() => 0.5 - Math.random());
      selectedQuestions = shuffled.slice(0, Number(numberOfQuestions)).map(q => ({
        questionId: q._id.toString(),
        text: q.text,
        category: q.category,
        difficulty: q.difficulty,
        expectedKeywords: q.expectedKeywords || [],
        modelAnswer: q.modelAnswer
      }));

      // Create new interview session in DB
      const interview = await Interview.create({
        userId: userId.toString().startsWith('user_') ? new mongoose.Types.ObjectId() : userId,
        category,
        difficulty,
        numberOfQuestions: selectedQuestions.length,
        answerMode,
        status: 'in-progress',
        questions: selectedQuestions,
        answers: []
      });

      return successResponse(res, 201, 'Interview session initialized', {
        id: interview._id,
        category: interview.category,
        difficulty: interview.difficulty,
        numberOfQuestions: interview.numberOfQuestions,
        answerMode: interview.answerMode,
        status: interview.status,
        questions: interview.questions.map(q => ({
          questionId: q.questionId,
          text: q.text,
          category: q.category,
          difficulty: q.difficulty
        }))
      });
    }

    // In-memory fallback mode
    const matching = DEFAULT_INTERVIEW_QUESTIONS.filter(
      q => q.category.toLowerCase().includes(category.toLowerCase()) || category.toLowerCase().includes(q.category.toLowerCase())
    );
    const pool = matching.length > 0 ? matching : DEFAULT_INTERVIEW_QUESTIONS;
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    selectedQuestions = shuffled.slice(0, Number(numberOfQuestions)).map((q, idx) => ({
      questionId: `q_${Date.now()}_${idx}`,
      text: q.text,
      category: q.category,
      difficulty: q.difficulty,
      expectedKeywords: q.expectedKeywords || [],
      modelAnswer: q.modelAnswer
    }));

    const mockId = 'int_' + Date.now();
    const session = {
      _id: mockId,
      id: mockId,
      userId,
      category,
      difficulty,
      numberOfQuestions: selectedQuestions.length,
      answerMode,
      status: 'in-progress',
      questions: selectedQuestions,
      answers: [],
      createdAt: new Date().toISOString()
    };

    inMemoryInterviews.set(mockId, session);

    return successResponse(res, 201, 'Interview session initialized (Demo Mode)', {
      id: mockId,
      category,
      difficulty,
      numberOfQuestions: selectedQuestions.length,
      answerMode,
      status: 'in-progress',
      questions: selectedQuestions.map(q => ({
        questionId: q.questionId,
        text: q.text,
        category: q.category,
        difficulty: q.difficulty
      }))
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Submit an answer to an interview question & get instant AI evaluation
 * @route   POST /api/interviews/:id/answer
 * @access  Private
 */
export const submitAnswer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { questionId, text } = req.body;

    if (!questionId || text === undefined) {
      return errorResponse(res, 400, 'Please provide questionId and answer text');
    }

    let interview = null;

    if (isDbConnected()) {
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        interview = await Interview.findById(id);
      }
    }

    if (!interview) {
      interview = inMemoryInterviews.get(id);
    }

    if (!interview) {
      // Create a temporary mock interview if requested
      interview = {
        id,
        questions: [{ questionId, text: 'Technical question prompt' }],
        answers: []
      };
      inMemoryInterviews.set(id, interview);
    }

    // Locate question metadata
    const question = interview.questions.find(q => q.questionId === questionId || q._id?.toString() === questionId);
    const expectedKeywords = question?.expectedKeywords || ['architecture', 'performance', 'design', 'clean code'];
    const modelAnswer = question?.modelAnswer || 'A structured engineering explanation with principles and examples.';

    // Run AI Evaluation service
    const evaluation = await evaluateInterviewAnswer({
      questionText: question?.text || '',
      answerText: text,
      expectedKeywords,
      modelAnswer
    });

    const answerObj = {
      questionId,
      questionText: question?.text || 'Interview Question',
      text,
      evaluation
    };

    // Store in DB or Memory
    if (isDbConnected() && interview.save) {
      const existingIdx = interview.answers.findIndex(a => a.questionId === questionId);
      if (existingIdx >= 0) {
        interview.answers[existingIdx] = answerObj;
      } else {
        interview.answers.push(answerObj);
      }
      await interview.save();
    } else {
      const existingIdx = interview.answers.findIndex(a => a.questionId === questionId);
      if (existingIdx >= 0) {
        interview.answers[existingIdx] = answerObj;
      } else {
        interview.answers.push(answerObj);
      }
      inMemoryInterviews.set(id, interview);
    }

    return successResponse(res, 200, 'Answer evaluated by AI', {
      questionId,
      evaluation
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Finish interview session and compute final aggregated report
 * @route   POST /api/interviews/:id/finish
 * @access  Private
 */
export const finishInterview = async (req, res, next) => {
  try {
    const { id } = req.params;

    let interview = null;
    if (isDbConnected()) {
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        interview = await Interview.findById(id);
      }
    }

    if (!interview) {
      interview = inMemoryInterviews.get(id);
    }

    if (!interview) {
      // Create mock result for display
      const mockResult = generateAggregatedResult([], 'Software Developer');
      return successResponse(res, 200, 'Interview concluded', {
        id,
        status: 'completed',
        result: mockResult
      });
    }

    // Generate comprehensive aggregate report
    const aggregated = generateAggregatedResult(interview.answers || [], interview.category);
    aggregated.date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    if (isDbConnected() && interview.save) {
      interview.status = 'completed';
      interview.result = aggregated;
      interview.completedAt = new Date();
      await interview.save();

      // Update User progress if present
      if (req.user?._id) {
        try {
          await UserProgress.create({
            userId: req.user._id,
            actionType: 'interview_completed',
            details: {
              role: interview.category,
              score: aggregated.totalScore
            }
          });
        } catch (e) {
          // non-blocking
        }
      }
    } else {
      interview.status = 'completed';
      interview.result = aggregated;
      interview.completedAt = new Date();
      inMemoryInterviews.set(id, interview);
    }

    return successResponse(res, 200, 'Interview successfully completed with AI analysis', {
      id: interview._id || interview.id,
      category: interview.category,
      difficulty: interview.difficulty,
      numberOfQuestions: interview.numberOfQuestions,
      status: 'completed',
      result: aggregated,
      answers: interview.answers
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get interview session by ID
 * @route   GET /api/interviews/:id
 * @access  Private
 */
export const getInterviewById = async (req, res, next) => {
  try {
    const { id } = req.params;

    let interview = null;
    if (isDbConnected()) {
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        interview = await Interview.findById(id);
      }
    }

    if (!interview) {
      interview = inMemoryInterviews.get(id);
    }

    if (!interview) {
      return errorResponse(res, 404, 'Interview session not found');
    }

    return successResponse(res, 200, 'Interview session retrieved', interview);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get interview history for current user
 * @route   GET /api/interviews/history
 * @access  Private
 */
export const getInterviewHistory = async (req, res, next) => {
  try {
    const userId = req.user?._id || req.user?.id;

    if (isDbConnected() && userId) {
      const history = await Interview.find({ userId, status: 'completed' })
        .sort({ createdAt: -1 })
        .limit(20);

      if (history.length > 0) {
        return successResponse(res, 200, 'Interview history retrieved', history);
      }
    }

    // Default historical mock interviews
    const defaultHistory = [
      {
        id: 'int_hist_5',
        date: '23 Sep 2026',
        role: 'Software Developer',
        difficulty: 'Intermediate',
        score: 82,
        breakdown: { technical: 85, communication: 90, relevance: 80, grammar: 88, completeness: 80 },
        strengths: ['Clear explanation of OOP principles', 'Strong algorithm logic', 'Polite tone'],
        weaknesses: ['Add more concrete production examples', 'Mention edge cases in distributed systems']
      },
      {
        id: 'int_hist_4',
        date: '20 Sep 2026',
        role: 'Web Developer',
        difficulty: 'Intermediate',
        score: 78,
        breakdown: { technical: 76, communication: 82, relevance: 78, grammar: 85, completeness: 75 },
        strengths: ['Good understanding of React hooks', 'Explained state lifecycles clearly'],
        weaknesses: ['Elaborate more on browser event loop microtasks']
      },
      {
        id: 'int_hist_3',
        date: '15 Sep 2026',
        role: 'Software Developer',
        difficulty: 'Beginner',
        score: 74,
        breakdown: { technical: 72, communication: 78, relevance: 75, grammar: 82, completeness: 70 },
        strengths: ['Confident delivery', 'Accurate Java collection answers'],
        weaknesses: ['Deepen knowledge of database indexing']
      }
    ];

    return successResponse(res, 200, 'Interview history retrieved', defaultHistory);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get question bank for practice
 * @route   GET /api/interviews/questions
 * @access  Public
 */
export const getInterviewQuestions = async (req, res, next) => {
  try {
    const { category, difficulty } = req.query;

    let questions = [];
    if (isDbConnected()) {
      const query = {};
      if (category) query.category = new RegExp(category, 'i');
      if (difficulty) query.difficulty = difficulty;
      questions = await InterviewQuestion.find(query);
    }

    if (!questions || questions.length === 0) {
      questions = DEFAULT_INTERVIEW_QUESTIONS;
      if (category) {
        questions = questions.filter(q => q.category.toLowerCase().includes(category.toLowerCase()));
      }
      if (difficulty) {
        questions = questions.filter(q => q.difficulty.toLowerCase() === difficulty.toLowerCase());
      }
    }

    return successResponse(res, 200, 'Interview questions retrieved', questions);
  } catch (error) {
    next(error);
  }
};
