const nodemailer = require("nodemailer");

const sendEmail = async (booking) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // ---------------- ADMIN EMAIL ----------------
  const adminMessage = `
New Booking Received :-

📋 Booking Details  

👤 Name: ${booking.name}  

📧 Email: ${booking.email}  

📱 Phone: ${booking.phone}  

🎒 Package: ${booking.tour_package}  

📅 Travel Date: ${booking.travel_date}  

👥 Travelers: ${booking.travelers}  

🚖 Pickup Location: ${booking.pickup_location}  

✨ Special Requests: ${booking.special_requests || "None"}  
`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: "New Booking Request",
    text: adminMessage
  });

  // ---------------- USER CONFIRMATION EMAIL ----------------
  const userMessage = `
Dear ${booking.name},

🙏 Thank you for booking with Vrindavan Saathi.

Your booking request has been received successfully.

📦 Package: ${booking.tour_package}
📅 Travel Date: ${booking.travel_date}
👨‍👩‍👧 Travelers: ${booking.travelers}
📍 Pickup Location: ${booking.pickup_location}

Our team will contact you within 24 hours.

Regards,
Vrindavan Saathi Team
`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: booking.email,
    subject: "Booking Confirmation - Vrindavan Saathi",
    text: userMessage
  });

};

module.exports = sendEmail;
