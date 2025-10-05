import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const socketAuthMiddleware = async (socket, next) => {
    try {
        const cookieHeader = socket.handshake.headers.cookie;

        if (!cookieHeader) {
            return next(new Error("No cookies found"));
        }

        const token = cookieHeader
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

        console.log(token)
        if (!token) {
            return next(new Error("No token found"));
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return next(new Error("Invalid token"));
        }
        console.log(decoded)

        const user = await User.findById(decoded.id);
        if (!user) {
            return next(new Error("User not found"));
        }
        console.log(user)

        socket.user = user;
        socket.userId = user._id;

        next(); // allow connection
    } catch (error) {
        console.error("Socket Auth Error:", error);
        next(new Error("Authentication error"));
    }
}
