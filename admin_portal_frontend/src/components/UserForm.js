import React, { useState, useEffect } from "react";

/**
 * UserForm - handles create/edit/view of a user.
 * @param user - current user object (or null for create)
 * @param roleOptions - array of roles {id, name}
 */
// PUBLIC_INTERFACE
function UserForm({ user, mode, onSubmit, onCancel, roleOptions = [], loading, error }) {
  const [form, setForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
    roleId: user?.roleId || user?.role?.id || "",
    password: ""
  });
  const isReadOnly = mode === "view";

  useEffect(() => {
    setForm({
      username: user?.username || "",
      email: user?.email || "",
      roleId: user?.roleId || user?.role?.id || "",
      password: ""
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({
      ...f,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isReadOnly && form.username && form.email && (mode !== "create" || form.password.length > 0)) {
      const payload = { ...form };
      if (mode !== "create") delete payload.password;
      onSubmit(payload);
    }
  };

  return (
    <div className="student-form-container">
      <h3>
        {mode === "create" ? "Add User" : mode === "edit" ? "Edit User" : "User Details"}
      </h3>
      <form className="student-form" onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            name="username"
            value={form.username}
            disabled={isReadOnly || loading}
            onChange={handleChange}
            required
            type="text"
            placeholder="Username"
            autoFocus
          />
        </label>
        <label>
          Email:
          <input
            name="email"
            value={form.email}
            disabled={isReadOnly || loading}
            onChange={handleChange}
            required
            type="email"
            placeholder="admin@email.com"
          />
        </label>
        <label>
          Role:
          <select
            name="roleId"
            value={form.roleId}
            disabled={isReadOnly || loading}
            onChange={handleChange}
            required
            style={{ minWidth: 90 }}
          >
            <option value="">Select</option>
            {roleOptions.map(role => (
              <option value={role.id} key={role.id}>{role.name}</option>
            ))}
          </select>
        </label>
        {mode === "create" && (
          <label>
            Password:
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              disabled={isReadOnly || loading}
              required
              minLength={6}
            />
          </label>
        )}
        {error && <div className="student-error">{error}</div>}
        <div className="student-form-actions">
          <button className="btn" type="button" onClick={onCancel} disabled={loading}>
            {isReadOnly ? "Back" : "Cancel"}
          </button>
          {!isReadOnly && (
            <button className="btn btn-large" type="submit" disabled={loading}>
              {mode === "create" ? "Create" : "Save"}
            </button>
          )}
        </div>
        {loading && <div className="student-loading">Saving...</div>}
      </form>
    </div>
  );
}
export default UserForm;
