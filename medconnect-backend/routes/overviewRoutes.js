const express = require("express");
const router = express.Router();
const Overview = require("../models/Overview");

// Save overview
router.post("/save", async (req, res) => {
  const {
    email,
    gender,
    dob,
    nextOfKin,
    prevVisit,
    nextVisit,
    allergies,
    files,
  } = req.body;

  try {
    let existing = await Overview.findOne({ email });

    if (existing) {
      existing.gender = gender;
      existing.dob = dob;
      existing.nextOfKin = nextOfKin;
      existing.prevVisit = prevVisit;
      existing.nextVisit = nextVisit;
      existing.allergies = allergies;
      existing.files = files;

      await existing.save();
      return res.status(200).json(existing);
    }

    const newOverview = new Overview({
      email,
      gender,
      dob,
      nextOfKin,
      prevVisit,
      nextVisit,
      allergies,
      files,
    });

    await newOverview.save();
    res.status(201).json(newOverview);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error saving overview" });
  }
});

// Get overview for a specific user
router.get("/:email", async (req, res) => {
  try {
    const overview = await Overview.findOne({ email: req.params.email });

    if (!overview) {
      return res.status(404).json({ message: "No overview found" });
    }

    res.status(200).json(overview);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching overview" });
  }
});

module.exports = router;
