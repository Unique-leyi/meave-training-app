import { ButtonHTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onDragOver'> {
  children: ReactNode
  isLoading?: boolean
  loadingText?: string
  variant?: 'primary' | 'secondary' | 'outline'
  fullWidth?: boolean
}

const Button = ({ 
  children, 
  isLoading, 
  loadingText,
  variant = 'primary', 
  fullWidth = true,
  className = '', 
  ...props 
}: ButtonProps) => {
  // Mapping variants to website-consistent color tokens
  const variants = {
    // Primary is now the secondary orange color from the website (CTA color)
    primary: 'bg-secondary-500 text-white shadow-lg shadow-secondary-500/20 hover:bg-secondary-600',
    // Secondary is the brand blue
    secondary: 'bg-primary-500 text-white shadow-lg shadow-primary-500/20 hover:bg-primary-600',
    // Outline matches the website's ghost button style
    outline: 'bg-transparent border border-primary-100 text-primary-900 hover:bg-primary-50 hover:border-primary-200'
  }

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      disabled={isLoading || props.disabled}
      className={`
        ${fullWidth ? 'w-full' : ''} py-4 px-8 rounded-full font-bold text-base transition-all duration-200 flex items-center justify-center gap-2
        ${variants[variant]}
        ${(isLoading || props.disabled) ? 'opacity-60 cursor-not-allowed grayscale-[0.5]' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="size-5 animate-spin" />
          {loadingText && <span>{loadingText}</span>}
        </>
      ) : (
        children
      )}
    </motion.button>
  )
}

export default Button
