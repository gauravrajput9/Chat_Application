import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const socketAuthMiddleware = async (socket, next) => {
    try {
        const cookieHeader = socket.handshake.headers.cookie;

        if (!cookieHeader) {
            console.warn(
                "⚠️ Socket handshake received no cookies. " +
                "This usually happens on mobile browsers (Safari/iOS) or cross-origin requests. " +
                "Check cookie flags (SameSite=None, Secure=true) and that connectSocket() is called after login."
            );
            return next(new Error("No cookies found"));
        }

        const token = cookieHeader
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

        if (!token) {
            console.warn(
                "⚠️ Socket handshake cookies found, but no 'token' present. " +
                "Ensure login response set the cookie correctly."
            );
            return next(new Error("No token found"));
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            console.warn("⚠️ Invalid JWT token in socket handshake:", err.message);
            return next(new Error("Invalid token"));
        }

        const user = await User.findById(decoded.id);
        if (!user) {
            console.warn("⚠️ User not found for socket JWT token.");
            return next(new Error("User not found"));
        }

        socket.user = user;
        socket.userId = user._id;

        next(); // allow connection
    } catch (error) {
        console.error("Socket Auth Error:", error.message);
        next(new Error("Authentication error"));
    }
};
