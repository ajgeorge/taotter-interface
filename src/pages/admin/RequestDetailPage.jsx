import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ResponseModal from "../../components/ui/ResponseModal/ResponseModal";
import "./RequestDetailPage.css";

// Dummy data for demonstration
const requests = [
  {
    id: "REQ-001",
    dealId: "DE124321",
    customer: {
      name: "Jane Doe",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      subtitle: "Acme Corp"
    },
    product: "Website Redesign",
    value: "$12,000",
    closeDate: "2025-06-10",
    status: "Open",
    startupName: "Carflow",
    taskName: "Build MVP",
    stage: "Idea",
    timeDedicated: "Full-time",
    taskDescription: "The description of task provided by the founder goes here",
    keyGoals: "The key goals provided by the founder goes here",
    milestone: {
      name: "Build MVP",
      timeline: "3 Weeks",
      budget: "5,000"
    },
    attachments: [
      {
        name: "Brand Guidelines",
        file: "Guidelines.pdf",
        type: "PDF"
      }
    ],
    contact: "Sophie The Goat",
    demoLink: "https://www.carflow.qa"
  },
  // ...other requests
];

export default function RequestDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const req = requests.find(r => r.id === id) || requests[0];

  return (
    <div className="request-detail-page">
      <div className="request-detail-breadcrumb">
        <span className="request-detail-breadcrumb-title">Requests</span>
        <div className="request-detail-breadcrumb-path">
          <span className="request-detail-breadcrumb-home" onClick={() => navigate("/admin/dashboard")}>Home</span>
          <span className="request-detail-breadcrumb-arrow">{">"}</span>
          <span className="request-detail-breadcrumb-current">Requests</span>
        </div>
      </div>
      <div className="request-detail-header">
        <div>
          <span className="request-detail-deal-label">Request ID</span>
          <span className="request-detail-deal-id">{req.dealId}</span>
        </div>
        <div className="request-detail-header-actions">
          <button className="request-detail-action-btn">Chat</button>
          <button className="request-detail-action-btn primary" onClick={() => setShowModal(true)}>Respond</button>
        </div>
      </div>
      <div className="request-detail-section request-detail-section-personal">
        <h2 className="request-detail-section-title">Personal Information</h2>
        <div className="request-detail-info">
          <div className="request-detail-info-col">
            <div className="request-detail-info-group">
              <span className="request-detail-info-label">Startup Name</span>
              <span className="request-detail-info-value">{req.startupName}</span>
            </div>
            <div className="request-detail-info-group">
              <span className="request-detail-info-label">Name of Task</span>
              <span className="request-detail-info-value">{req.taskName}</span>
            </div>
            <div className="request-detail-info-group">
              <span className="request-detail-info-label">Stage</span>
              <span className="request-detail-info-value">{req.stage}</span>
            </div>
            <div className="request-detail-info-group">
              <span className="request-detail-info-label">Time dedicated to startup</span>
              <span className="request-detail-info-value">{req.timeDedicated}</span>
            </div>
          </div>
          <div className="request-detail-info-col">
            <div className="request-detail-info-group">
              <span className="request-detail-info-label">Task Description</span>
              <span className="request-detail-info-value">{req.taskDescription}</span>
            </div>
            <div className="request-detail-info-group">
              <span className="request-detail-info-label">Key Goals</span>
              <span className="request-detail-info-value">{req.keyGoals}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="request-detail-section request-detail-section-milestone">
        <h2 className="request-detail-section-title">Milestone</h2>
        <div className="request-detail-milestone">
          <div>
            <div className="request-detail-info-group">
              <span className="request-detail-info-label">Milestone</span>
              <span className="request-detail-info-value">{req.milestone.name}</span>
            </div>
            <div className="request-detail-info-group">
              <span className="request-detail-info-label">Timeline</span>
              <span className="request-detail-info-value">{req.milestone.timeline}</span>
            </div>
          </div>
          <div>
            <div className="request-detail-info-group">
              <span className="request-detail-info-label">Budget</span>
              <span className="request-detail-info-value">{req.milestone.budget}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="request-detail-section request-detail-section-attachments">
        <h2 className="request-detail-section-title">Attachments</h2>
        <div className="request-detail-attachments">
          {req.attachments.map((att, i) => (
            <div className="request-detail-attachment" key={i}>
              <span className="request-detail-attachment-name">{att.name}</span>
              <span className="request-detail-attachment-file">{att.file}</span>
              <span className="request-detail-attachment-type">{att.type}</span>
            </div>
          ))}
        </div>
        <div className="request-detail-info-group">
          <span className="request-detail-info-label">Existing teacher contact</span>
          <span className="request-detail-info-value">{req.contact}</span>
        </div>
        <div className="request-detail-info-group">
          <span className="request-detail-info-label">Demo Link</span>
          <a className="request-detail-info-value" href={req.demoLink} target="_blank" rel="noopener noreferrer">{req.demoLink}</a>
        </div>
      </div>
      {showModal && <ResponseModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
