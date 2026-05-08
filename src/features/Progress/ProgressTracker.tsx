import Chart from 'react-apexcharts'
import { 
  TrendingUp, 
  Target, 
  Award, 
  Zap, 
  MessageSquare, 
  ChevronRight,
  BookOpen,
  CheckCircle2,
  MoreVertical
} from 'lucide-react'
import DashboardCard from '../../ui/components/DashboardCard'
import MetricCard from '../../ui/components/MetricCard'
import { motion } from 'framer-motion'

const ProgressTracker = () => {
  // Line Chart Config
  const lineChartOptions: any = {
    chart: {
      id: 'performance-trend',
      toolbar: { show: false },
      fontFamily: 'Inter, sans-serif',
    },
    stroke: { curve: 'smooth', width: 4, colors: ['#f97316'] },
    markers: { size: 6, colors: ['#f97316'], strokeWidth: 4, strokeColors: '#fff' },
    xaxis: {
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
      labels: { style: { colors: '#94a3b8', fontWeight: 600 } }
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: { style: { colors: '#94a3b8', fontWeight: 600 } }
    },
    grid: { borderColor: '#f1f5f9', strokeDashArray: 4 },
    tooltip: { theme: 'light' }
  }

  const lineChartSeries = [{
    name: 'Average Score',
    data: [65, 72, 68, 85, 82, 94]
  }]

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Academic Progress</h1>
        <p className="text-slate-500 font-medium mt-1">Visualize your growth and track your learning milestones.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Avg. Score" value="92%" icon={TrendingUp} trend="12%" isPositive={true} variant="blue" />
        <MetricCard title="Goals Met" value="18" icon={Target} trend="4" isPositive={true} variant="green" />
        <MetricCard title="Certificates" value="3" icon={Award} trend="1" isPositive={true} variant="purple" />
        <MetricCard title="Study Streak" value="12d" icon={Zap} trend="5d" isPositive={true} variant="orange" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Performance Trend */}
        <DashboardCard className="lg:col-span-8 p-8 bg-white border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Performance Trend</h3>
              <p className="text-sm font-medium text-slate-400 mt-1">Weekly test scores and assessment results</p>
            </div>
            <select className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs font-bold text-slate-600 outline-none">
              <option>Last 6 Weeks</option>
              <option>Last 6 Months</option>
            </select>
          </div>
          <div className="h-[350px] -ml-4">
            <Chart options={lineChartOptions} series={lineChartSeries} type="line" height="100%" />
          </div>
        </DashboardCard>

        {/* Learning Goals */}
        <DashboardCard className="lg:col-span-4 p-8 bg-white border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Current Goals</h3>
            <button className="text-sm font-bold text-primary-600 hover:underline">Edit</button>
          </div>
          <div className="space-y-6">
            {[
              { title: 'Master Algebra II', progress: 85, color: 'bg-emerald-500' },
              { title: 'Complete Physics Mock', progress: 40, color: 'bg-primary-500' },
              { title: 'Read Chapter 4-7 Bio', progress: 100, color: 'bg-amber-500' },
            ].map((goal, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-900">{goal.title}</span>
                  <span className="text-slate-400">{goal.progress}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${goal.progress}%` }}
                    className={`h-full ${goal.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full h-12 bg-slate-50 text-slate-600 rounded-xl font-bold text-sm mt-8 hover:bg-slate-100 transition-colors">
            Add New Goal +
          </button>
        </DashboardCard>
      </div>

      {/* Bottom Grid: Feedback & Subjects */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Tutor Feedback */}
        <DashboardCard className="lg:col-span-7 p-8 bg-white border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Tutor Feedback</h3>
            <button className="text-sm font-bold text-primary-600 hover:underline">View History</button>
          </div>
          <div className="space-y-6">
            {[
              { t: 'Dr. Sarah Wilson', m: 'Great progress on calculus today! You now have a solid grasp of integration by parts.', d: '2 hours ago', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
              { t: 'Marcus Chen', m: 'Focus more on electromagnetic waves for next time. Your logic is sound, but equations need practice.', d: 'Yesterday', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus' },
            ].map((feedback, i) => (
              <div key={i} className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100/50 group hover:border-primary-100 transition-all">
                <div className="size-12 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                  <img src={feedback.img} className="size-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-slate-900">{feedback.t}</h4>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{feedback.d}</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed truncate group-hover:whitespace-normal">"{feedback.m}"</p>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        {/* Areas for Improvement */}
        <DashboardCard variant="navy" className="lg:col-span-5 p-8">
          <h3 className="text-xl font-bold mb-6">Focus Areas</h3>
          <div className="space-y-4">
            {[
              { s: 'Mathematical Logic', level: 'Intermediate', action: 'Practice Mock P2' },
              { s: 'Organic Reactions', level: 'Beginner', action: 'Review Mechanism Video' },
              { s: 'Data Analysis', level: 'Advanced', action: 'Final Project Submission' },
            ].map((area, i) => (
              <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold">{area.s}</h4>
                  <span className="text-[10px] font-black text-secondary-500 uppercase tracking-widest px-2 py-1 bg-secondary-500/10 rounded-lg">
                    {area.level}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-primary-400 text-xs font-bold mt-3">
                  <Zap className="size-3 text-secondary-500" />
                  Next Action: {area.action}
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </div>
  )
}

export default ProgressTracker
