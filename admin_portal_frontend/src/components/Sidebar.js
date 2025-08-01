import React from "react";
import "./Sidebar.css";

/**
 * Sidebar navigation for admin portal.
 * Shows main navigation links for admin features.
 */
 // PUBLIC_INTERFACE
function Sidebar({ items }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">Admin Portal</div>
      <nav>
        <ul>
          {items.map(({ label, icon, onClick, active }, idx) => (
            <li
              key={label}
              className={active ? "sidebar-item active" : "sidebar-item"}
              onClick={onClick}
            >
              {icon && <span className="sidebar-item-icon">{icon}</span>}
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
