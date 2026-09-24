import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  HelpCircle,
  Plus,
  Trash2,
  Bot,
  CheckCircle2,
  X,
  Sparkles
} from 'lucide-react';

export default function AdminManageQuestionsPage() {
  const { interviewQuestions, addQuestion, deleteQuestion } = useApp();

  const [selectedRole, setSelectedRole] = useState('software-developer');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    text: '',
    category: 'Core Concepts',
    difficulty: 'Intermediate',
    expectedKeywords: 'block scope, temporal dead zone',
    modelAnswer: '',
    evaluationCriteria: 'Direct definition and code example.'
  });

  const currentRoleData = interviewQuestions[selectedRole] || { title: selectedRole, questions: [] };
  const questionsList = currentRoleData.questions || [];

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const kwArray = formData.expectedKeywords.split(',').map(s => s.trim()).filter(Boolean);

    addQuestion(selectedRole, {
      ...formData,
      expectedKeywords: kwArray
    });

    setIsModalOpen(false);
    setFormData({
      text: '',
      category: 'Core Concepts',
      difficulty: 'Intermediate',
      expectedKeywords: '',
      modelAnswer: '',
      evaluationCriteria: ''
    });
  };

  const handleDelete = (qId) => {
    if (window.confirm('Delete this interview question?')) {
      deleteQuestion(selectedRole, qId);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 52. Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Manage Interview Questions & Rubrics
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure questions, expected keywords, and evaluation rubrics for the AI Mock Interview simulator.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Question</span>
        </button>
      </div>

      {/* Role Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200 dark:border-slate-800">
        {Object.entries(interviewQuestions).map(([key, role]) => (
          <button
            key={key}
            onClick={() => setSelectedRole(key)}
            className={`py-2 px-3 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
              selectedRole === key
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {role.title || key} ({role.questions?.length || 0})
          </button>
        ))}
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {questionsList.map((q, idx) => (
          <div
            key={q.id || idx}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs text-purple-600 dark:text-purple-400">
                  Q{idx + 1}.
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {q.difficulty}
                </span>
                <span className="text-[11px] text-slate-400">·</span>
                <span className="text-[11px] font-medium text-slate-500">
                  {q.category}
                </span>
              </div>

              <button
                onClick={() => handleDelete(q.id)}
                className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                title="Delete question"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
              "{q.text}"
            </h3>

            {/* Expected Keywords */}
            {q.expectedKeywords && q.expectedKeywords.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Keywords:
                </span>
                {q.expectedKeywords.map(kw => (
                  <span key={kw} className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300">
                    {kw}
                  </span>
                ))}
              </div>
            )}

            {/* Model Answer Preview */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300">
              <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">
                Suggested Benchmark Answer:
              </span>
              <p className="line-clamp-2 leading-relaxed text-[11px]">{q.modelAnswer}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Question Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Add Question for {currentRoleData.title}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3.5 text-xs max-h-[75vh] overflow-y-auto pr-1">
              <div>
                <label className="block font-semibold mb-1">Question Prompt *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. Explain how async/await works under the hood in V8 engine."
                  value={formData.text}
                  onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
                  className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="e.g. Concurrency"
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Expected Keywords (comma separated)</label>
                <input
                  type="text"
                  placeholder="promises, microtasks, event loop, callstack"
                  value={formData.expectedKeywords}
                  onChange={(e) => setFormData(prev => ({ ...prev, expectedKeywords: e.target.value }))}
                  className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Suggested Model Answer *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Provide complete benchmark explanation..."
                  value={formData.modelAnswer}
                  onChange={(e) => setFormData(prev => ({ ...prev, modelAnswer: e.target.value }))}
                  className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Evaluation Criteria & Rubric</label>
                <input
                  type="text"
                  placeholder="e.g. Must mention microtask priority over macrotasks."
                  value={formData.evaluationCriteria}
                  onChange={(e) => setFormData(prev => ({ ...prev, evaluationCriteria: e.target.value }))}
                  className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold rounded-lg text-white bg-purple-600 hover:bg-purple-700"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
