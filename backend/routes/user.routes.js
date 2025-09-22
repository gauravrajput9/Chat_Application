import express from "express"
import { isAuthenticated } from "../utils/AuthCheck.js"
import { updateProfile } from "../controller/user.controller.js"

const userRouter = express.Router()

userRouter.get("/update-profile", isAuthenticated,updateProfile)

export default userRouter