const BASE_URL = process.env.REACT_APP_BACKEND_API_URL || "";

/**
 * Attach auth header for admin session.
 */
function getHeaders(token) {
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// PUBLIC_INTERFACE
/** Fetch platform analytics/metrics for dashboard (charts etc.) */
export async function fetchAnalytics(token) {
  const resp = await fetch(`${BASE_URL}/admin/analytics`, {
    headers: getHeaders(token),
  });
  if (!resp.ok) throw new Error("Failed to fetch analytics data");
  return await resp.json();
}
