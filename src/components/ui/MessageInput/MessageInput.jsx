import React from 'react';
import styles from './MessageInput.module.css';

export default function MessageInput({ value, onChange, onSend, onTyping, isTyping }) {
  const handleInputChange = (e) => {
    onChange && onChange(e.target.value);
    onTyping && onTyping(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && value?.trim()) {
      onSend && onSend(value);
      onTyping && onTyping(false);
    }
  };

  const handleSendClick = () => {
    if (value?.trim()) {
      onSend && onSend(value);
      onTyping && onTyping(false);
    }
  };

  return (
    <div className={styles.inputBar}>
      <div className={styles.inputWithIcons}>
        <div className={styles.emojiIcon}>
          <img src="/src/assets/icons/emoji-happy.svg" alt="emoji" />
        </div>
        <input
          className={styles.input}
          type="text"
          placeholder="Type a message"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {/* Removed attachment and microphone icons */}
      </div>
      <button className={styles.sendButton} onClick={handleSendClick}>
        <img src="/src/assets/icons/send.svg" alt="send" />
      </button>
    </div>
  );
}
