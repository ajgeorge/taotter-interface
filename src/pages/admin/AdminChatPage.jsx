import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import Breadcrumb from "../../components/ui/Breadcrumb/Breadcrumb";
import AdminChatList from "../../components/admin/AdminChatList";
import AdminChatArea from "../../components/admin/AdminChatArea";
import { useGetChatListQuery, useGetMessagesQuery, useSendMessageMutation } from "../../store/api/chatApi";
import { useSelector } from "react-redux";
import useSocket from "../../hooks/useSocket";
import "./AdminChatPage.css";

export default function AdminChatPage() {
  const { id: chatId } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Get current user info
  const currentUser = useSelector(state => state.auth.user);

  // Fetch chat list to get contact info
  const { data: chatListData } = useGetChatListQuery();

  // Fetch messages for the selected chat
  const { data, isLoading, error, refetch } = useGetMessagesQuery(chatId, { skip: !chatId });

  // Send message mutation
  const [sendMessage] = useSendMessageMutation();

  // Find current chat and contact info
  const currentChat = chatListData?.data?.chats?.find(chat => chat._id === chatId);
  const contact = currentChat?.startupId ? {
    id: currentChat.startupId._id,
    name: `${currentChat.startupId.profile?.founderFirstName || ""} ${currentChat.startupId.profile?.founderLastName || ""}`.trim() || currentChat.startupId.email,
    avatar: "/assets/icons/User.svg",
    status: "online", // TODO: Replace with real status
    role: currentChat.startupId.profile?.companyName || ""
  } : { id: chatId, name: "Unknown Contact", avatar: "/assets/icons/User.svg", status: "offline", role: "" };

  // Real-time socket integration
  const socket = useSocket({
    onMessage: (msg) => {
      if (msg.conversationId === chatId) {
        setMessages(prev => [...prev, msg]);
      }
    },
    onUserTyping: (data) => {
      if (data.conversationId === chatId) {
        setIsTyping(data.isTyping);
      }
    }
  });

  // Join chat room on mount/change
  useEffect(() => {
    if (chatId && socket.joinConversation) {
      socket.joinConversation(chatId);
    }
    return () => {
      if (chatId && socket.leaveConversation) {
        socket.leaveConversation(chatId);
      }
    };
    // eslint-disable-next-line
  }, [chatId]);

  // Load messages from API and transform them
  useEffect(() => {
    if (data && data.data && data.data.messages) {
      console.log('Current User:', currentUser); // Debug log
      const transformedMessages = data.data.messages.map(msg => {
        console.log('Message:', msg.senderType, 'User Role:', currentUser?.role); // Debug log
        const isMyMessage = msg.senderType === 'admin' && (currentUser?.role === 'admin' || currentUser?.role === 'super_admin');
        return {
          id: msg._id,
          sender: msg.senderType === 'admin' ? 'Admin' : contact.name,
          avatar: msg.senderType === 'admin' ? "/assets/icons/User.svg" : contact.avatar,
          content: msg.content || "",
          time: new Date(msg.createdAt).toLocaleTimeString(),
          mine: isMyMessage,
          image: msg.imageUrl || null
        };
      });
      setMessages(transformedMessages);
    }
  }, [data, contact.name, contact.avatar, currentUser]);

  // Handle sending a message
  const handleSend = useCallback(
    async (msg, file) => {
      if (!msg && !file) return;
      try {
        // Send via REST for persistence
        await sendMessage({ chatId, content: msg, file }).unwrap();
        setInput("");
      } catch (err) {
        alert("Failed to send message");
      }
    },
    [chatId, sendMessage, socket, refetch]
  );

  // Typing indicator
  const handleTyping = useCallback(
    (typing) => {
      socket.sendTyping && socket.sendTyping(chatId, typing);
    },
    [chatId, socket]
  );

  return (
    <AdminLayout>
      <div className="admin-chat-page">
        <div className="admin-chat-breadcrumb">
          <Breadcrumb
            items={[
              { label: "Home", href: "/admin/dashboard" },
              { label: "Chat", href: "/admin/chat", isActive: true }
            ]}
          />
        </div>
        <div className="admin-chat-main">
          <AdminChatList
            selectedId={chatId}
            onSelect={contactId => navigate(`/admin/chat/${contactId}`)}
            search={search}
            onSearchChange={setSearch}
          />
          <div className="admin-chat-message-area">
            {chatId ? (
              <AdminChatArea
                contact={contact}
                messages={messages}
                value={input}
                onChange={setInput}
                onSend={handleSend}
                onAttach={file => handleSend("", file)}
                onMic={() => {}}
                onEmoji={() => {}}
                isTyping={isTyping}
                onTyping={handleTyping}
                isLoading={isLoading}
                error={error}
              />
            ) : (
              <div className="admin-chat-empty-state">
                <h2>Select a chat to start messaging</h2>
                <p>Choose a contact from the list to view and send messages.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
