import { Routes, Route } from 'react-router-dom'
import { StartupLayout } from './layouts'
import { HomePage, AboutPage, ServicesPage, ContactPage, MvpPage, MvpFormPage, SignUpPage } from './pages/startup'
import { 
  DashboardPage, 
  SprintStatusPage, 
  SprintOnboardingStep1, 
  SprintOnboardingStep2, 
  SprintOnboardingStep3 
} from './pages'

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
      <Route path="sprint/status" element={<SprintStatusPage />} />
      <Route path="sprint/onboarding/step-1" element={<SprintOnboardingStep1 />} />
      <Route path="sprint/onboarding/step-2" element={<SprintOnboardingStep2 />} />
      <Route path="sprint/onboarding/step-3" element={<SprintOnboardingStep3 />} />
      </Route>
      
      {/* Signup page without layout (has its own header) */}
      <Route path="signup" element={<SignUpPage />} />
      
      {/* Sprint-related pages without layout */}
      
      {/* Dashboard page without layout */}
      <Route path="dashboard" element={<DashboardPage />} />
    </Routes>
  )
}

export default App
