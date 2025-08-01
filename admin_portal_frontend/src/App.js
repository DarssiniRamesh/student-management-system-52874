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
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import BackendConfigPage from "./components/BackendConfigPage";
import "./components/BackendConfigPage.css";

/**
 * Hook for setting theme with persistency in the Admin Portal.
 */
function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem("admin_theme") || "light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("admin_theme", theme);
  }, [theme]);
  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));
  return [theme, toggleTheme];
}

// Enhanced navigation and page routing for Admin Portal.
function AdminAppRouter() {
  const { user, logout } = useAuth();
  const [theme, toggleTheme] = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  // Map sidebar navigation to app routes.
  // The key is used for <Route path>.
  const itemDefs = [
    {
      key: "/dashboard",
      label: "Dashboard",
      icon: "📊",
      element: <AnalyticsDashboard />,
    },
    {
      key: "/students",
      label: "Students",
      icon: "🎓",
      element: <StudentManager />,
    },
    {
      key: "/users",
      label: "Users",
      icon: "👤",
      element: <UserManager />,
    },
    {
      key: "/roles",
      label: "Roles",
      icon: "🛡️",
      element: <RoleManager />,
    },
    {
      key: "/config",
      label: "Config",
      icon: "⚙️",
      element: <BackendConfigPage />,
    },
  ];

  // Sidebar items (each can navigate to its route)
  const navItems = itemDefs.map(({ key, label, icon }) => ({
    label,
    icon,
    to: key,
    active: location.pathname === key,
    onClick: () => { if (location.pathname !== key) navigate(key); },
  }));

  // Find the first available item to redirect from "/"
  const defaultRoute = "/dashboard";

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
          <Routes>
            <Route path="/" element={<Navigate to={defaultRoute} replace />} />
            {itemDefs.map(({ key, element }) =>
              <Route key={key} path={key} element={element} />
            )}
            {/* 404 fallback */}
            <Route path="*" element={<div style={{ padding: 40, textAlign: 'center' }}>
              <h2>Not Found</h2>
              <div>That page does not exist.</div>
            </div>} />
          </Routes>
        </MainLayout>
      </div>
    </ProtectedRoute>
  );
}

// PUBLIC_INTERFACE
function App() {
  // Wrap everything with AuthProvider as root and with BrowserRouter
  return (
    <AuthProvider>
      <BrowserRouter>
        <AdminAppRouter />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
