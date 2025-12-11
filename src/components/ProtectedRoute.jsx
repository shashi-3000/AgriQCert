// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

/**
 * ProtectedRoute Component
 * 
 * Protects routes based on authentication and role-based access control.
 * 
 * Usage in App.jsx:
 * <Route element={<ProtectedRoute allowedRoles={['EXPORTER']} />}>
 *   <Route path="/exporter/dashboard" element={<ExporterDashboard />} />
 * </Route>
 *
 * Backend Roles: EXPORTER, QA_AGENCY, CUSTOMS_OFFICIAL, ADMIN
 */

const normalize = (s) => (typeof s === "string" ? s.toUpperCase() : "");

export default function ProtectedRoute({ allowedRoles = [] }) {
  // Check for access token (primary authentication check)
  const accessToken = localStorage.getItem("accessToken");
  
  // Get user data
  let user = null;
  try {
    const raw = localStorage.getItem("user");
    user = raw ? JSON.parse(raw) : null;
  } catch {
    user = null;
  }

  // Not authenticated - redirect to login
  if (!accessToken || !user) {
    return <Navigate to="/login" replace />;
  }

  // No role restriction - allow any authenticated user
  if (!allowedRoles || allowedRoles.length === 0) {
    return <Outlet />;
  }

  // Check role-based access
  const userRole = normalize(user.role);
  const allowed = allowedRoles.map(normalize);

  if (!allowed.includes(userRole)) {
    return <Navigate to="/unauthorised" replace />;
  }

  return <Outlet />;
}
