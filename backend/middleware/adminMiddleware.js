import { errorResponse } from '../utils/response.js';

/**
 * Middleware to restrict access to administrator users only
 */
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return errorResponse(res, 403, 'Access denied: Administrator privileges required');
};
