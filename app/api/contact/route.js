import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Define CORS headers to allow requests from your dashboard
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://dashboard.adorixit.com',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function POST(request) {
  try {
    // 0. Check for environment variables to avoid server crashes (Server 500 Fix)
    if (!process.env.EMAIL_PASS) {
      console.error('Critical Error: EMAIL_PASS is not defined in environment variables.');
      return NextResponse.json(
        { message: 'Server configuration error. Please contact administrator.' },
        { status: 500, headers: corsHeaders }
      );
    }

    const { name, email, subject, message } = await request.json();

    // 1. Configure the Zoho SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtppro.zoho.com', // Using Pro as requested
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

    // Return success with CORS headers attached
    return NextResponse.json(
      { message: 'Email sent successfully!' }, 
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Nodemailer Error:', error);
    // Return error with CORS headers attached
    return NextResponse.json(
      { message: 'Failed to send email.', error: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

// 4. Handle the OPTIONS "preflight" request from the browser
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}