import { useState } from 'react'
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  MoreVertical,
  Plus
} from 'lucide-react'
import DashboardCard from '../../ui/components/DashboardCard'

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date())

  // Mock days of the month
  const days = Array.from({ length: 31 }, (_, i) => ({
    date: i + 1,
    sessions: i === 23 || i === 26 || i === 29 ? [
      { id: 1, title: 'Maths P1', time: '14:00', tutor: 'Dr. Sarah Wilson', color: 'bg-primary-500' }
    ] : []
  }))

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Calendar</h1>
            <span className="px-3 py-1 bg-primary-50 text-primary-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-primary-100">May 2026</span>
          </div>
          <p className="text-slate-500 font-medium">Your personalized learning schedule at a glance.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white border border-slate-100 rounded-2xl p-1 shadow-sm">
            <button className="px-4 py-2 bg-slate-50 text-slate-900 rounded-xl text-xs font-black shadow-sm">Month</button>
            <button className="px-4 py-2 text-slate-400 rounded-xl text-xs font-black hover:text-slate-600 transition-colors">Week</button>
            <button className="px-4 py-2 text-slate-400 rounded-xl text-xs font-black hover:text-slate-600 transition-colors">Day</button>
          </div>
          <button className="h-12 px-6 bg-primary-950 text-white rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-primary-900 shadow-xl shadow-primary-950/10 transition-all">
            <Plus className="size-4" /> Book Session
          </button>
        </div>
      </div>

      <DashboardCard className="bg-white border border-slate-100 overflow-hidden shadow-xl shadow-slate-200/50">
        {/* Calendar Toolbar */}
        <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-black text-slate-900">May 2026</h2>
            <div className="flex items-center gap-1">
              <button className="size-9 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-white transition-all text-slate-400 hover:text-slate-900">
                <ChevronLeft className="size-5" />
              </button>
              <button className="size-9 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-white transition-all text-slate-400 hover:text-slate-900">
                <ChevronRight className="size-5" />
              </button>
            </div>
            <button className="text-xs font-black text-primary-600 px-4 py-2 hover:bg-primary-50 rounded-xl transition-colors">Today</button>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="size-2.5 rounded-full bg-primary-500" />
              <span className="text-xs font-bold text-slate-500">Academic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-2.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold text-slate-500">Mentoring</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-2.5 rounded-full bg-amber-500" />
              <span className="text-xs font-bold text-slate-500">Assessment</span>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 border-b border-slate-50">
          {weekDays.map(day => (
            <div key={day} className="py-4 text-center text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-50/50 border-r last:border-r-0 border-slate-50">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 grid-rows-5 h-[700px]">
          {days.map((day, i) => (
            <div 
              key={i} 
              className={`
                p-4 border-r border-b border-slate-50 group hover:bg-slate-50/50 transition-colors relative
                ${day.date === 24 ? 'bg-primary-50/20' : ''}
              `}
            >
              <span className={`
                text-xs font-black mb-2 block
                ${day.date === 24 ? 'text-primary-600' : 'text-slate-400 group-hover:text-slate-900'}
              `}>
                {day.date}
              </span>
              
              <div className="space-y-2">
                {day.sessions.map((session) => (
                  <div key={session.id} className="p-2.5 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group/session overflow-hidden">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className={`size-1.5 rounded-full ${session.color}`} />
                      <p className="text-[10px] font-black text-slate-900 truncate">{session.title}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400">
                      <Clock className="size-3" />
                      {session.time}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Hover Plus Button */}
              <button className="absolute bottom-2 right-2 size-8 bg-primary-950 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-lg active:scale-90">
                <Plus className="size-4" />
              </button>
            </div>
          ))}
        </div>
      </DashboardCard>
    </div>
  )
}

export default CalendarView
