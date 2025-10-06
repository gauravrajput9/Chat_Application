import React, { useEffect, useRef } from "react";
import { LogOut, Volume2, VolumeX, Camera, Loader2 } from "lucide-react";
import useChatStore from "../store/useChatStore";
import { useAuthStore } from "../store/authStore";
import { logoutUser, updateUser } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

const mouseClickSound = new Audio("/sounds/mouse-Click.mp3");

const ChatPageUserHeader = () => {
  const navigate = useNavigate();

  const setSelectedUser = useChatStore((state) => state.setSelectedUser);
  const [selectedImage, setSelectedImg] = React.useState(null);
  const [previousImage, setPreviousImage] = React.useState(null);
  const fileInputRef = useRef(null);

  const { isSoundEnabled, toggleSound, clearChatState } = useChatStore();

  const { authUser, logout, onlineUsers, setAuthUser } = useAuthStore();

  const [username, setUserName] = React.useState(
    authUser?.fullName || "User"
  );

  const handleAvatarClick = () => fileInputRef.current.click();

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        // Clear all application state
        clearChatState();
        logout();
        
        // Navigate and show success message
        navigate("/login");
        toast.success("Logged out successfully");
        console.log("👋 User logged out from chat page");
      })
      .catch((err) => {
        console.error("Logout failed:", err);
        toast.error("Logout failed. Please try again.");
      });
  };

  // handle the update user mutation, for updating profile picture
  const UpdateUserMutation = useMutation({
    mutationFn: (formData) => updateUser(formData),
    onSuccess: (data) => {
      setAuthUser(data.user);
      setSelectedImg(data.user.profilePic);
      setUserName(data.user.fullName);
      toast.success("Profile picture updated");
    },
    onError: (error) => {
      console.error("Error while updating profile pic:", error);
      toast.error("Failed to update profile picture");
      setSelectedImg(previousImage);
    },
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreviousImage(authUser?.profilePic || null);

    const formData = new FormData();
    formData.append("profilePic", file); // must match multer field name
    formData.append("fullName", authUser.fullName);
    formData.append("email", authUser.email);

    UpdateUserMutation.mutate(formData);
  };

  // use the escape key to close the chat
  useEffect(() => {
    const handleEscapePress = (e) => {
      if (e.key === "Escape") {
        setSelectedUser(null);
      }
    };

    window.addEventListener("keydown", handleEscapePress);
  });

  const isOnline = onlineUsers?.includes(authUser?._id);

  return (
    <div className="flex items-center justify-between bg-slate-700 p-3 rounded-xl shadow">
      {/* Avatar + Username */}
      <div className="flex items-center gap-3">
        <div
          className="relative w-12 h-12 rounded-full overflow-hidden cursor-pointer bg-slate-600 flex items-center justify-center"
          onClick={handleAvatarClick}
        >
          {UpdateUserMutation.isPending ? (
            <Loader2 className="w-6 h-6 text-white animate-spin" />
          ) : selectedImage ? (
            <img
              src={selectedImage}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : authUser?.profilePic ? (
            <img
              src={authUser.profilePic}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <Camera className="text-white w-6 h-6" />
          )}

          {/* Online Green Dot */}
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-700 rounded-full"></span>
          )}

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>

        {/* Username + Online text */}
        <div className="flex flex-col">
          <span className="font-semibold text-white">
            {username || authUser?.fullName || "User"}
          </span>
          {isOnline && (
            <span className="text-green-400 text-sm font-medium">Online</span>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            mouseClickSound.currentTime = 0;
            mouseClickSound.play().catch((error) => {
              console.log("Error playing sound:", error);
            });
            toggleSound();
          }}
          className="p-2 rounded-full hover:bg-slate-600 transition"
        >
          {isSoundEnabled ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </button>

        <button
          onClick={handleLogout}
          className="p-2 rounded-full hover:bg-red-600 transition"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatPageUserHeader;
