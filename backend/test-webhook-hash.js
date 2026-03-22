const crypto = require('crypto');
require('dotenv').config();

const merchantId = process.env.PAYHERE_MERCHANT_ID;
const secret = process.env.PAYHERE_MERCHANT_SECRET;

if (!merchantId || !secret) {
    console.error('ERROR: Missing PAYHERE_MERCHANT_ID or PAYHERE_MERCHANT_SECRET in .env');
    process.exit(1);
}

// Replace these with your real pending payment values
const orderId = 'ORD-1774079187655-3824';
const payhereAmount = '1000.00';
const payhereCurrency = 'LKR';
const statusCode = '2';

const hashedSecret = crypto.createHash('md5').update(secret).digest('hex').toUpperCase();
const hashString = `${merchantId}${orderId}${payhereAmount}${payhereCurrency}${statusCode}${hashedSecret}`;
const md5sig = crypto.createHash('md5').update(hashString).digest('hex').toUpperCase();

console.log('merchant_id:', merchantId);
console.log('order_id:', orderId);
console.log('payhere_amount:', payhereAmount);
console.log('payhere_currency:', payhereCurrency);
console.log('status_code:', statusCode);
console.log('md5sig:', md5sig);