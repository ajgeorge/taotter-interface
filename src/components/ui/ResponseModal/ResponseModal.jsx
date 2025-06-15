import React from "react";
import "./ResponseModal.css";

export default function ResponseModal({ onClose }) {
  return (
    <div className="response-modal-backdrop" onClick={onClose}>
      <div className="response-modal" onClick={e => e.stopPropagation()}>
        <button className="response-modal-close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4.5 4.5L13.5 13.5M13.5 4.5L4.5 13.5" stroke="#98A2B3" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <div className="response-modal-header">
          <h2 className="response-modal-title">Respond back to Enquiry</h2>
          <p className="response-modal-subtitle">
            The Founder is waiting for your response. Please fill in the details.
          </p>
        </div>
        <form className="response-modal-form">
          <div className="response-modal-form-section">
            <label>
              Project Name
              <input type="text" placeholder="Enter project name" />
            </label>
          </div>
          <div className="response-modal-form-row">
            <div className="response-modal-form-section">
              <label>
                Sprint
                <input type="text" placeholder="Enter a label for the sprint" />
              </label>
            </div>
            <div className="response-modal-form-section">
              <label>
                Estimated Time
                <input type="text" placeholder="To Do" />
              </label>
            </div>
          </div>
          <div className="response-modal-form-section">
            <label>
              Sprint Objective
              <input type="text" placeholder="Marketing" />
            </label>
          </div>
          <div className="response-modal-form-section">
            <label>
              Deliverables
              <textarea placeholder="Describe deliverables"></textarea>
            </label>
          </div>
          <button
            type="button"
            className="response-modal-add-sprint"
            style={{ width: 190, height: 44, alignSelf: "flex-start" }}
          >
            <span className="response-modal-add-icon">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 0.25C6.41421 0.25 6.75 0.585786 6.75 1V5.25H11C11.4142 5.25 11.75 5.58579 11.75 6C11.75 6.41421 11.4142 6.75 11 6.75H6.75V11C6.75 11.4142 6.41421 11.75 6 11.75C5.58579 11.75 5.25 11.4142 5.25 11V6.75H1C0.585786 6.75 0.25 6.41421 0.25 6C0.25 5.58579 0.585786 5.25 1 5.25H5.25V1C5.25 0.585786 5.58579 0.25 6 0.25Z" fill="#344054"/>
              </svg>
            </span>
            Create New Sprint
          </button>
        </form>
        <div className="response-modal-section">
          <h3 className="response-modal-section-title response-modal-title" style={{ color: "#101828", fontSize: 24, fontWeight: 600 }}>
            Taotter Credits
          </h3>
          <p className="response-modal-section-subtitle">
            Enter the credits for this sprint.
          </p>
          <div className="response-modal-credit-tier">
            <div className="response-modal-credit-tier-label">🚀 Starter: Engagements between 10 to 150 hours</div>
            <div className="response-modal-form-row">
              <div className="response-modal-form-section">
                <label>
                  Hourly Rate
                  <input type="text" placeholder="Enter hourly rate" className="response-modal-input" />
                </label>
              </div>
              <div className="response-modal-form-section">
                <label>
                  Amount
                  <input type="text" placeholder="Enter amount" className="response-modal-input" />
                </label>
              </div>
            </div>
            <div className="response-modal-form-row">
              <div className="response-modal-form-section">
                <label>
                  QTY
                  <input type="text" placeholder="Enter qty in hours" className="response-modal-input" />
                </label>
              </div>
              <div className="response-modal-form-section">
                <label>
                  Discount
                  <input type="text" placeholder="Enter discount" className="response-modal-input" />
                </label>
              </div>
            </div>
          </div>
          <div className="response-modal-credit-tier">
            <div className="response-modal-credit-tier-label">🌱 Growth: For engagements between 151 to 250 hours</div>
            <div className="response-modal-form-row">
              <div className="response-modal-form-section">
                <label>
                  Hourly Rate
                  <input type="text" placeholder="Enter hourly rate" className="response-modal-input" />
                </label>
              </div>
              <div className="response-modal-form-section">
                <label>
                  Amount
                  <input type="text" placeholder="Enter amount" className="response-modal-input" />
                </label>
              </div>
            </div>
            <div className="response-modal-form-row">
              <div className="response-modal-form-section">
                <label>
                  QTY
                  <input type="text" placeholder="Enter qty in hours" className="response-modal-input" />
                </label>
              </div>
              <div className="response-modal-form-section">
                <label>
                  Discount
                  <input type="text" placeholder="Enter discount" className="response-modal-input" />
                </label>
              </div>
            </div>
          </div>
          <div className="response-modal-credit-tier">
            <div className="response-modal-credit-tier-label">🏗️ Scale: For engagements of 251 hours or more</div>
            <div className="response-modal-form-row">
              <div className="response-modal-form-section">
                <label>
                  Hourly Rate
                  <input type="text" placeholder="Enter hourly rate" className="response-modal-input" />
                </label>
              </div>
              <div className="response-modal-form-section">
                <label>
                  Amount
                  <input type="text" placeholder="Enter amount" className="response-modal-input" />
                </label>
              </div>
            </div>
            <div className="response-modal-form-row">
              <div className="response-modal-form-section">
                <label>
                  QTY
                  <input type="text" placeholder="Enter qty in hours" className="response-modal-input" />
                </label>
              </div>
              <div className="response-modal-form-section">
                <label>
                  Discount
                  <input type="text" placeholder="Enter discount" className="response-modal-input" />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="response-modal-footer">
          <button className="response-modal-submit">Submit Sprint</button>
        </div>
      </div>
    </div>
  );
}
