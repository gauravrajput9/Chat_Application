import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { generateToken } from "../utils/jwt.js";
import { sendWelcomeEmail } from "../emails/EmailHandler.js";

export const signup = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds

        let profilePicUrl = null;

        if (req.file) {
            const cloudinaryRes = await uploadToCloudinary(req.file.path);
            console.log(cloudinaryRes)
            profilePicUrl = cloudinaryRes.url;
        }

        const newUser = await User.create({
            email,
            password: hashedPassword,
            fullName,
            profilePic: profilePicUrl,
        });

        try {
          await sendWelcomeEmail(newUser.email, newUser.fullName, process.env.CLIENT_URL)
        } catch (error) {
          console.log("email sending error from signup endpoint", error.message)
        }

        res.status(201).json({
            message: "User created successfully, and Email Sent Successfully",
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            },
        });
    } catch (error) {
        console.log("SignUp error:", error.message);
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        message: "User with this email does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(existingUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: existingUser._id,
        fullName: existingUser.fullName,
        email: existingUser.email,
        profilePic: existingUser.profilePic,
      },
    });
  } catch (error) {
    console.log("Login Error:", error.message);
    res.status(500).json({
      message: error.message || "Internal Server error",
    });
  }
};


export const logoutUser = async(req, res) =>{
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    });

    return res.status(201).json({
      message: "User Logged Out successfully"
    })

  } catch (error) {
    console.log("Logout Controller Error: ", error.message)
    return res.status(500).json({
      message: "Internal Server Error"
    })
  }
}


