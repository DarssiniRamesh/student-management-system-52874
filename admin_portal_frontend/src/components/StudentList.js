import React, { useState, useEffect } from "react";

/**
 * StudentList component: displays students table, loading/error, controls for create/view/edit/delete.
 * @param {function} onSelect - Callback for viewing a student.
 * @param {function} onEdit - Callback for editing a student.
 * @param {function} onCreate - Callback for starting create.
 * @param {function} onDelete - Callback for deleting a student.
 */
 // PUBLIC_INTERFACE
function StudentList({ students, loading, error, onSelect, onEdit, onCreate, onDelete }) {
  return (
    <div className="student-list-container">
      <div className="student-list-bar">
        <h3>Student List</h3>
        <button className="btn btn-large" onClick={onCreate}>
          + Add Student
        </button>
      </div>
      {loading && <div className="student-loading">Loading students...</div>}
      {error && <div className="student-error">{error}</div>}
      {!loading && !error && (
        <table className="student-table">
          <thead>
            <tr>
              <th style={{minWidth:80}}>ID</th>
              <th style={{minWidth:130}}>Name</th>
              <th style={{minWidth:110}}>Email</th>
              <th style={{minWidth:90}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(students||[]).length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  No students found.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>
                    <a
                      href="#"
                      onClick={e => {
                        e.preventDefault(); onSelect(student);
                      }}
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {student.name}
                    </a>
                  </td>
                  <td>{student.email}</td>
                  <td>
                    <button className="btn" onClick={() => onEdit(student)}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => onDelete(student)}>
                      Delete
                    </button>
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

export default StudentList;
