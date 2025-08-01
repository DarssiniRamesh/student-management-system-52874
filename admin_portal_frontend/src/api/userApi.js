const BASE_URL = process.env.REACT_APP_BACKEND_API_URL || "";

/**
 * Compose headers with optional token.
 */
function getHeaders(token) {
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// PUBLIC_INTERFACE
/** Fetch all users. */
export async function fetchUsers(token) {
  const resp = await fetch(`${BASE_URL}/admin/users`, {
    headers: getHeaders(token),
  });
  if (!resp.ok) throw new Error("Failed to fetch users");
  return await resp.json();
}

/** Fetch single user by ID. */
export async function fetchUserDetail(id, token) {
  const resp = await fetch(`${BASE_URL}/admin/users/${id}`, {
    headers: getHeaders(token),
  });
  if (!resp.ok) throw new Error("Failed to fetch user");
  return await resp.json();
}

/** Create user. */
export async function createUser(data, token) {
  const resp = await fetch(`${BASE_URL}/admin/users`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  if (!resp.ok) throw new Error("Failed to create user");
  return await resp.json();
}

/** Update user. */
export async function updateUser(id, data, token) {
  const resp = await fetch(`${BASE_URL}/admin/users/${id}`, {
    method: "PUT",
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  if (!resp.ok) throw new Error("Failed to update user");
  return await resp.json();
}

/** Delete user. */
export async function deleteUser(id, token) {
  const resp = await fetch(`${BASE_URL}/admin/users/${id}`, {
    method: "DELETE",
    headers: getHeaders(token),
  });
  if (!resp.ok) throw new Error("Failed to delete user");
  return true;
}

// PUBLIC_INTERFACE
/** Roles CRUD -- List roles. */
export async function fetchRoles(token) {
  const resp = await fetch(`${BASE_URL}/admin/roles`, {
    headers: getHeaders(token),
  });
  if (!resp.ok) throw new Error("Failed to fetch roles");
  return await resp.json();
}

/** Fetch role detail. */
export async function fetchRoleDetail(id, token) {
  const resp = await fetch(`${BASE_URL}/admin/roles/${id}`, {
    headers: getHeaders(token),
  });
  if (!resp.ok) throw new Error("Failed to fetch role");
  return await resp.json();
}

/** Create role. */
export async function createRole(data, token) {
  const resp = await fetch(`${BASE_URL}/admin/roles`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  if (!resp.ok) throw new Error("Failed to create role");
  return await resp.json();
}

/** Update role. */
export async function updateRole(id, data, token) {
  const resp = await fetch(`${BASE_URL}/admin/roles/${id}`, {
    method: "PUT",
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  if (!resp.ok) throw new Error("Failed to update role");
  return await resp.json();
}

/** Delete role. */
export async function deleteRole(id, token) {
  const resp = await fetch(`${BASE_URL}/admin/roles/${id}`, {
    method: "DELETE",
    headers: getHeaders(token),
  });
  if (!resp.ok) throw new Error("Failed to delete role");
  return true;
}
