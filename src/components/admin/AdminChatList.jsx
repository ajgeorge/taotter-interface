import React from "react";
import "./AdminChatList.css";

export default function AdminChatList({
  contacts,
  selectedId,
  onSelect,
  search,
  onSearchChange
}) {
  return (
    <aside className="admin-chat-list">
      <div className="admin-chat-list__header">
        <span className="admin-chat-list__title">Chats</span>
        <button className="admin-chat-list__menu-btn" aria-label="Menu">
          <svg width="4" height="16" viewBox="0 0 4 16" fill="none">
            <path d="M2.18262 12.2588C3.06529 12.3482 3.75391 13.0937 3.75391 14C3.75391 14.9063 3.06529 15.6518 2.18262 15.7412L2.00391 15.75H1.99414C1.02764 15.75 0.244141 14.9665 0.244141 14C0.244141 13.0335 1.02764 12.25 1.99414 12.25H2.00391L2.18262 12.2588ZM2.18262 6.25879C3.06529 6.34819 3.75391 7.09375 3.75391 8C3.75391 8.90625 3.06529 9.65181 2.18262 9.74121L2.00391 9.75H1.99414C1.02764 9.75 0.244141 8.9665 0.244141 8C0.244141 7.0335 1.02764 6.25 1.99414 6.25H2.00391L2.18262 6.25879ZM2.18262 0.258789C3.06529 0.348189 3.75391 1.09375 3.75391 2C3.75391 2.90625 3.06529 3.65181 2.18262 3.74121L2.00391 3.75H1.99414C1.02764 3.75 0.244141 2.9665 0.244141 2C0.244141 1.0335 1.02764 0.25 1.99414 0.25H2.00391L2.18262 0.258789Z" fill="#667085" />
          </svg>
        </button>
      </div>
      <div className="admin-chat-list__search">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => onSearchChange?.(e.target.value)}
        />
        <span className="admin-chat-list__search-icon">
          <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
            <circle cx="7" cy="7" r="5" stroke="#323544" strokeWidth="1.5" />
            <path d="M11.5 11.5L15 15" stroke="#323544" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </div>
      <div className="admin-chat-list__contacts">
        {contacts.map(contact => (
          <div
            key={contact.id}
            className={`admin-chat-list__contact${selectedId === contact.id ? " admin-chat-list__contact--selected" : ""}`}
            onClick={() => onSelect(contact.id)}
          >
            <div className="admin-chat-list__avatar-wrap">
              <img src={contact.avatar} alt={contact.name} className="admin-chat-list__avatar" />
              <span
                className={`admin-chat-list__status admin-chat-list__status--${contact.status}`}
                title={contact.status}
              />
            </div>
            <div className="admin-chat-list__info">
              <div className="admin-chat-list__name-row">
                <span className="admin-chat-list__name">{contact.name}</span>
                <span className="admin-chat-list__last-active">{contact.lastActive}</span>
              </div>
              <span className="admin-chat-list__role">{contact.role}</span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
