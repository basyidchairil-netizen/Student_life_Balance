const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const auth = require('../middleware/auth');
const {
  getFinanceData,
  addExpense,
  updateAllowance,
  getDailyLimit,
  addSavingsGoal,
  updateSavings,
  updateBudget
} = require('../controllers/financeController');

// @route   GET /api/finance
// @desc    Get user's finance data
// @access  Private
router.get('/', auth, getFinanceData);

// @route   POST /api/finance/expense
// @desc    Add expense
// @access  Private
router.post(
  '/expense',
  [
    auth,
    body('amount', 'Amount is required and must be positive').isFloat({ min: 0 }),
    body('category', 'Category is required').not().isEmpty(),
    body('description', 'Description is required').optional().isString()
  ],
  addExpense
);

// @route   PUT /api/finance/allowance
// @desc    Update monthly allowance
// @access  Private
router.put(
  '/allowance',
  [
    auth,
    body('allowance', 'Allowance must be a positive number').isFloat({ min: 0 })
  ],
  updateAllowance
);

// @route   GET /api/finance/daily-limit
// @desc    Get daily budget limit
// @access  Private
router.get('/daily-limit', auth, getDailyLimit);

// @route   POST /api/finance/savings-goal
// @desc    Add savings goal
// @access  Private
router.post(
  '/savings-goal',
  [
    auth,
    body('name', 'Name is required').not().isEmpty(),
    body('targetAmount', 'Target amount must be positive').isFloat({ min: 0 }),
    body('deadline', 'Deadline is required').isISO8601()
  ],
  addSavingsGoal
);

// @route   PUT /api/finance/savings/:goalId
// @desc    Update savings for a goal
// @access  Private
router.put(
  '/savings/:goalId',
  [
    auth,
    body('amount', 'Amount must be positive').isFloat({ min: 0 })
  ],
  updateSavings
);

// @route   POST /api/finance/update-budget
// @desc    Update budget (monthly allowance)
// @access  Private
router.post(
  '/update-budget',
  [
    auth,
    body('monthlyAllowance', 'Monthly allowance must be a positive number').isFloat({ min: 0 })
  ],
  updateBudget
);

module.exports = router;
