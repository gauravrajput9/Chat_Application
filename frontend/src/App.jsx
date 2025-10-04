import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatPage from "./pages/ChatPage.jsx";
import Signup from "./pages/SignUpPage";
import Login from "./pages/LoginPage";
import Loader from "./components/Loader.jsx";
import Home from "./pages/Home";
import HomeLayout from "./components/HomeLayout";
import { useAuthStore } from "./store/authStore.js";
import ProtectedRoute from "./lib/ProtectRoutes.jsx";
import Profile from "./pages/ViewProfile.jsx";
import PublicRoute from "./lib/PublicRoutes.jsx";
import UpdateProfile from "./pages/UpdateProfile.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <HomeLayout>
        <Home />
      </HomeLayout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/update-profile",
    element: (
      <ProtectedRoute>
        <UpdateProfile />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <Signup />
      </PublicRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/chat",
    element: (
        <ProtectedRoute>
          <ChatPage />
        </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },

  {
    path: "*",
    element: <ErrorPage />,
  },
]);

const App = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />

      <RouterProvider router={router} />
    </>
  );
};

export default App;
