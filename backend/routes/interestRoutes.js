const express = require('express');
const router = express.Router();
const { sendInterest, respondInterest, getIncoming } = require('../controllers/interestController');

// Send interest
router.post('/send', sendInterest);

// Accept / Reject interest
router.post('/respond', respondInterest);

// Incoming interests for a user
router.get('/incoming', getIncoming);

module.exports = router;
