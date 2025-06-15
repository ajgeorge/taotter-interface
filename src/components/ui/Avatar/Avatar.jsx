import React from 'react';
import styles from './Avatar.module.css';

export default function Avatar({ user, size = "medium" }) {
  // You can expand this to use user.avatar for images
  return (
    <div className={`${styles.avatar} ${styles[size]}`}>
      <div className={user.isOnline ? styles.online : styles.offline}></div>
      {/* Placeholder for avatar image or initials */}
    </div>
  );
}
