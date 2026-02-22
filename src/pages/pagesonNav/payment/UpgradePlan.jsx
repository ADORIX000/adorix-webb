import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import './UpgradePlan.css';

export default function UpgradePlan() {
  const { plan } = useParams();
  const navigate = useNavigate();
  const [selectedPlan] = useState(plan || 'pro');

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: '💳',
      description: 'Visa, Mastercard, American Express',
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: '🅿️',
      description: 'Fast and secure PayPal checkout',
    },
    {
      id: 'applepay',
      name: 'Apple Pay',
      icon: '🍎',
      description: 'Quick payment with Apple Pay',
    },
    {
      id: 'googlepay',
      name: 'Google Pay',
      icon: '🔵',
      description: 'Secure payment with Google Pay',
    },
  ];

  const handlePaymentSelect = (methodId) => {
    navigate(`/checkout/${selectedPlan}/${methodId}`);
  };

  return (
    <div className="upgrade-plan-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Select Payment Method</h1>
        <p className="plan-info">
          Upgrading to: <strong>{selectedPlan.toUpperCase()} Plan</strong>
        </p>

        <div className="payment-grid">
          {paymentMethods.map((method, index) => (
            <motion.div
              key={method.id}
              className="payment-card"
              onClick={() => handlePaymentSelect(method.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className="payment-icon">{method.icon}</div>
              <h3>{method.name}</h3>
              <p>{method.description}</p>
              <button className="select-btn">Select</button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
