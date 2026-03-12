import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();

    // 1. Configure the Zoho SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtppro.zoho.com', // Using Pro as requested, can fallback to smtp.zoho.com
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: 'info@adorixit.com',
        pass: process.env.EMAIL_PASS, // Use app-specific password from .env
      },
    });

    // 2. Define Email Content
    const mailOptions = {
      from: `"Adorix Web Form" <info@adorixit.com>`,
      to: 'info@adorixit.com',
      replyTo: email,
      subject: `[Contact Form] ${subject}: from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #6366f1;">New message from Adorix Contact Form</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    };

    // 3. Send the Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Nodemailer Error:', error);
    return NextResponse.json(
      { message: 'Failed to send email.', error: error.message },
      { status: 500 }
    );
  }
}
