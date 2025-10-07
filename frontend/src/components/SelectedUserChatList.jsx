import React, { useEffect, useRef, useState } from "react";
import useChatStore from "../store/useChatStore";
import { useAuthStore } from "../store/authStore";

const SelectedUserChatList = () => {
  const { messages, selectedUser } = useChatStore();
  const { authUser } = useAuthStore();

  const scrollContainerRef = useRef(null);
  const endRef = useRef(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  // 🧠 Scroll to bottom on mount (when opening a chat)
  useEffect(() => {
    if (selectedUser && endRef.current) {
      endRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [selectedUser]);

  // 🧠 Auto-scroll when new message comes in (if near bottom)
  useEffect(() => {
    if (shouldAutoScroll) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, shouldAutoScroll]);

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const threshold = 100;
    const distanceFromBottom = el.scrollHeight - (el.scrollTop + el.clientHeight);

    if (distanceFromBottom > threshold && shouldAutoScroll) {
      setShouldAutoScroll(false);
    } else if (distanceFromBottom <= threshold && !shouldAutoScroll) {
      setShouldAutoScroll(true);
    }
  };

  if (!selectedUser) {
    return (
      <div className="flex flex-1 items-center justify-center text-gray-500">
        Select a user to start chatting
      </div>
    );
  }

  if (!authUser?._id) return null;

  // 🧩 Filter and sort messages
  const chatMessages = messages
    .filter(
      (msg) =>
        (msg.senderId === authUser._id && msg.receiverId === selectedUser._id) ||
        (msg.senderId === selectedUser._id && msg.receiverId === authUser._id)
    )
    .slice()
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  const formatTime = (timestamp) =>
    new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <div
      ref={scrollContainerRef}
      onScroll={handleScroll}
      className="flex-1 h-full overflow-y-auto p-6 space-y-4 bg-transparent custom-scrollbar"
      style={{ scrollBehavior: "smooth" }}
    >
      {chatMessages.map((msg, index) => {
        const isMine = msg.senderId === authUser._id;
        const showAvatar =
          !isMine &&
          (index === 0 || chatMessages[index - 1].senderId !== msg.senderId);
        // const isLastInGroup =
        //   index === chatMessages.length - 1 ||
        //   chatMessages[index + 1].senderId !== msg.senderId;

        return (
          <div
            key={msg._id || index}
            className={`flex items-end gap-2 ${
              isMine ? "justify-end" : "justify-start"
            }`}
          >
            {/* Avatar for receiver */}
            {!isMine && showAvatar && (
              <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-gray-600/50 flex-shrink-0">
                <img
                  src={selectedUser.profilePic || "/user-avatar.png"}
                  alt={selectedUser.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Empty space to align sender bubbles */}
            {!isMine && !showAvatar && <div className="w-8 h-8 flex-shrink-0" />}

            {/* Message bubble */}
            <div
              className={`flex flex-col max-w-xs lg:max-w-md ${
                isMine ? "items-end" : "items-start"
              }`}
            >
              {msg.text && (
                <div
                  className={`p-3 rounded-2xl shadow-md ${
                    isMine
                      ? "bg-blue-600 text-white rounded-br-sm"
                      : "bg-gray-700 text-white rounded-bl-sm"
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                  <p className="text-xs text-gray-300 mt-1">{formatTime(msg.createdAt)}</p>
                </div>
              )}

              {msg.image && (
                <img
                  src={
                    msg.isOptimistic && msg.image instanceof File
                      ? URL.createObjectURL(msg.image)
                      : msg.image
                  }
                  alt="Attachment"
                  className="max-w-[250px] max-h-[250px] rounded-2xl border border-gray-600 mt-2 object-cover"
                />
              )}
            </div>
          </div>
        );
      })}
      {/* Always keep bottom ref */}
      <div ref={endRef} />
    </div>
  );
};

export default SelectedUserChatList;
