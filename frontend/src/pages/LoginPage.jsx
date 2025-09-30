import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Loader from "../components/Loader.jsx";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const { setAuthUser, authUser } = useAuthStore();
  const [loginUserData, setLoginUserData] = useState({
    email: "",
    password: "",
  });

  const { isError, isPending, mutate } = useMutation({
    mutationFn: (userData) => loginUser(userData),
    onSuccess: (data) => {
      setAuthUser(data);
      toast.success("Login successful!");
      navigate("/");
    },
    onError: (error) => {
      console.log("Login error: ", error);
      const message = error.response?.data?.message || "Login failed!";
      navigate("/error", { state: { message } });
    },
  });

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    mutate(loginUserData);
  };

  useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, [authUser, navigate]);

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#0f172a] to-[#1e1b4b] text-white">
      <div className="w-full max-w-4xl bg-[#1e293b]/80 backdrop-blur-md rounded-2xl shadow-xl flex overflow-hidden">
        {/* Left side - Form */}
        <div className="w-1/2 p-10">
          <h2 className="text-2xl font-bold mb-6">Welcome Back</h2>
          <p className="text-gray-400 mb-6">Login to access your account</p>
          <form onSubmit={handleLoginFormSubmit} className="space-y-5">
            <div>
              <label className="text-sm">Email</label>
              <input
                type="email"
                value={loginUserData.email}
                onChange={(e) =>
                  setLoginUserData({
                    ...loginUserData,
                    email: e.target.value,
                  })
                }
                placeholder="Enter your email"
                className="w-full mt-1 p-3 rounded-lg bg-[#0f172a] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="text-sm">Password</label>
              <input
                type="password"
                value={loginUserData.password}
                onChange={(e) =>
                  setLoginUserData({
                    ...loginUserData,
                    password: e.target.value,
                  })
                }
                placeholder="Enter your password"
                className="w-full mt-1 p-3 rounded-lg bg-[#0f172a] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <button className="w-full py-3 bg-teal-500 hover:bg-teal-600 rounded-lg font-semibold transition">
              Sign In
            </button>
          </form>
          <p className="mt-6 text-gray-400 text-sm">
            Don’t have an account?{" "}
            <a href="/signup" className="text-teal-400 hover:underline">
              Sign up
            </a>
          </p>
        </div>

        {/* Right side - Illustration */}
        <div className="w-1/2 bg-gradient-to-b from-[#1e293b] to-[#0f172a] flex flex-col items-center justify-center p-10">
          <img
            src="undraw_secure-login_m11a.svg"
            alt="Login illustration"
            className="w-72"
          />

          <h3 className="text-lg font-semibold mt-6">
            Connect Anytime, Anywhere
          </h3>
          <p className="text-gray-400 text-sm mt-2">Secure • Fast • Reliable</p>
        </div>
      </div>
    </div>
  );
}
