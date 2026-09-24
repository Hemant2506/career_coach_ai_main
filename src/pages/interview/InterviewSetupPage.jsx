import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Bot,
  Sparkles,
  Zap,
  Mic,
  FileText,
  Briefcase,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const INTERVIEW_TYPES = [
  { id: 'software-developer', title: 'Software Developer', icon: '💻', desc: 'Core programming, algorithms, OOP, database design, and architecture.' },
  { id: 'web-developer', title: 'Web Developer', icon: '🌐', desc: 'React, modern CSS, DOM, performance optimization, and web APIs.' },
  { id: 'data-analyst', title: 'Data Analyst', icon: '📊', desc: 'SQL queries, window functions, statistical methods, and KPI modeling.' },
  { id: 'hr-interview', title: 'HR & Behavioral', icon: '🤝', desc: 'STAR storytelling, leadership, teamwork, and situational problem-solving.' }
];

export default function InterviewSetupPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // State prefill from Job or Career details if passed
  const initialRole = location.state?.roleId || location.state?.role || 'software-developer';
  const customJobTitle = location.state?.jobTitle || null;
  const customCompany = location.state?.company || null;

  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [questionCount, setQuestionCount] = useState(5);
  const [mode, setMode] = useState('Text'); // 'Text' or 'Voice'

  const handleStartInterview = (e) => {
    e.preventDefault();
    navigate(`/interview/${selectedRole}`, {
      state: {
        roleId: selectedRole,
        difficulty,
        questionCount,
        mode,
        customJobTitle,
        customCompany
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* 34. Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 text-xs font-medium text-indigo-700 dark:text-indigo-300 mb-2">
          <Bot className="w-3.5 h-3.5" />
          <span>Simulated Recruiter & Technical Drill</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          AI Mock Interview Setup
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Configure your mock interview session. Practice under realistic timed constraints with AI analysis on terminology, structure, and communication.
        </p>
      </div>

      {customJobTitle && (
        <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between text-xs text-indigo-900 dark:text-indigo-200">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Configuring interview practice tailored for: <strong>{customJobTitle}</strong> at <strong>{customCompany}</strong></span>
          </div>
          <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400">Pre-calibrated</span>
        </div>
      )}

      <form onSubmit={handleStartInterview} className="space-y-6">
        {/* Section 1: Interview Type */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            1. Select Interview Domain & Role
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INTERVIEW_TYPES.map(type => {
              const isSelected = selectedRole === type.id;

              return (
                <div
                  key={type.id}
                  onClick={() => setSelectedRole(type.id)}
                  className={`p-4 rounded-xl cursor-pointer border transition-all flex items-start gap-3.5 ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 ring-1 ring-indigo-600'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span className="text-2xl mt-0.5">{type.icon}</span>
                  <div>
                    <h3 className={`text-sm font-bold ${
                      isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-900 dark:text-white'
                    }`}>
                      {type.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {type.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Difficulty & Question Count */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Difficulty */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              2. Difficulty Tier
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {['Beginner', 'Intermediate', 'Advanced'].map(diff => (
                <button
                  type="button"
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                    difficulty === diff
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              {difficulty === 'Beginner' && 'Focuses on syntax, core definitions, and foundational concepts.'}
              {difficulty === 'Intermediate' && 'Standard placement interview difficulty with trade-offs and code logic.'}
              {difficulty === 'Advanced' && 'Deep architecture, concurrency edge cases, and high-scale scenarios.'}
            </p>
          </div>

          {/* Number of Questions */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              3. Number of Questions
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {[5, 10, 15].map(count => (
                <button
                  type="button"
                  key={count}
                  onClick={() => setQuestionCount(count)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                    questionCount === count
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {count} Questions
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Estimated duration: ~{questionCount * 3} minutes with AI response analysis.
            </p>
          </div>
        </div>

        {/* Section 3: Answer Mode (Text vs Voice) */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            4. Answer Delivery Mode
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Text Mode */}
            <div
              onClick={() => setMode('Text')}
              className={`p-4 rounded-xl cursor-pointer border transition-all flex items-start gap-3.5 ${
                mode === 'Text'
                  ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 ring-1 ring-indigo-600'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Text Mode</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Type your answers in a clean markdown editor with real-time character counting and draft saving.
                </p>
              </div>
            </div>

            {/* Voice Mode */}
            <div
              onClick={() => setMode('Voice')}
              className={`p-4 rounded-xl cursor-pointer border transition-all flex items-start gap-3.5 ${
                mode === 'Voice'
                  ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 ring-1 ring-indigo-600'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Voice Mode (Speech)</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Speak aloud using browser speech recognition or simulated audio recording with live waveform.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 px-6 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 active:scale-98 transition-all shadow-lg shadow-indigo-600/20"
          >
            <Bot className="w-5 h-5" />
            <span>Start AI Mock Interview</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </form>
    </div>
  );
}
