import { Routes, Route } from 'react-router-dom'
import { StartupLayout } from './layouts'
import { HomePage, AboutPage, ServicesPage, ContactPage, MvpPage, MvpFormPage, SignUpPage } from './pages/startup'
import LoginPage from './pages/startup/LoginPage'
import { 
  StartupDashboardPage,
  SprintStatusPage, 
  SprintOnboardingStep1, 
  SprintOnboardingStep2, 
  SprintOnboardingStep3,
  StartupChatPage
} from './pages'
import DashboardLayout from './layouts/DashboardLayout'
import AdminLayout from './layouts/AdminLayout'
import AdminProtectedRoute from './components/layout/AdminProtectedRoute'
import AdminDashboardPage from './pages/admin/DashboardPage'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import TablePage from './pages/admin/TablePage'
import RequestDetailPage from './pages/admin/RequestDetailPage'
import AdminChatPage from './pages/admin/AdminChatPage'
import BoardPage from './pages/admin/BoardPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartupLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="mvp" element={<MvpPage />} />
        <Route path="mvp/form" element={<MvpFormPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="sprint/status" element={<SprintStatusPage />} />
        <Route path="sprint/onboarding/step-1" element={<SprintOnboardingStep1 />} />
        <Route path="sprint/onboarding/step-2" element={<SprintOnboardingStep2 />} />
        <Route path="sprint/onboarding/step-3" element={<SprintOnboardingStep3 />} />
      </Route>
      {/* Dashboard page with dashboard layout */}
      <Route path="dashboard" element={<DashboardLayout><StartupDashboardPage /></DashboardLayout>} />
      <Route path="chat/:id" element={<DashboardLayout><StartupChatPage /></DashboardLayout>} />
      {/* Admin authentication */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      {/* Protected Admin routes */}
      <Route path="/admin/dashboard" element={<AdminProtectedRoute><AdminLayout><AdminDashboardPage /></AdminLayout></AdminProtectedRoute>} />
      <Route path="/admin/table" element={<AdminProtectedRoute><AdminLayout><TablePage /></AdminLayout></AdminProtectedRoute>} />
      <Route path="/admin/request/:id" element={<AdminProtectedRoute><AdminLayout><RequestDetailPage /></AdminLayout></AdminProtectedRoute>} />
      <Route path="/admin/chat" element={<AdminProtectedRoute><AdminChatPage /></AdminProtectedRoute>} />
      <Route path="/admin/chat/:id" element={<AdminProtectedRoute><AdminChatPage /></AdminProtectedRoute>} />
      <Route path="/admin/board" element={<AdminProtectedRoute><BoardPage /></AdminProtectedRoute>} />
    </Routes>
  )
}

export default App
