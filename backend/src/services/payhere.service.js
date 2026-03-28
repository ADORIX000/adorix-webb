const crypto = require('crypto');

/**
 * PayHere Payment Service
 * 
 * Handles interactions with the PayHere API, including secure hash generation
 * and payment verification for sandbox and production environments.
 */
class PayHereService {
    constructor() {
        this.merchantId = (process.env.PAYHERE_MERCHANT_ID || '').trim();
        this.secret = (process.env.PAYHERE_MERCHANT_SECRET || '').trim();
        this.isSandbox = process.env.PAYHERE_SANDBOX === 'true';
        
        console.log('--- PAYHERE CREDENTIAL VERIFICATION ---');
        console.log('Merchant ID:', this.merchantId);
        console.log('Merchant Secret (RAW):', `"${this.secret}"`);
        console.log('Is Sandbox:', this.isSandbox);
        console.log('---------------------------------------');
    }

    generateOrderId() {
        const timestamp = Date.now();
        const rand = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `ORD${timestamp}${rand}`;
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
        const finalHash = crypto.createHash('md5').update(hashString).digest('hex').toUpperCase();

        console.log('--- PAYHERE HASH DEBUG ---');
        console.log('1. Merchant ID:', this.merchantId);
        console.log('2. Order ID:', orderId);
        console.log('3. Formatted Amount:', formattedAmount);
        console.log('4. Currency:', currency);
        console.log('5. Hashed Secret (MD5):', hashedSecret);
        console.log('6. Hash String (Masked):', `${this.merchantId}${orderId}${formattedAmount}${currency}[SECRET_MD5]`);
        console.log('7. Final Hash:', finalHash);
        console.log('--------------------------');

        return finalHash;
    }
    verifyWebhookSignature(merchantId, orderId, payhereAmount, payhereCurrency, statusCode, receivedMd5sig) {
        const hashedSecret = crypto.createHash('md5').update(this.secret).digest('hex').toUpperCase();
        
        const hashString = `${merchantId}${orderId}${payhereAmount}${payhereCurrency}${statusCode}${hashedSecret}`;
        const generatedSig = crypto.createHash('md5').update(hashString).digest('hex').toUpperCase();

        return generatedSig === receivedMd5sig;
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
