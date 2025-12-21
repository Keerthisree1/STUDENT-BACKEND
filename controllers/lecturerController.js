const Lecturer = require('../models/lecturerModel');

// GET all lecturers
exports.getLecturers = async (req, res) => {
  try {
    const lecturers = await Lecturer.find();
    res.status(200).json(lecturers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD lecturer
exports.createLecturer = async (req, res) => {
  try {
    const lecturer = new Lecturer(req.body);
    const savedLecturer = await lecturer.save();
    res.status(201).json(savedLecturer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE lecturer
exports.deleteLecturer = async (req, res) => {
  try {
    const lecturer = await Lecturer.findByIdAndDelete(req.params.id);

    if (!lecturer) {
      return res.status(404).json({ message: 'Lecturer not found' });
    }

    res.status(200).json({ message: 'Lecturer deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};