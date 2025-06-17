import React, { useState } from 'react'
import { Button } from '../../components/ui'
import { useGetMySprintsQuery } from '../../store/api/sprintsApi'
import { useNavigate } from 'react-router-dom'
import './StartupDashboardPage.css'

const statusColors = {
  cancelled: 'cancelled',
  ongoing: 'ongoing',
  completed: 'completed',
  'in_progress': 'ongoing',
  'on_hold': 'cancelled',
  'package_selected': 'ongoing',
  'documents_submitted': 'ongoing',
  'meeting_scheduled': 'ongoing',
}

function getStatusLabel(status) {
  if (!status) return 'Ongoing'
  if (status === 'completed') return 'Completed'
  if (status === 'cancelled') return 'Cancelled'
  return 'Ongoing'
}

const StartupDashboardPage = () => {
  const [showModal, setShowModal] = useState(false)
  const { data, isLoading, error } = useGetMySprintsQuery()
  const navigate = useNavigate()

  let sprintData = []
  if (data && data.data && data.data.sprints) {
    sprintData = data.data.sprints
  }

  return (
    <div className="dashboard-page">
      {/* Blue Top Section */}
      <div className="dashboard-top-section">
        <h1 className="dashboard-hero-title">Track Your Sprint</h1>
      </div>

      {/* Cards Section */}
      <div className="dashboard-cards-container">
        {isLoading && <div>Loading sprints...</div>}
        {error && <div style={{ color: 'red' }}>Failed to load sprints.</div>}
        {(!isLoading && sprintData.length === 0) && (
          <div>No active sprints found.</div>
        )}
        {sprintData.map((sprint, idx) => (
          <div
            className="dashboard-card"
            key={sprint.id}
            onClick={() => navigate(`/startup/sprint/${sprint.id}/board`)}
            tabIndex={0}
            role="button"
            style={{ outline: 'none' }}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigate(`/startup/sprint/${sprint.id}/board`)
              }
            }}
          >
            <div className="dashboard-card-header">
              <span className="dashboard-card-subtitle">{sprint.type ? sprint.type.charAt(0).toUpperCase() + sprint.type.slice(1) : 'Sprint'}</span>
              <div className="dashboard-card-status-row">
                <h3 className="dashboard-card-title">{sprint.name}</h3>
                <span className={`dashboard-status-pill ${statusColors[sprint.status] || 'ongoing'}`}>
                  {getStatusLabel(sprint.status)}
                </span>
              </div>
            </div>
            <div className="dashboard-progress-row">
              <div className="dashboard-progress-bar-outer">
                <div
                  className={`dashboard-progress-bar-inner ${statusColors[sprint.status] || 'ongoing'}`}
                  style={{ width: `${sprint.progress?.percentage || 0}%` }}
                />
              </div>
              <span className="dashboard-progress-percent">{sprint.progress?.percentage || 0}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="dashboard-actions">
        <Button
          type="button"
          variant="primary"
          className="dashboard-action-btn finish-btn"
          onClick={() => setShowModal(true)}
        >
          Finish Sprint
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="dashboard-action-btn report-btn"
        >
          Report Issue
        </Button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="dashboard-modal-backdrop">
          <div className="dashboard-modal">
            <h2>Are you sure you want to finish this sprint?</h2>
            <p className="dashboard-modal-subtitle">This action cannot be undone.</p>
            <div className="dashboard-modal-actions">
              <Button
                type="button"
                variant="secondary"
                className="dashboard-modal-btn"
                onClick={() => setShowModal(false)}
              >
                Close
              </Button>
              <Button
                type="button"
                variant="primary"
                className="dashboard-modal-btn"
                onClick={() => setShowModal(false)}
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StartupDashboardPage
