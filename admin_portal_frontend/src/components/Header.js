import React from "react";
import "./Header.css";

/**
 * Header bar for the admin portal.
 * Place global actions (logout, profile, etc) here.
 */
 // PUBLIC_INTERFACE
function Header({ onLogout, user }) {
  return (
    <header className="admin-header">
      <div className="admin-header-title">Admin Dashboard</div>
      <div className="admin-header-actions">
        {user && <span className="admin-header-user">Hello, {user.name || "Admin"}</span>}
        <button className="admin-header-logout" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
