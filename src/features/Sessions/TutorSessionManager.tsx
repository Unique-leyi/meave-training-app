import { useState } from 'react'
import { 
  Calendar, 
  Clock, 
  MoreVertical, 
  CheckCircle2, 
  MessageSquare,
  Video,
  FileText,
  Search,
  Filter,
  Plus,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  XCircle
} from 'lucide-react'
import DashboardCard from '../../ui/components/DashboardCard'
import MetricCard from '../../ui/components/MetricCard'

const TutorSessionManager = () => {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [searchQuery, setSearchQuery] = useState('')

  const sessions = [
    {
      id: 1,
      student: 'Alex Williamson',
      subject: 'A-Level Mathematics',
      topic: 'Calculus & Integration',
      date: '08 May 2026',
      time: '14:00 PM',
      duration: '60 min',
      status: 'upcoming',
      type: 'Online',
      img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
    },
    {
      id: 2,
      student: 'Sophia Grace',
      subject: 'Organic Chemistry',
      topic: 'Molecular Bonding',
      date: '09 May 2026',
      time: '16:30 PM',
      duration: '90 min',
      status: 'upcoming',
      type: 'Online',
      img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia'
    },
    {
      id: 3,
      student: 'Marcus Lim',
      subject: 'Further Mathematics',
      topic: 'Complex Numbers',
      date: '10 May 2026',
      time: '10:00 AM',
      duration: '60 min',
      status: 'completed',
      type: 'Online',
      img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus'
    }
  ]

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Session Schedule</h1>
          <p className="text-[11px] font-bold text-slate-500 mt-1">Manage your confirmed teaching sessions and history.</p>
        </div>
        <button className="h-10 px-6 bg-primary-950 text-white rounded-xl font-black text-[11px] hover:bg-primary-900 transition-all shadow-xl shadow-primary-950/20 active:scale-95 flex items-center gap-2">
          <Plus className="size-4" />
          Add Manual Session
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Sessions" value="156" icon={BookOpen} trend="+12" isPositive={true} variant="blue" />
        <MetricCard title="Completed" value="142" icon={CheckCircle2} trend="92% rate" isPositive={true} variant="green" />
        <MetricCard title="Upcoming" value="8" icon={Clock} trend="This week" isPositive={true} variant="orange" />
        <MetricCard title="Cancelled" value="6" icon={XCircle} trend="-2% vs last" isPositive={false} variant="purple" />
      </div>

      {/* Search & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex p-1 bg-slate-100 rounded-2xl w-fit">
          {[
            { id: 'upcoming', label: 'Upcoming Sessions' },
            { id: 'completed', label: 'Session History' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-6 py-2.5 rounded-xl text-sm font-black transition-all
                ${activeTab === tab.id 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by student or subject..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 pl-10 pr-4 bg-white border border-slate-100 rounded-2xl outline-none focus:border-primary-500 transition-all font-bold text-sm text-slate-900 w-full md:w-64"
            />
          </div>
          <button className="size-11 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">
            <Filter className="size-5" />
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
        {sessions.filter(s => s.status === activeTab).map((session) => (
          <DashboardCard key={session.id} className="bg-white border border-slate-100 p-8 hover:shadow-xl hover:shadow-slate-200/50 transition-all group overflow-hidden relative">
            {/* Status Corner */}
            <div className="absolute top-0 right-0">
              <div className={`px-6 py-1.5 rounded-bl-3xl text-[10px] font-black uppercase tracking-widest ${session.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-primary-950 text-white'}`}>
                {session.status}
              </div>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="size-14 rounded-2xl overflow-hidden border-2 border-slate-50 shadow-sm">
                <img src={session.img} alt={session.student} className="size-full object-cover" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 group-hover:text-primary-600 transition-colors">{session.student}</h3>
                <p className="text-xs font-bold text-slate-400">{session.subject}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-5 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-primary-500" />
                    <span className="text-xs font-bold text-slate-700">{session.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-4 text-primary-500" />
                    <span className="text-xs font-bold text-slate-700">{session.time}</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Session Topic</p>
                  <p className="text-sm font-bold text-slate-900">{session.topic}</p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button className="flex-1 h-12 bg-primary-950 text-white rounded-xl text-xs font-black hover:bg-primary-900 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-950/10 group/btn">
                  <Video className="size-4 text-secondary-500 group-hover:scale-110 transition-transform" />
                  Join Session
                </button>
                <div className="flex gap-2">
                  <button className="size-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-primary-600 hover:border-primary-100 hover:bg-primary-50 transition-all" title="Messages">
                    <MessageSquare className="size-5" />
                  </button>
                  <button className="size-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-primary-600 hover:border-primary-100 hover:bg-primary-50 transition-all" title="Session Notes">
                    <FileText className="size-5" />
                  </button>
                </div>
              </div>
            </div>
          </DashboardCard>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-4">
        <p className="text-xs font-bold text-slate-400">
          Showing <span className="text-slate-900">1-10</span> of <span className="text-slate-900">156</span> sessions
        </p>
        <div className="flex items-center gap-2">
          <button className="size-10 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-all disabled:opacity-50" disabled>
            <ChevronLeft className="size-5" />
          </button>
          {[1, 2, 3].map(p => (
            <button key={p} className={`size-10 rounded-xl text-xs font-black transition-all ${p === 1 ? 'bg-primary-950 text-white shadow-lg shadow-primary-950/20' : 'bg-white border border-slate-100 text-slate-400 hover:bg-slate-50'}`}>
              {p}
            </button>
          ))}
          <button className="size-10 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-all">
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TutorSessionManager
