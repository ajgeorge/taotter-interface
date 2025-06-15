import React from "react";
import "./BoardTaskCard.css";

export default function BoardTaskCard({
  task,
  draggable,
  onDragStart,
  onDragEnd
}) {
  return (
    <div
      className="board-task-card"
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="board-task-card__top">
        <div className="board-task-card__title">{task.title}</div>
        <img src={task.avatar} alt="avatar" className="board-task-card__avatar" />
      </div>
      <div className="board-task-card__desc">{task.description}</div>
      <div className="board-task-card__meta-row">
        <div className="board-task-card__meta">
          <span className="board-task-card__meta-item">
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
              <path d="M8 2.667A5.333 5.333 0 1 1 2.667 8" stroke="#667085" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M8 5.333V8h2.667" stroke="#667085" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            {task.date}
          </span>
          <span className="board-task-card__meta-item">
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
              <path d="M2.667 13.333V4a1.333 1.333 0 0 1 1.333-1.333h8a1.333 1.333 0 0 1 1.333 1.333v9.333l-2.667-2-2.666 2-2.667-2-2.666 2Z" stroke="#667085" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {task.comments}
          </span>
          <span className="board-task-card__meta-item">
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
              <path d="M7.333 8.667l1.334 1.333 4-4M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0Z" stroke="#667085" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {task.links}
          </span>
        </div>
      </div>
      <div className="board-task-card__pill-row">
        <span className={`board-task-card__pill board-task-card__pill--${task.category.toLowerCase()}`}>
          {task.category}
        </span>
      </div>
    </div>
  );
}
