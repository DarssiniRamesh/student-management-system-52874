import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  fetchRoles, fetchRoleDetail, createRole, updateRole, deleteRole,
} from "../api/userApi";
import RoleList from "./RoleList";
import RoleForm from "./RoleForm";
import "./StudentManager.css"; // reuse styles

/**
 * RoleManager - CRUD manager for roles
 */
// PUBLIC_INTERFACE
function RoleManager() {
  const { user } = useAuth();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("list");
  const [selectedRole, setSelectedRole] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getToken = () => localStorage.getItem("admin_token");
  const loadRoles = async () => {
    setLoading(true); setError("");
    try {
      const items = await fetchRoles(getToken());
      setRoles(items);
      setLoading(false);
    } catch (e) {
      setError(e.message || "Failed to load roles.");
      setLoading(false);
    }
  };

  useEffect(() => { loadRoles(); }, []);

  const handleSelect = async (role) => {
    setMode("view"); setSelectedRole(null); setFormError(""); setFormLoading(true);
    try {
      const detail = await fetchRoleDetail(role.id, getToken());
      setSelectedRole(detail); setFormLoading(false);
    } catch (e) {
      setFormError(e.message || "Failed to fetch role details."); setFormLoading(false);
    }
  };

  const handleEdit = async (role) => {
    setMode("edit"); setSelectedRole(null); setFormError(""); setFormLoading(true);
    try {
      const detail = await fetchRoleDetail(role.id, getToken());
      setSelectedRole(detail); setFormLoading(false);
    } catch (e) {
      setFormError(e.message || "Failed to fetch role details."); setFormLoading(false);
    }
  };

  const handleCreate = () => {
    setMode("create");
    setSelectedRole(null);
    setFormError("");
  };

  const handleSubmitCreate = async (form) => {
    setFormLoading(true); setFormError("");
    try {
      await createRole(form, getToken());
      setMode("list"); setSelectedRole(null);
      await loadRoles();
    } catch (e) {
      setFormError(e.message || "Failed to create role.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleSubmitEdit = async (form) => {
    setFormLoading(true); setFormError("");
    try {
      await updateRole(selectedRole.id, form, getToken());
      setMode("list"); setSelectedRole(null);
      await loadRoles();
    } catch (e) {
      setFormError(e.message || "Failed to update role.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleCancelForm = () => {
    setMode("list");
    setSelectedRole(null);
    setFormError("");
    setFormLoading(false);
  };

  const handleDelete = (role) => {
    setSelectedRole(role);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    setFormLoading(true); setFormError("");
    try {
      await deleteRole(selectedRole.id, getToken());
      setShowDeleteConfirm(false);
      setMode("list"); setSelectedRole(null);
      await loadRoles();
    } catch (e) {
      setFormError(e.message || "Failed to delete role.");
      setFormLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setSelectedRole(null);
  };

  // Modes: list, view, edit, create
  return (
    <div>
      {mode === "list" && (
        <RoleList
          roles={roles}
          loading={loading}
          error={error}
          onSelect={handleSelect}
          onEdit={handleEdit}
          onCreate={handleCreate}
          onDelete={handleDelete}
        />
      )}
      {mode === "view" && (
        <RoleForm
          role={selectedRole}
          mode="view"
          onCancel={handleCancelForm}
          loading={formLoading}
          error={formError}
        />
      )}
      {mode === "create" && (
        <RoleForm
          role={null}
          mode="create"
          onSubmit={handleSubmitCreate}
          onCancel={handleCancelForm}
          loading={formLoading}
          error={formError}
        />
      )}
      {mode === "edit" && (
        <RoleForm
          role={selectedRole}
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
              Are you sure you want to delete role: <b>{selectedRole?.name}</b>?
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

export default RoleManager;
