import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { fetchAnalytics } from "../api/analyticsApi";

/**
 * Simple bar-chart-like visual for showing analytics metrics (no chart library).
 */
function SimpleBarChart({ data, label }) {
  if (!Array.isArray(data) || data.length === 0) return <div>No data</div>;
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div style={{ margin: "12px 0" }}>
      <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "flex-end", minHeight: 40 }}>
        {data.map((d, idx) => (
          <div key={d.label || idx} style={{ flex: 1, margin: "0 2px", textAlign: "center" }}>
            <div
              style={{
                background: "#1E88E5",
                height: `${max ? (40 * d.value) / max : 0}px`,
                borderRadius: "3px 3px 0 0",
                transition: "height 0.4s",
              }}
              title={`${d.label}: ${d.value}`}
            ></div>
            <div style={{ fontSize: 11, color: "#222", opacity: 0.67 }}>{d.label}</div>
            <div style={{ fontSize: 12, fontWeight: 600 }}>{d.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Analytics dashboard for metrics/usage visualization.
 * Uses backend analytics API.
 */
// PUBLIC_INTERFACE
function AnalyticsDashboard() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const adminToken = localStorage.getItem("admin_token");
        const data = await fetchAnalytics(adminToken);
        setMetrics(data);
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    }
    load();
  }, []);

  // Assume backend returns {studentCount, userCount, activeSessions, ...} and/or timeseries charts
  return (
    <div style={{ maxWidth: 700, margin: "0 auto", background: "var(--bg-secondary)", borderRadius: 12, boxShadow: "0 6px 32px rgba(60,60,70,0.12)", padding: 32, minHeight: 340, marginBottom: 30 }}>
      <h2 style={{ textAlign: "center" }}>Platform Analytics</h2>
      {loading && <div>Loading analytics data...</div>}
      {error && <div style={{ color: "#e53935" }}>Error: {error}</div>}
      {metrics && (
        <div>
          <div style={{ display: "flex", gap: 34, justifyContent: "center", marginBottom: 30, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 26, fontWeight: 600, color: "#1E88E5" }}>{metrics.studentCount ?? "?"}</div>
              <div>Students</div>
            </div>
            <div>
              <div style={{ fontSize: 26, fontWeight: 600, color: "#43A047" }}>{metrics.userCount ?? "?"}</div>
              <div>Admin Users</div>
            </div>
            <div>
              <div style={{ fontSize: 26, fontWeight: 600, color: "#1565C0" }}>{metrics.activeSessions ?? "?"}</div>
              <div>Active Sessions</div>
            </div>
          </div>
          {metrics?.signupsByDay && (
            <SimpleBarChart data={metrics.signupsByDay} label="Student signups (last 7 days)" />
          )}
          {metrics?.loginsByDay && (
            <SimpleBarChart data={metrics.loginsByDay} label="Admin logins (last 7 days)" />
          )}
        </div>
      )}
      {!loading && !metrics && (
        <div>No analytics data available.</div>
      )}
    </div>
  );
}

export default AnalyticsDashboard;
