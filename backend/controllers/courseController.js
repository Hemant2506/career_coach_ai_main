import Course from '../models/Course.js';
import UserProgress from '../models/UserProgress.js';
import { successResponse, errorResponse } from '../utils/response.js';
import { isDbConnected } from '../config/db.js';
import { DEFAULT_COURSES } from '../seed/seedData.js';

/**
 * @desc    Get all courses with optional category filter & search
 * @route   GET /api/courses
 * @access  Public
 */
export const getCourses = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    let courses = [];

    if (isDbConnected()) {
      const query = {};
      if (category && category !== 'All') {
        query.category = category;
      }
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }
      courses = await Course.find(query);
    }

    if (!courses || courses.length === 0) {
      courses = DEFAULT_COURSES.filter(c => {
        if (category && category !== 'All' && c.category !== category) return false;
        if (search) {
          const q = search.toLowerCase();
          return c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q);
        }
        return true;
      });
    }

    return successResponse(res, 200, 'Courses retrieved', courses);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get course by ID or Slug
 * @route   GET /api/courses/:id
 * @access  Public
 */
export const getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let course = null;

    if (isDbConnected()) {
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        course = await Course.findById(id);
      } else {
        course = await Course.findOne({ slug: id });
      }
    }

    if (!course) {
      course = DEFAULT_COURSES.find(c => c.id === id || c.slug === id);
    }

    if (!course) {
      return errorResponse(res, 404, 'Course not found');
    }

    return successResponse(res, 200, 'Course details retrieved', course);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create course (Admin only)
 * @route   POST /api/courses
 * @access  Private/Admin
 */
export const createCourse = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      const course = await Course.create(req.body);
      return successResponse(res, 201, 'Course created successfully', course);
    }

    const mockCourse = {
      id: 'course_' + Date.now(),
      ...req.body,
      rating: 4.8
    };
    return successResponse(res, 201, 'Course created successfully (Demo Mode)', mockCourse);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update course (Admin only)
 * @route   PUT /api/courses/:id
 * @access  Private/Admin
 */
export const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isDbConnected() && id.match(/^[0-9a-fA-F]{24}$/)) {
      const updated = await Course.findByIdAndUpdate(id, req.body, { new: true });
      if (!updated) {
        return errorResponse(res, 404, 'Course not found');
      }
      return successResponse(res, 200, 'Course updated successfully', updated);
    }

    return successResponse(res, 200, 'Course updated successfully (Demo Mode)', { id, ...req.body });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete course (Admin only)
 * @route   DELETE /api/courses/:id
 * @access  Private/Admin
 */
export const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isDbConnected() && id.match(/^[0-9a-fA-F]{24}$/)) {
      await Course.findByIdAndDelete(id);
    }

    return successResponse(res, 200, 'Course deleted successfully', { id });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get lectures for a course
 * @route   GET /api/courses/:courseId/lectures
 * @access  Public
 */
export const getCourseLectures = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    let course = null;

    if (isDbConnected()) {
      course = courseId.match(/^[0-9a-fA-F]{24}$/)? await Course.findById(courseId) : await Course.findOne({ slug: courseId });
    }

    if (!course) {
      course = DEFAULT_COURSES.find(c => c.id === courseId || c.slug === courseId) || DEFAULT_COURSES[0];
    }

    const lectures = course.lectures || [];
    return successResponse(res, 200, 'Lectures retrieved', lectures);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get specific lecture by ID
 * @route   GET /api/courses/:courseId/lectures/:lectureId
 * @access  Public
 */
export const getLectureById = async (req, res, next) => {
  try {
    const { courseId, lectureId } = req.params;
    let course = null;

    if (isDbConnected()) {
      course = courseId.match(/^[0-9a-fA-F]{24}$/)? await Course.findById(courseId) : await Course.findOne({ slug: courseId });
    }

    if (!course) {
      course = DEFAULT_COURSES.find(c => c.id === courseId || c.slug === courseId) || DEFAULT_COURSES[0];
    }

    const lecture = (course.lectures || []).find(l => l._id?.toString() === lectureId || l.id === lectureId) || course.lectures?.[0];

    if (!lecture) {
      return errorResponse(res, 404, 'Lecture not found');
    }

    return successResponse(res, 200, 'Lecture retrieved', lecture);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all user course progress
 * @route   GET /api/progress
 * @access  Private
 */
export const getUserProgress = async (req, res, next) => {
  try {
    if (isDbConnected() && req.user._id) {
      const progressDocs = await UserProgress.find({ userId: req.user._id }).populate('courseId');
      return successResponse(res, 200, 'User progress retrieved', progressDocs);
    }

    // Default demo progress
    return successResponse(res, 200, 'User progress retrieved', [
      {
        courseId: 'course_js',
        completedLectures: ['js_l1', 'js_l2', 'js_l3', 'js_l4', 'js_l5', 'js_l6'],
        progressPercentage: 65,
        completed: false
      }
    ]);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update course progress (mark lecture complete)
 * @route   POST /api/progress/:courseId
 * @access  Private
 */
export const updateCourseProgress = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const { lectureId } = req.body;

    if (!lectureId) {
      return errorResponse(res, 400, 'Please provide lectureId to mark complete');
    }

    let totalLectures = 10;
    if (isDbConnected()) {
      const course = courseId.match(/^[0-9a-fA-F]{24}$/)? await Course.findById(courseId) : await Course.findOne({ slug: courseId });
      if (course) {
        totalLectures = course.lectures?.length || course.totalLessons || 10;
      }

      if (req.user._id && course) {
        let progress = await UserProgress.findOne({ userId: req.user._id, courseId: course._id });

        if (!progress) {
          progress = new UserProgress({
            userId: req.user._id,
            courseId: course._id,
            completedLectures: [lectureId],
            progressPercentage: Math.round((1 / totalLectures) * 100),
            completed: 1 >= totalLectures,
            lastAccessed: Date.now()
          });
        } else {
          if (!progress.completedLectures.includes(lectureId)) {
            progress.completedLectures.push(lectureId);
          }
          const pct = Math.min(100, Math.round((progress.completedLectures.length / totalLectures) * 100));
          progress.progressPercentage = pct;
          progress.completed = pct === 100;
          progress.lastAccessed = Date.now();
        }

        await progress.save();
        return successResponse(res, 200, 'Course progress updated', progress);
      }
    }

    // Mock progress calculation
    const simulatedCount = 6;
    const pct = Math.min(100, Math.round((simulatedCount / totalLectures) * 100));

    return successResponse(res, 200, 'Course progress updated (Demo Mode)', {
      courseId,
      lectureId,
      progressPercentage: pct,
      completed: pct === 100
    });
  } catch (error) {
    next(error);
  }
};
