import React, { useEffect } from "react";
import useChatStore from "../store/useChatStore";
import SelectedUserChatList from "./SelectedUserChatList";
import { Send, Image, ArrowLeft, Sun } from "lucide-react";
import ChatContainerHeader from "./ChatContainerHeader";

const ChatContainer = () => {
  const {
    selectedUser,
    messageText,
    setMessageText,
    sendMessage,
    sendImageMessage,
    getMessagesByUserId,
    subscribeToNewMessage,
    unSubscribeFromMessage,
  } = useChatStore();

  // Send text message
  const handleSend = async () => {
    if (!messageText.trim() || !selectedUser) return;

    const formData = new FormData();
    formData.append("text", messageText.trim());
    await sendMessage(formData, selectedUser._id);
    setMessageText("");
  };

  // Send image message
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !selectedUser) return;
    await sendImageMessage(file);
  };

  // Handle Enter key
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [messageText, selectedUser]);

  // Fetch and subscribe to messages
  useEffect(() => {
    if (!selectedUser?._id) return;
    getMessagesByUserId(selectedUser._id);
    subscribeToNewMessage();
    return () => {
      unSubscribeFromMessage();
    };
  }, [
    selectedUser?._id,
    getMessagesByUserId,
    subscribeToNewMessage,
    unSubscribeFromMessage,
  ]);

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select a user to start chatting
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-gray-900/80 backdrop-blur-md border-l border-gray-700 h-full">
      <ChatContainerHeader />

      {/* Messages Area — fixed height, scrollable */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <SelectedUserChatList />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-700 bg-gray-800/70 flex-shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <label className="cursor-pointer hover:bg-gray-700/60 p-2 rounded-full">
            <Image size={20} />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>

          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            rows={1}
            placeholder="Type a message..."
            className="flex-1 resize-none bg-gray-700/70 rounded-xl px-4 py-2 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="p-3 rounded-full bg-indigo-600 hover:bg-indigo-700"
          >
            <Send size={20} className="text-white" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatContainer;
