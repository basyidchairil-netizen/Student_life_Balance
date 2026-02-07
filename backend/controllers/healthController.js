const { validationResult } = require('express-validator');

const Health = require('../models/Health');
const logger = require('../logger');

// @desc    Get user's health data
// @route   GET /api/health
// @access  Private
const getHealthData = async (req, res) => {
  try {
    let health = await Health.findOne({ user: req.user.id });
    if (!health) {
      health = new Health({ user: req.user.id });
      await health.save();
    }
    res.json(health);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add water intake
// @route   POST /api/health/water
// @access  Private
const addWaterIntake = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { amount } = req.body;

  try {
    let health = await Health.findOne({ user: req.user.id });
    if (!health) {
      health = new Health({ user: req.user.id });
    }

    health.waterIntake.push({
      date: new Date(),
      amount
    });

    await health.save();
    res.json(health);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add acne status
// @route   POST /api/health/acne
// @access  Private
const addAcneStatus = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { status, notes, tags } = req.body;

  try {
    let health = await Health.findOne({ user: req.user.id });
    if (!health) {
      health = new Health({ user: req.user.id });
    }

    health.acneStatus.push({
      date: new Date(),
      status,
      notes,
      tags
    });

    await health.save();
    res.json(health);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add meal log
// @route   POST /api/health/meal
// @access  Private
const addMealLog = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { mealType, foods, notes } = req.body;

  try {
    let health = await Health.findOne({ user: req.user.id });
    if (!health) {
      health = new Health({ user: req.user.id });
    }

    health.mealLogs.push({
      date: new Date(),
      mealType,
      foods,
      notes
    });

    await health.save();
    res.json(health);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update skincare routine
// @route   POST /api/health/skincare
// @access  Private
const updateSkincare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { faceWash, moisturizer, sunscreen } = req.body;

  try {
    let health = await Health.findOne({ user: req.user.id });
    if (!health) {
      health = new Health({ user: req.user.id });
    }

    health.skincareRoutine = {
      faceWash: faceWash !== undefined ? faceWash : health.skincareRoutine.faceWash,
      moisturizer: moisturizer !== undefined ? moisturizer : health.skincareRoutine.moisturizer,
      sunscreen: sunscreen !== undefined ? sunscreen : health.skincareRoutine.sunscreen
    };

    await health.save();
    res.json(health);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get acne-safe food recommendations
// @route   GET /api/health/recommendations
// @access  Private
const getRecommendations = async (req, res) => {
  try {
    const recommendations = [
      {
        name: 'Gado-gado',
        description: 'Low-glycemic vegetable-based dish',
        benefits: 'Rich in fiber, supports skin health'
      },
      {
        name: 'Soto Bening',
        description: 'Herbal chicken soup',
        benefits: 'Anti-inflammatory properties'
      },
      {
        name: 'Ayam Bakar',
        description: 'Grilled chicken',
        benefits: 'Lean protein, healthy fats'
      },
      {
        name: 'Sayur Asem',
        description: 'Vegetable soup with tamarind',
        benefits: 'Vitamin-rich, hydrating'
      },
      {
        name: 'Tempeh',
        description: 'Fermented soybean',
        benefits: 'Probiotics, plant-based protein'
      },
      {
        name: 'Nasi Merah',
        description: 'Brown rice',
        benefits: 'Complex carbs, sustained energy'
      }
    ];

    res.json({ recommendations });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Welcome endpoint
// @route   GET /api/health/welcome
// @access  Private
const getWelcome = async (req, res) => {
  try {
    logger.info(`Request received: ${req.method} ${req.path}`);
    res.json({ message: 'Welcome to the Health API Service!' });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getHealthData,
  addWaterIntake,
  addAcneStatus,
  addMealLog,
  updateSkincare,
  getRecommendations,
  getWelcome
};
