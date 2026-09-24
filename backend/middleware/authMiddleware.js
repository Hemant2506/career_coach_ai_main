import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { errorResponse } from '../utils/response.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'supersecret_careercoach_jwt_key_2026'
      );

      // Try finding user in database
      try {
        req.user = await User.findById(decoded.id).select('-password');
      } catch (dbErr) {
        req.user = null;
      }

      // If user document isn't in MongoDB (e.g. running in mock/demo mode), construct user from token
      if (!req.user) {
        req.user = {
          _id: decoded.id,
          id: decoded.id,
          role: decoded.role || 'student',
          name: decoded.role === 'admin' ? 'Faculty Admin' : 'Hemant Saraswat',
          email: decoded.role === 'admin' ? 'admin@careercoach.ai' : 'demo@careercoach.ai',
          skills: ['Java', 'SQL', 'JavaScript', 'React', 'Git'],
          careerGoal: 'Software Developer'
        };
      }

      return next();
    } catch (error) {
      console.error('JWT Auth Error:', error.message);
      return errorResponse(res, 401, 'Not authorized, token validation failed', error);
    }
  }

  if (!token) {
    return errorResponse(res, 401, 'Not authorized, no bearer token provided');
  }
};
