import React, { useEffect } from "react";
import useChatStore from "../store/useChatStore";
import { LoaderSkeletonContacts } from "./ContactsList";
import NoChatsFound from "./NoChatsFound";

const ChatList = () => {
  const chats = useChatStore((state) => state.chats);
  const setAllChats = useChatStore((state) => state.setAllChats);
  const isUsersLoading = useChatStore((state) => state.isUsersLoading);

  const setSelectedUser = useChatStore((state) => state.setSelectedUser)

  useEffect(() => {
    if (!chats || !chats.chatParteners || chats.chatParteners.length === 0) {
      setAllChats();
    }
  }, [chats, setAllChats]);

  if (isUsersLoading) {
    return <LoaderSkeletonContacts />;
  }
  if(chats?.chatParteners?.length === 0){
    return <NoChatsFound/>
  }

  return (
    <div className="flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-200px)]">
      {chats?.chatParteners && chats.chatParteners.length > 0 ? (
        chats.chatParteners.map((chat) => (
          <div
            key={chat._id}
            onClick={() => setSelectedUser(chat)}
            className="flex items-center gap-3 p-3 rounded-xl bg-slate-700 hover:bg-slate-600 cursor-pointer transition-colors"
          >
            {/* Avatar */}
            <img
              src={chat.profilePic || "/user-avatar.png"}
              alt={chat.fullName}
              className="w-10 h-10 rounded-full object-cover"
            />

            {/* Chat Name */}
            <span className="font-medium text-slate-200">
              {chat.fullName || "Unnamed Chat"}
            </span>
          </div>
        ))
      ) : (
        <p className="text-slate-400 text-center py-2">No chats found</p>
      )}
    </div>
  );
};

export default ChatList;
