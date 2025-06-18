const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

// ✅ GET all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ GET doctors by search keyword (name or specialization)
router.get("/search/:keyword", async (req, res) => {
  const { keyword } = req.params;
  try {
    const regex = new RegExp(keyword, "i"); // case-insensitive match
    const doctors = await Doctor.find({
      $or: [{ name: regex }, { specialization: regex }],
    });
    res.json(doctors);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
