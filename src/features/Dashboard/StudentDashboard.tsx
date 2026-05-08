import { useState } from 'react'
import Chart from 'react-apexcharts'
import { 
  MoreVertical, 
  BookOpen, 
  Users, 
  Clock, 
  Target,
  ArrowUpRight
} from 'lucide-react'
import DashboardCard from '../../ui/components/DashboardCard'
import MetricCard from '../../ui/components/MetricCard'
import { RocketIllustration } from '../../ui/components/Illustrations'

import Button from '../../ui/components/Button'

const StudentDashboard = () => {
  const [loadingAction, setLoadingAction] = useState<string | null>(null)

  const handleAction = async (action: string) => {
    setLoadingAction(action)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setLoadingAction(null)
  }
  // Bar Chart Config
  const barChartOptions: any = {
    chart: {
      id: 'performance-chart',
      stacked: true,
      toolbar: { show: false },
      fontFamily: 'Inter, sans-serif',
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: '35%',
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all'
      }
    },
    dataLabels: { enabled: false },
    colors: ['#0f172a', '#f97316'],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#94a3b8', fontWeight: 600 } }
    },
    yaxis: {
      labels: { 
        formatter: (val: any) => Math.abs(val),
        style: { colors: '#94a3b8', fontWeight: 600 } 
      }
    },
    grid: { borderColor: '#f1f5f9', strokeDashArray: 4 },
    tooltip: { 
      theme: 'light', 
      y: { formatter: (val: any) => Math.abs(val) + ' hrs' }
    },
    legend: { 
      position: 'top', 
      horizontalAlign: 'right',
      fontSize: '12px',
      fontWeight: 700,
      markers: { radius: 12 }
    }
  }

  const barChartSeries = [
    {
      name: 'Sessions',
      data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 22]
    },
    {
      name: 'Hours',
      data: [-30, -23, -20, -18, -13, -27, -33, -12, -25, -11, -22, -15]
    }
  ]

  // Radial Bar Config
  const radialOptions: any = {
    chart: { type: 'radialBar' },
    plotOptions: {
      radialBar: {
        hollow: { size: '65%' },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 10,
            color: '#0f172a',
            fontSize: '24px',
            fontWeight: 900,
            show: true,
          }
        },
        track: { background: '#f8fafc' }
      }
    },
    colors: ['#f97316'],
    stroke: { lineCap: 'round' }
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Hero */}
      <DashboardCard variant="navy" className="relative overflow-hidden p-10 lg:p-14 border-none shadow-2xl shadow-primary-950/20">
        <div className="relative z-10 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            Ready to reach <br />
            <span className="text-secondary-500">new heights</span>, Alex?
          </h1>
          <p className="text-primary-300 font-medium text-lg mb-8 leading-relaxed">
            You've completed 84% of your weekly targets. Keep the momentum going and achieve your academic goals.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={() => handleAction('resume')}
              isLoading={loadingAction === 'resume'}
              loadingText="Resuming..."
              className="!w-auto h-14 px-8"
            >
              Resume Learning
            </Button>
            <Button 
              onClick={() => handleAction('progress')}
              isLoading={loadingAction === 'progress'}
              loadingText="Loading..."
              variant="outline"
              className="!w-auto h-14 px-8 border-white/20 text-white hover:bg-white/10"
            >
              View Progress
            </Button>
          </div>
        </div>
        
        {/* SVG Illustration Positioning */}
        <div className="absolute right-[-5%] bottom-[-10%] lg:right-[5%] lg:top-1/2 lg:-translate-y-1/2 size-80 lg:size-[400px] opacity-20 lg:opacity-100 pointer-events-none">
          <RocketIllustration className="size-full" />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-500/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500/20 blur-[120px] rounded-full" />
      </DashboardCard>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Sessions" value="128" icon={BookOpen} trend="12%" isPositive={true} variant="blue" />
        <MetricCard title="Active Tutors" value="14" icon={Users} trend="4%" isPositive={true} variant="green" />
        <MetricCard title="Learning Hours" value="352h" icon={Clock} trend="8%" isPositive={true} variant="orange" />
        <MetricCard title="Goal Completion" value="84%" icon={Target} trend="2%" isPositive={false} variant="purple" />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Performance Overview */}
        <DashboardCard className="lg:col-span-8 p-8 bg-white border border-slate-100">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Academic Flow</h3>
              <div className="mt-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Study Hours</p>
                <h4 className="text-3xl font-black text-slate-900 mt-1">352,000 <span className="text-sm font-medium text-slate-400 ml-1">hrs</span></h4>
              </div>
            </div>
            <select className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs font-bold text-slate-600 outline-none">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[350px] -ml-4">
            <Chart options={barChartOptions} series={barChartSeries} type="bar" height="100%" />
          </div>
        </DashboardCard>

        {/* Completion Widget */}
        <DashboardCard className="lg:col-span-4 p-8 bg-white border border-slate-100 flex flex-col items-center justify-center text-center">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2">Weekly Goal</h3>
          <p className="text-sm font-medium text-slate-400 mb-8">You've reached 84% of your study targets</p>
          
          <div className="size-64 relative mb-6">
            <Chart options={radialOptions} series={[84]} type="radialBar" height="100%" />
            <div className="absolute inset-0 flex items-center justify-center flex-col pt-16">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Progress</p>
            </div>
          </div>

          <Button 
            onClick={() => handleAction('target')}
            isLoading={loadingAction === 'target'}
            loadingText="Updating..."
            className="!h-14 bg-primary-950 hover:bg-primary-900"
          >
            Set New Target
            <ArrowUpRight className="size-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </DashboardCard>
      </div>

      {/* Bottom Grid: Tutors & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Tutors */}
        <DashboardCard className="lg:col-span-4 p-8 bg-white border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Recent Tutors</h3>
            <button className="text-sm font-bold text-primary-600 hover:underline">View All</button>
          </div>
          <div className="space-y-6">
            {[
              { name: 'Dr. Sarah Wilson', subject: 'A-Level Biology', rating: '4.9', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
              { name: 'Marcus Chen', subject: 'Further Mathematics', rating: '5.0', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus' },
              { name: 'Elena Rodriguez', subject: 'Computer Science', rating: '4.8', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena' },
            ].map((tutor, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-2xl bg-slate-100 overflow-hidden border-2 border-white shadow-sm transition-transform group-hover:scale-105">
                    <img src={tutor.img} alt={tutor.name} className="size-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{tutor.name}</p>
                    <p className="text-xs font-medium text-slate-400">{tutor.subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-1 rounded-lg text-xs font-black">
                  ★ {tutor.rating}
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        {/* Subjects Table */}
        <DashboardCard className="lg:col-span-8 p-8 bg-white border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Active Subjects</h3>
            <select className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs font-bold text-slate-600 outline-none">
              <option>Ascending</option>
              <option>Descending</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                  <th className="pb-4">Subject</th>
                  <th className="pb-4">Sessions</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { s: 'Pure Mathematics 1', c: '24', st: 'In Progress', color: 'bg-primary-500' },
                  { s: 'Organic Chemistry', c: '18', st: 'Reviewing', color: 'bg-emerald-500' },
                  { s: 'Microeconomics', c: '32', st: 'Mastered', color: 'bg-amber-500' },
                ].map((row, i) => (
                  <tr key={i} className="group hover:bg-slate-50 transition-colors">
                    <td className="py-5">
                      <div className="flex items-center gap-3">
                        <div className={`size-2.5 rounded-full ${row.color}`} />
                        <span className="font-bold text-slate-900">{row.s}</span>
                      </div>
                    </td>
                    <td className="py-5 text-sm font-bold text-slate-400">{row.c} Sessions</td>
                    <td className="py-5">
                      <span className="px-3 py-1.5 rounded-full bg-slate-50 text-slate-600 text-xs font-bold">
                        {row.st}
                      </span>
                    </td>
                    <td className="py-5 text-right">
                      <button className="text-slate-300 hover:text-slate-900 transition-colors">
                        <MoreVertical className="size-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>
      </div>
    </div>
  )
}

export default StudentDashboard
