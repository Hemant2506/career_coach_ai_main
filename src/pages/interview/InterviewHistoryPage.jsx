import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  History,
  Search,
  Filter,
  Award,
  Eye,
  Calendar,
  ChevronRight,
  TrendingUp,
  X
} from 'lucide-react';

export default function InterviewHistoryPage() {
  const { interviewHistory } = useApp();
  const navigate = useNavigate();

  const [searchRole, setSearchRole] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [minScore, setMinScore] = useState('All');

  const filteredHistory = interviewHistory.filter(item => {
    if (searchRole !== 'All' && item.role !== searchRole) return false;
    if (selectedDifficulty !== 'All' && item.difficulty !== selectedDifficulty) return false;
    if (minScore !== 'All') {
      const threshold = parseInt(minScore, 10);
      if (item.score < threshold) return false;
    }
    return true;
  });

  const uniqueRoles = Array.from(new Set(interviewHistory.map(i => i.role)));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 43. Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 text-xs font-medium text-indigo-700 dark:text-indigo-300 mb-2">
          <History className="w-3.5 h-3.5" />
          <span>Historical Interview Log</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Interview History
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Review your mock interview submissions, score breakdowns, evaluator notes, and competency growth over time.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Interview Role
            </label>
            <select
              value={searchRole}
              onChange={(e) => setSearchRole(e.target.value)}
              className="py-1.5 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              <option value="All">All Roles</option>
              {uniqueRoles.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Difficulty
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="py-1.5 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              <option value="All">All Tiers</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Min Score
            </label>
            <select
              value={minScore}
              onChange={(e) => setMinScore(e.target.value)}
              className="py-1.5 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              <option value="All">Any Score</option>
              <option value="80">80+ (Excellent)</option>
              <option value="70">70+ (Passing)</option>
              <option value="60">60+ (Baseline)</option>
            </select>
          </div>
        </div>

        {(searchRole !== 'All' || selectedDifficulty !== 'All' || minScore !== 'All') && (
          <button
            onClick={() => {
              setSearchRole('All');
              setSelectedDifficulty('All');
              setMinScore('All');
            }}
            className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* 43. Interview History Table / List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-6 font-semibold">Date</th>
                <th className="py-3.5 px-6 font-semibold">Interview Role</th>
                <th className="py-3.5 px-6 font-semibold">Difficulty</th>
                <th className="py-3.5 px-6 font-semibold">Format</th>
                <th className="py-3.5 px-6 font-semibold">Overall Score</th>
                <th className="py-3.5 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredHistory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-6 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                    {item.date}
                  </td>

                  <td className="py-4 px-6">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {item.role}
                    </span>
                    <span className="block text-[11px] text-slate-400">
                      {item.questionCount || 5} Questions answered
                    </span>
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {item.difficulty}
                    </span>
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap text-slate-500">
                    {item.mode || 'Text'} Mode
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className={`font-mono font-bold text-sm ${
                        item.score >= 80
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : item.score >= 70
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : 'text-amber-600 dark:text-amber-400'
                      }`}>
                        {item.score} / 100
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <button
                      onClick={() => navigate(`/interview/${item.roleId || 'software-developer'}/result`, { state: { result: item } })}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-600 text-indigo-700 dark:text-indigo-300 hover:text-white font-semibold transition-all shadow-2xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Breakdown</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredHistory.length === 0 && (
          <div className="text-center py-12 p-6 text-xs text-slate-500">
            No interview records found matching your active filter criteria.
          </div>
        )}
      </div>
    </div>
  );
}
