import React, { useEffect } from "react";
import useChatStore from "../store/useChatStore";

const ContactsList = () => {
  const setAllContacts = useChatStore((state) => state.setAllContacts);
  const isUsersLoading = useChatStore((state) => state.isUsersLoading);
  const allContacts = useChatStore((state) => state.allContacts);

  const setSelectedUser = useChatStore((state) => state.setSelectedUser)


  useEffect(() => {
    setAllContacts();
  }, [setAllContacts]);

  if (isUsersLoading)
    return (
      <div className="flex justify-center items-center p-4">
        <LoaderSkeletonContacts />
      </div>
    );

  return (
    <div className="flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-200px)]">
      {allContacts && allContacts.length > 0 ? (
        allContacts.map((contact) => (
          <div
            key={contact._id}
            onClick={() => setSelectedUser(contact)}
            className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition bg-slate-700 hover:bg-slate-600 text-slate-300"
          >
            <img
              src={contact.profilePic || "/user-avatar.png"}
              alt={contact.fullName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-medium">{contact.fullName}</span>
          </div>
        ))
      ) : (
        <p className="text-center text-slate-400">No contacts found</p>
      )}
    </div>
  );
};

export default ContactsList;

const SkeletonContact = () => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-700 animate-pulse w-full">
      {" "}
      {/* Avatar */}{" "}
      <div className="w-10 h-10 rounded-full bg-slate-600 flex-shrink-0" />{" "}
      {/* Name placeholder fills remaining space */}{" "}
      <div className="h-4 bg-slate-600 rounded flex-1" />{" "}
    </div>
  );
};


export const LoaderSkeletonContacts = ({ count = 6 }) => {
  return (
    <div className="flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-200px)] w-full">
      {" "}
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonContact key={index} />
      ))}{" "}
    </div>
  );
};
