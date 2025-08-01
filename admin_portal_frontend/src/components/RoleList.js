import React from "react";

/**
 * RoleList -- shows roles table, allows edit/delete/view.
 * @param roles - array of role objs
 */
// PUBLIC_INTERFACE
function RoleList({ roles, loading, error, onSelect, onEdit, onCreate, onDelete }) {
  return (
    <div className="student-list-container">
      <div className="student-list-bar">
        <h3>Role Management</h3>
        <button className="btn btn-large" onClick={onCreate}>
          + Add Role
        </button>
      </div>
      {loading && <div className="student-loading">Loading roles...</div>}
      {error && <div className="student-error">{error}</div>}
      {!loading && !error && (
        <table className="student-table">
          <thead>
            <tr>
              <th style={{minWidth:60}}>ID</th>
              <th style={{minWidth:130}}>Name</th>
              <th style={{minWidth:90}}>Description</th>
              <th style={{minWidth:90}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(roles||[]).length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  No roles found.
                </td>
              </tr>
            ) : (
              roles.map((role) => (
                <tr key={role.id}>
                  <td>{role.id}</td>
                  <td>
                    <a
                      href="#"
                      onClick={e => { e.preventDefault(); onSelect(role); }}
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {role.name}
                    </a>
                  </td>
                  <td>{role.description || "-"}</td>
                  <td>
                    <button className="btn" onClick={() => onEdit(role)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => onDelete(role)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default RoleList;
