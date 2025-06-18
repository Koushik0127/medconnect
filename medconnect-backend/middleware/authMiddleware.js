// backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user from DB (optional but better for verifying user still exists)
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    // Attach user to request
    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    next();
  } catch (error) {
    console.error("🔐 Token verification failed:", error.message);
    res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};

module.exports = { protect };
