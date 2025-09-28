import React from "react";
import { LogOut, Edit, Mail, User } from "lucide-react";
import { logoutUser } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Profile = () => {
  const navigate = useNavigate();
  const authUser = useAuthStore((state) => state.authUser);
  const setAuthUser = useAuthStore((state) => state.setAuthUser);
  

  const handleLogout = () => {
      logoutUser()
        .then(() => {
          navigate("/login");
          setAuthUser(null)
        })
        .catch((err) => {
          console.error("Logout failed:", err);
        });
    };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f172a] to-[#1e1b4b] text-white px-6 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="mt-2 text-gray-300">
            Manage your account information
          </p>
        </div>

        {/* Profile info */}
        <div className="rounded-xl bg-[#1e1b4b]/40 backdrop-blur-sm p-8 shadow-lg">
          <div className="text-center">
            <div className="flex justify-center">
              <div className="h-24 w-24 rounded-full ring-4 ring-indigo-500/30 overflow-hidden bg-indigo-900 flex items-center justify-center">
                <img
                  src={authUser?.user.profilePic || null}
                  alt={authUser?.user.fullName}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div className="hidden h-full w-full items-center justify-center text-lg font-bold text-indigo-300">
                  {authUser?.user.fullName.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
            <h2 className="mt-4 text-2xl font-semibold capitalize">
              {authUser?.user.fullName}
            </h2>
            <p className="text-gray-400">{authUser?.user.email}</p>
          </div>

          {/* Details */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-[#0f172a]/50">
              <User className="h-5 w-5 text-indigo-400" />
              <div>
                <p className="text-sm text-gray-400">Full Name</p>
                <p className="text-base capitalize">{authUser?.user.fullName}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg bg-[#0f172a]/50">
              <Mail className="h-5 w-5 text-indigo-400" />
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-base">{authUser?.user.email}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/update-profile")}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition px-6 py-3 font-medium"
            >
              <Edit className="h-5 w-5" />
              Update Profile
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-red-500/50 text-red-400 hover:bg-red-600 hover:text-white transition px-6 py-3 font-medium"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
