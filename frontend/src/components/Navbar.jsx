import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import useChatStore from "../store/useChatStore";
import { logoutUser } from "../lib/axios";
import { toast } from "react-toastify";

export default function Navbar() {
  const authUser = useAuthStore((state) => state.authUser);
  const logout = useAuthStore((state) => state.logout);
  const clearChatState = useChatStore((state) => state.clearChatState);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  console.log(authUser)

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
        // Clear all application state
        clearChatState();
        logout();
        
        // Navigate and show success message
        navigate("/login");
        toast.success("Logged out successfully");
        console.log("👋 User logged out successfully");
      })
      .catch((err) => {
        console.error("Logout failed:", err);
        toast.error("Logout failed. Please try again.");
      });
  };

  return (
    <nav className="glass-effect sticky top-0 z-50 border-b border-gray-700/30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand */}
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-purple-300 smooth-transition"
        >
          ChatFlow
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-4">
          {!authUser ? (
            <>
              <Link
                to="/signup"
                className="px-6 py-3 gradient-accent hover:gradient-accent-hover text-white font-semibold rounded-xl shadow-lg hover:shadow-xl smooth-transition hover-lift hover-glow"
              >
                Sign Up
              </Link>

              <Link
                to="/login"
                className="px-6 py-3 glass-effect border border-blue-400/30 text-white font-semibold rounded-xl hover:bg-blue-400/20 hover:border-blue-400/50 smooth-transition hover-lift"
              >
                Login
              </Link>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center cursor-pointer gap-2 px-4 py-2 rounded-xl glass-effect hover:bg-slate-700/50 smooth-transition hover-lift"
                onClick={() => setIsOpen(!isOpen)}
              >
                <img
                  src={authUser?.user?.profilePic || "https://i.pravatar.cc/40"}
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-blue-400/50"
                />
                <span className="text-white font-medium">{authUser.user?.fullName || authUser.name}</span>
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
                className={`absolute right-0 mt-3 w-48 glass-effect rounded-xl overflow-hidden z-50 smooth-transition transform origin-top-right border border-gray-600/30 ${
                  isOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <Link
                  to="/profile"
                  className="block px-4 py-3 text-white hover:bg-blue-500/20 hover:text-blue-300 smooth-transition"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/update-profile"
                  className="block px-4 py-3 text-white hover:bg-blue-500/20 hover:text-blue-300 smooth-transition"
                  onClick={() => setIsOpen(false)}
                >
                  Settings
                </Link>
                <div className="border-t border-gray-600/30 my-1"></div>
                <button
                  className="w-full text-left px-4 py-3 text-white hover:bg-red-500/20 hover:text-red-300 smooth-transition"
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

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg glass-effect hover:bg-slate-700/50 smooth-transition"
            aria-label="Toggle menu"
          >
            <svg
              className={`w-6 h-6 text-white smooth-transition ${isOpen ? 'rotate-90' : 'rotate-0'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden smooth-transition ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-6 py-4 glass-effect border-t border-gray-700/30">
          {!authUser ? (
            <div className="space-y-3">
              <Link
                to="/signup"
                className="block w-full text-center px-6 py-3 gradient-accent hover:gradient-accent-hover text-white font-semibold rounded-xl smooth-transition hover-lift"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="block w-full text-center px-6 py-3 glass-effect border border-blue-400/30 text-white font-semibold rounded-xl hover:bg-blue-400/20 smooth-transition hover-lift"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 glass-effect rounded-xl">
                <img
                  src={authUser?.user.profilePic || "https://i.pravatar.cc/40"}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-blue-400/50"
                />
                <span className="text-white font-medium">{authUser.user?.fullName || authUser.name}</span>
              </div>
              <Link
                to="/profile"
                className="block w-full text-left px-4 py-3 text-white hover:bg-blue-500/20 rounded-xl smooth-transition"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/update-profile"
                className="block w-full text-left px-4 py-3 text-white hover:bg-blue-500/20 rounded-xl smooth-transition"
                onClick={() => setIsOpen(false)}
              >
                Settings
              </Link>
              <button
                className="block w-full text-left px-4 py-3 text-white hover:bg-red-500/20 rounded-xl smooth-transition"
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
