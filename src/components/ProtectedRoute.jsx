// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

/**
 * Usage in App.jsx:
 * <Route element={<ProtectedRoute allowedRoles={['exporter']} />}>
 *   <Route path="/exporter/dashboard" element={<ExporterDashboard />} />
 * </Route>
 *
 * allowedRoles is case-insensitive and accepts values like 'exporter', 'qa', 'verifier'
 */

const normalize = (s) => (typeof s === "string" ? s.toLowerCase() : "");

export default function ProtectedRoute({ allowedRoles = [] }) {
  let user = null;
  try {
    const raw = localStorage.getItem("user");
    user = raw ? JSON.parse(raw) : null;
  } catch {
    user = null;
  }

  if (!user) {
    // not logged-in -> go to login
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles || allowedRoles.length === 0) {
    return <Outlet />;
  }

  const role = normalize(user.role);
  const allowed = allowedRoles.map(normalize);

  if (!allowed.includes(role)) {
    return <Navigate to="/unauthorised" replace />;
  }

  return <Outlet />;
}
