import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import { toast } from "react-toastify"

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
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled)
        set({ isSoundEnabled: !get().isSoundEnabled })
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

    setAllChats:async () =>{
        set({isUsersLoading: true})
        try {
            const res = await axiosInstance.get("/message/chats")
            set({chats: res.data})
        } catch (error) {
            console.log("Chat Fetching error from Store: ", error.message)
            toast.error("Error Fetching The Chats")
        }
        finally{
            set({isUsersLoading: false})
        }
    },

    getMessagesByUserId: async (userId) =>{
        set({isMessagesLoading: true})
        try {
            const res = await axiosInstance.get(`/message/${userId}`)
            console.log(res.data)
            set({messages: res.data.messages})
        } catch (error) {
            console.log("Error fetching the chats: ", error.message)
            toast.error("Something Went Wrong")
        }finally{
            set({isMessagesLoading: false})
        }
    }
}))

export default useChatStore