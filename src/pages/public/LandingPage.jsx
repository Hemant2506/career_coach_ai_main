import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../components/Logo';
import { useTheme } from '../../context/ThemeContext';
import { IMAGES } from '../../assets/assets';
import {
  Compass,
  GraduationCap,
  Briefcase,
  Bot,
  TrendingUp,
  LineChart,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Sun,
  Moon,
  ChevronRight,
  ShieldCheck,
  Star
} from 'lucide-react';

export default function LandingPage() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors selection:bg-indigo-500 selection:text-white">
      {/* Top Bar Contract: Brand — 4-6 Nav Links — Actions */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Logo size="default" showTagline={false} />

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">How It Works</a>
            <Link to="/career" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Career Paths</Link>
            <Link to="/jobs" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Jobs</Link>
            <Link to="/learn" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Courses</Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
            <Link
              to="/login"
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-lg shadow-sm transition-all"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 text-xs font-medium text-indigo-700 dark:text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>AI-Powered Career Guidance & Interview Engine</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight" style={{ textWrap: 'balance' }}>
            Build Your Career With <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500">AI</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed" style={{ textWrap: 'balance' }}>
            Explore careers, develop in-demand skills, discover job opportunities, and practice realistic interviews with your personal AI career coach.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-600/20 active:scale-95 transition-all"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#features"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs transition-all"
            >
              <span>Explore Features</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>

            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/60 rounded-xl border border-purple-200/60 dark:border-purple-800/60 transition-all"
            >
              <span>Launch Demo Mode</span>
            </Link>
          </div>

          {/* Social Proof Stats */}
          <div className="mt-12 pt-8 border-t border-slate-200/70 dark:border-slate-800/70 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div>
              <p className="text-2xl lg:text-3xl font-bold font-mono text-slate-900 dark:text-white">12,500+</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Students Guided</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-bold font-mono text-slate-900 dark:text-white">92.4%</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Interview Readiness</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-bold font-mono text-slate-900 dark:text-white">45,000+</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">AI Mock Interviews</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-bold font-mono text-slate-900 dark:text-white">150+</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Hiring Partners</p>
            </div>
          </div>

          {/* Hero Visual Preview */}
          <div className="mt-12 relative max-w-5xl mx-auto rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-slate-900">
            <img
              src={IMAGES.landingHero}
              alt="Career Coach AI Dashboard Preview"
              className="w-full h-auto object-cover transform hover:scale-[1.01] transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end justify-between p-6 text-left">
              <div>
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Live Platform Preview</span>
                <h3 className="text-lg font-bold text-white">Full-Stack Career Acceleration Suite</h3>
              </div>
              <Link
                to="/interview/setup"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm"
              >
                <Bot className="w-4 h-4" />
                <span>Try Mock Interview</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2">
              Comprehensive Platform Capabilities
            </h2>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Everything You Need to Succeed in Tech Placements
            </h3>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm">
              Integrated end-to-end guidance from self-discovery through skill acquisition to interview clearance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-5">
                <Compass className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Career Guidance</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Discover targeted career paths based on your academic stream, personal interests, strengths, and market demand.
              </p>
              <Link to="/career" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1">
                Explore Roadmaps <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-5">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Skill Development</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Learn through modular courses, interactive video lectures, key takeaway flashcards, and progress tracking.
              </p>
              <Link to="/learn" className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center gap-1">
                Browse Courses <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5">
                <Briefcase className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Job Discovery</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Explore verified vacancies across 12+ industries with salary transparency, experience tiers, and direct interview launch.
              </p>
              <Link to="/jobs" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1">
                View 15+ Demo Jobs <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5">
                <Bot className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">AI Interview Simulator</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Practice realistic technical and HR interviews with speech or text input, simulated AI scoring, and instant model answers.
              </p>
              <Link to="/interview/setup" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1">
                Setup Mock Drill <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-5">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Skill Gap Analysis</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Benchmark your current competencies against job descriptions to identify the exact missing skills you need to close.
              </p>
              <Link to="/assessments" className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1">
                Take Skill Test <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-5">
                <LineChart className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Performance Tracking</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Monitor your interview trends, assessment radar, career readiness score, and historical progression over time.
              </p>
              <Link to="/performance" className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline inline-flex items-center gap-1">
                View Analytics <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (01 Discover -> 02 Learn -> 03 Practice -> 04 Improve) */}
      <section id="how-it-works" className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2">
              Four Steps to Placement
            </h2>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              How Career Coach AI Prepares You
            </h3>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm">
              Follow our structured engineering pathway designed to elevate freshers into industry-ready software engineers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative">
              <span className="text-3xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400 block mb-4">01</span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">Discover</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Define your career goals, target industries, and evaluate your baseline strengths across foundational technical subjects.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative">
              <span className="text-3xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400 block mb-4">02</span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">Learn</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Upskill through curated video lectures, structured syllabi, and practice assignments designed by veteran industry engineers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative">
              <span className="text-3xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400 block mb-4">03</span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">Practice</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Take timed skill assessments and simulate high-pressure technical mock interviews with realistic AI evaluation rubrics.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative">
              <span className="text-3xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400 block mb-4">04</span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">Improve</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Review detailed AI feedback, study model suggested answers, bridge identified skill gaps, and apply to matched vacancies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-16 bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Ready to Accelerate Your Tech Career?
          </h3>
          <p className="text-sm sm:text-base text-indigo-100 max-w-xl mx-auto mb-8">
            Join thousands of college graduates and job seekers practicing mock interviews and landing high-paying software roles.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/register"
              className="px-6 py-3 text-sm font-semibold text-indigo-950 bg-white hover:bg-slate-100 rounded-xl shadow-lg transition-all"
            >
              Create Free Account
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 text-sm font-semibold text-white bg-indigo-700/60 hover:bg-indigo-700 rounded-xl border border-indigo-500/40 transition-all"
            >
              Demo Login
            </Link>
          </div>
        </div>
      </section>

      {/* Clean Footer */}
      <footer className="mt-auto py-10 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo size="small" />
          <div className="flex items-center gap-6">
            <Link to="/career" className="hover:text-slate-900 dark:hover:text-white">Career Paths</Link>
            <Link to="/jobs" className="hover:text-slate-900 dark:hover:text-white">Jobs</Link>
            <Link to="/learn" className="hover:text-slate-900 dark:hover:text-white">Courses</Link>
            <Link to="/admin" className="hover:text-slate-900 dark:hover:text-white">Admin Console</Link>
          </div>
          <p>© 2026 Career Coach AI. Learn. Prepare. Improve. Get Career Ready.</p>
        </div>
      </footer>
    </div>
  );
}
