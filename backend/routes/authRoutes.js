const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const { registerUser, loginUser } = require('../controllers/authController');

// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
router.post(
  '/register',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    body('name', 'Name is required').not().isEmpty(),
    body('university', 'University is required').not().isEmpty(),
    body('dormLocation', 'Dorm location is required').not().isEmpty()
  ],
  registerUser
);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists()
  ],
  loginUser
);

module.exports = router;
