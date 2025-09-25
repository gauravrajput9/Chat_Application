import express from "express"
import { getAllContacts, getAllMessages, getChatParteners, sendMessage } from "../controller/message.controller.js"
import { isAuthenticated } from "../middleware/AuthCheck.js"
import { upload } from "../utils/multer.js"
import { arcjetProtection } from "../middleware/arcjet.middleware.js"

const messageRouter = express.Router()
// messageRouter.use(arcjetProtection,isAuthenticated)

messageRouter.get("/getAllContacts", getAllContacts)
messageRouter.get("/chats", getChatParteners)
messageRouter.get("/:id", getAllMessages)
messageRouter.post("/send/:id",upload.single("image"), sendMessage)


export default messageRouter