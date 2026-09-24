import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import {
  LineChart as LineChartIcon,
  Sparkles,
  TrendingUp,
  Award,
  Compass,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Zap,
  Target
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

export default function PerformancePage() {
  const { user } = useAuth();
  const { interviewHistory } = useApp();

  const radarData = [
    { subject: 'Technical', student: 85, benchmark: 70 },
    { subject: 'Communication', student: 92, benchmark: 65 },
    { subject: 'Problem Solving', student: 75, benchmark: 68 },
    { subject: 'Grammar', student: 90, benchmark: 75 },
    { subject: 'Confidence', student: 80, benchmark: 60 },
  ];

  const skillBars = [
    { skill: 'Java', score: 90 },
    { skill: 'SQL', score: 80 },
    { skill: 'JavaScript', score: 60 },
    { skill: 'React', score: 40 },
    { skill: 'Git', score: 50 },
    { skill: 'Data Structures', score: 75 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 44. Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 text-xs font-medium text-indigo-700 dark:text-indigo-300 mb-2">
          <LineChartIcon className="w-3.5 h-3.5" />
          <span>Diagnostic Career Analytics</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Performance Analytics
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Comprehensive multi-dimensional evaluation of your placement readiness, interview confidence, and technical mastery.
        </p>
      </div>

      {/* 44. Overall Career Readiness & Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Readiness Gauge Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-tr from-indigo-900 via-indigo-800 to-purple-900 text-white flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-200">
                Overall Career Readiness
              </span>
              <Award className="w-5 h-5 text-indigo-300" />
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-5xl font-extrabold font-mono text-white">78%</span>
              <span className="text-xs text-indigo-200 font-medium">Placement Ready</span>
            </div>
            <p className="mt-3 text-xs text-indigo-100/90 leading-relaxed">
              Based on 5 mock interview evaluations, 4 technical diagnostics, and 6 finished coursework modules.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
            <span>Target: Software Developer</span>
            <Link to="/career/software-developer" className="text-indigo-200 hover:text-white font-semibold underline">
              View Milestones
            </Link>
          </div>
        </div>

        {/* 45. AI Performance Insights Card 1 */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Key AI Insight
              </h3>
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Your strongest area is Communication.
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Your structured answers using the STAR method score in the top <strong>92nd percentile</strong> among college engineering graduates.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            <TrendingUp className="w-4 h-4" />
            <span>High Recruiter Appeal</span>
          </div>
        </div>

        {/* 45. AI Performance Insights Card 2 */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Velocity Trajectory
              </h3>
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              +14% Technical Interview Growth
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Your technical interview score has improved by 14% over your last three attempts (from 68 to 82).
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
            Recommended focus: <span className="font-bold text-slate-800 dark:text-slate-200">React + SQL</span>
          </div>
        </div>
      </div>

      {/* 44. Charts Section: Radar Chart & Skills Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Radar Chart */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Core Competency Radar
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Your performance (indigo) benchmarked against average fresher candidates (gray)
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#cbd5e1" strokeOpacity={0.4} />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748b' }} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Industry Benchmark" dataKey="benchmark" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.2} />
                <Radar name="Your Score" dataKey="student" stroke="#6366f1" fill="#6366f1" fillOpacity={0.5} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '8px',
                    border: 'none',
                    color: '#f8fafc',
                    fontSize: '12px'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Technical Competencies Bar Chart */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Technical Knowledge Breakdown
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Proficiency scores evaluated across assessments and coding drills
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillBars} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.4} />
                <XAxis dataKey="skill" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '8px',
                    border: 'none',
                    color: '#f8fafc',
                    fontSize: '12px'
                  }}
                  formatter={(val) => [`${val}%`, 'Proficiency']}
                />
                <Bar dataKey="score" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 45. AI Synthesis Callout */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Personalized AI Action Plan
          </h3>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          To achieve a <strong>90%+ placement probability</strong> for Software Developer openings in Vadodara and Bengaluru, we recommend completing the following actions over the next 10 days:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">1. Upskill in React</span>
            <p className="text-[11px] text-slate-500">Finish Module 2 of React.js Architecture to lift score from 40% to 70%.</p>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
            <span className="font-bold text-purple-600 dark:text-purple-400 block mb-1">2. Advanced SQL Drill</span>
            <p className="text-[11px] text-slate-500">Practice window functions & CTE queries to master tier-1 technical questions.</p>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">3. Live Voice Mock Drill</span>
            <p className="text-[11px] text-slate-500">Conduct 1 voice interview session to hone vocal delivery and latency.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
