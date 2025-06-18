const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

// ✅ Hardcoded doctor list (keep as-is)
const doctors = [
  { name: "Dr. Aisha Mehra", specialization: "Cardiologist" },
  { name: "Dr. Priyank Sharma", specialization: "Dermatologist" },
  { name: "Dr. Rahul Desai", specialization: "Orthopedic Surgeon" },
  { name: "Dr. Imran Ali", specialization: "Pediatrician" },
  { name: "Dr. Meera Joshi", specialization: "Gynecologist" },
  { name: "Dr. Ramesh Verma", specialization: "Neurologist" },
  { name: "Dr. Nidhi Rao", specialization: "ENT Specialist" },
  { name: "Dr. Manav Kapoor", specialization: "Psychiatrist" },
  { name: "Dr. Kavita Sen", specialization: "General Physician" },
];

// ✅ Route 1 — Returns hardcoded list
router.get("/", (req, res) => {
  res.json(doctors);
});

// ✅ Route 2 — Returns doctor list from MongoDB
router.get("/from-db", async (req, res) => {
  try {
    const doctors = await Doctor.find(); // fetch all from DB
    res.json(doctors);
  } catch (err) {
    console.error("Error fetching doctors:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
