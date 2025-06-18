const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ Register Controller
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // 🔍 Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    // 🔐 Hash password
    const hashed = await bcrypt.hash(password, 10);

    // 🧑 Create user
    const user = await User.create({
      name,
      email,
      password: hashed,
      phone,
    });

    // 🎫 Create token including email
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Return token + user
    res.status(201).json({ token, user });
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Login Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔍 Check user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    // 🔐 Check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });

    // 🎫 Generate token with id + email
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Return token + user
    res.json({ token, user });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ msg: "Login error" });
  }
};

// ✅ Get Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(" Profile fetch error:", err.message);
    res.status(500).json({ msg: "Failed to get profile" });
  }
};
