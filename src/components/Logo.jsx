import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Sparkles, TrendingUp } from 'lucide-react';

export function Logo({ size = 'default', showTagline = false, className = '' }) {
  const isSmall = size === 'small';
  const isLarge = size === 'large';

  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 group ${className}`}>
      {/* Brand Icon: Briefcase + Spark + Career Arrow */}
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200 ${
        isSmall ? 'w-8 h-8' : isLarge ? 'w-12 h-12' : 'w-10 h-10'
      }`}>
        <Briefcase className={isSmall ? 'w-4 h-4' : isLarge ? 'w-6 h-6' : 'w-5 h-5'} />
        {/* Sparkle badge */}
        <div className="absolute -top-1 -right-1 p-0.5 rounded-full bg-purple-500 text-white shadow-xs">
          <Sparkles className="w-2.5 h-2.5 animate-pulse" />
        </div>
        {/* Trend arrow indicator */}
        <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-emerald-500 text-white shadow-xs">
          <TrendingUp className="w-2.5 h-2.5" />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-bold tracking-tight text-slate-900 dark:text-white ${
            isSmall ? 'text-base' : isLarge ? 'text-2xl' : 'text-lg'
          }`}>
            Career Coach
          </span>
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            AI
          </span>
        </div>
        {showTagline && (
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 tracking-wide">
            Learn. Prepare. Improve. Get Career Ready.
          </span>
        )}
      </div>
    </Link>
  );
}
