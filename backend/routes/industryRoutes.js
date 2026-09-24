import express from 'express';
import {
  getIndustries,
  getIndustryById,
  getIndustryJobs,
  getIndustryCourses
} from '../controllers/industryController.js';

const router = express.Router();

// Industry catalog
router.get('/', getIndustries);

// Industry details
router.get('/:id', getIndustryById);

// Industry specific jobs & courses
router.get('/:id/jobs', getIndustryJobs);
router.get('/:id/courses', getIndustryCourses);

export default router;
