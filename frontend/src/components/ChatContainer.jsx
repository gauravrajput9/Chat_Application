import React, { useRef, useState, useEffect } from "react";
import { Camera, Send } from "lucide-react";

const dummyMessages = [
  { text: "Hey there!", images: [], sender: "other" },
  {
    text: "Check out this image:",
    images: ["https://via.placeholder.com/150"],
    sender: "self",
  },
  { text: "How are you doing?", images: [], sender: "other" },
];

const ChatContainer = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(dummyMessages); // initialize with dummy data
  const [selectedImages, setSelectedImages] = useState([]);
  const fileInputRef = useRef(null);
  const scrollRef = useRef(null);

  // Scroll to bottom whenever messages or selected images change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, selectedImages]);

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages((prev) => [...prev, ...files]);
  };

  const handleSend = () => {
    if (!message && selectedImages.length === 0) return;

    setMessages((prev) => [...prev, { text: message, images: selectedImages }]);

    setMessage("");
    setSelectedImages([]);
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Chat area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-800 rounded-t-xl"
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col gap-2 ${msg.sender === "self" ? "items-end" : "items-start"}`}
          >
            {msg.images &&
              msg.images.map((img, i) => (
                <img
                  key={i}
                  src={typeof img === "string" ? img : URL.createObjectURL(img)}
                  alt="preview"
                  className="w-40 h-40 object-cover rounded-md"
                />
              ))}
            {msg.text && (
              <div
                className={`px-3 py-2 rounded-lg inline-block break-words ${msg.sender === "self" ? "bg-blue-600 text-white" : "bg-slate-600 text-white"}`}
              >
                {msg.text}
              </div>
            )}
          </div>
        ))}

        {/* Preview images before sending */}
        {selectedImages.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-2">
            {selectedImages.map((img, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(img)}
                alt="preview"
                className="w-32 h-32 object-cover rounded-md"
              />
            ))}
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="flex items-center gap-2 p-3 bg-slate-700 rounded-b-xl">
        {/* Image upload */}
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

        {/* Text input */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-full bg-slate-600 text-white outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          className="p-2 rounded-full hover:bg-blue-700 transition bg-blue-600"
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default ChatContainer;
