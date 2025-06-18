const mongoose = require("mongoose");

const overviewSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  gender: String,
  dob: String,
  nextOfKin: String,
  prevVisit: String,
  nextVisit: String,
  allergies: String,
  files: [String],
});

module.exports = mongoose.model("Overview", overviewSchema);
