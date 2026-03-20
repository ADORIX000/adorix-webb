const crypto = require('crypto');

/**
 * PayHere Payment Service
 * 
 * Handles interactions with the PayHere API, including secure hash generation
 * and payment verification for sandbox and production environments.
 */
class PayHereService {
    constructor() {
        this.merchantId = process.env.PAYHERE_MERCHANT_ID;
        this.secret = process.env.PAYHERE_MERCHANT_SECRET;
        this.isSandbox = process.env.PAYHERE_SANDBOX === 'true';
    }

    generateOrderId() {
        const timestamp = Date.now();
        const rand = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `ORD-${timestamp}-${rand}`;
    }

    getCheckoutUrl() {
        return this.isSandbox
            ? 'https://sandbox.payhere.lk/pay/checkout'
            : 'https://www.payhere.lk/pay/checkout';
    }

    generateHash(orderId, amount, currency) {
        const formattedAmount = parseFloat(amount).toFixed(2);
        const hashedSecret = crypto.createHash('md5').update(this.secret).digest('hex').toUpperCase();

        const hashString = `${this.merchantId}${orderId}${formattedAmount}${currency}${hashedSecret}`;
        return crypto.createHash('md5').update(hashString).digest('hex').toUpperCase();
    }

    buildCheckoutPayload(orderId, amount, currency, itemTitle, customerName, customerEmail) {
        const nameParts = customerName.split(' ');
        const firstName = nameParts[0] || 'Customer';
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'Name';
        
        const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
        const frontendUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

        return {
            merchant_id: this.merchantId,
            return_url: `${frontendUrl}/dashboard`,
            cancel_url: `${frontendUrl}/dashboard`,
            notify_url: `${backendUrl}/api/payments/notify`,
            order_id: orderId,
            items: itemTitle || 'Adorix Service',
            currency: currency,
            amount: parseFloat(amount).toFixed(2),
            first_name: firstName,
            last_name: lastName,
            email: customerEmail,
            phone: process.env.PAYHERE_DEFAULT_PHONE || '0770000000',
            address: process.env.PAYHERE_DEFAULT_ADDRESS || 'Sandbox Address',
            city: process.env.PAYHERE_DEFAULT_CITY || 'Sandbox City',
            country: 'Sri Lanka',
            hash: this.generateHash(orderId, amount, currency)
        };
    }
}

module.exports = new PayHereService();
