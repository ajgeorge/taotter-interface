import React, { useState } from 'react'
import { Button } from '../../components/ui'
import './StartupDashboardPage.css'

const statusColors = {
  Cancelled: 'cancelled',
  Ongoing: 'ongoing',
  Completed: 'completed'
}

const progressData = [
  {
    subtitle: 'Branding',
    title: 'Initial Draft approved',
    status: 'Ongoing',
    progress: 65
  },
  {
    subtitle: 'Branding',
    title: 'Initial Draft approved',
    status: 'Completed',
    progress: 100
  }
]

const StartupDashboardPage = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="dashboard-page">
      {/* Blue Top Section */}
      <div className="dashboard-top-section">
        <h1 className="dashboard-hero-title">Track Your Sprint</h1>
      </div>

      {/* Cards Section */}
      <div className="dashboard-cards-container">
        {progressData.map((item, idx) => (
          <div className="dashboard-card" key={idx}>
            <div className="dashboard-card-header">
              <span className="dashboard-card-subtitle">{item.subtitle}</span>
              <div className="dashboard-card-status-row">
                <h3 className="dashboard-card-title">{item.title}</h3>
                <span className={`dashboard-status-pill ${statusColors[item.status]}`}>{item.status}</span>
              </div>
            </div>
            <div className="dashboard-progress-row">
              <div className="dashboard-progress-bar-outer">
                <div
                  className={`dashboard-progress-bar-inner ${statusColors[item.status]}`}
                  style={{ width: `${item.progress}%` }}
                />
              </div>
              <span className="dashboard-progress-percent">{item.progress}%</span>
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
