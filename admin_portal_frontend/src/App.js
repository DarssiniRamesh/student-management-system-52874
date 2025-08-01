import React, { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./contexts/ProtectedRoute";
import MainLayout from "./components/MainLayout";
import LoginPage from "./pages/LoginPage";
import logo from "./logo.svg";
import "./App.css";
import "./components/Sidebar.css";
import "./components/Header.css";
import "./components/MainLayout.css";
import "./pages/LoginPage.css";
import StudentManager from "./components/StudentManager";
import { useCallback } from "react";
import BackendConfigPage from "./components/BackendConfigPage";
import "./components/BackendConfigPage.css";

// Enhanced navigation and page routing for Students section.
function AdminApp() {
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState("light");
  const [activePage, setActivePage] = useState("dashboard");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Update nav items with current page
  const navItems = [
    {
      label: "Dashboard",
      icon: "📊",
      onClick: () => setActivePage("dashboard"),
      active: activePage === "dashboard"
    },
    {
      label: "Students",
      icon: "🎓",
      onClick: () => setActivePage("students"),
      active: activePage === "students"
    },
    {
      label: "Config",
      icon: "⚙️",
      onClick: () => setActivePage("config"),
      active: activePage === "config"
    },
    {
      label: "Roles",
      icon: "🛡️",
      onClick: () => setActivePage("roles"),
      active: activePage === "roles"
    },
  ];

  // Content switching by activePage
  let content = null;
  if (activePage === "students") {
    content = <StudentManager />;
  } else if (activePage === "dashboard") {
    content = (
      <div
        style={{
          textAlign: "center",
          marginTop: "48px",
        }}
      >
        <img src={logo} className="App-logo" alt="logo" style={{ height: 100 }} />
        <h2>Welcome to the Admin Portal</h2>
        <p>
          Use the sidebar to navigate admin features.
          <br />
          (This content area updates as you select sections.)
        </p>
        <p>
          Current theme: <strong>{theme}</strong>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </div>
    );
  } else if (activePage === "config") {
    content = <BackendConfigPage />;
  } else {
    content = <div style={{ padding: 40 }}>Feature: <b>{activePage}</b> (Coming soon...)</div>;
  }

  return (
    <ProtectedRoute fallback={<LoginPage />}>
      <div className="App">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
        <MainLayout navItems={navItems} user={user} onLogout={logout}>
          {content}
        </MainLayout>
      </div>
    </ProtectedRoute>
  );
}

// PUBLIC_INTERFACE
function App() {
  // Wrap everything with AuthProvider as root
  return (
    <AuthProvider>
      <AdminApp />
    </AuthProvider>
  );
}

export default App;
