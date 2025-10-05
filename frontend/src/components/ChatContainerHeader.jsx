import React from "react";
import { X, Phone, Video, MoreVertical } from "lucide-react";
import useChatStore from "../store/useChatStore";
import { useAuthStore } from "../store/authStore";

const ChatContainerHeader = () => {
  const selectedUser = useChatStore((state) => state.selectedUser);
  const setSelectedUser = useChatStore((state) => state.setSelectedUser);

  const onlineUsers = useAuthStore((state) => state.onlineUsers);

  if (!selectedUser) return null;

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="flex items-center justify-between p-4 backdrop-blur-sm bg-transparent">
      {/* Left: Profile pic + name + status */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="relative flex-shrink-0">
          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-400/30 smooth-transition hover:ring-blue-400/60">
            <img
              src={selectedUser.profilePic || "/user-avatar.png"}
              alt={selectedUser.fullName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div
              className="w-full h-full rounded-full bg-gradient-accent flex items-center justify-center text-white font-semibold text-lg"
              style={{ display: "none" }}
            >
              {selectedUser.fullName.charAt(0).toUpperCase()}
            </div>
          </div>
          {/* Status indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 status-indicator">
            <div className={`status-dot ${isOnline ? 'status-online status-pulse' : 'status-offline'}`}></div>
          </div>
        </div>
        
        <div className="flex flex-col min-w-0 flex-1">
          <h2 className="font-semibold text-white text-lg truncate">
            {selectedUser.fullName}
          </h2>
          <p className={`text-sm smooth-transition ${
            isOnline ? 'text-green-400' : 'text-gray-400'
          }`}>
            {isOnline ? 'Active now' : 'Last seen recently'}
          </p>
        </div>
      </div>

      {/* Right: Action buttons */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          className="p-2.5 rounded-full hover:bg-slate-700/50 hover:text-blue-400 text-gray-400 smooth-transition hover-glow group"
          title="Voice call"
        >
          <Phone className="w-5 h-5 group-hover:scale-110 smooth-transition" />
        </button>
        
        <button
          className="p-2.5 rounded-full hover:bg-slate-700/50 hover:text-blue-400 text-gray-400 smooth-transition hover-glow group"
          title="Video call"
        >
          <Video className="w-5 h-5 group-hover:scale-110 smooth-transition" />
        </button>
        
        <button
          className="p-2.5 rounded-full hover:bg-slate-700/50 hover:text-gray-300 text-gray-400 smooth-transition hover-glow group"
          title="More options"
        >
          <MoreVertical className="w-5 h-5 group-hover:scale-110 smooth-transition" />
        </button>
        
        <div className="w-px h-6 bg-gray-600/50 mx-1"></div>
        
        <button
          onClick={() => setSelectedUser(null)}
          className="p-2.5 rounded-full hover:bg-red-500/20 hover:text-red-400 text-gray-400 smooth-transition hover-glow group"
          title="Close chat"
        >
          <X className="w-5 h-5 group-hover:scale-110 smooth-transition" />
        </button>
      </div>
    </div>
  );
};

export default ChatContainerHeader;
