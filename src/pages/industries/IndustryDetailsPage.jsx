import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  ArrowLeft,
  Briefcase,
  BookOpen,
  MapPin,
  CheckCircle2,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

export default function IndustryDetailsPage() {
  const { id } = useParams();
  const { industries, jobs, courses } = useApp();

  const industry = industries.find(ind => ind.id === id) || industries[0];

  const industryJobs = jobs.filter(j => j.industry === industry.id);

  const matchedCourses = courses.filter(c =>
    industry.popularSkills?.some(skill => c.title.toLowerCase().includes(skill.toLowerCase()))
  ).slice(0, 3);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Back Link */}
      <Link
        to="/industries"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to All Industries</span>
      </Link>

      {/* 23. Overview Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Industry Deep-Dive
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              {industry.name}
            </h1>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {industry.overview || industry.description}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2 lg:w-64 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px]">Hiring Trajectory</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                {industry.marketGrowth || '+15% Annual Growth'}
              </span>
            </div>
            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
              <span className="text-slate-400 block text-[10px]">Total Active Openings</span>
              <span className="font-bold font-mono text-slate-800 dark:text-slate-200">
                {industryJobs.length > 0 ? `${industryJobs.length} Live Openings` : `${industry.jobRolesCount} Roles Available`}
              </span>
            </div>
          </div>
        </div>

        {/* Popular Job Roles & Skills Grid */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Popular Job Roles
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              {industry.popularRoles?.map((role, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span className="font-medium text-slate-800 dark:text-slate-200">{role}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              In-Demand Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {industry.popularSkills?.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Available Jobs in this Industry */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Available Jobs in {industry.name} ({industryJobs.length})
          </h2>
          <Link to="/jobs" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
            View All Openings
          </Link>
        </div>

        {industryJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {industryJobs.map((job) => (
              <div
                key={job.id}
                className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{job.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{job.company}</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">{job.salary}</span>
                  </div>

                  <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.location}</span>
                    </span>
                    <span>·</span>
                    <span>{job.experience}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">{job.postedDate}</span>
                  <Link
                    to={`/jobs/${job.id}`}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 text-xs">
            No specific jobs listed under this sector in the demo database right now.
          </div>
        )}
      </div>

      {/* Recommended Courses for this Industry */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Recommended Skill Courses
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {matchedCourses.map((course) => (
            <div
              key={course.id}
              className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {course.category}
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">{course.title}</h4>
                <p className="text-xs text-slate-500 mt-1">{course.level} · {course.duration}</p>
              </div>

              <Link
                to={`/courses/${course.id}`}
                className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 inline-flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <span>Enroll in Course</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
