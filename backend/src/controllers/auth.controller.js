const userService = require('../services/user.service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Temporary in-memory store for OTPs (Map<email, { otp, expiresAt }>)
const otpStore = new Map();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '7d'; // Token valid for 7 days

/**
 * Authentication Controller - Supabase + JWT + bcrypt
 */
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        // Check if user already exists
        const existingUser = await userService.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'An account with this email already exists. Please sign in.' });
        }

        // Create user (password hashed inside userService)
        const user = await userService.createUser({ name, email, password });

        // Sign a real JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        res.status(201).json({
            message: 'Account created successfully',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Signup error:', error.message);
        res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find user in Supabase
        const user = await userService.findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'USER_NOT_FOUND' });
        }

        // Compare hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Incorrect password. Please try again.' });
        }

        // Sign a real JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
};

const me = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        res.status(200).json({
            user: {
                id: req.user.id,
                name: req.user.name,
                email: req.user.email
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'Email is required.' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        // Store the OTP to expire in 5 minutes
        otpStore.set(email, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });

        const transporter = nodemailer.createTransport({
            host: 'smtp.zoho.com', 
            port: 587,
            secure: false, // use STARTTLS
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Adorix Security" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Your Adorix Security Code',
            html: `<h3>Your Security Code</h3><p>Your one-time password is <strong>${otp}</strong>. It expires in 5 minutes.</p>`,
        });

        res.status(200).json({ message: 'OTP sent successfully!' });
    } catch (error) {
        console.error("OTP Send Error:", error);
        res.status(500).json({ error: 'Failed to send OTP email.' });
    }
};

const verifyOtp = async (req, res) => {
    try {
        const { email, code } = req.body;
        if (!email || !code) {
            return res.status(400).json({ error: 'Email and OTP code are required.' });
        }

        const record = otpStore.get(email);
        if (!record) {
            return res.status(400).json({ error: 'No OTP requested for this email. Please try resending.' });
        }
        
        if (Date.now() > record.expiresAt) {
            otpStore.delete(email); // Clean up expired OTP immediately
            return res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
        }

        if (record.otp !== code) {
            return res.status(400).json({ error: 'Invalid OTP code. Please try again.' });
        }

        // Successfully verified, consume/remove the OTP
        otpStore.delete(email);
        res.status(200).json({ message: 'OTP verified successfully.' });
    } catch (error) {
        console.error("OTP Verify Error:", error);
        res.status(500).json({ error: 'Internal verification failed.' });
    }
};

module.exports = { signup, login, me, sendOtp, verifyOtp };