import React from "react";
import { useMutation } from "@tanstack/react-query";
import { signUpUser } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup() {
  const navigate = useNavigate();

  const [signUpData, setSignUpData] = React.useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const {  isError, isLoading, mutate } = useMutation({
    mutationFn: (signUpData) => signUpUser(signUpData),
    onSuccess: (data) => {
      console.log("User signed up successfully:", data);
      toast.success("Signup successful! Please log in.");
      navigate("/login"); 
    },
    onError: (error) => {
      console.error("Signup failed:", error);
      toast.error("Signup failed. Please try again.", error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signUpData.password !== signUpData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    mutate(signUpData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#0f172a] to-[#1e1b4b] text-white">
      <div className="w-full max-w-4xl bg-[#1e293b]/80 backdrop-blur-md rounded-2xl shadow-xl flex overflow-hidden">
        {/* Left side - Form */}
        <div className="w-1/2 p-10">
          <h2 className="text-2xl font-bold mb-6">Create Account</h2>
          <p className="text-gray-400 mb-6">Sign up to get started</p>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm">Full Name</label>
              <input
                value={signUpData.fullName}
                onChange={(e) =>
                  setSignUpData({ ...signUpData, fullName: e.target.value })
                }
                type="text"
                placeholder="Enter your name"
                className="w-full mt-1 p-3 rounded-lg bg-[#0f172a] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="text-sm">Email</label>
              <input
                value={signUpData.email}
                onChange={(e) =>
                  setSignUpData({ ...signUpData, email: e.target.value })
                }
                type="email"
                placeholder="Enter your email"
                className="w-full mt-1 p-3 rounded-lg bg-[#0f172a] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="text-sm">Password</label>
              <input
                value={signUpData.password}
                onChange={(e) =>
                  setSignUpData({ ...signUpData, password: e.target.value })
                }
                type="password"
                placeholder="Enter your password"
                className="w-full mt-1 p-3 rounded-lg bg-[#0f172a] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="text-sm">Confirm Password</label>
              <input
                value={signUpData.confirmPassword}
                onChange={(e) =>
                  setSignUpData({
                    ...signUpData,
                    confirmPassword: e.target.value,
                  })
                }
                type="password"
                placeholder="Confirm your password"
                className="w-full mt-1 p-3 rounded-lg bg-[#0f172a] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-teal-500 hover:bg-teal-600 rounded-lg font-semibold transition"
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          {isError && <p className="text-red-500 mt-2">Signup failed!</p>}
          <p className="mt-6 text-gray-400 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-teal-400 hover:underline">
              Log in
            </a>
          </p>
        </div>

        {/* Right side - Illustration */}
        <div className="w-1/2 bg-gradient-to-b from-[#1e293b] to-[#0f172a] flex flex-col items-center justify-center p-10">
          <img
            src="undraw_sign-up_z2ku.svg"
            alt="Signup illustration"
            className="w-72"
          />
          <h3 className="text-lg font-semibold mt-6">Join the Community</h3>
          <p className="text-gray-400 text-sm mt-2">Secure • Fast • Reliable</p>
        </div>
      </div>
    </div>
  );
}
