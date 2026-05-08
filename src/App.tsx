import { useRoutes } from 'react-router-dom'
import { routes } from './config/routes'
import { AuthProvider } from './context/AuthContext'

function App() {
  const content = useRoutes(routes)
  
  return (
    <AuthProvider>
      {content}
    </AuthProvider>
  )
}

export default App
