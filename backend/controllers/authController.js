import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';
import { successResponse, errorResponse } from '../utils/response.js';
import { isDbConnected } from '../config/db.js';

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      education,
      qualification,
      graduationYear,
      skills,
      preferredIndustry,
      preferredLocation
    } = req.body;

    if (!name || !email || !password) {
      return errorResponse(res, 400, 'Please provide name, email and password');
    }

    // Check if user already exists
    if (isDbConnected()) {
      const userExists = await User.findOne({ email: email.toLowerCase() });
      if (userExists) {
        return errorResponse(res, 400, 'A user with this email address already exists');
      }

      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password,
        phone: phone || '',
        education: education || 'B.Tech in Computer Science',
        qualification: qualification || 'Undergraduate',
        graduationYear: graduationYear || '2026',
        skills: Array.isArray(skills) ? skills : ['Java', 'SQL', 'JavaScript'],
        preferredIndustry: preferredIndustry || 'Information Technology',
        preferredLocation: preferredLocation || 'Vadodara, Gujarat',
        role: email.toLowerCase().includes('admin') ? 'admin' : 'student'
      });

      return successResponse(res, 201, 'User registered successfully', {
        token: generateToken(user._id, user.role),
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          education: user.education,
          qualification: user.qualification,
          skills: user.skills,
          careerGoal: user.careerGoal,
          preferredLocation: user.preferredLocation
        }
      });
    } else {
      // Offline fallback mode
      const mockId = 'user_' + Date.now();
      const role = email.toLowerCase().includes('admin') ? 'admin' : 'student';
      return successResponse(res, 201, 'User registered successfully (Demo Mode)', {
        token: generateToken(mockId, role),
        user: {
          id: mockId,
          name,
          email,
          role,
          education: education || 'B.Tech Computer Science',
          qualification: qualification || 'Undergraduate',
          skills: Array.isArray(skills) ? skills : ['Java', 'SQL', 'React'],
          careerGoal: 'Software Developer',
          preferredLocation: preferredLocation || 'Vadodara, Gujarat'
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, 400, 'Please provide both email and password');
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check DB first
    if (isDbConnected()) {
      const user = await User.findOne({ email: normalizedEmail }).select('+password');

      if (user && (await user.matchPassword(password))) {
        return successResponse(res, 200, 'Login successful', {
          token: generateToken(user._id, user.role),
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            education: user.education,
            skills: user.skills,
            careerGoal: user.careerGoal,
            preferredLocation: user.preferredLocation
          }
        });
      }
    }

    // Demo Fallback credentials support
    if (normalizedEmail === 'demo@careercoach.ai' && (password === 'demo123' || !isDbConnected())) {
      const demoId = 'user_demo_student';
      return successResponse(res, 200, 'Demo Student Login successful', {
        token: generateToken(demoId, 'student'),
        user: {
          id: demoId,
          name: 'Hemant Saraswat',
          email: 'demo@careercoach.ai',
          role: 'student',
          education: 'B.Tech in Computer Science & Engineering',
          qualification: 'Undergraduate',
          graduationYear: '2026',
          skills: ['Java', 'SQL', 'JavaScript', 'React', 'Git'],
          careerGoal: 'Software Developer',
          preferredLocation: 'Vadodara, Gujarat'
        }
      });
    }

    if (normalizedEmail === 'admin@careercoach.ai' && (password === 'admin123' || !isDbConnected())) {
      const adminId = 'user_demo_admin';
      return successResponse(res, 200, 'Demo Admin Login successful', {
        token: generateToken(adminId, 'admin'),
        user: {
          id: adminId,
          name: 'Faculty Coordinator',
          email: 'admin@careercoach.ai',
          role: 'admin',
          preferredLocation: 'Vadodara Campus'
        }
      });
    }

    // If DB is offline, allow any realistic credentials
    if (!isDbConnected()) {
      const mockId = 'user_' + Date.now();
      const role = normalizedEmail.includes('admin') ? 'admin' : 'student';
      return successResponse(res, 200, 'Login successful (Demo Mode)', {
        token: generateToken(mockId, role),
        user: {
          id: mockId,
          name: normalizedEmail.split('@')[0],
          email: normalizedEmail,
          role,
          skills: ['Java', 'SQL', 'React'],
          careerGoal: 'Software Developer'
        }
      });
    }

    return errorResponse(res, 401, 'Invalid email or password');
  } catch (error) {
    next(error);
  }
};
