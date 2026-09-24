import express from 'express';
import {
  getAssessments,
  getAssessmentById,
  submitAssessment,
  getAssessmentHistory
} from '../controllers/assessmentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Assessment catalog
router.get('/', getAssessments);

// User assessment history (must come before /:id)
router.get('/history/user', protect, getAssessmentHistory);

// Single assessment details and submission
router.get('/:id', getAssessmentById);
router.post('/:id/submit', submitAssessment);

export default router;
