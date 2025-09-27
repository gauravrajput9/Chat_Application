import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";

const ProtectedRoute = ({ children }) => {
  const { authUser } = useAuthStore();
  console.log("ProtectedRoute - authUser:", authUser);

  if (!authUser) {
    return <Navigate to="/login"  />;
  }

  return children;
};


export default ProtectedRoute;
