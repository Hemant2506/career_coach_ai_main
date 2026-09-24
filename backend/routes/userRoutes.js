import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  changeUserPassword,
  getSavedJobs,
  saveJob,
  removeSavedJob,
  getUserPerformance
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Profile endpoints
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Password change
router.put('/change-password', protect, changeUserPassword);

// Saved jobs endpoints
router.route('/saved-jobs')
  .get(protect, getSavedJobs);

router.route('/saved-jobs/:jobId')
  .post(protect, saveJob)
  .delete(protect, removeSavedJob);

// Performance analytics
router.get('/performance', protect, getUserPerformance);

export default router;
