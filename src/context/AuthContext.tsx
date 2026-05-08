import React, { createContext, useContext, useState, useEffect } from 'react'

type Role = 'student' | 'tutor' | null

interface AuthContextType {
  role: Role
  setRole: (role: Role) => void
  isAuthenticated: boolean
  setIsAuthenticated: (val: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<Role>(() => {
    return (localStorage.getItem('meave_user_role') as Role) || null
  })
  const [isAuthenticated, setIsAuthenticatedState] = useState(() => {
    return localStorage.getItem('meave_is_authenticated') === 'true'
  })

  const setRole = (newRole: Role) => {
    setRoleState(newRole)
    if (newRole) localStorage.setItem('meave_user_role', newRole)
    else localStorage.removeItem('meave_user_role')
  }

  const setIsAuthenticated = (val: boolean) => {
    setIsAuthenticatedState(val)
    localStorage.setItem('meave_is_authenticated', String(val))
  }

  return (
    <AuthContext.Provider value={{ role, setRole, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
