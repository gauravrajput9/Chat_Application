import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";
import React from "react";

// Optional: redirect logged-in users away from login/signup
const PublicRoute = ({ children }) => {
  const { authUser } = useAuthStore();
  if (authUser) {
    return <Navigate to="/" />;
  }
  return children;
};

export default PublicRoute;
