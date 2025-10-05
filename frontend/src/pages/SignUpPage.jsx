import React from "react";
import { useMutation } from "@tanstack/react-query";
import { signUpUser } from "../lib/axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";
import { User, Mail, Lock, ArrowRight, UserPlus, Users } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();
  const connectSocket = useAuthStore((state) => state.connectSocket);

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
      connectSocket()
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-bg-secondary bg-pattern text-white p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative w-full max-w-6xl glass-effect rounded-3xl shadow-2xl overflow-hidden fade-in">
        <div className="grid lg:grid-cols-2 min-h-[700px]">
          {/* Left side - Illustration */}
          <div className="bg-gradient-bg-primary flex flex-col items-center justify-center p-8 lg:p-12 relative overflow-hidden order-2 lg:order-1">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 right-10 w-20 h-20 border border-purple-400 rounded-full"></div>
              <div className="absolute top-32 left-16 w-12 h-12 border border-green-400 rounded-lg rotate-45"></div>
              <div className="absolute bottom-20 right-20 w-16 h-16 border border-blue-400 rounded-full"></div>
            </div>
            
            <div className="relative text-center fade-in" style={{ animationDelay: '0.3s' }}>
              {/* Icon */}
              <div className="w-24 h-24 gradient-accent rounded-3xl flex items-center justify-center mb-8 mx-auto hover-lift smooth-transition">
                <UserPlus className="w-12 h-12 text-white" strokeWidth={1.5} />
              </div>
              
              {/* Illustration */}
              <div className="mb-8">
                <img
                  src="/undraw_sign-up_z2ku.svg"
                  alt="Join the community illustration"
                  className="w-80 h-auto mx-auto"
                />
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Join the Community
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed max-w-sm mx-auto">
                Connect with friends and family in a secure environment
              </p>
              
              {/* Features */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {['Secure', 'Private', 'Global'].map((feature, index) => (
                  <div 
                    key={index} 
                    className="glass-effect rounded-xl p-3 fade-in"
                    style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                  >
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mb-2 mx-auto">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    </div>
                    <p className="text-xs text-gray-300 font-medium">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="p-8 lg:p-12 flex flex-col justify-center order-1 lg:order-2">
            <div className="max-w-md mx-auto w-full">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 gradient-accent rounded-2xl mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Create Account</h2>
                <p className="text-gray-400">Join ChatFlow today</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={signUpData.fullName}
                      onChange={(e) =>
                        setSignUpData({ ...signUpData, fullName: e.target.value })
                      }
                      placeholder="Enter your full name"
                      className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-gray-600/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 smooth-transition text-white placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={signUpData.email}
                      onChange={(e) =>
                        setSignUpData({ ...signUpData, email: e.target.value })
                      }
                      placeholder="Enter your email"
                      className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-gray-600/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 smooth-transition text-white placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      value={signUpData.password}
                      onChange={(e) =>
                        setSignUpData({ ...signUpData, password: e.target.value })
                      }
                      placeholder="Create a password"
                      className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-gray-600/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 smooth-transition text-white placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      value={signUpData.confirmPassword}
                      onChange={(e) =>
                        setSignUpData({
                          ...signUpData,
                          confirmPassword: e.target.value,
                        })
                      }
                      placeholder="Confirm your password"
                      className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-gray-600/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 smooth-transition text-white placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="group w-full py-4 px-6 gradient-accent hover:gradient-accent-hover rounded-2xl font-semibold smooth-transition hover-lift hover-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 smooth-transition" />
                    </>
                  )}
                </button>
              </form>
              
              {isError && (
                <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl">
                  <p className="text-red-400 text-sm text-center">Account creation failed. Please try again.</p>
                </div>
              )}
              
              <div className="text-center mt-8">
                <p className="text-gray-400">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium smooth-transition">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
