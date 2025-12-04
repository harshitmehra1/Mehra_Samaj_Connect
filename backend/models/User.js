const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },   // Firebase phone number
  name: { type: String },
  gender: { type: String },
  dob: { type: Date },
  city: { type: String },
  education: { type: String },
  job: { type: String },
  gotra: { type: String },
  about: { type: String },
  photos: [String],  // array of photo URLs
  verified: { type: Boolean, default: false }, // admin approves later
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
