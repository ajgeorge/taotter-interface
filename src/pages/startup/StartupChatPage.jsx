import React from 'react';
import styles from './StartupChatPage.module.css';
import Breadcrumb from '../../components/ui/Breadcrumb/Breadcrumb';
import ChatSidebar from '../../components/layout/ChatSidebar/ChatSidebar';
import ChatMessageArea from '../../components/layout/ChatMessageArea/ChatMessageArea';

export default function StartupChatPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Chat', href: '/chat', isActive: true }
  ];

  return (
    <div className={styles.chatPage}>
      <div className={styles.container}>
        <Breadcrumb items={breadcrumbItems} title="Chat" />
      </div>
      
      <div className={styles.chatLayout}>
        <div className={styles.sidebarContainer}>
          <ChatSidebar />
          <ChatMessageArea />
        </div>
      </div>
    </div>
  );
}
