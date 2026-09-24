import React, { useState } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Bot
} from 'lucide-react';

export default function InterviewResultPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast, interviewHistory } = useApp();

  // If passed in location.state use it, else pick from interviewHistory
  const result = location.state?.result || interviewHistory[0] || {
    score: 82,
    role: 'Software Developer',
    difficulty: 'Intermediate',
    breakdown: {
      technical: 85,
      communication: 82,
      relevance: 84,
      grammar: 90,
      completeness: 78
    },
    feedbackWell: [
      'Clear, articulate explanation of block scoping and memory allocations',
      'Accurate usage of industry-standard technical terminology',
      'Demonstrated structured problem-solving approach'
    ],
    feedbackImprove: [
      'Add concrete production examples or code snippets to strengthen arguments',
      'Explain edge cases and failure modes in greater depth',
      'Structure longer answers with numbered bullet points'
    ],
    sampleQuestion: 'Explain the difference between let, const and var in JavaScript.',
    sampleAnswer: '`var` is function-scoped and hoisted with undefined initialization, while `let` and `const` are block-scoped and live in a Temporal Dead Zone until their declaration line is executed.',
    recommendedCourses: [
      { id: 'course_react', title: 'React.js & Modern Frontend Architecture', reason: 'To reinforce modern state and lifecycle patterns' },
      { id: 'course_comm_skills', title: 'Professional Communication for Engineers', reason: 'Because communication score was 82%' },
      { id: 'course_sql', title: 'SQL & Database Design Mastery', reason: 'Deepen knowledge in backend query optimization' }
    ]
  };

  const [copied, setCopied] = useState(false);

  const handleCopyAnswer = () => {
    if (result.sampleAnswer) {
      navigator.clipboard.writeText(result.sampleAnswer);
      setCopied(true);
      showToast('✓ AI suggested answer copied to clipboard');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* 39. Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white text-center shadow-lg">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-indigo-200 mb-3 border border-white/10">
          <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
          <span>Session Evaluation Complete</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          🎉 Interview Completed
        </h1>
        <p className="mt-2 text-sm text-indigo-200 max-w-md mx-auto">
          Comprehensive AI performance evaluation for <strong>{result.role}</strong> ({result.difficulty}).
        </p>

        {/* Big Overall Score Card */}
        <div className="mt-6 inline-flex flex-col items-center justify-center p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
          <span className="text-4xl sm:text-5xl font-mono font-extrabold text-white">
            {result.score} / 100
          </span>
          <span className="text-xs text-indigo-200 mt-1 font-medium">
            Overall Readiness Rating
          </span>
        </div>
      </div>

      {/* 39. Score Cards Breakdown */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Performance Dimensions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-[11px] font-medium text-slate-400 block mb-1">Technical Knowledge</span>
            <span className="text-xl sm:text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400">
              {result.breakdown?.technical || 85}%
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-[11px] font-medium text-slate-400 block mb-1">Communication</span>
            <span className="text-xl sm:text-2xl font-bold font-mono text-purple-600 dark:text-purple-400">
              {result.breakdown?.communication || 82}%
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-[11px] font-medium text-slate-400 block mb-1">Relevance</span>
            <span className="text-xl sm:text-2xl font-bold font-mono text-blue-600 dark:text-blue-400">
              {result.breakdown?.relevance || 84}%
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-[11px] font-medium text-slate-400 block mb-1">Grammar & Syntax</span>
            <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
              {result.breakdown?.grammar || 90}%
            </span>
          </div>

          <div className="col-span-2 sm:col-span-1 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-[11px] font-medium text-slate-400 block mb-1">Completeness</span>
            <span className="text-xl sm:text-2xl font-bold font-mono text-amber-600 dark:text-amber-400">
              {result.breakdown?.completeness || 78}%
            </span>
          </div>
        </div>
      </div>

      {/* 40. AI Feedback Section (2 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* What You Did Well */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              What You Did Well
            </h3>
          </div>
          <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
            {(result.feedbackWell || []).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Improve */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Areas to Improve
            </h3>
          </div>
          <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
            {(result.feedbackImprove || []).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-amber-500 font-bold mt-0.5">⚠</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 41. Sample AI Answer Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-900/50 shadow-md">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5" />
              <span>AI Suggested Benchmark Answer</span>
            </span>
            <h4 className="text-sm font-bold text-white mt-1">
              Q: "{result.sampleQuestion || 'Explain core principles.'}"
            </h4>
          </div>

          <button
            onClick={handleCopyAnswer}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Answer'}</span>
          </button>
        </div>

        <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed font-sans bg-black/30 p-4 rounded-xl border border-white/10">
          {result.sampleAnswer || 'A robust architectural explanation focuses on separation of concerns, scalability tradeoffs, and failure recovery.'}
        </p>
      </div>

      {/* 42. Recommended Learning */}
      <div className="space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Recommended For You Based On This Interview
          </h2>
          <p className="text-xs text-slate-500">
            Close the exact skill gaps identified during this mock evaluation session.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(result.recommendedCourses || []).map((rec, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  Targeted Recommendation
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                  {rec.title}
                </h4>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {rec.reason}
                </p>
              </div>

              <Link
                to={rec.id ? `/courses/${rec.id}` : '/learn'}
                className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 inline-flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <span>Start Module</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/interview/setup"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Another Interview</span>
        </Link>

        <Link
          to="/history"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all"
        >
          <span>View Interview History</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
