import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import {
  Compass,
  Sparkles,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  TrendingUp,
  SlidersHorizontal,
  ChevronRight,
  BookOpen
} from 'lucide-react';

export default function CareerGuidancePage() {
  const { careers } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Selection fields
  const [education, setEducation] = useState(user?.education || 'B.Tech in Computer Science & Engineering');
  const [interest, setInterest] = useState('All');
  const [industry, setIndustry] = useState('All');
  const [location, setLocation] = useState('All');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedSkillFilter, setSelectedSkillFilter] = useState('All');

  const filteredCareers = careers.filter(career => {
    if (industry !== 'All' && career.industry.toLowerCase() !== industry.toLowerCase() && !career.industry.includes(industry)) return false;
    if (interest !== 'All' && career.category !== interest) return false;
    if (selectedSkillFilter !== 'All' && !career.requiredSkills.some(s => s.toLowerCase().includes(selectedSkillFilter.toLowerCase()))) return false;
    return true;
  });

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 600);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 19. Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 text-xs font-medium text-indigo-700 dark:text-indigo-300 mb-2">
          <Compass className="w-3.5 h-3.5" />
          <span>Intelligent Career Matching Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Find Your Career Path
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
          Discover optimal career options based on your educational background, core technical interests, and current skill competencies.
        </p>
      </div>

      {/* Career Preferences Selector Form */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
            <span>Customize Recommendation Parameters</span>
          </div>
          <button
            onClick={() => {
              setInterest('All');
              setIndustry('All');
              setSelectedSkillFilter('All');
            }}
            className="text-xs font-medium text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Reset Filters
          </button>
        </div>

        <form onSubmit={handleGenerate} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Education / Degree
            </label>
            <select
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="w-full py-2 px-3 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
            >
              <option value="B.Tech in Computer Science & Engineering">B.Tech / B.E (Computer Science / IT)</option>
              <option value="BCA / MCA">BCA / MCA</option>
              <option value="B.Sc Computer Science / Data">B.Sc Computer Science / Data</option>
              <option value="Other Engineering">Mechanical / Electrical / Electronics</option>
              <option value="Non-Tech Graduate">BBA / B.Com / Arts</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Core Technical Interest
            </label>
            <select
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className="w-full py-2 px-3 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Disciplines</option>
              <option value="Engineering">Software & Web Engineering</option>
              <option value="Data & Analytics">Data, AI & Analytics</option>
              <option value="Security">Cybersecurity & Defense</option>
              <option value="Infrastructure">Cloud & Infrastructure</option>
              <option value="Design">Product & UI/UX Design</option>
              <option value="Marketing">Growth & Digital Marketing</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Target Industry
            </label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full py-2 px-3 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Industries</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Banking & Finance">Banking & Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Data & Analytics">Data & Analytics</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 active:scale-98 transition-all shadow-md shadow-indigo-600/20 disabled:opacity-50"
            >
              {isGenerating ? (
                <span>Matching Profiles...</span>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Recommendations</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* 20. Career Recommendations List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Recommended Career Pathways ({filteredCareers.length})
          </h2>
          <span className="text-xs text-slate-500">Sorted by relevance match score</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCareers.map((career) => (
            <div
              key={career.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      {career.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                      {career.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    {career.matchScore}% Match
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                  {career.description}
                </p>

                {/* Salary & Openings */}
                <div className="py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 mb-4 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Salary Range</span>
                    <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{career.salaryRange}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px]">Active Jobs</span>
                    <span className="font-mono font-semibold text-indigo-600 dark:text-indigo-400">{career.relatedJobsCount}+ Openings</span>
                  </div>
                </div>

                {/* Required Skills (clean inline tags) */}
                <div className="mb-4">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                    Required Core Skills:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {career.requiredSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <Link
                  to={`/career/${career.id}`}
                  className="flex-1 py-2 px-3 text-center text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all"
                >
                  Explore Career
                </Link>
                <Link
                  to="/jobs"
                  className="py-2 px-3 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all"
                >
                  View Jobs
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
