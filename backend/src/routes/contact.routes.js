const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller");
const rateLimiter = require("../middlewares/rateLimiter");

// Apply rate limiting specifically to the contact endpoint
// Max 3 requests per minute per IP
router.post("/", rateLimiter(60000, 3), contactController.sendContactMessage);

module.exports = router;
