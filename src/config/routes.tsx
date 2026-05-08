import { lazy, ReactNode, Suspense } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'
import SpinnerOverlay from '../ui/components/SpinnerOverlay'

// Layouts
import AuthLayout from '../ui/layouts/AuthLayout'
import DashboardLayout from '../ui/layouts/DashboardLayout'
import ProtectedRoute from '../ui/layouts/ProtectedRoute'

// Helper to wrap lazy components with Suspense
const Loadable = (Component: any) => (props: any) => (
  <Suspense fallback={<SpinnerOverlay />}>
    <Component {...props} />
  </Suspense>
)

// Lazy loaded pages
const SigninPage = Loadable(lazy(() => import('../pages/SigninPage')))
const SignupPage = Loadable(lazy(() => import('../pages/SignupPage')))
const ForgotPasswordPage = Loadable(lazy(() => import('../pages/ForgotPasswordPage')))
const VerifyEmailPage = Loadable(lazy(() => import('../pages/VerifyEmailPage')))
const VerifyOtpPage = Loadable(lazy(() => import('../pages/VerifyOtpPage')))
const ConfirmLoginPage = Loadable(lazy(() => import('../pages/ConfirmLoginPage')))
const DashboardHome = Loadable(lazy(() => import('../pages/DashboardHome')))
const BookingPage = Loadable(lazy(() => import('../pages/BookingPage')))
const SessionsPage = Loadable(lazy(() => import('../pages/SessionsPage')))
const ProgressPage = Loadable(lazy(() => import('../pages/ProgressPage')))
const PaymentsPage = Loadable(lazy(() => import('../pages/PaymentsPage')))
const MessagesPage = Loadable(lazy(() => import('../pages/MessagesPage')))
const NotificationsPage = Loadable(lazy(() => import('../pages/NotificationsPage')))
const SettingsPage = Loadable(lazy(() => import('../pages/SettingsPage')))
const SupportPage = Loadable(lazy(() => import('../pages/SupportPage')))
const CalendarPage = Loadable(lazy(() => import('../pages/CalendarPage')))
const ReviewPage = Loadable(lazy(() => import('../pages/ReviewPage')))
const StudentsPage = Loadable(lazy(() => import('../pages/StudentsPage')))
const EarningsPage = Loadable(lazy(() => import('../pages/EarningsPage')))
const AnalyticsPage = Loadable(lazy(() => import('../pages/AnalyticsPage')))
const ResourcesPage = Loadable(lazy(() => import('../pages/ResourcesPage')))
const RequestsPage = Loadable(lazy(() => import('../pages/RequestsPage')))
const OnboardingPage = Loadable(lazy(() => import('../pages/OnboardingPage')))

export const routes: RouteObject[] = [
  {
    path: '/',
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: 'signin', element: <SigninPage /> },
          { path: 'signup', element: <SignupPage /> },
          { path: 'forgot-password', element: <ForgotPasswordPage /> },
          { path: 'verify-email', element: <VerifyEmailPage /> },
          { path: 'verify-otp', element: <VerifyOtpPage /> },
          { path: 'confirm-login', element: <ConfirmLoginPage /> },
          { path: '', element: <Navigate to="/dashboard" replace /> }
        ]
      },
      { path: 'onboarding', element: <OnboardingPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { path: 'dashboard', element: <DashboardHome /> },
              { path: 'sessions', element: <SessionsPage /> },
              { path: 'session-requests', element: <RequestsPage /> },
              { path: 'book-session', element: <BookingPage /> },
              { path: 'calendar', element: <CalendarPage /> },
              { path: 'progress', element: <ProgressPage /> },
              { path: 'payments', element: <PaymentsPage /> },
              { path: 'messages', element: <MessagesPage /> },
              { path: 'notifications', element: <NotificationsPage /> },
              { path: 'settings', element: <SettingsPage /> },
              { path: 'support', element: <SupportPage /> },
              { path: 'review/:sessionId', element: <ReviewPage /> },
              { path: 'students', element: <StudentsPage /> },
              { path: 'earnings', element: <EarningsPage /> },
              { path: 'analytics', element: <AnalyticsPage /> },
              { path: 'resources', element: <ResourcesPage /> },
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />
  }
]
