import React, { useMemo, useState } from "react";
import Breadcrumb from "../../components/ui/Breadcrumb/Breadcrumb";
import BoardKanban from "../../components/admin/BoardKanban";
import { useParams } from "react-router-dom";
import { useGetStartupBoardBySprintQuery } from "../../store/api/boardsApi";
import "./StartupBoardPage.css";

const FILTERS = [
  { key: "all", label: "All Tasks" },
  { key: "todo", label: "To Do" },
  { key: "inprogress", label: "In Progress" },
  { key: "completed", label: "Completed" }
];

const STATUS_MAPPING = {
  todo: "To Do",
  inprogress: "In Progress",
  completed: "Completed"
};

export default function StartupBoardPage() {
  const { sprintId } = useParams();
  const [filter, setFilter] = useState("all");
  const [selectedTask, setSelectedTask] = useState(null);

  // Fetch board by sprintId (startup readonly)
  const { data, isLoading, error } = useGetStartupBoardBySprintQuery(sprintId);

  // Transform backend data to columns/tasks for BoardKanban
  const columns = useMemo(() => {
    if (!data?.data?.board) return [];
    const board = data.data.board;
    // Map columns and tasks
    return board.columns
      .filter(col => {
        if (filter === "all") return true;
        // Only show the selected column for the filter
        return (
          (filter === "todo" && col.name.toLowerCase().includes("to do")) ||
          (filter === "inprogress" && col.name.toLowerCase().includes("progress")) ||
          (filter === "completed" && col.name.toLowerCase().includes("complete"))
        );
      })
      .map(col => {
        const tasks = (board.tasksByColumn[col._id] || []);
        return {
          key: col._id,
          label: col.name,
          tasks: tasks.map(task => ({
            id: task._id,
            title: task.title,
            description: task.description,
            avatar: task.assignee?.profile?.avatar || "/assets/icons/User.svg",
            date: task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "",
            comments: task.comments?.length || 0,
            links: task.links?.length || 0,
            category: task.category || "General",
            status: task.status
          }))
        };
      });
  }, [data, filter]);

  function handleCardClick(task) {
    setSelectedTask(task);
  }

  function closeModal() {
    setSelectedTask(null);
  }

  return (
    <div className="board-page">
        <div className="board-page-header-row">
          <div className="board-page-title">Sprint Board</div>
          <div className="board-page-breadcrumb">
            {/* <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Sprints", href: "/startup/sprints" },
                { label: `Sprint ${sprintId}`, href: `/startup/sprint/${sprintId}/board`, isActive: true }
              ]}
            /> */}
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
          </div>
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error loading board</div>
          ) : (
            <BoardKanban
              columns={columns}
              onMoveTask={null}
              onCardClick={handleCardClick}
              readOnly
            />
          )}
        </div>
        {selectedTask && (
          <div className="kanban-modal-overlay" onClick={closeModal}>
            <div className="kanban-modal" onClick={e => e.stopPropagation()}>
              <h2>{selectedTask.title}</h2>
              <p>{selectedTask.description}</p>
              <div>Category: {selectedTask.category}</div>
              <div>Due: {selectedTask.date}</div>
              <div>Comments: {selectedTask.comments}</div>
              <div>Links: {selectedTask.links}</div>
              <div>Assigned Admin: <img src={selectedTask.avatar} alt="Admin" style={{ width: 32, borderRadius: "50%" }} /></div>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </div>
  );
}
