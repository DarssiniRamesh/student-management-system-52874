const BASE_URL = process.env.REACT_APP_BACKEND_API_URL || "";

// Helper: Attach auth header if using JWT. Modify as per real AuthContext token logic if/when implemented.
function getHeaders(token) {
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// PUBLIC_INTERFACE
export async function fetchStudents(token) {
  const resp = await fetch(`${BASE_URL}/students`, {
    headers: getHeaders(token),
  });
  if (!resp.ok) throw new Error("Failed to fetch students");
  return await resp.json();
}

// PUBLIC_INTERFACE
export async function fetchStudentDetail(id, token) {
  const resp = await fetch(`${BASE_URL}/students/${id}`, {
    headers: getHeaders(token),
  });
  if (!resp.ok) throw new Error("Failed to fetch student details");
  return await resp.json();
}

// PUBLIC_INTERFACE
export async function createStudent(data, token) {
  const resp = await fetch(`${BASE_URL}/students`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  if (!resp.ok) throw new Error("Failed to create student");
  return await resp.json();
}

// PUBLIC_INTERFACE
export async function updateStudent(id, data, token) {
  const resp = await fetch(`${BASE_URL}/students/${id}`, {
    method: "PUT",
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  if (!resp.ok) throw new Error("Failed to update student");
  return await resp.json();
}

// PUBLIC_INTERFACE
export async function deleteStudent(id, token) {
  const resp = await fetch(`${BASE_URL}/students/${id}`, {
    method: "DELETE",
    headers: getHeaders(token),
  });
  if (!resp.ok) throw new Error("Failed to delete student");
  return true;
}
