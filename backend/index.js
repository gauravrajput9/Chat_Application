import express, { urlencoded } from "express"
import dotenv from "dotenv"
import connectDB from "./database/Db.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
import messageRouter from "./routes/messages.routes.js"
import { app, server } from "./utils/socket.js"

dotenv.config()
const client = process.env.CLIENT_URL

app.use(cors({
  origin: [              
    process.env.CLIENT_URL   
  ],
  credentials: true
}));

app.use(express.json({ limit: "10mb" }))
app.use(urlencoded({ extended: true, limit: "10mb" }))
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/message", messageRouter)





app.get("/", (req, res) => {
  res.send("Hello")
})

server.listen(process.env.PORT, async () => {
  await connectDB()
  console.log("Server Running on Port : 3000")
})
