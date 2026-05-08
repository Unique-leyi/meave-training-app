import SettingsManager from '../features/Profile/SettingsManager'
import TutorProfileEditor from '../features/Profile/TutorProfileEditor'

const SettingsPage = () => {
  const userRole = 'tutor' // Mock

  return userRole === 'tutor' ? <TutorProfileEditor /> : <SettingsManager />
}

export default SettingsPage
