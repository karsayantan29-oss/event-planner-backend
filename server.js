require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const eventsRoute = require('./routes/events');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/events', eventsRoute);

// Debug: check if .env is being read
console.log("MONGO_URI from .env:", process.env.MONGO_URI);


// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: "OK", db: mongoose.connection.readyState === 1 ? "connected" : "disconnected" });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });