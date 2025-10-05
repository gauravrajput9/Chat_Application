import React, { useState } from "react";
import { Send, Camera, X, Smile } from "lucide-react";
import useKeyboardSound from "../hooks/useKeyboardSounds";
import useChatStore from "../store/useChatStore";

const ChatInput = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const { playRandomKeyboardSound } = useKeyboardSound();
  const { sendMessage, isSoundEnabled, selectedUser } = useChatStore();

  if (!selectedUser) return null;

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleMessageSend = (e) => {
    e.preventDefault();
    if (!text && !image) return;

    const formData = new FormData();
    formData.append("text", text.trim());
    if (image) formData.append("image", image);

    sendMessage(formData, selectedUser._id);

    setText("");
    setImage(null);
    setPreviewImage(null);
  };

  return (
    <div className="space-y-4">
      {/* Image Preview */}
      {previewImage && (
        <div className="fade-in">
          <div className="relative inline-block">
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-xs max-h-32 object-cover rounded-2xl border border-gray-600/50 shadow-lg"
            />
            <button
              type="button"
              onClick={() => {
                setImage(null);
                setPreviewImage(null);
              }}
              className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg smooth-transition hover-glow"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleMessageSend} className="space-y-4">
        <div className="flex items-end gap-3">
          {/* Message Input Container */}
          <div className="flex-1 relative">
            <div className="flex items-center bg-slate-800/50 rounded-2xl border border-gray-600/30 backdrop-blur-sm smooth-transition focus-within:border-blue-400/50 focus-within:shadow-lg focus-within:shadow-blue-500/20 relative">
              <input
                type="text"
                placeholder="Type your message..."
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  isSoundEnabled && playRandomKeyboardSound();
                }}
                className="flex-1 px-5 py-4 bg-transparent text-white outline-none placeholder-gray-400 focus:placeholder-transparent"
              />
              
              {/* Attachment Button */}
              <input
                type="file"
                accept="image/*"
                id="chat-image-upload"
                className="hidden"
                onChange={handleImageSelect}
              />
              <label
                htmlFor="chat-image-upload"
                className="cursor-pointer p-3 rounded-full hover:bg-slate-700/50 smooth-transition hover-glow group"
                title="Attach image"
              >
                <Camera className="w-5 h-5 text-gray-400 group-hover:text-blue-400 smooth-transition" />
              </label>
            </div>
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!text.trim() && !image}
            className="p-4 rounded-2xl gradient-accent hover:gradient-accent-hover disabled:bg-gray-600 disabled:cursor-not-allowed smooth-transition hover-lift hover-glow group relative overflow-hidden"
            title="Send message"
          >
            <Send className="w-5 h-5 text-white group-hover:scale-110 smooth-transition" />
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
