import SessionManager from '../features/Sessions/SessionManager'
import TutorSessionManager from '../features/Sessions/TutorSessionManager'

const SessionsPage = () => {
  const userRole = 'tutor' // Mock

  return userRole === 'tutor' ? <TutorSessionManager /> : <SessionManager />
}

export default SessionsPage
