import multer from "multer";
import path from "path";
import fs from "fs/promises";

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder where files will be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
export const upload = multer({ storage });






export const deleteFile = async (filePath) => {
  try {
    const absolutePath = path.resolve(filePath);
    await fs.unlink(absolutePath);
    console.log("File deleted:", absolutePath);
  } catch (err) {
    console.error("Error deleting file:", err.message);
  }
};

