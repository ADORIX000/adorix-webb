import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Checkout.css';

export default function Checkout() {
  const { plan, method } = useParams();
  const navigate = useNavigate();

  const paymentComponents = {
    card: <CardPayment plan={plan} navigate={navigate} />,
    paypal: <PayPalPayment plan={plan} navigate={navigate} />,
    applepay: <ApplePayPayment plan={plan} navigate={navigate} />,
    googlepay: <GooglePayPayment plan={plan} navigate={navigate} />,
  };

  return (
    <div className="checkout-container">
      <motion.button
        className="back-btn"
        onClick={() => navigate(-1)}
        whileHover={{ x: -4 }}
      >
        ← Back
      </motion.button>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Checkout - {plan?.toUpperCase()} Plan
      </motion.h1>
      <motion.div
        className="checkout-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {paymentComponents[method]}
      </motion.div>
    </div>
  );
}

function CardPayment({ plan, navigate }) {
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.cardName && formData.cardNumber && formData.expiry && formData.cvv) {
      alert('✓ Payment processed successfully! Welcome to ' + plan.toUpperCase() + ' plan.');
      navigate('/dashboard');
    }
  };

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Cardholder Name</label>
        <input
          type="text"
          placeholder="John Doe"
          required
          onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Card Number</label>
        <input
          type="text"
          placeholder="1234 5678 9012 3456"
          maxLength="19"
          required
          onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Expiry Date</label>
          <input
            type="text"
            placeholder="MM/YY"
            maxLength="5"
            required
            onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>CVV</label>
          <input
            type="text"
            placeholder="123"
            maxLength="3"
            required
            onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
          />
        </div>
      </div>
      <motion.button
        type="submit"
        className="pay-btn"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Pay Now
      </motion.button>
    </form>
  );
}

function PayPalPayment({ plan, navigate }) {
  const handlePayPal = () => {
    alert('✓ PayPal payment processed! Welcome to ' + plan.toUpperCase() + ' plan.');
    navigate('/dashboard');
  };

  return (
    <div className="payment-method">
      <h2>PayPal Checkout</h2>
      <p>You will be redirected to PayPal to complete your payment.</p>
      <motion.button
        className="pay-btn paypal-btn"
        onClick={handlePayPal}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Continue to PayPal
      </motion.button>
    </div>
  );
}

function ApplePayPayment({ plan, navigate }) {
  const handleApplePay = () => {
    alert('✓ Apple Pay payment processed! Welcome to ' + plan.toUpperCase() + ' plan.');
    navigate('/dashboard');
  };

  return (
    <div className="payment-method">
      <h2>Apple Pay</h2>
      <p>Complete your payment using Apple Pay on your device.</p>
      <motion.button
        className="pay-btn applepay-btn"
        onClick={handleApplePay}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Pay with Apple Pay
      </motion.button>
    </div>
  );
}

function GooglePayPayment({ plan, navigate }) {
  const handleGooglePay = () => {
    alert('✓ Google Pay payment processed! Welcome to ' + plan.toUpperCase() + ' plan.');
    navigate('/dashboard');
  };

  return (
    <div className="payment-method">
      <h2>Google Pay</h2>
      <p>Complete your payment using Google Pay on your device.</p>
      <motion.button
        className="pay-btn googlepay-btn"
        onClick={handleGooglePay}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Pay with Google Pay
      </motion.button>
    </div>
  );
}
