const express = require("express");
const mongoose = require("mongoose");

const app = express();

/* ===============================
   MIDDLEWARE
================================ */
app.use(express.json()); // VERY IMPORTANT for Postman JSON

/* ===============================
   MONGODB CONNECTION
================================ */
mongoose
  .connect("mongodb://127.0.0.1:27017/studentdb")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });

/* ===============================
   ROUTES
================================ */
const studentRoutes = require("./routes/studentRoutes");
app.use("/students", studentRoutes);

/* ===============================
   SERVER START
================================ */
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
