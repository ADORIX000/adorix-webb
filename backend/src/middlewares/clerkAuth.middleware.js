const { createClerkClient } = require('@clerk/backend');
const userService = require('../services/user.service');

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

/**
 * Clerk Authentication Middleware
 * Verifies Bearer token, extracts Clerk User ID, and resolves Supabase profile
 * SOURCING ROLES FROM CLERK METADATA
 */
const clerkAuthMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token provided. Please sign in.' });
        }

        const token = authHeader.split(' ')[1];

        // 1. Verify the Clerk JWT
        let decoded;
        try {
            decoded = await clerkClient.verifyToken(token);
        } catch (err) {
            console.error('Clerk Token Verification Error:', err.message);
            return res.status(401).json({ error: 'Invalid or expired session. Please sign in again.' });
        }

        const externalId = decoded.sub;

        // 2. Fetch Clerk User to get the most recent metadata (roles)
        // Note: For production performance, consider adding 'role' to Clerk JWT claims
        let clerkUser;
        try {
            clerkUser = await clerkClient.users.getUser(externalId);
        } catch (err) {
            console.error('Error fetching Clerk user:', err.message);
            return res.status(401).json({ error: 'User mapping failed. Please sign in again.' });
        }

        const email = clerkUser.emailAddresses[0]?.emailAddress;
        const name = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'New User';
        const role = clerkUser.publicMetadata?.role || 'CUSTOMER';

        // 3. Sync with Supabase (JIT Provisioning or Role Update)
        const user = await userService.findOrCreateUserByExternalId(externalId, { name, email, role });

        // 4. Attach user and explicit role to request
        req.user = user;
        req.user.role = role; // Ensure role from Clerk is primary
        
        next();
    } catch (error) {
        console.error('Clerk Auth Middleware Error:', error.message);
        res.status(500).json({ error: 'Internal server error during authentication.' });
    }
};

module.exports = clerkAuthMiddleware;
