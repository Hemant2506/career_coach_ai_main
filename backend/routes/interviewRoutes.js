import express from 'express';
import {
  startInterview,
  submitAnswer,
  finishInterview,
  getInterviewById,
  getInterviewHistory,
  getInterviewQuestions
} from '../controllers/interviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Question bank
router.get('/questions', getInterviewQuestions);

// Historical interviews for student
router.get('/history', protect, getInterviewHistory);

// Start new mock interview session
router.post('/start', protect, startInterview);

// Answer individual question with AI evaluation
router.post('/:id/answer', protect, submitAnswer);

// Complete interview and generate aggregated report
router.post('/:id/finish', protect, finishInterview);
router.post('/:id/complete', protect, finishInterview);

// Retrieve interview session details
router.get('/:id', protect, getInterviewById);

export default router;
