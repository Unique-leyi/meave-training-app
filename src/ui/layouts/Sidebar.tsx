import { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  UserCircle
} from 'lucide-react'
import { studentNavItems, secondaryStudentNavItems, tutorNavItems } from '../../data/navigation'
import Button from '../../ui/components/Button'

import { useAuth } from '../../context/AuthContext'

const Sidebar = ({ onNavigate }: { onNavigate?: () => void }) => {
  const navigate = useNavigate()
  const { role, setIsAuthenticated, setRole } = useAuth()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  
  const userRole = role || 'student'

  const navItems = userRole === 'tutor' ? tutorNavItems : studentNavItems
  const secondaryItems = userRole === 'tutor' ? [] : secondaryStudentNavItems

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoggingOut(false)
    setIsAuthenticated(false)
    setRole(null)
    navigate('/signin')
  }

  return (
    <motion.aside 
      animate={{ width: isCollapsed ? 80 : 220 }}
      className="flex flex-col text-white py-6 shrink-0 relative transition-all duration-300 ease-in-out z-40 bg-primary-950"
    >
      {/* Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 size-6 bg-secondary-500 rounded-full flex items-center justify-center border-2 border-primary-950 text-white z-50 hover:scale-110 transition-transform shadow-lg"
      >
        {isCollapsed ? <ChevronRight className="size-3" /> : <ChevronLeft className="size-3" />}
      </button>

      {/* Brand Logo */}
      <div className={`px-6 mb-10 flex flex-col ${isCollapsed ? 'items-center' : 'items-start'} gap-4`}>
        <div className="flex items-center gap-3">
          <div className="size-9 bg-secondary-500 rounded-[1rem] flex items-center justify-center shrink-0 shadow-lg shadow-secondary-500/20">
            <div className="size-4 bg-white rounded-sm transform rotate-45" />
          </div>
          {!isCollapsed && (
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-black tracking-tighter whitespace-nowrap"
            >
              Meave<span className="text-secondary-500">Portal</span>
            </motion.h1>
          )}
        </div>
        
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`
              px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-[0.15em]
              ${userRole === 'tutor' 
                ? 'bg-secondary-500/10 text-secondary-500 border border-secondary-500/20' 
                : 'bg-primary-500/10 text-primary-400 border border-primary-500/10'}
            `}
          >
            {userRole === 'tutor' ? 'Tutor Portal' : 'Student Portal'}
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 space-y-1 overflow-y-auto no-scrollbar overflow-x-hidden pb-10">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={({ isActive }) => `
              flex items-center transition-all group relative
              ${isCollapsed 
                ? isActive 
                  ? 'h-14 ml-4 rounded-l-[2rem] bg-white text-secondary-500 mb-4' 
                  : 'size-12 justify-center mx-auto mb-4 text-primary-400 hover:text-white hover:bg-white/5 rounded-2xl'
                : isActive
                  ? 'px-4 py-4 mb-2 ml-4 bg-white text-secondary-500 rounded-l-[2rem]'
                  : 'px-4 py-4 mb-2 mx-4 text-primary-400 hover:text-white hover:bg-white/5 rounded-2xl'
              }
            `}
            title={isCollapsed ? item.name : ''}
          >
            {({ isActive }) => (
              <>
                {/* Inverted Corner Top */}
                {isActive && (
                  <div className="absolute right-0 -top-5 size-5 bg-white pointer-events-none">
                    <div className="size-full bg-primary-950 rounded-br-[1.25rem]" />
                  </div>
                )}

                <div className={`flex items-center gap-3 ${isCollapsed ? 'w-full justify-center pr-4' : ''}`}>
                  <item.icon className={`size-5 shrink-0 transition-colors ${isActive ? 'text-secondary-500' : ''}`} />
                  {!isCollapsed && <span className="font-bold text-sm whitespace-nowrap">{item.name}</span>}
                </div>
                

                {/* Inverted Corner Bottom */}
                {isActive && (
                  <div className="absolute right-0 -bottom-5 size-5 bg-white pointer-events-none">
                    <div className="size-full bg-primary-950 rounded-tr-[1.25rem]" />
                  </div>
                )}
                
                {/* Badge Dot */}
                {item.badge && (
                  <div className={`
                    absolute flex items-center justify-center bg-secondary-500 text-white font-black rounded-full border-2 border-primary-950
                    ${isCollapsed ? 'top-2 right-2 size-2' : 'right-6 size-5 text-[10px]'}
                  `}>
                    {!isCollapsed && item.badge}
                  </div>
                )}
              </>
            )}
          </NavLink>
        ))}

        {/* Combined Secondary Links */}
        {secondaryItems.length > 0 && (
          <div className="pt-6 mt-6 border-t border-white/5 space-y-1">
            {secondaryItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onNavigate}
                className={({ isActive }) => `
                  flex items-center transition-all group relative
                  ${isCollapsed 
                    ? isActive 
                      ? 'h-14 ml-4 rounded-l-[2rem] bg-white text-secondary-500 mb-4' 
                      : 'size-12 justify-center mx-auto mb-4 text-primary-400 hover:text-white hover:bg-white/5 rounded-2xl'
                    : isActive
                      ? 'px-4 py-4 mb-2 ml-4 bg-white text-secondary-500 rounded-l-[2rem]'
                      : 'px-4 py-4 mb-2 mx-4 text-primary-400 hover:text-white hover:bg-white/5 rounded-2xl'
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <div className="absolute right-0 -top-5 size-5 bg-white pointer-events-none">
                        <div className="size-full bg-primary-950 rounded-br-[1.25rem]" />
                      </div>
                    )}
                    <div className={`flex items-center gap-3 ${isCollapsed ? 'w-full justify-center pr-4' : ''}`}>
                      <item.icon className={`size-5 shrink-0 transition-colors ${isActive ? 'text-secondary-500' : ''}`} />
                      {!isCollapsed && <span className="font-bold text-sm whitespace-nowrap">{item.name}</span>}
                    </div>
                    {isActive && (
                      <div className="absolute right-0 -bottom-5 size-5 bg-white pointer-events-none">
                        <div className="size-full bg-primary-950 rounded-tr-[1.25rem]" />
                      </div>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="px-4">

        {/* User Account */}
        <div className={`
          bg-white/5 rounded-3xl border border-white/10 flex items-center transition-all overflow-hidden
          ${isCollapsed ? 'justify-center size-12 mx-auto' : 'p-3 justify-between'}
        `}>
          <div className="flex items-center gap-3 min-w-0">
            <div className="size-8 rounded-full bg-secondary-500 flex items-center justify-center font-bold text-xs shrink-0">
              AW
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <p className="text-xs font-bold truncate">Alex Williamson</p>
                <p className="text-[9px] text-primary-400 font-medium tracking-tight truncate">#meave-1974</p>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <button 
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="p-2 text-primary-500 hover:text-white transition-colors flex items-center justify-center relative"
            >
              {isLoggingOut ? (
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <LogOut className="size-4 opacity-50" />
                </motion.div>
              ) : (
                <LogOut className="size-4" />
              )}
            </button>
          )}
        </div>
      </div>
    </motion.aside>
  )
}

export default Sidebar