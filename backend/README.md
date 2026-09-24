# Career Coach AI - Backend API & Server Documentation

Complete, modular, and student-friendly REST API backend for the **Career Coach AI** platform built using Node.js, Express.js, MongoDB/Mongoose, JWT, and bcryptjs.

---

## 📁 Backend Directory Architecture

```text
backend/
├── server.js               # Express application entry point & route registration
├── package.json            # Node.js dependencies and scripts
├── .env                    # Environment configuration
├── .env.example            # Sample configuration template
│
├── config/
│   └── db.js               # MongoDB connection handler with offline demo fallback
│
├── models/
│   ├── User.js             # User profiles, auth credentials & roles (student/admin)
│   ├── Career.js           # Career pathways, skills & roadmap steps
│   ├── Industry.js         # Industry sectors, growth & job trends
│   ├── Job.js              # Job listings, filters & application links
│   ├── Course.js           # Courses with structured video lectures & quizzes
│   ├── Skill.js            # Skill catalog & taxonomy
│   ├── Assessment.js       # Diagnostic assessments with MCQs & explanations
│   ├── Interview.js        # Active and completed mock interview sessions
│   ├── InterviewQuestion.js# Question bank with model answers & rubrics
│   └── UserProgress.js     # Progress milestones & analytics history
│
├── controllers/
│   ├── authController.js       # Register & Login with JWT issuance
│   ├── userController.js       # Profiles, passwords, saved jobs & performance
│   ├── careerController.js     # Career exploration & recommendation algorithms
│   ├── industryController.js   # Industry catalogs, associated jobs & courses
│   ├── jobController.js        # Job search, multi-attribute filtering & admin CRUD
│   ├── courseController.js     # Course catalog, lecture viewing & progress tracking
│   ├── assessmentController.js # Quiz questions & instant score diagnostic
│   ├── interviewController.js  # Live mock interview sessions & AI rubric scoring
│   └── adminController.js      # Platform KPIs, user management & question bank
│
├── routes/
│   ├── authRoutes.js       # /api/auth
│   ├── userRoutes.js       # /api/users
│   ├── careerRoutes.js     # /api/careers & /api/skills
│   ├── industryRoutes.js   # /api/industries
│   ├── jobRoutes.js        # /api/jobs
│   ├── courseRoutes.js     # /api/courses
│   ├── assessmentRoutes.js # /api/assessments
│   ├── interviewRoutes.js  # /api/interviews
│   └── adminRoutes.js      # /api/admin
│
├── middleware/
│   ├── authMiddleware.js   # Bearer JWT verification & user injection
│   ├── adminMiddleware.js  # Role-based access control (adminOnly)
│   └── errorMiddleware.js  # 404 handler and Mongoose/JWT exception mapper
│
├── services/
│   ├── aiService.js                # Keyword extraction, linguistic feedback & scoring
│   └── recommendationService.js    # Rule-based career match and skill gap analyzer
│
├── utils/
│   ├── generateToken.js    # JWT generation helper
│   └── response.js         # Standardized { success, message, data } formatter
│
└── seed/
    └── seedData.js         # Database seeding script & rich fallback dataset
```

---

## 🚀 Getting Started

### 1. Installation

```bash
cd backend
npm install
```

### 2. Environment Setup

Create `.env` based on `.env.example`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/career_coach_ai
JWT_SECRET=supersecret_careercoach_jwt_key_2026
CLIENT_URL=http://localhost:3000
```

*Note:* If MongoDB is not running locally, the server automatically uses safe in-memory fallback datasets so all endpoints continue functioning for development and UI testing.

### 3. Database Seeding

Populate the database with initial users, careers, jobs, courses, assessments, and interview questions:

```bash
npm run seed
```

### 4. Running the Server

```bash
# Start standalone backend (port 5000)
npm start

# Or with nodemon for auto-reload
npm run dev
```

---

## 🔑 Default Credentials

| Role | Email | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Student** | `demo@careercoach.ai` | `demo123` | View careers, take tests, practice interviews, save jobs |
| **Admin** | `admin@careercoach.ai` | `admin123` | Manage jobs, courses, questions & view platform statistics |

---

## 📡 API Reference Summary

### 1. Authentication (`/api/auth`)
- `POST /api/auth/register` - Register a student or admin account
- `POST /api/auth/login` - Authenticate and receive a JWT token

### 2. User Profile & Saved Jobs (`/api/users`)
- `GET /api/users/profile` *(Protected)* - Get current user profile
- `PUT /api/users/profile` *(Protected)* - Update name, skills, career goal, education
- `PUT /api/users/change-password` *(Protected)* - Change password
- `GET /api/users/saved-jobs` *(Protected)* - List saved jobs
- `POST /api/users/saved-jobs/:jobId` *(Protected)* - Save a job
- `DELETE /api/users/saved-jobs/:jobId` *(Protected)* - Unsave a job
- `GET /api/users/performance` *(Protected)* - Performance metrics, readiness & skill radar

### 3. Career Guidance (`/api/careers`)
- `GET /api/careers` - Get all career paths
- `GET /api/careers/:id` - Get single career with roadmap steps
- `POST /api/careers/recommend` - Recommend career paths based on user skills & interests
- `POST /api/skills/analyze` - Perform skill gap analysis between student skills & target role

### 4. Industry Explorer (`/api/industries`)
- `GET /api/industries` - Get all 12 industries
- `GET /api/industries/:id` - Get industry details, growth & top hiring companies
- `GET /api/industries/:id/jobs` - Get active vacancies in this industry
- `GET /api/industries/:id/courses` - Get recommended courses for this industry

### 5. Jobs & Vacancies (`/api/jobs`)
- `GET /api/jobs` - Search and filter by `location`, `industry`, `jobType`, `experience`, `search`
- `GET /api/jobs/:id` - Get job description and application details
- `POST /api/jobs` *(Admin)* - Create new job posting
- `PUT /api/jobs/:id` *(Admin)* - Update job details
- `DELETE /api/jobs/:id` *(Admin)* - Delete job

### 6. Courses & Video Lectures (`/api/courses`)
- `GET /api/courses` - Browse all courses (filter by `category`, `level`)
- `GET /api/courses/:id` - Get course syllabus and quiz details
- `GET /api/courses/:id/lectures` - List all video lectures
- `GET /api/courses/:id/lectures/:lectureId` - Get video lecture notes & stream URL
- `GET /api/courses/:id/progress` *(Protected)* - Get student's course completion rate
- `POST /api/courses/:id/progress` *(Protected)* - Mark lessons completed

### 7. Skill Assessments (`/api/assessments`)
- `GET /api/assessments` - List all diagnostic tests (Java, SQL, JavaScript, Communication)
- `GET /api/assessments/:id` - Get assessment questions (without answer keys)
- `POST /api/assessments/:id/submit` - Submit answers and get instant scoring & explanations
- `GET /api/assessments/history/user` *(Protected)* - Get student assessment attempts

### 8. AI Mock Interview (`/api/interviews`)
- `GET /api/interviews/questions` - View interview question bank
- `POST /api/interviews/start` *(Protected)* - Start new session with role & difficulty
- `POST /api/interviews/:id/answer` *(Protected)* - Submit answer for instant AI rubric scoring
- `POST /api/interviews/:id/finish` *(Protected)* - Complete session & get radar scores + feedback
- `GET /api/interviews/:id` *(Protected)* - Get interview results
- `GET /api/interviews/history` *(Protected)* - List past interview attempts

### 9. Admin Management (`/api/admin`)
- `GET /api/admin/stats` *(Admin)* - Total students, active jobs, interviews & hiring trends
- `GET /api/admin/users` *(Admin)* - List and search users
- `PUT /api/admin/users/:id/role` *(Admin)* - Update user role
- `DELETE /api/admin/users/:id` *(Admin)* - Delete user
- `GET /api/admin/questions` *(Admin)* - View question bank
- `POST /api/admin/questions` *(Admin)* - Add new question to bank
- `PUT /api/admin/questions/:id` *(Admin)* - Update question
- `DELETE /api/admin/questions/:id` *(Admin)* - Delete question
