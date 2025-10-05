import React, { useEffect } from "react";
import useChatStore from "../store/useChatStore";
import ChatContainerHeader from "./ChatContainerHeader";
import SelectedUserChatList from "./SelectedUserChatList";
import ChatInput from "./ChatInput"; // separate input component

const ChatContainer = () => {
  const {
    selectedUser,
    getMessagesByUserId,
    subscribeToNewMessage,
    unSubscribeFromMessage,
  } = useChatStore();

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
    subscribeToNewMessage();

    return () => {
      unSubscribeFromMessage();
    };
  }, [
    selectedUser,
    getMessagesByUserId,
    subscribeToNewMessage,
    unSubscribeFromMessage,
  ]);

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
