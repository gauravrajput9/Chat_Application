import React from "react";
import { MessageSquare } from "lucide-react";

const NoChatsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 py-6 text-gray-500">
      {/* Icon */}
      <div className="p-4 bg-gray-100 rounded-full mb-3">
        <MessageSquare className="w-8 h-8 text-gray-400" />
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-700">
        No Chats Found
      </h2>

      {/* Subtitle */}
      <p className="text-sm text-gray-500 mt-1">
        Looks like you haven’t started a conversation yet.
      </p>

      {/* Bullet instructions */}
      <ul className="mt-4 space-y-2 text-sm text-gray-500 text-left">
        <li>• Select a contact from the list</li>
        <li>• Start typing a message</li>
        <li>• Your chats will appear here</li>
      </ul>
    </div>
  );
};

export default NoChatsFound;
