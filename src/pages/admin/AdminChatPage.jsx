import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import Breadcrumb from "../../components/ui/Breadcrumb/Breadcrumb";
import AdminChatList from "../../components/admin/AdminChatList";
import AdminChatArea from "../../components/admin/AdminChatArea";
import "./AdminChatPage.css";

// Mock contacts
const contacts = [
  {
    id: "1",
    name: "Kaiya George",
    role: "Project Manager",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    status: "online",
    lastActive: "15 mins"
  },
  {
    id: "2",
    name: "Lindsey Curtis",
    role: "Designer",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    status: "online",
    lastActive: "30 mins"
  },
  {
    id: "3",
    name: "Zain Geidt",
    role: "Content Writer",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    status: "online",
    lastActive: "45 mins"
  },
  {
    id: "4",
    name: "Carla George",
    role: "Front-end Developer",
    avatar: "https://randomuser.me/api/portraits/women/47.jpg",
    status: "busy",
    lastActive: "2 days"
  },
  {
    id: "5",
    name: "Abram Schleifer",
    role: "Digital Marketer",
    avatar: "https://randomuser.me/api/portraits/men/48.jpg",
    status: "online",
    lastActive: "1 hour"
  },
  {
    id: "6",
    name: "Lincoln Donin",
    role: "Product Designer",
    avatar: "https://randomuser.me/api/portraits/men/49.jpg",
    status: "online",
    lastActive: "3 days"
  },
  {
    id: "7",
    name: "Erin Geidthem",
    role: "Copywriter",
    avatar: "https://randomuser.me/api/portraits/women/50.jpg",
    status: "online",
    lastActive: "5 days"
  },
  {
    id: "8",
    name: "Alena Baptista",
    role: "SEO Expert",
    avatar: "https://randomuser.me/api/portraits/women/51.jpg",
    status: "offline",
    lastActive: "2 hours"
  },
  {
    id: "9",
    name: "Wilium vamos",
    role: "Content Writer",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    status: "online",
    lastActive: "5 days"
  }
];

// Mock messages
const mockMessages = [
  {
    id: 1,
    sender: "Lindsey Curtis",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    content: "If don’t like something, I’ll stay away from it.",
    time: "2 hours ago",
    mine: false
  },
  {
    id: 2,
    sender: "Me",
    avatar: "",
    content: "If don’t like something, I’ll stay away from it.",
    time: "2 hours ago",
    mine: true
  },
  {
    id: 3,
    sender: "Lindsey Curtis",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    content: "I want more detailed information.",
    time: "2 hours ago",
    mine: false
  },
  {
    id: 4,
    sender: "Me",
    avatar: "",
    content: "If don’t like something, I’ll stay away from it.\nThey got there early, and got really good seats.",
    time: "2 hours ago",
    mine: true
  },
  {
    id: 5,
    sender: "Lindsey Curtis",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    content: "Please preview the image",
    time: "2 hours ago",
    mine: false,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
  }
];

export default function AdminChatPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(mockMessages);

  // Filter contacts by search
  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.role.toLowerCase().includes(search.toLowerCase())
  );

  // Find selected contact
  const selectedContact = contacts.find(c => c.id === id) || filteredContacts[0];

  // Reset messages when contact changes (for demo)
  React.useEffect(() => {
    setMessages(mockMessages);
    setInput("");
  }, [id]);

  function handleSend(msg) {
    setMessages(prev => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "Me",
        avatar: "",
        content: msg,
        time: "now",
        mine: true
      }
    ]);
    setInput("");
  }

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
            contacts={filteredContacts}
            selectedId={selectedContact?.id}
            onSelect={contactId => navigate(`/admin/chat/${contactId}`)}
            search={search}
            onSearchChange={setSearch}
          />
          <div className="admin-chat-message-area">
            {selectedContact ? (
              <AdminChatArea
                contact={selectedContact}
                messages={messages}
                value={input}
                onChange={setInput}
                onSend={handleSend}
                onAttach={() => {}}
                onMic={() => {}}
                onEmoji={() => {}}
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
