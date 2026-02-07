const { validationResult } = require('express-validator');

const Schedule = require('../models/Schedule');

// @desc    Get user's schedule
// @route   GET /api/schedule
// @access  Private
const getSchedule = async (req, res) => {
  try {
    let schedule = await Schedule.findOne({ user: req.user.id });
    if (!schedule) {
      schedule = new Schedule({ user: req.user.id });
      await schedule.save();
    }
    res.json(schedule);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add class to schedule
// @route   POST /api/schedule/class
// @access  Private
const addClass = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { day, startTime, endTime, subject } = req.body;

  try {
    let schedule = await Schedule.findOne({ user: req.user.id });
    if (!schedule) {
      schedule = new Schedule({ user: req.user.id });
    }

    schedule.classes.push({ day, startTime, endTime, subject });
    await schedule.save();
    res.json(schedule);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add study session
// @route   POST /api/schedule/study
// @access  Private
const addStudySession = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { date, startTime, endTime, subject } = req.body;

  try {
    let schedule = await Schedule.findOne({ user: req.user.id });
    if (!schedule) {
      schedule = new Schedule({ user: req.user.id });
    }

    schedule.studySessions.push({ date: new Date(date), startTime, endTime, subject });
    await schedule.save();
    res.json(schedule);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add sleep log
// @route   POST /api/schedule/sleep
// @access  Private
const addSleepLog = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { date, bedtime, wakeTime, quality } = req.body;

  try {
    let schedule = await Schedule.findOne({ user: req.user.id });
    if (!schedule) {
      schedule = new Schedule({ user: req.user.id });
    }

    schedule.sleepLogs.push({ date: new Date(date), bedtime, wakeTime, quality });
    await schedule.save();
    res.json(schedule);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Sync schedule and check for conflicts
// @route   POST /api/schedule/sync
// @access  Private
const syncSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findOne({ user: req.user.id });
    if (!schedule) {
      return res.json({ conflicts: [], recommendations: [] });
    }

    // Check for class conflicts
    const conflicts = [];
    const classTimes = {};

    schedule.classes.forEach(cls => {
      const key = `${cls.day}-${cls.startTime}`;
      if (classTimes[key]) {
        conflicts.push({
          type: 'class',
          message: `Conflict on ${cls.day} at ${cls.startTime}: ${classTimes[key]} and ${cls.subject}`
        });
      } else {
        classTimes[key] = cls.subject;
      }
    });

    // Generate recommendations
    const recommendations = {
      sleep: '22:00 - 06:00',
      study: '08:00 - 12:00',
      meal: '12:00 - 13:00',
      exercise: '17:00 - 18:00'
    };

    res.json({ conflicts, recommendations });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getSchedule,
  addClass,
  addStudySession,
  addSleepLog,
  syncSchedule
};
