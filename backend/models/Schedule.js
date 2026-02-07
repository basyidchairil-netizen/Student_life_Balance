const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  classes: [{
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true
    },
    startTime: {
      type: String,
      required: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    },
    endTime: {
      type: String,
      required: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    },
    subject: {
      type: String,
      required: true,
      trim: true
    }
  }],
  studySessions: [{
    date: {
      type: Date,
      required: true
    },
    startTime: {
      type: String,
      required: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    },
    endTime: {
      type: String,
      required: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    },
    subject: {
      type: String,
      required: true,
      trim: true
    }
  }],
  sleepLogs: [{
    date: {
      type: Date,
      required: true
    },
    bedtime: {
      type: String,
      required: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    },
    wakeTime: {
      type: String,
      required: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    },
    quality: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Schedule', scheduleSchema);
