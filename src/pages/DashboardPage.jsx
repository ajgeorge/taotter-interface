import React from 'react'
import './DashboardPage.css'

const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-welcome">
          <h1>Welcome to Taotter Dashboard!</h1>
          <p>Your account has been successfully created.</p>
          <div className="dashboard-placeholder">
            <div className="placeholder-icon">🚀</div>
            <h2>Dashboard Coming Soon</h2>
            <p>We're building an amazing dashboard experience for you.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
