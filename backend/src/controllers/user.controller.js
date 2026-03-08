const userService = require('../services/user.service');

/**
 * User Controller
 */
const getMe = async (req, res) => {
    try {
        // req.user is populated by the authMiddleware
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Return the user data (excluding sensitive info if any, though auth controller does the same currently)
        res.status(200).json({
            user: {
                id: req.user.id,
                name: req.user.name,
                email: req.user.email,
                company: req.user.company,
                phone: req.user.phone
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateMe = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { name, company, phone } = req.body;

        // Ensure at least one field is provided for update
        if (name === undefined && company === undefined && phone === undefined) {
            return res.status(400).json({ error: 'Please provide name, company, or phone to update' });
        }

        const updatedUser = await userService.updateUser(req.user.id, { name, company, phone });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            message: 'Profile updated successfully',
            user: {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                company: updatedUser.company,
                phone: updatedUser.phone
            }
        });

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getMe,
    updateMe
};
