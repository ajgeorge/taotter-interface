import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SidebarChatList.module.css';

export default function SidebarChatList({ onClose, isClosing = false }) {
  const navigate = useNavigate();
  
  const handleChatClick = (chatId) => {
    navigate(`/chat/${chatId}`);
    onClose();
  };

  const chats = [
    {
      id: 1,
      name: 'Kaiya George',
      role: 'Project Manager',
      lastActive: '15 mins',
      isOnline: true
    },
    {
      id: 2,
      name: 'Lindsey Curtis',
      role: 'Designer',
      lastActive: '30 mins',
      isOnline: true
    },
    {
      id: 3,
      name: 'Zain Geidt',
      role: 'Content Writer',
      lastActive: '45 mins',
      isOnline: true
    },
    {
      id: 4,
      name: 'Carla George',
      role: 'Front-end Developer',
      lastActive: '2 days',
      isOnline: false
    },
    {
      id: 5,
      name: 'Abram Schleifer',
      role: 'Digital Marketer',
      lastActive: '1 hour',
      isOnline: true
    },
    {
      id: 6,
      name: 'Lincoln Donin',
      role: 'Product Designer',
      lastActive: '3 days',
      isOnline: true
    },
    {
      id: 7,
      name: 'Erin Geidthem',
      role: 'Copywriter',
      lastActive: '5 days',
      isOnline: true
    },
    {
      id: 8,
      name: 'Alena Baptista',
      role: 'SEO Expert',
      lastActive: '2 hours',
      isOnline: false
    },
    {
      id: 9,
      name: 'Wilium Vamos',
      role: 'Content Writer',
      lastActive: '5 days',
      isOnline: true
    }
  ];

  return (
    <div className={`${styles.chatList} ${isClosing ? styles.closing : ''}`}>
      <div className={styles.header}>
        <span className={styles.title}>Chat</span>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close chat list"
        >
          ×
        </button>
      </div>
      
      <div className={styles.chatItems}>
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={styles.chatItem}
            onClick={() => handleChatClick(chat.id)}
          >
            <div className={styles.avatar}>
              <div className={`${styles.statusIndicator} ${chat.isOnline ? styles.online : styles.offline}`}></div>
            </div>
            <div className={styles.chatInfo}>
              <div className={styles.nameAndTime}>
                <span className={styles.name}>{chat.name}</span>
                <span className={styles.time}>{chat.lastActive}</span>
              </div>
              <span className={styles.role}>{chat.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
