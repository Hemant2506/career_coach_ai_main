import Assessment from '../models/Assessment.js';
import { successResponse, errorResponse } from '../utils/response.js';
import { isDbConnected } from '../config/db.js';
import { DEFAULT_ASSESSMENTS } from '../seed/seedData.js';

/**
 * @desc    Get all available assessments
 * @route   GET /api/assessments
 * @access  Public
 */
export const getAssessments = async (req, res, next) => {
  try {
    let assessments = [];
    if (isDbConnected()) {
      assessments = await Assessment.find().select('-questions.correctAnswer');
    }

    if (!assessments || assessments.length === 0) {
      assessments = DEFAULT_ASSESSMENTS;
    }

    return successResponse(res, 200, 'Assessments retrieved', assessments);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get assessment by ID with questions
 * @route   GET /api/assessments/:id
 * @access  Public
 */
export const getAssessmentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let assessment = null;

    if (isDbConnected()) {
      assessment = id.match(/^[0-9a-fA-F]{24}$/) ? await Assessment.findById(id) : await Assessment.findOne({ slug: id });
    }

    if (!assessment) {
      assessment = DEFAULT_ASSESSMENTS.find(a => a.id === id || a.slug === id);
    }

    if (!assessment) {
      return errorResponse(res, 404, 'Assessment not found');
    }

    return successResponse(res, 200, 'Assessment questions retrieved', assessment);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Submit assessment answers and calculate diagnostic score
 * @route   POST /api/assessments/:id/submit
 * @access  Public
 */
export const submitAssessment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { answers = {} } = req.body; // Map: { [questionIndex]: selectedOptionIndex }

    let assessment = null;
    if (isDbConnected()) {
      assessment = id.match(/^[0-9a-fA-F]{24}$/) ? await Assessment.findById(id) : await Assessment.findOne({ slug: id });
    }

    if (!assessment) {
      assessment = DEFAULT_ASSESSMENTS.find(a => a.id === id || a.slug === id) || DEFAULT_ASSESSMENTS[0];
    }

    const questions = assessment.questions || [];
    let correctCount = 0;
    const reviewDetails = [];

    questions.forEach((q, idx) => {
      const userChoice = answers[idx] !== undefined ? answers[idx] : answers[q.id || q._id];
      const isCorrect = userChoice === (q.correctAnswer ?? q.correctIndex);
      if (isCorrect) correctCount++;

      reviewDetails.push({
        question: q.question || q.text,
        topic: q.topic || 'General',
        userChoice,
        correctAnswer: q.correctAnswer ?? q.correctIndex,
        isCorrect,
        explanation: q.explanation || ''
      });
    });

    const total = questions.length || 10;
    const score = Math.round((correctCount / total) * 100);
    const incorrectCount = total - correctCount;

    const resultPayload = {
      assessmentId: assessment._id || assessment.id,
      title: assessment.title,
      score,
      percentage: score,
      correctCount,
      incorrectCount,
      totalCount: total,
      status: score >= 60 ? 'Passed' : 'Needs Practice',
      strengths: assessment.strongTopicsPool || ['Core Concepts', 'Syntax'],
      weaknesses: assessment.weakTopicsPool || ['Advanced Applications'],
      recommendedSkills: ['React State Lifecycle', 'Query Tuning', 'Asynchronous Operations'],
      submittedAt: new Date().toISOString(),
      reviewDetails
    };

    return successResponse(res, 200, 'Assessment evaluated successfully', resultPayload);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get assessment history
 * @route   GET /api/assessments/history
 * @access  Public
 */
export const getAssessmentHistory = async (req, res, next) => {
  try {
    return successResponse(res, 200, 'Assessment history retrieved', [
      {
        id: 'ass_prev_1',
        title: 'SQL & Database Optimization',
        score: 85,
        total: 100,
        date: 'Yesterday',
        status: 'Passed'
      },
      {
        id: 'ass_prev_2',
        title: 'JavaScript Core Architecture',
        score: 80,
        total: 100,
        date: '3 days ago',
        status: 'Passed'
      }
    ]);
  } catch (error) {
    next(error);
  }
};
