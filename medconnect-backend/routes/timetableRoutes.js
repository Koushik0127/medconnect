const express = require("express");
const router = express.Router();
const timetableController = require("../controllers/timetableController");

router.get("/:doctorName", timetableController.getTimeSlots);
router.post("/:doctorName", timetableController.saveTimeSlots);

module.exports = router;
