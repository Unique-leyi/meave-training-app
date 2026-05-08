import { useRef, useState, KeyboardEvent, ChangeEvent } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface OtpInputProps {
  length?: number
  onComplete: (code: string) => void
}

const OtpInput = ({ length = 5, onComplete }: OtpInputProps) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''))
  const [showOtp, setShowOtp] = useState(false)
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return

    const newOtp = [...otp]
    // Get only the last character entered
    const val = value.slice(-1)
    newOtp[index] = val
    setOtp(newOtp)

    // Move to next input if value is entered
    if (val && index < length - 1) {
      inputs.current[index + 1]?.focus()
    }

    // Check if complete
    const combinedOtp = newOtp.join('')
    if (combinedOtp.length === length) {
      onComplete(combinedOtp)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // If current is empty, move back and delete previous
        const newOtp = [...otp]
        newOtp[index - 1] = ''
        setOtp(newOtp)
        inputs.current[index - 1]?.focus()
      } else {
        // Just delete current
        const newOtp = [...otp]
        newOtp[index] = ''
        setOtp(newOtp)
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const data = e.clipboardData.getData('text').slice(0, length)
    if (!/^\d+$/.test(data)) return

    const newOtp = data.split('')
    setOtp([...newOtp, ...new Array(length - newOtp.length).fill('')])
    
    // Focus the last input or the next empty one
    const nextIndex = Math.min(data.length, length - 1)
    inputs.current[nextIndex]?.focus()

    if (data.length === length) {
      onComplete(data)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between gap-2 md:gap-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            type={showOtp ? 'text' : 'password'}
            value={digit}
            ref={(el) => { inputs.current[index] = el }}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className="size-12 md:size-16 text-center text-2xl font-bold bg-slate-50 border border-slate-200 rounded-2xl focus:border-secondary-500 focus:ring-4 focus:ring-secondary-500/10 outline-none transition-all placeholder:text-slate-200"
            placeholder="0"
          />
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setShowOtp(!showOtp)}
          className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors"
        >
          {showOtp ? (
            <><EyeOff className="size-4" /> Hide Code</>
          ) : (
            <><Eye className="size-4" /> Show Code</>
          )}
        </button>
      </div>
    </div>
  )
}

export default OtpInput
