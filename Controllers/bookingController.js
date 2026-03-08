const Booking = require("../Models/Booking");
const sendEmail = require("../utils/sendEmail");

// Create Booking
exports.createBooking = async (req, res) => {
  try {
    console.log("Booking request received");

    // Save booking to database
    const booking = await Booking.create(req.body);

    console.log("Booking saved:", booking._id);

    // Send response FIRST (this fixes the loading issue)
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking
    });

    // Send email in background (non-blocking)
    sendEmail(booking)
      .then(() => {
        console.log("Email sent successfully");
      })
      .catch((error) => {
        console.error("Email failed:", error.message);
      });

  } catch (error) {
    console.error("Booking error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Get All Bookings
exports.getBookings = async (req, res) => {
  try {

    const bookings = await Booking.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: bookings
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// Delete Booking
exports.deleteBooking = async (req, res) => {
  try {

    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    res.json({
      success: true,
      message: "Booking deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// Get All Bookings for Admin
exports.getAllBookingsAdmin = async (req, res) => {
  try {

    const bookings = await Booking.find().sort({ createdAt: -1 });

    const bookingsWithStatus = bookings.map((booking) => ({
      ...booking.toObject(),
      status: booking.status || "pending"
    }));

    res.json({
      success: true,
      data: {
        bookings: bookingsWithStatus
      }
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// Update Booking Status
exports.updateBookingStatus = async (req, res) => {
  try {

    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    res.json({
      success: true,
      message: "Booking status updated",
      data: { booking }
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// Send Booking Email manually
exports.sendBookingEmail = async (req, res) => {
  try {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    await sendEmail(booking);

    res.json({
      success: true,
      message: "Booking confirmation email sent"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
