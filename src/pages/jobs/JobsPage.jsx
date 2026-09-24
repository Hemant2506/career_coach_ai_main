import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Briefcase,
  Search,
  MapPin,
  Bookmark,
  BookmarkCheck,
  Filter,
  X,
  Building,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';

export default function JobsPage() {
  const { jobs, savedJobIds, toggleSaveJob, isJobSaved } = useApp();
  const [searchParams] = useSearchParams();

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedRole, setSelectedRole] = useState(searchParams.get('role') || 'All');
  const [selectedExperience, setSelectedExperience] = useState('All');
  const [selectedJobType, setSelectedJobType] = useState('All');
  const [onlySaved, setOnlySaved] = useState(false);

  // Filter options derived from jobs data
  const locations = useMemo(() => {
    const set = new Set();
    jobs.forEach(j => {
      const city = j.location.split(',')[0].trim();
      set.add(city);
    });
    return Array.from(set);
  }, [jobs]);

  const roles = useMemo(() => {
    const set = new Set();
    jobs.forEach(j => set.add(j.roleCategory));
    return Array.from(set);
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      if (onlySaved && !savedJobIds.includes(job.id)) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesCompany = job.company.toLowerCase().includes(query);
        const matchesLocation = job.location.toLowerCase().includes(query);
        const matchesSkills = job.skills.some(s => s.toLowerCase().includes(query));
        if (!matchesTitle && !matchesCompany && !matchesLocation && !matchesSkills) return false;
      }

      if (selectedIndustry !== 'All' && job.industry !== selectedIndustry) return false;
      if (selectedLocation !== 'All' && !job.location.includes(selectedLocation)) return false;
      if (selectedRole !== 'All' && job.roleCategory !== selectedRole) return false;
      if (selectedExperience !== 'All' && job.experience !== selectedExperience) return false;
      if (selectedJobType !== 'All' && job.jobType !== selectedJobType) return false;

      return true;
    });
  }, [jobs, searchQuery, selectedIndustry, selectedLocation, selectedRole, selectedExperience, selectedJobType, onlySaved, savedJobIds]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedIndustry('All');
    setSelectedLocation('All');
    setSelectedRole('All');
    setSelectedExperience('All');
    setSelectedJobType('All');
    setOnlySaved(false);
  };

  const hasActiveFilters = searchQuery || selectedIndustry !== 'All' || selectedLocation !== 'All' ||
    selectedRole !== 'All' || selectedExperience !== 'All' || selectedJobType !== 'All' || onlySaved;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 24. Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 text-xs font-medium text-indigo-700 dark:text-indigo-300 mb-2">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Curated Tech Opportunities</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Find Your Next Opportunity
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Browse verified graduate and fresher positions across Vadodara and top Indian technology hubs.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        {/* Top Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search job title, company, skills (e.g. Java, Vadodara, ABC Technologies)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 shadow-2xs"
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

        {/* Filter Controls Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {/* Location Filter */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Location
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full py-1.5 px-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              <option value="All">All Locations</option>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Role Filter */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Job Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full py-1.5 px-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              <option value="All">All Roles</option>
              {roles.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Industry Filter */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Industry
            </label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full py-1.5 px-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              <option value="All">All Sectors</option>
              <option value="it">Information Tech</option>
              <option value="banking-finance">Banking & Finance</option>
              <option value="healthcare">Healthcare</option>
              <option value="automobile">Automobile</option>
              <option value="design">Design</option>
              <option value="cybersecurity">Cybersecurity</option>
            </select>
          </div>

          {/* Experience Filter */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Experience
            </label>
            <select
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              className="w-full py-1.5 px-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              <option value="All">All Experience</option>
              <option value="Fresher">Fresher (0 Years)</option>
              <option value="0-1 Year">0 - 1 Year</option>
              <option value="0-2 Years">0 - 2 Years</option>
              <option value="1-2 Years">1 - 2 Years</option>
            </select>
          </div>

          {/* Job Type Filter */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Job Type
            </label>
            <select
              value={selectedJobType}
              onChange={(e) => setSelectedJobType(e.target.value)}
              className="w-full py-1.5 px-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              <option value="All">All Types</option>
              <option value="Full Time">Full Time</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          {/* Toggle Saved Only */}
          <div className="flex flex-col justify-end">
            <button
              type="button"
              onClick={() => setOnlySaved(!onlySaved)}
              className={`py-1.5 px-2.5 text-xs font-semibold rounded-lg border flex items-center justify-center gap-1.5 transition-colors ${
                onlySaved
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-700 dark:bg-indigo-950/60 dark:border-indigo-800 dark:text-indigo-300'
                  : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved ({savedJobIds.length})</span>
            </button>
          </div>
        </div>

        {/* Active Filters Clear Row */}
        {hasActiveFilters && (
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-500">
              Showing <strong className="text-slate-900 dark:text-white font-mono">{filteredJobs.length}</strong> matching vacancies
            </span>
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-semibold hover:underline"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* 25. Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => {
          const isSaved = isJobSaved(job.id);

          return (
            <div
              key={job.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Company & Title & Save Button */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-xl flex items-center justify-center shrink-0">
                      {job.logo || '🏢'}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                        {job.title}
                      </h3>
                      <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-0.5">
                        {job.company}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSaveJob(job.id)}
                    title={isSaved ? 'Remove from saved' : 'Save job'}
                    className={`p-2 rounded-lg transition-colors ${
                      isSaved
                        ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 dark:text-indigo-400'
                        : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-50 dark:bg-slate-800'
                    }`}
                  >
                    {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{job.location}</span>
                </div>

                {/* Badges / Metadata */}
                <div className="flex flex-wrap items-center gap-2 mb-4 text-[11px] font-medium text-slate-600 dark:text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                    {job.jobType}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                    {job.experience}
                  </span>
                </div>

                {/* Salary */}
                <div className="mb-4">
                  <span className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400">
                    {job.salary}
                  </span>
                </div>

                {/* Skills tags */}
                <div className="mb-4">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Skills:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons: View Details & Save */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <Link
                  to={`/jobs/${job.id}`}
                  className="flex-1 py-2 px-3 text-center text-xs font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-2xs"
                >
                  View Details
                </Link>
                <button
                  onClick={() => toggleSaveJob(job.id)}
                  className="py-2 px-3 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  {isSaved ? 'Saved' : 'Save Job'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredJobs.length === 0 && (
        <div className="text-center py-16 p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-lg mx-auto">
          <Briefcase className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {onlySaved ? 'No saved jobs yet' : 'No jobs matched your filters'}
          </h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            {onlySaved
              ? 'Explore available opportunities and save jobs you are interested in for quick access later.'
              : 'Try broadening your search term or resetting one of the location/role dropdowns.'}
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
