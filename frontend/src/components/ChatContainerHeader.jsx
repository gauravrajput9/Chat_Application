import React from "react";
import { X } from "lucide-react";
import useChatStore from "../store/useChatStore";
import { useAuthStore } from "../store/authStore";

const ChatContainerHeader = () => {
  const selectedUser = useChatStore((state) => state.selectedUser);
  const setSelectedUser = useChatStore((state) => state.setSelectedUser);

  const onlineUsers = useAuthStore((state) => state.onlineUsers);

  if (!selectedUser) return null;

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="flex items-center justify-between bg-slate-800 border-b border-slate-700 p-4 shadow-lg">
      {/* Left: Profile pic + name + status */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 p-0.5">
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-600 flex items-center justify-center">
              <img
                src={selectedUser.profilePic}
                alt={selectedUser.fullName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div
                className="w-full h-full rounded-full bg-slate-600 flex items-center justify-center text-white font-semibold text-lg"
                style={{ display: "none" }}
              >
                {selectedUser.fullName.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-white text-lg">
            {selectedUser.fullName}
          </span>
          <span className="text-sm text-slate-400">
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>

      {/* Right: Action buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setSelectedUser(null)}
          className="p-2.5 rounded-full hover:bg-red-600/20 hover:text-red-400 text-slate-400 transition-colors"
          title="Close chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatContainerHeader;
