import http from "http";
import { Server } from "socket.io"
import express from "express"
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: [
            process.env.CLIENT_URL,
            "https://chat-application-1-imbt.onrender.com", // frontend
            "http://localhost:5173",
            "http://localhost:3000"
        ],
        credentials: true
    }
});


io.use(socketAuthMiddleware)



// for storing the online users
const userSocketsMap = {}


export const getReceiverSocketId = (userId) => {
    return userSocketsMap[userId]
}

io.on("connection", (socket) => {
    console.log("A user Connected", socket.user.fullName)

    const userID = socket.userId
    userSocketsMap[userID] = socket.id

    io.emit("getAllOnlineUsers", Object.keys(userSocketsMap))

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.user.fullName)
        delete userSocketsMap[userID]
        io.emit("getAllOnlineUsers", Object.keys(userSocketsMap))

    })
})


export { server, io, app }