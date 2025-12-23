const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// 1️ Get All Students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().populate('courses');

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
});

// 2️ Get Student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('courses');

    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found',
      });
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: 'Invalid ID',
    });
  }
});

// 3️ Create Student
router.post('/', async (req, res) => {
  try {
    const student = await Student.create(req.body);

    res.status(201).json({
      success: true,
      data: student,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;