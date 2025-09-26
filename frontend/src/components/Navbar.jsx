import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
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
          <Link
            to="/"
            className="text-white font-semibold hover:text-teal-400 transition duration-300"
          >
            Home
          </Link>
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
        </div>

        {/* Mobile Menu Placeholder (optional) */}
        <div className="md:hidden">
          {/* You can add a hamburger menu here later */}
        </div>
      </div>
    </nav>
  );
}
