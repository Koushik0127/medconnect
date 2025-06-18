const Appointment = require("../models/Appointment");
const jwt = require("jsonwebtoken");

// 📌 Book a new appointment
exports.bookAppointment = async (req, res) => {
  try {
    // ✅ Extract and verify token
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // ✅ Add user ID to the appointment
    const appointment = await Appointment.create({
      ...req.body,
      user: userId,
    });

    res.status(201).json(appointment);
  } catch (err) {
    console.error("Error booking appointment:", err.message);
    res.status(500).json({ error: "Failed to book appointment" });
  }
};

// 📌 Get appointments for logged-in user only
exports.getAppointments = async (req, res) => {
  try {
    // ✅ Extract and verify token
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // ✅ Fetch appointments only for the logged-in user
    const appointments = await Appointment.find({ user: userId }).sort({ date: -1 });

    res.json(appointments);
  } catch (err) {
    console.error("Error fetching appointments:", err.message);
    res.status(401).json({ error: "Unauthorized or invalid token" });
  }
};
