import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Search,
  Laptop,
  Landmark,
  Activity,
  Car,
  Cpu,
  GraduationCap,
  Radio,
  ShoppingBag,
  Shield,
  BarChart3,
  Target,
  Palette,
  ArrowRight,
  Briefcase
} from 'lucide-react';

const ICON_MAP = {
  Laptop,
  Landmark,
  Activity,
  Car,
  Cpu,
  GraduationCap,
  Radio,
  ShoppingBag,
  Shield,
  BarChart3,
  Target,
  Palette
};

export default function IndustryExplorerPage() {
  const { industries } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIndustries = industries.filter(ind =>
    ind.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ind.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ind.popularSkills?.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 22. Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 text-xs font-medium text-indigo-700 dark:text-indigo-300 mb-2">
          <Building2 className="w-3.5 h-3.5" />
          <span>Sector Insights & Vertical Horizons</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Explore Industries
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Discover hiring trends, required skillsets, and opening densities across key enterprise and startup sectors.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          placeholder="Search industries, skills, or domains..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 shadow-2xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-600"
          >
            Clear
          </button>
        )}
      </div>

      {/* 22. Industry Cards Grid (12 items) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIndustries.map((ind) => {
          const IconComponent = ICON_MAP[ind.icon] || Building2;

          return (
            <div
              key={ind.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {ind.jobRolesCount} Roles
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {ind.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                  {ind.description}
                </p>

                {/* Popular Skills preview */}
                {ind.popularSkills && (
                  <div className="mb-4">
                    <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block mb-1.5">
                      Top Skills:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {ind.popularSkills.slice(0, 4).map(skill => (
                        <span key={skill} className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {skill}
                        </span>
                      ))}
                      {ind.popularSkills.length > 4 && (
                        <span className="text-[10px] text-slate-400 self-center">
                          +{ind.popularSkills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                  {ind.marketGrowth || 'Growing hiring demand'}
                </span>
                <Link
                  to={`/industries/${ind.id}`}
                  className="inline-flex items-center gap-1.5 py-1.5 px-3 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-600 text-indigo-700 dark:text-indigo-300 hover:text-white transition-all"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {filteredIndustries.length === 0 && (
        <div className="text-center py-12 p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <Building2 className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">No industries matched "{searchQuery}"</h3>
          <p className="text-xs text-slate-500 mt-1">Try searching for keywords like "Software", "Finance", "Healthcare" or "Design".</p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg"
          >
            Clear Search Filter
          </button>
        </div>
      )}
    </div>
  );
}
