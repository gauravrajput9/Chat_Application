import { create } from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import { io } from "socket.io-client"

const BASE_URL = "https://chat-application-rsxd.onrender.com"

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  socket: null,
  onlineUsers: [],

  setAuthUser: (userData) => set({ authUser: userData }),

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/user/check")
      set({ authUser: res.data.user })
      get().connectSocketWithRetry() // ✅ use retry logic
    } catch (error) {
      console.log("Error checking Auth: ", error)
    } finally {
      set({ isCheckingAuth: false })
    }
  },

  connectSocketWithRetry: async (retries = 3, delay = 500) => {
    const { authUser } = get()
    if (!authUser || get().socket?.connected) return

    // Wait until cookie exists
    const cookieExists = document.cookie.split("; ").some(row => row.startsWith("token="))
    if (!cookieExists && retries > 0) {
      console.log(`Cookie not found yet, retrying in ${delay}ms...`)
      setTimeout(() => get().connectSocketWithRetry(retries - 1, delay), delay)
      return
    }

    const socket = io(BASE_URL, {
      transports: ["websocket"],
      withCredentials: true // ✅ must be true for cookies
    })

    set({ socket })

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id)
    })

    socket.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err.message)
    })

    socket.on("getAllOnlineUsers", (users) => {
      console.log("Online Users from socket: ", users)
      set({ onlineUsers: users })
    })
  },

  disconnectSocket: () => {
    const { socket } = get()
    if (socket?.connected) {
      socket.disconnect()
      console.log("Socket disconnected")
    }
    set({ socket: null, onlineUsers: [] })
  },

  logout: () => {
    get().disconnectSocket()
    set({
      authUser: null,
      socket: null,
      onlineUsers: [],
      isCheckingAuth: false
    })
  }
}))
