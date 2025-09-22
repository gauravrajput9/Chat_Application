import express from "express"
import { upload } from "../utils/multer.js"
import { loginUser, logoutUser, signup } from "../controller/auth.controller.js"
import { isAuthenticated } from "../utils/AuthCheck.js"

const authRouter = express.Router()

authRouter.post("/signup", upload.single("profilePic"), signup)
authRouter.post("/login", loginUser)
authRouter.get("/logout",isAuthenticated, logoutUser)

export default authRouter