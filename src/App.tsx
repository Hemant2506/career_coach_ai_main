import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';

// Layouts
import { AppLayout } from './layouts/AppLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';

// Main Application Pages
import DashboardPage from './pages/dashboard/DashboardPage';
import CareerGuidancePage from './pages/career/CareerGuidancePage';
import CareerDetailsPage from './pages/career/CareerDetailsPage';
import IndustryExplorerPage from './pages/industries/IndustryExplorerPage';
import IndustryDetailsPage from './pages/industries/IndustryDetailsPage';
import JobsPage from './pages/jobs/JobsPage';
import JobDetailsPage from './pages/jobs/JobDetailsPage';
import LearnPage from './pages/learning/LearnPage';
import CourseDetailsPage from './pages/learning/CourseDetailsPage';
import VideoLecturePage from './pages/learning/VideoLecturePage';
import SkillAssessmentListPage from './pages/assessment/SkillAssessmentListPage';
import AssessmentInterfacePage from './pages/assessment/AssessmentInterfacePage';
import AssessmentResultPage from './pages/assessment/AssessmentResultPage';
import InterviewSetupPage from './pages/interview/InterviewSetupPage';
import LiveInterviewPage from './pages/interview/LiveInterviewPage';
import InterviewResultPage from './pages/interview/InterviewResultPage';
import InterviewHistoryPage from './pages/interview/InterviewHistoryPage';
import PerformancePage from './pages/analytics/PerformancePage';
import ProfilePage from './pages/profile/ProfilePage';
import SettingsPage from './pages/settings/SettingsPage';

// Admin UI Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminManageJobsPage from './pages/admin/AdminManageJobsPage';
import AdminManageCoursesPage from './pages/admin/AdminManageCoursesPage';
import AdminManageIndustriesPage from './pages/admin/AdminManageIndustriesPage';
import AdminManageQuestionsPage from './pages/admin/AdminManageQuestionsPage';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Pages */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Main Student Portal (under AppLayout with sidebar & header) */}
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/career" element={<CareerGuidancePage />} />
                <Route path="/career/:id" element={<CareerDetailsPage />} />
                <Route path="/industries" element={<IndustryExplorerPage />} />
                <Route path="/industries/:id" element={<IndustryDetailsPage />} />
                <Route path="/jobs" element={<JobsPage />} />
                <Route path="/jobs/:id" element={<JobDetailsPage />} />
                <Route path="/learn" element={<LearnPage />} />
                <Route path="/courses/:id" element={<CourseDetailsPage />} />
                <Route path="/courses/:id/lesson/:lessonId" element={<VideoLecturePage />} />
                <Route path="/assessments" element={<SkillAssessmentListPage />} />
                <Route path="/assessments/:id" element={<AssessmentInterfacePage />} />
                <Route path="/assessments/:id/result" element={<AssessmentResultPage />} />
                <Route path="/interview/setup" element={<InterviewSetupPage />} />
                <Route path="/interview/:id" element={<LiveInterviewPage />} />
                <Route path="/interview/:id/result" element={<InterviewResultPage />} />
                <Route path="/history" element={<InterviewHistoryPage />} />
                <Route path="/performance" element={<PerformancePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>

              {/* Admin Portal (under AdminLayout) */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboardPage />} />
                <Route path="jobs" element={<AdminManageJobsPage />} />
                <Route path="courses" element={<AdminManageCoursesPage />} />
                <Route path="industries" element={<AdminManageIndustriesPage />} />
                <Route path="questions" element={<AdminManageQuestionsPage />} />
              </Route>

              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
