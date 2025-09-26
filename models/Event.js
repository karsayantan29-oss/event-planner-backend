// models/Event.js
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },       // Storing as string for simplicity
  time: { type: String, required: true },
  location: { type: String },
  attendees: { type: Number, default: 0 },
  status: { type: String, enum: ['planning', 'confirmed', 'cancelled'], default: 'planning' }
});

module.exports = mongoose.model('Event', EventSchema);