import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { TopHeader } from '../components/TopHeader';
import { ToastContainer } from '../components/Toast';
import { X } from 'lucide-react';

const PAGE_TITLES = {
  '/dashboard': 'Dashboard',
  '/career': 'Career Guidance',
  '/industries': 'Industry Explorer',
  '/jobs': 'Job Discovery',
  '/learn': 'Learn & Develop',
  '/assessments': 'Skill Assessments',
  '/interview/setup': 'AI Interview Setup',
  '/performance': 'Performance Analytics',
  '/history': 'Interview History',
  '/profile': 'My Profile',
  '/settings': 'Account Settings',
};

export function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const getPageInfo = () => {
    const path = location.pathname;
    if (PAGE_TITLES[path]) {
      return { title: PAGE_TITLES[path], breadcrumbs: [{ label: 'Home', href: '/dashboard' }, { label: PAGE_TITLES[path] }] };
    }
    if (path.startsWith('/career/')) {
      return { title: 'Career Details', breadcrumbs: [{ label: 'Career Guidance', href: '/career' }, { label: 'Details' }] };
    }
    if (path.startsWith('/industries/')) {
      return { title: 'Industry Overview', breadcrumbs: [{ label: 'Industries', href: '/industries' }, { label: 'Details' }] };
    }
    if (path.startsWith('/jobs/')) {
      return { title: 'Job Opportunity', breadcrumbs: [{ label: 'Jobs', href: '/jobs' }, { label: 'Job Details' }] };
    }
    if (path.includes('/lesson/')) {
      return { title: 'Video Lecture', breadcrumbs: [{ label: 'Learn', href: '/learn' }, { label: 'Lecture' }] };
    }
    if (path.startsWith('/courses/')) {
      return { title: 'Course Curriculum', breadcrumbs: [{ label: 'Learn', href: '/learn' }, { label: 'Course' }] };
    }
    if (path.includes('/result') && path.includes('/assessments')) {
      return { title: 'Assessment Result', breadcrumbs: [{ label: 'Assessments', href: '/assessments' }, { label: 'Result' }] };
    }
    if (path.startsWith('/assessments/')) {
      return { title: 'Skill Assessment Test', breadcrumbs: [{ label: 'Assessments', href: '/assessments' }, { label: 'Exam' }] };
    }
    if (path.includes('/result') && path.includes('/interview')) {
      return { title: 'Interview Evaluation', breadcrumbs: [{ label: 'Interview', href: '/interview/setup' }, { label: 'Evaluation' }] };
    }
    if (path.startsWith('/interview/')) {
      return { title: 'AI Mock Interview', breadcrumbs: [{ label: 'AI Interview', href: '/interview/setup' }, { label: 'Live Session' }] };
    }
    return { title: 'Career Coach AI', breadcrumbs: [{ label: 'Home', href: '/dashboard' }] };
  };

  const { title, breadcrumbs } = getPageInfo();

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Desktop Fixed Sidebar */}
      <div className="hidden md:flex shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="relative h-full">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
          <Sidebar onCloseMobile={() => setMobileMenuOpen(false)} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopHeader
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          title={title}
          breadcrumbs={breadcrumbs}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      <ToastContainer />
    </div>
  );
}
