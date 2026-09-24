import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import {
  Settings,
  User,
  Moon,
  Sun,
  Bell,
  Globe,
  Sliders,
  Shield,
  Key,
  CheckCircle2,
  Lock
} from 'lucide-react';

export default function SettingsPage() {
  const { user, updateProfile } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { showToast } = useApp();

  // Account State
  const [name, setName] = useState(user?.name || 'Hemant Saraswat');
  const [email, setEmail] = useState(user?.email || 'demo@careercoach.ai');

  // Preferences
  const [notifications, setNotifications] = useState({
    jobMatches: true,
    interviewReminders: true,
    courseUpdates: false
  });
  const [language, setLanguage] = useState('English (US)');

  // Interview Defaults
  const [defaultDifficulty, setDefaultDifficulty] = useState('Intermediate');
  const [defaultRole, setDefaultRole] = useState('software-developer');
  const [defaultCount, setDefaultCount] = useState(5);

  // Security Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSaveAccount = (e) => {
    e.preventDefault();
    updateProfile({ name, email });
    showToast('✓ Account information saved');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordError('');

    if (!currentPassword) {
      setPasswordError('Please provide your current password.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showToast('✓ Password updated successfully');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* 47. Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 text-xs font-medium text-indigo-700 dark:text-indigo-300 mb-2">
          <Settings className="w-3.5 h-3.5" />
          <span>System & Account Configuration</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Settings
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Manage your account credentials, dark mode theme preferences, notification triggers, and interview session defaults.
        </p>
      </div>

      {/* Section 1: Account Settings */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
          <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Account Information
          </h2>
        </div>

        <form onSubmit={handleSaveAccount} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Primary Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs"
          >
            Update Account Info
          </button>
        </form>
      </div>

      {/* Section 2: Preferences (Dark Mode, Notifications, Language) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
          <Sliders className="w-4 h-4 text-purple-600" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            App Preferences & Display
          </h2>
        </div>

        <div className="space-y-4 text-xs">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">Appearance Theme</span>
              <span className="text-slate-500 text-[11px]">Currently using {isDark ? 'Dark Mode' : 'Light Mode'}</span>
            </div>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 font-semibold"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-600" />}
              <span>{isDark ? 'Switch to Light' : 'Switch to Dark'}</span>
            </button>
          </div>

          {/* Notifications toggles */}
          <div className="space-y-3 pt-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300 block text-[11px] uppercase tracking-wider">
              Notification Channels
            </span>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 cursor-pointer">
              <div>
                <span className="font-semibold text-slate-900 dark:text-white block">Automated Job Match Alerts</span>
                <span className="text-[11px] text-slate-500">Notify when vacancies in Vadodara match your skill profile</span>
              </div>
              <input
                type="checkbox"
                checked={notifications.jobMatches}
                onChange={(e) => setNotifications(prev => ({ ...prev, jobMatches: e.target.checked }))}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 cursor-pointer">
              <div>
                <span className="font-semibold text-slate-900 dark:text-white block">Weekly Interview Practice Reminders</span>
                <span className="text-[11px] text-slate-500">Weekly nudge to maintain mock interview momentum</span>
              </div>
              <input
                type="checkbox"
                checked={notifications.interviewReminders}
                onChange={(e) => setNotifications(prev => ({ ...prev, interviewReminders: e.target.checked }))}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
            </label>
          </div>

          {/* Language */}
          <div className="pt-2">
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Interface Language
            </label>
            <select
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                showToast(`Language set to ${e.target.value}`);
              }}
              className="w-full sm:w-64 p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              <option value="English (US)">English (US)</option>
              <option value="English (India)">English (India)</option>
              <option value="Hindi">Hindi (Beta)</option>
              <option value="Gujarati">Gujarati (Beta)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section 3: Interview Preferences */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
          <Sliders className="w-4 h-4 text-emerald-600" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Interview Session Defaults
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Default Target Role
            </label>
            <select
              value={defaultRole}
              onChange={(e) => setDefaultRole(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              <option value="software-developer">Software Developer</option>
              <option value="web-developer">Web Developer</option>
              <option value="data-analyst">Data Analyst</option>
              <option value="hr-interview">HR & Behavioral</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Default Difficulty
            </label>
            <select
              value={defaultDifficulty}
              onChange={(e) => setDefaultDifficulty(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Default Question Count
            </label>
            <select
              value={defaultCount}
              onChange={(e) => setDefaultCount(parseInt(e.target.value, 10))}
              className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              <option value="5">5 Questions (~15 mins)</option>
              <option value="10">10 Questions (~30 mins)</option>
              <option value="15">15 Questions (~45 mins)</option>
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={() => showToast('✓ Interview default preferences saved')}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs"
        >
          Save Interview Defaults
        </button>
      </div>

      {/* Section 4: Security (Change Password) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
          <Key className="w-4 h-4 text-rose-500" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Security & Password
          </h2>
        </div>

        {passwordError && (
          <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300">
            {passwordError}
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4 text-xs max-w-md">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Current Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
