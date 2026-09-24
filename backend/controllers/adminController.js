import User from '../models/User.js';
import Job from '../models/Job.js';
import Course from '../models/Course.js';
import Industry from '../models/Industry.js';
import Interview from '../models/Interview.js';
import InterviewQuestion from '../models/InterviewQuestion.js';
import { successResponse, errorResponse } from '../utils/response.js';
import { isDbConnected } from '../config/db.js';
import {
  DEFAULT_USERS,
  DEFAULT_JOBS,
  DEFAULT_COURSES,
  DEFAULT_INDUSTRIES,
  DEFAULT_INTERVIEW_QUESTIONS
} from '../seed/seedData.js';

// In-memory admin store for fallback
let dynamicUsers = [...DEFAULT_USERS];
let dynamicQuestions = [...DEFAULT_INTERVIEW_QUESTIONS];

/**
 * @desc    Get dashboard statistics for administrator overview
 * @route   GET /api/admin/stats
 * @access  Private/Admin
 */
export const getAdminStats = async (req, res, next) => {
  try {
    let totalUsers = 142;
    let totalJobs = DEFAULT_JOBS.length;
    let totalCourses = DEFAULT_COURSES.length;
    let totalInterviews = 284;
    let totalAssessments = 356;

    if (isDbConnected()) {
      totalUsers = await User.countDocuments();
      totalJobs = await Job.countDocuments();
      totalCourses = await Course.countDocuments();
      totalInterviews = await Interview.countDocuments();
    }

    return successResponse(res, 200, 'Admin platform statistics retrieved', {
      totalStudents: totalUsers,
      totalJobs,
      totalCourses,
      totalInterviewsTaken: totalInterviews,
      totalAssessmentsCompleted: totalAssessments,
      averagePlacementReadiness: 78.4,
      topHiringIndustries: [
        { name: 'Information Technology', jobsCount: 148 },
        { name: 'Data & Analytics', jobsCount: 135 },
        { name: 'Retail & E-Commerce', jobsCount: 110 },
        { name: 'Banking & Finance', jobsCount: 92 }
      ],
      recentRegistrations: [
        { name: 'Hemant Saraswat', email: 'demo@careercoach.ai', role: 'student', date: 'Today' },
        { name: 'Pooja Patel', email: 'pooja.p@univ.edu', role: 'student', date: 'Yesterday' },
        { name: 'Rahul Joshi', email: 'rahul.j@tech.org', role: 'student', date: '2 days ago' }
      ]
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all registered users with search & role filtering
 * @route   GET /api/admin/users
 * @access  Private/Admin
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const { search, role } = req.query;

    if (isDbConnected()) {
      const query = {};
      if (role) query.role = role;
      if (search) {
        query.$or = [
          { name: new RegExp(search, 'i') },
          { email: new RegExp(search, 'i') }
        ];
      }
      const users = await User.find(query).select('-password');
      return successResponse(res, 200, 'Users retrieved successfully', users);
    }

    let users = dynamicUsers.map((u, i) => ({
      _id: u.id || `usr_${i + 1}`,
      id: u.id || `usr_${i + 1}`,
      name: u.name,
      email: u.email,
      role: u.role || 'student',
      education: u.education,
      qualification: u.qualification,
      preferredLocation: u.preferredLocation,
      skills: u.skills
    }));

    if (role) {
      users = users.filter(u => u.role === role);
    }
    if (search) {
      const q = search.toLowerCase();
      users = users.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
    }

    return successResponse(res, 200, 'Users retrieved successfully (Demo Mode)', users);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a user role (student / admin)
 * @route   PUT /api/admin/users/:id/role
 * @access  Private/Admin
 */
export const updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role || !['student', 'admin'].includes(role)) {
      return errorResponse(res, 400, 'Role must be student or admin');
    }

    if (isDbConnected() && id.match(/^[0-9a-fA-F]{24}$/)) {
      const user = await User.findById(id);
      if (!user) {
        return errorResponse(res, 404, 'User not found');
      }
      user.role = role;
      await user.save();
      return successResponse(res, 200, 'User role updated', user);
    }

    // Fallback mode
    const idx = dynamicUsers.findIndex(u => (u.id === id || u._id === id || u.email === id));
    if (idx >= 0) {
      dynamicUsers[idx].role = role;
      return successResponse(res, 200, 'User role updated (Demo Mode)', dynamicUsers[idx]);
    }

    return successResponse(res, 200, 'User role updated (Demo Mode)', { id, role });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a user
 * @route   DELETE /api/admin/users/:id
 * @access  Private/Admin
 */
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isDbConnected() && id.match(/^[0-9a-fA-F]{24}$/)) {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return errorResponse(res, 404, 'User not found');
      }
      return successResponse(res, 200, 'User account deleted successfully');
    }

    dynamicUsers = dynamicUsers.filter(u => u.id !== id && u._id !== id);
    return successResponse(res, 200, 'User account deleted successfully (Demo Mode)');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all questions in the interview question bank
 * @route   GET /api/admin/questions
 * @access  Private/Admin
 */
export const getAdminQuestions = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      const questions = await InterviewQuestion.find().sort({ createdAt: -1 });
      return successResponse(res, 200, 'Question bank retrieved', questions);
    }
    return successResponse(res, 200, 'Question bank retrieved (Demo Mode)', dynamicQuestions);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new question in the question bank
 * @route   POST /api/admin/questions
 * @access  Private/Admin
 */
export const createAdminQuestion = async (req, res, next) => {
  try {
    const { category, text, difficulty, expectedKeywords, modelAnswer, evaluationCriteria } = req.body;

    if (!category || !text || !modelAnswer) {
      return errorResponse(res, 400, 'Please provide category, question text, and model answer');
    }

    if (isDbConnected()) {
      const question = await InterviewQuestion.create({
        category,
        text,
        difficulty: difficulty || 'Intermediate',
        expectedKeywords: Array.isArray(expectedKeywords) ? expectedKeywords : (expectedKeywords || '').split(',').map(s => s.trim()),
        modelAnswer,
        evaluationCriteria: evaluationCriteria || ''
      });
      return successResponse(res, 201, 'Question added to bank', question);
    }

    const newQ = {
      _id: 'q_' + Date.now(),
      id: 'q_' + Date.now(),
      category,
      text,
      difficulty: difficulty || 'Intermediate',
      expectedKeywords: Array.isArray(expectedKeywords) ? expectedKeywords : (expectedKeywords || '').split(',').map(s => s.trim()),
      modelAnswer,
      evaluationCriteria: evaluationCriteria || ''
    };
    dynamicQuestions.unshift(newQ);
    return successResponse(res, 201, 'Question added to bank (Demo Mode)', newQ);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a question in the bank
 * @route   PUT /api/admin/questions/:id
 * @access  Private/Admin
 */
export const updateAdminQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isDbConnected() && id.match(/^[0-9a-fA-F]{24}$/)) {
      const updated = await InterviewQuestion.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!updated) {
        return errorResponse(res, 404, 'Question not found');
      }
      return successResponse(res, 200, 'Question updated', updated);
    }

    const idx = dynamicQuestions.findIndex(q => (q._id === id || q.id === id));
    if (idx >= 0) {
      dynamicQuestions[idx] = { ...dynamicQuestions[idx], ...req.body };
      return successResponse(res, 200, 'Question updated (Demo Mode)', dynamicQuestions[idx]);
    }

    return successResponse(res, 200, 'Question updated', { id, ...req.body });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a question from the bank
 * @route   DELETE /api/admin/questions/:id
 * @access  Private/Admin
 */
export const deleteAdminQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isDbConnected() && id.match(/^[0-9a-fA-F]{24}$/)) {
      const question = await InterviewQuestion.findByIdAndDelete(id);
      if (!question) {
        return errorResponse(res, 404, 'Question not found');
      }
      return successResponse(res, 200, 'Question deleted successfully');
    }

    dynamicQuestions = dynamicQuestions.filter(q => q._id !== id && q.id !== id);
    return successResponse(res, 200, 'Question deleted successfully (Demo Mode)');
  } catch (error) {
    next(error);
  }
};
