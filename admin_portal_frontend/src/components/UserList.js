import React from "react";

/**
 * UserList -- shows users in table, allows edit/delete/view.
 * @param users - array of user objs
 * @param loading, error, onSelect, onEdit, onCreate, onDelete
 */
// PUBLIC_INTERFACE
function UserList({ users, loading, error, onSelect, onEdit, onCreate, onDelete }) {
  return (
    <div className="student-list-container">
      <div className="student-list-bar">
        <h3>User Accounts</h3>
        <button className="btn btn-large" onClick={onCreate} data-testid="add-user-btn">
          + Add User
        </button>
      </div>
      {loading && <div className="student-loading">Loading users...</div>}
      {error && <div className="student-error">{error}</div>}
      {!loading && !error && (
        <table className="student-table">
          <thead>
            <tr>
              <th style={{minWidth:80}}>ID</th>
              <th style={{minWidth:130}}>Username</th>
              <th style={{minWidth:110}}>Email</th>
              <th style={{minWidth:90}}>Role</th>
              <th style={{minWidth:90}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(users||[]).length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    <a
                      href="#"
                      onClick={e => { e.preventDefault(); onSelect(user); }}
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {user.username}
                    </a>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.roleName || user.role || "-"}</td>
                  <td>
                    <button className="btn" onClick={() => onEdit(user)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => onDelete(user)}>Delete</button>
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
export default UserList;
