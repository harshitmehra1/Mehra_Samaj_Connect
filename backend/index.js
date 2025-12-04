require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// HEALTH ROUTE
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend working!', time: new Date() });
});

// IMPORT PROFILE ROUTES (ADD THIS)
const profileRoutes = require('./routes/profileRoutes');

// USE PROFILE ROUTES (ADD THIS)
app.use('/api/profile', profileRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Error:", err);
  });
