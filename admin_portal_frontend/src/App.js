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

// Demo navigation items (normally generated based on section/route)
const demoNavItems = [
  { label: "Dashboard", icon: "📊", onClick: () => {}, active: true },
  { label: "Students", icon: "🎓", onClick: () => {}, active: false },
  { label: "Config", icon: "⚙️", onClick: () => {}, active: false },
  { label: "Roles", icon: "🛡️", onClick: () => {}, active: false },
];

function AdminApp() {
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

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
        <MainLayout navItems={demoNavItems} user={user} onLogout={logout}>
          {/* MAIN CONTENT DEMO */}
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
