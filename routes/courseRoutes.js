const express = require('express');
const router = express.Router();
const Course = require('../models/courseModel');

// 1. Get All Courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('student')
      .populate('lecturer');

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// 2. Get Course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('student')
      .populate('lecturer');

    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      data: course
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

// 3. Create Course
router.post('/', async (req, res) => {
  router.post('/add-student', addStudentToCourse);

  try {
    const course = await Course.create(req.body);
    res.status(201).json({
      success: true,
      data: course
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
});

// 4. Update Course

router.put('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,          // return updated course
        runValidators: true // run schema validation
      }
    )
      .populate('student')
      .populate('lecturer');

    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }
    res.status(200).json({
      success: true,
      data: course
    });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        error: 'Invalid ID format'
      });
    }

    res.status(400).json({
      success: false,
      error: err.message
    });
  }
});

// 5. Delete Course

router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully'
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

const{
  addStudentToCourse
} = require('../controllers/courseController');

router.post('/add-student', addStudentToCourse);

module.exports = router;
