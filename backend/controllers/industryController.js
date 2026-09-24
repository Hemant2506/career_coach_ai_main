import Industry from '../models/Industry.js';
import Job from '../models/Job.js';
import Course from '../models/Course.js';
import { successResponse, errorResponse } from '../utils/response.js';
import { isDbConnected } from '../config/db.js';
import { DEFAULT_INDUSTRIES, DEFAULT_JOBS, DEFAULT_COURSES } from '../seed/seedData.js';

/**
 * @desc    Get all industries
 * @route   GET /api/industries
 * @access  Public
 */
export const getIndustries = async (req, res, next) => {
  try {
    let industries = [];
    if (isDbConnected()) {
      industries = await Industry.find();
    }
    if (!industries || industries.length === 0) {
      industries = DEFAULT_INDUSTRIES;
    }
    return successResponse(res, 200, 'Industries retrieved', industries);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get industry by ID or Slug
 * @route   GET /api/industries/:id
 * @access  Public
 */
export const getIndustryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let industry = null;

    if (isDbConnected()) {
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        industry = await Industry.findById(id);
      } else {
        industry = await Industry.findOne({ slug: id });
      }
    }

    if (!industry) {
      industry = DEFAULT_INDUSTRIES.find(ind => ind.id === id || ind.slug === id);
    }

    if (!industry) {
      return errorResponse(res, 404, 'Industry not found');
    }

    return successResponse(res, 200, 'Industry details retrieved', industry);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get jobs under an industry
 * @route   GET /api/industries/:id/jobs
 * @access  Public
 */
export const getIndustryJobs = async (req, res, next) => {
  try {
    const { id } = req.params;
    let jobs = [];

    if (isDbConnected()) {
      jobs = await Job.find({ industry: id, status: 'active' });
    }

    if (!jobs || jobs.length === 0) {
      jobs = DEFAULT_JOBS.filter(j => j.industry === id);
    }

    return successResponse(res, 200, 'Industry jobs retrieved', jobs);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get recommended courses for an industry
 * @route   GET /api/industries/:id/courses
 * @access  Public
 */
export const getIndustryCourses = async (req, res, next) => {
  try {
    const { id } = req.params;
    let industry = null;

    if (isDbConnected()) {
      industry = await Industry.findOne({ slug: id }) || await Industry.findById(id).catch(() => null);
    }

    if (!industry) {
      industry = DEFAULT_INDUSTRIES.find(ind => ind.id === id || ind.slug === id) || DEFAULT_INDUSTRIES[0];
    }

    const skills = industry?.requiredSkills || [];

    let courses = [];
    if (isDbConnected()) {
      courses = await Course.find();
    }
    if (!courses || courses.length === 0) {
      courses = DEFAULT_COURSES;
    }

    const matchedCourses = courses.filter(c =>
      skills.some(skill => c.title.toLowerCase().includes(skill.toLowerCase()))
    ).slice(0, 4);

    return successResponse(res, 200, 'Industry courses retrieved', matchedCourses.length > 0 ? matchedCourses : courses.slice(0, 3));
  } catch (error) {
    next(error);
  }
};
