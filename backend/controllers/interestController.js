const Interest = require('../models/Interest');
const User = require('../models/User');

// Send interest
exports.sendInterest = async (req, res) => {
  try {
    const { fromUserId, toUserId } = req.body;

    if (!fromUserId || !toUserId) {
      return res.status(400).json({ error: "Missing user IDs" });
    }

    const interest = await Interest.create({
      from: fromUserId,
      to: toUserId
    });

    res.json({ success: true, interest });
  } catch (err) {
    console.error("Send interest error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Accept / Reject interest
exports.respondInterest = async (req, res) => {
  try {
    const { interestId, action } = req.body; // accept / reject

    const interest = await Interest.findById(interestId);
    if (!interest) return res.status(404).json({ error: "Interest not found" });

    interest.status = action === "accept" ? "accepted" : "rejected";
    await interest.save();

    res.json({ success: true, interest });
  } catch (err) {
    console.error("Respond interest error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Incoming interests
exports.getIncoming = async (req, res) => {
  try {
    const { userId } = req.query;

    const interests = await Interest.find({ to: userId })
      .populate("from", "name phone city job");

    res.json({ success: true, interests });
  } catch (err) {
    console.error("Incoming interests error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
