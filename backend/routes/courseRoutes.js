import express from 'express';
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseLectures,
  getLectureById,
  getUserProgress,
  updateCourseProgress
} from '../controllers/courseController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Course catalog
router.get('/', getCourses);
router.get('/:id', getCourseById);

// Admin-only course management
router.post('/', protect, adminOnly, createCourse);
router.put('/:id', protect, adminOnly, updateCourse);
router.delete('/:id', protect, adminOnly, deleteCourse);

// Video lectures
router.get('/:id/lectures', getCourseLectures);
router.get('/:id/lectures/:lectureId', getLectureById);

// User course progress
router.get('/:id/progress', protect, getUserProgress);
router.post('/:id/progress', protect, updateCourseProgress);

export default router;
