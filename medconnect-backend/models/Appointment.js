const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  phone: { type: String, required: true },
  doctor: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  email: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
