import React, { createContext, useState, useContext, useEffect } from "react";

/**
 * AuthContext for managing admin authentication state globally.
 */
const AuthContext = createContext(null);

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  // In real app, initialize from storage/token
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, simulate auth check (replace with real backend call/token check)
  useEffect(() => {
    setLoading(true);
    // Simulate async, e.g., fetching token from localstorage or backend
    const token = localStorage.getItem("admin_token");
    if (token) {
      setUser({ name: "Admin" }); // Replace with real user fetch
    }
    setLoading(false);
  }, []);

  // PUBLIC_INTERFACE
  const login = (username, password) => {
    // Replace this logic with real backend auth call
    if (username === "admin" && password === "admin123") {
      setUser({ name: "Admin" });
      localStorage.setItem("admin_token", "demotoken");
      return true;
    }
    return false;
  };

  // PUBLIC_INTERFACE
  const logout = () => {
    setUser(null);
    localStorage.removeItem("admin_token");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useAuth() {
  return useContext(AuthContext);
}
