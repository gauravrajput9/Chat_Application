import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);


        const user = await User.findById(decodedToken.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "Unauthorized" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("AuthMiddleware Error:", error.message);
        return res.status(400).json({
            message: error.message || "Internal Server Error",
        });
    }
};
