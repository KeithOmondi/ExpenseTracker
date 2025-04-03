require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoute = require("./routes/incomeRoute");
const path = require("path");

const app = express();

// Middleware
app.use(express.json()); // JSON parser should come first
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Connect to Database
connectDB()
  .then(() => console.log("Database Connected!"))
  .catch((err) => console.error("Database connection failed:", err));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoute);

//serve upload folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
