import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, CreditCard, HelpCircle,
  Pencil, Sparkles, ShieldCheck
} from 'lucide-react';

export default function Checkout() {
  const { plan, method } = useParams();
  const navigate = useNavigate();

  const renderPaymentMethod = () => {
    switch (method) {
      case 'card':
        return <CardPayment plan={plan} navigate={navigate} />;
      case 'paypal':
        return <PayPalPayment plan={plan} provider="PayPal" navigate={navigate} />;
      case 'applepay':
        return <ProviderPayment plan={plan} provider="Apple Pay" navigate={navigate} />;
      case 'googlepay':
        return <ProviderPayment plan={plan} provider="Google Pay" navigate={navigate} />;
      default:
        return <CardPayment plan={plan} navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#3c4043] font-sans pt-20 pb-12 px-4 md:px-0">
      <div className="max-w-[500px] mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-[22px] font-normal text-[#202124]">
            {method === 'card' ? 'Add credit or debit card' : `Pay with ${method}`}
          </h1>
        </div>

        {renderPaymentMethod()}
      </div>
    </div>
  );
}

function CardPayment({ plan, navigate }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length > 0) return parts.join(' ');
    return value;
  };

  const handleCardChange = (e) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert('✓ Payment processed successfully!');
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="text-sm font-normal text-gray-600 mb-6">All fields required</p>

      {/* Card Number Input */}
      <div className="relative group">
        <div className="absolute -top-2 left-3 bg-white px-1 text-xs text-[#1a73e8] font-medium z-10 transition-all">
          Card number
        </div>
        <div className="flex items-center border-2 border-[#1a73e8] rounded-lg p-4 bg-white transition-all shadow-sm">
          <div className="mr-3 text-gray-400">
            <CreditCard className="w-6 h-5" />
          </div>
          <input
            type="text"
            value={cardNumber}
            onChange={handleCardChange}
            placeholder="---- ---- ---- ----"
            className="flex-1 outline-none text-lg tracking-wider text-gray-800 font-sans"
            maxLength="19"
            required
          />
          <HelpCircle className="w-5 h-5 text-gray-400 ml-2 hover:text-gray-600 cursor-help" />
        </div>
      </div>

      {/* Grid for Expiry and CVC */}
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-4 outline-none focus:border-[#1a73e8] focus:border-2 transition-all text-lg placeholder-gray-400"
            required
            maxLength="5"
          />
        </div>
        <div className="relative flex items-center">
          <input
            type="password"
            placeholder="Security code"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-4 outline-none focus:border-[#1a73e8] focus:border-2 transition-all text-lg placeholder-gray-400 pr-12"
            required
            maxLength="4"
          />
          <HelpCircle className="w-5 h-5 text-gray-400 absolute right-4 hover:text-gray-600 cursor-help" />
        </div>
      </div>

      {/* User Info Section */}
      <div className="pt-6 pb-2">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-normal text-[#202124]">Adorix Member</h3>
          <button type="button" className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <Pencil className="w-5 h-5 text-[#1a73e8]" />
          </button>
        </div>
        <p className="text-sm text-gray-500">Sri Lanka</p>
      </div>

      {/* Disclaimer */}
      <p className="text-[13px] leading-relaxed text-gray-600">
        By continuing, you create an Adorix Payments account and agree to the Adorix Payments <span className="text-[#1a73e8] cursor-pointer hover:underline">Terms of Service</span>. The <span className="text-[#1a73e8] cursor-pointer hover:underline">Privacy Notice</span> describes how your data is handled.
      </p>

      {/* Summary Footer */}
      <div className="pt-8 border-t border-gray-200 mt-8">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-adorix-primary flex items-center justify-center text-white text-xs font-bold">A</div>
            <span className="text-base font-medium text-gray-800">{plan?.toUpperCase()} Plan (Adorix)</span>
          </div>
          <span className="text-base font-bold text-gray-900">
            LKR {plan === 'plus' ? '62.00' : plan === 'pro' ? '150.00' : '225.00'}/month
          </span>
        </div>

        <button
          disabled={isSubmitting}
          className="w-full py-4.5 bg-[#1a73e8] text-white rounded-full font-medium text-base hover:bg-[#1557b0] transition-all shadow-md active:scale-[0.98] disabled:opacity-70"
        >
          {isSubmitting ? 'Processing...' : 'Save card'}
        </button>
      </div>
    </form>
  );
}

function PayPalPayment({ plan, provider, navigate }) {
  return (
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-[#0070ba]/10 rounded-full flex items-center justify-center text-[#0070ba] mx-auto mb-6">
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="w-10" />
      </div>
      <h2 className="text-xl font-normal text-[#202124] mb-2">{provider} Checkout</h2>
      <p className="text-sm text-gray-600 mb-8">Pay securely using your PayPal account.</p>
      <button
        onClick={() => { alert('PayPal success'); navigate('/dashboard'); }}
        className="w-full py-4 bg-[#0070ba] text-white rounded-full font-medium hover:opacity-90 transition-all"
      >
        Continue to PayPal
      </button>
    </div>
  );
}

function ProviderPayment({ plan, provider, navigate }) {
  return (
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-100">
        <ShieldCheck className="w-10 h-10 text-gray-400" />
      </div>
      <h2 className="text-xl font-normal text-[#202124] mb-2">{provider}</h2>
      <p className="text-sm text-gray-600 mb-8">Pay securely using {provider} biometric auth.</p>
      <button
        onClick={() => { alert(`${provider} success`); navigate('/dashboard'); }}
        className="w-full py-4 bg-black text-white rounded-full font-medium hover:opacity-90 transition-all"
      >
        Pay with {provider}
      </button>
    </div>
  );
}
