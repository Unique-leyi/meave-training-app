import { useState } from 'react'
import { 
  Search, 
  Filter, 
  MoreVertical, 
  MessageSquare, 
  Calendar, 
  TrendingUp,
  Mail,
  Phone,
  CheckCircle2,
  Clock,
  BookOpen
} from 'lucide-react'
import DashboardCard from '../../ui/components/DashboardCard'
import MetricCard from '../../ui/components/MetricCard'

const StudentManager = () => {
  const [activeTab, setActiveTab] = useState('active')

  const students = [
    {
      id: 1,
      name: 'Alex Williamson',
      email: 'alex.w@gmail.com',
      subject: 'A-Level Mathematics',
      nextSession: 'Tomorrow, 14:00',
      progress: 94,
      totalHours: '42h',
      status: 'active',
      img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
    },
    {
      id: 2,
      name: 'Sophia Grace',
      email: 'sophia.g@outlook.com',
      subject: 'Organic Chemistry',
      nextSession: 'Friday, 16:30',
      progress: 48,
      totalHours: '12h',
      status: 'active',
      img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia'
    },
    {
      id: 3,
      name: 'Marcus Lim',
      email: 'marcus.l@school.edu',
      subject: 'Further Mathematics',
      nextSession: 'Monday, 10:00',
      progress: 85,
      totalHours: '28h',
      status: 'active',
      img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus'
    }
  ]

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Students</h1>
          <p className="text-slate-500 font-medium mt-1">Manage your active learners and track their progress.</p>
        </div>
        <button className="h-12 px-7 bg-primary-950 text-white rounded-2xl font-black text-sm hover:bg-primary-900 transition-all shadow-xl shadow-primary-950/20 active:scale-95">
          Invite New Student
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Active Students" value="14" icon={CheckCircle2} trend="+2 this month" isPositive={true} variant="blue" />
        <MetricCard title="Avg. Progress" value="72%" icon={TrendingUp} trend="+5%" isPositive={true} variant="green" />
        <MetricCard title="Total Hours" value="1,240h" icon={Clock} trend="84h last month" isPositive={true} variant="orange" />
        <MetricCard title="Next Session" value="Tomorrow" icon={Calendar} trend="14:00 PM" isPositive={true} variant="purple" />
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex p-1 bg-slate-100 rounded-2xl w-fit">
          {['active', 'completed', 'pending'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-6 py-2.5 rounded-xl text-sm font-black transition-all capitalize
                ${activeTab === tab 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'}
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search students..." 
              className="h-12 pl-10 pr-4 bg-white border border-slate-100 rounded-2xl outline-none focus:border-primary-500 transition-all font-bold text-sm text-slate-900 w-full md:w-64"
            />
          </div>
          <button className="size-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">
            <Filter className="size-5" />
          </button>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
        {students.map((student) => (
          <DashboardCard key={student.id} className="bg-white border border-slate-100 p-8 hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-4">
                <div className="size-16 rounded-[2rem] overflow-hidden border-4 border-slate-50 shadow-sm group-hover:scale-105 transition-transform">
                  <img src={student.img} alt={student.name} className="size-full object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">{student.name}</h3>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                    <Mail className="size-3" />
                    {student.email}
                  </div>
                </div>
              </div>
              <button className="p-2 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all">
                <MoreVertical className="size-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Subject</p>
                  <p className="text-xs font-bold text-slate-900">{student.subject}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Hours</p>
                  <p className="text-xs font-bold text-slate-900">{student.totalHours}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Academic Progress</p>
                  <span className="text-xs font-black text-primary-600">{student.progress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-950 transition-all duration-1000" 
                    style={{ width: `${student.progress}%` }} 
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-primary-50 rounded-2xl border border-primary-100">
                <Calendar className="size-4 text-primary-600 shrink-0" />
                <div>
                  <p className="text-[9px] font-black text-primary-400 uppercase tracking-widest">Next Session</p>
                  <p className="text-xs font-bold text-primary-900">{student.nextSession}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 h-12 bg-primary-950 text-white rounded-xl text-xs font-black hover:bg-primary-900 transition-all flex items-center justify-center gap-2">
                  <BookOpen className="size-4" />
                  View Progress
                </button>
                <button className="size-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-primary-600 hover:border-primary-100 hover:bg-primary-50 transition-all">
                  <MessageSquare className="size-5" />
                </button>
              </div>
            </div>
          </DashboardCard>
        ))}
      </div>
    </div>
  )
}

export default StudentManager
