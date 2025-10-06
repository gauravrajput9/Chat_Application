import React, { useEffect, useCallback } from "react";
import useChatStore from "../store/useChatStore";
import { useAuthStore } from "../store/authStore";
import ChatContainerHeader from "./ChatContainerHeader";
import SelectedUserChatList from "./SelectedUserChatList";
import ChatInput from "./ChatInput"; // separate input component

const ChatContainer = () => {
  const {
    selectedUser,
    getMessagesByUserId,
    subscribeToNewMessage,
    unSubscribeFromMessage,
    messages,
  } = useChatStore();
  
  const { socket, authUser } = useAuthStore();

  // Load messages when selected user changes
  useEffect(() => {
    if (selectedUser?._id && authUser) {
      console.log("📋 Loading messages for:", selectedUser.fullName);
      getMessagesByUserId(selectedUser._id);
    }
  }, [selectedUser?._id, authUser?._id, getMessagesByUserId]);

  // Subscribe to socket messages when socket is connected
  useEffect(() => {
    if (socket?.connected && authUser) {
      console.log("🔌 Setting up message subscription");
      subscribeToNewMessage();

      return () => {
        console.log("🔇 Cleaning up message subscription");
        unSubscribeFromMessage();
      };
    }
  }, [socket?.connected, authUser?._id, subscribeToNewMessage, unSubscribeFromMessage]);

  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* Header */}
      <div className="border-b border-gray-700/30 px-6 py-4">
        <ChatContainerHeader />
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-hidden">
        <SelectedUserChatList />
      </div>

      {/* Input area */}
      <div className="border-t border-gray-700/30 p-6">
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatContainer;
