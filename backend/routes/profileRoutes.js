const express = require('express');
const router = express.Router();
const { updateProfile } = require('../controllers/profileController');

// create/update profile
router.post('/update', updateProfile);

// get profile list
router.get('/list', async (req, res) => {
  try {
    const profiles = await require('../models/User').find().sort({ createdAt: -1 });
    res.json({ success: true, profiles });
  } catch (err) {
    console.error("List profiles error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
