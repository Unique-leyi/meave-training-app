import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Timer, ArrowRight, Loader2 } from 'lucide-react'
import OtpInput from '../../ui/components/OtpInput'
import Button from '../../ui/components/Button'

const VerifyOtp = () => {
  const navigate = useNavigate()
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds
  const [isResending, setIsResending] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [otpValue, setOtpValue] = useState('')

  useEffect(() => {
    if (timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleResend = async () => {
    setIsResending(true)
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setTimeLeft(600)
    setIsResending(false)
  }

  const handleVerify = async () => {
    setIsVerifying(true)
    console.log('Verifying OTP:', otpValue)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsVerifying(false)
    navigate('/reset-password')
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-slate-900 mb-2">Verify Code</h2>
        <p className="text-slate-500 font-inter text-lg">We've sent a 5-digit verification code to your device.</p>
      </div>

      <div className="space-y-8">
        <div className="py-4">
          <OtpInput length={5} onComplete={setOtpValue} />
        </div>

        <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-2 text-slate-600 font-bold">
            <Timer className="size-5 text-secondary-500" />
            <span>Code expires in:</span>
          </div>
          <span className="text-xl font-black text-slate-900 tabular-nums">
            {formatTime(timeLeft)}
          </span>
        </div>

        <Button 
          onClick={handleVerify} 
          isLoading={isVerifying}
          loadingText="Verifying..."
          disabled={otpValue.length < 5}
        >
          Verify & Continue
        </Button>

        <div className="text-center font-inter pt-4">
          <p className="text-slate-500">
            Didn't receive the code?{' '}
            <button 
              onClick={handleResend}
              disabled={isResending || timeLeft > 0}
              className={`font-bold transition-colors inline-flex items-center gap-2 ${timeLeft > 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-900 hover:underline'}`}
            >
              {isResending && <Loader2 className="size-3 animate-spin" />}
              {isResending ? 'Sending...' : 'Resend Code'}
            </button>
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link to="/signin" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors">
            Back to Sign In
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VerifyOtp