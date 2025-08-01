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
import UserManager from "./components/UserManager";
import RoleManager from "./components/RoleManager";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import { useCallback } from "react";
import BackendConfigPage from "./components/BackendConfigPage";
import "./components/BackendConfigPage.css";

// Enhanced navigation and page routing for Admin Portal.
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

  // Navigation items for sidebar
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
      label: "Users",
      icon: "👤",
      onClick: () => setActivePage("users"),
      active: activePage === "users"
    },
    {
      label: "Roles",
      icon: "🛡️",
      onClick: () => setActivePage("roles"),
      active: activePage === "roles"
    },
    {
      label: "Config",
      icon: "⚙️",
      onClick: () => setActivePage("config"),
      active: activePage === "config"
    },
  ];

  // Content switching by activePage
  let content = null;
  if (activePage === "dashboard") {
    content = <AnalyticsDashboard />;
  } else if (activePage === "students") {
    content = <StudentManager />;
  } else if (activePage === "users") {
    content = <UserManager />;
  } else if (activePage === "roles") {
    content = <RoleManager />;
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
