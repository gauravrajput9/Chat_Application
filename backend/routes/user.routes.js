import express from "express"
import { isAuthenticated } from "../middleware/AuthCheck.js"
import { updateProfile } from "../controller/user.controller.js"
import { upload } from "../utils/multer.js"

const userRouter = express.Router()

userRouter.post("/update-profile",upload.single("profilePic"), isAuthenticated,updateProfile)
userRouter.get("/check", isAuthenticated, (req, res) => res.status(201).json({
    user: req.user,
    message: "User Found"
}))

export default userRouter