import Career from '../models/Career.js';
import { successResponse, errorResponse } from '../utils/response.js';
import { isDbConnected } from '../config/db.js';
import { calculateCareerRecommendations, performSkillGapAnalysis } from '../services/recommendationService.js';
import { DEFAULT_CAREERS } from '../seed/seedData.js';

/**
 * @desc    Get all careers
 * @route   GET /api/careers
 * @access  Public
 */
export const getCareers = async (req, res, next) => {
  try {
    let careers = [];
    if (isDbConnected()) {
      careers = await Career.find().populate('recommendedCourses');
    }
    if (!careers || careers.length === 0) {
      careers = DEFAULT_CAREERS;
    }
    return successResponse(res, 200, 'Careers retrieved successfully', careers);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get career by ID or Slug
 * @route   GET /api/careers/:id
 * @access  Public
 */
export const getCareerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let career = null;

    if (isDbConnected()) {
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        career = await Career.findById(id).populate('recommendedCourses');
      } else {
        career = await Career.findOne({ slug: id });
      }
    }

    if (!career) {
      career = DEFAULT_CAREERS.find(c => c.id === id || c.slug === id || c.title.toLowerCase().replace(/\s+/g, '-') === id);
    }

    if (!career) {
      return errorResponse(res, 404, 'Career path not found');
    }

    return successResponse(res, 200, 'Career details retrieved', career);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Recommend suitable careers based on student preferences
 * @route   POST /api/careers/recommend
 * @access  Public
 */
export const recommendCareers = async (req, res, next) => {
  try {
    let careers = [];
    if (isDbConnected()) {
      careers = await Career.find();
    }
    if (!careers || careers.length === 0) {
      careers = DEFAULT_CAREERS;
    }

    const recommendations = calculateCareerRecommendations(careers, req.body);
    return successResponse(res, 200, 'Recommendations generated successfully', recommendations);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Analyze student skill gap against target career
 * @route   POST /api/skills/analyze
 * @access  Public
 */
export const analyzeSkillGap = async (req, res, next) => {
  try {
    const { careerId, userSkills = [] } = req.body;

    if (!careerId) {
      return errorResponse(res, 400, 'Please provide target careerId');
    }

    let career = null;
    if (isDbConnected()) {
      if (careerId.match(/^[0-9a-fA-F]{24}$/)) {
        career = await Career.findById(careerId);
      } else {
        career = await Career.findOne({ slug: careerId });
      }
    }

    if (!career) {
      career = DEFAULT_CAREERS.find(c => c.id === careerId || c.slug === careerId);
    }

    if (!career) {
      return errorResponse(res, 404, 'Career not found for skill gap analysis');
    }

    const analysis = performSkillGapAnalysis(career, userSkills);
    return successResponse(res, 200, 'Skill gap analysis completed', analysis);
  } catch (error) {
    next(error);
  }
};
