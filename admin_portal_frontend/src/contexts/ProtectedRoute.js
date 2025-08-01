import React from "react";
import { useAuth } from "./AuthContext";

/**
 * Protect routes/components so only authenticated admins can access.
 *
 * Usage: <ProtectedRoute fallback={<LoginPage />}><Page /></ProtectedRoute>
 */
 // PUBLIC_INTERFACE
function ProtectedRoute({ children, fallback = null }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return fallback || <div>Not authenticated.</div>;

  return children;
}

export default ProtectedRoute;
