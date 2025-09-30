import React, { useState, useRef } from "react";
import { Send, Camera, Smile, Paperclip } from "lucide-react";
import useChatStore from "../store/useChatStore";
import { useAuthStore } from "../store/authStore";

const ChatInput = () => {
  const { selectedUser, sendMessage } = useChatStore();
  const { authUser } = useAuthStore();
  const [message, setMessage] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const fileInputRef = useRef(null);

  if (!selectedUser) return null;

  const handleSend = () => {
    if (!message && selectedImages.length === 0) return;

    // Prepare message object
    const newMsg = {
      text: message,
      images: selectedImages,
      senderId: authUser?.user?._id,
      receiverId: selectedUser._id,
      createdAt: new Date().toISOString(),
    };

    // Send via store function
    sendMessage(newMsg);

    // Reset
    setMessage("");
    setSelectedImages([]);
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages((prev) => [...prev, ...files]);
  };

  return (
    <div className="flex items-center gap-2 p-3 bg-slate-700 rounded-b-xl">
      {/* Emoji / attachment icons */}
      <button className="p-2 rounded-full hover:bg-slate-600 transition">
        <Smile className="w-5 h-5 text-white" />
      </button>
      <button
        onClick={() => fileInputRef.current.click()}
        className="p-2 rounded-full hover:bg-slate-600 transition"
      >
        <Camera className="w-5 h-5 text-white" />
      </button>
      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        className="hidden"
        onChange={handleImageSelect}
      />
      <button className="p-2 rounded-full hover:bg-slate-600 transition">
        <Paperclip className="w-5 h-5 text-white" />
      </button>

      {/* Text input */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 rounded-full bg-slate-600 text-white outline-none focus:ring-2 focus:ring-blue-500"
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />

      {/* Send button */}
      <button
        onClick={handleSend}
        className="p-2 rounded-full hover:bg-blue-700 transition bg-blue-600"
      >
        <Send className="w-5 h-5 text-white" />
      </button>
    </div>
  );
};

export default ChatInput;
