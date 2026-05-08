import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import AuthInput from '../../ui/components/AuthInput'
import Button from '../../ui/components/Button'
import SocialButton from '../../ui/components/SocialButton'

const Signup = () => {
  const navigate = useNavigate()
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors, isSubmitting } 
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
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
    // Final check before submission
    const isValid = requirements.every(req => req.test(data.password))
    if (!isValid) return
    
    console.log('Signup Data:', data)
    await new Promise(resolve => setTimeout(resolve, 2000))
    navigate('/verify-email')
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-slate-900 mb-2">Get Started!</h2>
        <p className="text-slate-500 font-inter text-lg">Join Meave Training and start your academic success journey.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AuthInput
          label="Email"
          type="email"
          placeholder="Input your email"
          error={errors.email?.message}
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
        />

        <div>
          <AuthInput
            label="Password"
            type="password"
            placeholder="Input your password"
            error={errors.password?.message}
            {...register('password', { required: 'Password is required' })}
          />
          
          {/* Password Requirements Checklist */}
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
        </div>

        <Button 
          type="submit" 
          isLoading={isSubmitting}
          loadingText="Creating Account..."
          disabled={!requirements.every(req => req.test(password))}
        >
          Create Account
        </Button>

        {/* <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">Or continue with</span>
          </div>
        </div>

        <SocialButton 
          label="Continue with Google" 
          icon="https://www.svgrepo.com/show/475656/google-color.svg" 
        /> */}

        <div className="mt-8 text-center font-inter">
          <p className="text-slate-500">
            Already have an account?{' '}
            <Link to="/signin" className="text-slate-900 font-bold hover:underline">
              Sign In here
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Signup