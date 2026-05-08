import { useState } from 'react'
import { 
  CheckCircle2, 
  XCircle, 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  Calendar,
  AlertCircle,
  TrendingUp,
  Inbox
} from 'lucide-react'
import DashboardCard from '../../ui/components/DashboardCard'
import MetricCard from '../../ui/components/MetricCard'

const TutorSessionRequests = () => {
  const [activeTab, setActiveTab] = useState('pending')
  const [searchQuery, setSearchQuery] = useState('')

  const requests = [
    {
      id: 1,
      student: 'Marcus Lim',
      subject: 'A-Level Chemistry',
      date: '10 May 2026',
      time: '14:00 PM',
      duration: '60 min',
      price: '£45.00',
      status: 'pending',
      img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus'
    },
    {
      id: 2,
      student: 'Elena Rossi',
      subject: 'GCSE Physics',
      date: '12 May 2026',
      time: '10:30 AM',
      duration: '60 min',
      price: '£35.00',
      status: 'pending',
      img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena'
    }
  ]

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Booking Requests</h1>
          <p className="text-[11px] font-bold text-slate-500 mt-1">Review and manage incoming session bookings from students.</p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Pending Requests" value="2" icon={Inbox} trend="Action required" isPositive={false} variant="orange" />
        <MetricCard title="Total Received" value="128" icon={TrendingUp} trend="+14% vs last" isPositive={true} variant="blue" />
        <MetricCard title="Accepted" value="112" icon={CheckCircle2} trend="88% rate" isPositive={true} variant="green" />
        <MetricCard title="Rejected" value="14" icon={XCircle} trend="12% rate" isPositive={false} variant="purple" />
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex p-1 bg-slate-100 rounded-2xl w-fit">
          {[
            { id: 'pending', label: 'Pending' },
            { id: 'accepted', label: 'Accepted' },
            { id: 'rejected', label: 'Rejected' },
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
              placeholder="Search requests..." 
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

      {/* Requests Table */}
      <DashboardCard className="bg-white border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                <th className="px-8 py-5">Student</th>
                <th className="px-8 py-5">Subject</th>
                <th className="px-8 py-5">Requested Time</th>
                <th className="px-8 py-5">Rate</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {requests.filter(r => r.status === activeTab).map((req) => (
                <tr key={req.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl overflow-hidden border-2 border-white shadow-sm">
                        <img src={req.img} alt={req.student} className="size-full object-cover" />
                      </div>
                      <span className="font-bold text-slate-900">{req.student}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-bold text-slate-900">{req.subject}</span>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                        <Calendar className="size-3.5 text-primary-500" />
                        {req.date}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                        <Clock className="size-3.5 text-primary-500" />
                        {req.time}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-black text-slate-900">{req.price}</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="h-10 px-5 bg-emerald-500 text-white rounded-xl text-xs font-black hover:bg-emerald-600 transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20">
                        <CheckCircle2 className="size-4" />
                        Accept
                      </button>
                      <button className="h-10 px-5 bg-red-500 text-white rounded-xl text-xs font-black hover:bg-red-600 transition-all flex items-center gap-2 shadow-lg shadow-red-500/20">
                        <XCircle className="size-4" />
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {requests.filter(r => r.status === activeTab).length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <AlertCircle className="size-10 text-slate-200 mb-4" />
                      <p className="text-sm font-bold text-slate-400">No {activeTab} requests found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-8 py-5 border-t border-slate-50 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-400">
            Showing <span className="text-slate-900">1-2</span> of <span className="text-slate-900">128</span> requests
          </p>
          <div className="flex items-center gap-2">
            <button className="size-10 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-all disabled:opacity-50" disabled>
              <ChevronLeft className="size-5" />
            </button>
            <button className="size-10 rounded-xl bg-primary-950 text-white shadow-lg shadow-primary-950/20 text-xs font-black">1</button>
            <button className="size-10 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-all">
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </DashboardCard>
    </div>
  )
}

export default TutorSessionRequests
