import express from 'express';
import {
  getAdminStats,
  getAllUsers,
  updateUserRole,
  deleteUser,
  getAdminQuestions,
  createAdminQuestion,
  updateAdminQuestion,
  deleteAdminQuestion
} from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = express.Router();

// All routes here require valid JWT & admin role
router.use(protect, adminOnly);

// System overview
router.get('/stats', getAdminStats);
router.get('/overview', getAdminStats);

// User administration
router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

// Question bank administration
router.route('/questions')
  .get(getAdminQuestions)
  .post(createAdminQuestion);

router.route('/questions/:id')
  .put(updateAdminQuestion)
  .delete(deleteAdminQuestion);

export default router;
