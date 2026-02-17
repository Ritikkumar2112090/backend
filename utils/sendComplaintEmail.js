const nodemailer = require("nodemailer");

const sendComplaintEmail = async (complaint) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // ---------- ADMIN MAIL ----------
  const adminMessage = `
New Complaint Received 📩

Name: ${complaint.customer_name}
Email: ${complaint.customer_email}
Phone: ${complaint.customer_phone}
Type: ${complaint.complaint_type}

Description:
${complaint.description}
`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: "New Customer Complain ",
    text: adminMessage
  });


  // ---------- USER CONFIRMATION ----------
  const userMessage = `
Dear ${complaint.customer_name},

We are truly sorry to hear about your concern regarding ${complaint.complaint_type}.  
Your feedback is very important to us, and we deeply respect the time you took to share it.  

Our team will carefully review your complaint and reach out to you within 24 hours to assist you further.  

Thank you for bringing this to our attention. We appreciate your patience and understanding.  

Sincerely,  
Team Vrindavan Saathi

🙏 Thank you for contacting Vrindavan Saathi.
`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: complaint.customer_email,
    subject: "We Received Your Complain ",
    text: userMessage
  });

};

module.exports = sendComplaintEmail;
