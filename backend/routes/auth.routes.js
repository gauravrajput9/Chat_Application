import express from "express"
import { upload } from "../utils/multer.js"
import { loginUser, logoutUser, signup } from "../controller/auth.controller.js"
import { isAuthenticated } from "../middleware/AuthCheck.js"
import {arcjetProtection} from "../middleware/arcjet.middleware.js"

const authRouter = express.Router()
// authRouter.use(arcjetProtection)

authRouter.post("/signup", upload.single("profilePic"), signup)
authRouter.post("/login", loginUser)
authRouter.get("/logout",isAuthenticated, logoutUser)


export default authRouter