import { motion } from 'framer-motion'

const SpinnerOverlay = () => {
  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-white/20 backdrop-blur-md"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="relative flex items-center justify-center">
        {/* Animated Spinner Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="size-32 rounded-full border-[3px] border-primary-100 border-t-secondary-500 md:size-40"
        />

        {/* Pulsing Logo in Center */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.5,
            ease: "easeInOut",
          }}
          className="absolute inset-0 flex items-center justify-center p-6 md:p-8"
        >
          <img
            src="/logo.png"
            alt="Meave Training"
            className="h-auto w-24 object-contain md:w-32"
          />
        </motion.div>

        {/* Loading text below */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-500">
            Preparing your experience
          </span>
        </div>
      </div>
    </div>
  )
}

export default SpinnerOverlay
