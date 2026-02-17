const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    customer_name: {
      type: String,
      required: true
    },

    customer_email: {
      type: String,
      required: true
    },

    customer_phone: {
      type: String,
      required: true
    },

    complaint_type: {
      type: String,
      default: "Inquiry"
    },

    description: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);
