const rateLimitMap = new Map();

/**
 * Simple in-memory rate limiter middleware
 * @param {number} windowMs - Time window in milliseconds
 * @param {number} max - Maximum number of requests per window
 */
const rateLimiter = (windowMs = 60000, max = 3) => {
    return (req, res, next) => {
        const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const now = Date.now();
        
        if (!rateLimitMap.has(ip)) {
            rateLimitMap.set(ip, { count: 1, startTime: now });
            return next();
        }

        const stats = rateLimitMap.get(ip);
        
        if (now - stats.startTime > windowMs) {
            // Reset window
            stats.count = 1;
            stats.startTime = now;
            return next();
        }

        if (stats.count >= max) {
            return res.status(429).json({
                success: false,
                message: "Too many requests. Please try again later."
            });
        }

        stats.count += 1;
        next();
    };
};

module.exports = rateLimiter;
