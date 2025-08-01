import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

/**
 * Sidebar navigation for admin portal using React Router.
 * Shows main navigation links for admin features.
 */
// PUBLIC_INTERFACE
function Sidebar({ items }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">Admin Portal</div>
      <nav>
        <ul>
          {items.map(({ label, icon, to }, idx) =>
            <li key={label} style={{ padding: 0, listStyle: 'none' }}>
              {/* Use NavLink for router-based navigation, fallback onClick for backward compatibility */}
              <NavLink
                to={to}
                className={({ isActive }) => isActive ? "sidebar-item active" : "sidebar-item"}
                style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
                end
              >
                {icon && <span className="sidebar-item-icon">{icon}</span>}
                <span>{label}</span>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
