import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, TextArea, Select, RadioButton, BudgetSlider, Icon } from '../../components/ui'
import section1Image from '../../assets/images/section1.png'
import './MvpFormPage.css'

const MvpFormPage = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  
  // Form data state
  const [formData, setFormData] = useState({
    // Step 1
    startupName: '',
    taskName: '',
    taskDescription: '',
    stage: '',
    keyGoals: '',
    timeCommitment: 'full-time',
    
    // Step 2
    validateIdea: '',
    timeline: '',
    budgetRange: 0,
    
    // Step 3
    selectedSprint: null,
    customRequest: ''
  })

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('taotter-mvp-form-data')
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData))
      } catch (error) {
        console.error('Error loading saved form data:', error)
      }
    }
  }, [])

  // Save to localStorage whenever form data changes
  useEffect(() => {
    localStorage.setItem('taotter-mvp-form-data', JSON.stringify(formData))
  }, [formData])

  // Form options
  const stageOptions = [
    { value: 'idea', label: 'Idea' },
    { value: 'validation', label: 'Validation' },
    { value: 'growth', label: 'Growth' }
  ]

  const validateIdeaOptions = [
    { value: 'build-mvp', label: 'Build MVP' },
    { value: 'market-research', label: 'Market Research' },
    { value: 'user-testing', label: 'User Testing' }
  ]

  const sprintOptions = [
    {
      id: 'option1',
      title: 'Option 1',
      description: 'Build your first MVP.',
      timeline: '3 Weeks',
      price: 'QR 900'
    },
    {
      id: 'option2', 
      title: 'Option 2',
      description: 'Logo and Brand guidelines',
      timeline: '3 Weeks',
      price: 'QR 900'
    }
  ]

  // Handle form field updates
  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }))
    }
  }

  // Validation functions
  const validateStep1 = () => {
    const newErrors = {}
    
    if (!formData.startupName.trim()) newErrors.startupName = 'Startup name is required'
    if (!formData.taskName.trim()) newErrors.taskName = 'Task name is required'  
    if (!formData.taskDescription.trim()) newErrors.taskDescription = 'Task description is required'
    if (!formData.stage) newErrors.stage = 'Please select a stage'
    if (!formData.keyGoals.trim()) newErrors.keyGoals = 'Key goals are required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors = {}
    
    if (!formData.validateIdea) newErrors.validateIdea = 'Please select an option'
    if (!formData.timeline.trim()) newErrors.timeline = 'Timeline is required'
    if (formData.budgetRange <= 0) newErrors.budgetRange = 'Please select a budget range'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = () => {
    const newErrors = {}
    
    if (!formData.selectedSprint && !formData.customRequest.trim()) {
      newErrors.selection = 'Please select a sprint option or provide a custom request'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Navigation handlers
  const handleNext = () => {
    let isValid = false
    
    switch (currentStep) {
      case 1:
        isValid = validateStep1()
        break
      case 2:
        isValid = validateStep2()
        break
      case 3:
        isValid = validateStep3()
        break
      default:
        isValid = true
    }
    
    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else if (isValid && currentStep === 3) {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Form submission
  const handleSubmit = async () => {
    if (!validateStep3()) return
    
    setIsSubmitting(true)
    
    try {
      // TODO: Replace with actual API call
      console.log('Submitting form data:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Clear saved data on successful submission
      localStorage.removeItem('taotter-mvp-form-data')
      
      // Navigate to signup page
      navigate('/signup')
      
    } catch (error) {
      console.error('Error submitting form:', error)
      // Handle error state
    } finally {
      setIsSubmitting(false)
    }
  }

  // Voice recording functionality
  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
      const recognition = new SpeechRecognition()
      
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        updateFormData('customRequest', formData.customRequest + ' ' + transcript)
      }
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
      }
      
      recognition.start()
    } else {
      alert('Speech recognition is not supported in your browser')
    }
  }

  // Progress indicator component
  const ProgressIndicator = () => (
    <div className="progress-indicator">
      {[1, 2, 3].map((step) => (
        <div key={step} className="progress-step-container">
          <div className={`progress-step ${currentStep >= step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}>
            {step}
          </div>
          {step < 3 && <div className="progress-divider" />}
        </div>
      ))}
    </div>
  )

  // Step content components
  const renderStep1 = () => (
    <div className="form-step">
      <Input
        label="Enter startup Name"
        value={formData.startupName}
        onChange={(e) => updateFormData('startupName', e.target.value)}
        placeholder="Enter Name"
        error={errors.startupName}
        required
      />
      
      <Input
        label="Name of Task"
        value={formData.taskName}
        onChange={(e) => updateFormData('taskName', e.target.value)}
        placeholder="Enter Task Name"
        error={errors.taskName}
        required
      />
      
      <Input
        label="Describe Your Task"
        value={formData.taskDescription}
        onChange={(e) => updateFormData('taskDescription', e.target.value)}
        placeholder="Give us a brief of the task"
        error={errors.taskDescription}
        required
      />
      
      <Select
        label="Select stage"
        value={formData.stage}
        onChange={(value) => updateFormData('stage', value)}
        options={stageOptions}
        placeholder="(Idea / Validation / Growth)"
        error={errors.stage}
        required
      />
      
      <TextArea
        label="Key Goals"
        value={formData.keyGoals}
        onChange={(e) => updateFormData('keyGoals', e.target.value)}
        placeholder="e.g. Build MVP, Get First Users"
        error={errors.keyGoals}
        required
      />
      
      <div className="radio-group">
        <label className="radio-group-label">How much time you are dedicating to your startup</label>
        <div className="radio-options">
          <RadioButton
            label="Full-time"
            value="full-time"
            checked={formData.timeCommitment === 'full-time'}
            onChange={(value) => updateFormData('timeCommitment', value)}
            name="timeCommitment"
          />
          <RadioButton
            label="Part-time"
            value="part-time"
            checked={formData.timeCommitment === 'part-time'}
            onChange={(value) => updateFormData('timeCommitment', value)}
            name="timeCommitment"
          />
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="form-step">
      <Select
        label="Validate Idea"
        value={formData.validateIdea}
        onChange={(value) => updateFormData('validateIdea', value)}
        options={validateIdeaOptions}
        placeholder="Build MVP"
        error={errors.validateIdea}
        required
      />
      
      <Input
        label="Timeline in Mind?"
        value={formData.timeline}
        onChange={(e) => updateFormData('timeline', e.target.value)}
        placeholder="Enter a timeline"
        error={errors.timeline}
        required
      />
      
      <BudgetSlider
        label="Budget range"
        value={formData.budgetRange}
        onChange={(value) => updateFormData('budgetRange', value)}
        min={0}
        max={24000}
        step={1000}
        error={errors.budgetRange}
      />
    </div>
  )

  const renderStep3 = () => (
    <div className="form-step">
      <div className="sprint-selection">
        <h3 className="sprint-subtitle">We Suggest</h3>
        
        {sprintOptions.map((option) => (
          <div 
            key={option.id}
            className={`sprint-option ${formData.selectedSprint === option.id ? 'selected' : ''}`}
            onClick={() => updateFormData('selectedSprint', option.id)}
          >
            <div className="sprint-content">
              <div className="sprint-details">
                <h4>{option.title}</h4>
                <p>{option.description}</p>
                <span className="sprint-timeline">Estimated Time: {option.timeline}</span>
              </div>
              <div className="sprint-price">
                <span className="price">{option.price}</span>
                <Icon name="Arrow-right" size={16} className="sprint-arrow" />
              </div>
            </div>
          </div>
        ))}
        
        <div className="custom-request-section">
          <label className="custom-request-label">
            Post a request
            <span className="custom-request-description">Tell us what you need and we will set the right tools for you.</span>
          </label>
          
          <div className="custom-request-input">
            <TextArea
              value={formData.customRequest}
              onChange={(e) => updateFormData('customRequest', e.target.value)}
              placeholder="Tell us what you need and we will set the right tools for you."
              rows={3}
            />
            <button 
              type="button" 
              className="voice-input-btn"
              onClick={handleVoiceInput}
              title="Voice input"
            >
              <Icon name="microphone" size={16} />
            </button>
          </div>
        </div>
        
        {errors.selection && <div className="error-message">{errors.selection}</div>}
      </div>
    </div>
  )

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Tell us about your startup'
      case 2: return 'Set Your Milestone and get ready'  
      case 3: return 'Select Your Sprint'
      default: return ''
    }
  }

  const getButtonText = () => {
    if (currentStep === 3) {
      return isSubmitting ? 'Starting Sprint...' : 'Start Sprint'
    }
    return 'Next'
  }

  return (
    <div className="mvp-form-page">
      {/* Form Section */}
      <section className="form-section">
        <div className="form-container">
          <div className="form-card">
            {/* Blue Header Section */}
            <div className="form-header-section">
              <h1 className="form-hero-title">What's Your Startup Idea?</h1>
            </div>
            
            {/* Form Content */}
            <div className="form-body">
              <h2 className="form-step-title">{getStepTitle()}</h2>
              
              <ProgressIndicator />
              
              <div className="form-content">
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
              </div>
              
              <div className="form-navigation">
                <Button
                  variant="secondary"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="form-nav-btn back-btn"
                >
                  Back
                </Button>
                
                <Button
                  variant="primary"
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="form-nav-btn next-btn"
                >
                  {getButtonText()}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Float */}
      <div className="whatsapp-float">
        <div className="whatsapp-button">
          <Icon name="whatsapp" size={32} />
          <div className="whatsapp-indicator"></div>
        </div>
      </div>
    </div>
  )
}

export default MvpFormPage
