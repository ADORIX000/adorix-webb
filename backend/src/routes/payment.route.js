const express = require('express');
const router = express.Router();
const payhereService = require('../services/payhere.service');
const supabase = require('../lib/supabase');

/**
 * @route POST /api/payments/create
 * @desc Initialize a payment, create an order record, and return checkout payload
 */
router.post('/create', async (req, res) => {
    try {
        const { user_id, amount, item_type, item_id, customer_name, customer_email } = req.body;

        if (!user_id || !amount || !customer_name || !customer_email) {
            return res.status(400).json({ 
                success: false, 
                error: 'Missing required initialization fields: user_id, amount, customer_name, or customer_email.' 
            });
        }

        const currency = 'LKR';
        const order_id = payhereService.generateOrderId();

        const { error } = await supabase
            .from('payments')
            .insert({
                order_id,
                user_id,
                amount,
                currency,
                status: 'PENDING',
                provider: 'PAYHERE',
                item_type: item_type || 'GENERAL',
                item_id: item_id || null,
                customer_name,
                customer_email
            });

        if (error) {
            console.error('Database insertion failed:', error);
            return res.status(500).json({ success: false, error: 'Failed to create payment record.' });
        }

        const payload = payhereService.buildCheckoutPayload(
            order_id,
            amount,
            currency,
            item_type || 'Adorix Payment',
            customer_name,
            customer_email
        );

        return res.status(200).json({
            success: true,
            order_id,
            checkoutUrl: payhereService.getCheckoutUrl(),
            payload
        });

    } catch (err) {
        console.error('Payment creation error:', err);
        return res.status(500).json({ success: false, error: 'Internal server error while initializing payment.' });
    }
});

/**
 * @route POST /api/payments/notify
 * @desc Webhook endpoint for PayHere server-to-server notifications
 */
router.post('/notify', (req, res) => {
    // Starter scaffold for webhook implementation
    // Future validation: Once signature is verified, transition the row status to 'PAID'
    res.status(200).send('Webhook endpoint prepared.');
});

module.exports = router;
