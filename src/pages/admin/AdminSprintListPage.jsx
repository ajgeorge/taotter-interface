import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import Breadcrumb from "../../components/ui/Breadcrumb/Breadcrumb";
import { useGetAllSprintsQuery } from "../../store/api/sprintsApi";
import "./AdminSprintListPage.css";

export default function AdminSprintListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: sprintsData, isLoading, error } = useGetAllSprintsQuery();

  const sprints = sprintsData?.data?.sprints || [];

  // Filter sprints based on search and status
  const filteredSprints = sprints.filter(sprint => {
    const matchesSearch = sprint.name?.toLowerCase().includes(search.toLowerCase()) ||
      sprint.startup?.name?.toLowerCase().includes(search.toLowerCase()) ||
      sprint.questionnaire?.basicInfo?.startupName?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || sprint.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewBoard = (sprintId) => {
    navigate(`/admin/board/${sprintId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "#10b981";
      case "completed": return "#6b7280";
      case "pending": return "#f59e0b";
      case "cancelled": return "#ef4444";
      default: return "#6b7280";
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="sprint-list-page">
          <div className="loading">Loading sprints...</div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="sprint-list-page">
          <div className="error">Error loading sprints</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="sprint-list-page">
        <div className="sprint-list-header">
          <div className="sprint-list-title">Sprint Boards</div>
          <div className="sprint-list-breadcrumb">
            <Breadcrumb
              items={[
                { label: "Home", href: "/admin/dashboard" },
                { label: "Sprint Boards", href: "/admin/board", isActive: true }
              ]}
            />
          </div>
        </div>

        <div className="sprint-list-filters">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search sprints or startups..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-container">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="status-filter"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="sprints-grid">
          {filteredSprints.length === 0 ? (
            <div className="no-sprints">
              {search || statusFilter !== "all" ? "No sprints match your filters" : "No sprints found"}
            </div>
          ) : (
            filteredSprints.map((sprint) => (
              <div key={sprint.id} className="sprint-card">
                <div className="sprint-card-header">
                  <h3 className="sprint-name">{sprint.name || `Sprint ${sprint.id.slice(-6)}`}</h3>
                  <div 
                    className="sprint-status"
                    style={{ backgroundColor: getStatusColor(sprint.status) }}
                  >
                    {sprint.status}
                  </div>
                </div>
                
                <div className="sprint-card-content">
                  <div className="startup-info">
                    <strong>Startup:</strong> {sprint.startup?.name || sprint.questionnaire?.basicInfo?.startupName || "Unknown Startup"}
                  </div>
                  {sprint.description && (
                    <div className="sprint-description">
                      {sprint.description}
                    </div>
                  )}
                  <div className="sprint-meta">
                    <div className="meta-item">
                      <strong>Created:</strong> {new Date(sprint.createdAt).toLocaleDateString()}
                    </div>
                    {sprint.dueDate && (
                      <div className="meta-item">
                        <strong>Due:</strong> {new Date(sprint.dueDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>

                <div className="sprint-card-actions">
                  <button
                    onClick={() => handleViewBoard(sprint.id)}
                    className="view-board-btn"
                  >
                    <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                      <path d="M2 3h4v4H2V3zM10 3h4v4h-4V3zM2 9h4v4H2V9zM10 9h4v4h-4V9z" 
                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    View Board
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
