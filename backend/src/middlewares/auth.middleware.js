const userService = require('../services/user.service');

/**
 * Mock Authentication Middleware
 * Validates token in Authorization header: Mock-token-<id>
 */
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('mock-token-')) {
            return res.status(401).json({ error: 'No token provided or invalid token format' });
        }

        const userId = authHeader.split('-')[2];
        if (!userId) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        const user = await userService.findUserById(userId);
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Attach user to request object
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = authMiddleware;
