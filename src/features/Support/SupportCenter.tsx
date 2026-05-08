import { 
  Search, 
  MessageCircle, 
  Mail, 
  Phone, 
  ChevronDown, 
  ExternalLink,
  LifeBuoy,
  MessageSquare,
  FileQuestion,
  Plus
} from 'lucide-react'
import DashboardCard from '../../ui/components/DashboardCard'

const SupportCenter = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      {/* Header */}
      <div className="text-center space-y-4 mb-12">
        <div className="size-16 bg-primary-50 text-primary-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-primary-100">
          <LifeBuoy className="size-8" />
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">How can we help you?</h1>
        <p className="text-slate-500 font-medium max-w-lg mx-auto">
          Search our knowledge base or get in touch with our expert team for any academic or technical assistance.
        </p>
        <div className="max-w-2xl mx-auto pt-6">
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 size-6 text-slate-300 group-focus-within:text-primary-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search for help (e.g. How to book a session?)" 
              className="w-full h-16 pl-16 pr-6 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl shadow-slate-200/50 outline-none focus:border-primary-500 transition-all font-bold text-lg text-slate-900"
            />
          </div>
        </div>
      </div>

      {/* Quick Contact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: MessageSquare, title: 'Live Chat', desc: 'Average response time: 2 mins', action: 'Start Chat', color: 'bg-emerald-50 text-emerald-600' },
          { icon: Mail, title: 'Email Support', desc: 'Get a reply within 24 hours', action: 'Send Email', color: 'bg-primary-50 text-primary-600' },
          { icon: Phone, title: 'Phone Support', desc: 'Available Mon-Fri, 9am-6pm', action: 'Call Now', color: 'bg-amber-50 text-amber-600' },
        ].map((item, i) => (
          <DashboardCard key={i} className="p-8 bg-white border border-slate-100 text-center hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
            <div className={`size-14 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110 ${item.color}`}>
              <item.icon className="size-7" />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2">{item.title}</h3>
            <p className="text-sm font-medium text-slate-400 mb-6">{item.desc}</p>
            <button className="w-full py-3 bg-slate-50 text-slate-900 rounded-xl font-bold text-sm hover:bg-primary-950 hover:text-white transition-all">
              {item.action}
            </button>
          </DashboardCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* FAQs */}
        <DashboardCard className="lg:col-span-7 p-8 bg-white border border-slate-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="size-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500">
              <FileQuestion className="size-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Frequently Asked Questions</h3>
          </div>
          <div className="space-y-4">
            {[
              'How do I cancel or reschedule a session?',
              'What happens if my tutor doesn\'t show up?',
              'How are tutors vetted and approved?',
              'Can I request a refund for a session?',
              'How do I track my academic progress?'
            ].map((q, i) => (
              <button key={i} className="w-full p-5 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-center justify-between text-left group hover:bg-slate-50 transition-all">
                <span className="font-bold text-slate-700 group-hover:text-primary-600">{q}</span>
                <ChevronDown className="size-5 text-slate-300 group-hover:text-primary-400" />
              </button>
            ))}
          </div>
          <button className="mt-8 text-sm font-bold text-primary-600 hover:underline flex items-center gap-2">
            View Knowledge Base <ExternalLink className="size-4" />
          </button>
        </DashboardCard>

        {/* Tickets History */}
        <DashboardCard className="lg:col-span-5 p-8 bg-white border border-slate-100 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Support Tickets</h3>
            <button className="size-10 bg-primary-950 text-white rounded-xl flex items-center justify-center hover:bg-primary-900 shadow-sm transition-all">
              <Plus className="size-5" />
            </button>
          </div>
          <div className="space-y-6 flex-1">
            {[
              { id: '#TK-9281', title: 'Payment Issue', status: 'In Review', color: 'bg-amber-50 text-amber-600' },
              { id: '#TK-9275', title: 'Session Rescheduling', status: 'Resolved', color: 'bg-emerald-50 text-emerald-600' },
              { id: '#TK-9242', title: 'Tutor Feedback Error', status: 'Resolved', color: 'bg-emerald-50 text-emerald-600' },
            ].map((ticket, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{ticket.id}</p>
                  <p className="font-bold text-slate-900 text-sm mt-0.5">{ticket.title}</p>
                </div>
                <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${ticket.color}`}>
                  {ticket.status}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-8 p-6 bg-primary-50 rounded-3xl border border-primary-100">
            <p className="text-xs font-bold text-primary-600 leading-relaxed">
              Facing a critical issue? Our 24/7 emergency line is always available for priority students.
            </p>
          </div>
        </DashboardCard>
      </div>
    </div>
  )
}

export default SupportCenter
