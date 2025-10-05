import React, { useEffect, useRef } from "react";
import useChatStore from "../store/useChatStore";
import { useAuthStore } from "../store/authStore";

const SelectedUserChatList = () => {
  const { messages, selectedUser } = useChatStore();
  const { authUser } = useAuthStore();

  const endRef = useRef(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, selectedUser]);

  if (!selectedUser) {
    return (
      <div className="flex flex-1 items-center justify-center text-gray-500">
        Select a user to start chatting
      </div>
    );
  }

  const chatMessages = messages.filter(
    (msg) =>
      (msg.senderId === authUser?.user?._id &&
        msg.receiverId === selectedUser._id) ||
      (msg.senderId === selectedUser._id &&
        msg.receiverId === authUser?.user?._id)
  );

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="flex-1 h-full overflow-y-auto p-6 space-y-4 bg-transparent custom-scrollbar">
      {chatMessages.map((msg, index) => {
        const isMine = msg.senderId === authUser?.user?._id;
        const showAvatar = !isMine && (index === 0 || chatMessages[index - 1].senderId !== msg.senderId);
        const isLastInGroup = index === chatMessages.length - 1 || chatMessages[index + 1].senderId !== msg.senderId;

        return (
          <div
            key={msg._id}
            className={`flex items-end gap-2 fade-in ${isMine ? "justify-end flex-row-reverse" : "justify-start"}`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Avatar for received messages */}
            {showAvatar && !isMine && (
              <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-gray-600/50 flex-shrink-0">
                <img
                  src={selectedUser.profilePic || "/user-avatar.png"}
                  alt={selectedUser.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {!showAvatar && !isMine && <div className="w-8 h-8 flex-shrink-0" />}

            <div className={`flex flex-col max-w-xs lg:max-w-md space-y-1 ${isMine ? 'items-end' : 'items-start'}`}>
              {/* Message Content */}
              <div className={`group relative`}>
                {msg.text && (
                  <div
                    className={`message-bubble p-4 rounded-2xl shadow-lg smooth-transition ${
                      isMine
                        ? "gradient-accent text-white message-bubble-sent"
                        : "bg-slate-700/80 text-white message-bubble-received border border-gray-600/30"
                    } ${isLastInGroup ? (isMine ? 'rounded-br-md' : 'rounded-bl-md') : ''}`}
                  >
                    <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                  </div>
                )}

                {msg.image && (
                  <div className={`mt-2 ${msg.text ? 'mt-2' : ''}`}>
                    <div className={`relative rounded-2xl overflow-hidden shadow-lg border border-gray-600/30 hover-lift smooth-transition ${
                      isLastInGroup ? (isMine ? 'rounded-br-md' : 'rounded-bl-md') : ''
                    }`}>
                      <img
                        src={
                          msg.isOptimistic && msg.image instanceof File
                            ? URL.createObjectURL(msg.image)
                            : msg.image
                        }
                        alt="Message"
                        className="max-w-[280px] max-h-[280px] object-cover cursor-pointer"
                        onError={(e) => (e.target.style.display = "none")}
                        onClick={() => {
                          // Could implement image preview modal here
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 smooth-transition" />
                    </div>
                  </div>
                )}

                {/* Timestamp - shows on hover */}
                <div className={`absolute top-full mt-1 text-xs text-gray-400 opacity-0 group-hover:opacity-100 smooth-transition pointer-events-none ${
                  isMine ? 'right-0' : 'left-0'
                }`}>
                  {formatTime(msg.createdAt)}
                </div>
              </div>

              {/* Read Receipt for sent messages */}
              {isMine && isLastInGroup && (
                <div className="flex items-center gap-1 mt-1 px-1">
                  <div className="flex">
                    <div className="w-3 h-3 rounded-full bg-blue-400 opacity-60" />
                    <div className="w-3 h-3 rounded-full bg-blue-400 -ml-1" />
                  </div>
                  <span className="text-xs text-gray-400">Read</span>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Typing Indicator */}
      {/* Add this when you implement typing indicators */}
      {/* <div className="flex items-start gap-2">
        <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-gray-600/50">
          <img src={selectedUser.profilePic || "/user-avatar.png"} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="typing-indicator">
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
        </div>
      </div> */}

      <div ref={endRef} />
    </div>
  );
};

export default SelectedUserChatList;
