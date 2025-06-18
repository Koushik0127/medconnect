const Overview = require("../models/Overview");

const saveOverviewData = async (req, res) => {
  const { email, gender, dob, nextOfKin, prevVisit, nextVisit, allergies } =
    req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const existing = await Overview.findOne({ email });

    if (existing) {
      existing.gender = gender;
      existing.dob = dob;
      existing.nextOfKin = nextOfKin;
      existing.prevVisit = prevVisit;
      existing.nextVisit = nextVisit;
      existing.allergies = allergies;
      await existing.save();
      return res.json({ message: "Updated successfully" });
    } else {
      const newOverview = new Overview({
        email,
        gender,
        dob,
        nextOfKin,
        prevVisit,
        nextVisit,
        allergies,
      });
      await newOverview.save();
      return res.json({ message: "Saved successfully" });
    }
  } catch (err) {
    console.error("Save Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { saveOverviewData };
