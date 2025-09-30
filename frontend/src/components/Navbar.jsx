import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { logoutUser } from "../lib/axios";
import { toast } from "react-toastify";

export default function Navbar() {
  const authUser = useAuthStore((state) => state.authUser);
  const setAuthUser = useAuthStore((state) => state.setAuthUser);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        navigate("/login");
        toast.success("Logged out successfully");
        setAuthUser(null)
      })
      .catch((err) => {
        console.error("Logout failed:", err);
      });
  };

  return (
    <nav className="bg-[#0f172a]/90 backdrop-blur-md sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-teal-400 hover:text-teal-300 transition"
        >
          ChatConnect
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          {!authUser ? (
            <>
              <Link
                to="/signup"
                className="px-5 py-2 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 hover:shadow-lg transition duration-300 transform hover:-translate-y-0.5"
              >
                Sign Up
              </Link>

              <Link
                to="/login"
                className="px-5 py-2 border border-teal-400 text-white font-semibold rounded-lg shadow-sm hover:text-teal-400 hover:bg-teal-400/20 hover:shadow-md transition duration-300 transform hover:-translate-y-0.5"
              >
                Login
              </Link>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center cursor-pointer gap-2 px-3 py-2 rounded-full bg-gray-700 hover:bg-gray-600 transition duration-300 transform hover:scale-105"
                onClick={() => setIsOpen(!isOpen)}
              >
                <img
                  src={authUser?.user.profilePic || "https://i.pravatar.cc/40"}
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-teal-400"
                />
                <span className="text-white font-medium">{authUser.name}</span>
                <svg
                  className={`w-4 h-4 ml-1 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {/* Animated Dropdown */}
              <div
                className={`absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-xl overflow-hidden z-50 transition-all duration-300 transform origin-top-right ${
                  isOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <Link
                  to="/profile"
                  className="block px-4 py-3 text-gray-800 hover:bg-teal-50 hover:text-teal-600 transition duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-3 text-gray-800 hover:bg-teal-50 hover:text-teal-600 transition duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Settings
                </Link>
                <button
                  className="w-full text-left px-4 py-3 text-gray-800 hover:bg-teal-50 hover:text-teal-600 transition duration-200"
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Placeholder */}
        <div className="md:hidden">{/* Hamburger menu */}</div>
      </div>
    </nav>
  );
}
