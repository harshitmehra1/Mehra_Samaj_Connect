const User = require('../models/User');

// create or update profile
exports.updateProfile = async (req, res) => {
  try {
    const { phone } = req.body;  
    if (!phone) {
      return res.status(400).json({ error: "Phone is required" });
    }

    // everything else in the body is optional
    const updateData = { ...req.body };

    const user = await User.findOneAndUpdate(
      { phone }, 
      updateData,
      { new: true, upsert: true }
    );

    res.json({ success: true, user });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
