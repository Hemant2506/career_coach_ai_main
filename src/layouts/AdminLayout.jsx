import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Logo } from '../components/Logo';
import { ToastContainer } from '../components/Toast';
import {
  LayoutDashboard,
  Briefcase,
  BookOpen,
  Building2,
  HelpCircle,
  ArrowLeft,
  Sun,
  Moon,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const ADMIN_LINKS = [
  { label: 'Overview', path: '/admin', icon: LayoutDashboard },
  { label: 'Manage Jobs', path: '/admin/jobs', icon: Briefcase },
  { label: 'Manage Courses', path: '/admin/courses', icon: BookOpen },
  { label: 'Manage Industries', path: '/admin/industries', icon: Building2 },
  { label: 'Manage Questions', path: '/admin/questions', icon: HelpCircle },
];

export function AdminLayout() {
  const { logout, user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Admin Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-200 border-r border-slate-800 shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <Logo size="default" />
        </div>

        <div className="px-6 py-3 bg-purple-950/40 border-b border-purple-900/30 flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-purple-300">
            Admin Console
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">
            v2.4
          </span>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {ADMIN_LINKS.map(link => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-purple-600 text-white font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}

          <div className="pt-6 px-3">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-indigo-300 hover:text-white bg-indigo-950/60 hover:bg-indigo-900/60 rounded-lg transition-colors border border-indigo-800/40"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Student App</span>
            </Link>
          </div>
        </div>

        <div className="p-4 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center font-bold text-xs text-white">
              FC
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold text-white">Faculty Admin</span>
              <span className="text-[10px] text-slate-400">admin@careercoach.ai</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/70 backdrop-blur-xs md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Admin Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Admin Header */}
        <header className="h-16 px-4 md:px-8 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
                Staff Portal
              </span>
              <h1 className="text-base md:text-lg font-bold text-slate-900 dark:text-white">
                Career Coach Administration
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
            <Link
              to="/dashboard"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Student View</span>
            </Link>
          </div>
        </header>

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
