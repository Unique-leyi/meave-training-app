import { useState } from 'react'
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Save, 
  ChevronLeft, 
  ChevronRight, 
  Plus 
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import DashboardCard from '../../ui/components/DashboardCard'

const AvailabilityManager = () => {
  const [activeTab, setActiveTab] = useState('weekly')
  const [currentDate, setCurrentDate] = useState(new Date())
  
  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', 
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00'
  ]

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  
  const [selectedSlots, setSelectedSlots] = useState<Record<string, string[]>>({
    'Monday': ['09:00', '09:30', '10:00', '14:00', '14:30'],
    'Tuesday': ['10:00', '10:30', '11:00'],
    'Wednesday': ['09:00', '09:30', '15:00', '15:30'],
    'Thursday': ['09:00', '10:00', '11:00'],
    'Friday': ['14:00', '15:00', '16:00'],
  })

  const toggleSlot = (day: string, time: string) => {
    setSelectedSlots(prev => {
      const daySlots = prev[day] || []
      if (daySlots.includes(time)) {
        return { ...prev, [day]: daySlots.filter(t => t !== time) }
      } else {
        return { ...prev, [day]: [...daySlots, time] }
      }
    })
  }

  // Native Date Logic - NO EXTERNAL DEPENDENCIES
  const getMonthData = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startOffset = firstDay.getDay() // 0 is Sunday
    
    const daysInMonth = []
    
    // Previous month padding
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    for (let i = startOffset - 1; i >= 0; i--) {
      daysInMonth.push({ day: prevMonthLastDay - i, currentMonth: false })
    }
    
    // Current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      daysInMonth.push({ day: i, currentMonth: true })
    }
    
    // Next month padding
    const remaining = 42 - daysInMonth.length
    for (let i = 1; i <= remaining; i++) {
      daysInMonth.push({ day: i, currentMonth: false })
    }
    
    return daysInMonth
  }

  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))

  const monthName = currentDate.toLocaleString('default', { month: 'long' })
  const year = currentDate.getFullYear()

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Teaching Availability</h1>
          <p className="text-[11px] font-bold text-slate-500 mt-1">Set your 30-minute teaching slots for students to book.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex p-1 bg-slate-100 rounded-2xl">
            <button 
              onClick={() => setActiveTab('weekly')}
              className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${activeTab === 'weekly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Weekly Pattern
            </button>
            <button 
              onClick={() => setActiveTab('calendar')}
              className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${activeTab === 'calendar' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Calendar View
            </button>
          </div>
          <button className="h-12 px-7 bg-primary-950 text-white rounded-2xl font-black text-sm hover:bg-primary-900 transition-all shadow-xl shadow-primary-950/20 active:scale-95 flex items-center gap-2">
            <Save className="size-4" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-9">
          {activeTab === 'weekly' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7 gap-4">
              {days.map((day) => (
                <DashboardCard key={day} className="p-4 bg-white border border-slate-100 flex flex-col">
                  <div className="mb-4 pb-3 border-b border-slate-50">
                    <h3 className="font-black text-slate-900 text-xs truncate">{day}</h3>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                      {selectedSlots[day]?.length || 0} Slots
                    </p>
                  </div>
                  
                  <div className="space-y-1.5 overflow-y-auto max-h-[400px] pr-1 no-scrollbar">
                    {timeSlots.map((time) => {
                      const isActive = selectedSlots[day]?.includes(time)
                      return (
                        <button
                          key={time}
                          onClick={() => toggleSlot(day, time)}
                          className={`
                            w-full py-2 px-2.5 rounded-lg text-[10px] font-black transition-all flex items-center justify-between group
                            ${isActive 
                              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 z-10' 
                              : 'bg-slate-50 text-slate-400 hover:bg-white hover:text-slate-600 hover:border hover:border-slate-100'}
                          `}
                        >
                          {time}
                          {isActive && <CheckCircle2 className="size-2.5" />}
                        </button>
                      )
                    })}
                  </div>
                </DashboardCard>
              ))}
            </div>
          ) : (
            <DashboardCard className="p-8 bg-white border border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">{monthName} {year}</h3>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={prevMonth}
                      className="size-9 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all active:scale-90"
                    >
                      <ChevronLeft className="size-5" />
                    </button>
                    <button 
                      onClick={nextMonth}
                      className="size-9 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all active:scale-90"
                    >
                      <ChevronRight className="size-5" />
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => setCurrentDate(new Date())}
                  className="text-xs font-black text-primary-600 hover:underline"
                >
                  Go to Today
                </button>
              </div>
              
              <div className="grid grid-cols-7 gap-px bg-slate-100 border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                  <div key={d} className="bg-slate-50 p-4 text-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{d}</span>
                  </div>
                ))}
                {getMonthData(currentDate).map((dayData, i) => {
                  const isToday = dayData.currentMonth && dayData.day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth()
                  return (
                    <div key={i} className={`bg-white h-32 p-4 transition-colors hover:bg-slate-50 cursor-pointer group relative ${!dayData.currentMonth ? 'opacity-30' : ''} ${isToday ? 'ring-2 ring-primary-500 ring-inset' : ''}`}>
                      <span className={`text-xs font-black ${isToday ? 'text-primary-600' : 'text-slate-400'}`}>{dayData.day}</span>
                      {isToday && (
                        <div className="mt-2 space-y-1">
                          <div className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-[9px] font-black truncate">14:00 - Alex W.</div>
                        </div>
                      )}
                      <button className="absolute bottom-4 right-4 size-6 bg-slate-50 text-slate-400 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-primary-950 hover:text-white">
                        <Plus className="size-3" />
                      </button>
                    </div>
                  )
                })}
              </div>
            </DashboardCard>
          )}
        </div>

        <div className="lg:col-span-3 space-y-6">
          <DashboardCard variant="navy" className="p-6 border-none shadow-2xl shadow-primary-950/20">
            <h3 className="text-sm font-black mb-6 flex items-center gap-3">
              <Clock className="size-4 text-secondary-500" />
              Time Preferences
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Standard Slot', value: '30 mins' },
                { label: 'Gap Between', value: '15 mins' },
                { label: 'Min. Notice', value: '24 hours' },
              ].map((pref, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-white/10 last:border-0">
                  <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">{pref.label}</span>
                  <span className="text-xs font-black text-secondary-500">{pref.value}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
              Update Settings
            </button>
          </DashboardCard>

          <DashboardCard className="p-6 bg-amber-50 border border-amber-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-9 bg-amber-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                <AlertCircle className="size-5" />
              </div>
              <h3 className="text-[10px] font-black text-amber-900 uppercase tracking-widest">Holiday Mode</h3>
            </div>
            <p className="text-[10px] font-medium text-amber-800 mb-6 leading-relaxed">
              Block booking requests for specific dates when you're away.
            </p>
            <button className="w-full h-11 bg-white border border-amber-200 text-amber-900 rounded-xl text-xs font-black hover:bg-amber-100 transition-all">
              Schedule Time Off
            </button>
          </DashboardCard>
        </div>
      </div>
    </div>
  )
}

export default AvailabilityManager
