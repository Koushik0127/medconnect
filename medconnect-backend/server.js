const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// ======== MIDDLEWARE ========
app.use(cors());
app.use(express.json());

// Serve static profile pictures and uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ======== ROUTES ========
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const appointmentRoutes = require("./routes/appointment");
const doctorRoutes = require("./routes/doctor");
const contactRoutes = require("./routes/contact");
const overviewRoutes = require("./routes/overviewRoutes");
const timetableRoutes = require("./routes/timetableRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api", uploadRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/overview", overviewRoutes);
app.use("/api/timetable", timetableRoutes);

// ======== OPTIONAL: Seed Doctors If Empty ========
const Doctor = require("./models/Doctor");

const seedDoctorsIfEmpty = async () => {
  const count = await Doctor.countDocuments();
  if (count === 0) {
    await Doctor.insertMany([
      {
        name: "Dr. John Smith",
        specialization: "Cardiology",
        hospital: "City Hospital",
      },
      {
        name: "Dr. Maya Rao",
        specialization: "Dermatology",
        hospital: "Sunrise Clinic",
      },
      {
        name: "Dr. Vikram Singh",
        specialization: "Orthopedics",
        hospital: "Apollo Hospitals",
      },
    ]);
    console.log("Sample doctors added");
  }
};

// ======== DATABASE CONNECTION ========
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/medconnect", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("MongoDB Connected Successfully");

    await seedDoctorsIfEmpty();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" MongoDB connection failed:", err.message);
    process.exit(1);
  });
