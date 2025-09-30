import React from "react";

const EmptyChatContainer = ({ selectedUser }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-6">
      {/* Chat Theme Image */}
      <img
        src="/chat.png"
        alt="Chat Theme"
        className="w-32 h-32 opacity-80"
      />

      {/* Selected User */}
      <h2 className="text-xl font-semibold">
        Start your conversation with{" "}
        <span className="text-blue-500">{selectedUser?.fullName || "User"}</span>
      </h2>

      {/* Descriptive Text */}
      <p className="text-gray-500 max-w-md">
        Send a message to start the chat. You can talk about anything – work,
        studies, or just say hello!
      </p>

      {/* Sample Mini Chats */}
      <div className="w-full max-w-xs bg-white dark:bg-gray-800 rounded-xl shadow p-4 space-y-2">
        <p className="text-gray-700 dark:text-gray-200">👋 Hello</p>
        <hr className="border-gray-300 dark:border-gray-700" />
        <p className="text-gray-700 dark:text-gray-200">🙂 How are you?</p>
        <hr className="border-gray-300 dark:border-gray-700" />
        <p className="text-gray-700 dark:text-gray-200">💬 Let’s chat!</p>
      </div>
    </div>
  );
};

export default EmptyChatContainer;
