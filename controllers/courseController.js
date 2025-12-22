const Course = require('../models/course');
const Student = require('../models/student');

// GET all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('studentId')    
      .populate('lecturerId');  

    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD course
exports.createCourse = async (req, res) => {
  try {
    // req.body MUST contain studentId
    const course = new Course(req.body);
    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};