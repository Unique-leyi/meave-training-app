import Chart from 'react-apexcharts'
import { 
  TrendingUp, 
  Users, 
  Clock, 
  Star,
  ArrowUpRight,
  Target,
  BarChart3,
  PieChart as PieChartIcon
} from 'lucide-react'
import DashboardCard from '../../ui/components/DashboardCard'
import MetricCard from '../../ui/components/MetricCard'

const AnalyticsManager = () => {
  const engagementOptions: any = {
    chart: { id: 'engagement', toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
    colors: ['#0f172a', '#f97316'],
    plotOptions: { bar: { borderRadius: 8, columnWidth: '50%' } },
    xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }
  }

  const engagementSeries = [
    { name: 'Student Feedback', data: [85, 92, 88, 95, 90, 82, 89] },
    { name: 'Completion Rate', data: [70, 75, 72, 80, 78, 74, 76] }
  ]

  const subjectOptions: any = {
    chart: { type: 'donut' },
    labels: ['Mathematics', 'Chemistry', 'Physics', 'Biology'],
    colors: ['#0f172a', '#f97316', '#3b82f6', '#10b981'],
    legend: { position: 'bottom' },
    plotOptions: { pie: { donut: { size: '75%' } } }
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Teaching Analytics</h1>
          <p className="text-slate-500 font-medium mt-1">Deep insights into your teaching performance and impact.</p>
        </div>
        <select className="h-12 px-5 bg-white border border-slate-200 rounded-2xl font-black text-xs text-slate-600 outline-none hover:border-primary-500 transition-all">
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>Year to Date</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Avg. Rating" value="4.9" icon={Star} trend="+0.2" isPositive={true} variant="orange" />
        <MetricCard title="Engagement" value="92%" icon={Target} trend="+4%" isPositive={true} variant="blue" />
        <MetricCard title="Session Quality" value="High" icon={TrendingUp} trend="Stable" isPositive={true} variant="green" />
        <MetricCard title="Student Growth" value="+12%" icon={Users} trend="Active Learners" isPositive={true} variant="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <DashboardCard className="lg:col-span-8 p-8 bg-white border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-8 flex items-center gap-2">
            <BarChart3 className="size-5 text-primary-500" />
            Engagement Metrics
          </h3>
          <div className="h-[350px]">
            <Chart options={engagementOptions} series={engagementSeries} type="bar" height="100%" />
          </div>
        </DashboardCard>

        <DashboardCard className="lg:col-span-4 p-8 bg-white border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-8 flex items-center gap-2">
            <PieChartIcon className="size-5 text-primary-500" />
            Subject Distribution
          </h3>
          <div className="h-[350px] flex items-center justify-center">
            <Chart options={subjectOptions} series={[45, 25, 20, 10]} type="donut" width="100%" />
          </div>
        </DashboardCard>
      </div>

      <DashboardCard className="p-8 bg-primary-950 text-white border-none shadow-2xl shadow-primary-950/20 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <h3 className="text-2xl font-black mb-4">You're in the top 5% of tutors!</h3>
            <p className="text-primary-300 font-medium leading-relaxed">
              Your students show a 15% higher completion rate than the platform average. Keep using visual models—they're your most praised teaching strength.
            </p>
          </div>
          <button className="h-14 px-8 bg-secondary-500 text-white rounded-2xl font-black hover:bg-secondary-600 transition-all flex items-center gap-2 shrink-0">
            View Strength Report
            <ArrowUpRight className="size-5" />
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-500/10 blur-[100px] rounded-full" />
      </DashboardCard>
    </div>
  )
}

export default AnalyticsManager
