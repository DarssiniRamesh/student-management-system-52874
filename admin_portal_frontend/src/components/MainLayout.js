import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./MainLayout.css";

/**
 * Main layout for admin portal wrapping the sidebar, header, and main area.
 * Protects content: Only renders for authenticated admin.
 * Children: rendered in main area.
 */
// PUBLIC_INTERFACE
function MainLayout({ children, navItems, user, onLogout }) {
  return (
    <div className="admin-root-layout">
      <Sidebar items={navItems} />
      <div className="admin-main-content">
        <Header onLogout={onLogout} user={user} />
        <main className="admin-content-area">{children}</main>
      </div>
    </div>
  );
}

export default MainLayout;
