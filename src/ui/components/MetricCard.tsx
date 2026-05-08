import { TrendingUp, TrendingDown, MoreVertical } from 'lucide-react'
import DashboardCard from './DashboardCard'

interface MetricCardProps {
  title: string
  value: string | number
  icon: any
  trend: string
  isPositive: boolean
  variant?: 'white' | 'green' | 'blue' | 'orange' | 'purple' | 'slate'
}

const MetricCard = ({ title, value, icon: Icon, trend, isPositive, variant = 'white' }: MetricCardProps) => (
  <DashboardCard variant={variant} className="p-5 hover:shadow-xl hover:shadow-slate-200/50 transition-all group overflow-hidden">
    <div className="flex justify-between items-start mb-3">
      <div className={`size-10 rounded-xl flex items-center justify-center transition-colors
        ${variant === 'white' ? 'bg-slate-50 text-slate-600 group-hover:bg-primary-50 group-hover:text-primary-600' : 'bg-white/60 text-slate-700 shadow-sm'}
      `}>
        <Icon className="size-5" />
      </div>
    </div>
    <div className="min-w-0">
      <p className="text-[10px] font-black text-slate-400 mb-1 uppercase tracking-widest truncate">{title}</p>
      <div className="flex flex-wrap items-baseline gap-1.5">
        <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">{value}</h3>
        <div className={`flex items-center gap-0.5 text-[10px] font-black whitespace-nowrap ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
          {isPositive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
          {trend}
        </div>
      </div>
    </div>
  </DashboardCard>
)

export default MetricCard
