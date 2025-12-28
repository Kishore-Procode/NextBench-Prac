const express = require("express");
const User = require("../models/user"); // ✅ FIXED PATH
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// 🔐 VERIFY TOKEN & GET USER
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("USER ME ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
