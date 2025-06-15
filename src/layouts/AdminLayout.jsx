import React, { useState, useCallback } from "react";
import AdminHeader from "../components/layout/AdminHeader/AdminHeader";
import AdminSidebar from "../components/layout/AdminSidebar/AdminSidebar";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Use useCallback to avoid unnecessary re-renders
  const handleMenuClick = useCallback(() => {
    setSidebarOpen((open) => !open);
  }, []);

  return (
    <div className="admin-layout" style={{ display: "flex", minHeight: "100vh", position: "relative" }}>
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <AdminHeader onMenuClick={handleMenuClick} />
        <main style={{ flex: 1, background: "#f8fafc", padding: "24px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
