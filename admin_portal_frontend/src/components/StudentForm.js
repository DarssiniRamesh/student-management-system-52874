import React, { useState, useEffect } from "react";

/**
 * StudentForm component: handles create/edit/view for a student.
 * @param {object} student - Student object or null for create.
 * @param {function} onSubmit - Handles submission (create/edit).
 * @param {function} onCancel - Handles cancel/back.
 * @param {string} mode - "view", "edit", or "create".
 * @param {boolean} loading - Indicates form spinner/loading.
 * @param {string} error - Error display.
 */
 // PUBLIC_INTERFACE
function StudentForm({ student, mode, onSubmit, onCancel, loading, error }) {
  const [form, setForm] = useState({
    name: student?.name || "",
    email: student?.email || "",
  });
  const isReadOnly = mode === "view";
  useEffect(() => {
    setForm({ name: student?.name || "", email: student?.email || "" });
  }, [student]);
  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isReadOnly && form.name && form.email) {
      onSubmit(form);
    }
  };

  return (
    <div className="student-form-container">
      <h3>
        {mode === "create" ? "Add Student" : mode === "edit" ? "Edit Student" : "Student Details"}
      </h3>
      <form className="student-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            name="name"
            value={form.name}
            disabled={isReadOnly || loading}
            onChange={onChange}
            required
            type="text"
            placeholder="Student Name"
            autoFocus
          />
        </label>
        <label>
          Email:
          <input
            name="email"
            value={form.email}
            disabled={isReadOnly || loading}
            onChange={onChange}
            required
            type="email"
            placeholder="student@email.com"
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

export default StudentForm;
