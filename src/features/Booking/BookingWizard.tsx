import { useState, useEffect } from 'react'
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  User, 
  Users, 
  Heart, 
  School, 
  BookOpen, 
  Target, 
  Brain, 
  Zap, 
  MessageCircle,
  Calendar as CalendarIcon,
  Clock,
  Video,
  MapPin,
  Sparkles,
  ShieldCheck,
  Star,
  CreditCard,
  ArrowRight,
  Info,
  Search as LucideSearch,
  Calculator,
  Beaker,
  Scroll,
  Globe,
  Palette,
  MessageSquare,
  Laptop as LucideLaptop,
  Music as LucideMusic
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import DashboardCard from '../../ui/components/DashboardCard'
import { 
  SuccessIllustration, 
  LearningIllustration,
  VisualIllustration,
  PracticalIllustration,
  StepIllustration,
  InteractiveIllustration
} from '../../ui/components/Illustrations'
import SearchableSelect from '../../ui/components/SearchableSelect'

const STEPS_COUNT = 14

interface BookingFormData {
  whoFor: string
  studentName: string
  studentAge: string
  studentYear: string
  schoolName: string
  schoolType: string
  academicLevel: string
  curriculum: string
  subjects: string[]
  mainGoal: string
  challenges: string
  learningStyle: string
  personality: string[]
  tutorConsistency: string
  tutorQualities: string[]
  lessonStyle: string
  firstLanguage: string
  supportNeeds: string[]
  supportDetails: string
  format: string
  schedule: { days: string[], times: string[] }
  successOutcomes: string[]
  otherNotes: string
}

const BookingWizard = () => {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<BookingFormData>({
    whoFor: '',
    studentName: '',
    studentAge: '',
    studentYear: '',
    schoolName: '',
    schoolType: '',
    academicLevel: '',
    curriculum: '',
    subjects: [],
    mainGoal: '',
    challenges: '',
    learningStyle: '',
    personality: [],
    tutorConsistency: '',
    tutorQualities: [],
    lessonStyle: '',
    firstLanguage: '',
    supportNeeds: [],
    supportDetails: '',
    format: '',
    schedule: { days: [], times: [] },
    successOutcomes: [],
    otherNotes: ''
  })
  const [showAllSubjects, setShowAllSubjects] = useState(false)

  // Simulated auto-save
  useEffect(() => {
    localStorage.setItem('meave_booking_progress', JSON.stringify(formData))
  }, [formData])

  const canContinue = () => {
    switch (step) {
      case 1: return !!formData.whoFor && !!formData.studentName
      case 2: return !!formData.schoolType && !!formData.studentYear
      case 3: return formData.subjects.length > 0 && !!formData.mainGoal
      case 4: return !!formData.tutorConsistency
      case 5: return !!formData.learningStyle && formData.personality.length > 0
      case 6: return formData.tutorQualities.length > 0
      case 7: return !!formData.lessonStyle
      case 8: return !!formData.firstLanguage
      case 9: return formData.supportNeeds.length > 0
      case 10: return !!formData.format && formData.schedule.days.length > 0 && formData.schedule.times.length > 0
      case 11: return formData.successOutcomes.length > 0
      default: return true
    }
  }

  const handleNext = () => {
    setLoading(true)
    setTimeout(() => {
      setStep(s => Math.min(s + 1, STEPS_COUNT))
      setLoading(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 600)
  }

  const handleBack = () => setStep(s => Math.max(s - 1, 1))

  const progress = (step / STEPS_COUNT) * 100

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepContainer 
            title="Who is the lesson for?" 
            subtitle="We personalize every session based on the learner's unique profile."
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { id: 'myself', label: 'Myself', icon: User },
                { id: 'child', label: 'My Child', icon: Heart },
                { id: 'someone_else', label: 'Someone else', icon: Users },
              ].map((item) => (
                <SelectionCard 
                  key={item.id}
                  selected={formData.whoFor === item.id}
                  onClick={() => setFormData({ ...formData, whoFor: item.id })}
                  icon={item.icon}
                  label={item.label}
                />
              ))}
            </div>
            {formData.whoFor === 'child' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <InputGroup label="Student's First Name">
                  <input 
                    type="text" 
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    placeholder="Enter name"
                    className="meave-input" 
                  />
                </InputGroup>
                <div className="grid grid-cols-2 gap-4">
                  <InputGroup label="Age Range">
                    <SearchableSelect 
                      options={[
                        { value: '4-6', label: '4 - 6 Years', group: 'Early Years' },
                        { value: '7-11', label: '7 - 11 Years', group: 'Early Years' },
                        { value: '11-14', label: '11 - 14 Years', group: 'Secondary' },
                        { value: '14-16', label: '14 - 16 Years (GCSE)', group: 'Secondary' },
                        { value: '16-18', label: '16 - 18 Years (A-Level / IB)', group: 'Further Education' },
                        { value: '18-21', label: '18 - 21 Years (University)', group: 'Further Education' },
                        { value: '21+', label: '21+ Years (Adult Learner)', group: 'Further Education' },
                      ]}
                      value={formData.studentAge}
                      onChange={(val) => setFormData({ ...formData, studentAge: val })}
                      placeholder="Select age range"
                    />
                  </InputGroup>
                  <InputGroup label="School Year / Class">
                    <input 
                      type="text" 
                      value={formData.studentYear}
                      onChange={(e) => setFormData({ ...formData, studentYear: e.target.value })}
                      placeholder="e.g. Year 9"
                      className="meave-input" 
                    />
                  </InputGroup>
                </div>
              </motion.div>
            )}
          </StepContainer>
        )

      case 2:
        return (
          <StepContainer 
            title="Current Education Details" 
            subtitle="This helps us align the tutor with the right curriculum and school environment."
          >
            <div className="space-y-6">
              <InputGroup label="Current School Name">
                <input 
                  type="text" 
                  value={formData.schoolName}
                  onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                  placeholder="Enter school name"
                  className="meave-input" 
                />
              </InputGroup>
              <div className="space-y-3">
                <label className="meave-label">School Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Public', 'Private', 'Homeschool'].map(t => (
                    <button 
                      key={t}
                      onClick={() => setFormData({ ...formData, schoolType: t })}
                      className={`h-12 rounded-xl font-bold text-sm transition-all border-2 ${formData.schoolType === t ? 'border-primary-950 bg-primary-50 text-primary-950' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InputGroup label="Academic Level">
                  <SearchableSelect 
                    options={[
                      { value: 'primary', label: 'Year 1-6' },
                      { value: 'ks3', label: 'Year 7-9' },
                      { value: 'gcse', label: 'GCSE' },
                      { value: 'alevel', label: 'A-Level' },
                      { value: 'uni', label: 'University' },
                    ]}
                    value={formData.academicLevel}
                    onChange={(val) => setFormData({ ...formData, academicLevel: val })}
                    placeholder="Select Level"
                  />
                </InputGroup>
                <InputGroup label="Curriculum">
                  <SearchableSelect 
                    options={[
                      { value: 'uk', label: 'UK Curriculum' },
                      { value: 'ib', label: 'IB' },
                      { value: 'us', label: 'American' },
                      { value: 'other', label: 'Other' },
                    ]}
                    value={formData.curriculum}
                    onChange={(val) => setFormData({ ...formData, curriculum: val })}
                    placeholder="Select Curriculum"
                  />
                </InputGroup>
              </div>
            </div>
          </StepContainer>
        )

      case 3:
        const mainSubjects = [
          { id: 'maths', label: 'Maths', icon: Calculator },
          { id: 'english', label: 'English', icon: BookOpen },
          { id: 'science', label: 'Science', icon: Beaker },
          { id: 'history', label: 'History', icon: Scroll },
          { id: 'geography', label: 'Geography', icon: Globe },
          { id: 'computing', label: 'Computing', icon: LucideLaptop },
          { id: 'art', label: 'Art & Design', icon: Palette },
          { id: 'music', label: 'Music', icon: LucideMusic },
          { id: 'languages', label: 'Languages', icon: MessageSquare },
        ]
        return (
          <StepContainer 
            title="Which subjects do you need help with?" 
            subtitle="Select the subjects you'd like to focus on. You can choose more than one."
          >
            <div className="space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mainSubjects.map(s => {
                  const isSelected = formData.subjects.includes(s.id)
                  return (
                    <button
                      key={s.id}
                      onClick={() => {
                        const newS = isSelected ? formData.subjects.filter(x => x !== s.id) : [...formData.subjects, s.id]
                        setFormData({ ...formData, subjects: newS })
                      }}
                      className={`
                        h-16 px-5 rounded-2xl border-2 transition-all flex items-center justify-between group
                        ${isSelected ? 'border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'border-slate-100 hover:border-slate-200 bg-white'}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`size-10 rounded-xl flex items-center justify-center transition-all ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-600'}`}>
                          <s.icon className="size-5" />
                        </div>
                        <span className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-slate-600'}`}>{s.label}</span>
                      </div>
                      <div className={`size-6 rounded-full flex items-center justify-center transition-all ${isSelected ? 'bg-white' : 'border-2 border-slate-200 bg-white'}`}>
                        {isSelected && <CheckCircle2 className="size-4 text-emerald-500" />}
                      </div>
                    </button>
                  )
                })}
              </div>
              
              <div className="flex justify-center">
                <button 
                  onClick={() => setShowAllSubjects(!showAllSubjects)}
                  className="px-8 h-12 bg-primary-950 text-white rounded-full font-black text-sm hover:scale-105 transition-all shadow-lg"
                >
                  {showAllSubjects ? 'Show less' : 'Show more (21)'}
                </button>
              </div>

              <div className="pt-8 border-t border-slate-100">
                <label className="meave-label mb-4">Main Tutoring Goal</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['Improve Grades', 'Exam Preparation', 'Homework Help', 'Confidence Building'].map(g => (
                    <button 
                      key={g}
                      onClick={() => setFormData({ ...formData, mainGoal: g })}
                      className={`h-14 px-5 rounded-xl font-bold text-sm text-left transition-all border-2 flex items-center justify-between ${formData.mainGoal === g ? 'border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'border-slate-100 text-slate-400 hover:border-slate-200 bg-white'}`}
                    >
                      {g}
                      <div className={`size-6 rounded-full flex items-center justify-center transition-all ${formData.mainGoal === g ? 'bg-white' : 'border-2 border-slate-200'}`}>
                        {formData.mainGoal === g && <CheckCircle2 className="size-4 text-emerald-500" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </StepContainer>
        )

      case 4:
        return (
          <StepContainer 
            title="Tutor Matching Preference" 
            subtitle="How would you like us to organize your tutoring team?"
          >
            <div className="flex flex-col gap-3 max-w-xl mx-auto">
              {[
                { id: 'one', label: 'Yes, I only want one tutor' },
                { id: 'multiple', label: 'No, I want multiple tutors' },
                { id: 'dont_mind', label: "I don't mind" },
                { id: 'not_sure', label: "I'm not sure" },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setFormData({ ...formData, tutorConsistency: opt.id })}
                  className={`h-16 px-8 rounded-2xl border-2 font-bold text-sm transition-all flex items-center justify-between ${formData.tutorConsistency === opt.id ? 'border-secondary-500 bg-secondary-500 text-white shadow-lg shadow-secondary-500/20' : 'border-slate-100 text-slate-500 hover:border-slate-200 bg-white'}`}
                >
                  {opt.label}
                  <div className={`size-6 rounded-full flex items-center justify-center transition-all ${formData.tutorConsistency === opt.id ? 'bg-white' : 'border-2 border-slate-200'}`}>
                    {formData.tutorConsistency === opt.id && <CheckCircle2 className="size-4 text-secondary-500" />}
                  </div>
                </button>
              ))}
            </div>
          </StepContainer>
        )

      case 5:
        const learningStyles = [
          { id: 'visual', l: 'Visual learning', d: 'Images, diagrams, and videos', icon: VisualIllustration },
          { id: 'practical', l: 'Practical examples', d: 'Real-world applications', icon: PracticalIllustration },
          { id: 'step', l: 'Step-by-step', d: 'Structured logical progression', icon: StepIllustration },
          { id: 'interactive', l: 'Interactive discussion', d: 'Dynamic Q&A sessions', icon: InteractiveIllustration },
        ]
        return (
          <StepContainer 
            title="Learning Style & Personality" 
            subtitle="Matching a student with a tutor's teaching style is our secret to success."
          >
            <div className="space-y-12">
              <div className="space-y-6">
                <label className="meave-label">How does the student learn best?</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {learningStyles.map(item => (
                    <button 
                      key={item.id}
                      onClick={() => setFormData({ ...formData, learningStyle: item.id })}
                      className={`group p-6 rounded-[2.5rem] text-left border-2 transition-all flex items-start gap-5 ${formData.learningStyle === item.id ? 'border-primary-950 bg-primary-50 shadow-xl shadow-primary-950/5' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                    >
                      <div className={`size-16 rounded-2xl flex items-center justify-center shrink-0 transition-all ${formData.learningStyle === item.id ? 'bg-primary-950 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-600'}`}>
                        <item.icon className="size-10" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className={`font-bold uppercase tracking-widest text-[9px] ${formData.learningStyle === item.id ? 'text-primary-950' : 'text-slate-400'}`}>{item.l}</p>
                          <div className={`size-5 rounded-full border-2 flex items-center justify-center transition-all ${formData.learningStyle === item.id ? 'border-emerald-500 bg-emerald-500' : 'border-slate-200'}`}>
                            {formData.learningStyle === item.id && <CheckCircle2 className="size-3 text-white" />}
                          </div>
                        </div>
                        <p className="text-sm font-bold text-slate-900 mb-1 truncate">{item.l}</p>
                        <p className="text-xs font-medium text-slate-500 leading-relaxed line-clamp-2">{item.d}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <label className="meave-label">Student's Personality (Select all that apply)</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'Shy/Quiet', icon: User },
                    { id: 'Highly Energetic', icon: Zap },
                    { id: 'Easily Distracted', icon: Brain },
                    { id: 'Independent Learner', icon: Target },
                    { id: 'Needs Encouragement', icon: Heart },
                    { id: 'Creative Thinker', icon: Sparkles },
                    { id: 'Detail Oriented', icon: LucideSearch },
                    { id: 'Social/Out-going', icon: Users },
                    { id: 'Logical/Analytical', icon: BookOpen },
                    { id: 'Highly Focused', icon: Target },
                    { id: 'Needs Breaks', icon: Clock },
                    { id: 'Inquisitive', icon: MessageCircle },
                  ].map(t => {
                    const isSelected = formData.personality.includes(t.id)
                    return (
                      <button 
                        key={t.id}
                        onClick={() => {
                          const newP = isSelected ? formData.personality.filter(x => x !== t.id) : [...formData.personality, t.id]
                          setFormData({ ...formData, personality: newP })
                        }}
                        className={`
                          h-11 px-5 rounded-full font-bold text-xs transition-all border-2 flex items-center gap-2
                          ${isSelected ? 'border-primary-950 bg-primary-950 text-white shadow-lg shadow-primary-950/20' : 'border-slate-100 text-slate-500 hover:border-slate-200 bg-white'}
                        `}
                      >
                        <t.icon className={`size-3.5 ${isSelected ? 'text-secondary-500' : 'text-slate-300'}`} />
                        <span>{t.id}</span>
                        <div className={`size-4 rounded-full border flex items-center justify-center transition-all ${isSelected ? 'border-emerald-500 bg-emerald-500' : 'border-slate-200'}`}>
                          {isSelected && <CheckCircle2 className="size-2.5 text-white" />}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </StepContainer>
        )

      case 6:
        return (
          <StepContainer 
            title="What qualities matter most to you in a tutor?" 
            subtitle="This helps us find a personality that clicks with the student."
          >
            <div className="flex flex-col gap-3 max-w-xl mx-auto">
              {[
                { id: 'patient', label: 'Patient and supportive' },
                { id: 'results', label: 'Focused on results' },
                { id: 'fun', label: 'Fun and engaging' },
                { id: 'knowledgeable', label: 'Knowledgeable and thorough' },
                { id: 'motivating', label: 'Motivating and inspiring' },
              ].map(q => {
                const isSelected = formData.tutorQualities.includes(q.id)
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      const newQ = isSelected ? formData.tutorQualities.filter(x => x !== q.id) : [...formData.tutorQualities, q.id]
                      setFormData({ ...formData, tutorQualities: newQ })
                    }}
                    className={`h-16 px-8 rounded-2xl border-2 font-bold text-sm transition-all flex items-center justify-between ${isSelected ? 'border-secondary-500 bg-secondary-500 text-white shadow-lg shadow-secondary-500/20' : 'border-slate-100 text-slate-500 hover:border-slate-200 bg-white'}`}
                  >
                    {q.label}
                    <div className={`size-6 rounded-full flex items-center justify-center transition-all ${isSelected ? 'bg-white' : 'border-2 border-slate-200'}`}>
                      {isSelected && <CheckCircle2 className="size-4 text-secondary-500" />}
                    </div>
                  </button>
                )
              })}
            </div>
          </StepContainer>
        )

      case 7:
        return (
          <StepContainer 
            title="What style of lessons do you prefer?" 
            subtitle="Every learner has a different comfort zone."
          >
            <div className="flex flex-col gap-3 max-w-xl mx-auto">
              {[
                { id: 'relaxed', label: 'Relaxed and conversational' },
                { id: 'balanced', label: 'Balanced and guided' },
                { id: 'formal', label: 'Formal and academic' },
              ].map(s => (
                <button
                  key={s.id}
                  onClick={() => setFormData({ ...formData, lessonStyle: s.id })}
                  className={`h-16 px-8 rounded-2xl border-2 font-bold text-sm transition-all flex items-center justify-between ${formData.lessonStyle === s.id ? 'border-secondary-500 bg-secondary-500 text-white shadow-lg shadow-secondary-500/20' : 'border-slate-100 text-slate-500 hover:border-slate-200 bg-white'}`}
                >
                  {s.label}
                  <div className={`size-6 rounded-full flex items-center justify-center transition-all ${formData.lessonStyle === s.id ? 'bg-white' : 'border-2 border-slate-200'}`}>
                    {formData.lessonStyle === s.id && <CheckCircle2 className="size-4 text-secondary-500" />}
                  </div>
                </button>
              ))}
            </div>
          </StepContainer>
        )

      case 8:
        return (
          <StepContainer 
            title="Language Preference" 
            subtitle="Would you prefer a tutor who speaks your child's first language?"
          >
            <div className="flex flex-col gap-3 max-w-xl mx-auto">
              {[
                { id: 'english', label: 'No, only English is fine' },
                { id: 'other', label: 'Yes, I would prefer another language' },
                { id: 'dont_mind', label: "I don't mind" },
              ].map(l => (
                <button
                  key={l.id}
                  onClick={() => setFormData({ ...formData, firstLanguage: l.id })}
                  className={`h-16 px-8 rounded-2xl border-2 font-bold text-sm transition-all flex items-center justify-between ${formData.firstLanguage === l.id ? 'border-secondary-500 bg-secondary-500 text-white shadow-lg shadow-secondary-500/20' : 'border-slate-100 text-slate-400 hover:border-slate-200 bg-white'}`}
                >
                  {l.label}
                  <div className={`size-6 rounded-full flex items-center justify-center transition-all ${formData.firstLanguage === l.id ? 'bg-white' : 'border-2 border-slate-200'}`}>
                    {formData.firstLanguage === l.id && <CheckCircle2 className="size-4 text-secondary-500" />}
                  </div>
                </button>
              ))}
            </div>
          </StepContainer>
        )

      case 9:
        return (
          <StepContainer 
            title="Support & Accessibility" 
            subtitle="We care deeply about creating a safe and inclusive learning environment."
          >
            <div className="space-y-8">
              <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl flex gap-4">
                <Info className="size-6 text-blue-500 shrink-0" />
                <p className="text-sm font-medium text-blue-700 leading-relaxed">
                  This information helps us select a tutor with specific experience in supportive learning. It is completely optional and handled with the utmost respect.
                </p>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-black text-slate-900">Are there any learning differences we should consider?</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                  {['None', 'ADHD', 'Dyslexia', 'Autism Spectrum', 'Anxiety', 'Prefer not to say'].map(s => {
                    const isSelected = formData.supportNeeds.includes(s)
                    return (
                      <button 
                        key={s}
                        onClick={() => {
                          const newS = isSelected ? formData.supportNeeds.filter(x => x !== s) : [...formData.supportNeeds, s]
                          setFormData({ ...formData, supportNeeds: newS })
                        }}
                        className={`h-12 rounded-full font-bold text-xs transition-all border-2 ${isSelected ? 'border-primary-950 bg-primary-50 text-primary-950' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}
                      >
                        {s}
                      </button>
                    )
                  })}
                </div>
              </div>

              <InputGroup label="Is there anything else the tutor should know to better support the student?">
                <textarea 
                  value={formData.supportDetails}
                  onChange={(e) => setFormData({ ...formData, supportDetails: e.target.value })}
                  placeholder="Tell us about specific needs or preferences..."
                  className="meave-textarea" 
                />
              </InputGroup>
            </div>
          </StepContainer>
        )

      case 10:
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        const times = [
          { id: 'morning', label: 'Morning', range: 'Before 12pm', icon: Sparkles },
          { id: 'afternoon', label: 'Afternoon', range: '12pm - 5pm', icon: Zap },
          { id: 'evening', label: 'Evening', range: 'After 5pm', icon: Clock },
        ]
        return (
          <StepContainer 
            title="Preferred Learning Format" 
            subtitle="Choose how and when you'd like to learn."
          >
            <div className="space-y-12">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { id: 'online', label: 'Fully Online', icon: Video, desc: 'Learn from anywhere with our interactive classroom.' },
                  { id: 'in-person', label: 'In-Person', icon: MapPin, desc: 'Face-to-face learning at your preferred location.' },
                ].map(f => (
                  <button 
                    key={f.id}
                    onClick={() => setFormData({ ...formData, format: f.id })}
                    className={`
                      p-8 rounded-[3rem] border-2 transition-all flex flex-col items-center text-center gap-4 group
                      ${formData.format === f.id ? 'border-primary-950 bg-primary-50 shadow-xl shadow-primary-950/5' : 'border-slate-100 hover:border-slate-200 bg-white'}
                    `}
                  >
                    <div className={`size-20 rounded-[2rem] flex items-center justify-center transition-all ${formData.format === f.id ? 'bg-primary-950 text-white shadow-lg' : 'bg-slate-50 text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-600'}`}>
                      <f.icon className="size-10" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 mb-1">{f.label}</h4>
                      <p className="text-xs font-medium text-slate-500 leading-relaxed">{f.desc}</p>
                    </div>
                    {formData.format === f.id && (
                      <div className="size-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <CheckCircle2 className="size-4 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="space-y-6">
                <label className="meave-label">Which days work best?</label>
                <div className="flex flex-wrap gap-2">
                  {days.map(day => {
                    const isSelected = formData.schedule.days.includes(day)
                    return (
                      <button 
                        key={day}
                        onClick={() => {
                          const newD = isSelected ? formData.schedule.days.filter(x => x !== day) : [...formData.schedule.days, day]
                          setFormData({ ...formData, schedule: { ...formData.schedule, days: newD } })
                        }}
                        className={`
                          h-11 px-6 rounded-full border-2 font-bold text-xs transition-all flex items-center gap-2
                          ${isSelected ? 'border-primary-950 bg-primary-950 text-white shadow-lg shadow-primary-950/20' : 'border-slate-100 text-slate-500 hover:border-slate-200 bg-white'}
                        `}
                      >
                        <CalendarIcon className={`size-3.5 ${isSelected ? 'text-secondary-500' : 'text-slate-300'}`} />
                        <span>{day}</span>
                        {isSelected && <CheckCircle2 className="size-3 text-white" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-6">
                <label className="meave-label text-center block mb-8">Preferred Time of Day</label>
                <div className="flex flex-col gap-3 max-w-2xl mx-auto">
                  {[
                    { id: 'before', label: 'Before school (6am - 8am)' },
                    { id: 'during', label: 'School hours (8am - 4pm)' },
                    { id: 'after', label: 'After school (4pm - 8pm)' },
                    { id: 'late', label: 'Late (after 8pm)' },
                  ].map(t => {
                    const isSelected = formData.schedule.times.includes(t.id)
                    return (
                      <button 
                        key={t.id}
                        onClick={() => setFormData({ 
                          ...formData, 
                          schedule: { ...formData.schedule, times: [t.id] } 
                        })}
                        className={`
                          h-14 px-6 rounded-2xl border-2 transition-all flex items-center relative group
                          ${isSelected ? 'border-secondary-500 bg-secondary-50' : 'border-slate-100 hover:border-slate-200 bg-white'}
                        `}
                      >
                        {/* Radio-style indicator */}
                        <div className={`
                          size-5 rounded-full border-2 flex items-center justify-center transition-all
                          ${isSelected ? 'border-secondary-500 bg-secondary-500' : 'border-slate-200'}
                        `}>
                          {isSelected && <div className="size-1.5 bg-white rounded-full shadow-sm" />}
                        </div>
                        
                        {/* Centered Label */}
                        <span className={`
                          flex-1 text-center font-bold text-sm
                          ${isSelected ? 'text-secondary-600' : 'text-slate-600'}
                        `}>
                          {t.label}
                        </span>
                        
                        {/* Empty spacer for centering balance */}
                        <div className="size-5" />
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </StepContainer>
        )

      case 11:
        return (
          <StepContainer 
            title="Expectations & Goals" 
            subtitle="What would a successful tutoring journey look like to you?"
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="text-sm font-black text-slate-900">Desired Outcomes</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['Better Grades', 'More Confidence', 'Exam Readiness', 'Consistency', 'Passion for Subject', 'Long-term Support'].map(o => {
                    const isSelected = formData.successOutcomes.includes(o)
                    return (
                      <button 
                        key={o}
                        onClick={() => {
                          const newO = isSelected ? formData.successOutcomes.filter(x => x !== o) : [...formData.successOutcomes, o]
                          setFormData({ ...formData, successOutcomes: newO })
                        }}
                        className={`h-14 px-5 rounded-xl font-bold text-sm text-left transition-all border-2 flex items-center justify-between ${isSelected ? 'border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'border-slate-100 text-slate-400 hover:border-slate-200 bg-white'}`}
                      >
                        {o}
                        <div className={`size-6 rounded-full flex items-center justify-center transition-all ${isSelected ? 'bg-white' : 'border-2 border-slate-200'}`}>
                          {isSelected && <CheckCircle2 className="size-4 text-emerald-500" />}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
              <InputGroup label="Anything else you'd like us to know?">
                <textarea 
                  value={formData.otherNotes}
                  onChange={(e) => setFormData({ ...formData, otherNotes: e.target.value })}
                  placeholder="Optional: Provide more context for our matching algorithm..."
                  className="meave-textarea" 
                />
              </InputGroup>
            </div>
          </StepContainer>
        )

      case 12:
        const recommendedTutors = [
          { 
            name: 'Dr. Sarah Wilson', 
            match: '98% Match', 
            strengths: ['Visual Learner Expert', 'Exam Prep Spec', 'GCSE/A-Level'], 
            img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
            reason: 'Top choice for Visual learners targeting GCSE success.'
          },
          { 
            name: 'Marcus Chen', 
            match: '96% Match', 
            strengths: ['Step-by-step', 'Physics/Maths', 'Patient Mentor'], 
            img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
            reason: 'Perfect for structured logical progression and long-term support.'
          },
          { 
            name: 'Aisha Rahman', 
            match: '95% Match', 
            strengths: ['Interactive Q&A', 'Languages', 'Engaging Style'], 
            img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha',
            reason: 'Highly recommended for students who thrive in dynamic discussions.'
          },
          { 
            name: 'James Oliver', 
            match: '89% Match', 
            strengths: ['Practical Examples', 'Computer Science', 'Fun Approach'], 
            img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
            reason: 'Great fit for practical learners interested in tech and coding.'
          },
          { 
            name: 'Elena Rossi', 
            match: '87% Match', 
            strengths: ['Art & Design', 'Creative Thinker', 'Supportive'], 
            img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
            reason: 'Matches your student\'s creative personality and artistic goals.'
          },
          { 
            name: 'Samuel Okafor', 
            match: '85% Match', 
            strengths: ['Homework Help', 'English Lit', 'Confidence Coach'], 
            img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Samuel',
            reason: 'Strong choice for improving grades and building academic confidence.'
          },
        ]
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            <div className="text-center space-y-2 mb-10">
              <div className="size-16 bg-primary-50 text-primary-600 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-primary-100 shadow-sm">
                <Sparkles className="size-8" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Our Top Picks for You</h2>
              <p className="text-slate-500 font-medium max-w-xl mx-auto">We found 6 tutors that match your specific learning style and personality preferences.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedTutors.map((tutor, i) => {
                const isElite = parseInt(tutor.match) >= 95
                return (
                  <div key={i} className="bg-white rounded-[2rem] p-6 shadow-sm border-2 border-slate-100 flex flex-col h-full hover:shadow-xl hover:border-primary-950 transition-all">
                    {/* Top Section: Avatar + Name */}
                    <div className="flex gap-4 mb-6">
                      <div className="flex flex-col items-center gap-2">
                        <div className="size-16 rounded-full overflow-hidden border-2 border-white shadow-md">
                          <img src={tutor.img} alt={tutor.name} className="size-full object-cover" />
                        </div>
                        <div className={`px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm ${isElite ? 'bg-emerald-500 text-white' : 'bg-secondary-500 text-white'}`}>
                          <Star className="size-2.5 fill-white" />
                          <span className="text-[10px] font-black">5.0</span>
                        </div>
                      </div>
                      <div className="flex-1 pt-1">
                        <h4 className="text-base font-black text-slate-900 leading-tight mb-1">{tutor.name}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tutor.strengths[0]}</p>
                      </div>
                    </div>

                    {/* Middle Section: Metadata */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-slate-500">
                        <MapPin className="size-3.5 text-slate-300" />
                        <span className="text-xs font-medium">London, United Kingdom</span>
                      </div>
                      <div className="flex flex-col gap-1.5 pl-5.5">
                        <p className="text-[11px] font-bold text-slate-400">8 yrs of exp.</p>
                        <p className="text-[11px] font-bold text-slate-400">400+ consultations</p>
                      </div>
                    </div>

                    {/* Tags Section */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {tutor.strengths.slice(1).map(s => (
                        <span key={s} className="px-3 py-1.5 bg-slate-50 text-slate-500 rounded-full text-[10px] font-bold border border-slate-100">
                          {s}
                        </span>
                      ))}
                      <span className="px-3 py-1.5 bg-slate-50 text-slate-400 rounded-full text-[10px] font-bold border border-slate-100">+2</span>
                    </div>

                    {/* Footer: Price + Button */}
                    <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                      <div>
                        <p className="text-base font-black text-slate-900">$45/h</p>
                        <p className="text-[10px] font-bold text-slate-400">Online/Offline</p>
                      </div>
                      <button 
                        onClick={handleNext}
                        className="h-11 px-6 bg-primary-950 text-white rounded-2xl font-black text-xs hover:bg-primary-900 transition-all shadow-xl shadow-primary-950/20 active:scale-95"
                      >
                        Book Consultation
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
            
            <div className="flex flex-col items-center gap-6 pt-8">
              <p className="text-xs font-medium text-slate-400 text-center max-w-md">
                Don't see the perfect fit? You can always refine your preferences or request a custom matching consultation from our academic team.
              </p>
              <button onClick={handleBack} className="text-slate-400 font-black text-xs hover:text-slate-900 flex items-center gap-2 uppercase tracking-widest border-b-2 border-transparent hover:border-slate-900 transition-all pb-1">
                <ChevronLeft className="size-4" /> Refine my preferences
              </button>
            </div>
          </motion.div>
        )

      case 13:
        return (
          <StepContainer 
            title="Finalize Your Booking" 
            subtitle="Pick a time and confirm your session details."
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                  <h4 className="text-sm font-black text-slate-900 mb-4">Select Date</h4>
                  <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-black text-slate-400 mb-4 uppercase">
                    <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 31 }).map((_, i) => (
                      <button key={i} className={`size-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${i + 1 === 24 ? 'bg-primary-950 text-white shadow-lg' : 'hover:bg-white text-slate-600'}`}>
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm font-black text-slate-900">Available Times</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {['14:00 PM', '16:30 PM', '18:00 PM', '20:00 PM'].map(t => (
                      <button key={t} className={`h-12 rounded-xl border-2 font-bold text-xs transition-all ${t === '14:00 PM' ? 'border-primary-950 bg-primary-50 text-primary-950' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
                  <h4 className="text-lg font-bold mb-6">Payment Method</h4>
                  <div className="p-5 border-2 border-primary-950 bg-primary-50 rounded-2xl flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <CreditCard className="size-6 text-primary-950" />
                      <div>
                        <p className="text-xs font-black text-primary-950">Visa Ending 4242</p>
                        <p className="text-[10px] text-primary-600 font-bold">Expires 12/26</p>
                      </div>
                    </div>
                    <div className="size-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
                      <CheckCircle2 className="size-4 text-white" />
                    </div>
                  </div>
                  <button className="text-xs font-black text-slate-400 hover:text-primary-600 hover:underline">+ Add New Card</button>
                  
                  <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
                    <div className="flex justify-between text-slate-500 font-medium text-sm">
                      <span>Subtotal</span>
                      <span>£45.00</span>
                    </div>
                    <div className="flex justify-between text-slate-500 font-medium text-sm">
                      <span>Service Fee</span>
                      <span>£2.50</span>
                    </div>
                    <div className="flex justify-between text-xl font-black text-slate-900 pt-4">
                      <span>Total</span>
                      <span>£47.50</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleNext}
                  className="w-full h-16 bg-primary-950 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-primary-900 transition-all shadow-xl shadow-primary-950/20 active:scale-95"
                >
                  Confirm & Pay
                  <ShieldCheck className="size-6" />
                </button>
              </div>
            </div>
          </StepContainer>
        )

      case 10:
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="max-w-2xl mx-auto text-center py-10"
          >
            <div className="size-48 mx-auto mb-8 relative">
              <SuccessIllustration className="size-full animate-in zoom-in duration-700" />
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Booking Confirmed!</h2>
            <p className="text-slate-500 font-medium text-lg max-w-md mx-auto mb-10 leading-relaxed">
              We've successfully matched {formData.studentName || 'the student'} with Dr. Sarah Wilson. Your educational journey starts here.
            </p>

            <DashboardCard className="bg-slate-50 border border-slate-100 p-8 mb-10 text-left rounded-[3rem]">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">What happens next?</h4>
              <div className="space-y-6">
                <NextStepItem 
                  icon={CalendarIcon} 
                  title="Session Scheduled" 
                  desc="Monday, 24th May at 14:00 PM. Added to your calendar." 
                />
                <NextStepItem 
                  icon={MessageCircle} 
                  title="Intro Message" 
                  desc="Dr. Sarah has been notified and will send a hello message shortly." 
                />
                <NextStepItem 
                  icon={ShieldCheck} 
                  title="Safety Guaranteed" 
                  desc="Meave safeguards every session. You're in good hands." 
                />
              </div>
            </DashboardCard>

            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => window.location.href = '/sessions'} className="flex-1 h-16 bg-primary-950 text-white rounded-2xl font-black hover:bg-primary-900 transition-all shadow-lg">View My Sessions</button>
              <button onClick={() => window.location.reload()} className="flex-1 h-16 bg-white border border-slate-200 text-slate-900 rounded-2xl font-black hover:bg-slate-50 transition-all">Go to Dashboard</button>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-5xl mx-auto pb-20">
      {/* Tutorful-inspired Premium Header (Sticky In-Page) */}
      {step < 12 && (
        <div className="sticky top-0 bg-white z-40 mb-14 pt-6 pb-4 border-b border-slate-50">
          <div className="flex items-center justify-between mb-6">
            {/* Logo Side */}
            <div className="flex items-center gap-2">
              <div className="size-8 bg-primary-950 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xl">M</span>
              </div>
              <span className="text-xl font-black text-primary-950 tracking-tighter">Book a Session</span>
            </div>

            {/* Trust Side */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex -space-x-3 overflow-hidden">
                {[1, 2, 3, 4].map(i => (
                  <img 
                    key={i}
                    className="inline-block size-8 rounded-full ring-2 ring-white"
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`}
                    alt=""
                  />
                ))}
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-0.5 mb-0.5">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className="size-3 text-emerald-500 fill-emerald-500" />
                  ))}
                </div>
                <p className="text-[10px] font-bold text-slate-500">Trustpilot rating: <span className="text-emerald-600">Excellent</span></p>
              </div>
            </div>
          </div>

          {/* The Bar */}
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden relative mb-2">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]"
            />
          </div>

          {/* Step Count Below */}
          <div className="text-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Step {step} of {STEPS_COUNT}</span>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Footer */}
      {step < 12 && (
        <div className="mt-16 flex justify-between items-center px-4">
          <button 
            onClick={handleBack}
            disabled={step === 1}
            className={`
              h-16 px-10 rounded-full font-black text-sm transition-all flex items-center gap-2 border-2
              ${step === 1 ? 'opacity-0 pointer-events-none' : 'border-secondary-500 text-secondary-500 hover:bg-secondary-50'}
            `}
          >
            <ChevronLeft className="size-5" /> Previous Step
          </button>
          
          <AnimatePresence>
            {canContinue() && (
              <motion.button 
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                onClick={handleNext}
                disabled={loading}
                className="h-16 px-14 bg-secondary-500 text-white rounded-full font-black text-lg flex items-center gap-3 hover:bg-secondary-600 transition-all shadow-xl shadow-secondary-500/20 active:scale-95 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Continue'}
                <ArrowRight className="size-6" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

// Sub-components for cleaner structure
const StepContainer = ({ children, title, subtitle }: { children: React.ReactNode, title: string, subtitle: string }) => (
  <div className="max-w-3xl mx-auto">
    <div className="text-center mb-14">
      <h2 className="text-3xl md:text-4xl font-black text-primary-950 tracking-tight mb-4">{title}</h2>
      <p className="text-slate-500 font-medium text-lg leading-relaxed">{subtitle}</p>
    </div>
    {children}
  </div>
)

const SelectionCard = ({ selected, onClick, icon: Icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`
      p-8 rounded-[2.5rem] border-2 transition-all flex flex-col items-center gap-4 group
      ${selected ? 'border-primary-950 bg-primary-50 shadow-xl shadow-primary-950/5' : 'border-slate-100 hover:border-slate-200 bg-white'}
    `}
  >
    <div className={`size-16 rounded-3xl flex items-center justify-center transition-all ${selected ? 'bg-primary-950 text-white shadow-lg' : 'bg-slate-50 text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-600'}`}>
      <Icon className="size-8" />
    </div>
    <span className={`font-bold uppercase tracking-widest text-xs ${selected ? 'text-primary-950' : 'text-slate-400 group-hover:text-slate-900'}`}>{label}</span>
  </button>
)

const InputGroup = ({ label, children }: { label: string, children: React.ReactNode }) => (
  <div className="space-y-3">
    <label className="meave-label">{label}</label>
    {children}
  </div>
)

const NextStepItem = ({ icon: Icon, title, desc }: any) => (
  <div className="flex gap-5">
    <div className="size-12 rounded-2xl bg-white flex items-center justify-center text-primary-600 shadow-sm shrink-0">
      <Icon className="size-6" />
    </div>
    <div>
      <h5 className="font-black text-slate-900 mb-1">{title}</h5>
      <p className="text-sm font-medium text-slate-500 leading-relaxed">{desc}</p>
    </div>
  </div>
)

export default BookingWizard
