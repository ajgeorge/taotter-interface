import React from "react";
import "./AdminHeader.css";
import menuIcon from "../../../assets/icons/Menu-2.svg";

export default function AdminHeader({ onMenuClick }) {
  return (
    <header className="admin-header">
      <button
        className="admin-header__menu-btn"
        aria-label="Open sidebar"
        onClick={onMenuClick}
      >
        <img src={menuIcon} alt="Menu" />
      </button>
      <div className="admin-header__content">
        {/* Add any additional header content here */}
      </div>
    </header>
  );
}
