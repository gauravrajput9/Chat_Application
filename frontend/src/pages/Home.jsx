import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Home() {
  const authUser = useAuthStore((state) => state.authUser);
  return (
    <div className="bg-gradient-to-r from-[#0f172a] to-[#1e1b4b] text-white">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-20">
        {/* Left content */}
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Welcome to <span className="text-teal-400">ChatConnect</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300">
            Connect with friends anytime, anywhere. Secure, fast, and reliable.
          </p>
          {!authUser ? (
            <div className="mt-8 flex space-x-4">
              <Link
                to="/signup"
                className="px-6 py-3 bg-teal-500 hover:bg-teal-600 rounded-lg font-semibold transition"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 border border-teal-400 rounded-lg font-semibold hover:bg-teal-400/10 transition"
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="mt-8 flex space-x-4">
              <Link
                to="/chat"
                className="px-6 py-3 bg-teal-500 hover:bg-teal-600 rounded-lg font-semibold transition"
              >
                Start Chatting
              </Link>
            </div>
          )}
        </div>

        {/* Right illustration */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src="/undraw_text-messages_978a.svg"
            alt="Hero illustration"
            className="w-96"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="px-10 md:px-20 pt-16 pb-8 bg-[#1e293b]/60">
        <h2 className="text-3xl font-bold text-center">Features</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-6 bg-[#0f172a] rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Secure Messaging</h3>
            <p className="text-gray-400">
              End-to-end encryption to keep your chats private and safe.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 bg-[#0f172a] rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Real-time Chat</h3>
            <p className="text-gray-400">
              Instant delivery with typing indicators and read receipts.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 bg-[#0f172a] rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Cross Platform</h3>
            <p className="text-gray-400">
              Works seamlessly on web, mobile, and desktop devices.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
