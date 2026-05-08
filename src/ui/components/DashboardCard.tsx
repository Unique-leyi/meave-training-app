import { ReactNode } from 'react'

interface DashboardCardProps {
  children: ReactNode
  className?: string
  variant?: 'white' | 'green' | 'blue' | 'orange' | 'purple' | 'slate' | 'navy'
  overflowHidden?: boolean
}

const DashboardCard = ({ 
  children, 
  className = '', 
  variant = 'white',
  overflowHidden = true 
}: DashboardCardProps) => {
  const variants = {
    white: 'bg-white border-slate-100',
    green: 'bg-emerald-50 border-emerald-100/50',
    blue: 'bg-blue-50 border-blue-100/50',
    orange: 'bg-orange-50 border-orange-100/50',
    purple: 'bg-purple-50 border-purple-100/50',
    slate: 'bg-slate-50 border-slate-100',
    navy: 'bg-primary-950 border-primary-900 text-white'
  }

  return (
    <div className={`
      ${variants[variant]} 
      rounded-[1.2rem] border shadow-sm transition-all duration-300 
      ${overflowHidden ? 'overflow-hidden' : 'overflow-visible'}
      ${className}
    `}>
      {children}
    </div>
  )
}

export default DashboardCard
