import { ButtonHTMLAttributes } from 'react'

interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string
  label: string
}

const SocialButton = ({ icon, label, ...props }: SocialButtonProps) => {
  return (
    <button
      type="button"
      className="w-full flex items-center justify-center gap-3 py-4 px-6 border border-slate-200 rounded-full font-bold text-slate-700 hover:bg-slate-50 transition-all active:scale-[0.98]"
      {...props}
    >
      <img src={icon} alt={label} className="size-5" />
      <span>{label}</span>
    </button>
  )
}

export default SocialButton
