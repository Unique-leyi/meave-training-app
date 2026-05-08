import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { Check, Lock } from 'lucide-react'
import AuthInput from '../../ui/components/AuthInput'
import Button from '../../ui/components/Button'

const ResetPassword = () => {
  const navigate = useNavigate()
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors, isSubmitting } 
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })

  const password = watch('password', '')

  const requirements = [
    { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
    { label: 'At least one uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
    { label: 'At least one lowercase letter', test: (p: string) => /[a-z]/.test(p) },
    { label: 'At least one number', test: (p: string) => /[0-9]/.test(p) },
    { label: 'At least one special character', test: (p: string) => /[^A-Za-z0-9]/.test(p) }
  ]

  const onSubmit = async (data: any) => {
    if (data.password !== data.confirmPassword) return
    const isValid = requirements.every(req => req.test(data.password))
    if (!isValid) return

    console.log('Reset Password Data:', data)
    await new Promise(resolve => setTimeout(resolve, 2000))
    navigate('/signin')
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <div className="size-16 bg-primary-50 rounded-3xl flex items-center justify-center mb-6 border border-primary-100">
          <Lock className="size-8 text-primary-600" />
        </div>
        <h2 className="text-4xl font-bold text-slate-900 mb-2">Set new password</h2>
        <p className="text-slate-500 font-inter text-lg">Your new password must be different from previously used passwords.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AuthInput
          label="New Password"
          type="password"
          placeholder="Input your new password"
          error={errors.password?.message}
          {...register('password', { required: 'Password is required' })}
        />

        <AuthInput
          label="Confirm Password"
          type="password"
          placeholder="Confirm your new password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', { 
            required: 'Please confirm your password',
            validate: (val: string) => {
              if (watch('password') !== val) {
                return "Your passwords do not match";
              }
            }
          })}
        />

        <div className="mt-5 space-y-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Password Requirements</p>
          {requirements.map((req, index) => {
            const isMet = req.test(password)
            return (
              <div key={index} className="flex items-center gap-3">
                <div className={`
                  size-5 rounded-full flex items-center justify-center transition-colors border
                  ${isMet ? 'bg-success border-success' : 'bg-white border-slate-200'}
                `}>
                  <Check className={`size-3 text-white transition-opacity ${isMet ? 'opacity-100' : 'opacity-0'}`} strokeWidth={4} />
                </div>
                <span className={`text-sm font-medium transition-colors ${isMet ? 'text-slate-900' : 'text-slate-400'}`}>
                  {req.label}
                </span>
              </div>
            )
          })}
        </div>

        <Button 
          type="submit" 
          isLoading={isSubmitting}
          loadingText="Resetting..."
          disabled={!requirements.every(req => req.test(password)) || watch('password') !== watch('confirmPassword')}
        >
          Reset Password
        </Button>
      </form>
    </div>
  )
}

export default ResetPassword
