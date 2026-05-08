import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AuthSidebarProps {
  title: string
  subtitle: string
}

const ROTATING_TITLES = [
  "Personalised Tutoring.",
  "Empowering Students.",
  "Unlock Potential.",
  "Digital Skills."
]

const AuthSidebar = ({ subtitle }: { subtitle: string }) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROTATING_TITLES.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="max-w-2xl">
      <div className="min-h-[220px] flex flex-col justify-end">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Reduced font size for better alignment as per screenshot */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-8">
              {ROTATING_TITLES[index].split('.').map((part, i) => (
                <span key={i} className="block">{part.trim()}</span>
              ))}
            </h2>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Subtext - Slightly muted and medium sized */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-lg text-white/60 font-inter leading-relaxed max-w-md mb-10"
      >
        {subtitle}
      </motion.p>

      {/* Indicators at the very bottom */}
      <div className="flex gap-2 items-center">
        {ROTATING_TITLES.map((_, i) => (
          <div 
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${i === index ? 'w-8 bg-secondary-500' : 'w-2 bg-white/20'}`} 
          />
        ))}
      </div>
    </div>
  )
}

export default AuthSidebar
