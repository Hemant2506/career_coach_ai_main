import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  ArrowLeft,
  Clock,
  BookOpen,
  CheckCircle2,
  Circle,
  PlayCircle,
  Star,
  User,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function CourseDetailsPage() {
  const { id } = useParams();
  const { courses, courseProgress } = useApp();
  const navigate = useNavigate();

  const course = courses.find(c => c.id === id) || courses[0];
  const progressObj = courseProgress[course.id] || { completedLessonIds: [], progress: course.progress || 0 };
  const completedIds = progressObj.completedLessonIds || [];

  // Find first uncompleted lesson or default to first lesson
  let targetLessonId = 'js_l1';
  if (course.modules && course.modules.length > 0) {
    let found = false;
    for (const m of course.modules) {
      for (const l of m.lessons || []) {
        if (!completedIds.includes(l.id)) {
          targetLessonId = l.id;
          found = true;
          break;
        }
      }
      if (found) break;
    }
    if (!found && course.modules[0].lessons?.[0]) {
      targetLessonId = course.modules[0].lessons[0].id;
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Back Link */}
      <Link
        to="/learn"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Course Catalog</span>
      </Link>

      {/* 29. Course Header Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                {course.category}
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-xs text-slate-500">{course.level} Level</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {course.title}
            </h1>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {course.description}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{course.duration} Total Content</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                <span>{course.totalLessons} Lessons</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span className="font-semibold text-slate-900 dark:text-white">{course.rating || 4.8}</span>
              </span>
            </div>
          </div>

          {/* CTA Box */}
          <div className="w-full lg:w-80 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-4">
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="text-slate-400 font-medium">Your Progress</span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{progressObj.progress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                  style={{ width: `${progressObj.progress}%` }}
                />
              </div>
            </div>

            <Link
              to={`/courses/${course.id}/lesson/${targetLessonId}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all"
            >
              <PlayCircle className="w-4 h-4" />
              <span>{progressObj.progress > 0 ? 'Continue Learning' : 'Start Course Now'}</span>
            </Link>
          </div>
        </div>

        {/* What You'll Learn Checklist */}
        {course.whatYoullLearn && (
          <div className="pt-6">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              What You'll Learn in This Course
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {course.whatYoullLearn.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 29. Course Curriculum Modules */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Course Curriculum
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Click on any lesson to open the interactive video lecture player and notes.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {completedIds.length} / {course.totalLessons} Completed
          </span>
        </div>

        <div className="space-y-6">
          {(course.modules || []).map((mod, modIdx) => (
            <div
              key={mod.id}
              className="rounded-xl border border-slate-200/80 dark:border-slate-800 overflow-hidden"
            >
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  {mod.title}
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">
                  {mod.lessons?.length || 0} Lessons
                </span>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800/80 bg-white dark:bg-slate-900">
                {(mod.lessons || []).map((lesson, lessonIdx) => {
                  const isCompleted = completedIds.includes(lesson.id);

                  return (
                    <Link
                      key={lesson.id}
                      to={`/courses/${course.id}/lesson/${lesson.id}`}
                      className="p-3.5 px-4 flex items-center justify-between hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0 group-hover:text-indigo-500" />
                        )}
                        <div>
                          <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {lesson.title}
                          </h4>
                          <span className="text-[11px] text-slate-400">{lesson.duration}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium hidden sm:inline group-hover:translate-x-0.5 transition-transform">
                          {isCompleted ? 'Review' : 'Watch'}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
