import React, { useEffect, useRef } from "react";
import useChatStore from "../store/useChatStore";
import { useAuthStore } from "../store/authStore";

const SelectedUserChatList = () => {
  const { messages, selectedUser } = useChatStore();
  const { authUser } = useAuthStore();

  const endRef = useRef(null);

  // Auto scroll to bottom when messages change
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

  // ✅ Filter only messages between logged-in user and selected user
  const chatMessages = messages.filter(
    (msg) =>
      (msg.senderId === authUser?.user?._id &&
        msg.receiverId === selectedUser._id) ||
      (msg.senderId === selectedUser._id &&
        msg.receiverId === authUser?.user?._id)
  );

  return (
    <div className="flex-1 h-full overflow-y-auto p-4 space-y-4 bg-slate-900">
      {chatMessages.map((msg) => {
        const isMine = msg.senderId === authUser?.user?._id;

        return (
          <div
            key={msg._id}
            className={`flex ${isMine ? "justify-end" : "justify-start"}`}
          >
            {msg.text && (
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  isMine
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-700 text-white rounded-bl-none"
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
              </div>
            )}

            {msg.image && (
              <div className="mt-1">
                <img
                  src={
                    msg.isOptimistic && msg.image instanceof File
                      ? URL.createObjectURL(msg.image)
                      : msg.image
                  }
                  alt="Message"
                  className="max-w-[220px] max-h-[220px] object-cover rounded-lg"
                  style={{ border: "none", outline: "none" }}
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
            )}
          </div>
        );
      })}
      <div ref={endRef} />
    </div>
  );
};

export default SelectedUserChatList;
