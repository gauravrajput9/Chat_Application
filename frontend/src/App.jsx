import React, {  useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatPage from "./pages/ChatPage.jsx";
import Signup from "./pages/SignUpPage";
import Login from "./pages/LoginPage";
import Loader from "./components/Loader.jsx";
import Home from "./pages/Home";
import HomeLayout from "./components/HomeLayout";
import { useAuthStore } from "./store/authStore.js";
import ProtectedRoute from "./lib/ProtectRoutes.jsx";
import ViewProfile from "./pages/ViewProfile.jsx";
import PublicRoute from "./lib/PublicRoutes.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <HomeLayout>
        <Home />
      </HomeLayout>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
       </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <ViewProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/chat",
    element: (
      <HomeLayout>
        <ProtectedRoute>
          <ChatPage />
        </ProtectedRoute>
      </HomeLayout>
    ),
  },
]);

const App = () => {
  // const { checkAuth, isCheckingAuth } = useAuthStore();

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

  return <RouterProvider router={router} />;
};

export default App;
