import { useState } from 'react'
import { 
  Wallet, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Download, 
  Filter, 
  Search,
  CreditCard,
  History,
  AlertCircle,
  X,
  ChevronRight,
  ShieldCheck,
  Check
} from 'lucide-react'
import Chart from 'react-apexcharts'
import { motion, AnimatePresence } from 'framer-motion'
import DashboardCard from '../../ui/components/DashboardCard'
import MetricCard from '../../ui/components/MetricCard'

const EarningsManager = () => {
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState('500')

  const chartOptions: any = {
    chart: {
      id: 'earnings-trend',
      toolbar: { show: false },
      fontFamily: 'Inter, sans-serif'
    },
    stroke: { curve: 'smooth', width: 3 },
    colors: ['#0f172a'],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      labels: { style: { colors: '#94a3b8', fontWeight: 600 } }
    },
    yaxis: {
      labels: { 
        formatter: (val: any) => '£' + val,
        style: { colors: '#94a3b8', fontWeight: 600 } 
      }
    },
    grid: { borderColor: '#f1f5f9' },
    tooltip: { theme: 'light' }
  }

  const series = [{
    name: 'Earnings',
    data: [1200, 1500, 1800, 2100, 1900, 2400]
  }]

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Earnings & Payouts</h1>
          <p className="text-[11px] font-bold text-slate-500 mt-1">Track your revenue, manage payouts and view history.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-12 px-6 bg-slate-50 border border-slate-200 rounded-2xl font-black text-slate-900 flex items-center gap-2.5 hover:bg-white hover:shadow-lg transition-all active:scale-95">
            <Download className="size-5" />
            <span className="text-sm">Export Statement</span>
          </button>
          <button 
            onClick={() => setIsWithdrawModalOpen(true)}
            className="h-12 px-7 bg-primary-950 text-white rounded-2xl font-black text-sm hover:bg-primary-900 transition-all shadow-xl shadow-primary-950/20 active:scale-95"
          >
            Withdraw Funds
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Balance" value="£2,450.00" icon={Wallet} trend="Available" isPositive={true} variant="blue" />
        <MetricCard title="Pending Payout" value="£840.50" icon={History} trend="Estimated 12 May" isPositive={true} variant="orange" />
        <MetricCard title="This Month" value="£1,240.00" icon={TrendingUp} trend="+12% vs last" isPositive={true} variant="green" />
        <MetricCard title="Total Earned" value="£12,850" icon={CreditCard} trend="Lifetime" isPositive={true} variant="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Earnings Chart */}
        <DashboardCard className="lg:col-span-8 p-8 bg-white border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Revenue Trends</h3>
            <select className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs font-bold text-slate-600 outline-none">
              <option>Last 6 Months</option>
              <option>Year to Date</option>
            </select>
          </div>
          <div className="h-[300px]">
            <Chart options={chartOptions} series={series} type="area" height="100%" />
          </div>
        </DashboardCard>

        {/* Payment Methods */}
        <DashboardCard className="lg:col-span-4 p-8 bg-white border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-8">Payout Method</h3>
          <div className="p-6 bg-slate-900 rounded-[1.6rem] text-white relative overflow-hidden group mb-6">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <CreditCard className="size-16" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Primary Account</p>
            <p className="text-lg font-bold mb-4">**** **** **** 4291</p>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Status</p>
                <p className="text-xs font-bold text-emerald-400">Verified</p>
              </div>
              <button className="text-xs font-bold text-white/60 hover:text-white transition-colors">Edit</button>
            </div>
          </div>
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-3">
            <AlertCircle className="size-4 text-amber-600 mt-0.5" />
            <p className="text-[10px] font-medium text-amber-900 leading-relaxed">
              Payouts are processed every Monday. Please ensure your bank details are up to date to avoid delays.
            </p>
          </div>
        </DashboardCard>
      </div>

      {/* Transaction History */}
      <DashboardCard className="p-8 bg-white border border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">Transaction History</h3>
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search transactions..." 
                className="h-11 pl-10 pr-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-primary-500 transition-all font-bold text-xs text-slate-900 w-full md:w-64"
              />
            </div>
            <button className="size-11 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">
              <Filter className="size-5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                <th className="pb-4">Description</th>
                <th className="pb-4">Date</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { d: 'Weekly Payout', date: '04 May 2026', amount: '£420.00', status: 'completed', type: 'payout' },
                { d: 'Session Payment - Alex W.', date: '03 May 2026', amount: '£45.00', status: 'completed', type: 'earning' },
                { d: 'Session Payment - Sophia G.', date: '02 May 2026', amount: '£35.00', status: 'completed', type: 'earning' },
                { d: 'Weekly Payout', date: '27 Apr 2026', amount: '£380.00', status: 'completed', type: 'payout' },
              ].map((row, i) => (
                <tr key={i} className="group hover:bg-slate-50 transition-colors">
                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      <div className={`size-10 rounded-xl flex items-center justify-center ${row.type === 'payout' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                        {row.type === 'payout' ? <ArrowUpRight className="size-5" /> : <ArrowDownLeft className="size-5" />}
                      </div>
                      <span className="font-bold text-slate-900">{row.d}</span>
                    </div>
                  </td>
                  <td className="py-5 text-sm font-bold text-slate-400">{row.date}</td>
                  <td className="py-5">
                    <span className={`text-sm font-black ${row.type === 'payout' ? 'text-slate-900' : 'text-emerald-600'}`}>
                      {row.type === 'payout' ? '-' : '+'}{row.amount}
                    </span>
                  </td>
                  <td className="py-5">
                    <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                      {row.status}
                    </span>
                  </td>
                  <td className="py-5 text-right">
                    <button className="text-slate-300 hover:text-slate-900 transition-colors">
                      <Download className="size-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>

      {/* Withdraw Modal */}
      <AnimatePresence>
        {isWithdrawModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWithdrawModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 pb-4 flex justify-between items-center">
                <h2 className="text-lg font-black text-slate-900 tracking-tight">Withdraw Funds</h2>
                <button 
                  onClick={() => setIsWithdrawModalOpen(false)}
                  className="size-10 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="p-8 space-y-8">
                {/* Balance Display */}
                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Available Balance</p>
                    <p className="text-2xl font-black text-slate-900">£2,450.00</p>
                  </div>
                  <div className="size-12 bg-primary-950 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary-950/20">
                    <Wallet className="size-6" />
                  </div>
                </div>

                {/* Amount Input */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Withdrawal Amount</label>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-slate-400">£</span>
                    <input 
                      type="number" 
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="w-full h-20 pl-12 pr-6 bg-slate-50 border border-slate-100 rounded-[2rem] text-3xl font-black text-slate-900 outline-none focus:border-primary-500 transition-all"
                    />
                  </div>
                  <div className="flex gap-2">
                    {['100', '500', '1000', 'Max'].map((val) => (
                      <button 
                        key={val}
                        onClick={() => setWithdrawAmount(val === 'Max' ? '2450' : val)}
                        className="h-10 px-4 bg-white border border-slate-100 rounded-xl text-xs font-bold text-slate-600 hover:border-primary-500 hover:text-primary-600 transition-all"
                      >
                        {val === 'Max' ? 'Max' : `£${val}`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payout Method */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Destination Account</label>
                  <div className="p-5 bg-slate-900 rounded-[2rem] text-white flex items-center justify-between group cursor-pointer hover:scale-[1.02] transition-all">
                    <div className="flex items-center gap-4">
                      <div className="size-10 bg-white/10 rounded-xl flex items-center justify-center">
                        <CreditCard className="size-5 text-secondary-500" />
                      </div>
                      <div>
                        <p className="text-xs font-black">HSBC Business Account</p>
                        <p className="text-[10px] text-white/40 font-bold tracking-widest uppercase">**** 4291</p>
                      </div>
                    </div>
                    <Check className="size-5 text-emerald-400" />
                  </div>
                </div>

                {/* Info Card */}
                <div className="p-4 bg-primary-50 rounded-2xl border border-primary-100 flex items-start gap-3">
                  <ShieldCheck className="size-4 text-primary-600 mt-0.5" />
                  <p className="text-[10px] font-medium text-primary-900 leading-relaxed">
                    Withdrawals to your primary account take 1-3 business days. Securely processed via Meave Payments.
                  </p>
                </div>

                {/* Action */}
                <button className="w-full h-16 bg-primary-950 text-white rounded-[2rem] font-black hover:bg-primary-900 transition-all shadow-2xl shadow-primary-950/30 flex items-center justify-center gap-3 active:scale-95 group">
                  Confirm Withdrawal
                  <ChevronRight className="size-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default EarningsManager
