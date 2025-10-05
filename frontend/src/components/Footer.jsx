import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="glass-effect border-t border-gray-700/30 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* About / Brand */}
        <div className="fade-in">
          <h2 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-2xl font-bold mb-4">ChatFlow</h2>
          <p className="text-gray-300 leading-relaxed">
            Experience seamless communication with advanced features, modern design, and enterprise-grade security.
          </p>
        </div>

        {/* Quick Links */}
        <div className="fade-in" style={{animationDelay: '0.1s'}}>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li><a href="/" className="text-gray-300 hover:text-blue-400 smooth-transition hover:translate-x-1 inline-block">Home</a></li>
            <li><a href="/signup" className="text-gray-300 hover:text-blue-400 smooth-transition hover:translate-x-1 inline-block">Sign Up</a></li>
            <li><a href="/login" className="text-gray-300 hover:text-blue-400 smooth-transition hover:translate-x-1 inline-block">Login</a></li>
            <li><a href="/chat" className="text-gray-300 hover:text-blue-400 smooth-transition hover:translate-x-1 inline-block">Chat</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="fade-in" style={{animationDelay: '0.2s'}}>
          <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="w-10 h-10 rounded-xl glass-effect flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-blue-500/20 smooth-transition hover-lift" title="Facebook">
              <FaFacebookF className="text-lg" />
            </a>
            <a href="#" className="w-10 h-10 rounded-xl glass-effect flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-blue-500/20 smooth-transition hover-lift" title="Twitter">
              <FaTwitter className="text-lg" />
            </a>
            <a href="#" className="w-10 h-10 rounded-xl glass-effect flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-blue-500/20 smooth-transition hover-lift" title="Instagram">
              <FaInstagram className="text-lg" />
            </a>
            <a href="#" className="w-10 h-10 rounded-xl glass-effect flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-blue-500/20 smooth-transition hover-lift" title="LinkedIn">
              <FaLinkedinIn className="text-lg" />
            </a>
          </div>
        </div>

      </div>

      <div className="mt-12 pt-8 border-t border-gray-700/30 text-center">
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} <span className="text-white font-medium">ChatFlow</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
