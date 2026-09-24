import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import {
  Compass,
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  TrendingUp,
  BookOpen,
  Bot,
  MapPin,
  ArrowRight,
  Sparkles,
  Award
} from 'lucide-react';

export default function CareerDetailsPage() {
  const { id } = useParams();
  const { careers, courses, jobs } = useApp();
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const career = careers.find(c => c.id === id) || careers[0];

  const handleSetAsGoal = () => {
    updateProfile({ careerGoal: career.title });
  };

  const isCurrentGoal = user?.careerGoal === career.title;

  // Filter recommended courses & related jobs
  const matchedCourses = courses.filter(c =>
    career.recommendedCourses?.includes(c.id) ||
    career.requiredSkills.some(s => c.title.toLowerCase().includes(s.toLowerCase()))
  ).slice(0, 3);

  const matchedJobs = jobs.filter(j =>
    j.roleCategory?.toLowerCase() === career.title.toLowerCase() ||
    j.industry === career.industry.toLowerCase()
  ).slice(0, 3);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Link
          to="/career"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Careers</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSetAsGoal}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
              isCurrentGoal
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            {isCurrentGoal ? '✓ Set as Active Goal' : '🎯 Set as My Career Goal'}
          </button>

          <button
            onClick={() => navigate('/interview/setup', { state: { role: career.id } })}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs"
          >
            <Bot className="w-4 h-4" />
            <span>Practice Interview</span>
          </button>
        </div>
      </div>

      {/* Hero Overview Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                {career.category} Pathway
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-xs text-slate-500">{career.industry}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {career.title}
            </h1>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {career.overview || career.description}
            </p>
          </div>

          <div className="lg:w-72 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px]">Average Compensation</span>
              <span className="text-base font-bold font-mono text-slate-900 dark:text-white">{career.salaryRange}</span>
            </div>
            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
              <span className="text-slate-400 block text-[10px]">Experience Level</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{career.experienceRequired}</span>
            </div>
            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
              <span className="text-slate-400 block text-[10px]">Relevance Match</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{career.matchScore}% Compatibility</span>
            </div>
          </div>
        </div>

        {/* Responsibilities & Skills */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Core Responsibilities
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              {career.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Required Technical Competencies
            </h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {career.requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-800/60 text-xs">
              <span className="font-semibold text-purple-900 dark:text-purple-200 block mb-1">
                Skill Gap Insight
              </span>
              <p className="text-purple-700 dark:text-purple-300 leading-relaxed text-[11px]">
                You currently possess 75% of this career profile’s core skills. Focusing on React state patterns and testing will close the remaining readiness gap.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 21. Visual Beginner Roadmap */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="mb-6">
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            Step-by-Step Learning Journey
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Beginner-to-Placement Roadmap
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Follow this sequential progression to build deep domain skills and secure full-time job placement.
          </p>
        </div>

        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-indigo-200 dark:before:bg-indigo-900">
          {career.roadmap.map((step, idx) => (
            <div key={step.step} className="relative flex items-start gap-4">
              <div className="absolute -left-6 sm:-left-8 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-mono font-bold text-xs shadow-xs ring-4 ring-white dark:ring-slate-900">
                {step.step}
              </div>
              <div className="flex-1 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{step.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Courses & Related Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recommended Courses */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Recommended Courses</h3>
            <Link to="/learn" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {matchedCourses.map(course => (
              <div
                key={course.id}
                className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between gap-3 hover:border-indigo-400 transition-colors"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{course.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{course.level} · {course.duration} · {course.totalLessons} Lessons</p>
                </div>
                <Link
                  to={`/courses/${course.id}`}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shrink-0"
                >
                  Start
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Related Jobs */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Related Vacancies</h3>
            <Link to="/jobs" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
              Explore 15+ Jobs
            </Link>
          </div>

          <div className="space-y-3">
            {matchedJobs.map(job => (
              <div
                key={job.id}
                className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between gap-3 hover:border-indigo-400 transition-colors"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{job.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{job.company} · {job.location} · {job.salary}</p>
                </div>
                <Link
                  to={`/jobs/${job.id}`}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white shrink-0"
                >
                  Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
