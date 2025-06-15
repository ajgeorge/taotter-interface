import React, { useRef, useEffect } from "react";
import "./AdminChatArea.css";

export default function AdminChatArea({
  contact,
  messages,
  onSend,
  value,
  onChange,
  onAttach,
  onMic,
  onEmoji
}) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section className="admin-chat-area">
      <div className="admin-chat-area__header">
        <div className="admin-chat-area__user">
          <div className="admin-chat-area__avatar-wrap">
            <img src={contact.avatar} alt={contact.name} className="admin-chat-area__avatar" />
            <span
              className={`admin-chat-area__status admin-chat-area__status--${contact.status}`}
              title={contact.status}
            />
          </div>
          <span className="admin-chat-area__name">{contact.name}</span>
        </div>
        <div className="admin-chat-area__actions">
          <button className="admin-chat-area__icon-btn" aria-label="Call">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path d="M5.54488 11.7254L8.80112 10.056C8.94007 9.98476 9.071 9.89524 9.16639 9.77162C9.57731 9.23912 9.66722 8.51628 9.38366 7.89244L7.76239 4.32564C7.23243 3.15974 5.7011 2.88206 4.79552 3.78764L3.72733 4.85577C3.36125 5.22182 3.18191 5.73847 3.27376 6.24794C3.9012 9.72846 5.56003 13.0595 8.25026 15.7497C10.9405 18.44 14.2716 20.0988 17.7521 20.7262C18.2615 20.8181 18.7782 20.6388 19.1442 20.2727L20.2124 19.2045C21.118 18.2989 20.8403 16.7676 19.6744 16.2377L16.1076 14.6164C15.4838 14.3328 14.7609 14.4227 14.2284 14.8336C14.1048 14.929 14.0153 15.06 13.944 15.1989L12.2747 18.4552" stroke="#1D2939" strokeWidth="1.5" />
            </svg>
          </button>
          <button className="admin-chat-area__icon-btn" aria-label="Video">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <rect x="3" y="0.75" width="10" height="12.5" rx="5" stroke="#323544" strokeWidth="1.5" />
              <path d="M16 8.25C16 12.6683 12.4183 16.25 8 16.25C3.58172 16.25 0 12.6683 0 8.25" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M6 19.25H10" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 16.25L8 19.25" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 5.5L8 8.5" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10.5 6.25L10.5 7.75" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5.5 6.25L5.5 7.75" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="admin-chat-area__icon-btn" aria-label="Menu">
            <svg width="4" height="16" fill="none" viewBox="0 0 4 16">
              <path d="M2.18262 12.2588C3.06529 12.3482 3.75391 13.0937 3.75391 14C3.75391 14.9063 3.06529 15.6518 2.18262 15.7412L2.00391 15.75H1.99414C1.02764 15.75 0.244141 14.9665 0.244141 14C0.244141 13.0335 1.02764 12.25 1.99414 12.25H2.00391L2.18262 12.2588ZM2.18262 6.25879C3.06529 6.34819 3.75391 7.09375 3.75391 8C3.75391 8.90625 3.06529 9.65181 2.18262 9.74121L2.00391 9.75H1.99414C1.02764 9.75 0.244141 8.9665 0.244141 8C0.244141 7.0335 1.02764 6.25 1.99414 6.25H2.00391L2.18262 6.25879ZM2.18262 0.258789C3.06529 0.348189 3.75391 1.09375 3.75391 2C3.75391 2.90625 3.06529 3.65181 2.18262 3.74121L2.00391 3.75H1.99414C1.02764 3.75 0.244141 2.9665 0.244141 2C0.244141 1.0335 1.02764 0.25 1.99414 0.25H2.00391L2.18262 0.258789Z" fill="#344054" />
            </svg>
          </button>
        </div>
      </div>
      <div className="admin-chat-area__messages">
        {messages.map((msg, i) => (
          <div
            key={msg.id}
            className={`admin-chat-area__message${msg.mine ? " admin-chat-area__message--mine" : ""}`}
          >
            {!msg.mine && (
              <div className="admin-chat-area__avatar-msg">
                <img src={contact.avatar} alt={contact.name} className="admin-chat-area__avatar-msg-img" />
              </div>
            )}
            <div className="admin-chat-area__bubble-wrap">
              {msg.image && (
                <div className="admin-chat-area__image">
                  <img src={msg.image} alt="attachment" />
                </div>
              )}
              <div className="admin-chat-area__bubble">
                {msg.content.split("\n").map((line, idx) => (
                  <span key={idx}>{line}</span>
                ))}
              </div>
              <span className="admin-chat-area__meta">
                {msg.mine ? msg.time : `${contact.name}, ${msg.time}`}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form
        className="admin-chat-area__input-row"
        onSubmit={e => {
          e.preventDefault();
          if (onSend && value?.trim()) onSend(value);
        }}
      >
        <button type="button" className="admin-chat-area__icon-btn" aria-label="Emoji" onClick={onEmoji}>
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="9.25" stroke="#323544" strokeWidth="1.5" />
            <circle cx="6.5" cy="8.5" r="1" fill="#323544" />
            <circle cx="13.5" cy="8.5" r="1" fill="#323544" />
            <path d="M7 13c.667.667 2.333.667 3 0" stroke="#323544" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <input
          className="admin-chat-area__input"
          type="text"
          placeholder="Type a message"
          value={value}
          onChange={e => onChange?.(e.target.value)}
        />
        <button type="button" className="admin-chat-area__icon-btn" aria-label="Attach" onClick={onAttach}>
          <svg width="16" height="20" fill="none" viewBox="0 0 16 20">
            <path d="M4.29785 0C6.52033 1.94296e-07 8.33511 1.74558 8.44629 3.94043L8.4502 4.11133C8.45099 4.12545 8.45312 4.13998 8.45312 4.1543V14.1445C8.4529 15.4984 7.35491 16.5966 6.00098 16.5967C4.73172 16.5966 3.68737 15.6316 3.56152 14.3955L3.54883 14.1445V4.1543C3.54883 3.74013 3.88468 3.40437 4.29883 3.4043C4.71304 3.4043 5.04883 3.74008 5.04883 4.1543V14.1445L5.05371 14.2422C5.10276 14.7219 5.50838 15.0966 6.00098 15.0967C6.52648 15.0966 6.9529 14.67 6.95312 14.1445V12.4609C6.95297 12.4548 6.95215 12.4486 6.95215 12.4424V4.1543L6.93848 3.88281C6.80264 2.54451 5.67199 1.5 4.29785 1.5C2.83241 1.5003 1.64453 2.68879 1.64453 4.1543V14.1436C1.64453 16.549 3.59464 18.4997 6 18.5C8.40565 18.5 10.3564 16.5492 10.3564 14.1436V7.55762C10.3565 7.14356 10.6924 6.80777 11.1064 6.80762C11.5205 6.80777 11.8564 7.14356 11.8564 7.55762V14.1436C11.8564 17.3776 9.23408 20 6 20C2.76621 19.9997 0.144531 17.3774 0.144531 14.1436V4.1543C0.144531 1.86036 2.00398 0.000301954 4.29785 0Z" fill="#667085" />
          </svg>
        </button>
        <button type="button" className="admin-chat-area__icon-btn" aria-label="Mic" onClick={onMic}>
          <svg width="16" height="20" fill="none" viewBox="0 0 16 20">
            <rect x="3" y="0.75" width="10" height="12.5" rx="5" stroke="#667085" strokeWidth="1.5" />
            <path d="M16 8.25C16 12.6683 12.4183 16.25 8 16.25C3.58172 16.25 0 12.6683 0 8.25" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M6 19.25H10" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 16.25L8 19.25" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 5.5L8 8.5" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.5 6.25L10.5 7.75" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.5 6.25L5.5 7.75" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button type="submit" className="admin-chat-area__send-btn" aria-label="Send">
          <svg width="18" height="16" fill="none" viewBox="0 0 18 16" style={{ transform: "rotate(90deg)" }}>
            <path d="M15.9754 6.04141C17.5484 6.92105 17.4962 9.25705 15.8182 10.0395L3.98422 15.5561C2.11292 16.4284 0.153069 14.5305 0.964691 12.6322L2.82016 8.29434L2.84653 8.22305C2.89177 8.07781 2.89178 7.92199 2.84653 7.77676L2.82016 7.70449L0.964692 3.36758C0.153229 1.46942 2.11302 -0.42837 3.98422 0.443751L15.8182 5.96035L15.9754 6.04141ZM15.1844 8.6791C15.7253 8.42653 15.7594 7.68934 15.286 7.37637L15.1844 7.31973L3.35043 1.80313C2.72686 1.51267 2.07352 2.14519 2.3436 2.77774L4.19907 7.11465L4.24887 7.24746L8.11704 7.24746C8.53125 7.24746 8.86704 7.58325 8.86704 7.99746C8.86687 8.41153 8.53115 8.74746 8.11704 8.74746L4.25082 8.74746L4.19907 8.88516L2.3436 13.2221C2.07336 13.8547 2.72679 14.4873 3.35043 14.1967L15.1844 8.6791Z" fill="#fff" />
          </svg>
        </button>
      </form>
    </section>
  );
}
