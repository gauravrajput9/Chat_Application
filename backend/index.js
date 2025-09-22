import express from "express"
import dotenv from "dotenv"
import connectDB from "./database/Db.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"

dotenv.config()

const app = express()
app.use(cors({
    origin: "*"
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

connectDB()

app.get("/", (req, res) =>{
    res.send("Hello")
})

app.listen(3000, () =>{
    console.log("Server Running on Port : 3000")
})
