const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @desc    Get current user profile
// @route   GET /api/users/me
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Don't return password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update user profile info & picture
// @route   PUT /api/users/update
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Update fields if provided
    if (req.body.name) user.name = req.body.name;
    if (req.body.phone) user.phone = req.body.phone;

    // Handle profile picture upload
    if (req.file) {
      user.profilePic = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      profilePic: updatedUser.profilePic,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};
