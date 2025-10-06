import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import { useAuthStore } from "./authStore";


const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),

  setAllContacts: async () => {
    if (get().allContacts.length > 0) return;

    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/getAllContacts");
      set({ allContacts: res.data.users });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch contacts");
      console.log("Error While Fetching contacts in Store: ", error);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  setAllChats: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/chats");
      set({ chats: res.data });
    } catch (error) {
      console.log("Chat Fetching error from Store: ", error.message);
      toast.error("Error Fetching The Chats");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data.messages });
    } catch (error) {
      console.log("Error fetching the chats: ", error.message);
      toast.error("Something Went Wrong");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (data, receiverId) => {
    const { messages } = get();
    const { authUser } = useAuthStore.getState();

    const text = data.get("text");
    const image = data.get("image");

    const tempId = `temp-${Date.now()}`;
    const optimisticMessage = {
      _id: tempId,
      senderId: authUser?._id,
      receiverId,
      text,
      image,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };

    set({ messages: [...messages, optimisticMessage] });

    try {
      const res = await axiosInstance.post(`/message/send/${receiverId}`, data);
      const newMessage = res.data.newMessage;

      set({
        messages: get().messages.map((msg) =>
          msg._id === tempId ? newMessage : msg
        ),
      });
    } catch (error) {
      set({
        messages: get().messages.filter((msg) => msg._id !== tempId),
      });
      console.error("Message Sending Error", error.message);
      toast.error(error.message);
    }
  },

subscribeToNewMessage: () => {
  const { socket } = useAuthStore.getState();
  if (!socket?.connected) {
    console.warn("❌ Socket not connected, cannot subscribe to messages");
    return;
  }

  // Remove existing listener to prevent duplicates
  socket.off("newMessage");
  
  socket.on("newMessage", (newMessage) => {
    console.log("📨 New message received:", newMessage);
    const { selectedUser, isSoundEnabled } = get();
    const { authUser } = useAuthStore.getState();
    
    if (!authUser?._id) return;

    // Check if message is for any conversation involving current user
    const isForCurrentUser = 
      newMessage.senderId === authUser._id || 
      newMessage.receiverId === authUser._id;

    if (isForCurrentUser) {
      // Update messages using functional update
      set((state) => {
        // Avoid duplicates
        const existingMessage = state.messages.find(msg => msg._id === newMessage._id);
        if (existingMessage) return state;
        
        return {
          ...state,
          messages: [...state.messages, newMessage]
        };
      });

      // Play notification sound for incoming messages (not sent by current user)
      if (isSoundEnabled && newMessage.senderId !== authUser._id) {
        const notificationSound = new Audio("/sounds/notification.mp3");
        notificationSound.currentTime = 0;
        notificationSound
          .play()
          .catch((error) => console.log("Error playing Sound", error.message));
      }
    }
  });
  
  console.log("✅ Subscribed to new messages");
},




  unSubscribeFromMessage: () => {
    const { socket } = useAuthStore.getState();
    if (socket) {
      socket.off("newMessage");
      console.log("🔇 Unsubscribed from messages");
    }
  },

  // Add function to clear chat state on logout
  clearChatState: () => {
    set({
      allContacts: [],
      chats: [],
      messages: [],
      selectedUser: null,
      activeTab: "chats",
      isUsersLoading: false,
      isMessagesLoading: false
    });
    console.log("🧹 Chat state cleared");
  },

  // Add function to refresh messages when switching users
  refreshMessages: () => {
    const { selectedUser } = get();
    if (selectedUser) {
      console.log("🔄 Refreshing messages for user:", selectedUser.fullName);
      get().getMessagesByUserId(selectedUser._id);
    }
  },
}));

export default useChatStore;
