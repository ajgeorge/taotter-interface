import React from 'react';
import styles from './ChatMessageArea.module.css';
import ChatHeader from '../../ui/ChatHeader/ChatHeader';
import ChatMessage from '../../ui/ChatMessage/ChatMessage';
import MessageInput from '../../ui/MessageInput/MessageInput';

export default function ChatMessageArea() {
  const messages = [
    {
      id: 1,
      user: { name: 'Lindsey Curtis', avatar: '', isOnline: true },
      content: "If don't like something, I'll stay away from it.",
      timestamp: 'Lindsey, 2 hours ago',
      isOwnMessage: false
    },
    {
      id: 2,
      content: "If don't like something, I'll stay away from it.",
      timestamp: '2 hours ago',
      isOwnMessage: true
    },
    {
      id: 3,
      user: { name: 'Lindsey Curtis', avatar: '', isOnline: true },
      content: "I want more detailed information.",
      timestamp: 'Lindsey, 2 hours ago',
      isOwnMessage: false
    },
    {
      id: 4,
      content: ["If don't like something, I'll stay away from it.", "They got there early, and got really good seats."],
      timestamp: '2 hours ago',
      isOwnMessage: true
    },
    {
      id: 5,
      user: { name: 'Lindsey Curtis', avatar: '', isOnline: true },
      content: "Please preview the image",
      timestamp: 'Lindsey, 2 hours ago',
      hasImage: true,
      isOwnMessage: false
    }
  ];

  return (
    <div className={styles.messageArea}>
      <div className={styles.messageContainer}>
        <ChatHeader 
          user={{ name: 'Lindsey Curtis', isOnline: true }}
        />
        
        <div className={styles.messagesWrapper}>
          <div className={styles.messagesList}>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>
          
          <div className={styles.scrollbar}>
            <svg width="18" height="748" viewBox="0 0 18 748" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 15C0 13.3431 1.34315 12 3 12C4.65685 12 6 13.3431 6 15V63C6 64.6569 4.65685 66 3 66C1.34315 66 0 64.6569 0 63V15Z" fill="#E4E7EC" />
            </svg>
          </div>
        </div>
      </div>
      
      <MessageInput />
    </div>
  );
}
