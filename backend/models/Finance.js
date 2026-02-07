const mongoose = require('mongoose');

const financeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  monthlyAllowance: {
    type: Number,
    required: true,
    default: 0
  },
  expenses: [{
    date: {
      type: Date,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      enum: ['Food', 'Transport', 'Entertainment', 'Study Materials', 'Health', 'Other'],
      required: true
    },
    description: {
      type: String,
      trim: true
    }
  }],
  savingsGoals: [{
    name: {
      type: String,
      required: true
    },
    targetAmount: {
      type: Number,
      required: true
    },
    currentAmount: {
      type: Number,
      default: 0
    },
    deadline: {
      type: Date,
      required: true
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Finance', financeSchema);
