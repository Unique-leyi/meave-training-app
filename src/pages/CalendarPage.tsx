import CalendarView from '../features/Calendar/CalendarView'
import AvailabilityManager from '../features/Availability/AvailabilityManager'

const CalendarPage = () => {
  const userRole = 'tutor' // Mock

  return userRole === 'tutor' ? <AvailabilityManager /> : <CalendarView />
}

export default CalendarPage
