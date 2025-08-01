import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  fetchBackendConfig,
  updateBackendConfig,
} from "../api/configApi";

/**
 * BackendConfigPage: UI for managing backend/system settings.
 * - Displays and allows update of key settings, feature flags/toggles, and advanced config.
 * - Integrates with backend config API using current auth session.
 *
 * Backend config example fields:
 * - systemName (string)
 * - enableStudentSignup (bool)
 * - apiRateLimit (int)
 * - logLevel (select/string)
 * - advanced (string/JSON)
 */
// PUBLIC_INTERFACE
function BackendConfigPage() {
  const { user } = useAuth();
  const [config, setConfig] = useState(null);
  const [form, setForm] = useState({
    systemName: "",
    enableStudentSignup: false,
    apiRateLimit: 30,
    logLevel: "info",
    advanced: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Load config from backend
    async function loadConfig() {
      setLoading(true);
      setError("");
      try {
        // In real deployment: must pass admin token for auth
        const adminToken = localStorage.getItem("admin_token");
        const data = await fetchBackendConfig(adminToken);
        setConfig(data);
        setForm({
          systemName: data.systemName || "",
          enableStudentSignup: !!data.enableStudentSignup,
          apiRateLimit: data.apiRateLimit ?? 30,
          logLevel: data.logLevel || "info",
          advanced:
            typeof data.advanced === "object"
              ? JSON.stringify(data.advanced, null, 2)
              : data.advanced || "",
        });
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    }
    loadConfig();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess("");
    setError("");
    try {
      let advancedObj = form.advanced;
      if (form.advanced.trim().length > 0) {
        // Optionally parse JSON, fallback as string
        try {
          advancedObj = JSON.parse(form.advanced);
        } catch {
          advancedObj = form.advanced;
        }
      }

      const payload = {
        systemName: form.systemName,
        enableStudentSignup: form.enableStudentSignup,
        apiRateLimit: Number(form.apiRateLimit) || 30,
        logLevel: form.logLevel,
        advanced: advancedObj,
      };
      const adminToken = localStorage.getItem("admin_token");
      const result = await updateBackendConfig(payload, adminToken);
      setConfig(result);
      setSuccess("Configuration updated successfully!");
    } catch (e) {
      setError(e.message || "Failed to update configuration");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="backend-config-container">
        <h3>System Configuration</h3>
        <div>Loading configuration...</div>
      </div>
    );
  }
  if (error)
    return (
      <div className="backend-config-container">
        <h3>System Configuration</h3>
        <div style={{ color: "#e53935" }}>Error: {error}</div>
      </div>
    );

  return (
    <div className="backend-config-container" style={{ maxWidth: 540, margin: "0 auto" }}>
      <h3>System Configuration</h3>
      <form className="backend-config-form" onSubmit={handleSubmit}>
        <label>
          System Name:
          <input
            type="text"
            name="systemName"
            value={form.systemName}
            onChange={handleChange}
            disabled={saving}
            required
          />
        </label>
        <label>
          Enable Student Signup:
          <input
            type="checkbox"
            name="enableStudentSignup"
            checked={form.enableStudentSignup}
            onChange={handleChange}
            disabled={saving}
            style={{ marginLeft: 12 }}
          />
        </label>
        <label>
          API Rate Limit (per minute):
          <input
            type="number"
            name="apiRateLimit"
            min={1}
            max={1000}
            value={form.apiRateLimit}
            onChange={handleChange}
            disabled={saving}
          />
        </label>
        <label>
          Log Level:
          <select
            name="logLevel"
            value={form.logLevel}
            onChange={handleChange}
            disabled={saving}
          >
            <option value="debug">Debug</option>
            <option value="info">Info</option>
            <option value="warn">Warning</option>
            <option value="error">Error</option>
          </select>
        </label>
        <label>
          <span>
            Advanced Config (JSON or text)<br />
            <span style={{ fontSize: "0.92em", color: "#2468ff" }}>
              For developer/advanced use.
            </span>
          </span>
          <textarea
            name="advanced"
            value={form.advanced}
            onChange={handleChange}
            rows={4}
            style={{ fontSize: 14, fontFamily: "monospace" }}
            disabled={saving}
          />
        </label>
        <div style={{ marginTop: 22, display: "flex", gap: 9 }}>
          <button className="btn btn-large" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Configuration"}
          </button>
          {success && (
            <span style={{ color: "#43A047", alignSelf: "center" }}>{success}</span>
          )}
          {error && (
            <span style={{ color: "#e53935", alignSelf: "center" }}>{error}</span>
          )}
        </div>
      </form>
    </div>
  );
}

export default BackendConfigPage;
