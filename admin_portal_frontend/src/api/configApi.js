const BASE_URL = process.env.REACT_APP_BACKEND_API_URL || "";

/**
 * Attach auth header if using JWT from current admin session.
 * @param {string} token
 */
function getHeaders(token) {
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// PUBLIC_INTERFACE
/**
 * Fetch backend configuration (system settings and toggles)
 */
export async function fetchBackendConfig(token) {
  const resp = await fetch(`${BASE_URL}/admin/config`, {
    headers: getHeaders(token),
  });
  if (!resp.ok) throw new Error("Failed to fetch backend config");
  return await resp.json();
}

// PUBLIC_INTERFACE
/**
 * Update (patch/PUT) backend configuration
 * @param {Object} data
 */
export async function updateBackendConfig(data, token) {
  const resp = await fetch(`${BASE_URL}/admin/config`, {
    method: "PUT",
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  if (!resp.ok) throw new Error("Failed to update backend config");
  return await resp.json();
}
