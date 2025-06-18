const mongoose = require("mongoose");

const timeSlotSchema = new mongoose.Schema({
  doctor: {
    type: String,
    required: true,
    unique: true,
  },
  slots: {
    type: [String], // e.g., ["9:00 AM", "10:30 AM"]
    default: [],
  },
});

module.exports = mongoose.model("TimeSlot", timeSlotSchema);
