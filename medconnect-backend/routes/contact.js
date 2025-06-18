const express = require("express");
const router = express.Router();
const ContactMessage = require("../models/ContactMessage");

// @route   POST /api/contact
// @desc    Submit a contact form message
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save();

    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Contact form error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
