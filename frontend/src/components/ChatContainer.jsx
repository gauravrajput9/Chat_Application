import React, { useEffect } from "react";
import useChatStore from "../store/useChatStore";
import ChatContainerHeader from "./ChatContainerHeader";
import SelectedUserChatList from "./SelectedUserChatList";
import ChatInput from "./ChatInput"; // separate input component

const ChatContainer = () => {
  const { selectedUser, getMessagesByUserId } = useChatStore();

  useEffect(() => {
    if (selectedUser) {
      getMessagesByUserId(selectedUser._id);
    }
  }, [selectedUser, getMessagesByUserId]);

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900">
      {/* Header */}
      <ChatContainerHeader />

      {/* Chat messages */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <SelectedUserChatList />
      </div>

      {/* Input area */}
      <ChatInput />
    </div>
  );
};

export default ChatContainer;
