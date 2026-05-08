import { LucideIcon } from 'lucide-react'

interface IllustrationProps {
  className?: string
}

export const SuccessIllustration = ({ className = '' }: IllustrationProps) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="100" cy="100" r="80" fill="#ecfdf5" />
    <path d="M100 20C55.8172 20 20 55.8172 20 100C20 144.183 55.8172 180 100 180C144.183 180 180 144.183 180 100C180 55.8172 144.183 20 100 20ZM100 170C61.3401 170 30 138.66 30 100C30 61.3401 61.3401 30 100 30C138.66 30 170 61.3401 170 100C170 138.66 138.66 170 100 170Z" fill="#10b981" fillOpacity="0.2" />
    <circle cx="100" cy="100" r="50" fill="#10b981" fillOpacity="0.1" />
    <path d="M75 100L92 117L125 84" stroke="#10b981" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="45" cy="55" r="5" fill="#34d399" />
    <circle cx="155" cy="145" r="8" fill="#34d399" />
    <circle cx="160" cy="60" r="4" fill="#34d399" />
  </svg>
)

export const RocketIllustration = ({ className = '' }: IllustrationProps) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="100" cy="100" r="80" fill="#f0f9ff" />
    <path d="M135 65C135 65 115 45 100 45C85 45 65 65 65 65L65 115C65 115 65 135 100 135C135 135 135 115 135 115L135 65Z" fill="#0f172a" />
    <path d="M100 135V155M85 135V145M115 135V145" stroke="#f27b21" strokeWidth="6" strokeLinecap="round" />
    <circle cx="100" cy="85" r="10" fill="#38bdf8" />
    <path d="M65 95C55 105 55 125 55 125L65 125" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" />
    <path d="M135 95C145 105 145 125 145 125L135 125" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" />
  </svg>
)

export const SearchIllustration = ({ className = '' }: IllustrationProps) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="40" y="40" width="120" height="120" rx="30" fill="#f8fafc" />
    <circle cx="90" cy="90" r="30" stroke="#0f172a" strokeWidth="10" />
    <path d="M112 112L140 140" stroke="#0f172a" strokeWidth="10" strokeLinecap="round" />
    <path d="M60 140H100" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
    <path d="M60 150H80" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
  </svg>
)

export const LearningIllustration = ({ className = '' }: IllustrationProps) => (
  <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="20" y="20" width="200" height="160" rx="30" fill="#fafafa" stroke="#f1f5f9" strokeWidth="2" />
    <rect x="50" y="50" width="40" height="40" rx="12" fill="#dbeafe" />
    <rect x="50" y="110" width="40" height="40" rx="12" fill="#dcfce7" />
    <rect x="110" y="50" width="80" height="12" rx="6" fill="#e2e8f0" />
    <rect x="110" y="70" width="50" height="12" rx="6" fill="#e2e8f0" />
    <rect x="110" y="110" width="80" height="12" rx="6" fill="#e2e8f0" />
    <rect x="110" y="130" width="50" height="12" rx="6" fill="#e2e8f0" />
    <circle cx="190" cy="160" r="25" fill="#fef3c7" />
    <path d="M185 160L190 165L200 155" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
export const VisualIllustration = ({ className = '' }: IllustrationProps) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="15" y="25" width="70" height="50" rx="12" fill="#dbeafe" />
    <circle cx="40" cy="45" r="8" fill="#3b82f6" />
    <path d="M25 65L45 45L60 60L75 45" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const PracticalIllustration = ({ className = '' }: IllustrationProps) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="35" fill="#fef3c7" />
    <path d="M40 40L60 60M60 40L40 60" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
    <path d="M30 30L35 35M65 65L70 70M65 30L60 35M35 65L30 70" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
  </svg>
)

export const StepIllustration = ({ className = '' }: IllustrationProps) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M20 70H40V50H60V30H80" stroke="#10b981" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="20" cy="70" r="5" fill="#10b981" />
    <circle cx="40" cy="50" r="5" fill="#10b981" />
    <circle cx="60" cy="30" r="5" fill="#10b981" />
  </svg>
)

export const InteractiveIllustration = ({ className = '' }: IllustrationProps) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="35" cy="50" r="20" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2" />
    <circle cx="65" cy="50" r="20" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4 4" />
    <path d="M45 50H55" stroke="#8b5cf6" strokeWidth="4" strokeLinecap="round" />
  </svg>
)

export const WalletIllustration = ({ className = '' }: IllustrationProps) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="100" cy="100" r="80" fill="currentColor" fillOpacity="0.1" />
    <rect x="50" y="70" width="100" height="70" rx="15" fill="currentColor" />
    <path d="M150 95H135C129.477 95 125 99.4772 125 105C125 110.523 129.477 115 135 115H150" stroke="white" strokeWidth="6" strokeLinecap="round" />
    <circle cx="135" cy="105" r="4" fill="white" />
    <path d="M70 55C70 55 90 40 110 40C130 40 150 55 150 55" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
  </svg>
)
