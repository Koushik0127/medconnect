const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const Appointment = require("../models/Appointment");

// @route   POST /api/appointments
// @desc    Book an appointment
// @access  Private
router.post("/", protect, async (req, res) => {
  try {
    const { patientName, phone, doctor, date, time } = req.body;
    const email = req.user.email; // From decoded JWT

    const newAppointment = new Appointment({
      patientName,
      phone,
      doctor,
      date,
      time,
      email,
    });

    await newAppointment.save();

    res.status(201).json({ message: "Appointment booked successfully" });
  } catch (err) {
    console.error("Appointment booking error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ NEW GET route to fetch appointments for the logged-in patient
// @route   GET /api/appointments
// @desc    Get all appointments for logged-in user
// @access  Private
router.get("/", protect, async (req, res) => {
  try {
    const email = req.user.email;

    const appointments = await Appointment.find({ email }).select(
      "_id doctor date"
    );

    res.json(appointments);
  } catch (err) {
    console.error("Fetch appointments error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
