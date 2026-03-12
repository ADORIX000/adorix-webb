const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // 1. Create a Transporter for Zoho
  const transporter = nodemailer.createTransport({
    host: 'smtppro.zoho.com', // For professional/org accounts
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 2. Define Email Content
  const mailOptions = {
    from: process.env.EMAIL_USER, // Must be your Zoho mail
    to: 'info@adorixit.com',      // Where you want to receive it
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
    console.error(error);
    res.status(500).json({ message: 'Failed to send email.' });
  }
});

module.exports = router;