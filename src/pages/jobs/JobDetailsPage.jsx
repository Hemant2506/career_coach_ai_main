import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import {
  Briefcase,
  ArrowLeft,
  MapPin,
  Bookmark,
  BookmarkCheck,
  Bot,
  Send,
  CheckCircle2,
  Calendar,
  Building,
  GraduationCap,
  Sparkles,
  X
} from 'lucide-react';

export default function JobDetailsPage() {
  const { id } = useParams();
  const { jobs, isJobSaved, toggleSaveJob, showToast } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [coverNote, setCoverNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const job = jobs.find(j => j.id === id) || jobs[0];
  const isSaved = isJobSaved(job.id);

  // Map job role to interview preset
  const getInterviewRoleId = (roleName) => {
    const lower = (roleName || '').toLowerCase();
    if (lower.includes('data')) return 'data-analyst';
    if (lower.includes('web') || lower.includes('react') || lower.includes('frontend')) return 'web-developer';
    if (lower.includes('hr') || lower.includes('behavioral')) return 'hr-interview';
    return 'software-developer';
  };

  const handlePracticeInterview = () => {
    const roleId = getInterviewRoleId(job.roleCategory || job.title);
    navigate('/interview/setup', {
      state: {
        roleId,
        jobTitle: job.title,
        company: job.company,
        jobSkills: job.skills
      }
    });
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsApplyModalOpen(false);
      setHasApplied(true);
      showToast(`🎉 Application successfully submitted to ${job.company}!`);
    }, 600);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Navigation */}
      <Link
        to="/jobs"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Job Search</span>
      </Link>

      {/* Main Job Header Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-2xl flex items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-900">
              {job.logo || '🏢'}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  {job.industryName || 'Technology'}
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-xs text-slate-400">{job.postedDate}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {job.title}
              </h1>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">
                {job.company}
              </p>
            </div>
          </div>

          {/* Action CTAs: Apply, Save, Practice Interview */}
          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => toggleSaveJob(job.id)}
              className={`p-2.5 rounded-xl border transition-colors ${
                isSaved
                  ? 'text-indigo-600 bg-indigo-50 border-indigo-200 dark:bg-indigo-950/60 dark:border-indigo-800'
                  : 'text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
              title={isSaved ? 'Job saved' : 'Save job'}
            >
              {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
            </button>

            <button
              onClick={handlePracticeInterview}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/80 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors shadow-2xs"
            >
              <Bot className="w-4 h-4" />
              <span>Practice Interview</span>
            </button>

            <button
              onClick={() => setIsApplyModalOpen(true)}
              disabled={hasApplied}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl text-white shadow-xs transition-colors ${
                hasApplied
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>{hasApplied ? 'Applied ✓' : 'Apply Now'}</span>
            </button>
          </div>
        </div>

        {/* Key Job Attributes Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-slate-100 dark:border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Location</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {job.location}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Compensation</span>
            <span className="font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5 text-sm">
              {job.salary}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Experience</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
              {job.experience}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Employment Type</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
              {job.jobType}
            </span>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="pt-6 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
              Job Description
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* Required Skills */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
              Required Technical Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Key Responsibilities */}
          {job.responsibilities && (
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                Key Responsibilities
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements & Qualifications */}
          {job.requirements && (
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                Candidate Requirements
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-2" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs">
            <span className="text-slate-500">Minimum Educational Qualification:</span>
            <span className="font-semibold text-slate-900 dark:text-white">{job.qualification}</span>
          </div>
        </div>
      </div>

      {/* AI Interview Launch Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold text-indigo-300 uppercase tracking-wider">
            Preparation Advantage
          </span>
          <h3 className="text-lg font-bold mt-0.5">Practice Before Applying</h3>
          <p className="text-xs text-indigo-200 max-w-xl mt-1">
            Our AI interviewer has questions calibrated specifically for the <strong>{job.title}</strong> role at {job.company}. Receive immediate feedback on technical keywords and communication.
          </p>
        </div>
        <button
          onClick={handlePracticeInterview}
          className="px-5 py-2.5 rounded-xl font-semibold text-xs text-indigo-950 bg-white hover:bg-slate-100 shadow-md transition-colors shrink-0"
        >
          Launch Mock Drill Now
        </button>
      </div>

      {/* Apply Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Apply for {job.title}
                </h3>
                <p className="text-xs text-slate-500">{job.company} · {job.location}</p>
              </div>
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Applicant Profile
                </label>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 space-y-1">
                  <p><strong className="text-slate-900 dark:text-white">{user?.name || 'Hemant Saraswat'}</strong></p>
                  <p>{user?.email || 'demo@careercoach.ai'}</p>
                  <p>{user?.education || 'B.Tech in Computer Science'}</p>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Why are you a great fit? (Cover Note)
                </label>
                <textarea
                  rows={3}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  placeholder="Mention your relevant coursework, projects, or why you are excited to join ABC Technologies..."
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="p-3 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-center">
                <span className="text-[11px] text-slate-500 block">
                  📄 Resume on file: <strong>Hemant_Saraswat_Resume_2026.pdf</strong>
                </span>
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium cursor-pointer hover:underline">
                  Update stored resume
                </span>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 text-xs font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
