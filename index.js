const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());

// CORS: allow your Vercel frontend explicitly
app.use(cors({
  origin: "https://vrindavansaathi.vercel.app", // <-- frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/complaints", require("./routes/complaintRoutes"));
app.use("/api/photos", require("./routes/photoRoutes"));

// Test route
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
