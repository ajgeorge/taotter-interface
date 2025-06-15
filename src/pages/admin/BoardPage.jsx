import React, { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import Breadcrumb from "../../components/ui/Breadcrumb/Breadcrumb";
import BoardKanban from "../../components/admin/BoardKanban";
import "./BoardPage.css";

const initialTasks = [
  {
    id: "1",
    title: "Design Landing Page",
    description: "Create a modern landing page for the new product.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    date: "2025-06-15",
    comments: 3,
    links: 2,
    category: "Marketing",
    status: "todo"
  },
  {
    id: "2",
    title: "API Integration",
    description: "Integrate payment gateway API.",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    date: "2025-06-18",
    comments: 1,
    links: 1,
    category: "Dev",
    status: "inprogress"
  },
  {
    id: "3",
    title: "Write Blog Post",
    description: "Draft a blog post about our new feature.",
    avatar: "https://randomuser.me/api/portraits/women/46.jpg",
    date: "2025-06-20",
    comments: 0,
    links: 0,
    category: "Template",
    status: "todo"
  },
  {
    id: "4",
    title: "Fix Login Bug",
    description: "Resolve login issue on mobile devices.",
    avatar: "https://randomuser.me/api/portraits/men/47.jpg",
    date: "2025-06-16",
    comments: 2,
    links: 1,
    category: "Dev",
    status: "inprogress"
  },
  {
    id: "5",
    title: "Launch Campaign",
    description: "Launch the summer marketing campaign.",
    avatar: "https://randomuser.me/api/portraits/women/48.jpg",
    date: "2025-06-22",
    comments: 4,
    links: 3,
    category: "Marketing",
    status: "completed"
  }
];

const FILTERS = [
  { key: "all", label: "All Tasks" },
  { key: "todo", label: "To Do" },
  { key: "inprogress", label: "In Progress" },
  { key: "completed", label: "Completed" }
];

export default function BoardPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState("all");

  // Drag & drop handlers
  function onMoveTask(taskId, newStatus) {
    setTasks(tasks =>
      tasks.map(t => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  }

  // Filter tasks for columns
  const columns = [
    {
      key: "todo",
      label: "To Do",
      tasks: tasks.filter(t => (filter === "all" ? true : t.status === filter) && t.status === "todo")
    },
    {
      key: "inprogress",
      label: "In Progress",
      tasks: tasks.filter(t => (filter === "all" ? true : t.status === filter) && t.status === "inprogress")
    },
    {
      key: "completed",
      label: "Completed",
      tasks: tasks.filter(t => (filter === "all" ? true : t.status === filter) && t.status === "completed")
    }
  ];

  return (
    <AdminLayout>
      <div className="board-page">
        <div className="board-page-header-row">
          <div className="board-page-title">Board</div>
          <div className="board-page-breadcrumb">
            <Breadcrumb
              items={[
                { label: "Home", href: "/admin/dashboard" },
                { label: "Board", href: "/admin/board", isActive: true }
              ]}
            />
          </div>
        </div>
        <div className="board-main-container">
          <div className="board-toolbar">
            <div className="board-toolbar-tabs">
              {FILTERS.map(tab => (
                <button
                  key={tab.key}
                  className={`board-toolbar-tab${filter === tab.key ? " active" : ""}`}
                  onClick={() => setFilter(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="board-toolbar-actions">
              <button className="board-toolbar-btn">
                <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                  <path d="M8 2a6 6 0 1 1-4.24 1.76" stroke="#344054" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M8 5v3h3" stroke="#344054" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M3 7h12M3 11h8" stroke="#344054" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Filter & Sort
              </button>
              <button className="board-toolbar-btn board-toolbar-btn--primary">
                <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                  <path d="M9 3v12M3 9h12" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Add New Task
              </button>
            </div>
          </div>
          <BoardKanban columns={columns} onMoveTask={onMoveTask} />
        </div>
      </div>
    </AdminLayout>
  );
}
