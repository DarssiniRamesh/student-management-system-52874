import React, { useState, useEffect } from "react";

/**
 * RoleForm - handles create/edit/view of a role.
 * @param role - role object (or null for create)
 */
 // PUBLIC_INTERFACE
function RoleForm({ role, mode, onSubmit, onCancel, loading, error }) {
  const [form, setForm] = useState({
    name: role?.name || "",
    description: role?.description || "",
  });
  const isReadOnly = mode === "view";
  useEffect(() => {
    setForm({
      name: role?.name || "",
      description: role?.description || "",
    });
  }, [role]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isReadOnly && form.name) {
      onSubmit(form);
    }
  };
  return (
    <div className="student-form-container">
      <h3>
        {mode === "create" ? "Add Role" : mode === "edit" ? "Edit Role" : "Role Details"}
      </h3>
      <form className="student-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            name="name"
            value={form.name}
            disabled={isReadOnly || loading}
            onChange={handleChange}
            required
            type="text"
            placeholder="Role Name"
            autoFocus
          />
        </label>
        <label>
          Description:
          <input
            name="description"
            value={form.description}
            disabled={isReadOnly || loading}
            onChange={handleChange}
            type="text"
            placeholder="Add a description (optional)"
          />
        </label>
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
export default RoleForm;
