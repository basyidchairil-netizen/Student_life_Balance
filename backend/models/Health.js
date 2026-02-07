const mongoose = require('mongoose');

const healthSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  waterIntake: [{
    date: {
      type: Date,
      required: true
    },
    amount: {
      type: Number, // in liters
      required: true
    }
  }],
  acneStatus: [{
    date: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['Clear', 'Mild', 'Moderate', 'Severe'],
      required: true
    },
    notes: {
      type: String,
      trim: true
    },
    tags: [{
      type: String,
      trim: true
    }]
  }],
  mealLogs: [{
    date: {
      type: Date,
      required: true
    },
    mealType: {
      type: String,
      enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
      required: true
    },
    foods: [{
      name: {
        type: String,
        required: true
      },
      isAcneSafe: {
        type: Boolean,
        default: true
      }
    }],
    notes: {
      type: String,
      trim: true
    }
  }],
  skincareRoutine: {
    faceWash: {
      type: Boolean,
      default: false
    },
    moisturizer: {
      type: Boolean,
      default: false
    },
    sunscreen: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Health', healthSchema);
