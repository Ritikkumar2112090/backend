const express = require("express");
const router = express.Router();

const {
  createBooking,
  getBookings,
  deleteBooking,
  getAllBookingsAdmin,
  updateBookingStatus,
  sendBookingEmail
} = require("../controllers/bookingController");

// Public routes
router.post("/", createBooking);
router.get("/", getBookings);
router.delete("/:id", deleteBooking);

// Admin routes
router.get("/admin", getAllBookingsAdmin);
router.put("/:id/status", updateBookingStatus);
router.post("/:id/send-email", sendBookingEmail);

module.exports = router;
