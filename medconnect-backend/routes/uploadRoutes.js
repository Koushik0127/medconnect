const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const User = require("../models/User");
const router = express.Router();

// Set storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "./uploads";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

// Update user profile picture
router.post(
  "/upload-profile-pic",
  upload.single("profilePic"),
  async (req, res) => {
    try {
      const userId = req.body.userId;
      const profilePicPath = req.file ? `/uploads/${req.file.filename}` : "";

      if (!userId || !profilePicPath) {
        return res.status(400).json({ message: "Invalid upload data" });
      }

      const user = await User.findByIdAndUpdate(
        userId,
        { profilePic: profilePicPath },
        { new: true }
      );

      if (!user) return res.status(404).json({ message: "User not found" });

      res.json({ message: "Profile picture updated", user });
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({ message: "Upload failed", error: err.message });
    }
  }
);

module.exports = router;
