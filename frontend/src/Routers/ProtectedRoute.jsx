import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const jwt = localStorage.getItem("jwt");

  if (!jwt) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;