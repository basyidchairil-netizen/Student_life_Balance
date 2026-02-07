const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const auth = require('../middleware/auth');
const {
  getSchedule,
  addClass,
  addStudySession,
  addSleepLog,
  syncSchedule
} = require('../controllers/scheduleController');

// @route   GET /api/schedule
// @desc    Get user's schedule
// @access  Private
router.get('/', auth, getSchedule);

// @route   POST /api/schedule/class
// @desc    Add class to schedule
// @access  Private
router.post(
  '/class',
  [
    auth,
    body('day', 'Day is required').isIn(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
    body('startTime', 'Start time is required in HH:MM format').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    body('endTime', 'End time is required in HH:MM format').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    body('subject', 'Subject is required').not().isEmpty()
  ],
  addClass
);

// @route   POST /api/schedule/study
// @desc    Add study session
// @access  Private
router.post(
  '/study',
  [
    auth,
    body('date', 'Date is required').isISO8601(),
    body('startTime', 'Start time is required in HH:MM format').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    body('endTime', 'End time is required in HH:MM format').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    body('subject', 'Subject is required').not().isEmpty()
  ],
  addStudySession
);

// @route   POST /api/schedule/sleep
// @desc    Add sleep log
// @access  Private
router.post(
  '/sleep',
  [
    auth,
    body('date', 'Date is required').isISO8601(),
    body('bedtime', 'Bedtime is required in HH:MM format').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    body('wakeTime', 'Wake time is required in HH:MM format').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    body('quality', 'Quality must be between 1 and 5').isInt({ min: 1, max: 5 })
  ],
  addSleepLog
);

// @route   POST /api/schedule/sync
// @desc    Sync schedule and check for conflicts
// @access  Private
router.post('/sync', auth, syncSchedule);

module.exports = router;
