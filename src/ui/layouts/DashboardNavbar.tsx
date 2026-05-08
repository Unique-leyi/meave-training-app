import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Bell, MessageSquare, Search, Menu, User as UserIcon, LogOut, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const DashboardNavbar = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)
  
  // Mock User Data
  const user = {
    fullname: 'Andrew Williamson',
    email: 'andrew.w@meave.edu',
    profile_photo_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andrew'
  }
  const isLoading = false

  const handleSettings = () => {
    navigate('/settings')
    setShowDropdown(false)
  }

  const onLogout = () => {
    console.log('Logging out...')
    navigate('/signin')
  }

  const getPageTitle = (path: string) => {
    if (path.includes('/review/')) return 'Learning Feedback'
    switch (path) {
      case '/dashboard': return 'Dashboard'
      case '/sessions': return 'My Sessions'
      case '/session-requests': return 'Session Requests'
      case '/book-session': return 'Book a Session'
      case '/calendar': return 'My Calendar'
      case '/progress': return 'Learning Progress'
      case '/payments': return 'Billing & Payments'
      case '/messages': return 'Messages'
      case '/notifications': return 'Notifications'
      case '/settings': return 'Settings'
      case '/support': return 'Support Center'
      case '/students': return 'My Students'
      case '/earnings': return 'Earnings & Payouts'
      case '/analytics': return 'Teaching Analytics'
      case '/resources': return 'Resources'
      default: return 'Dashboard'
    }
  }

  const title = getPageTitle(location.pathname)

  return (
    <header className="h-16 lg:h-20 flex items-center justify-between px-4 md:px-10 shrink-0 relative">
      {/* Mobile Menu Trigger */}
      <button 
        onClick={onMenuClick}
        className="size-10 lg:hidden flex items-center justify-center text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
      >
        <Menu className="size-6" />
      </button>

      {/* Page Title */}
      <div className="flex-1 ml-4 lg:ml-0">
        <h2 className="text-lg font-black text-slate-900 tracking-tight">{title}</h2>
      </div>
      
      {/* Actions Hub */}
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="hidden md:flex items-center relative group">
          <input 
            type="text" 
            placeholder="Search activities..." 
            className="h-11 w-64 pl-5 pr-12 bg-slate-50 border-none rounded-full text-sm font-medium focus:ring-2 focus:ring-primary-500/10 transition-all placeholder:text-slate-400"
          />
          <Search className="absolute right-4 size-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="size-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-600 hover:bg-primary-50 hover:text-primary-600 transition-all">
            <MessageSquare className="size-5" />
          </button>
          
          <button className="size-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-600 hover:bg-primary-50 hover:text-primary-600 transition-all relative">
            <Bell className="size-5" />
            <div className="absolute top-2.5 right-2.5 size-2.5 bg-red-500 rounded-full border-2 border-white" />
          </button>
        </div>

        {/* Profile Section with Dropdown */}
        <div className="relative">
          <div 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 border-l border-slate-100 pl-6 cursor-pointer group"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{user.fullname}</p>
            </div>
            <div className="size-10 rounded-full bg-emerald-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm transition-transform active:scale-95">
              <img 
                src={user.profile_photo_url} 
                alt="User" 
                className="size-full object-cover"
              />
            </div>
          </div>

          {/* High-Fidelity Dropdown */}
          <AnimatePresence>
            {showDropdown && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-4 w-72 bg-white rounded-[2rem] shadow-2xl border border-slate-100 z-50 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-50">
                      <div className="size-14 rounded-2xl bg-primary-50 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm shrink-0">
                        {user.profile_photo_url ? (
                          <img src={user.profile_photo_url} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <UserIcon className="size-6 text-primary-500" />
                        )}
                      </div>
                      
                      <div className="min-w-0">
                        <h3 className="text-base font-black text-slate-900 truncate tracking-tight">
                          {isLoading ? 'Loading...' : (user.fullname || 'CloudVantage User')}
                        </h3>
                        <p className="text-xs font-bold text-slate-400 truncate">
                          {isLoading ? '' : (user.email || 'N/A')}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button 
                        onClick={handleSettings}
                        className="w-full h-12 px-4 bg-slate-50 hover:bg-primary-50 text-slate-900 rounded-xl flex items-center justify-between group transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <UserIcon className="size-4 text-slate-400 group-hover:text-primary-600" />
                          <span className="text-sm font-bold group-hover:text-primary-600">View Profile</span>
                        </div>
                        <ChevronRight className="size-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button 
                        onClick={() => {
                          onLogout();
                          setShowDropdown(false);
                        }}
                        className="w-full h-12 px-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl flex items-center gap-3 group transition-all"
                      >
                        <LogOut className="size-4" />
                        <span className="text-sm font-black">Logout</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}

export default DashboardNavbar