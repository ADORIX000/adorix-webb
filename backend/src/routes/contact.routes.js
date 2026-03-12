const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller");

// POST /api/contact
router.post("/", contactController.sendContactMessage);

module.exports = router;
