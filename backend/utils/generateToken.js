import jwt from 'jsonwebtoken';

/**
 * Generate a JSON Web Token for authenticated users
 * @param {string} id - User ID
 * @param {string} role - User role ('student' | 'admin')
 * @returns {string} Signed JWT
 */
export const generateToken = (id, role = 'student') => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || 'supersecret_careercoach_jwt_key_2026',
    { expiresIn: '30d' }
  );
};
