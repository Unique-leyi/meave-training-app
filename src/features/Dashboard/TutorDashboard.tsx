import { useState } from 'react'
import Chart from 'react-apexcharts'
import { 
  MoreVertical, 
  Users, 
  Clock, 
  Wallet,
  TrendingUp,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  Calendar,
  MessageSquare
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import DashboardCard from '../../ui/components/DashboardCard'
import MetricCard from '../../ui/components/MetricCard'
import { WalletIllustration } from '../../ui/components/Illustrations'
import Button from '../../ui/components/Button'

const TutorDashboard = () => {
  const navigate = useNavigate()
  const [loadingAction, setLoadingAction] = useState<string | null>(null)

  const handleAction = async (action: string, path?: string) => {
    setLoadingAction(action)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setLoadingAction(null)
    if (path) navigate(path)
  }

  // Revenue Chart Config
  const revenueChartOptions: any = {
    chart: {
      id: 'revenue-chart',
      toolbar: { show: false },
      fontFamily: 'Inter, sans-serif',
      sparkline: { enabled: false }
    },
    stroke: {
      curve: 'smooth',
      width: 4,
      colors: ['#f97316']
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100]
      }
    },
    dataLabels: { enabled: false },
    colors: ['#f97316'],
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#94a3b8', fontWeight: 600 } }
    },
    yaxis: {
      labels: { 
        formatter: (val: any) => '£' + val,
        style: { colors: '#94a3b8', fontWeight: 600 } 
      }
    },
    grid: { borderColor: '#f1f5f9', strokeDashArray: 4 },
    tooltip: { theme: 'light' }
  }

  const revenueChartSeries = [
    {
      name: 'Earnings',
      data: [120, 160, 145, 210, 180, 95, 240]
    }
  ]

  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Hero - Earnings Focus */}
      <DashboardCard variant="navy" className="relative overflow-hidden p-8 md:p-10 border-none shadow-2xl shadow-primary-950/20">
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2.5 mb-5">
            <span className="px-3 py-1 bg-white/10 text-white rounded-lg text-[9px] font-black uppercase tracking-widest border border-white/10">Premium Tutor</span>
            <span className="px-3 py-1 bg-emerald-500 text-white rounded-lg text-[9px] font-black uppercase tracking-widest">Active Status</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mb-3 leading-tight">
            Your earnings are <span className="text-secondary-500">growing fast</span>, Dr. Sarah!
          </h1>
          <p className="text-primary-300 font-bold text-xs md:text-sm mb-7 leading-relaxed opacity-90">
            You've earned £1,240.50 this month, a 12% increase from last month. Great job supporting your 14 active students.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={() => handleAction('withdraw', '/earnings')}
              isLoading={loadingAction === 'withdraw'}
              loadingText="Processing..."
              className="!w-auto h-11 px-6 text-[11px] uppercase tracking-widest"
            >
              Withdraw Earnings
            </Button>
            <Button 
              onClick={() => handleAction('availability', '/calendar')}
              isLoading={loadingAction === 'availability'}
              loadingText="Loading..."
              variant="outline"
              className="!w-auto h-11 px-6 text-[11px] uppercase tracking-widest border-white/20 text-white hover:bg-white/20"
            >
              Update Availability
            </Button>
          </div>
        </div>
        
        {/* SVG Illustration Positioning */}
        <div className="absolute right-[-2%] bottom-[-5%] lg:right-[3%] lg:top-1/2 lg:-translate-y-1/2 size-64 lg:size-80 opacity-20 lg:opacity-60 pointer-events-none text-secondary-500">
          <WalletIllustration className="size-full" />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-500/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500/20 blur-[120px] rounded-full" />
      </DashboardCard>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Earnings" value="£4,852" icon={Wallet} trend="18%" isPositive={true} variant="blue" />
        <MetricCard title="Active Students" value="14" icon={Users} trend="2 new" isPositive={true} variant="green" />
        <MetricCard title="Teaching Hours" value="124h" icon={Clock} trend="12h this week" isPositive={true} variant="orange" />
        <MetricCard title="Pending Payout" value="£640" icon={TrendingUp} trend="Due in 2 days" isPositive={true} variant="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Revenue Chart */}
        <DashboardCard className="lg:col-span-8 p-8 bg-white border border-slate-100">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">Revenue Analytics</h3>
              <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Weekly Earnings Growth</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-3 bg-secondary-500 rounded-full" />
              <span className="text-xs font-black text-slate-900">Current Week</span>
            </div>
          </div>
          <div className="h-[350px] -ml-4">
            <Chart options={revenueChartOptions} series={revenueChartSeries} type="area" height="100%" />
          </div>
        </DashboardCard>

        {/* Pending Requests */}
        <DashboardCard className="lg:col-span-4 p-8 bg-white border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Pending Requests</h3>
            <span className="size-8 bg-secondary-100 text-secondary-600 rounded-xl flex items-center justify-center font-black text-xs">2</span>
          </div>
          
          <div className="space-y-6">
            {[
              { id: 1, student: 'Marcus Lim', subject: 'A-Level Chemistry', date: 'Tomorrow, 14:00', price: '£45' },
              { id: 2, student: 'Elena Rossi', subject: 'GCSE Physics', date: 'Fri, 10:30', price: '£35' },
            ].map((req) => (
              <div key={req.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-900">{req.student}</h4>
                    <p className="text-xs font-medium text-slate-400">{req.subject}</p>
                  </div>
                  <span className="text-sm font-black text-slate-900">{req.price}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-primary-600 bg-primary-50 px-2 py-1 rounded-lg w-fit">
                  <Calendar className="size-3" />
                  {req.date}
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleAction(`accept-${req.id}`)}
                    isLoading={loadingAction === `accept-${req.id}`}
                    loadingText="Accepting..."
                    className="flex-1 h-10 text-xs font-black !rounded-xl"
                  >
                    <CheckCircle2 className="size-3 text-emerald-400" />
                    Accept
                  </Button>
                  <button className="h-10 px-4 bg-white border border-slate-200 text-slate-400 rounded-xl hover:text-rose-500 hover:border-rose-100 hover:bg-rose-50 transition-all">
                    <XCircle className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => navigate('/sessions')}
            className="w-full mt-8 h-12 border-2 border-slate-100 text-slate-400 rounded-xl text-xs font-black hover:border-primary-100 hover:text-primary-600 hover:bg-primary-50 transition-all"
          >
            View All Requests
          </button>
        </DashboardCard>
      </div>

      {/* Bottom Grid: Recent Activity & Students */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Upcoming Sessions */}
        <DashboardCard className="lg:col-span-8 p-8 bg-white border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Today's Schedule</h3>
            <button 
              onClick={() => navigate('/sessions')}
              className="text-sm font-bold text-primary-600 hover:underline"
            >
              Full Calendar
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                  <th className="pb-4">Student</th>
                  <th className="pb-4">Subject</th>
                  <th className="pb-4">Time</th>
                  <th className="pb-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { name: 'Alex Williamson', subject: 'Calculus & Integration', time: '14:00 PM', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
                  { name: 'Sophia Grace', subject: 'Organic Chemistry', time: '16:30 PM', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia' },
                ].map((session, i) => (
                  <tr key={i} className="group hover:bg-slate-50 transition-colors">
                    <td className="py-5">
                      <div className="flex items-center gap-3">
                        <img src={session.img} className="size-8 rounded-full border border-slate-100" />
                        <span className="font-bold text-slate-900">{session.name}</span>
                      </div>
                    </td>
                    <td className="py-5">
                      <span className="text-sm font-bold text-slate-500">{session.subject}</span>
                    </td>
                    <td className="py-5">
                      <div className="flex items-center gap-2 text-xs font-black text-secondary-600">
                        <Clock className="size-3" />
                        {session.time}
                      </div>
                    </td>
                    <td className="py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="size-10 bg-primary-950 text-white rounded-xl flex items-center justify-center hover:bg-primary-900 transition-all shadow-lg shadow-primary-950/10">
                          <ArrowUpRight className="size-4" />
                        </button>
                        <button className="size-10 bg-white border border-slate-100 text-slate-400 rounded-xl flex items-center justify-center hover:text-primary-600 hover:bg-primary-50 transition-all">
                          <MessageSquare className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>

        {/* Top Students */}
        <DashboardCard className="lg:col-span-4 p-8 bg-white border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Active Students</h3>
            <button 
              onClick={() => navigate('/students')}
              className="text-sm font-bold text-primary-600 hover:underline"
            >
              All
            </button>
          </div>
          <div className="space-y-6">
            {[
              { name: 'Marcus Lim', progress: 85, color: 'bg-emerald-500' },
              { name: 'Elena Rossi', progress: 62, color: 'bg-primary-500' },
              { name: 'Alex Williamson', progress: 94, color: 'bg-secondary-500' },
              { name: 'Sophia Grace', progress: 48, color: 'bg-amber-500' },
            ].map((student, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-900">{student.name}</span>
                  <span className="text-[10px] font-black text-slate-400">{student.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${student.color} transition-all duration-1000`} 
                    style={{ width: `${student.progress}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </div>
  )
}

export default TutorDashboard
