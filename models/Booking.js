const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    tour_package: {
      type: String,
      required: true
    },

    travel_date: {
      type: String,
      required: true
    },

    travelers: {
      type: Number,
      required: true
    },

    pickup_location: {
      type: String,
      required: true
    },

    special_requests: {
      type: String
    },

    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
