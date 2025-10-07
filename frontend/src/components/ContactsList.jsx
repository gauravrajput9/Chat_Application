import React, { useEffect } from "react";
import useChatStore from "../store/useChatStore";
import { useAuthStore } from "../store/authStore";

const ContactsList = () => {
  const setAllContacts = useChatStore((state) => state.setAllContacts);
  const isUsersLoading = useChatStore((state) => state.isUsersLoading);
  const allContacts = useChatStore((state) => state.allContacts);
  const setSelectedUser = useChatStore((state) => state.setSelectedUser);
  const onlineUsers = useAuthStore((state) => state.onlineUsers);

  // ✅ Initial load
  useEffect(() => {
    setAllContacts();
  }, [setAllContacts]);

  // ✅ Refresh contacts dynamically when socket emits user_connected / user_disconnected
  useEffect(() => {
    const refreshContacts = () => {
      console.log("🔄 Refreshing contact list due to user connect/disconnect...");
      setAllContacts(); // refetch updated contact list
    };

    window.addEventListener("refreshContacts", refreshContacts);
    return () => window.removeEventListener("refreshContacts", refreshContacts);
  }, [setAllContacts]);

  if (isUsersLoading)
    return (
      <div className="flex justify-center items-center p-4">
        <LoaderSkeletonContacts />
      </div>
    );

  return (
    <div className="flex flex-col gap-3 overflow-y-auto max-h-[calc(100vh-200px)] custom-scrollbar pr-2">
      {allContacts && allContacts.length > 0 ? (
        allContacts.map((contact, index) => {
          const isOnline = onlineUsers.includes(contact._id);
          return (
            <div
              key={contact._id}
              onClick={() => setSelectedUser(contact)}
              className="group flex items-center gap-4 p-4 rounded-2xl cursor-pointer smooth-transition card-hover hover-lift fade-in bg-slate-800/40 hover:bg-slate-700/60 border border-transparent hover:border-blue-400/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-slate-600 group-hover:ring-blue-400/50 smooth-transition">
                  <img
                    src={contact.profilePic || "/user-avatar.png"}
                    alt={contact.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                {isOnline ? (
                  <div className="absolute -bottom-0.5 -right-0.5 status-indicator">
                    <div className="status-dot status-online status-pulse"></div>
                  </div>
                ) : (
                  <div className="absolute -bottom-0.5 -right-0.5 status-indicator">
                    <div className="status-dot status-offline"></div>
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white truncate group-hover:text-blue-100 smooth-transition">
                    {contact.fullName}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${
                      isOnline
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                    } smooth-transition`}
                  >
                    {isOnline ? "Online" : "Offline"}
                  </span>
                </div>
                <p className="text-sm text-gray-400 group-hover:text-gray-300 smooth-transition">
                  {isOnline ? "Active now" : "Last seen recently"}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-center fade-in">
          <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <p className="text-gray-400 font-medium">No contacts found</p>
          <p className="text-sm text-gray-500 mt-1">
            Start a conversation with someone!
          </p>
        </div>
      )}
    </div>
  );
};

export default ContactsList;
