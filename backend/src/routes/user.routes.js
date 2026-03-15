const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const clerkAuthMiddleware = require('../middlewares/clerkAuth.middleware');

// Protected routes (require valid Clerk session token)
router.get('/me', clerkAuthMiddleware, userController.getMe);
router.put('/me', clerkAuthMiddleware, userController.updateMe);

module.exports = router;
