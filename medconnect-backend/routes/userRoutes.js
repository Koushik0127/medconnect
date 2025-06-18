const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const path = require("path");
const User = require("../models/User");

const router = express.Router();

// ✅ JWT verification middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ✅ Multer configuration for profile picture upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

/**
 * ✅ GET /api/user/profile
 * Fetch user profile
 */
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Fetch profile error:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch profile", error: err.message });
  }
});

/**
 * ✅ PUT /api/user/profile
 * Update profile info & profile picture
 */
router.put(
  "/profile",
  verifyToken,
  upload.single("profilePic"),
  async (req, res) => {
    try {
      const updates = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      };

      if (req.file) {
        updates.profilePic = req.file.filename;
      }

      const user = await User.findByIdAndUpdate(req.userId, updates, {
        new: true,
      }).select("-password");

      if (!user) return res.status(404).json({ message: "User not found" });

      res.json({
        message: "Profile updated successfully",
        updatedUser: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          profilePic: user.profilePic,
        },
      });
    } catch (err) {
      console.error("Update profile error:", err);
      res
        .status(500)
        .json({ message: "Profile update failed", error: err.message });
    }
  }
);

/**
 * ✅ GET /api/user/doctors
 * Fetch all doctors
 */
router.get("/doctors", async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select(
      "name _id email specialization"
    );

    if (!doctors || doctors.length === 0) {
      return res.status(404).json({ message: "No doctors found" });
    }

    res.status(200).json(doctors);
  } catch (err) {
    console.error("Fetch doctors error:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch doctors", error: err.message });
  }
});

module.exports = router;
