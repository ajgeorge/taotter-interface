import React, { useState } from "react";
import "./StartupHeader.css";
import MenuFriesLeft from "../../../assets/icons/menu-fries-left.svg";
import TaotterBlueLogo from "../../../assets/logo/Taotter_blue_logo.png";
import SidebarChatList from "../SidebarChatList/SidebarChatList";

const CHAT_ANIMATION_DURATION = 300;

const StartupHeader = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatClosing, setChatClosing] = useState(false);

  const handleChatClick = (e) => {
    e.preventDefault();
    setSidebarOpen(false);
    setChatOpen(true);
    setChatClosing(false);
  };

  const handleChatClose = () => {
    setChatClosing(true);
    setTimeout(() => {
      setChatOpen(false);
      setChatClosing(false);
    }, CHAT_ANIMATION_DURATION);
  };

  return (
    <>
      <header className="startup-header">
        <button
          className="startup-header__menu-btn"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <img
            src={MenuFriesLeft}
            alt="Menu"
            className="startup-header__menu-icon"
          />
        </button>
        <div className="startup-header__logo-center">
          <img
            src={TaotterBlueLogo}
            alt="Taotter"
            className="startup-header__logo-img"
          />
        </div>
      </header>
      <aside className={`startup-sidebar${sidebarOpen ? " open" : ""}`}>
        <button
          className="startup-sidebar__close"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        >
          ×
        </button>
        <div className="startup-sidebar__section">
          <div className="startup-sidebar__subtitle">MENU</div>
          <nav>
            <a href="/dashboard" className="startup-sidebar__link">Dashboard</a>
            <a href="/boards" className="startup-sidebar__link">Board</a>
          </nav>
        </div>
        <div className="startup-sidebar__section">
          <div className="startup-sidebar__subtitle">SUPPORT</div>
          <nav>
            <a href="#" className="startup-sidebar__link" onClick={handleChatClick}>Chat</a>
          </nav>
        </div>
      </aside>
      {sidebarOpen && <div className="startup-sidebar__backdrop" onClick={() => setSidebarOpen(false)} />}
      {(chatOpen || chatClosing) && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 3000,
          width: "100vw",
          height: "100vh",
          background: "rgba(52,64,84,0.10)",
          display: "flex",
          alignItems: "flex-start"
        }}>
          <div style={{ height: "100vh" }}>
            <SidebarChatList onClose={handleChatClose} isClosing={chatClosing} />
          </div>
          <div
            style={{
              flex: 1,
              height: "100vh",
              cursor: "pointer"
            }}
            onClick={handleChatClose}
          />
        </div>
      )}
    </>
  );
};

export default StartupHeader;
