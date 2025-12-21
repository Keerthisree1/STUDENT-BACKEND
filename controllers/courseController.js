const Course = require('../models/courseModel');
const Student = require('../models/studentModel');

// GET all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('students')
      .populate('lecturer');

    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD course
exports.createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ ADD STUDENT TO COURSE 
exports.addStudentToCourse = async (req, res) => {
  try {
    const { courseId, studentId } = req.body;
    const course = await Course.findById(courseId);
    const student = await Student.findById(studentId);

    if (!course || !student) {
      return res.status(404).json({ message: 'Course or Student not found' });
    }


 // Add student to course
    await Course.findByIdAndUpdate(
      courseId,
      { $addToSet: { students: studentId } } // prevents duplicates
    );
     // Add course to student
    await Student.findByIdAndUpdate(
      studentId,
      { $addToSet: { courses: courseId } }
    );
     res.status(200).json({
      message: 'Student added to course successfully'
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
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