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
    <div className="flex h-screen bg-gradient-bg-secondary bg-pattern text-white">
      {/* Left Sidebar */}
      <div className="w-[320px] min-w-[320px] flex flex-col gap-4 p-4">
        <div className="glass-effect rounded-2xl p-4 smooth-transition fade-in">
          <ChatPageUserHeader />
        </div>
        <div className="glass-effect rounded-2xl p-4 smooth-transition fade-in">
          <ChatPageContactsToggle />
        </div>
        <div className="glass-effect rounded-2xl flex-1 overflow-hidden smooth-transition fade-in">
          <div className="p-4 h-full">
            {activeTab === "contacts" ? <ContactsList /> : <ChatList />}
          </div>
        </div>
      </div>

      {/* Right Panel: Chat content */}
      <div className="flex-1 p-4 pl-2">
        <div className="h-full w-full glass-effect rounded-2xl overflow-hidden smooth-transition fade-in">
          {selectedUser ? <ChatContainer /> : <EmptyChatContainer />}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
