import { useState } from 'react'
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  MoreVertical, 
  MessageSquare, 
  FileText, 
  Filter, 
  Search, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  TrendingUp,
  History,
  Timer,
  Star
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import DashboardCard from '../../ui/components/DashboardCard'
import MetricCard from '../../ui/components/MetricCard'

const SessionManager = () => {
  const [activeTab, setActiveTab] = useState('upcoming')
  const navigate = useNavigate()
  
  const tabs = [
    { id: 'upcoming', name: 'Upcoming', count: 3 },
    { id: 'past', name: 'Past', count: 42 },
    { id: 'cancelled', name: 'Cancelled', count: 2 },
  ]

  const sessions = [
    {
      id: 1,
      tutor: 'Dr. Sarah Wilson',
      subject: 'Advanced Mathematics',
      topic: 'Calculus & Integration',
      date: 'Monday, 24th May',
      time: '14:00 PM',
      duration: '60 mins',
      status: 'upcoming',
      img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    {
      id: 2,
      tutor: 'Marcus Chen',
      subject: 'Physics',
      topic: 'Quantum Mechanics Intro',
      date: 'Thursday, 27th May',
      time: '10:30 AM',
      duration: '90 mins',
      status: 'upcoming',
      img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus'
    }
  ]

  const pastSessions = [
    {
      id: 101,
      tutor: 'Dr. Sarah Wilson',
      subject: 'A-Level Mathematics',
      topic: 'Quadratic Equations',
      date: 'Thursday, 18th May',
      time: '14:00 PM',
      duration: '60 mins',
      status: 'past',
      img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    {
      id: 102,
      tutor: 'Marcus Chen',
      subject: 'Physics',
      topic: 'Newtonian Laws',
      date: 'Monday, 15th May',
      time: '11:00 AM',
      duration: '60 mins',
      status: 'past',
      img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus'
    }
  ]

  const displaySessions = activeTab === 'upcoming' ? sessions : activeTab === 'past' ? pastSessions : []

  const [openMenuId, setOpenMenuId] = useState<number | null>(null)

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Sessions</h1>
          <p className="text-slate-500 font-medium mt-1">Manage and track your learning journey.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/calendar')}
            className="h-12 px-6 bg-slate-50 border border-slate-200 rounded-2xl font-black text-slate-900 flex items-center gap-2.5 hover:bg-white hover:shadow-lg hover:shadow-slate-200/50 transition-all active:scale-95 group"
          >
            <CalendarIcon className="size-5 text-primary-600 group-hover:scale-110 transition-transform" />
            <span className="text-sm">Calendar View</span>
          </button>
          <button 
            onClick={() => navigate('/book-session')}
            className="h-12 px-7 bg-primary-950 text-white rounded-2xl font-black text-sm hover:bg-primary-900 transition-all shadow-xl shadow-primary-950/20 active:scale-95"
          >
            Book New Session
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Next Session" value="2h 15m" icon={Timer} trend="Today" isPositive={true} variant="blue" />
        <MetricCard title="Upcoming" value="3" icon={CalendarIcon} trend="+1 this week" isPositive={true} variant="green" />
        <MetricCard title="Completed" value="42" icon={CheckCircle2} trend="85% rate" isPositive={true} variant="purple" />
        <MetricCard title="Total Hours" value="156h" icon={History} trend="12h this month" isPositive={true} variant="orange" />
      </div>

      {/* Tabs & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex p-1 bg-slate-100 rounded-2xl w-fit">
          {tabs.map((tab) => (
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
              {tab.name}
              <span className={`ml-2 px-2 py-0.5 rounded-lg text-[10px] ${activeTab === tab.id ? 'bg-primary-50 text-primary-600' : 'bg-slate-200 text-slate-500'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search sessions..." 
              className="h-12 pl-10 pr-4 bg-white border border-slate-100 rounded-2xl outline-none focus:border-primary-500 transition-all font-bold text-sm text-slate-900 w-full md:w-64"
            />
          </div>
          <button className="size-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">
            <Filter className="size-5" />
          </button>
        </div>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {displaySessions.map((session) => (
          <DashboardCard key={session.id} className="bg-white border border-slate-100 p-8 hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-4">
                <div className="size-16 rounded-3xl overflow-hidden border-4 border-slate-50 shadow-sm">
                  <img src={session.img} alt={session.tutor} className="size-full object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">{session.tutor}</h3>
                  <div className="flex items-center gap-2 text-xs font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded-lg w-fit mt-1">
                    <CheckCircle2 className="size-3" />
                    Verified Tutor
                  </div>
                </div>
              </div>
              <div className="relative">
                <button 
                  onClick={() => setOpenMenuId(openMenuId === session.id ? null : session.id)}
                  className={`p-2 rounded-xl transition-all ${openMenuId === session.id ? 'bg-primary-50 text-primary-600' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'}`}
                >
                  <MoreVertical className="size-5" />
                </button>
                
                {openMenuId === session.id && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-20 animate-in fade-in zoom-in duration-200">
                      <button className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
                        <FileText className="size-4" /> View Notes
                      </button>
                      {session.status === 'past' && (
                        <button 
                          onClick={() => navigate(`/review/${session.id}`)}
                          className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-secondary-500 hover:bg-secondary-50 rounded-xl transition-colors"
                        >
                          <Star className="size-4 fill-secondary-500" /> Leave Review
                        </button>
                      )}
                      <button className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition-colors">
                        <AlertCircle className="size-4" /> Report Issue
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-slate-50 p-6 rounded-[2rem] border border-slate-100/50">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-white flex items-center justify-center text-primary-500 shadow-sm">
                    <CalendarIcon className="size-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</p>
                    <p className="text-sm font-bold text-slate-900">{session.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-white flex items-center justify-center text-primary-500 shadow-sm">
                    <Clock className="size-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</p>
                    <p className="text-sm font-bold text-slate-900">{session.time} ({session.duration})</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Subject</p>
                  <p className="text-sm font-bold text-slate-900">{session.subject}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Topic</p>
                  <p className="text-sm font-bold text-slate-900">{session.topic}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {session.status === 'upcoming' ? (
                <button className="flex-1 h-14 bg-primary-950 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-primary-900 transition-all shadow-lg shadow-primary-950/20">
                  Join Online Room
                  <Video className="size-5" />
                </button>
              ) : (
                <button 
                  onClick={() => navigate(`/review/${session.id}`)}
                  className="flex-1 h-14 bg-secondary-500 text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-secondary-600 transition-all shadow-lg shadow-secondary-500/20"
                >
                  Leave Feedback
                  <Star className="size-5 fill-white" />
                </button>
              )}
              <div className="flex gap-4">
                <button title="Message Tutor" className="size-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-primary-600 hover:border-primary-100 hover:bg-primary-50 transition-all">
                  <MessageSquare className="size-5" />
                </button>
                <button title="Session Notes" className="size-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-primary-600 hover:border-primary-100 hover:bg-primary-50 transition-all">
                  <FileText className="size-5" />
                </button>
              </div>
            </div>
          </DashboardCard>
        ))}
      </div>

      {/* Empty State */}
      {displaySessions.length === 0 && (
        <DashboardCard className="p-16 flex flex-col items-center text-center bg-white border border-slate-100 rounded-[3rem]">
          <div className="size-24 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center mb-6">
            <CalendarIcon className="size-12" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">No sessions found</h3>
          <p className="text-slate-400 font-medium max-w-sm mt-2 mb-8">
            You don't have any {activeTab} sessions scheduled at the moment.
          </p>
          <button 
            onClick={() => navigate('/book-session')}
            className="h-14 px-8 bg-primary-950 text-white rounded-2xl font-bold hover:bg-primary-900 transition-all shadow-xl shadow-primary-950/20"
          >
            Book a new session
          </button>
        </DashboardCard>
      )}
    </div>
  )
}

export default SessionManager
