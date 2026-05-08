import { useState } from 'react'
import { 
  User, 
  BookOpen, 
  GraduationCap, 
  Briefcase, 
  FileText, 
  Upload, 
  Plus, 
  CheckCircle2, 
  ShieldCheck,
  Globe,
  Camera,
  Trash2
} from 'lucide-react'
import DashboardCard from '../../ui/components/DashboardCard'

const TutorProfileEditor = () => {
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = [
    { id: 'profile', name: 'Basic Info', icon: User },
    { id: 'academic', name: 'Qualifications', icon: GraduationCap },
    { id: 'subjects', name: 'Subjects', icon: BookOpen },
    { id: 'documents', name: 'Verification', icon: ShieldCheck },
  ]

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Professional Profile</h1>
          <p className="text-slate-500 font-medium mt-1">Manage your credentials and how students see you.</p>
        </div>
        <div className="flex gap-3">
          <button className="h-12 px-6 bg-slate-50 border border-slate-200 rounded-2xl font-black text-slate-900 text-sm hover:bg-white hover:shadow-lg transition-all active:scale-95">
            Preview Profile
          </button>
          <button className="h-12 px-7 bg-primary-950 text-white rounded-2xl font-black text-sm hover:bg-primary-900 transition-all shadow-xl shadow-primary-950/20 active:scale-95">
            Save All Changes
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-[2rem] w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center gap-2 px-6 py-2.5 rounded-3xl text-xs font-black transition-all
              ${activeTab === tab.id 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-500 hover:text-slate-900'}
            `}
          >
            <tab.icon className="size-4" />
            {tab.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">
          {activeTab === 'profile' && (
            <DashboardCard className="p-8 bg-white border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-8">Personal Details</h3>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
                  <div className="relative group">
                    <div className="size-32 rounded-[2.5rem] bg-slate-100 overflow-hidden border-4 border-white shadow-xl relative z-10">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Profile" className="size-full object-cover" />
                    </div>
                    <button className="absolute -bottom-2 -right-2 size-10 bg-primary-950 text-white rounded-2xl flex items-center justify-center shadow-xl z-20 hover:scale-110 transition-transform">
                      <Camera className="size-4" />
                    </button>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block ml-2">Professional Headline</label>
                      <input type="text" defaultValue="Ph.D. Mathematics, Oxford | 10+ Years Experience" className="w-full h-12 bg-slate-50 border border-slate-100 rounded-2xl px-5 text-sm font-bold text-slate-900 outline-none focus:border-primary-500 transition-all" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block ml-2">Bio / Teaching Philosophy</label>
                      <textarea rows={4} className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] p-5 text-sm font-medium text-slate-600 outline-none focus:border-primary-500 transition-all resize-none leading-relaxed">
                        I specialize in breaking down complex mathematical concepts into intuitive visual models. My goal is to build long-term problem-solving confidence...
                      </textarea>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block ml-2">Display Name</label>
                    <input type="text" defaultValue="Dr. Sarah Wilson" className="w-full h-12 bg-slate-50 border border-slate-100 rounded-2xl px-5 text-sm font-bold text-slate-900 outline-none focus:border-primary-500 transition-all" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block ml-2">Location</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                      <input type="text" defaultValue="London, UK (Online Only)" className="w-full h-12 bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-5 text-sm font-bold text-slate-900 outline-none focus:border-primary-500 transition-all" />
                    </div>
                  </div>
                </div>
              </div>
            </DashboardCard>
          )}

          {activeTab === 'academic' && (
            <DashboardCard className="p-8 bg-white border border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">Academic History</h3>
                <button className="text-xs font-black text-primary-600 flex items-center gap-1.5 hover:underline">
                  <Plus className="size-4" /> Add Qualification
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { title: 'Ph.D. in Pure Mathematics', school: 'University of Oxford', year: '2012 - 2016', icon: GraduationCap },
                  { title: 'M.Sc. in Applied Mathematics', school: 'Imperial College London', year: '2010 - 2012', icon: Briefcase },
                ].map((edu, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 group">
                    <div className="flex items-center gap-5">
                      <div className="size-12 bg-white rounded-2xl flex items-center justify-center text-primary-600 shadow-sm border border-slate-100">
                        <edu.icon className="size-6" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{edu.title}</p>
                        <p className="text-xs font-medium text-slate-400">{edu.school} • {edu.year}</p>
                      </div>
                    </div>
                    <button className="p-2 rounded-xl text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all">
                      <Trash2 className="size-5" />
                    </button>
                  </div>
                ))}
              </div>
            </DashboardCard>
          )}

          {activeTab === 'subjects' && (
            <DashboardCard className="p-8 bg-white border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-8">Subjects & Specialisms</h3>
              <div className="space-y-8">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block ml-2">Active Subjects</label>
                  <div className="flex flex-wrap gap-3">
                    {['A-Level Mathematics', 'Further Maths', 'Calculus', 'Linear Algebra', 'GCSE Physics'].map((s) => (
                      <div key={s} className="flex items-center gap-2 bg-primary-950 text-white px-5 py-3 rounded-2xl shadow-lg shadow-primary-950/10 transition-all hover:scale-105">
                        <span className="text-xs font-black">{s}</span>
                        <button className="text-white/40 hover:text-white"><Trash2 className="size-3.5" /></button>
                      </div>
                    ))}
                    <button className="px-5 py-3 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-xs font-black flex items-center gap-2 hover:border-primary-500 hover:text-primary-500 hover:bg-primary-50 transition-all">
                      <Plus className="size-4" /> Add New
                    </button>
                  </div>
                </div>
              </div>
            </DashboardCard>
          )}

          {activeTab === 'documents' && (
            <DashboardCard className="p-8 bg-white border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-8">Verification Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: 'Identity Proof (Passport)', status: 'verified', date: 'Oct 2024' },
                  { name: 'Enhanced DBS Check', status: 'verified', date: 'Jan 2025' },
                  { name: 'Degree Certificate', status: 'pending', date: 'Uploaded today' },
                ].map((doc, i) => (
                  <div key={i} className="p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="size-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 shadow-sm">
                        <FileText className="size-6" />
                      </div>
                      <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${doc.status === 'verified' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                        {doc.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-900">{doc.name}</p>
                      <p className="text-[10px] font-medium text-slate-400">{doc.date}</p>
                    </div>
                    <button className="w-full py-2.5 bg-white border border-slate-100 rounded-xl text-[10px] font-black text-slate-400 hover:text-slate-900 hover:border-slate-200 transition-all uppercase tracking-widest">
                      Replace File
                    </button>
                  </div>
                ))}
                <button className="border-2 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-slate-400 hover:border-primary-500 hover:text-primary-500 hover:bg-primary-50 transition-all group">
                  <div className="size-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="size-6" />
                  </div>
                  <p className="text-xs font-black uppercase tracking-widest">Upload New File</p>
                </button>
              </div>
            </DashboardCard>
          )}
        </div>

        {/* Sidebar Status */}
        <div className="lg:col-span-4 space-y-8">
          <DashboardCard className="p-8 bg-primary-950 text-white border-none shadow-2xl shadow-primary-950/20">
            <h3 className="text-lg font-black tracking-tight mb-6 flex items-center gap-3">
              <ShieldCheck className="size-5 text-secondary-500" />
              Profile Health
            </h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-60">
                  <span>Completion</span>
                  <span>85%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-secondary-500" style={{ width: '85%' }} />
                </div>
              </div>
              <ul className="space-y-4">
                {[
                  { label: 'Identity Verified', ok: true },
                  { label: 'Professional Bio', ok: true },
                  { label: 'Qualifications Uploaded', ok: true },
                  { label: 'Teaching Specialisms', ok: false },
                ].map((step, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className={`size-5 rounded-lg flex items-center justify-center ${step.ok ? 'bg-emerald-500' : 'bg-white/10'}`}>
                      <CheckCircle2 className={`size-3.5 ${step.ok ? 'text-white' : 'text-white/20'}`} />
                    </div>
                    <span className={`text-xs font-bold ${step.ok ? 'text-white' : 'text-white/40'}`}>{step.label}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-white/10">
                <p className="text-[10px] font-medium text-primary-300 leading-relaxed">
                  A complete profile is 4x more likely to attract new students. Finish your specialisms to go live!
                </p>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  )
}

export default TutorProfileEditor
