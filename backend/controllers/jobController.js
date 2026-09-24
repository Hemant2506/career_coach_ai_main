import Job from '../models/Job.js';
import { successResponse, errorResponse } from '../utils/response.js';
import { isDbConnected } from '../config/db.js';
import { DEFAULT_JOBS } from '../seed/seedData.js';

/**
 * @desc    Get jobs with multi-parameter search and filters
 * @route   GET /api/jobs
 * @access  Public
 */
export const getJobs = async (req, res, next) => {
  try {
    const {
      search,
      industry,
      location,
      role,
      experience,
      qualification,
      jobType,
      minSalary
    } = req.query;

    let jobs = [];

    if (isDbConnected()) {
      const query = { status: 'active' };

      if (industry && industry !== 'All') {
        query.industry = industry;
      }
      if (location && location !== 'All') {
        query.location = { $regex: location, $options: 'i' };
      }
      if (role && role !== 'All') {
        query.roleCategory = role;
      }
      if (experience && experience !== 'All') {
        query.experience = experience;
      }
      if (jobType && jobType !== 'All') {
        query.jobType = jobType;
      }
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { company: { $regex: search, $options: 'i' } },
          { skills: { $regex: search, $options: 'i' } }
        ];
      }

      jobs = await Job.find(query).sort({ createdAt: -1 });
    }

    if (!jobs || jobs.length === 0) {
      // In-memory filter on mock seed data
      jobs = DEFAULT_JOBS.filter(job => {
        if (industry && industry !== 'All' && job.industry !== industry) return false;
        if (location && location !== 'All' && !job.location.toLowerCase().includes(location.toLowerCase())) return false;
        if (role && role !== 'All' && job.roleCategory !== role) return false;
        if (experience && experience !== 'All' && job.experience !== experience) return false;
        if (jobType && jobType !== 'All' && job.jobType !== jobType) return false;
        if (search) {
          const q = search.toLowerCase();
          const matchTitle = job.title.toLowerCase().includes(q);
          const matchComp = job.company.toLowerCase().includes(q);
          const matchSkills = job.skills.some(s => s.toLowerCase().includes(q));
          if (!matchTitle && !matchComp && !matchSkills) return false;
        }
        return true;
      });
    }

    return successResponse(res, 200, 'Jobs retrieved successfully', {
      count: jobs.length,
      jobs
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get job by ID
 * @route   GET /api/jobs/:id
 * @access  Public
 */
export const getJobById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let job = null;

    if (isDbConnected() && id.match(/^[0-9a-fA-F]{24}$/)) {
      job = await Job.findById(id);
    }

    if (!job) {
      job = DEFAULT_JOBS.find(j => j.id === id || j._id === id);
    }

    if (!job) {
      return errorResponse(res, 404, 'Job vacancy not found');
    }

    return successResponse(res, 200, 'Job details retrieved', job);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new job (Admin only)
 * @route   POST /api/jobs
 * @access  Private/Admin
 */
export const createJob = async (req, res, next) => {
  try {
    const jobData = {
      ...req.body,
      createdBy: req.user?._id
    };

    if (isDbConnected()) {
      const newJob = await Job.create(jobData);
      return successResponse(res, 201, 'Job created successfully', newJob);
    }

    const mockJob = {
      id: 'job_' + Date.now(),
      ...jobData,
      postedDate: 'Just now'
    };
    return successResponse(res, 201, 'Job created successfully (Demo Mode)', mockJob);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update job (Admin only)
 * @route   PUT /api/jobs/:id
 * @access  Private/Admin
 */
export const updateJob = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isDbConnected() && id.match(/^[0-9a-fA-F]{24}$/)) {
      const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!updatedJob) {
        return errorResponse(res, 404, 'Job not found to update');
      }
      return successResponse(res, 200, 'Job updated successfully', updatedJob);
    }

    return successResponse(res, 200, 'Job updated successfully (Demo Mode)', { id, ...req.body });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete job (Admin only)
 * @route   DELETE /api/jobs/:id
 * @access  Private/Admin
 */
export const deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isDbConnected() && id.match(/^[0-9a-fA-F]{24}$/)) {
      const job = await Job.findByIdAndDelete(id);
      if (!job) {
        return errorResponse(res, 404, 'Job not found to delete');
      }
    }

    return successResponse(res, 200, 'Job deleted successfully', { id });
  } catch (error) {
    next(error);
  }
};
