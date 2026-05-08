import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, AlertCircle, X } from 'lucide-react'
import Button from './Button'

interface StatusModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'success' | 'error' | 'warning'
  title: string
  message: string
  actionLabel?: string
  onAction?: () => void
}

const StatusModal = ({
  isOpen,
  onClose,
  type,
  title,
  message,
  actionLabel,
  onAction
}: StatusModalProps) => {
  const configs = {
    success: {
      icon: CheckCircle2,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-100',
      shadowColor: 'shadow-emerald-500/20'
    },
    error: {
      icon: XCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-100',
      shadowColor: 'shadow-red-500/20'
    },
    warning: {
      icon: AlertCircle,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-100',
      shadowColor: 'shadow-amber-500/20'
    }
  }

  const config = configs[type]
  const Icon = config.icon

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X className="size-6" />
            </button>

            <div className="p-10 text-center">
              <div className={`size-24 ${config.bgColor} ${config.color} rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl ${config.shadowColor} border-4 border-white`}>
                <Icon className="size-12" strokeWidth={2.5} />
              </div>

              <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-4">
                {title}
              </h3>
              
              <p className="text-slate-500 font-medium leading-relaxed mb-10 max-w-sm mx-auto">
                {message}
              </p>

              {actionLabel && (
                <Button 
                  onClick={() => {
                    onAction?.()
                    onClose()
                  }}
                  variant={type === 'error' ? 'outline' : 'primary'}
                  className="h-16"
                >
                  {actionLabel}
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default StatusModal
