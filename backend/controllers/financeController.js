const { validationResult } = require('express-validator');

const Finance = require('../models/Finance');

// @desc    Get user's finance data
// @route   GET /api/finance
// @access  Private
const getFinanceData = async (req, res) => {
  try {
    let finance = await Finance.findOne({ user: req.user.id });
    if (!finance) {
      finance = new Finance({ user: req.user.id });
      await finance.save();
    }
    res.json(finance);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add expense
// @route   POST /api/finance/expense
// @access  Private
const addExpense = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { amount, category, description } = req.body;

  try {
    let finance = await Finance.findOne({ user: req.user.id });
    if (!finance) {
      finance = new Finance({ user: req.user.id });
    }

    finance.expenses.push({
      date: new Date(),
      amount,
      category,
      description
    });

    await finance.save();
    res.json(finance);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update monthly allowance
// @route   PUT /api/finance/allowance
// @access  Private
const updateAllowance = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { allowance } = req.body;

  try {
    let finance = await Finance.findOne({ user: req.user.id });
    if (!finance) {
      finance = new Finance({ user: req.user.id });
    }

    finance.monthlyAllowance = allowance;
    await finance.save();
    res.json(finance);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get daily budget limit
// @route   GET /api/finance/daily-limit
// @access  Private
const getDailyLimit = async (req, res) => {
  try {
    const finance = await Finance.findOne({ user: req.user.id });
    if (!finance) {
      return res.json({ dailyLimit: 0, remaining: 0 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayExpenses = finance.expenses.filter(expense =>
      expense.date >= today && expense.date < tomorrow
    );

    const totalTodayExpenses = todayExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const dailyLimit = finance.monthlyAllowance / 30;
    const remaining = dailyLimit - totalTodayExpenses;

    res.json({
      dailyLimit: dailyLimit.toFixed(2),
      remaining: Math.max(0, remaining).toFixed(2),
      spentToday: totalTodayExpenses.toFixed(2)
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add savings goal
// @route   POST /api/finance/savings-goal
// @access  Private
const addSavingsGoal = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, targetAmount, deadline } = req.body;

  try {
    let finance = await Finance.findOne({ user: req.user.id });
    if (!finance) {
      finance = new Finance({ user: req.user.id });
    }

    finance.savingsGoals.push({
      name,
      targetAmount,
      deadline: new Date(deadline)
    });

    await finance.save();
    res.json(finance);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update savings for a goal
// @route   PUT /api/finance/savings/:goalId
// @access  Private
const updateSavings = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { amount } = req.body;
  const goalId = req.params.goalId;

  try {
    const finance = await Finance.findOne({ user: req.user.id });
    if (!finance) {
      return res.status(404).json({ message: 'Finance data not found' });
    }

    const goal = finance.savingsGoals.id(goalId);
    if (!goal) {
      return res.status(404).json({ message: 'Savings goal not found' });
    }

    goal.currentAmount += amount;
    await finance.save();
    res.json(finance);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update budget (monthly allowance)
// @route   POST /api/finance/update-budget
// @access  Private
const updateBudget = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { monthlyAllowance } = req.body;

  try {
    let finance = await Finance.findOne({ user: req.user.id });
    if (!finance) {
      finance = new Finance({ user: req.user.id });
    }

    finance.monthlyAllowance = monthlyAllowance;
    await finance.save();
    res.json(finance);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getFinanceData,
  addExpense,
  updateAllowance,
  getDailyLimit,
  addSavingsGoal,
  updateSavings,
  updateBudget
};
