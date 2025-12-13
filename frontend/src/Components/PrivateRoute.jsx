import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function PrivateRoute({ children, requireAdmin = false }) {
  const token = Cookies.get("token") || Cookies.get("jwt-authorization");

  if (!token) {
    return <Navigate to="/not-authorized" replace />;
  }

  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch {
    return <Navigate to="/not-authorized" replace />;
  }

  if (requireAdmin && !decoded.isAdmin) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
}
