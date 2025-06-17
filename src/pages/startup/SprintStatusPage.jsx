import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetCurrentUserQuery } from '../../store/api/authApi'
import { useGetSprintsQuery, useSelectPackageMutation } from '../../store/api/sprintsApi'
import './SprintStatusPage.css'

const SprintStatusPage = () => {
  const navigate = useNavigate()
  const { data: userData, isLoading: userLoading } = useGetCurrentUserQuery()
  const [showSprints, setShowSprints] = useState(false)
  const [sprintData, setSprintData] = useState(null)
  const [selecting, setSelecting] = useState(false)
  const [error, setError] = useState("")

  // Fetch sprints only if onboarding step is 'sprint_selection'
  const { data: sprintsData, isLoading: sprintsLoading } = useGetSprintsQuery(
    {},
    { skip: !showSprints }
  )
  const [selectPackage] = useSelectPackageMutation()

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
          estimatedHours: s.packageOptions?.[0]?.engagementHours || 0,
          packageOptions: s.packageOptions || []
        }))
      })
    }
  }, [sprintsData, userData])

  const handleSprintSelection = async (sprintId, packageId) => {
    setSelecting(true)
    setError("")
    try {
      await selectPackage({ sprintId, packageId }).unwrap()
      navigate('/sprint/onboarding/step-1')
    } catch (err) {
      setError(
        err?.data?.message ||
        "Failed to select sprint package. Please try again."
      )
    } finally {
      setSelecting(false)
    }
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
            {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
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
                    {sprint.packageOptions && sprint.packageOptions.length > 0 ? (
                      <div>
                        <div style={{ marginBottom: 8 }}>Choose a package:</div>
                        {sprint.packageOptions.map((pkg) => (
                          <button
                            key={pkg.id}
                            className="sprint-select-btn"
                            disabled={selecting}
                            onClick={() => handleSprintSelection(sprint.id, pkg.id)}
                          >
                            <span>
                              {pkg.name} - {pkg.price} {pkg.currency} / {pkg.engagementHours} hours
                            </span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <button
                        className="sprint-select-btn"
                        disabled
                      >
                        No packages available
                      </button>
                    )}
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
