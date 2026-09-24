import React, { useState } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  XCircle,
  Sparkles
} from 'lucide-react';

export default function AssessmentResultPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { assessments } = useApp();

  const assessment = assessments.find(a => a.id === id) || assessments[0];
  const result = location.state?.result || {
    score: 80,
    correctCount: 8,
    totalCount: 10,
    strongTopics: ['Variables & Scoping', 'Functions & Closures', 'DOM Manipulation'],
    weakTopics: ['Async/Await & Promises', 'Event Loop & Microtasks'],
    reviewDetails: []
  };

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (idx) => {
    setExpandedIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* 33. Assessment Complete Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white text-center shadow-lg">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-indigo-200 mb-3 border border-white/10">
          <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
          <span>Diagnostic Completed</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Assessment Complete 🎉
        </h1>
        <p className="mt-2 text-sm text-indigo-200 max-w-md mx-auto">
          Here is your diagnostic breakdown for <strong>{assessment.title}</strong>.
        </p>

        {/* Score Card */}
        <div className="mt-6 inline-flex flex-col items-center justify-center p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
          <span className="text-4xl sm:text-5xl font-mono font-extrabold text-white">
            {result.score} / 100
          </span>
          <span className="text-xs text-indigo-200 mt-1 font-mono">
            {result.correctCount} of {result.totalCount} Correct Answers
          </span>
        </div>
      </div>

      {/* Strong Areas vs Needs Improvement Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strong Areas */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Strong Areas
            </h3>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
            {result.strongTopics?.map((topic, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span className="font-semibold">{topic}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Needs Improvement */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Areas to Improve
            </h3>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
            {result.weakTopics?.map((topic, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">⚠</span>
                <span className="font-semibold">{topic}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Question Review Section */}
      {result.reviewDetails && result.reviewDetails.length > 0 && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
            Question-by-Question Solution Review
          </h3>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {result.reviewDetails.map((item, idx) => (
              <div key={idx} className="py-4">
                <div
                  onClick={() => toggleExpand(idx)}
                  className="flex items-start justify-between gap-3 cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5">
                      {item.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-500" />
                      )}
                    </span>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 transition-colors">
                        Q{idx + 1}. {item.question}
                      </h4>
                      <span className="text-[11px] text-slate-400">Topic: {item.topic}</span>
                    </div>
                  </div>
                  <button className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200">
                    {expandedIndex === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {expandedIndex === idx && (
                  <div className="mt-3 pl-7 pr-2 space-y-2 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
                      <p>
                        <strong className="text-slate-500">Your Answer: </strong>
                        <span className={item.isCorrect ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-rose-600 dark:text-rose-400 font-semibold'}>
                          {item.userChoice !== undefined ? item.options[item.userChoice] : 'Unanswered'}
                        </span>
                      </p>
                      {!item.isCorrect && (
                        <p>
                          <strong className="text-slate-500">Correct Answer: </strong>
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                            {item.options[item.correctIndex]}
                          </span>
                        </p>
                      )}
                      <p className="text-slate-600 dark:text-slate-400 pt-1 text-[11px] leading-relaxed">
                        <strong className="text-slate-700 dark:text-slate-300">Explanation: </strong>
                        {item.explanation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          to={`/assessments/${assessment.id}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Practice Again</span>
        </Link>

        <Link
          to="/learn"
          className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all"
        >
          <BookOpen className="w-4 h-4" />
          <span>View Recommended Courses</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
