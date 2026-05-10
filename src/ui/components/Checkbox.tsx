import React, { forwardRef } from 'react'
import { Check } from 'lucide-react'

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode
  error?: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className={`flex items-start gap-3 cursor-pointer group select-none ${className}`}>
          <div className="relative flex items-center">
            <input
              type="checkbox"
              className="peer sr-only"
              ref={ref}
              {...props}
            />
            <div className={`
              size-6 rounded-lg border-2 transition-all flex items-center justify-center
              ${error 
                ? 'border-destructive bg-destructive/5' 
                : 'border-slate-300 bg-white peer-checked:border-primary-500 peer-checked:bg-primary-500 group-hover:border-primary-400'
              }
              peer-focus-visible:ring-4 peer-focus-visible:ring-primary-500/10
            `}>
              <Check 
                className={`size-4 text-white transition-opacity ${props.checked || 'peer-checked:opacity-100 opacity-0'}`} 
                strokeWidth={4} 
              />
            </div>
          </div>
          <span className={`text-sm font-medium transition-colors ${error ? 'text-destructive' : 'text-slate-600 group-hover:text-slate-900'}`}>
            {label}
          </span>
        </label>
        {error && (
          <p className="text-xs font-bold text-destructive animate-in fade-in slide-in-from-top-1 px-1">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
