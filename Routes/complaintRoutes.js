const express = require("express");
const router = express.Router();

const {
  createComplaint,
  getComplaints,
  deleteComplaint
} = require("../controllers/complaintController");

// Public routes
router.post("/", createComplaint);
router.get("/", getComplaints);
router.delete("/:id", deleteComplaint);

// Admin route - same as getComplaints but for admin access
router.get("/admin", getComplaints);

module.exports = router;
