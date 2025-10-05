import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    image: {
        type: String,
    },
    text: {
        type: String,
    }
}, { timestamps: true })
const Message = mongoose.model("Message", messageSchema)
export default Message
