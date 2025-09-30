import React from "react";
import { X, Phone, Video, MoreVertical, Info } from "lucide-react";
import useChatStore from "../store/useChatStore";

const ChatContainerHeader = () => {
  const selectedUser = useChatStore((state) => state.selectedUser);
  const setSelectedUser = useChatStore((state) => state.setSelectedUser);

  if (!selectedUser) return null;

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
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-full h-full rounded-full bg-slate-600 flex items-center justify-center text-white font-semibold text-lg" style={{display: 'none'}}>
                {selectedUser.fullName.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
          {/* Online status indicator with animation */}
          {selectedUser.isOnline && (
            <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-green-500 border-2 border-slate-800 animate-pulse" />
          )}
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-white text-lg">{selectedUser.fullName}</span>
          <span className="text-sm text-slate-400 flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${selectedUser.isOnline ? 'bg-green-500' : 'bg-slate-500'}`} />
            {selectedUser.isOnline ? "Active now" : "Last seen recently"}
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
