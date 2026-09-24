import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  Clock,
  HelpCircle,
  Award,
  Sparkles,
  ArrowRight,
  TrendingUp,
  RotateCcw
} from 'lucide-react';

export default function SkillAssessmentListPage() {
  const { assessments, assessmentHistory } = useApp();
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 31. Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 text-xs font-medium text-indigo-700 dark:text-indigo-300 mb-2">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Objective Diagnostic Tests</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Test Your Skills
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Validate your technical competencies with standardized MCQ assessments. Receive targeted gap analysis and course recommendations.
        </p>
      </div>

      {/* Available Assessments Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {assessments.map((test) => {
          const pastAttempts = assessmentHistory.filter(a => a.assessmentId === test.id);
          const bestScore = pastAttempts.length > 0 ? Math.max(...pastAttempts.map(a => a.score)) : null;

          return (
            <div
              key={test.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    {test.category}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {test.difficulty}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {test.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                  {test.description}
                </p>

                {/* Details */}
                <div className="space-y-2 py-3 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs mb-4">
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                      <span>Questions</span>
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white font-mono">{test.questions.length} Qs</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Duration</span>
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white font-mono">{test.timeLimitMinutes} Mins</span>
                  </div>
                </div>

                {bestScore !== null && (
                  <div className="mb-4 flex items-center justify-between text-xs px-1">
                    <span className="text-slate-400">Previous Best:</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{bestScore}/100</span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <Link
                  to={`/assessments/${test.id}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-2xs"
                >
                  <span>{bestScore !== null ? 'Retake Assessment' : 'Start Assessment'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Past Completed Assessments Table */}
      {assessmentHistory.length > 0 && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
            Recent Assessment History
          </h3>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {assessmentHistory.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">{item.title}</h4>
                  <span className="text-[11px] text-slate-400">{item.date}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-sm">
                    {item.score}/100
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                    {item.status || 'Completed'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
