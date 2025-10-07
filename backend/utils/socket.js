// import http from "http";
// import { Server } from "socket.io";
// import express from "express";
// import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

// const app = express();
// const server = http.createServer(app);

// const allowedOrigins = [
//   process.env.CLIENT_URL?.replace(/\/$/, ""),
//   "https://chat-application-1-imbt.onrender.com",
//   "https://chat-application-rsxd.onrender.com",
//   "http://localhost:5173",
//   "http://localhost:3000",
// ].filter(Boolean);

// const io = new Server(server, {
//   cors: {
//     origin: (origin, callback) => {
//       if (!origin) return callback(null, true);
//       const normalized = origin.replace(/\/$/, "");
//       if (allowedOrigins.includes(normalized)) return callback(null, true);
//       return callback(new Error("Not allowed by CORS"));
//     },
//     credentials: true,
//   },
//   transports: ["websocket", "polling"],
// });

// // Auth middleware
// io.use(socketAuthMiddleware);

// // Map to store online user sockets
// const userSocketsMap = {};

// // Getter for receiver socket ID
// export const getReceiverSocketId = (userId) => {
//   if (!userId) return undefined;
//   const id = userSocketsMap[userId.toString()];
//   if (!id) {
//     console.log("No socket found for user:", userId);
//   }
//   return id;
// };

// // Socket connection
// io.on("connection", (socket) => {
//   if (!socket.user?._id) return;
//   console.log(socket.user?._id)

//   const userId = socket.user._id.toString();
//   console.log("Current userSocketsMap:", userSocketsMap);

//   userSocketsMap[userId] = socket.id;

//   console.log("A user connected:", socket.user.fullName, "ID:", userId, "socket:", socket.id);

//   // Broadcast online users
//   io.emit("getAllOnlineUsers", Object.keys(userSocketsMap));

//   // 👇 Notify all other users
//   socket.broadcast.emit("user_connected", {
//     userId,
//     fullName: socket.user.fullName,
//     profilePic: socket.user.profilePic,
//   });

//   socket.on("disconnect", () => {
//     console.log(`❌ User disconnected: ${userId}`);
//     onlineUsers.delete(userId);
//     socket.broadcast.emit("user_disconnected", { userId });
//   });
// });

// export { server, io, app };


import http from "http";
import { Server } from "socket.io";
import express from "express";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  process.env.CLIENT_URL?.replace(/\/$/, ""),
  "https://chat-application-1-imbt.onrender.com",
  "https://chat-application-rsxd.onrender.com",
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean);

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const normalized = origin.replace(/\/$/, "");
      if (allowedOrigins.includes(normalized)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

io.use(socketAuthMiddleware);

// Map to store online user sockets
const userSocketsMap = {}; // { userId: socketId }

export const getReceiverSocketId = (userId) => {
  if (!userId) return undefined;
  return userSocketsMap[userId.toString()];
};

// --- Socket Connection Logic ---
io.on("connection", (socket) => {
  if (!socket.user?._id) return;

  const userId = socket.user._id.toString();
  const userInfo = {
    userId,
    fullName: socket.user.fullName,
    profilePic: socket.user.profilePic,
  };

  userSocketsMap[userId] = socket.id;
  console.log(`✅ User connected: ${userInfo.fullName} (${userId})`);

  // 🔥 Notify all clients (so they refresh contact list)
  io.emit("getAllOnlineUsers", Object.keys(userSocketsMap));

  // 🔥 Notify all other clients specifically that a new user connected
  socket.broadcast.emit("user_connected", userInfo);

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${userInfo.fullName} (${userId})`);
    delete userSocketsMap[userId];
    
    // Update everyone’s contact list
    io.emit("getAllOnlineUsers", Object.keys(userSocketsMap));

    // Notify others that a user disconnected
    socket.broadcast.emit("user_disconnected", { userId });
  });
});

export { server, io, app };

