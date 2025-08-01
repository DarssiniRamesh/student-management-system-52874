import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import StudentList from "./StudentList";
import StudentForm from "./StudentForm";
import {
  fetchStudents,
  fetchStudentDetail,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../api/studentApi";
import "./StudentManager.css";

/**
 * High-level manager for student CRUD operations and views.
 * Handles state for student list, editing, creating, viewing, deleting.
 */
 // PUBLIC_INTERFACE
function StudentManager() {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("list"); // "list" | "view" | "edit" | "create"
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Fetch student list
  const loadStudents = async () => {
    setLoading(true); setError("");
    try {
      const items = await fetchStudents();
      setStudents(items);
      setLoading(false);
    } catch (e) {
      setError(e.message || "Failed to load students.");
      setLoading(false);
    }
  };

  useEffect(() => { loadStudents(); }, []);

  // Handle select/view, edit, create, delete
  const handleSelect = async (student) => {
    setMode("view"); setSelectedStudent(null); setFormError(""); setFormLoading(true);
    try {
      const detail = await fetchStudentDetail(student.id);
      setSelectedStudent(detail); setFormLoading(false);
    } catch (e) {
      setFormError(e.message || "Failed to fetch details."); setFormLoading(false);
    }
  };

  const handleEdit = async (student) => {
    setMode("edit"); setSelectedStudent(null); setFormError(""); setFormLoading(true);
    try {
      const detail = await fetchStudentDetail(student.id);
      setSelectedStudent(detail); setFormLoading(false);
    } catch (e) {
      setFormError(e.message || "Failed to fetch details."); setFormLoading(false);
    }
  };

  const handleCreate = () => {
    setMode("create");
    setSelectedStudent(null);
    setFormError("");
  };

  const handleSubmitCreate = async (form) => {
    setFormLoading(true); setFormError("");
    try {
      await createStudent(form);
      setMode("list"); setSelectedStudent(null);
      await loadStudents();
    } catch (e) {
      setFormError(e.message || "Failed to create student.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleSubmitEdit = async (form) => {
    setFormLoading(true); setFormError("");
    try {
      await updateStudent(selectedStudent.id, form);
      setMode("list"); setSelectedStudent(null);
      await loadStudents();
    } catch (e) {
      setFormError(e.message || "Failed to update student.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleCancelForm = () => {
    setMode("list");
    setSelectedStudent(null);
    setFormError("");
    setFormLoading(false);
  };

  const handleDelete = (student) => {
    setSelectedStudent(student);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    setFormLoading(true); setFormError("");
    try {
      await deleteStudent(selectedStudent.id);
      setShowDeleteConfirm(false);
      setMode("list"); setSelectedStudent(null);
      await loadStudents();
    } catch (e) {
      setFormError(e.message || "Failed to delete student.");
      setFormLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setSelectedStudent(null);
  };

  // Render modes: list, view, edit, create
  return (
    <div>
      {mode === "list" && (
        <StudentList
          students={students}
          loading={loading}
          error={error}
          onSelect={handleSelect}
          onEdit={handleEdit}
          onCreate={handleCreate}
          onDelete={handleDelete}
        />
      )}
      {mode === "view" && (
        <StudentForm
          student={selectedStudent}
          mode="view"
          onCancel={handleCancelForm}
          loading={formLoading}
          error={formError}
        />
      )}
      {mode === "create" && (
        <StudentForm
          student={null}
          mode="create"
          onSubmit={handleSubmitCreate}
          onCancel={handleCancelForm}
          loading={formLoading}
          error={formError}
        />
      )}
      {mode === "edit" && (
        <StudentForm
          student={selectedStudent}
          mode="edit"
          onSubmit={handleSubmitEdit}
          onCancel={handleCancelForm}
          loading={formLoading}
          error={formError}
        />
      )}
      {showDeleteConfirm && (
        <div className="student-delete-modal">
          <div className="student-delete-dialog">
            <p>
              Are you sure you want to delete student: <b>{selectedStudent?.name}</b>?
            </p>
            {formError && <div className="student-error">{formError}</div>}
            <button className="btn btn-danger" onClick={handleDeleteConfirm} disabled={formLoading}>
              Delete
            </button>
            <button className="btn" onClick={handleDeleteCancel} disabled={formLoading}>
              Cancel
            </button>
            {formLoading && <div className="student-loading">Deleting...</div>}
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentManager;
