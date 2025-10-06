import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import Message from "../models/message.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { getReceiverSocketId, io } from "../utils/socket.js";


export const getAllContacts = async (req, res) => {
    try {
        const loggedInUserId = req.user.id;

        if (!mongoose.Types.ObjectId.isValid(loggedInUserId)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        const contacts = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        if (!contacts || contacts.length === 0) {
            return res.status(404).json({ message: "No contacts found" });
        }

        res.status(200).json({
            message: "Contacts found successfully",
            users: contacts,
        });
    } catch (error) {
        console.error("Fetching all contacts error:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};


export const getAllMessages = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id: messageToSendId } = req.params;

        const messages = await Message.find({
            $or: [
                { senderId: userId, receiverId: messageToSendId },
                { senderId: messageToSendId, receiverId: userId },
            ],
        });

        res.status(200).json({
            message: "Messages fetched successfully",
            messages,
        });
    } catch (error) {
        console.error("Getting messages error:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};


export const sendMessage = async (req, res) => {
    try {
        const { text } = req.body;
        const image = req.file ? req.file.path : null;
        const { id: receiverId } = req.params;
        const senderId = req.user.id;

        let imageUrl;
        if (image) {
            const cloudinaryRes = await uploadToCloudinary(image);
            imageUrl = cloudinaryRes.url;
        }

        const newMessage = await Message.create({
            receiverId,
            senderId,
            image: imageUrl,
            text,
        });

        // Get socket IDs for both sender and receiver
        const receiverSocketId = getReceiverSocketId(receiverId);
        const senderSocketId = getReceiverSocketId(senderId);
        
        console.log('Receiver socket ID:', receiverSocketId);
        console.log('Sender socket ID:', senderSocketId);

        // Emit to receiver if online
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
            console.log('✅ Message sent to receiver');
        }
        
        // Also emit to sender to confirm message was sent
        if(senderSocketId){
            io.to(senderSocketId).emit("newMessage", newMessage);
            console.log('✅ Message confirmation sent to sender');
        }

        res.status(201).json({
            message: "Message sent successfully",
            newMessage,
        });
    } catch (error) {
        console.error("Message sending Error:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

export const getChatParteners = async (req, res) => {
    try {
        const loggedInUserId = req.user.id;
        console.log("Getting chat partners for user:", loggedInUserId);

        const messages = await Message.find({
            $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
        });
        
        console.log("Found messages:", messages.length);

        const chatPartenerIds = [
            ...new Set(
                messages
                    .map((msg) => {
                        if (msg.senderId.toString() === loggedInUserId.toString()) {
                            return msg.receiverId.toString();
                        } else if (msg.receiverId.toString() === loggedInUserId.toString()) {
                            return msg.senderId.toString();
                        }
                        return null; // This shouldn't happen given our query, but safety check
                    })
                    .filter(id => id !== null && id !== loggedInUserId.toString()) // Remove nulls and logged-in user
            ),
        ];
        
        console.log("Chat partner IDs:", chatPartenerIds);

        if (chatPartenerIds.length === 0) {
            return res.status(404).json({ message: "No chat partners found" });
        }

        const chatParteners = await User.find({
            _id: { $in: chatPartenerIds },
        }).select("-password");

        res.status(200).json({ chatParteners });
    } catch (error) {
        console.error("Chat Partener error:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};
