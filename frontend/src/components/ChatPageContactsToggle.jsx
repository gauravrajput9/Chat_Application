import React from "react";
import useChatStore from "../store/useChatStore";

const ChatPageContactsToggle = () => {
  const activeTab = useChatStore((state) => state.activeTab);
  const setActiveTab = useChatStore((state) => state.setActiveTab);

  return (
    <div className="flex bg-slate-700 p-2 rounded-xl shadow justify-center gap-12">
      {["contacts", "chats"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 text-sm font-medium transition border-b-2 ${
            activeTab === tab
              ? "border-slate-300 text-white" // underline for active tab
              : "border-transparent text-slate-300 hover:border-slate-500 hover:text-white" // inactive
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default ChatPageContactsToggle;
