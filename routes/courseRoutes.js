const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const Student = require('../models/student');

// 1️ Get All Courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('student')
      .populate('lecturer');

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
});

// 2️ Get Course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('student')
      .populate('lecturer');

    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found',
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: 'Invalid ID',
    });
  }
});

// 3️ Create Course  
router.post('/', async (req, res) => {
  try {
    const { student } = req.body;

    // 1. Create course
    const course = await Course.create(req.body);

    // 2. Push course ID into student.courses[]
    await Student.findByIdAndUpdate(
      student,
      { $push: { courses: course._id } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      data: course,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
});

// 4️ Update Course
router.put('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('student')
      .populate('lecturer');

    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found',
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
});

// 5️ Delete Course 
router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found',
      });
    }

    // remove from student.courses[]
    await Student.findByIdAndUpdate(course.student, {
      $pull: { courses: course._id },
    });

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully',
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;