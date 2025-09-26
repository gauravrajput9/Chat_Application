import express, { urlencoded } from "express"
import dotenv from "dotenv"
import connectDB from "./database/Db.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
import messageRouter from "./routes/messages.routes.js"

dotenv.config()

const app = express()
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true,               // allow cookies/headers
}));

app.use(express.json())
app.use(cookieParser())
app.use(urlencoded({extended: true}))

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/message", messageRouter)



app.get("/", (req, res) =>{
    res.send("Hello")
})

app.listen(3000, async() =>{
    await connectDB()
    console.log("Server Running on Port : 3000")
})
