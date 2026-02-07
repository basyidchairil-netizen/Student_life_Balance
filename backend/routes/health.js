const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const auth = require('../middleware/auth');
const {
  getHealthData,
  addWaterIntake,
  addAcneStatus,
  addMealLog,
  updateSkincare,
  getRecommendations,
  getWelcome
} = require('../controllers/healthController');

// @route   GET /api/health
// @desc    Get user's health data
// @access  Private
router.get('/', auth, getHealthData);

// @route   POST /api/health/water
// @desc    Add water intake
// @access  Private
router.post(
  '/water',
  [
    auth,
    body('amount', 'Amount must be a positive number').isFloat({ min: 0 })
  ],
  addWaterIntake
);

// @route   POST /api/health/acne
// @desc    Add acne status
// @access  Private
router.post(
  '/acne',
  [
    auth,
    body('status', 'Status is required').isIn(['Clear', 'Mild', 'Moderate', 'Severe']),
    body('notes', 'Notes are optional').optional().isString(),
    body('tags', 'Tags must be an array').optional().isArray()
  ],
  addAcneStatus
);

// @route   POST /api/health/meal
// @desc    Add meal log
// @access  Private
router.post(
  '/meal',
  [
    auth,
    body('mealType', 'Meal type is required').isIn(['Breakfast', 'Lunch', 'Dinner', 'Snack']),
    body('foods', 'Foods must be an array').isArray({ min: 1 }),
    body('foods.*.name', 'Food name is required').not().isEmpty(),
    body('foods.*.isAcneSafe', 'isAcneSafe must be boolean').optional().isBoolean(),
    body('notes', 'Notes are optional').optional().isString()
  ],
  addMealLog
);

// @route   GET /api/health/recommendations
// @desc    Get acne-safe food recommendations
// @access  Private
router.get('/recommendations', auth, getRecommendations);

// @route   POST /api/health/skincare
// @desc    Update skincare routine
// @access  Private
router.post(
  '/skincare',
  [
    auth,
    body('faceWash', 'Face wash is optional').optional().isString(),
    body('moisturizer', 'Moisturizer is optional').optional().isString(),
    body('sunscreen', 'Sunscreen is optional').optional().isString()
  ],
  updateSkincare
);

// @route   GET /api/health/welcome
// @desc    Welcome endpoint
// @access  Private
router.get('/welcome', auth, getWelcome);

module.exports = router;
