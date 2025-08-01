import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  fetchUsers, fetchUserDetail, createUser, updateUser, deleteUser,
  fetchRoles
} from "../api/userApi";
import UserList from "./UserList";
import UserForm from "./UserForm";
import "./StudentManager.css"; // reuse base styles for look & feel

/**
 * UserManager - high-level manager for CRUD of users (admins)
 */
// PUBLIC_INTERFACE
function UserManager() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("list");
  const [selectedUser, setSelectedUser] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Helper to fetch admin JWT/token
  const getToken = () => localStorage.getItem("admin_token");

  // Load user list
  const loadUsers = async () => {
    setLoading(true); setError("");
    try {
      const items = await fetchUsers(getToken());
      setUsers(items);
      setLoading(false);
    } catch (e) {
      setError(e.message || "Failed to load users.");
      setLoading(false);
    }
  };

  // Load role list for dropdowns
  const loadRoles = async () => {
    try {
      const items = await fetchRoles(getToken());
      setRoles(items);
    } catch {
      setRoles([]);
    }
  };

  useEffect(() => { loadUsers(); loadRoles(); }, []);

  const handleSelect = async (user) => {
    setMode("view"); setSelectedUser(null); setFormError(""); setFormLoading(true);
    try {
      const detail = await fetchUserDetail(user.id, getToken());
      setSelectedUser(detail); setFormLoading(false);
    } catch (e) {
      setFormError(e.message || "Failed to fetch user details."); setFormLoading(false);
    }
  };

  const handleEdit = async (user) => {
    setMode("edit"); setSelectedUser(null); setFormError(""); setFormLoading(true);
    try {
      const detail = await fetchUserDetail(user.id, getToken());
      setSelectedUser(detail); setFormLoading(false);
    } catch (e) {
      setFormError(e.message || "Failed to fetch user details."); setFormLoading(false);
    }
  };

  const handleCreate = () => {
    setMode("create");
    setSelectedUser(null);
    setFormError("");
  };

  const handleSubmitCreate = async (form) => {
    setFormLoading(true); setFormError("");
    try {
      await createUser(form, getToken());
      setMode("list"); setSelectedUser(null);
      await loadUsers();
    } catch (e) {
      setFormError(e.message || "Failed to create user.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleSubmitEdit = async (form) => {
    setFormLoading(true); setFormError("");
    try {
      await updateUser(selectedUser.id, form, getToken());
      setMode("list"); setSelectedUser(null);
      await loadUsers();
    } catch (e) {
      setFormError(e.message || "Failed to update user.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleCancelForm = () => {
    setMode("list");
    setSelectedUser(null);
    setFormError("");
    setFormLoading(false);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    setFormLoading(true); setFormError("");
    try {
      await deleteUser(selectedUser.id, getToken());
      setShowDeleteConfirm(false);
      setMode("list"); setSelectedUser(null);
      await loadUsers();
    } catch (e) {
      setFormError(e.message || "Failed to delete user.");
      setFormLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setSelectedUser(null);
  };

  // Modes: list, view, edit, create
  return (
    <div>
      {mode === "list" && (
        <UserList
          users={users}
          loading={loading}
          error={error}
          onSelect={handleSelect}
          onEdit={handleEdit}
          onCreate={handleCreate}
          onDelete={handleDelete}
        />
      )}
      {mode === "view" && (
        <UserForm
          user={selectedUser}
          mode="view"
          onCancel={handleCancelForm}
          loading={formLoading}
          error={formError}
          roleOptions={roles}
        />
      )}
      {mode === "create" && (
        <UserForm
          user={null}
          mode="create"
          onSubmit={handleSubmitCreate}
          onCancel={handleCancelForm}
          loading={formLoading}
          error={formError}
          roleOptions={roles}
        />
      )}
      {mode === "edit" && (
        <UserForm
          user={selectedUser}
          mode="edit"
          onSubmit={handleSubmitEdit}
          onCancel={handleCancelForm}
          loading={formLoading}
          error={formError}
          roleOptions={roles}
        />
      )}
      {showDeleteConfirm && (
        <div className="student-delete-modal">
          <div className="student-delete-dialog">
            <p>
              Are you sure you want to delete user: <b>{selectedUser?.username}</b>?
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

export default UserManager;
