const TimeSlot = require("../models/TimeSlot");

// GET: fetch time slots for a doctor
exports.getTimeSlots = async (req, res) => {
  try {
    const { doctorName } = req.params;

    let record = await TimeSlot.findOne({ doctor: doctorName });
    if (!record) {
      // Initialize empty slots if not found
      record = await TimeSlot.create({ doctor: doctorName, slots: [] });
    }

    res.json(record);
  } catch (err) {
    console.error("Error fetching slots:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// POST: update time slots for a doctor
exports.saveTimeSlots = async (req, res) => {
  try {
    const { doctorName } = req.params;
    const { slots } = req.body;

    let record = await TimeSlot.findOneAndUpdate(
      { doctor: doctorName },
      { slots },
      { new: true, upsert: true }
    );

    res.json({ message: "Slots updated successfully", slots: record.slots });
  } catch (err) {
    console.error("Error saving slots:", err);
    res.status(500).json({ error: "Server error" });
  }
};
