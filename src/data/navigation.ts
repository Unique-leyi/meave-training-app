import { 
  LayoutDashboard, 
  Calendar, 
  PlusCircle, 
  TrendingUp, 
  CreditCard, 
  MessageSquare, 
  Bell,
  Settings,
  HelpCircle,
  Users,
  BookOpen,
  Wallet,
  GraduationCap,
  PieChart,
  Clock
} from 'lucide-react'

export const studentNavItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'My Sessions', icon: Calendar, path: '/sessions' },
  { name: 'Messages', icon: MessageSquare, path: '/messages', badge: '2' },
  { name: 'Progress', icon: TrendingUp, path: '/progress' },
  { name: 'Payments', icon: CreditCard, path: '/payments' },
  { name: 'Notifications', icon: Bell, path: '/notifications', badge: '5' },
]

export const secondaryStudentNavItems = [
  { name: 'Settings', icon: Settings, path: '/settings' },
  { name: 'Help & Support', icon: HelpCircle, path: '/support' },
]

export const tutorNavItems = [
  { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Requests', icon: PlusCircle, path: '/session-requests', badge: '2' },
  { name: 'Sessions', icon: Calendar, path: '/sessions' },
  { name: 'My Students', icon: GraduationCap, path: '/students' },
  { name: 'Availability', icon: Clock, path: '/calendar' },
  { name: 'Earnings', icon: Wallet, path: '/earnings' },
  { name: 'Analytics', icon: PieChart, path: '/analytics' },
  { name: 'Resources', icon: BookOpen, path: '/resources' },
]
