// src/pages/ErrorPage.jsx
import React from "react";
import { useRouteError, useLocation, Link } from "react-router-dom";

export default function ErrorPage() {
  const routeError = useRouteError();
  const location = useLocation();
  const apiError = location.state?.message;

  const errorMessage =
    apiError ||
    routeError?.statusText ||
    routeError?.message ||
    "Unknown error occurred";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a] text-white text-center px-6">
      <h1 className="text-6xl font-extrabold">⚠️ Oops!</h1>
      <p className="mt-4 text-xl">Something went wrong.</p>
      <p className="mt-2 text-gray-400">{errorMessage}</p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-semibold transition-colors shadow-md"
      >
        ⬅ Go Back Home
      </Link>
    </div>
  );
}
