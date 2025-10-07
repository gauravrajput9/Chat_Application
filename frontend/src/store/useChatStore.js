import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import { useAuthStore } from "./authStore";

const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  selectedUser: null,
  activeTab: "chats",
  messageText: "",
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  // -----------------------------
  // Basic setters
  // -----------------------------
  setSelectedUser: (user) => set({ selectedUser: user }),
  setMessageText: (text) => set({ messageText: text }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },

  // -----------------------------
  // Fetching contacts & chats
  // -----------------------------
  setAllContacts: async (forceRefresh = false) => {
    if (get().allContacts.length > 0 && !forceRefresh) return;
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/getAllContacts");
      set({ allContacts: res.data.users });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch contacts");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  setAllChats: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/chats");
      set({ chats: res.data });
    } catch {
      toast.error("Error fetching chats");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // -----------------------------
  // Fetch messages
  // -----------------------------
  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      const serverMessages = res.data.messages;

      // preserve optimistic messages for this user
      const optimisticMessages = get().messages.filter(
        (msg) => msg.isOptimistic && msg.receiverId === userId
      );

      set({ messages: [...serverMessages, ...optimisticMessages] });
    } catch {
      toast.error("Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  refreshMessages: () => {
    const { selectedUser } = get();
    if (selectedUser) get().getMessagesByUserId(selectedUser._id);
  },

  // -----------------------------
  // Send messages
  // -----------------------------
  sendMessage: async (formData, receiverId) => {
    if (!receiverId) return;
    const { messages } = get();
    const { authUser } = useAuthStore.getState();
    const text = formData.get("text");
    const image = formData.get("image");

    if (!text && !image) return;

    const tempId = `temp-${Date.now()}`;
    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId,
      text,
      image: image ? URL.createObjectURL(image) : null,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };

    set({ messages: [...messages, optimisticMessage] });

    try {
      const res = await axiosInstance.post(`/message/send/${receiverId}`, formData);
      const newMessage = res.data.newMessage;

      set({
        messages: get().messages.map((msg) => (msg._id === tempId ? newMessage : msg)),
      });
    } catch {
      set({ messages: get().messages.filter((msg) => msg._id !== tempId) });
      toast.error("Failed to send message");
    }
  },

  sendImageMessage: async (file) => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const formData = new FormData();
    formData.append("image", file);
    await get().sendMessage(formData, selectedUser._id);
  },

  // -----------------------------
  // Real-time socket handling
  // -----------------------------
  subscribeToNewMessage: () => {
    const { socket } = useAuthStore.getState();
    if (!socket?.connected) return;

    socket.off("newMessage");
    socket.on("newMessage", (newMessage) => {
      const { authUser } = useAuthStore.getState();
      if (!authUser?._id) return;

      const { messages } = get();
      const optimisticIndex = messages.findIndex(
        (msg) =>
          msg.isOptimistic &&
          msg.senderId === newMessage.senderId &&
          msg.receiverId === newMessage.receiverId &&
          msg.text === newMessage.text
      );

      let updatedMessages = [...messages];
      if (optimisticIndex !== -1) {
        updatedMessages[optimisticIndex] = newMessage;
      } else if (!messages.find((m) => m._id === newMessage._id)) {
        updatedMessages.push(newMessage);
      }

      set({ messages: updatedMessages });

      if (get().isSoundEnabled && newMessage.senderId !== authUser._id) {
        const audio = new Audio("/sounds/notification.mp3");
        audio.play().catch(() => {});
      }
    });
  },

  unSubscribeFromMessage: () => {
    const { socket } = useAuthStore.getState();
    socket?.off("newMessage");
  },

  // -----------------------------
  // Reset store
  // -----------------------------
  clearChatState: () =>
    set({
      allContacts: [],
      chats: [],
      messages: [],
      selectedUser: null,
      messageText: "",
      activeTab: "chats",
      isUsersLoading: false,
      isMessagesLoading: false,
    }),
}));

export default useChatStore;
