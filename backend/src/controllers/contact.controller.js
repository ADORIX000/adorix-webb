const nodemailer = require('nodemailer');

exports.sendContactMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  // 1. Create a Transporter for Zoho
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com', 
    port: 587,
    secure: false, // use STARTTLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 2. Define Email Content
  const mailOptions = {
    from: `"Adorix Contact" <${process.env.EMAIL_USER}>`, // Explicitly define name and email
    to: 'info@adorixit.com',
    replyTo: email, // Allow replying directly to the sender
    subject: `New Contact Form: ${subject}`,
    html: `
      <h3>New Message from Adorix Website</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  // 3. Send the Email
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error("Nodemailer Error:", error);
    res.status(500).json({ message: 'Failed to send email.' });
  }
};
