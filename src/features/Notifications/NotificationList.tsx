import { 
  Bell, 
  Calendar, 
  CreditCard, 
  MessageSquare, 
  Zap, 
  MoreVertical, 
  Check,
  Settings,
  Trash2,
  AlertCircle
} from 'lucide-react'
import DashboardCard from '../../ui/components/DashboardCard'

const NotificationList = () => {
  const notifications = [
    { id: 1, type: 'session', title: 'Session Confirmed', desc: 'Your session with Dr. Sarah Wilson for Mathematics has been confirmed for May 24th.', time: '2 mins ago', unread: true, icon: Calendar, color: 'text-blue-500 bg-blue-50' },
    { id: 2, type: 'message', title: 'New Message', desc: 'Marcus Chen sent you a message regarding your last Physics assessment.', time: '1 hour ago', unread: true, icon: MessageSquare, color: 'text-emerald-500 bg-emerald-50' },
    { id: 3, type: 'payment', title: 'Payment Successful', desc: 'Your payment of £47.50 for the upcoming session was successfully processed.', time: '3 hours ago', unread: false, icon: CreditCard, color: 'text-primary-500 bg-primary-50' },
    { id: 4, type: 'system', title: 'Monthly Report Available', desc: 'Your academic progress report for April 2026 is now available for download.', time: 'Yesterday', unread: false, icon: Zap, color: 'text-amber-500 bg-amber-50' },
    { id: 5, type: 'session', title: 'Session Reminder', desc: 'Reminder: Your session for Biology starts in 30 minutes.', time: '2 days ago', unread: false, icon: AlertCircle, color: 'text-rose-500 bg-rose-50' },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Notifications</h1>
          <p className="text-slate-500 font-medium mt-1">Stay updated with your latest academic activities.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-11 px-5 bg-white border border-slate-100 rounded-xl font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm">
            <Check className="size-4" />
            Mark all as read
          </button>
          <button className="size-11 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors shadow-sm">
            <Settings className="size-5" />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {['All', 'Sessions', 'Payments', 'Messages', 'System'].map((cat, i) => (
          <button 
            key={cat}
            className={`
              px-6 py-2.5 rounded-2xl text-sm font-black whitespace-nowrap transition-all
              ${i === 0 ? 'bg-primary-950 text-white shadow-lg shadow-primary-950/20' : 'bg-white border border-slate-100 text-slate-500 hover:border-slate-200'}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-4">
        {notifications.map((notif) => (
          <DashboardCard 
            key={notif.id} 
            className={`
              p-6 bg-white border transition-all group
              ${notif.unread ? 'border-primary-100 shadow-xl shadow-primary-950/5 ring-1 ring-primary-50' : 'border-slate-100 hover:border-slate-200'}
            `}
          >
            <div className="flex gap-6">
              <div className={`size-14 rounded-2xl shrink-0 flex items-center justify-center ${notif.color}`}>
                <notif.icon className="size-7" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-3">
                    <h3 className={`font-black tracking-tight ${notif.unread ? 'text-slate-900' : 'text-slate-600'}`}>
                      {notif.title}
                    </h3>
                    {notif.unread && (
                      <span className="size-2 bg-primary-600 rounded-full animate-pulse" />
                    )}
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest shrink-0">{notif.time}</span>
                </div>
                <p className={`text-sm leading-relaxed mb-4 ${notif.unread ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>
                  {notif.desc}
                </p>
                <div className="flex items-center gap-4">
                  <button className="text-xs font-black text-primary-600 hover:underline">View Details</button>
                  <div className="size-1 rounded-full bg-slate-200" />
                  <button className="text-xs font-black text-slate-400 hover:text-rose-500 flex items-center gap-1">
                    <Trash2 className="size-3" /> Dismiss
                  </button>
                </div>
              </div>
              <button className="p-2 h-fit text-slate-300 hover:text-slate-900 transition-colors opacity-0 group-hover:opacity-100">
                <MoreVertical className="size-5" />
              </button>
            </div>
          </DashboardCard>
        ))}
      </div>

      <div className="flex justify-center pt-6">
        <button className="px-8 py-4 bg-slate-50 text-slate-500 font-bold rounded-2xl hover:bg-slate-100 transition-all border border-slate-100">
          Load Previous Notifications
        </button>
      </div>
    </div>
  )
}

export default NotificationList
