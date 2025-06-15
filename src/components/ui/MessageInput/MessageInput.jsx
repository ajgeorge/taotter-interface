import React from 'react';
import styles from './MessageInput.module.css';

export default function MessageInput() {
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
        />
        <div className={styles.iconGroup}>
          <img src="/src/assets/icons/attachment.svg" alt="attach" />
          <img src="/src/assets/icons/microphone.svg" alt="mic" />
        </div>
      </div>
      <button className={styles.sendButton}>
        <img src="/src/assets/icons/send.svg" alt="send" />
      </button>
    </div>
  );
}
