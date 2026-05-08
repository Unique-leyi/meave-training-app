import { useState } from 'react'
import { 
  User, 
  Lock, 
  Bell, 
  Shield, 
  BookOpen, 
  Camera,
  CheckCircle2,
  ChevronRight,
  Globe,
  Mail,
  Phone
} from 'lucide-react'
import DashboardCard from '../../ui/components/DashboardCard'

const SettingsManager = () => {
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = [
    { id: 'profile', name: 'Personal Profile', icon: User },
    { id: 'academic', name: 'Academic Prefs', icon: BookOpen },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'notifications', name: 'Notifications', icon: Bell },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Settings</h1>
        <p className="text-slate-500 font-medium mt-1">Manage your account preferences and security settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <DashboardCard className="lg:col-span-4 p-4 bg-white border border-slate-100 shrink-0">
          <div className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-sm
                  ${activeTab === tab.id 
                    ? 'bg-primary-950 text-white shadow-xl shadow-primary-950/20' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
                `}
              >
                <tab.icon className={`size-5 ${activeTab === tab.id ? 'text-secondary-500' : ''}`} />
                {tab.name}
                <ChevronRight className={`size-4 ml-auto opacity-40 ${activeTab === tab.id ? 'block' : 'hidden'}`} />
              </button>
            ))}
          </div>
        </DashboardCard>

        {/* Content Area */}
        <div className="lg:col-span-8 space-y-8">
          {activeTab === 'profile' && (
            <DashboardCard className="p-10 bg-white border border-slate-100">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-12">
                <div className="relative group">
                  <div className="size-32 rounded-[2.5rem] overflow-hidden bg-slate-100 border-4 border-white shadow-xl">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Avatar" className="size-full object-cover" />
                  </div>
                  <button className="absolute -bottom-2 -right-2 size-10 bg-primary-950 text-white rounded-xl flex items-center justify-center border-4 border-white shadow-lg hover:scale-110 transition-transform">
                    <Camera className="size-4" />
                  </button>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-slate-900 mb-1">Alex Williamson</h3>
                  <p className="text-slate-400 font-bold mb-4">Undergraduate Student • #meave-1974</p>
                  <div className="flex gap-3">
                    <button className="px-5 py-2 bg-slate-50 text-slate-900 rounded-xl font-bold text-xs hover:bg-slate-100 transition-colors">Update Photo</button>
                    <button className="px-5 py-2 text-rose-500 rounded-xl font-bold text-xs hover:bg-rose-50 transition-colors">Remove</button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="meave-label">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-300" />
                    <input type="text" defaultValue="Alex Williamson" className="meave-input pl-12" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="meave-label">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-300" />
                    <input type="email" defaultValue="alex.williams@example.com" className="meave-input pl-12" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="meave-label">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-300" />
                    <input type="text" defaultValue="+44 7700 900342" className="meave-input pl-12" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="meave-label">Location / Timezone</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-300" />
                    <select className="meave-input pl-12 appearance-none">
                      <option>London (GMT +0)</option>
                      <option>Paris (GMT +1)</option>
                      <option>New York (GMT -5)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-50 flex justify-end">
                <button className="h-14 px-8 bg-primary-950 text-white rounded-2xl font-black flex items-center gap-2 hover:bg-primary-900 transition-all shadow-xl shadow-primary-950/20 active:scale-95">
                  Save All Changes
                  <CheckCircle2 className="size-5" />
                </button>
              </div>
            </DashboardCard>
          )}

          {activeTab === 'academic' && (
            <DashboardCard className="p-10 bg-white border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-8">Academic Preferences</h3>
              <div className="space-y-8">
                <div>
                  <label className="meave-label mb-4">Interests & Subjects</label>
                  <div className="flex flex-wrap gap-3">
                    {['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'Biology'].map((s) => (
                      <button key={s} className="px-5 py-2.5 bg-primary-50 text-primary-600 rounded-xl text-sm font-bold border border-primary-100 flex items-center gap-2">
                        {s} <div className="size-1.5 bg-primary-500 rounded-full" />
                      </button>
                    ))}
                    <button className="px-5 py-2.5 bg-slate-50 text-slate-400 rounded-xl text-sm font-bold border border-slate-100 border-dashed hover:border-primary-200 hover:text-primary-600 transition-colors">
                      + Add Subject
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <h4 className="font-bold text-slate-900">Learning Intensity</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">How often do you want to be reminded about goals?</p>
                    <div className="space-y-2">
                      {['Standard', 'Accelerated', 'Intensive'].map((l) => (
                        <button key={l} className={`w-full h-11 rounded-xl flex items-center justify-between px-4 font-bold text-xs transition-all ${l === 'Accelerated' ? 'bg-primary-950 text-white' : 'bg-white border border-slate-100 text-slate-500'}`}>
                          {l}
                          {l === 'Accelerated' && <CheckCircle2 className="size-4 text-secondary-500" />}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <h4 className="font-bold text-slate-900">Preferred Session Type</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">Default booking preference for new sessions.</p>
                    <div className="space-y-2">
                      {['Fully Online', 'In-Person (Hybrid)', 'Physical Only'].map((l) => (
                        <button key={l} className={`w-full h-11 rounded-xl flex items-center justify-between px-4 font-bold text-xs transition-all ${l === 'Fully Online' ? 'bg-primary-950 text-white' : 'bg-white border border-slate-100 text-slate-500'}`}>
                          {l}
                          {l === 'Fully Online' && <CheckCircle2 className="size-4 text-secondary-500" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </DashboardCard>
          )}

          {activeTab === 'security' && (
            <DashboardCard className="p-10 bg-white border border-slate-100">
              <div className="flex items-center gap-4 mb-10">
                <div className="size-14 rounded-2xl bg-slate-50 flex items-center justify-center text-primary-600">
                  <Shield className="size-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Security & Privacy</h3>
                  <p className="text-sm font-medium text-slate-400">Manage your password and authentication methods.</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="meave-label">Current Password</label>
                    <input type="password" placeholder="••••••••••••" className="meave-input" />
                  </div>
                  <div className="space-y-2">
                    <label className="meave-label">New Password</label>
                    <input type="password" placeholder="••••••••••••" className="meave-input" />
                  </div>
                </div>
                <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="size-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                      <Shield className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Two-Factor Authentication</p>
                      <p className="text-xs text-emerald-600 font-medium">Enabled via Authenticator App</p>
                    </div>
                  </div>
                  <button className="text-xs font-black text-emerald-700 hover:underline">Configure</button>
                </div>
              </div>
            </DashboardCard>
          )}
        </div>
      </div>
    </div>
  )
}

export default SettingsManager
