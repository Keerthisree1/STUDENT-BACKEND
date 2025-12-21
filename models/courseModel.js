const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseId: {
      type: String,
      required: true,
      unique: true
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",   // studentModel
      required: true
    },

    examId: {
      type: String,
      required: true
    },

    examName: {
      type: String,
      required: true
    },

    grades: {
      type: String,
      enum: ["A", "B", "C", "D", "F"],
      required: true
    },

    lecturerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecturer",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);