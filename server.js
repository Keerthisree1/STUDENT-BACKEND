const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// Routes
const students = require('./routes/studentRoutes');
app.use('/api/students', students);

const lecturers = require('./routes/lecturerRoutes');
app.use('/api/lecturers', lecturers);

const courses = require('./routes/courseRoutes');
app.use('/api/courses',courses);

app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => 
 console.log(`Server running on port ${PORT}`));