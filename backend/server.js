import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import careerRoutes from './routes/careerRoutes.js';
import industryRoutes from './routes/industryRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import assessmentRoutes from './routes/assessmentRoutes.js';
import interviewRoutes from './routes/interviewRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger in development
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`[API] ${req.method} ${req.url}`);
    next();
  });
}

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Career Coach AI Backend Server is healthy and running.',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/skills', careerRoutes); // Alias for /api/skills/analyze
app.use('/api/industries', industryRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/admin', adminRoutes);

// Welcome & API Catalog
app.get('/api', (req, res) => {
  res.status(200).json({
    app: 'Career Coach AI - Backend REST API',
    version: '1.0.0',
    description: 'Complete backend server powering career guidance, skill assessments, job matching, and AI mock interviews.',
    endpoints: {
      auth: ['POST /api/auth/register', 'POST /api/auth/login'],
      users: ['GET /api/users/profile', 'PUT /api/users/profile', 'PUT /api/users/change-password', 'GET /api/users/saved-jobs', 'POST /api/users/saved-jobs/:jobId', 'GET /api/users/performance'],
      careers: ['GET /api/careers', 'GET /api/careers/:id', 'POST /api/careers/recommend', 'POST /api/skills/analyze'],
      industries: ['GET /api/industries', 'GET /api/industries/:id', 'GET /api/industries/:id/jobs', 'GET /api/industries/:id/courses'],
      jobs: ['GET /api/jobs', 'GET /api/jobs/:id', 'POST /api/jobs (Admin)', 'PUT /api/jobs/:id (Admin)', 'DELETE /api/jobs/:id (Admin)'],
      courses: ['GET /api/courses', 'GET /api/courses/:id', 'GET /api/courses/:id/lectures', 'GET /api/courses/:id/progress', 'POST /api/courses/:id/progress'],
      assessments: ['GET /api/assessments', 'GET /api/assessments/:id', 'POST /api/assessments/:id/submit', 'GET /api/assessments/history/user'],
      interviews: ['POST /api/interviews/start', 'POST /api/interviews/:id/answer', 'POST /api/interviews/:id/finish', 'GET /api/interviews/:id', 'GET /api/interviews/history', 'GET /api/interviews/questions'],
      admin: ['GET /api/admin/stats', 'GET /api/admin/users', 'PUT /api/admin/users/:id/role', 'DELETE /api/admin/users/:id', 'GET /api/admin/questions', 'POST /api/admin/questions', 'PUT /api/admin/questions/:id']
    }
  });
});

// Error handling middleware
app.use('/api', notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Export app instance (for testing or root integration)
export default app;

// Listen if run directly
if (process.argv[1] && (process.argv[1].endsWith('server.js') || process.argv[1].includes('backend'))) {
  app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`🚀 Career Coach AI Server running on port ${PORT}`);
    console.log(`🌐 Base API URL: http://localhost:${PORT}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`===============================================`);
  });
}
