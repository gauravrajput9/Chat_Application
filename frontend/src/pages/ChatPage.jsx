import React from "react";
import useChatStore from "../store/useChatStore";
import ChatPageUserHeader from "../components/ChatPageUserHeader";
import ChatPageContactsToggle from "../components/ChatPageContactsToggle";
import ContactsList from "../components/ContactsList";
import ChatList from "../components/ChatList";
import EmptyChatContainer from "../components/EmptyChatContainer";
import ChatContainer from "../components/ChatContainer";

const ChatPage = () => {
  const activeTab = useChatStore((state) => state.activeTab);
  const selectedUser = useChatStore((state) => state.selectedUser);

  return (
    <div className="flex h-screen bg-slate-900 text-white">
      {/* Left Sidebar */}
      <div className="w-[30%] flex flex-col gap-4 p-4 bg-slate-800">
        <ChatPageUserHeader />
        <ChatPageContactsToggle />
        {activeTab === "contacts" ? <ContactsList /> : <ChatList />}
      </div>

      {/* Right Panel: Chat content placeholder */}
      <div className="flex-1 p-4">
        {/* Replace this with your chat messages component */}

        <div className="h-full w-full bg-slate-700 rounded-xl flex flex-col">
          {selectedUser ? <ChatContainer /> : <EmptyChatContainer />}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
