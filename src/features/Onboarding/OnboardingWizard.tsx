import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronRight, 
  ChevronLeft, 
  User, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  Sparkles,
  Search,
  School,
  Brain,
  Clock,
  Briefcase,
  FileText,
  Upload,
  ArrowRight,
  Save,
  TrendingUp,
  Plus
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import DashboardCard from '../../ui/components/DashboardCard'
import Button from '../../ui/components/Button'
import StatusModal from '../../ui/components/StatusModal'
import { useAuth } from '../../context/AuthContext'

const OnboardingWizard = () => {
  const navigate = useNavigate()
  const { setRole, setIsAuthenticated } = useAuth()
  const [step, setStep] = useState(1)
  const [userType, setUserType] = useState<'student' | 'tutor' | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'success' | 'error';
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: 'success',
    title: '',
    message: ''
  })

  const {
    register,
    trigger,
    setError,
    formState: { errors },
    setValue,
    watch,
    handleSubmit
  } = useForm({
    mode: 'onChange'
  })
  
  const handleNext = async () => {
    // Determine which fields to validate based on current step
    let fieldsToValidate: any[] = []
    
    if (step === 1 && !userType) return

    if (step === 2) {
      if (userType === 'student') fieldsToValidate = ['studentName', 'age', 'academicLevel']
      if (userType === 'tutor') fieldsToValidate = ['fullName', 'phone', 'experience']
    }
    
    if (step === 3 && userType === 'tutor') {
      fieldsToValidate = ['bio']
    }

    if (step === 4 && userType === 'tutor') {
      const data = watch()
      if (!data.cv) setError('cv', { message: 'CV is required' })
      if (!data.dbs) setError('dbs', { message: 'DBS is required' })
      if (!data.degree) setError('degree', { message: 'Degree is required' })
      
      const hasAvailability = data.availability && Object.values(data.availability).some((slots: any) => slots.length > 0)
      if (!hasAvailability) {
        alert("Please select at least one availability slot")
        return
      }

      if (!data.cv || !data.dbs || !data.degree) return
    }
    
    if (fieldsToValidate.length > 0) {
      const isValid = await trigger(fieldsToValidate)
      if (!isValid) return
    }

    setStep(prev => Math.min(5, prev + 1))
  }

  const handleComplete = async () => {
    setIsSubmitting(true)
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsSubmitting(false)
    
    // Set role in context for the dashboard
    if (userType) {
      setRole(userType)
      setIsAuthenticated(true)
    }

    setModalState({
      isOpen: true,
      type: 'success',
      title: 'Congratulations!',
      message: `Your onboarding is complete. You are now ready to start your journey as a ${userType === 'student' ? 'Student' : 'Tutor'} on Meave Training.`
    })
  }

  const handleBack = () => setStep(prev => Math.max(1, prev - 1))

  const steps = {
    student: [
      { id: 1, title: 'Welcome', desc: 'Get started' },
      { id: 2, title: 'Education', desc: 'Your level' },
      { id: 3, title: 'Support', desc: 'Learning needs' },
      { id: 4, title: 'Schedule', desc: 'Availability' },
      { id: 5, title: 'Complete', desc: 'Ready to learn' },
    ],
    tutor: [
      { id: 1, title: 'Welcome', desc: 'Get started' },
      { id: 2, title: 'Professional', desc: 'Your profile' },
      { id: 3, title: 'Experience', desc: 'Specialisation' },
      { id: 4, title: 'Documents', desc: 'Verification' },
      { id: 5, title: 'Submit', desc: 'Review application' },
    ]
  }

  const currentSteps = userType ? steps[userType] : steps.student

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:flex w-96 bg-white border-r border-slate-100 flex-col p-12">
        <div className="mb-12">
          <img src="/logo.png" alt="Meave" className="h-10 mb-8" />
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Onboarding</h2>
          <p className="text-sm font-bold text-slate-400 mt-2">Complete these 5 simple steps to get started.</p>
        </div>

        <nav className="space-y-8 flex-1">
          {currentSteps.map((s, i) => {
            const isActive = step === s.id
            const isCompleted = step > s.id
            return (
              <div key={s.id} className="flex items-center gap-5 group cursor-pointer" onClick={() => step > s.id && setStep(s.id)}>
                <div className={`
                  size-10 rounded-full flex items-center justify-center font-black text-xs transition-all
                  ${isActive ? 'bg-secondary-500 text-white shadow-xl shadow-secondary-500/20 scale-110' : 
                    isCompleted ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}
                `}>
                  {isCompleted ? <CheckCircle2 className="size-5" /> : s.id}
                </div>
                <div>
                  <h4 className={`text-sm font-black transition-colors ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>{s.title}</h4>
                  <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{s.desc}</p>
                </div>
              </div>
            )
          })}
        </nav>

        <div className="mt-auto">
          <p className="text-[11px] font-bold text-slate-400">© 2026 Meave Training Platform</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col max-h-screen overflow-y-auto">
        {/* Mobile Progress Header */}
        <div className="lg:hidden bg-white border-b border-slate-100 p-6 flex items-center justify-between sticky top-0 z-50">
          <img src="/logo.png" alt="Meave" className="h-8" />
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Step {step}/5</span>
            <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-secondary-500 transition-all duration-500" style={{ width: `${(step/5)*100}%` }} />
            </div>
          </div>
        </div>

        <main className="flex-1 p-6 md:p-12 lg:p-20 max-w-5xl mx-auto w-full">
          {/* Progress Bar - Desktop */}
          <div className="hidden lg:block w-48 h-1 bg-slate-100 rounded-full mb-10 overflow-hidden">
            <div className="h-full bg-secondary-500 transition-all duration-500" style={{ width: `${(step/5)*100}%` }} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              {step === 1 && <Step1 userType={userType} setUserType={setUserType} />}
              {step === 2 && userType === 'student' && <StudentStep2 register={register} errors={errors} setValue={setValue} watch={watch} />}
              {step === 2 && userType === 'tutor' && <TutorStep2 register={register} errors={errors} setValue={setValue} watch={watch} />}
              {step === 3 && userType === 'student' && <StudentStep3 register={register} errors={errors} setValue={setValue} watch={watch} />}
              {step === 3 && userType === 'tutor' && <TutorStep3 register={register} errors={errors} setValue={setValue} watch={watch} />}
              {step === 4 && userType === 'student' && <StudentStep4 register={register} errors={errors} setValue={setValue} watch={watch} />}
              {step === 4 && userType === 'tutor' && <TutorStep4 register={register} errors={errors} setValue={setValue} watch={watch} />}
              {step === 5 && userType === 'student' && <StudentStep5 watch={watch} />}
              {step === 5 && userType === 'tutor' && <TutorStep5 watch={watch} />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer Actions */}
        <footer className="bg-white border-t border-slate-100 p-6 md:px-12 lg:px-20 flex items-center justify-between sticky bottom-0 z-50">
          <Button 
            onClick={handleBack}
            disabled={step === 1 || isSubmitting}
            variant="outline"
            className={`
              !w-auto h-12 px-8 flex items-center gap-2
              ${step === 1 ? 'opacity-0 pointer-events-none' : ''}
            `}
          >
            <ChevronLeft className="size-4" />
            Previous
          </Button>
          
          <Button 
            onClick={() => {
              if (step === 1 && !userType) return
              if (step === 5) {
                handleComplete()
              } else {
                handleNext()
              }
            }}
            isLoading={isSubmitting}
            loadingText={step === 5 ? "Submitting..." : "Continuing..."}
            className="!w-auto h-12 px-10 flex items-center gap-2"
          >
            {step === 5 ? 'Complete Setup' : 'Continue'}
            <ChevronRight className="size-4" />
          </Button>
        </footer>

        <StatusModal 
          {...modalState} 
          onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))}
          actionLabel="Go to Dashboard"
          onAction={() => navigate('/dashboard')}
        />
      </div>
    </div>
  )
}

// STEP 1 - WELCOME
const Step1 = ({ userType, setUserType }: any) => (
  <div className="space-y-10">
    <div>
      <h3 className="text-[11px] font-black text-primary-600 uppercase tracking-[0.2em] mb-3">Step 1/5</h3>
      <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-4">Welcome to Meave Training</h1>
      <p className="text-slate-500 font-medium max-w-lg leading-relaxed">
        Let’s personalise your experience and help you get the best learning support possible.
      </p>
    </div>

    <div className="space-y-6">
      <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">How will you be using Meave Training?</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { id: 'student', title: 'Student / Parent', desc: 'Book lessons, track progress, and receive personalised learning support.', icon: Brain },
          { id: 'tutor', title: 'Tutor', desc: 'Teach students, manage sessions, and grow your tutoring profile.', icon: Briefcase }
        ].map(item => (
          <div 
            key={item.id}
            onClick={() => setUserType(item.id)}
            className={`
              p-8 rounded-[2rem] border-2 cursor-pointer transition-all relative group
              ${userType === item.id ? 'border-primary-600 bg-primary-50/30' : 'border-slate-100 bg-white hover:border-primary-100 hover:bg-slate-50/50'}
            `}
          >
            <div className={`
              size-14 rounded-2xl flex items-center justify-center mb-6 transition-all
              ${userType === item.id ? 'bg-primary-600 text-white shadow-xl shadow-primary-600/20' : 'bg-slate-50 text-slate-400 group-hover:bg-white group-hover:text-primary-600'}
            `}>
              <item.icon className="size-7" />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2">{item.title}</h3>
            <p className="text-xs font-bold text-slate-400 leading-relaxed">{item.desc}</p>
            {userType === item.id && (
              <div className="absolute top-6 right-6 size-6 bg-primary-600 rounded-full flex items-center justify-center text-white">
                <CheckCircle2 className="size-4" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

    <DashboardCard className="p-6 bg-blue-50/50 border-blue-100/50 flex gap-4 items-start max-w-2xl">
      <div className="size-10 bg-blue-500 text-white rounded-xl flex items-center justify-center shrink-0">
        <Sparkles className="size-5" />
      </div>
      <div>
        <h5 className="text-sm font-black text-blue-900 mb-1">Quick Tip:</h5>
        <p className="text-xs font-bold text-blue-800/70 leading-relaxed">
          Choosing the right user type helps us show you relevant features and recommended tutors from the very first click.
        </p>
      </div>
    </DashboardCard>
  </div>
)

const SUBJECTS = [
  "Mathematics", "English Literature", "English Language", "Chemistry", "Biology", 
  "Physics", "Computer Science", "Economics", "Business Studies", "History", 
  "Geography", "Psychology", "Sociology", "Law", "Philosophy", 
  "French", "Spanish", "German", "Mandarin", "Further Mathematics"
]

const FileUploader = ({ label, desc, icon: Icon, value, onChange, error }: any) => {
  const [isDragging, setIsDragging] = useState(false)

  const handleFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit")
      return
    }
    onChange(file)
  }

  return (
    <div className="space-y-3">
      <label className="meave-label">{label}</label>
      <div 
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          const file = e.dataTransfer.files[0]
          if (file) handleFile(file)
        }}
        onClick={() => {
          const input = document.createElement('input')
          input.type = 'file'
          input.onchange = (e: any) => {
            const file = e.target.files[0]
            if (file) handleFile(file)
          }
          input.click()
        }}
        className={`
          p-6 bg-white border-2 border-dashed rounded-[2.5rem] transition-all cursor-pointer group flex items-center gap-5
          ${isDragging ? 'border-secondary-500 bg-secondary-50/50 scale-[1.02]' : 'border-slate-100 hover:border-secondary-500'}
          ${error ? 'border-destructive bg-destructive/5' : ''}
          ${value ? 'border-emerald-500 bg-emerald-50/30' : ''}
        `}
      >
        <div className={`
          size-14 rounded-2xl flex items-center justify-center transition-all
          ${value ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-300 group-hover:bg-secondary-50 group-hover:text-secondary-500'}
        `}>
          {value ? <CheckCircle2 className="size-7" /> : <Icon className="size-7" />}
        </div>
        <div className="flex-1">
          <p className="text-sm font-black text-slate-900 mb-1">{value ? value.name : `Click to upload ${label.toLowerCase()}`}</p>
          <p className="text-xs font-bold text-slate-400">{value ? `${(value.size / 1024 / 1024).toFixed(2)} MB` : desc}</p>
        </div>
        {value && (
          <button 
            type="button"
            onClick={(e) => { e.stopPropagation(); onChange(null) }}
            className="text-[10px] font-black text-red-500 hover:underline"
          >
            Remove
          </button>
        )}
      </div>
      {error && <p className="mt-1.5 text-[10px] font-bold text-destructive ml-1">{error}</p>}
    </div>
  )
}

// STEP 2 - STUDENT & EDUCATION DETAILS
const StudentStep2 = ({ register, errors, setValue, watch }: any) => {
  const whoIsThisFor = watch('whoIsThisFor') || 'myself'
  const curriculumType = watch('curriculumType') || 'UK Curriculum'

  return (
    <div className="space-y-10">
      <div>
        <h3 className="text-[11px] font-black text-secondary-500 uppercase tracking-[0.2em] mb-3">Step 2/5</h3>
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-4">Student & Education Details</h1>
        <p className="text-slate-500 font-medium max-w-lg leading-relaxed">Let's understand the learner identity & academic level.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
         <div className="space-y-3">
            <label className="meave-label">Who is this for?</label>
            <div className="grid grid-cols-2 gap-3">
               <button 
                 type="button"
                 onClick={() => setValue('whoIsThisFor', 'myself')}
                 className={`h-14 border-2 rounded-2xl text-xs font-black transition-all ${whoIsThisFor === 'myself' ? 'bg-secondary-50 border-secondary-500 text-secondary-500 shadow-lg shadow-secondary-500/10' : 'bg-white border-slate-100 text-slate-400 hover:border-secondary-100 hover:text-secondary-500'}`}
               >
                 Myself
               </button>
               <button 
                 type="button"
                 onClick={() => setValue('whoIsThisFor', 'child')}
                 className={`h-14 border-2 rounded-2xl text-xs font-black transition-all ${whoIsThisFor === 'child' ? 'bg-secondary-50 border-secondary-500 text-secondary-500 shadow-lg shadow-secondary-500/10' : 'bg-white border-slate-100 text-slate-400 hover:border-secondary-100 hover:text-secondary-500'}`}
               >
                 My child
               </button>
            </div>
         </div>

         <div className="space-y-3">
            <label className="meave-label">Student First Name</label>
            <input 
              {...register('studentName', { required: 'Student name is required' })}
              type="text" 
              placeholder="e.g. Sarah" 
              className={`meave-input ${errors.studentName ? 'border-destructive bg-destructive/5' : ''}`}
            />
            {errors.studentName && <p className="mt-1.5 text-[10px] font-bold text-destructive ml-1">{errors.studentName.message}</p>}
         </div>

         <div className="space-y-3">
            <label className="meave-label">Student Age</label>
            <input 
              {...register('age', { required: 'Age is required', min: { value: 4, message: 'Minimum age is 4' } })}
              type="number" 
              placeholder="e.g. 16" 
              className={`meave-input ${errors.age ? 'border-destructive bg-destructive/5' : ''}`}
            />
            {errors.age && <p className="mt-1.5 text-[10px] font-bold text-destructive ml-1">{errors.age.message}</p>}
         </div>

         <div className="space-y-3">
            <label className="meave-label">Academic Level</label>
            <select 
              {...register('academicLevel', { required: 'Please select an academic level' })}
              className={`meave-input appearance-none ${errors.academicLevel ? 'border-destructive bg-destructive/5' : ''}`}
            >
               <option value="">Select level...</option>
               <option value="year5">Year 5</option>
               <option value="gcse">GCSE</option>
               <option value="alevel">A-Level</option>
               <option value="university">University</option>
            </select>
            {errors.academicLevel && <p className="mt-1.5 text-[10px] font-bold text-destructive ml-1">{errors.academicLevel.message}</p>}
         </div>

         <div className="space-y-3">
            <label className="meave-label">Curriculum Type</label>
            <div className="flex flex-wrap gap-2">
               {['UK Curriculum', 'IB', 'Other'].map(c => (
                 <button 
                    key={c} 
                    type="button"
                    onClick={() => setValue('curriculumType', c)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition-all ${curriculumType === c ? 'bg-secondary-50 border-secondary-500 text-secondary-500 shadow-sm' : 'bg-white border-slate-100 text-slate-500 hover:border-secondary-500 hover:text-secondary-500'}`}
                 >
                   {c}
                 </button>
               ))}
            </div>
         </div>

         <div className="space-y-3 md:col-span-1">
            <label className="meave-label">School Name (Optional)</label>
            <div className="relative group">
              <School className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input 
                {...register('schoolName')}
                type="text" 
                placeholder="Search school..." 
                className="meave-input pl-12" 
              />
            </div>
         </div>
      </div>
    </div>
  )
}

// STEP 3 - LEARNING NEEDS & SUPPORT
const StudentStep3 = ({ register, errors, setValue, watch }: any) => {
  const subjects = watch('subjects') || ['Mathematics', 'Chemistry']
  const learningGoals = watch('learningGoals') || []
  const learningStyle = watch('learningStyle') || 'Visual'
  const supportNeeds = watch('supportNeeds') || 'None'
  const [searchTerm, setSearchTerm] = useState('')

  const filteredSubjects = SUBJECTS.filter(s => 
    s.toLowerCase().includes(searchTerm.toLowerCase()) && !subjects.includes(s)
  ).slice(0, 5)

  return (
    <div className="space-y-10">
      <div>
        <h3 className="text-[11px] font-black text-secondary-500 uppercase tracking-[0.2em] mb-3">Step 3/5</h3>
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-4">Learning Needs & Support</h1>
        <p className="text-slate-500 font-medium max-w-lg leading-relaxed">Understand WHY support is needed and HOW the student learns best.</p>
      </div>

      <div className="space-y-8 max-w-3xl">
         <div className="space-y-4">
            <label className="meave-label">Subjects needing support</label>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search subjects (e.g. Maths, Physics)..." 
                className="meave-input pl-12" 
              />
              {searchTerm && filteredSubjects.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white border border-slate-100 rounded-2xl mt-2 shadow-2xl z-50 overflow-hidden">
                   {filteredSubjects.map(s => (
                     <button 
                        key={s} 
                        type="button"
                        onClick={() => {
                          setValue('subjects', [...subjects, s])
                          setSearchTerm('')
                        }}
                        className="w-full p-4 text-left text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all border-b border-slate-50 last:border-0"
                     >
                       {s}
                     </button>
                   ))}
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
               {subjects.map((s: string) => (
                 <span key={s} className="px-5 py-2.5 bg-primary-950 text-white rounded-2xl text-[10px] font-black flex items-center gap-2 shadow-lg shadow-primary-950/20">
                    {s}
                    <button 
                      type="button" 
                      onClick={() => setValue('subjects', subjects.filter((item: string) => item !== s))}
                      className="hover:text-secondary-400 transition-colors"
                    >×</button>
                 </span>
               ))}
            </div>
         </div>

         <div className="space-y-4">
            <label className="meave-label">Main learning goals</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
               {[
                 { id: 'grades', label: 'Improve grades', icon: TrendingUp },
                 { id: 'exam', label: 'Exam preparation', icon: FileText },
                 { id: 'hw', label: 'Homework support', icon: BookOpen },
                 { id: 'conf', label: 'Confidence building', icon: Sparkles }
               ].map(goal => {
                 const isSelected = learningGoals.includes(goal.id)
                 return (
                   <button 
                     key={goal.id} 
                     type="button"
                     onClick={() => {
                        const newGoals = isSelected ? learningGoals.filter((g: any) => g !== goal.id) : [...learningGoals, goal.id]
                        setValue('learningGoals', newGoals)
                     }}
                     className={`h-16 px-6 border rounded-2xl flex items-center gap-4 text-xs font-black transition-all group ${isSelected ? 'border-secondary-500 bg-secondary-50 text-secondary-900 shadow-sm' : 'bg-white border-slate-100 text-slate-700 hover:border-secondary-500 hover:bg-secondary-50/30'}`}
                   >
                      <div className={`size-10 rounded-xl flex items-center justify-center transition-colors ${isSelected ? 'bg-white text-secondary-500' : 'bg-white border border-slate-100 text-slate-400 group-hover:text-secondary-500'}`}>
                        <goal.icon className="size-5" />
                      </div>
                      {goal.label}
                   </button>
                 )
               })}
            </div>
         </div>

         <div className="space-y-4">
            <label className="meave-label">Learning Style</label>
            <div className="flex flex-wrap gap-3">
               {['Visual', 'Interactive', 'Step-by-step', 'Practical'].map(style => (
                 <button 
                    key={style} 
                    type="button"
                    onClick={() => setValue('learningStyle', style)}
                    className={`px-8 py-3.5 border rounded-2xl text-xs font-black transition-all ${learningStyle === style ? 'bg-primary-950 border-primary-950 text-white shadow-xl shadow-primary-950/20' : 'bg-white border-slate-100 text-slate-600 hover:border-secondary-500 hover:text-secondary-500'}`}
                 >
                    {style} learner
                 </button>
               ))}
            </div>
         </div>

         <div className="space-y-4">
            <label className="meave-label">Additional Support Needs (Optional)</label>
            <div className="flex flex-wrap gap-3">
               {['ADHD', 'Dyslexia', 'Autism Spectrum', 'Anxiety', 'None'].map(need => (
                 <button 
                    key={need} 
                    type="button"
                    onClick={() => setValue('supportNeeds', need)}
                    className={`px-6 py-3 rounded-2xl text-[11px] font-black border transition-all ${supportNeeds === need ? 'bg-emerald-50 border-emerald-500 text-emerald-600 shadow-sm' : 'bg-white border-slate-100 text-slate-500 hover:border-secondary-500'}`}
                 >
                    {need}
                 </button>
               ))}
            </div>
         </div>
      </div>
    </div>
  )
}

// STEP 4 - SCHEDULE & PREFERENCES
const StudentStep4 = ({ register, setValue, watch }: any) => {
  const learningMode = watch('learningMode') || 'Online'
  const sessionFrequency = watch('sessionFrequency') || 'Once weekly'
  const tutorQualities = watch('tutorQualities') || []

  return (
    <div className="space-y-10">
      <div>
        <h3 className="text-[11px] font-black text-secondary-500 uppercase tracking-[0.2em] mb-3">Step 4/5</h3>
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-4">Schedule & Matching</h1>
        <p className="text-slate-500 font-medium max-w-lg leading-relaxed">Configure tutor compatibility and preferred learning times.</p>
      </div>

      <div className="space-y-8 max-w-3xl">
         <div className="space-y-4">
            <label className="meave-label">Preferred learning mode</label>
            <div className="grid grid-cols-3 gap-4">
               {['Online', 'In-person', 'Both'].map(mode => (
                 <button 
                    key={mode} 
                    type="button"
                    onClick={() => setValue('learningMode', mode)}
                    className={`h-20 rounded-[2rem] border-2 flex items-center justify-center text-xs font-black transition-all ${learningMode === mode ? 'border-secondary-500 bg-secondary-50 text-secondary-500 shadow-lg shadow-secondary-500/10' : 'bg-white border-slate-100 text-slate-400 hover:border-secondary-500 hover:text-secondary-500'}`}
                 >
                    {mode}
                 </button>
               ))}
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="meave-label">Preferred Days</label>
              <div className="grid grid-cols-4 gap-2">
                 {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                   <button key={day} type="button" className="size-12 rounded-2xl border border-slate-100 bg-white text-[10px] font-black text-slate-400 hover:border-secondary-500 hover:text-secondary-500 transition-all">{day}</button>
                 ))}
              </div>
            </div>
            <div className="space-y-4">
              <label className="meave-label">Session Frequency</label>
              <div className="space-y-2">
                 {['Once weekly', 'Twice weekly', 'Flexible'].map(freq => (
                   <button 
                      key={freq} 
                      type="button"
                      onClick={() => setValue('sessionFrequency', freq)}
                      className={`w-full h-12 px-6 border rounded-2xl text-xs font-black transition-all text-left ${sessionFrequency === freq ? 'bg-secondary-50 border-secondary-500 text-secondary-500' : 'bg-white border-slate-100 text-slate-600 hover:border-secondary-500'}`}
                   >
                      {freq}
                   </button>
                 ))}
              </div>
            </div>
         </div>

         <div className="space-y-4">
            <label className="meave-label">Preferred tutor qualities</label>
            <div className="flex flex-wrap gap-2">
               {['Patient', 'Exam specialist', 'Encouraging', 'Structured', 'Good with younger learners'].map(q => {
                 const isSelected = tutorQualities.includes(q)
                 return (
                   <button 
                      key={q} 
                      type="button"
                      onClick={() => {
                         const newQ = isSelected ? tutorQualities.filter((item: any) => item !== q) : [...tutorQualities, q]
                         setValue('tutorQualities', newQ)
                      }}
                      className={`px-6 py-3.5 border rounded-2xl text-xs font-black transition-all ${isSelected ? 'bg-primary-950 border-primary-950 text-white shadow-sm' : 'bg-white border-slate-100 text-slate-600 hover:border-secondary-500 hover:bg-secondary-50/30'}`}
                   >
                      {q}
                   </button>
                 )
               })}
            </div>
         </div>
      </div>
    </div>
  )
}

// STEP 5 - COMPLETE (STUDENT)
const StudentStep5 = ({ watch }: any) => {
  const data = watch()

  return (
    <div className="space-y-10 max-w-4xl mx-auto py-10">
      <div className="text-center mb-12">
        <div className="size-24 bg-emerald-100 text-emerald-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/20">
          <CheckCircle2 className="size-12" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-4">Your learning profile is ready</h1>
        <p className="text-slate-500 font-medium leading-relaxed max-w-lg mx-auto">
          We’ve compiled your preferences to help us match you with the perfect tutor. Review your profile before finishing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DashboardCard className="p-10 bg-slate-50 border border-slate-100 text-left rounded-[2.5rem] h-full">
           <h4 className="meave-label mb-8">Personal & Academic</h4>
           <div className="grid grid-cols-2 gap-y-8">
              <div>
                 <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">Student Name</p>
                 <p className="text-base font-black text-slate-900">{data.studentName || 'Not specified'}</p>
              </div>
              <div>
                 <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">Age</p>
                 <p className="text-base font-black text-slate-900">{data.age || 'Not specified'}</p>
              </div>
              <div>
                 <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">Academic Level</p>
                 <p className="text-base font-black text-slate-900 uppercase">{data.academicLevel || 'Not specified'}</p>
              </div>
              <div>
                 <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">Curriculum</p>
                 <p className="text-base font-black text-slate-900">{data.curriculumType || 'UK Curriculum'}</p>
              </div>
              <div className="col-span-2">
                 <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">Subjects</p>
                 <div className="flex flex-wrap gap-2 mt-2">
                   {(data.subjects || []).map((s: string) => (
                     <span key={s} className="px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-lg text-[10px] font-black">
                       {s}
                     </span>
                   ))}
                 </div>
              </div>
           </div>
        </DashboardCard>

        <DashboardCard className="p-10 bg-slate-50 border border-slate-100 text-left rounded-[2.5rem] h-full">
           <h4 className="meave-label mb-8">Preferences & Goals</h4>
           <div className="grid grid-cols-2 gap-y-8">
              <div>
                 <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">Learning Mode</p>
                 <p className="text-base font-black text-slate-900">{data.learningMode || 'Online'}</p>
              </div>
              <div>
                 <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">Frequency</p>
                 <p className="text-base font-black text-slate-900">{data.sessionFrequency || 'Once weekly'}</p>
              </div>
              <div>
                 <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">Learning Style</p>
                 <p className="text-base font-black text-slate-900">{data.learningStyle || 'Visual'}</p>
              </div>
              <div>
                 <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">Support Needs</p>
                 <p className="text-base font-black text-slate-900">{data.supportNeeds || 'None'}</p>
              </div>
              <div className="col-span-2">
                 <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">Tutor Qualities</p>
                 <div className="flex flex-wrap gap-2 mt-2">
                   {(data.tutorQualities || []).map((q: string) => (
                     <span key={q} className="px-3 py-1 bg-secondary-50 text-secondary-600 border border-secondary-100 rounded-lg text-[10px] font-black">
                       {q}
                     </span>
                   ))}
                 </div>
              </div>
           </div>
        </DashboardCard>
      </div>
    </div>
  )
}

// TUTOR STEPS
const TutorStep2 = ({ register, errors, watch, setValue }: any) => {
  const profilePhoto = watch('profilePhoto')

  return (
    <div className="space-y-10">
      <div>
        <h3 className="text-[11px] font-black text-secondary-500 uppercase tracking-[0.2em] mb-3">Step 2/5</h3>
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-4">Personal & Professional Details</h1>
        <p className="text-slate-500 font-medium max-w-lg leading-relaxed">Let's build your professional teaching profile.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
         <div className="space-y-3">
            <label className="meave-label">Full Name</label>
            <input 
              {...register('fullName', { required: 'Full name is required' })}
              type="text" 
              placeholder="e.g. Dr. Sarah Wilson" 
              className={`meave-input ${errors.fullName ? 'border-destructive bg-destructive/5' : ''}`} 
            />
            {errors.fullName && <p className="mt-1.5 text-[10px] font-bold text-destructive ml-1">{errors.fullName.message}</p>}
         </div>

         <div className="space-y-3">
            <label className="meave-label">Phone Number</label>
            <input 
              {...register('phone', { required: 'Phone is required' })}
              type="tel" 
              placeholder="e.g. +44 7000 000000" 
              className={`meave-input ${errors.phone ? 'border-destructive bg-destructive/5' : ''}`} 
            />
            {errors.phone && <p className="mt-1.5 text-[10px] font-bold text-destructive ml-1">{errors.phone.message}</p>}
         </div>

         <div className="space-y-3">
            <label className="meave-label">Years of Teaching Experience</label>
            <input 
              {...register('experience', { required: 'Experience is required' })}
              type="number" 
              placeholder="e.g. 8" 
              className={`meave-input ${errors.experience ? 'border-destructive bg-destructive/5' : ''}`} 
            />
            {errors.experience && <p className="mt-1.5 text-[10px] font-bold text-destructive ml-1">{errors.experience.message}</p>}
         </div>

         <div className="space-y-3">
            <label className="meave-label">Country</label>
            <select 
              {...register('country')}
              className="meave-input appearance-none"
            >
               <option>United Kingdom</option>
               <option>United States</option>
               <option>Canada</option>
            </select>
         </div>

         <div className="col-span-full">
            <FileUploader 
              label="Profile Photo"
              desc="Professional photos help build trust with students."
              icon={User}
              value={profilePhoto}
              onChange={(file: any) => setValue('profilePhoto', file)}
              error={errors.profilePhoto?.message}
            />
         </div>
      </div>
    </div>
  )
}

const TutorStep3 = ({ register, setValue, watch }: any) => {
  const teachingStyle = watch('teachingStyle') || 'Structured'
  const subjectsTaught = watch('subjectsTaught') || []
  const experienceAreas = watch('experienceAreas') || []
  const [searchTerm, setSearchTerm] = useState('')
  const [newArea, setNewArea] = useState('')

  const filteredSubjects = SUBJECTS.filter(s => 
    s.toLowerCase().includes(searchTerm.toLowerCase()) && !subjectsTaught.includes(s)
  ).slice(0, 5)

  const defaultExperienceAreas = [
    'GCSE Preparation', 'A-Level Support', 'ADHD Support', 'Confidence Building'
  ]
  
  return (
    <div className="space-y-10">
      <div>
        <h3 className="text-[11px] font-black text-secondary-500 uppercase tracking-[0.2em] mb-3">Step 3/5</h3>
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-4">Teaching Specialisation</h1>
        <p className="text-slate-500 font-medium max-w-lg leading-relaxed">Define your teaching style and expertise areas.</p>
      </div>

      <div className="space-y-8 max-w-3xl">
         <div className="space-y-4">
            <label className="meave-label">Subjects Taught</label>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search subjects (e.g. Maths, Physics)..." 
                className="meave-input pl-12" 
              />
              {searchTerm && filteredSubjects.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white border border-slate-100 rounded-2xl mt-2 shadow-2xl z-50 overflow-hidden">
                   {filteredSubjects.map(s => (
                     <button 
                        key={s} 
                        type="button"
                        onClick={() => {
                          setValue('subjectsTaught', [...subjectsTaught, s])
                          setSearchTerm('')
                        }}
                        className="w-full p-4 text-left text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all border-b border-slate-50 last:border-0"
                     >
                       {s}
                     </button>
                   ))}
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
               {subjectsTaught.map((s: string) => (
                 <span key={s} className="px-5 py-2.5 bg-secondary-50 text-secondary-600 rounded-2xl text-[10px] font-black flex items-center gap-2 border border-secondary-100 shadow-sm">
                    {s}
                    <button type="button" onClick={() => setValue('subjectsTaught', subjectsTaught.filter((item: string) => item !== s))} className="hover:text-red-500 transition-colors">×</button>
                 </span>
               ))}
            </div>
         </div>

         <div className="space-y-4">
            <label className="meave-label">Teaching Style</label>
            <div className="flex flex-wrap gap-3">
               {['Structured', 'Patient', 'Inquiry-based', 'Exam-focused'].map(style => (
                 <button 
                    key={style} 
                    type="button"
                    onClick={() => setValue('teachingStyle', style)}
                    className={`px-8 py-3.5 border rounded-2xl text-xs font-black transition-all ${teachingStyle === style ? 'bg-primary-950 border-primary-950 text-white shadow-xl shadow-primary-950/20' : 'bg-white border-slate-100 text-slate-600 hover:border-secondary-500 hover:text-secondary-500'}`}
                 >
                    {style}
                 </button>
               ))}
            </div>
         </div>

         <div className="space-y-4">
            <label className="meave-label">Experience Areas</label>
            <div className="grid grid-cols-2 gap-3">
               {defaultExperienceAreas.map(area => {
                 const isSelected = experienceAreas.includes(area)
                 return (
                   <button 
                      key={area} 
                      type="button" 
                      onClick={() => {
                        const newAreas = isSelected ? experienceAreas.filter((a: string) => a !== area) : [...experienceAreas, area]
                        setValue('experienceAreas', newAreas)
                      }}
                      className={`h-14 px-6 border rounded-2xl text-[11px] font-black transition-all text-left flex items-center justify-between group ${isSelected ? 'bg-secondary-50 border-secondary-500 text-secondary-600' : 'bg-white border-slate-100 text-slate-600 hover:border-secondary-500'}`}
                   >
                      {area}
                      {isSelected ? <CheckCircle2 className="size-4 text-secondary-500" /> : <Plus className="size-4 text-slate-300 group-hover:text-secondary-500" />}
                   </button>
                 )
               })}
            </div>
            {experienceAreas.filter((a: string) => !defaultExperienceAreas.includes(a)).length > 0 && (
               <div className="flex flex-wrap gap-2 mt-4">
                  {experienceAreas.filter((a: string) => !defaultExperienceAreas.includes(a)).map((a: string) => (
                    <span key={a} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black flex items-center gap-2">
                       {a}
                       <button type="button" onClick={() => setValue('experienceAreas', experienceAreas.filter((item: string) => item !== a))}>×</button>
                    </span>
                  ))}
               </div>
            )}
            <div className="flex gap-2 mt-4">
               <input 
                 type="text" 
                 value={newArea}
                 onChange={(e) => setNewArea(e.target.value)}
                 placeholder="Add custom area..." 
                 className="flex-1 h-12 px-5 bg-white border border-slate-100 rounded-xl text-xs font-bold outline-none focus:border-secondary-500" 
               />
               <button 
                 type="button"
                 onClick={() => {
                    if (newArea && !experienceAreas.includes(newArea)) {
                      setValue('experienceAreas', [...experienceAreas, newArea])
                      setNewArea('')
                    }
                 }}
                 className="px-6 bg-secondary-500 text-white rounded-xl font-black text-xs hover:bg-secondary-600 transition-all"
               >
                 Add
               </button>
            </div>
         </div>

         <div className="space-y-3">
            <label className="meave-label">Short Tutor Bio</label>
            <textarea 
              {...register('bio')}
              placeholder="Describe your teaching approach..." 
              className="meave-textarea"
            ></textarea>
         </div>
      </div>
    </div>
  )
}

const TutorStep4 = ({ setValue, watch, errors }: any) => {
  const cv = watch('cv')
  const dbs = watch('dbs')
  const degree = watch('degree')
  const availability = watch('availability') || {}
  const [selectedDays, setSelectedDays] = useState<string[]>(['Monday'])

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', 
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00'
  ]

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    )
  }

  const toggleSlot = (time: string) => {
    if (selectedDays.length === 0) {
      alert("Please select at least one day first")
      return
    }

    const newAvailability = { ...availability }
    
    // Check if the slot is currently active on ALL selected days
    const isAllActive = selectedDays.every(day => availability[day]?.includes(time))

    selectedDays.forEach(day => {
      const currentSlots = availability[day] || []
      if (isAllActive) {
        newAvailability[day] = currentSlots.filter((t: string) => t !== time)
      } else if (!currentSlots.includes(time)) {
        newAvailability[day] = [...currentSlots, time]
      }
    })

    setValue('availability', newAvailability)
  }

  return (
    <div className="space-y-10">
      <div>
        <h3 className="text-[11px] font-black text-secondary-500 uppercase tracking-[0.2em] mb-3">Step 4/5</h3>
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-4">Availability & Documents</h1>
        <p className="text-slate-500 font-medium max-w-lg leading-relaxed">Configure your teaching window and verify your credentials.</p>
      </div>

      <div className="space-y-10 max-w-3xl">
         <div className="space-y-6">
            <div className="flex items-center justify-between">
               <label className="meave-label !mb-0">Weekly Availability</label>
               <div className="flex gap-4">
                  <button 
                    type="button" 
                    onClick={() => setSelectedDays(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'])}
                    className="text-[10px] font-black text-secondary-500 hover:underline uppercase tracking-widest"
                  >
                    Weekdays
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setSelectedDays([])}
                    className="text-[10px] font-black text-slate-400 hover:underline uppercase tracking-widest"
                  >
                    Clear
                  </button>
               </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
               {days.map(day => {
                 const isSelected = selectedDays.includes(day)
                 const hasSlots = availability[day]?.length > 0
                 return (
                   <button 
                     key={day} 
                     type="button" 
                     onClick={() => toggleDay(day)}
                     className={`
                       px-5 py-3 rounded-2xl text-[10px] font-black border-2 transition-all relative
                       ${isSelected ? 'bg-primary-950 border-primary-950 text-white shadow-xl shadow-primary-950/20 scale-[1.05]' : 'bg-white border-slate-200 text-slate-400 hover:border-secondary-500'}
                       ${!isSelected && hasSlots ? 'border-emerald-500 text-emerald-600' : ''}
                     `}
                   >
                     {day}
                     {hasSlots && (
                        <div className={`absolute -top-1.5 -right-1.5 size-4 rounded-full flex items-center justify-center text-[8px] ${isSelected ? 'bg-white text-primary-950' : 'bg-emerald-500 text-white'}`}>
                           {availability[day].length}
                        </div>
                     )}
                   </button>
                 )
               })}
            </div>

            <DashboardCard className="p-8 bg-slate-50 border-2 border-slate-200 rounded-[2rem]">
               <div className="flex items-center justify-between mb-8">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                     <Clock className="size-4 text-secondary-500" />
                     {selectedDays.length === 0 ? 'Select a day above' : `${selectedDays.length} Days Selected`}
                  </h4>
                  <p className="text-[10px] font-bold text-slate-400">Slots selected here will apply to all highlighted days</p>
               </div>
               
               <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {timeSlots.map(time => {
                    const isActiveOnSome = selectedDays.some(day => availability[day]?.includes(time))
                    const isActiveOnAll = selectedDays.every(day => availability[day]?.includes(time))
                    
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => toggleSlot(time)}
                        className={`
                          py-2.5 rounded-xl text-[10px] font-black border-2 transition-all
                          ${isActiveOnAll 
                            ? 'bg-secondary-500 border-secondary-500 text-white shadow-lg shadow-secondary-500/10' 
                            : isActiveOnSome 
                              ? 'bg-secondary-50 border-secondary-500 text-secondary-500 border-dashed'
                              : 'bg-white border-slate-100 text-slate-400 hover:border-secondary-500 hover:text-secondary-500'}
                        `}
                      >
                        {time}
                      </button>
                    )
                  })}
               </div>
            </DashboardCard>
         </div>

         <div className="space-y-6 pt-4">
            <label className="meave-label">Document Uploads (Max 5MB per file)</label>
            <div className="grid grid-cols-1 gap-6">
               <FileUploader 
                 label="CV / Resume"
                 desc="Latest professional CV in PDF or Word"
                 icon={FileText}
                 value={cv}
                 onChange={(file: any) => setValue('cv', file)}
                 error={errors.cv?.message}
               />
               <FileUploader 
                 label="DBS Certificate"
                 desc="Enhanced background check certificate"
                 icon={FileText}
                 value={dbs}
                 onChange={(file: any) => setValue('dbs', file)}
                 error={errors.dbs?.message}
               />
               <FileUploader 
                 label="Degree Certificates"
                 desc="Proof of academic qualifications"
                 icon={Briefcase}
                 value={degree}
                 onChange={(file: any) => setValue('degree', file)}
                 error={errors.degree?.message}
               />
            </div>
         </div>
      </div>
    </div>
  )
}

const TutorStep5 = ({ watch }: any) => {
  const data = watch()

  return (
    <div className="space-y-10 max-w-4xl mx-auto py-10">
      <div className="text-center mb-12">
        <div className="size-24 bg-primary-950 text-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary-950/20">
          <Sparkles className="size-12" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-4">Application Preview</h1>
        <p className="text-slate-500 font-medium leading-relaxed max-w-lg mx-auto">
          Review your professional application details below. Our team will review these to verify your profile.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DashboardCard className="p-10 bg-slate-50 border border-slate-100 text-left space-y-8 rounded-[2.5rem] h-full">
           <div className="flex justify-between items-center border-b border-slate-200 pb-8">
              <h4 className="meave-label !mb-0">Professional Identity</h4>
           </div>
           <div className="grid grid-cols-2 gap-y-8">
              <div>
                 <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">Full Name</p>
                 <p className="text-base font-black text-slate-900">{data.fullName || 'Not specified'}</p>
              </div>
              <div>
                 <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">Experience</p>
                 <p className="text-base font-black text-slate-900">{data.experience ? `${data.experience} Years` : 'Not specified'}</p>
              </div>
              <div>
                 <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">Phone</p>
                 <p className="text-base font-black text-slate-900">{data.phone || 'Not specified'}</p>
              </div>
              <div>
                 <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">Country</p>
                 <p className="text-base font-black text-slate-900">{data.country || 'United Kingdom'}</p>
              </div>
              <div className="col-span-2">
                 <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">Bio</p>
                 <p className="text-xs font-bold text-slate-600 leading-relaxed italic line-clamp-3">"{data.bio || 'No bio provided'}"</p>
              </div>
           </div>
        </DashboardCard>

        <DashboardCard className="p-10 bg-slate-50 border border-slate-100 text-left space-y-8 rounded-[2.5rem] h-full">
           <div className="flex justify-between items-center border-b border-slate-200 pb-8">
              <h4 className="meave-label !mb-0">Specialisation & Verfication</h4>
           </div>
           <div className="grid grid-cols-2 gap-y-8">
              <div className="col-span-2">
                 <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">Subjects Taught</p>
                 <div className="flex flex-wrap gap-2 mt-2">
                   {(data.subjectsTaught || []).map((s: string) => (
                     <span key={s} className="px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-lg text-[10px] font-black">
                       {s}
                     </span>
                   ))}
                 </div>
              </div>
              <div>
                 <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">Teaching Style</p>
                 <p className="text-base font-black text-slate-900">{data.teachingStyle || 'Structured'}</p>
              </div>
              <div className="col-span-2">
                 <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">Documents</p>
                 <div className="flex gap-3 mt-2">
                    {data.cv && (
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-black flex items-center gap-1 border border-emerald-100">
                        CV <CheckCircle2 className="size-3" />
                      </span>
                    )}
                    {data.dbs && (
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-black flex items-center gap-1 border border-emerald-100">
                        DBS <CheckCircle2 className="size-3" />
                      </span>
                    )}
                    {data.degree && (
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-black flex items-center gap-1 border border-emerald-100">
                        Degree <CheckCircle2 className="size-3" />
                      </span>
                    )}
                 </div>
              </div>
              <div className="col-span-2">
                 <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">Weekly Availability</p>
                 <p className="text-xs font-black text-secondary-500">
                    {Object.keys(data.availability || {}).filter(day => data.availability[day].length > 0).length} days active
                 </p>
              </div>
           </div>
        </DashboardCard>
      </div>
    </div>
  )
}

export default OnboardingWizard
