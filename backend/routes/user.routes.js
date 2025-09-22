import express from "express"
import { isAuthenticated } from "../utils/AuthCheck.js"
import { updateProfile } from "../controller/user.controller.js"
import { upload } from "../utils/multer.js"

const userRouter = express.Router()

userRouter.get("/update-profile",upload.single("profilePic"), isAuthenticated,updateProfile)

export default userRouter