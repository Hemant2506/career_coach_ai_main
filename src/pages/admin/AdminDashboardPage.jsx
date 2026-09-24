import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Users,
  BookOpen,
  Briefcase,
  Bot,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  TrendingUp,
  Clock,
  Layers,
  Building2,
  HelpCircle
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { jobs, courses, industries, interviewHistory } = useApp();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 48. Header & Staff Welcome */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Administrative Command</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Placement & Curriculum Management
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Real-time management for college placement cells, course coordinators, and AI question rubrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/jobs"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Job</span>
          </Link>
          <Link
            to="/admin/courses"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200"
          >
            <Plus className="w-4 h-4" />
            <span>Add Course</span>
          </Link>
        </div>
      </div>

      {/* 48. Dashboard Statistics Cards (4 Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Users */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Total Users</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white">
              1,250
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18% this admission cycle</span>
          </div>
        </div>

        {/* Active Courses */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Active Courses</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white">
              {courses.length}
            </span>
            <span className="text-xs text-slate-400 font-mono ml-1.5">published</span>
          </div>
          <div className="mt-2 text-[11px] text-purple-600 dark:text-purple-400 font-medium">
            120+ video lectures
          </div>
        </div>

        {/* Job Listings */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Job Listings</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white">
              156
            </span>
            <span className="text-xs text-slate-400 font-mono ml-1.5">({jobs.length} demo active)</span>
          </div>
          <div className="mt-2 text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
            18 hiring companies
          </div>
        </div>

        {/* Interviews Completed */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Interviews Completed</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white">
              3,420
            </span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            Avg student score: 79.4%
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          to="/admin/jobs"
          className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition-colors flex items-center justify-between group"
        >
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Manage Jobs</h3>
            <p className="text-xs text-slate-500 mt-0.5">{jobs.length} Active Listings</p>
          </div>
          <Briefcase className="w-5 h-5 text-slate-400 group-hover:text-purple-600" />
        </Link>

        <Link
          to="/admin/courses"
          className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition-colors flex items-center justify-between group"
        >
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Manage Courses</h3>
            <p className="text-xs text-slate-500 mt-0.5">{courses.length} Syllabi</p>
          </div>
          <BookOpen className="w-5 h-5 text-slate-400 group-hover:text-purple-600" />
        </Link>

        <Link
          to="/admin/industries"
          className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition-colors flex items-center justify-between group"
        >
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Manage Industries</h3>
            <p className="text-xs text-slate-500 mt-0.5">{industries.length} Sectors</p>
          </div>
          <Building2 className="w-5 h-5 text-slate-400 group-hover:text-purple-600" />
        </Link>

        <Link
          to="/admin/questions"
          className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition-colors flex items-center justify-between group"
        >
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Manage Questions</h3>
            <p className="text-xs text-slate-500 mt-0.5">AI Interview Rubrics</p>
          </div>
          <HelpCircle className="w-5 h-5 text-slate-400 group-hover:text-purple-600" />
        </Link>
      </div>

      {/* Recent Submissions & Hiring Pipeline Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Student Mock Interviews */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
            Recent Mock Interview Submissions
          </h3>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {interviewHistory.slice(0, 4).map((hist, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">{hist.role}</h4>
                  <span className="text-[11px] text-slate-400">{hist.date} · {hist.difficulty} · {hist.mode}</span>
                </div>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-sm">
                  {hist.score}/100
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Posted Jobs */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
            Recently Added Job Listings
          </h3>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {jobs.slice(0, 4).map((j) => (
              <div key={j.id} className="py-3 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">{j.title}</h4>
                  <span className="text-[11px] text-slate-400">{j.company} · {j.location}</span>
                </div>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {j.salary}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
