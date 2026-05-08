import StudentDashboard from '../features/Dashboard/StudentDashboard'
import TutorDashboard from '../features/Dashboard/TutorDashboard'
import { useAuth } from '../context/AuthContext'
import SpinnerOverlay from '../ui/components/SpinnerOverlay'

const DashboardHome = () => {
  const { role, isAuthenticated } = useAuth()
  
  // If authenticated but no role yet, show loader (could be a race condition during redirection)
  if (isAuthenticated && !role) {
    return <SpinnerOverlay />
  }

  // Final role-based routing
  if (role === 'tutor') {
    return <TutorDashboard />
  }

  // Default to student dashboard
  return <StudentDashboard />
}

export default DashboardHome
