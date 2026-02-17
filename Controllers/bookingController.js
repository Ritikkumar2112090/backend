const Booking = require("../models/Booking");
const sendEmail = require("../utils/sendEmail");

// Create Booking
exports.createBooking = async (req, res) => {
  try {
          
    const booking = await Booking.create(req.body);
            
    // Send Emails
    await sendEmail(booking);
                    4
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking
    });

  } catch (error) {

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
    res.json(bookings);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete Booking
exports.deleteBooking = async (req, res) => {
  try {

    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Bookings for Admin (with status)
exports.getAllBookingsAdmin = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    
    // Add status field to each booking if not present
    const bookingsWithStatus = bookings.map(booking => ({
      ...booking.toObject(),
      status: booking.status || 'pending'
    }));
    
    res.json({
      success: true,
      data: {
        bookings: bookingsWithStatus
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
    res.status(500).json({ success: false, message: error.message });
  }
};

// Send Booking Email
exports.sendBookingEmail = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: "Booking not found" 
      });
    }

    // Send confirmation email
    await sendEmail(booking);

    res.json({
      success: true,
      message: "Booking confirmation email sent"
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
