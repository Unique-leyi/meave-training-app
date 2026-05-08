import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import AuthInput from '../../ui/components/AuthInput'
import Button from '../../ui/components/Button'
import SocialButton from '../../ui/components/SocialButton'
import { useAuth } from '../../context/AuthContext'

const Signin = () => {
  const navigate = useNavigate()
  const { setIsAuthenticated } = useAuth()
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: any) => {
    console.log('Signin Data:', data)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsAuthenticated(true)
    navigate('/onboarding')
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-slate-900 mb-2">Welcome Back!</h2>
        <p className="text-slate-500 font-inter text-lg">Log in to continue your academic success journey.</p>
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

        <AuthInput
          label="Password"
          type="password"
          placeholder="Input your password"
          error={errors.password?.message}
          {...register('password', { required: 'Password is required' })}
        />

        <div className="text-right">
          <Link 
            to="/forgot-password"
            className="text-sm font-bold text-slate-400 hover:text-primary-600 transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        <Button 
          type="submit" 
          isLoading={isSubmitting}
          loadingText="Logging in..."
        >
          Login
        </Button>

        {/* <div className="relative my-10">
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

        <div className="mt-10 text-center font-inter">
          <p className="text-slate-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-slate-900 font-bold hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Signin