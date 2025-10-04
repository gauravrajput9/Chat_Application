import React from "react";

const EmptyChatContainer = ({ selectedUser }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      {/* Placeholder Illustration */}
      <div className="w-40 h-40 mb-6">
        <img
          src="/chat.png"
          alt="Start Chat"
          className="w-full h-full object-contain opacity-70"
        />
      </div>

      {/* Message */}
      <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">
        {selectedUser ? (
          <>
            Say hi to{" "}
            <span className="text-blue-500 font-semibold">
              {selectedUser.fullName}
            </span>
          </>
        ) : (
          "No conversation selected"
        )}
      </h2>

      <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 max-w-sm">
        Send a message to start chatting and stay connected.
      </p>

      {/* Faint Chat Bubble Samples */}
      <div className="mt-6 space-y-2 text-sm text-gray-400 dark:text-gray-500">
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 w-fit mx-auto opacity-70">
          👋 Hello
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 w-fit mx-auto opacity-70">
          How are you?
        </div>
      </div>
    </div>
  );
};

export default EmptyChatContainer;
