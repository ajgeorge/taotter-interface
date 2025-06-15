import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetCurrentUserQuery } from '../../store/api/authApi'
import { useGetSprintsQuery } from '../../store/api/sprintsApi'
import './SprintStatusPage.css'

const SprintStatusPage = () => {
  const navigate = useNavigate()
  const { data: userData, isLoading: userLoading } = useGetCurrentUserQuery()
  const [showSprints, setShowSprints] = useState(false)
  const [sprintData, setSprintData] = useState(null)

  // Fetch sprints only if onboarding step is 'sprint_selection'
  const { data: sprintsData, isLoading: sprintsLoading } = useGetSprintsQuery(
    {},
    { skip: !showSprints }
  )
  useEffect(() => {
    if (userData && userData.data && userData.data.user && userData.data.user.onboarding) {
      const step = userData.data.user.onboarding.currentStep
      if (step === 'sprint_selection') {
        setShowSprints(true)
      } else {
        setShowSprints(false)
      }
    }
  }, [userData])

  useEffect(() => {
    if (sprintsData && sprintsData.data && sprintsData.data.sprints) {
      setSprintData({
        projectName: userData?.data?.user?.profile?.companyName || 'Your Project',
        sprints: sprintsData.data.sprints.map((s, idx) => ({
          id: s.id,
          number: idx + 1,
          title: s.name,
          timeframe: s.estimatedDuration ? `~${s.estimatedDuration} days` : '',
          objective: s.description,
          deliverables: s.packageOptions?.[0]?.features || [],
          estimatedHours: s.packageOptions?.[0]?.engagementHours || 0
        }))
      })
    }
  }, [sprintsData, userData])

  const handleSprintSelection = (sprintId) => {
    // TODO: Save selected sprint and navigate to onboarding
    console.log('Selected sprint:', sprintId)
    navigate('/sprint/onboarding/step-1')
  }

  if (userLoading) {
    return (
      <div className="sprint-status-page">
        <div className="sprint-status-card">
          <div className="sprint-status-header">
            <h1>Start Your Sprint</h1>
          </div>
          <div className="sprint-status-content">
            <h2>Loading...</h2>
            <p>Checking your sprint status...</p>
          </div>
        </div>
      </div>
    )
  }

  const onboardingStep = userData?.data?.user?.onboarding?.currentStep

  if (onboardingStep === 'pending_review') {
    return (
      <div className="sprint-status-page">
        <div className="sprint-status-card">
          <div className="sprint-status-header">
            <h1>Start Your Sprint</h1>
          </div>
          <div className="sprint-status-content">
            <h2>Hang tight your request is being processed.</h2>
          </div>
        </div>
      </div>
    )
  }

  if (onboardingStep === 'sprint_selection') {
    if (sprintsLoading || !sprintData) {
      return (
        <div className="sprint-status-page">
          <div className="sprint-status-card">
            <div className="sprint-status-header">
              <h1>Start Your Sprint</h1>
            </div>
            <div className="sprint-status-content">
              <h2>Loading sprints...</h2>
            </div>
          </div>
        </div>
      )
    }

    // Sprint is approved - show sprint selection
    return (
      <div className="sprint-status-page">
        <div className="sprint-status-card sprint-approved">
          <div className="sprint-status-header">
            <h1>Start Your Sprint</h1>
          </div>
          <div className="sprint-status-content">
            <h2>Select Your Sprint</h2>
            
            <div className="sprint-options">
              {sprintData?.sprints.map((sprint) => (
                <div key={sprint.id} className="sprint-option">
                  <div className="sprint-details">
                    <div className="sprint-info">
                      <h3>Project: {sprintData.projectName}</h3>
                      <div className="sprint-number">⚙ Sprint {sprint.number}</div>
                      <div className="sprint-title">{sprint.title}</div>
                      <div className="sprint-timeframe">Estimated Time: ({sprint.timeframe})</div>
                      <div className="sprint-objective">Sprint Objective: {sprint.objective}</div>
                      <div className="sprint-deliverables">
                        <strong>Deliverables:</strong>
                        <br />
                        {Array.isArray(sprint.deliverables) ? sprint.deliverables.join(' ') : sprint.deliverables}
                      </div>
                      <div className="sprint-hours">⚠ Estimated Total Hours for Sprint {sprint.number}: {sprint.estimatedHours} working hours</div>
                    </div>
                  </div>
                  
                  <div className="sprint-action">
                    <button 
                      className="sprint-select-btn"
                      onClick={() => handleSprintSelection(sprint.id)}
                    >
                      <span>Lets Get Started</span>
                      <svg width="39" height="17" viewBox="0 0 39 17" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M37.6738 9.51478L1.34432 9.87261C1.09751 9.87261 0.860789 9.77456 0.686262 9.60006C0.511735 9.42556 0.413666 9.18888 0.413666 8.94209C0.413666 8.69531 0.511735 8.45863 0.686262 8.28413C0.860789 8.10963 1.09751 8.01158 1.34432 8.01158L35.4267 7.65472L29.7799 2.0089C29.6076 1.83372 29.5116 1.59759 29.5126 1.35191C29.5137 1.10623 29.6117 0.870847 29.7855 0.697124C29.9592 0.5234 30.1945 0.425363 30.4402 0.424325C30.686 0.423287 30.9222 0.519384 31.0975 0.691634L38.3346 7.92764C38.4649 8.05771 38.5536 8.22374 38.5892 8.40443C38.6248 8.58511 38.6057 8.77228 38.5344 8.94209C38.4632 9.11139 38.3437 9.25592 38.1908 9.35776C38.0379 9.4596 37.8575 9.51424 37.6738 9.51478Z" fill="#087FC0" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M30.4287 16.7588C30.2446 16.7584 30.0648 16.7035 29.9119 16.601C29.759 16.4985 29.6399 16.3531 29.5696 16.1829C29.4994 16.0128 29.481 15.8256 29.5171 15.6451C29.5531 15.4646 29.6418 15.2989 29.772 15.1687L37.0171 7.92467C37.1923 7.75242 37.4285 7.65644 37.6742 7.65748C37.9199 7.65852 38.1552 7.75655 38.329 7.93028C38.5027 8.104 38.6008 8.33927 38.6018 8.58495C38.6028 8.83063 38.5069 9.06675 38.3346 9.24193L31.0884 16.486C31.0019 16.5727 30.8991 16.6414 30.7858 16.6883C30.6726 16.7351 30.5512 16.759 30.4287 16.7588Z" fill="#087FC0" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Default fallback
  return (
    <div className="sprint-status-page">
      <div className="sprint-status-card">
        <div className="sprint-status-header">
          <h1>Start Your Sprint</h1>
        </div>
        <div className="sprint-status-content">
          <h2>Loading...</h2>
        </div>
      </div>
    </div>
  )
}

export default SprintStatusPage
