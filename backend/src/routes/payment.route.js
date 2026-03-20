const express = require('express');
const router = express.Router();

/**
 * @route POST /api/payments/notify
 * @desc Webhook endpoint for PayHere server-to-server notifications
 */
router.post('/notify', (req, res) => {
    // Starter scaffold for webhook implementation
    res.status(200).send('Webhook endpoint prepared.');
});

module.exports = router;
