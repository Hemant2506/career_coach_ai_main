/**
 * Standardized API Response Utilities
 * Ensures consistent JSON responses across all controllers.
 */

export const successResponse = (res, statusCode = 200, message = 'Operation successful', data = {}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

export const errorResponse = (res, statusCode = 500, message = 'Something went wrong', error = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error: error ? (error.message || error) : message
  });
};
