import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui'
import './SprintOnboardingStep2.css'

const SprintOnboardingStep2 = () => {
  const navigate = useNavigate()
  const [selectedTier, setSelectedTier] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const creditTiers = [
    {
      id: 'starter',
      icon: '🚀',
      name: 'Starter',
      description: 'For engagements between 10 to 150 hours',
      hourlyRate: '$12.00/hour',
      originalRate: null,
      details: 'Perfect for short-term sprints or getting started with focused goals.',
      idealFor: 'Ideal for 1–2 sprint cycles',
      pricing: {
        amount: '$12.00',
        quantity: 150,
        discount: 0,
        total: '$1,800'
      }
    },
    {
      id: 'growth',
      icon: '🌱',
      name: 'Growth',
      description: 'For engagements between 151 to 250 hours',
      hourlyRate: '$10.80/hour',
      originalRate: '$12.00/hour',
      details: 'Ideal for teams looking to build momentum with broader execution.',
      idealFor: 'Best for 2–3 sprints or milestone-based work',
      pricing: {
        amount: '$12.00',
        quantity: 250,
        discount: '-10% ($300.00)',
        total: '$2,700'
      }
    },
    {
      id: 'scale',
      icon: '🏗',
      name: 'Scale',
      description: 'For engagements of 251 hours or more',
      hourlyRate: '$10.20/hour',
      originalRate: '$12.00/hour',
      details: 'Designed for fast-moving teams who need ongoing support at scale.',
      idealFor: 'Ideal for full builds, multi-track execution, or long-term support',
      pricing: {
        amount: '$12.00',
        quantity: 300,
        discount: '-15% ($540.00)',
        total: '$3,060.00'
      }
    }
  ]

  const handleTierSelection = (tierId) => {
    setSelectedTier(tierId)
  }

  const handleNext = async () => {
    if (!selectedTier) return
    
    setIsSubmitting(true)
    
    try {
      // TODO: Save selected tier to API
      console.log('Selected tier:', selectedTier)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Navigate to next step
      navigate('/sprint/onboarding/step-3')
      
    } catch (error) {
      console.error('Error saving tier selection:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBack = () => {
    navigate('/sprint/onboarding/step-1')
  }

  return (
    <div className="sprint-onboarding-page">
      <div className="sprint-onboarding-card credit-tier-card">
        <div className="sprint-onboarding-header">
          <h1>Start Your Sprint</h1>
        </div>
        
        <div className="sprint-onboarding-content">
          <div className="onboarding-title">
            <h2>Confirm your preferred Taotter Credit Tier</h2>
          </div>
          
          <div className="credit-tiers">
            {creditTiers.map((tier) => (
              <div key={tier.id} className="credit-tier-option">
                <div className="tier-details">
                  <div className="tier-info">
                    <div className="tier-header">
                      <span className="tier-name">
                        {tier.icon} {tier.name}
                      </span>
                      <div className="tier-description">{tier.description}</div>
                    </div>
                    
                    <div className="tier-pricing">
                      <div className="hourly-rate">
                        {tier.originalRate && (
                          <span className="original-rate">Hourly Rate: {tier.originalRate}</span>
                        )}
                        <span className="current-rate">
                          {!tier.originalRate && 'Hourly Rate: '}{tier.hourlyRate}
                        </span>
                      </div>
                      
                      <div className="tier-details-text">{tier.details}</div>
                      <div className="tier-ideal">{tier.idealFor}</div>
                      <div className="tier-breakdown">
                        <span className="breakdown-label">Amount:</span> {tier.pricing.amount} <br />
                        <span className="breakdown-label">Qty:</span> {tier.pricing.quantity}<br />
                        <span className="breakdown-label">Discount:</span> {tier.pricing.discount}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="tier-action">
                  <Button
                    variant="primary"
                    onClick={() => handleTierSelection(tier.id)}
                    className={`tier-select-btn ${selectedTier === tier.id ? 'selected' : ''}`}
                  >
                    Select
                  </Button>
                  <div className="tier-total">{tier.pricing.total}</div>
                </div>
              </div>
            ))}
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
              onClick={handleNext}
              disabled={!selectedTier || isSubmitting}
              className="nav-button next-button"
            >
              {isSubmitting ? 'Saving...' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SprintOnboardingStep2
