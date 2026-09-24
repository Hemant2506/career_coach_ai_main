import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { IMAGES } from '../../assets/assets';
import {
  GraduationCap,
  Search,
  BookOpen,
  Clock,
  Award,
  Layers,
  Sparkles,
  ArrowRight,
  Code2,
  Coffee,
  Database,
  Terminal,
  GitBranch,
  BarChart2,
  PieChart,
  MessageSquare,
  FileText
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Programming',
  'Web Development',
  'Data',
  'Communication',
  'Career Skills'
];

export default function LearnPage() {
  const { courses, courseProgress } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredCourses = courses.filter(course => {
    if (selectedCategory !== 'All' && course.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = course.title.toLowerCase().includes(q);
      const matchCategory = course.category.toLowerCase().includes(q);
      const matchDesc = course.description.toLowerCase().includes(q);
      if (!matchTitle && !matchCategory && !matchDesc) return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 27. Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 text-xs font-medium text-indigo-700 dark:text-indigo-300 mb-2">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Curated Engineering Curricula</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Learn & Develop Your Skills
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          High-yield courses covering language fundamentals, system architecture, database optimization, and executive communication.
        </p>
      </div>

      {/* Featured Banner Card */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="max-w-xl z-10">
          <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider block mb-1">
            Featured Curriculum
          </span>
          <h2 className="text-xl sm:text-2xl font-bold">JavaScript & Frontend Systems</h2>
          <p className="mt-2 text-xs sm:text-sm text-indigo-200 leading-relaxed">
            From asynchronous event loop internals to building dynamic React state applications. 12 lessons with video walkthroughs and interview quizzes.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <Link
              to="/courses/course_js"
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-white text-indigo-950 hover:bg-slate-100 transition-colors shadow-xs"
            >
              Continue Learning
            </Link>
            <span className="text-xs text-indigo-200 font-mono">65% Completed</span>
          </div>
        </div>

        <div className="w-full md:w-64 h-36 rounded-xl overflow-hidden shadow-lg border border-white/20 shrink-0">
          <img
            src={IMAGES.learningBanner}
            alt="Learning Banner"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Search and Category Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Segmented Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-3.5 h-3.5" />
          </div>
          <input
            type="text"
            placeholder="Search courses or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* 28. Course Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const currentProgress = courseProgress[course.id]?.progress ?? course.progress ?? 0;

          return (
            <div
              key={course.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    {course.category}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {course.level}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                  {course.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                  {course.description}
                </p>

                {/* Duration & Lessons */}
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{course.duration}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    <span>{course.totalLessons} Lessons</span>
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-400 text-[11px]">Progress</span>
                    <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{currentProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
                      style={{ width: `${currentProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <Link
                  to={`/courses/${course.id}`}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-2xs"
                >
                  <span>{currentProgress > 0 ? 'Continue Learning' : 'Start Course'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12 p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">No courses matched "{searchQuery}"</h3>
          <p className="text-xs text-slate-500 mt-1">Try resetting the category filter or searching a different term.</p>
        </div>
      )}
    </div>
  );
}
