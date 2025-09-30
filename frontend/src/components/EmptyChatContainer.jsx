import React from "react";

const EmptyChatContainer = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-slate-700 rounded-xl">
      {/* Chat Image */}
      <img
        src={"/chat.png"}
        alt="Start chatting"
        className="w-48 h-48 mb-6 object-contain"
      />

      {/* Instructions */}
      <h2 className="text-2xl font-semibold text-white mb-2">
        Start a New Conversation
      </h2>
      <p className="text-slate-300 mb-4">
        Select a contact or start a new chat to begin messaging.
      </p>

      {/* Bullet Points */}
      <ul className="list-disc list-inside text-slate-300 space-y-1 text-left">
        <li>Click on a contact from the left panel.</li>
        <li>Send messages, images, or emojis.</li>
        <li>Use the sound toggle to enable/disable notifications.</li>
        <li>Click your avatar to update profile or log out.</li>
      </ul>
    </div>
  );
};

export default EmptyChatContainer;
