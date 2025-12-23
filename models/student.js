// models/Student.js
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    // Personal Info
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ],
    
    student: {
        type: String, 
        required: [true, 'Please add a student ID'],
        unique: true,
        trim: true,
    },
    department: {
        type: String,
        required: true,
       
    },
    // Marks (Simple Example)
    totalMarks: {
        type: Number,
        default: 0,
        min: 0,
    },
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Student', StudentSchema);