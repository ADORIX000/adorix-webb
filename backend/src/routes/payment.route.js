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
router.post('/notify', async (req, res) => {
    try {
        const {
            merchant_id,
            order_id,
            payment_id,
            payhere_amount,
            payhere_currency,
            status_code,
            md5sig
        } = req.body;

        const isValid = payhereService.verifyWebhookSignature(
            merchant_id,
            order_id,
            payhere_amount,
            payhere_currency,
            status_code,
            md5sig
        );

        if (!isValid) {
            console.error(`Invalid PayHere webhook signature for order: ${order_id}`);
            return res.status(400).send('Invalid signature');
        }

        let paymentStatus = 'PENDING';
        if (status_code === '2') {
            paymentStatus = 'PAID';
        } else if (status_code === '0') {
            paymentStatus = 'PENDING';
        } else if (status_code === '-1') {
            paymentStatus = 'CANCELLED';
        } else if (status_code === '-2') {
            paymentStatus = 'FAILED';
        } else if (status_code === '-3') {
            paymentStatus = 'FAILED'; // Charged back
        }

        const { error } = await supabase
            .from('payments')
            .update({
                payhere_payment_id: payment_id,
                status: paymentStatus,
                raw_callback: req.body
            })
            .eq('order_id', order_id);

        if (error) {
            console.error('Failed to update payment status:', error);
            return res.status(500).send('Database error');
        }

        return res.status(200).send('OK');
    } catch (err) {
        console.error('Webhook processing error:', err);
        return res.status(500).send('Internal server error');
    }
});

module.exports = router;
