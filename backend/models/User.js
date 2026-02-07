const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  university: {
    type: String,
    required: true,
    trim: true
  },
  dormLocation: {
    type: String,
    required: true,
    trim: true
  },
  allowance: {
    type: Number,
    default: 0
  },
  skincareRoutine: {
    faceWash: { type: Boolean, default: false },
    moisturizer: { type: Boolean, default: false },
    sunscreen: { type: Boolean, default: false }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
