const Course = require('../models/course');
const Student = require('../models/student');

// GET all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      // .populate('studentId')    
      // .populate('lecturerId');  

    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD course
exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);

    const updatedStudent = await Student.findByIdAndUpdate(
      req.body.student,
      { $push: { courses: course._id } },
      { new: true }
    );

    
    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found while linking course"
      });
    }

    res.status(201).json({
      success: true,
      data: course,
      linkedStudent: updatedStudent
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    await Student.findByIdAndUpdate(
      course.student,
      { $pull: { courses: course._id } }
    );

    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};