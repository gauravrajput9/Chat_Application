import React, { useEffect, useRef } from "react";
import useChatStore from "../store/useChatStore";
import { useAuthStore } from "../store/authStore";
import EmptyChatContainer from "./NOCHATSPLACEHOLDER";
import RotatingLoader from "./Loader";

const SelectedUserChatList = () => {
  const { messages, selectedUser, isMessagesLoading } = useChatStore();
  const { authUser } = useAuthStore();
  const scrollRef = useRef(null);

  const chatMessages = messages.filter(
    (msg) =>
      (msg.senderId === authUser?.user?._id &&
        msg.receiverId === selectedUser?._id) ||
      (msg.senderId === selectedUser?._id &&
        msg.receiverId === authUser?.user?._id)
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  if (messages.length === 0) {
    return <EmptyChatContainer selectedUser={selectedUser} />;
  }

  if (isMessagesLoading) {
    return (
      <div className="flex flex-1 items-center justify-center bg-slate-900">
        <RotatingLoader />
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-900"
    >
      {chatMessages.map((msg) => {
        const isSender = msg.senderId === authUser?.user?._id;
        return (
          <div
            key={msg._id}
            className={`flex ${isSender ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-3 py-2 rounded-lg inline-block max-w-xs md:max-w-sm break-words space-y-2 ${
                isSender
                  ? "bg-blue-800 text-slate-100"
                  : "bg-slate-700 text-slate-100"
              }`}
            >
              {msg.text && <p>{msg.text}</p>}

              {msg.image && (
                <img
                  src={msg.image}
                  alt="chat"
                  className="rounded-lg max-h-64 object-cover"
                />
              )}

              <div className="text-xs text-slate-400 mt-1 text-right">
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SelectedUserChatList;
