import React, { useEffect } from "react";
import useChatStore from "../store/useChatStore";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/authStore";
import { LoaderSkeletonContacts } from "./ContactsList";

const ChatList = () => {
  const { chats, setAllChats, isUsersLoading, setSelectedUser } =
    useChatStore();

  const onlineUsers = useAuthStore((state) => state.onlineUsers);

  useEffect(() => {
    if (!chats || !chats.chatParteners || chats.chatParteners.length === 0) {
      setAllChats();
    }
  }, [chats, setAllChats]);

  if (isUsersLoading) {
    return <LoaderSkeletonContacts/>;
  }
  if (chats?.chatParteners?.length === 0) {
    return <NoChatsFound />;
  }

  return (
    <div className="flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-200px)]">
      {chats?.chatParteners && chats.chatParteners.length > 0 ? (
        chats.chatParteners.map((chat) => {
          const isOnline = onlineUsers.includes(chat._id);

          return (
            <div
              key={chat._id}
              onClick={() => setSelectedUser(chat)}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-700 hover:bg-slate-600 cursor-pointer transition-colors"
            >
              {/* Avatar with Online Indicator */}
              <div className="relative">
                <img
                  src={chat.profilePic || "/user-avatar.png"}
                  alt={chat.fullName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {isOnline && (
                  <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 rounded-full border-2 border-slate-700"></span>
                )}
              </div>

              {/* Chat Name */}
              <span className="font-medium text-slate-200">
                {chat.fullName || "Unnamed Chat"}
              </span>
            </div>
          );
        })
      ) : (
        <p className="text-slate-400 text-center py-2">No chats found</p>
      )}
    </div>
  );
};

export default ChatList;
