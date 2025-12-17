import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RoleRoute = ({ children, allowed = [] }) => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  const roles = user.roles || [];
  const hasAccess = roles.some((r) => allowed.includes(r));

  return hasAccess ? children : <Navigate to="/unauthorized" replace />;
};

export default RoleRoute;
