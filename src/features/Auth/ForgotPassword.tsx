import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import AuthInput from '../../ui/components/AuthInput'
import Button from '../../ui/components/Button'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm({
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = async (data: any) => {
    console.log('Forgot Password Request:', data)
    await new Promise(resolve => setTimeout(resolve, 2000))
    navigate('/verify-otp')
  }

  return (
    <div className="w-full">
      <div className="mb-10 text-center lg:text-left">
        <h2 className="text-3xl font-bold text-primary-900 mb-3">Forgot password?</h2>
        <p className="text-muted font-inter">No worries! Enter your email and we'll send you reset instructions.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AuthInput
          label="Email address"
          type="email"
          placeholder="alex@example.com"
          error={errors.email?.message}
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
        />

        <Button 
          type="submit" 
          isLoading={isSubmitting}
          loadingText="Sending..."
        >
          Send Reset Link
        </Button>

        <div className="mt-8 text-center">
          <Link 
            to="/signin" 
            className="inline-flex items-center gap-2 text-primary-600 font-bold hover:gap-3 transition-all"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword