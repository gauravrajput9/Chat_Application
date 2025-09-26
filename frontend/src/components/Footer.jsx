import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-400 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* About / Brand */}
        <div>
          <h2 className="text-teal-400 text-2xl font-bold mb-4">ChatConnect</h2>
          <p className="text-gray-400 text-sm">
            Connect with friends anytime, anywhere. Secure, fast, and reliable.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-teal-400 transition">Home</a></li>
            <li><a href="/signup" className="hover:text-teal-400 transition">Sign Up</a></li>
            <li><a href="/login" className="hover:text-teal-400 transition">Login</a></li>
            <li><a href="/chat" className="hover:text-teal-400 transition">Chat</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-white font-semibold mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4 text-xl">
            <a href="#" className="hover:text-teal-400 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-teal-400 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-teal-400 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-teal-400 transition"><FaLinkedinIn /></a>
          </div>
        </div>

      </div>

      <div className="mt-10 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} ChatConnect. All rights reserved.
      </div>
    </footer>
  );
}
