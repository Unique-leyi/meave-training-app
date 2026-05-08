import { useState } from 'react'
import { 
  CreditCard, 
  Download, 
  ArrowUpRight, 
  Search, 
  Filter, 
  MoreVertical, 
  Plus, 
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  ShieldCheck,
  Calendar,
  Eye,
  X,
  Wallet,
  ArrowDownCircle,
  TrendingUp,
  Receipt
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import DashboardCard from '../../ui/components/DashboardCard'
import MetricCard from '../../ui/components/MetricCard'

const BillingDashboard = () => {
  const [activeTab, setActiveTab] = useState('transactions')
  const [selectedTx, setSelectedTx] = useState<any>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const transactions = [
    { id: '#INV-4291', date: 'May 24, 2026', time: '14:20', desc: 'Mathematics Session', tutor: 'Dr. Sarah Wilson', amount: '£47.50', status: 'completed', method: 'Visa ending in 4242' },
    { id: '#INV-4288', date: 'May 18, 2026', time: '09:15', desc: 'Biology Session', tutor: 'Dr. Sarah Wilson', amount: '£45.00', status: 'completed', method: 'Visa ending in 4242' },
    { id: '#INV-4285', date: 'May 12, 2026', time: '11:45', desc: 'Physics Session', tutor: 'Marcus Chen', amount: '£35.00', status: 'processing', method: 'Visa ending in 4242' },
    { id: '#INV-4282', date: 'May 05, 2026', time: '16:00', desc: 'Monthly Subscription', tutor: 'Meave Platform', amount: '£12.99', status: 'completed', method: 'Visa ending in 4242' },
    { id: '#INV-4279', date: 'Apr 28, 2026', time: '13:30', desc: 'English Literature', tutor: 'Aisha Rahman', amount: '£40.00', status: 'completed', method: 'Mastercard ending in 8891' },
    { id: '#INV-4275', date: 'Apr 21, 2026', time: '10:00', desc: 'Geography Session', tutor: 'Dr. Sarah Wilson', amount: '£45.00', status: 'failed', method: 'Visa ending in 4242' },
  ]

  const openDrawer = (tx: any) => {
    setSelectedTx(tx)
    setIsDrawerOpen(true)
  }

  return (
    <div className="space-y-8 pb-20 relative">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-primary-600 mb-2">
            <Wallet className="size-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Financial Management</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Billing & Payments</h1>
          <p className="text-slate-500 font-medium mt-1">Review your transaction history and manage your active plans.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-12 px-6 bg-white border border-slate-100 text-slate-600 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
            <Download className="size-5" />
            Export History
          </button>
          <button className="h-12 px-6 bg-primary-950 text-white rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-primary-950/20">
            <Plus className="size-5" />
            Add Funds
          </button>
        </div>
      </div>

      {/* Modern Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Spent" value="£245.50" icon={TrendingUp} trend="12.5%" isPositive={false} variant="orange" />
        <MetricCard title="Credit Balance" value="£120.00" icon={Wallet} trend="+£45.00" isPositive={true} variant="green" />
        <MetricCard title="Active Plan" value="Premium" icon={ShieldCheck} trend="Annual" isPositive={true} variant="blue" />
        <MetricCard title="Pending" value="£35.00" icon={Clock} trend="1 Invoice" isPositive={false} variant="purple" />
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        {/* Tabs & Filters */}
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/30">
          <div className="flex bg-white p-1 rounded-2xl border border-slate-100 w-fit">
            {['transactions', 'subscriptions', 'cards'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-primary-950 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search transactions..." 
                className="h-11 pl-11 pr-4 bg-white border border-slate-100 rounded-2xl text-xs font-bold outline-none focus:border-primary-500 w-64 shadow-sm" 
              />
            </div>
            <button className="size-11 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 shadow-sm">
              <Filter className="size-4" />
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] bg-slate-50/50">
                <th className="px-8 py-5">Transaction ID</th>
                <th className="px-4 py-5">Service / Tutor</th>
                <th className="px-4 py-5">Date & Time</th>
                <th className="px-4 py-5">Amount</th>
                <th className="px-4 py-5">Status</th>
                <th className="px-8 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {transactions.map((tx) => (
                <tr key={tx.id} className="group hover:bg-primary-50/30 transition-all cursor-pointer" onClick={() => openDrawer(tx)}>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-primary-600 transition-colors">
                        <Receipt className="size-5" />
                      </div>
                      <span className="font-bold text-slate-900">{tx.id}</span>
                    </div>
                  </td>
                  <td className="px-4 py-6">
                    <div>
                      <p className="text-sm font-black text-slate-900">{tx.desc}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{tx.tutor}</p>
                    </div>
                  </td>
                  <td className="px-4 py-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-600">{tx.date}</span>
                      <span className="text-[10px] font-medium text-slate-400">{tx.time}</span>
                    </div>
                  </td>
                  <td className="px-4 py-6">
                    <span className="text-sm font-black text-slate-900">{tx.amount}</span>
                  </td>
                  <td className="px-4 py-6">
                    <div className={`
                      inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border
                      ${tx.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                        tx.status === 'processing' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                        'bg-rose-50 text-rose-600 border-rose-100'}
                    `}>
                      <div className={`size-1.5 rounded-full ${tx.status === 'completed' ? 'bg-emerald-500' : tx.status === 'processing' ? 'bg-amber-500' : 'bg-rose-500'}`} />
                      {tx.status}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="size-9 bg-white border border-slate-100 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary-600 hover:shadow-md transition-all">
                        <Download className="size-4" />
                      </button>
                      <button className="size-9 bg-white border border-slate-100 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary-600 hover:shadow-md transition-all">
                        <Eye className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-6 border-t border-slate-50 flex items-center justify-between bg-slate-50/30">
          <p className="text-xs font-bold text-slate-400">Showing 6 of 42 transactions</p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border border-slate-100 rounded-xl text-xs font-bold text-slate-600 hover:bg-white">Previous</button>
            <button className="px-4 py-2 bg-primary-950 text-white rounded-xl text-xs font-bold shadow-lg shadow-primary-950/20">Next</button>
          </div>
        </div>
      </div>

      {/* Transaction Details Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[60] flex flex-col"
            >
              <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-primary-950 text-white">
                <div>
                  <h3 className="text-xl font-black">Transaction Details</h3>
                  <p className="text-primary-400 text-xs font-bold mt-1">Invoice {selectedTx?.id}</p>
                </div>
                <button onClick={() => setIsDrawerOpen(false)} className="size-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                  <X className="size-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-10">
                {/* Amount Header */}
                <div className="text-center pb-8 border-b border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Amount</p>
                  <p className="text-5xl font-black text-slate-900">{selectedTx?.amount}</p>
                  <div className={`mt-4 inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${selectedTx?.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    {selectedTx?.status}
                  </div>
                </div>

                {/* Details Grid */}
                <div className="space-y-6">
                  <div className="flex justify-between">
                    <span className="text-xs font-bold text-slate-400">Date</span>
                    <span className="text-xs font-black text-slate-900">{selectedTx?.date} at {selectedTx?.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs font-bold text-slate-400">Description</span>
                    <span className="text-xs font-black text-slate-900">{selectedTx?.desc}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs font-bold text-slate-400">Tutor</span>
                    <span className="text-xs font-black text-slate-900">{selectedTx?.tutor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs font-bold text-slate-400">Payment Method</span>
                    <div className="flex items-center gap-2">
                      <CreditCard className="size-4 text-slate-400" />
                      <span className="text-xs font-black text-slate-900">{selectedTx?.method}</span>
                    </div>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4">Invoice Breakdown</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-medium text-slate-600">
                      <span>Standard Session Fee</span>
                      <span>{selectedTx?.amount}</span>
                    </div>
                    <div className="flex justify-between text-xs font-medium text-slate-600">
                      <span>Platform Service Fee</span>
                      <span>£0.00</span>
                    </div>
                    <div className="pt-3 border-t border-slate-200 flex justify-between text-sm font-black text-slate-900">
                      <span>Total</span>
                      <span>{selectedTx?.amount}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-slate-50 grid grid-cols-2 gap-4">
                <button className="h-14 border border-slate-100 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                  <AlertCircle className="size-4" /> Report Issue
                </button>
                <button className="h-14 bg-primary-950 text-white rounded-2xl font-bold hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary-950/20">
                  <Download className="size-4" /> Download PDF
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default BillingDashboard
