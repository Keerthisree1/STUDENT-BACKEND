const express = require('express');
const router = express.Router();
const Student = require('../models/studentModel');

// 1. Get All Students  (GET /api/students)
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// 2. Get Student by ID (GET /api/students/:id)
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        error: 'Invalid ID format'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// 3. Create Student (POST /api/students)
router.post('/', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({
      success: true,
      data: student
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
});

module.exports = router;