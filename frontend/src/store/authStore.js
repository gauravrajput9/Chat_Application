import { create } from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import { io } from "socket.io-client"

// Use env-configured socket URL; add safe host-based fallback for production
let SOCKET_URL = import.meta?.env?.VITE_SOCKET_URL;
if (!SOCKET_URL) {
  const host = window.location.host;
  if (host === "chat-application-1-imbt.onrender.com") {
    SOCKET_URL = "https://chat-application-rsxd.onrender.com";
  } else {
    SOCKET_URL = window.location.origin;
  }
}

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  socket: null,
  onlineUsers: [],

  setAuthUser: (userData) => set({ authUser: userData }),

  checkAuth: async () => {
    const maxRetries = 3;
    let retryCount = 0;

    const tryCheckAuth = async () => {
      try {
        console.log(`🔍 Checking auth... (attempt ${retryCount + 1}/${maxRetries})`);
        const res = await axiosInstance.get("/user/check");
        set({ authUser: res.data.user });
        console.log('✅ Auth check successful, connecting socket...');
        get().connectSocketWithRetry();
      } catch (error) {
        retryCount++;
        console.log(`❌ Auth check failed (attempt ${retryCount}/${maxRetries}):`, error.message);

        // Check if it's a 502/503 error (backend sleeping) or network error
        const isBackendSleeping =
          error.response?.status === 502 ||
          error.response?.status === 503 ||
          error.code === 'ERR_NETWORK';

        if (isBackendSleeping && retryCount < maxRetries) {
          const delay = Math.min(5000 * retryCount, 15000); // 5s, 10s, 15s delays
          console.log(`😴 Backend seems to be sleeping. Retrying in ${delay / 1000}s...`);
          setTimeout(tryCheckAuth, delay);
          return;
        }

        console.log("Error checking Auth: ", error);
      }
    };

    try {
      await tryCheckAuth();
    } finally {
      set({ isCheckingAuth: false });
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

    // Enhanced socket configuration for mobile compatibility
    const socket = io(SOCKET_URL, {
      transports: ["websocket", "polling"], // Enable polling fallback for mobile
      withCredentials: true,
      timeout: 30000, // Longer timeout for mobile networks
      forceNew: true, // Force new connection
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 10,
      maxReconnectionAttempts: 10
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

    socket.on("user_connected", (newUser) => {
      console.log("👤 New user connected:", newUser);
      // Option 1: Trigger UI refresh
      window.dispatchEvent(new Event("refreshContacts"));
    });

    socket.on("user_disconnected", ({ userId }) => {
      console.log("🚪 User disconnected:", userId);
      window.dispatchEvent(new Event("refreshContacts"));
    });
  },

  connectSocket: () => {
    get().connectSocketWithRetry()
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
