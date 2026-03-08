const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * JWT Authentication Middleware
 * Validates Bearer token in Authorization header
 */
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token provided. Please sign in.' });
        }

        const token = authHeader.split(' ')[1];

        // Verify the JWT
        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Session expired. Please sign in again.' });
            }
            return res.status(401).json({ error: 'Invalid token. Please sign in again.' });
        }

        // Fetch the user from Supabase using userId from token
        const user = await userService.findUserById(decoded.userId);
        if (!user) {
            return res.status(401).json({ error: 'User not found. Please sign in again.' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = authMiddleware;
