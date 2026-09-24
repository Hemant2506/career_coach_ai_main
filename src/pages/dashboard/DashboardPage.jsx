import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Award,
  BookOpen,
  Briefcase,
  Bot,
  Compass,
  ArrowRight,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Clock,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export default function DashboardPage() {
  const { user } = useAuth();
  const { interviewHistory, savedJobIds, jobs } = useApp();
  const navigate = useNavigate();

  // Format historical chart data
  const chartData = interviewHistory && interviewHistory.length > 0
    ? [...interviewHistory].reverse().map((item, index) => ({
        attempt: `Attempt ${index + 1}`,
        score: item.score,
        date: item.date,
        role: item.role
      }))
    : [
        { attempt: 'Attempt 1', score: 62 },
        { attempt: 'Attempt 2', score: 68 },
        { attempt: 'Attempt 3', score: 71 },
        { attempt: 'Attempt 4', score: 77 },
        { attempt: 'Attempt 5', score: 82 }
      ];

  const latestScore = interviewHistory[0]?.score || 82;
  const firstName = user?.name ? user.name.split(' ')[0] : 'Hemant';

  const skillsList = [
    { name: 'Java', level: 90, color: 'bg-indigo-600' },
    { name: 'SQL', level: 80, color: 'bg-blue-600' },
    { name: 'JavaScript', level: 60, color: 'bg-amber-500' },
    { name: 'React', level: 40, color: 'bg-cyan-500' },
    { name: 'Git', level: 50, color: 'bg-emerald-600' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 13. Top Greeting & Career Goal Card */}
      <div className="flex flex-col lg:flex-row items-stretch gap-6">
        {/* Welcome Banner */}
        <div className="flex-1 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white relative overflow-hidden shadow-lg shadow-indigo-950/20">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-indigo-200 mb-3 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              <span>AI Coaching Active</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {firstName} 👋
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-indigo-200 font-normal">
              Ready to build your career today?
            </p>
            <p className="mt-3 text-xs text-indigo-300/90 max-w-lg leading-relaxed">
              Your overall readiness is at <span className="font-bold text-white font-mono">78%</span>. Complete 1 mock interview or 2 lessons to reach this week's milestone.
            </p>
          </div>

          {/* Background decorative elements */}
          <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Career Goal Card */}
        <div className="w-full lg:w-96 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Your Career Goal
              </span>
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                68% Completed
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {user?.careerGoal || 'Software Developer'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Target Industry: <span className="font-medium text-slate-700 dark:text-slate-300">Information Technology</span>
            </p>

            <div className="mt-4">
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full transition-all duration-500"
                  style={{ width: '68%' }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1.5 font-mono">
                <span>Phase 4 of 7</span>
                <span>Next: Project Portfolio</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Link
              to="/career/software-developer"
              className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-white bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-600 dark:hover:bg-indigo-600 rounded-xl transition-all"
            >
              <span>View Career Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 14. Dashboard Statistics (4 Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Interview Score */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Interview Score</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white">
              {latestScore}/100
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14% in last 3 attempts</span>
          </div>
        </div>

        {/* Card 2: Courses Completed */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Courses Completed</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white">
              6
            </span>
            <span className="text-xs text-slate-400 font-mono">/ 11 in plan</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
            <span>2 currently in progress</span>
          </div>
        </div>

        {/* Card 3: Skills Improved */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Skills Improved</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white">
              8
            </span>
            <span className="text-xs text-slate-400">competencies</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            <span>Java & SQL at Advanced</span>
          </div>
        </div>

        {/* Card 4: Job Matches */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Job Matches</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white">
              24
            </span>
            <span className="text-xs text-slate-400">active openings</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-blue-600 dark:text-blue-400 font-medium">
            <span>5 matches in Vadodara</span>
          </div>
        </div>
      </div>

      {/* 15. Dashboard Quick Actions */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Action 1 */}
          <Link
            to="/interview/setup"
            className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Bot className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">AI Interview</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Practice realistic mock interviews with AI evaluation</p>
            </div>
            <div className="mt-4 pt-3 flex items-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform">
              <span>Start Mock Drill</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </Link>

          {/* Action 2 */}
          <Link
            to="/learn"
            className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Learn Skills</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Watch video lessons and complete technical curricula</p>
            </div>
            <div className="mt-4 pt-3 flex items-center text-xs font-semibold text-purple-600 dark:text-purple-400 group-hover:translate-x-0.5 transition-transform">
              <span>Browse Courses</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </Link>

          {/* Action 3 */}
          <Link
            to="/jobs"
            className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Briefcase className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Find Jobs</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Explore fresher openings and practice tailored interview questions</p>
            </div>
            <div className="mt-4 pt-3 flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
              <span>View Vacancies</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </Link>

          {/* Action 4 */}
          <Link
            to="/career"
            className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Career Guidance</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Generate AI career path recommendations and roadmaps</p>
            </div>
            <div className="mt-4 pt-3 flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform">
              <span>Explore Paths</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </Link>
        </div>
      </div>

      {/* 16 & 17. Skill Progress & Interview Chart (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 16. Skill Progress */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Your Skills</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Proficiency benchmarked against Software Developer requirements</p>
              </div>
              <Link to="/assessments" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                Take Test
              </Link>
            </div>

            <div className="space-y-4 mt-6">
              {skillsList.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{skill.name}</span>
                    <span className="font-mono text-slate-600 dark:text-slate-400 font-semibold">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${skill.color} rounded-full transition-all duration-500`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Recommended focus: <span className="font-medium text-slate-800 dark:text-slate-200">React + Git</span></span>
            <Link to="/learn" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline inline-flex items-center">
              Start Learning <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
        </div>

        {/* 17. Interview Performance Chart (Recharts) */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Interview Performance</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Score trajectory across your last 5 AI mock interviews</p>
              </div>
              <Link to="/history" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                Full History
              </Link>
            </div>

            <div className="h-60 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.4} />
                  <XAxis
                    dataKey="attempt"
                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[40, 100]}
                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '8px',
                      border: 'none',
                      color: '#f8fafc',
                      fontSize: '12px'
                    }}
                    formatter={(val) => [`${val}/100 Score`, 'Performance']}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#6366f1"
                    strokeWidth={3}
                    dot={{ fill: '#4f46e5', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Steady upward trajectory (+20 pts overall)</span>
            </span>
            <Link to="/interview/setup" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
              Practice Next
            </Link>
          </div>
        </div>
      </div>

      {/* 18. Recent Activity */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Activity</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Your latest actions across courses, assessments, and job applications</p>
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {(user?.recentActivity || []).map((activity) => (
            <div key={activity.id} className="py-3.5 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                  {activity.type === 'course' && <BookOpen className="w-4 h-4 text-purple-500" />}
                  {activity.type === 'assessment' && <CheckCircle2 className="w-4 h-4 text-blue-500" />}
                  {activity.type === 'interview' && <Bot className="w-4 h-4 text-indigo-500" />}
                  {activity.type === 'job' && <Briefcase className="w-4 h-4 text-emerald-500" />}
                  {activity.type === 'skill' && <TrendingUp className="w-4 h-4 text-amber-500" />}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{activity.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{activity.detail}</p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-slate-400 shrink-0">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
