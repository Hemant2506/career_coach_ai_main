import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from './Logo';
import {
  LayoutDashboard,
  Compass,
  Building2,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  Bot,
  LineChart,
  History,
  User,
  Settings,
  LogOut,
  Shield,
  ChevronRight
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Career Guidance', path: '/career', icon: Compass },
  { label: 'Industries', path: '/industries', icon: Building2 },
  { label: 'Jobs', path: '/jobs', icon: Briefcase },
  { label: 'Learn & Develop', path: '/learn', icon: GraduationCap },
  { label: 'Assessment', path: '/assessments', icon: CheckCircle2 },
  { label: 'AI Interview', path: '/interview/setup', icon: Bot },
  { label: 'Performance', path: '/performance', icon: LineChart },
  { label: 'History', path: '/history', icon: History },
  { label: 'Profile', path: '/profile', icon: User },
  { label: 'Settings', path: '/settings', icon: Settings },
];

export function Sidebar({ onCloseMobile }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside className="w-64 h-full flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-colors">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
        <Logo size="default" />
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          Student Portal
        </div>

        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path ||
            (item.path !== '/dashboard' && location.pathname.startsWith(item.path));

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              className={`flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
              <span className="truncate">{item.label}</span>
            </NavLink>
          );
        })}

        <div className="pt-4 px-3 pb-2 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          Management
        </div>

        <NavLink
          to="/admin"
          onClick={onCloseMobile}
          className={`flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
            location.pathname.startsWith('/admin')
              ? 'bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
          }`}
        >
          <Shield className="w-4 h-4 text-purple-500 shrink-0" />
          <span className="truncate">Admin Dashboard</span>
        </NavLink>
      </div>

      {/* Mini Career Readiness Card in Sidebar */}
      <div className="p-3 mx-3 mb-2 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/60">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Career Readiness</span>
          <span className="text-xs font-bold font-mono text-indigo-600 dark:text-indigo-400">78%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: '78%' }} />
        </div>
        <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
          <span>Goal: Software Dev</span>
          <NavLink to="/performance" onClick={onCloseMobile} className="text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center">
            Insights <ChevronRight className="w-2.5 h-2.5 ml-0.5" />
          </NavLink>
        </div>
      </div>

      {/* Bottom Logout */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0 text-slate-400" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
