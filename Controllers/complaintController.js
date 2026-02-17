const Complaint = require("../Models/Complaint");
const sendComplaintEmail = require("../utils/sendComplaintEmail");


// Create Complaint
exports.createComplaint = async (req, res) => {
  try {

    const complaint = await Complaint.create(req.body);

    // Send Email
    await sendComplaintEmail(complaint);

    res.status(201).json({
      success: true,
      message: "Complaint submitted successfully",
      complaint
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// Get All Complaints (Admin Use)
exports.getComplaints = async (req, res) => {
  try {

    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json({ data: { complaints } });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Delete Complaint
exports.deleteComplaint = async (req, res) => {
  try {

    await Complaint.findByIdAndDelete(req.params.id);

    res.json({ message: "Complaint deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
