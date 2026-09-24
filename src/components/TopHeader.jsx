import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useApp } from '../context/AppContext';
import {
  Search,
  Bell,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  Shield,
  Briefcase,
  BookOpen,
  CheckCircle2,
  Download,
  X
} from 'lucide-react';

export function TopHeader({ onToggleMobileMenu, title, breadcrumbs = [] }) {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { jobs, courses } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const userMenuRef = useRef(null);
  const notifRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Quick search results
  const matchingJobs = searchQuery.trim()
    ? jobs.filter(j => j.title.toLowerCase().includes(searchQuery.toLowerCase()) || j.company.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3)
    : [];

  const matchingCourses = searchQuery.trim()
    ? courses.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.category.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3)
    : [];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const notifications = [
    { id: 1, title: 'Interview feedback ready', time: '10m ago', unread: true },
    { id: 2, title: 'New job match: ABC Tech (Vadodara)', time: '2h ago', unread: true },
    { id: 3, title: 'Completed SQL Module 1', time: '1d ago', unread: false }
  ];

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-8 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors">
        {/* Left: Mobile menu button + Title & Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Open mobile menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            {breadcrumbs.length > 0 && (
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-0.5">
                {breadcrumbs.map((crumb, idx) => (
                  <React.Fragment key={idx}>
                    {crumb.href ? (
                      <Link to={crumb.href} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span>{crumb.label}</span>
                    )}
                    {idx < breadcrumbs.length - 1 && <span className="text-slate-400">/</span>}
                  </React.Fragment>
                ))}
              </div>
            )}
            <h1 className="text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {title || 'Dashboard'}
            </h1>
          </div>
        </div>

        {/* Right Actions: Quick Search, Theme Toggle, Notifications, User Menu */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Quick Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-800 rounded-lg border border-slate-200/60 dark:border-slate-700/60 transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Search jobs, skills, courses...</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600">
              ⌘K
            </kbd>
          </button>

          {/* Search icon for small screens */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="sm:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>

          {/* Download Project ZIP button */}
          <a
            href="/api/download-zip"
            download="career-coach-ai-project.zip"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800/60 rounded-lg transition-colors"
            title="Download full project source code as .ZIP to your computer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Project</span>
          </a>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white dark:ring-slate-900" />
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                    Notifications
                  </span>
                  <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium cursor-pointer hover:underline">
                    Mark all read
                  </span>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-64 overflow-y-auto">
                  {notifications.map(n => (
                    <div key={n.id} className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-medium text-slate-800 dark:text-slate-200">{n.title}</p>
                        {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0 mt-1" />}
                      </div>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2.5 p-1.5 pl-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              aria-label="User menu"
            >
              <img
                src={user?.avatar || '/src/assets/images/avatar_student_hemant_1790260901814.jpg'}
                alt={user?.name || 'User'}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-600/20"
                referrerPolicy="no-referrer"
              />
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-semibold text-slate-900 dark:text-white leading-tight">
                  {user?.name || 'Hemant Saraswat'}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-none">
                  {user?.careerGoal || 'Software Developer'}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">{user?.name || 'Hemant Saraswat'}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user?.email || 'demo@careercoach.ai'}</p>
                </div>

                <div className="py-1">
                  <Link
                    to="/profile"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>Profile</span>
                  </Link>

                  <Link
                    to="/settings"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    <span>Settings</span>
                  </Link>

                  <a
                    href="/api/download-zip"
                    download="career-coach-ai-project.zip"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Project (.ZIP)</span>
                  </a>

                  <Link
                    to={location.pathname.startsWith('/admin') ? '/dashboard' : '/admin'}
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
                  >
                    <Shield className="w-4 h-4" />
                    <span>{location.pathname.startsWith('/admin') ? 'Student Dashboard' : 'Admin Portal'}</span>
                  </Link>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global Quick Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="flex items-center px-4 border-b border-slate-200 dark:border-slate-800">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search jobs, skills, courses, industries..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-3 py-4 text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 max-h-96 overflow-y-auto">
              {!searchQuery.trim() ? (
                <div className="text-xs text-slate-500 dark:text-slate-400 space-y-3">
                  <p className="font-semibold uppercase tracking-wider text-[11px] text-slate-400">Quick Navigation</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => { navigate('/interview/setup'); setIsSearchOpen(false); }}
                      className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-left hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-800 dark:text-slate-200 transition-colors"
                    >
                      <Briefcase className="w-4 h-4 text-indigo-500" />
                      <span>AI Mock Interview</span>
                    </button>
                    <button
                      onClick={() => { navigate('/jobs'); setIsSearchOpen(false); }}
                      className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-left hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-800 dark:text-slate-200 transition-colors"
                    >
                      <Briefcase className="w-4 h-4 text-indigo-500" />
                      <span>Browse 15+ Jobs</span>
                    </button>
                    <button
                      onClick={() => { navigate('/learn'); setIsSearchOpen(false); }}
                      className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-left hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-800 dark:text-slate-200 transition-colors"
                    >
                      <BookOpen className="w-4 h-4 text-indigo-500" />
                      <span>Skill Courses</span>
                    </button>
                    <button
                      onClick={() => { navigate('/assessments'); setIsSearchOpen(false); }}
                      className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-left hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-800 dark:text-slate-200 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                      <span>Skill Assessments</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {matchingJobs.length > 0 && (
                    <div>
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Jobs</p>
                      <div className="space-y-1">
                        {matchingJobs.map(job => (
                          <div
                            key={job.id}
                            onClick={() => { navigate(`/jobs/${job.id}`); setIsSearchOpen(false); }}
                            className="p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between"
                          >
                            <div>
                              <p className="text-xs font-semibold text-slate-900 dark:text-white">{job.title}</p>
                              <p className="text-[11px] text-slate-500">{job.company} · {job.location}</p>
                            </div>
                            <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400">{job.salary}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {matchingCourses.length > 0 && (
                    <div>
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Courses</p>
                      <div className="space-y-1">
                        {matchingCourses.map(course => (
                          <div
                            key={course.id}
                            onClick={() => { navigate(`/courses/${course.id}`); setIsSearchOpen(false); }}
                            className="p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between"
                          >
                            <div>
                              <p className="text-xs font-semibold text-slate-900 dark:text-white">{course.title}</p>
                              <p className="text-[11px] text-slate-500">{course.level} · {course.duration}</p>
                            </div>
                            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">View Course</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {matchingJobs.length === 0 && matchingCourses.length === 0 && (
                    <div className="text-center py-6 text-slate-500 text-xs">
                      No direct matches for "{searchQuery}". Try searching "Java", "React", or "Vadodara".
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
