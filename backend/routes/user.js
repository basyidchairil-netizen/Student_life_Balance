const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const auth = require('../middleware/auth');
const { getProfile, updateProfile } = require('../controllers/userController');

// @route   GET /api/user/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, getProfile);

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private
router.put(
  '/profile',
  [
    auth,
    body('name', 'Name is required').optional().not().isEmpty(),
    body('university', 'University is required').optional().not().isEmpty(),
    body('dormLocation', 'Dorm location is required').optional().not().isEmpty(),
    body('allowance', 'Allowance must be a number').optional().isNumeric()
  ],
  updateProfile
);

module.exports = router;
