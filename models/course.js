const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseId: {
      type: String,
      required: true,
      unique: true
    },

    
    student: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
      },
    

    examName: {
      type: String,
      required: true
    },

    // Optional: per-course grading logic (can be moved later)
    grades: {
      type: String,
      enum: ["A", "B", "C", "D", "F"]
    },

    // One lecturer per course
    lecturer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecturer",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);