import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatPage from "./pages/ChatPage.jsx";
import Signup from "./pages/SignUpPage";
import Login from "./pages/LoginPage";
import Home from "./pages/Home";
import HomeLayout from "./components/HomeLayout";
import { useAuthStore } from "./store/authStore.js";
import ProtectedRoute from "./lib/ProtectRoutes.jsx";

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
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
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
  const { authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(authUser);
  return <RouterProvider router={router} />;
};

export default App;
