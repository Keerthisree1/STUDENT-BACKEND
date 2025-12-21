const express = require('express');
const router = express.Router();
const Lecturer = require('../models/lecturerModel');

// 1. Get All Lecturers
router.get('/', async (req, res) => {
  try {
    const lecturers = await Lecturer.find();
    res.status(200).json({
      success: true,
      count: lecturers.length,
      data: lecturers
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// 2. Get Lecturer by ID
router.get('/:id', async (req, res) => {
  try {
    const lecturer = await Lecturer.findById(req.params.id);

    if (!lecturer) {
      return res.status(404).json({
        success: false,
        error: 'Lecturer not found'
      });
    }

    res.status(200).json({
      success: true,
      data: lecturer
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

// 3. Create Lecturer
router.post('/', async (req, res) => {
  try {
    const lecturer = await Lecturer.create(req.body);
    res.status(201).json({
      success: true,
      data: lecturer
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
});

// 4. Update Lecturer

router.put('/:id', async (req, res) => {
  try {
    const lecturer = await Lecturer.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,          // return updated document
        runValidators: true // run schema validations
      }
    );

    if (!lecturer) {
      return res.status(404).json({
        success: false,
        error: 'Lecturer not found'
      });
    }

    res.status(200).json({
      success: true,
      data: lecturer
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

// 5. Delete Lecturer

router.delete('/:id', async (req, res) => {
  try {
    const lecturer = await Lecturer.findByIdAndDelete(req.params.id);

    if (!lecturer) {
      return res.status(404).json({
        success: false,
        error: 'Lecturer not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Lecturer deleted successfully'
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


module.exports = router;