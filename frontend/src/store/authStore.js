import { create } from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import { io } from "socket.io-client"

const BASE_URL = "https://chat-application-rsxd.onrender.com/"

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    socket: null,
    onlineUsers: [],

    setAuthUser: (userData) => set({ authUser: userData }),

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/user/check")
            set({ authUser: res.data })
            get().connectSocket()
        } catch (error) {
            console.log("Error checking Auth: ", error)
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    connectSocket: () => {
        const { authUser } = get()
        if (!authUser || get().socket?.connected) return;

        console.log("Connect Socket Called")

        const socket = io(BASE_URL, {
            withCredentials: true,       // send cookies
            transports: ["websocket"]    // polling optional
        });

        set({ socket })
        console.log(socket)
        socket.on("connect", () => {
            console.log("✅ Socket connected:", socket.id);
        });

        socket.on("connect_error", (err) => {
            console.error("❌ Connection error:", err.message);
        });

        socket.on("getAllOnlineUsers", (users) => {
            console.log("Online Users from socket: ", users)
            set({ onlineUsers: users })
        })
    },

    disconnectSocket: () => {
        if (get().socket.connected) {
            get().socket.disconnect()
            console.log("Socket Disconnected")
        }

    }
}))