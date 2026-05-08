import { useState } from 'react'
import { 
  Star, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  MessageSquare, 
  ShieldCheck, 
  User, 
  BookOpen, 
  Calendar, 
  Clock,
  Sparkles,
  Zap,
  Target,
  Info,
  Send,
  ArrowRight,
  Heart,
  Layout
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import DashboardCard from '../../ui/components/DashboardCard'

const SessionReview = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    rating: 0,
    clarity: 0,
    engagement: 0,
    support: 0,
    structure: 0,
    confidenceImproved: null as boolean | null,
    understandingImproved: null as boolean | null,
    motivationImproved: null as boolean | null,
    goalHelpfulness: null as boolean | null,
    strengths: [] as string[],
    publicFeedback: '',
    privateFeedback: '',
    goodFit: null as boolean | null
  })

  const sessionInfo = {
    tutor: 'Dr. Sarah Wilson',
    subject: 'A-Level Mathematics',
    date: 'May 24, 2026',
    duration: '60 minutes',
    student: 'Andrew Williamson',
    img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    role: 'Ph.D. Mathematics, Oxford'
  }

  const strengths = [
    'Patient teaching style',
    'Great for younger learners',
    'Excellent for exam preparation',
    'Good with shy students',
    'Strong communication',
    'Encouraging',
    'Structured lessons',
    'Great for ADHD support',
    'Good at simplifying concepts',
    'Interactive teaching style'
  ]

  const handleSubmit = () => {
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true)
    }, 1500)
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto pt-20 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="size-24 bg-emerald-500 text-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/20"
        >
          <CheckCircle2 className="size-12" />
        </motion.div>
        <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Thank you for your feedback!</h2>
        <p className="text-slate-500 font-medium mb-10 max-w-md mx-auto">
          Your insights help us improve the learning experience and match students with the best possible tutors.
        </p>
        <button className="h-14 px-10 bg-primary-950 text-white rounded-2xl font-black text-sm hover:scale-105 transition-all shadow-xl shadow-primary-950/20 flex items-center gap-3 mx-auto">
          Back to Dashboard
          <ArrowRight className="size-4" />
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto pb-24">
      {/* 1. TUTOR PROFILE HERO */}
      <div className="mb-12 relative overflow-hidden rounded-[3rem]">
        <div className="absolute inset-0 bg-primary-950 z-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-900/50 to-transparent" />
          <div className="absolute -bottom-24 -left-24 size-64 bg-secondary-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="relative">
            <div className="size-32 md:size-40 rounded-[2.5rem] overflow-hidden border-4 border-white/10 shadow-2xl relative z-10">
              <img src={sessionInfo.img} alt={sessionInfo.tutor} className="size-full object-cover" />
            </div>
            <div className="absolute -bottom-2 -right-2 size-12 bg-secondary-500 rounded-2xl flex items-center justify-center border-4 border-primary-950 z-20 shadow-lg">
              <CheckCircle2 className="size-6 text-white" />
            </div>
          </div>

          <div className="text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-3">
              <span className="px-4 py-1.5 bg-white/10 text-white rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">Past Session</span>
              <span className="px-4 py-1.5 bg-secondary-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest">A-Level Mathematics</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">{sessionInfo.tutor}</h1>
            <p className="text-primary-200 font-medium text-lg mb-6">{sessionInfo.role}</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-white/60">
                <Calendar className="size-4 text-secondary-500" />
                <span className="text-sm font-bold">{sessionInfo.date}</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <Clock className="size-4 text-secondary-500" />
                <span className="text-sm font-bold">{sessionInfo.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <User className="size-4 text-secondary-500" />
                <span className="text-sm font-bold">Andrew Williamson</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* PROGRESS NAV (DESKTOP) */}
        <div className="hidden lg:block lg:col-span-3 sticky top-8">
          <div className="space-y-1">
            {[
              { id: 'experience', label: 'Overall Experience', icon: Sparkles },
              { id: 'growth', label: 'Learning Growth', icon: Target },
              { id: 'style', label: 'Teaching Style', icon: Zap },
              { id: 'feedback', label: 'Written Feedback', icon: MessageSquare },
            ].map((section, idx) => (
              <div key={section.id} className="group flex items-center gap-4 py-3 px-4 rounded-2xl transition-all hover:bg-slate-50">
                <div className="size-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary-600 transition-colors shadow-sm">
                  <section.icon className="size-5" />
                </div>
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-900 transition-colors">{section.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FEEDBACK FORM SECTIONS */}
        <div className="lg:col-span-9 space-y-12">
          
          {/* SECTION 1: OVERALL EXPERIENCE */}
          <section id="experience">
            <DashboardCard className="p-10 bg-white border border-slate-100 overflow-visible relative">
              <div className="absolute -top-6 -left-6 size-12 bg-primary-950 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-xl">1</div>
              
              <div className="mb-12 text-center">
                <h3 className="text-2xl font-black text-slate-900 mb-6">How was your overall experience?</h3>
                <div className="flex items-center justify-center gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className={`p-1.5 transition-all transform active:scale-90 ${formData.rating >= star ? 'scale-110' : 'hover:scale-110 opacity-30 hover:opacity-100'}`}
                    >
                      <Star className={`size-14 ${formData.rating >= star ? 'text-secondary-500 fill-secondary-500 drop-shadow-xl' : 'text-slate-300'}`} />
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Select a star rating</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-slate-50">
                {[
                  { id: 'clarity', label: 'Tutor explained concepts clearly', icon: BookOpen },
                  { id: 'engagement', label: 'Session was engaging & interactive', icon: Zap },
                  { id: 'support', label: 'Student felt supported & heard', icon: Heart },
                  { id: 'structure', label: 'Lesson felt well-structured', icon: Layout },
                ].map((q) => (
                  <div key={q.id} className="space-y-4">
                    <div className="flex items-center gap-2">
                      <q.icon className="size-4 text-primary-500" />
                      <p className="text-xs font-black text-slate-600 uppercase tracking-widest">{q.label}</p>
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button
                          key={val}
                          onClick={() => setFormData({ ...formData, [q.id]: val })}
                          className={`flex-1 h-12 rounded-xl border-2 font-black text-sm transition-all ${formData[q.id as keyof typeof formData] === val ? 'bg-primary-950 border-primary-950 text-white shadow-lg' : 'border-slate-100 text-slate-400 hover:border-slate-200 bg-white'}`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </DashboardCard>
          </section>

          {/* SECTION 2: LEARNING GROWTH */}
          <section id="growth">
            <DashboardCard className="p-10 bg-white border border-slate-100 overflow-visible relative">
              <div className="absolute -top-6 -left-6 size-12 bg-primary-950 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-xl">2</div>
              <div className="mb-8">
                <h3 className="text-2xl font-black text-slate-900 mb-2">Learning Growth</h3>
                <p className="text-slate-500 font-medium">Evaluate the educational impact of this session.</p>
              </div>

              <div className="space-y-4">
                {[
                  { id: 'confidenceImproved', label: 'Did the student\'s confidence improve?' },
                  { id: 'understandingImproved', label: 'Did their understanding of the topic improve?' },
                  { id: 'motivationImproved', label: 'Did the student feel more motivated?' },
                  { id: 'goalHelpfulness', label: 'Was the session helpful toward academic goals?' },
                ].map((q) => (
                  <div key={q.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100 transition-all hover:bg-white hover:shadow-lg group">
                    <p className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">{q.label}</p>
                    <div className="flex gap-3">
                      {[
                        { label: 'Yes', val: true, color: 'bg-emerald-500' },
                        { label: 'No', val: false, color: 'bg-rose-500' },
                      ].map((btn) => (
                        <button
                          key={btn.label}
                          onClick={() => setFormData({ ...formData, [q.id]: btn.val })}
                          className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${formData[q.id as keyof typeof formData] === btn.val ? `${btn.color} border-${btn.color} text-white shadow-xl` : 'border-white bg-white text-slate-400 hover:border-slate-200 shadow-sm'}`}
                        >
                          {btn.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </DashboardCard>
          </section>

          {/* SECTION 3: TEACHING STYLE */}
          <section id="style">
            <DashboardCard className="p-10 bg-white border border-slate-100 overflow-visible relative">
              <div className="absolute -top-6 -left-6 size-12 bg-primary-950 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-xl">3</div>
              <div className="mb-8">
                <h3 className="text-2xl font-black text-slate-900 mb-2">Tutor Compatibility & Style</h3>
                <p className="text-slate-500 font-medium">What teaching strengths best describe this tutor?</p>
              </div>

              <div className="flex flex-wrap gap-3">
                {strengths.map((s) => {
                  const isSelected = formData.strengths.includes(s)
                  return (
                    <button
                      key={s}
                      onClick={() => {
                        const newS = isSelected ? formData.strengths.filter(x => x !== s) : [...formData.strengths, s]
                        setFormData({ ...formData, strengths: newS })
                      }}
                      className={`px-6 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest border-2 transition-all flex items-center gap-2 ${isSelected ? 'bg-primary-950 border-primary-950 text-white shadow-xl translate-y-[-2px]' : 'border-slate-100 text-slate-500 hover:border-slate-200 bg-white'}`}
                    >
                      {isSelected && <Zap className="size-3 text-secondary-500" />}
                      {s}
                    </button>
                  )
                })}
              </div>
            </DashboardCard>
          </section>

          {/* SECTION 4: WRITTEN FEEDBACK */}
          <section id="feedback">
            <DashboardCard className="p-10 bg-white border border-slate-100 overflow-visible relative">
              <div className="absolute -top-6 -left-6 size-12 bg-primary-950 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-xl">4</div>
              <div className="mb-8">
                <h3 className="text-2xl font-black text-slate-900 mb-2">Your Words</h3>
                <p className="text-slate-500 font-medium">Share your thoughts with the tutor and our team.</p>
              </div>

              <div className="space-y-8">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Public Review</label>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">Visible to others</span>
                  </div>
                  <textarea 
                    placeholder="What stood out most about this session or tutor? Your words help other parents find the right match."
                    value={formData.publicFeedback}
                    onChange={(e) => setFormData({ ...formData, publicFeedback: e.target.value })}
                    className="w-full h-40 p-6 bg-slate-50 border border-slate-100 rounded-[2.5rem] text-sm font-medium outline-none focus:border-primary-500 focus:bg-white transition-all resize-none shadow-inner"
                  />
                </div>

                <div className="p-8 bg-amber-50 rounded-[3rem] border border-amber-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <ShieldCheck className="size-24 text-amber-900" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="size-10 bg-amber-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                        <ShieldCheck className="size-6" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-amber-900 uppercase tracking-widest">Private Feedback</h4>
                        <p className="text-[10px] font-bold text-amber-600">Strictly confidential • Meave Team Only</p>
                      </div>
                    </div>
                    <textarea 
                      placeholder="Is there anything sensitive you'd like to share privately? Safeguarding, concerns, or special requests."
                      value={formData.privateFeedback}
                      onChange={(e) => setFormData({ ...formData, privateFeedback: e.target.value })}
                      className="w-full h-32 p-6 bg-white border border-amber-200 rounded-[2rem] text-sm font-medium outline-none focus:border-amber-400 transition-all resize-none shadow-sm placeholder:text-slate-300"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-10 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-4">
                  <div className="size-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                    <CheckCircle2 className="size-6" />
                  </div>
                  <p className="text-[11px] font-bold text-slate-500 max-w-[240px] leading-relaxed">
                    By submitting, you help us maintain a high standard of education for everyone.
                  </p>
                </div>
                <button 
                  onClick={handleSubmit}
                  className="w-full md:w-auto h-20 px-16 bg-primary-950 text-white rounded-3xl font-black text-lg hover:scale-105 transition-all shadow-2xl shadow-primary-950/20 flex items-center justify-center gap-4 group"
                >
                  Submit Feedback
                  <Send className="size-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-secondary-500" />
                </button>
              </div>
            </DashboardCard>
          </section>

        </div>
      </div>
    </div>
  )
}

export default SessionReview
