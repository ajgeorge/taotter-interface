import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui'
import './SprintOnboardingStep3.css'

const SprintOnboardingStep3 = () => {
  const navigate = useNavigate()
  const [isScheduled, setIsScheduled] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Placeholder Calendly URL - replace with actual Calendly link
  const calendlyUrl = 'https://calendly.com/taotter/kickoff-call'

  const handleScheduleCall = () => {
    // Open Calendly in a new tab
    window.open(calendlyUrl, '_blank', 'noopener,noreferrer')
    
    // For demo purposes, automatically mark as scheduled after a short delay
    // In real implementation, you'd listen for Calendly webhook or user confirmation
    setTimeout(() => {
      setIsScheduled(true)
    }, 2000)
  }

  const handleFinish = async () => {
    if (!isScheduled) {
      alert('Please schedule your kickoff call before proceeding.')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // TODO: Mark onboarding as complete via API
      console.log('Onboarding completed')
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Navigate to dashboard
      navigate('/dashboard')
      
    } catch (error) {
      console.error('Error completing onboarding:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBack = () => {
    navigate('/sprint/onboarding/step-2')
  }

  return (
    <div className="sprint-onboarding-page">
      <div className="sprint-onboarding-card schedule-card">
        <div className="sprint-onboarding-header">
          <h1>Start Your Sprint</h1>
        </div>
        
        <div className="sprint-onboarding-content">
          <div className="onboarding-title">
            <h2>Schedule a kickoff call to align on goals, deliverables, and timelines</h2>
          </div>
          
          <div className="schedule-content">
            <div className="schedule-info">
              <div className="info-item">
                <div className="info-icon">📅</div>
                <div className="info-text">
                  <h3>Kickoff Call</h3>
                  <p>30-minute session to align on project goals and set expectations</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">🎯</div>
                <div className="info-text">
                  <h3>What We'll Cover</h3>
                  <ul>
                    <li>Review your sprint objectives and deliverables</li>
                    <li>Discuss timelines and milestones</li>
                    <li>Clarify any questions about your startup materials</li>
                    <li>Set communication preferences and check-in schedule</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="schedule-action">
              <Button
                variant="primary"
                onClick={handleScheduleCall}
                className="schedule-button"
                size="large"
              >
                Schedule with Calendly
              </Button>
              
              {isScheduled && (
                <div className="schedule-confirmation">
                  <div className="confirmation-icon">✅</div>
                  <div className="confirmation-text">
                    <h4>Call Scheduled!</h4>
                    <p>You'll receive a calendar invitation shortly. We're excited to start your sprint!</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="onboarding-navigation">
            <Button
              variant="secondary"
              onClick={handleBack}
              className="nav-button back-button"
            >
              Back
            </Button>
            
            <Button
              variant="primary"
              onClick={handleFinish}
              disabled={!isScheduled || isSubmitting}
              className="nav-button finish-button"
            >
              {isSubmitting ? 'Completing...' : 'Finish'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SprintOnboardingStep3
