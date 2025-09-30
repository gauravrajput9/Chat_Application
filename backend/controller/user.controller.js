import { User } from "../models/user.model.js";
import {
   deleteFromCloudinary,
   uploadToCloudinary,
} from "../utils/cloudinary.js";
import { deleteFile } from "../utils/multer.js";

export const updateProfile = async (req, res) => {
   try {
      const { email, fullName } = req.body;
      const profilePic = req.file ? req.file.path : null;
      
      const existingUser = await User.findById(req.user.id);

      if (!existingUser) {
         return res.status(404).json({ message: "User not found" });
      }
      if (existingUser.profilePicPublicId) {
         await deleteFromCloudinary(existingUser.profilePicPublicId);
      }

      let cloudinaryRes = null;
      if (profilePic) {
         cloudinaryRes = await uploadToCloudinary(profilePic);
         deleteFile(profilePic); // delete local file
      }

      const updatedUser = await User.findByIdAndUpdate(
         req.user.id,
         {
            fullName,
            email,
            ...(cloudinaryRes && {
               profilePic: cloudinaryRes.url,
               profilePicPublicId: cloudinaryRes.public_id, // keep full public_id
            }),
         },
         { new: true }
      ).select("-password");

      return res.status(200).json({
         message: "Profile Updated Successfully",
         user: {
            id: updatedUser._id,
            fullName: updatedUser.fullName,
            email: updatedUser.email,
            profilePic: updatedUser.profilePic,
            profilePicPublicId:
               updatedUser.profilePicPublicId?.split("/").pop() || null, // strip only for response
         },
      });
   } catch (error) {
      console.log("Update profile controller error", error);
      return res.status(500).json({ message: "Internal Server Error" });
   }
};
