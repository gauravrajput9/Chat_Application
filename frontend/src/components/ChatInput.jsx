import React, { useState } from "react";
import { Send, Camera, X } from "lucide-react";
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
    <form
      onSubmit={handleMessageSend}
      className="flex flex-col gap-2 p-3 bg-slate-700 rounded-b-xl"
    >
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Enter the message"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            isSoundEnabled && playRandomKeyboardSound();
          }}
          className="flex-1 px-4 py-2 rounded-full bg-slate-600 text-white outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="file"
          accept="image/*"
          id="chat-image-upload"
          className="hidden"
          onChange={handleImageSelect}
        />

        <label
          htmlFor="chat-image-upload"
          className="cursor-pointer p-2 rounded-full hover:bg-slate-600 transition"
        >
          <Camera className="w-5 h-5 text-white" />
        </label>

        <button
          type="submit"
          className="p-2 rounded-full hover:bg-blue-700 transition bg-blue-600"
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      </div>

      {previewImage && (
        <div className="relative w-32 h-32 mt-2">
          <img
            src={previewImage}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg border border-gray-500"
          />
          <button
            type="button"
            onClick={() => {
              setImage(null);
              setPreviewImage(null);
            }}
            className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </form>
  );
};

export default ChatInput;
