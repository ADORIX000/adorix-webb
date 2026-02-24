import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, CreditCard, HelpCircle,
  Pencil, Sparkles, ShieldCheck,
  AlertCircle, CheckCircle2,
  Lock, Calendar, Hash
} from 'lucide-react';
import ApplePayIcon from '../../../components/common/ApplePayIcon';

export default function Checkout() {
  const { plan, method } = useParams();
  const navigate = useNavigate();

  const renderPaymentMethod = () => {
    switch (method) {
      case 'card':
        return <CardPayment plan={plan} navigate={navigate} />;
      case 'applepay':
        return <ProviderPayment plan={plan} provider="Apple Pay" icon={ApplePayIcon} navigate={navigate} />;
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
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    cardName: 'Adorix Member'
  });

  const [errors, setErrors] = useState({});
  const [cardType, setCardType] = useState('unknown');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeField, setActiveField] = useState(null);

  // Card Brand Detection
  useEffect(() => {
    const number = formData.cardNumber.replace(/\s/g, '');
    if (/^4/.test(number)) setCardType('visa');
    else if (/^5[1-5]/.test(number) || /^222[1-9]/.test(number) || /^22[3-9]/.test(number) || /^2[3-6]/.test(number) || /^27[0-1]/.test(number) || /^2720/.test(number)) setCardType('mastercard');
    else if (/^3[47]/.test(number)) setCardType('amex');
    else if (/^6(?:011|5[0-9]{2})/.test(number)) setCardType('discover');
    else setCardType('unknown');
  }, [formData.cardNumber]);

  // Luhn's Algorithm
  const validateLuhn = (number) => {
    const digits = number.replace(/\s/g, '').split('').map(Number);
    let sum = 0;
    let isSecond = false;
    for (let i = digits.length - 1; i >= 0; i--) {
      let d = digits[i];
      if (isSecond) {
        d *= 2;
        if (d > 9) d -= 9;
      }
      sum += d;
      isSecond = !isSecond;
    }
    return sum % 10 === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value.replace(/[^\d]/g, '').substring(0, 16);
      formattedValue = formattedValue.match(/.{1,4}/g)?.join(' ') || formattedValue;
    } else if (name === 'expiry') {
      formattedValue = value.replace(/[^\d]/g, '').substring(0, 4);
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2);
      }
    } else if (name === 'cvc') {
      formattedValue = value.replace(/[^\d]/g, '').substring(0, cardType === 'amex' ? 4 : 3);
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const cardNum = formData.cardNumber.replace(/\s/g, '');

    if (!cardNum) newErrors.cardNumber = 'Card number is required';
    else if (cardNum.length < 13) newErrors.cardNumber = 'Card number is too short';
    else if (!validateLuhn(cardNum)) newErrors.cardNumber = 'Invalid card number';

    if (!formData.expiry) newErrors.expiry = 'Expiry required';
    else if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) newErrors.expiry = 'MM/YY only';
    else {
      const [month, year] = formData.expiry.split('/').map(Number);
      const now = new Date();
      const expiryDate = new Date(2000 + year, month - 1);
      if (month < 1 || month > 12) newErrors.expiry = 'Invalid month';
      else if (expiryDate < now) newErrors.expiry = 'Expired';
    }

    if (!formData.cvc) newErrors.cvc = 'CVC required';
    else {
      const cvcLen = cardType === 'amex' ? 4 : 3;
      if (formData.cvc.length !== cvcLen) newErrors.cvc = `${cvcLen} digits`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      alert('✓ Payment processed successfully!');
      navigate('/dashboard');
    }, 2000);
  };

  const shakeAnimation = {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 }
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Unified Integrated Card Block */}
      <motion.div
        animate={hasErrors ? shakeAnimation : {}}
        className="space-y-2"
      >
        <div className="flex items-center justify-between px-2 mb-2">
          <p className={`text-xs font-black uppercase tracking-widest ${hasErrors ? 'text-red-500' : 'text-gray-400'}`}>
            Secure Card Information
          </p>
          <div className="flex gap-2">
            <ShieldCheck className={`w-4 h-4 ${hasErrors ? 'text-red-400' : 'text-emerald-500'}`} />
          </div>
        </div>

        <div className={`overflow-hidden rounded-2xl border-2 transition-all duration-300 bg-white shadow-sm ${hasErrors ? 'border-red-500 ring-4 ring-red-50' :
            activeField ? 'border-adorix-primary ring-4 ring-adorix-primary/10' :
              'border-gray-100'
          }`}>
          {/* Card Number Row */}
          <div className={`flex items-center p-4 transition-colors ${activeField === 'cardNumber' ? 'bg-adorix-primary/5' : ''}`}>
            <div className="mr-4 text-gray-400 border-r border-gray-100 pr-4">
              <CreditCard className={`w-6 h-6 transition-colors ${activeField === 'cardNumber' ? 'text-adorix-primary' : ''}`} />
            </div>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              onFocus={() => setActiveField('cardNumber')}
              onBlur={() => setActiveField(null)}
              placeholder="0000 0000 0000 0000"
              className="flex-1 outline-none text-xl tracking-widest text-[#202124] font-sans placeholder-gray-200"
              maxLength="19"
            />
            <AnimatePresence>
              {cardType !== 'unknown' && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="px-2 py-1 bg-gray-100 rounded text-[9px] font-black text-gray-500 uppercase tracking-tighter"
                >
                  {cardType}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="h-px bg-gray-100 mx-4" />

          {/* Expiry and CVC Row */}
          <div className="flex divide-x divide-gray-100">
            <div className={`flex-1 flex items-center p-4 transition-colors ${activeField === 'expiry' ? 'bg-adorix-primary/5' : ''}`}>
              <Calendar className={`w-4 h-4 mr-3 transition-colors ${activeField === 'expiry' ? 'text-adorix-primary' : 'text-gray-300'}`} />
              <input
                type="text"
                name="expiry"
                value={formData.expiry}
                onChange={handleInputChange}
                onFocus={() => setActiveField('expiry')}
                onBlur={() => setActiveField(null)}
                placeholder="MM / YY"
                className="w-full outline-none text-base tracking-widest text-[#202124] font-sans placeholder-gray-200"
                maxLength="5"
              />
            </div>
            <div className={`flex-1 flex items-center p-4 transition-colors ${activeField === 'cvc' ? 'bg-adorix-primary/5' : ''}`}>
              <Lock className={`w-4 h-4 mr-3 transition-colors ${activeField === 'cvc' ? 'text-adorix-primary' : 'text-gray-300'}`} />
              <input
                type="password"
                name="cvc"
                value={formData.cvc}
                onChange={handleInputChange}
                onFocus={() => setActiveField('cvc')}
                onBlur={() => setActiveField(null)}
                placeholder="CVC"
                className="w-full outline-none text-base tracking-widest text-[#202124] font-sans placeholder-gray-200"
                maxLength={cardType === 'amex' ? 4 : 3}
              />
              <HelpCircle className="w-4 h-4 text-gray-300 hover:text-gray-600 cursor-help ml-2" />
            </div>
          </div>
        </div>

        {/* Cumulative Errors */}
        <AnimatePresence>
          {hasErrors && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="px-2 space-y-1"
            >
              {Object.values(errors).map((err, i) => (
                <p key={i} className="text-xs text-red-500 font-bold flex items-center gap-2">
                  <AlertCircle className="w-3 h-3" /> {err}
                </p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Cardholder Info */}
      <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Billing Account</p>
            <h3 className="text-lg font-black text-adorix-dark">{formData.cardName}</h3>
          </div>
          <button type="button" className="p-2.5 bg-white border border-gray-100 rounded-xl hover:border-adorix-primary transition-all group shadow-sm">
            <Pencil className="w-4 h-4 text-adorix-primary group-hover:scale-110 transition-transform" />
          </button>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 font-bold">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Auto-verifying address • Sri Lanka
        </div>
      </div>

      {/* Summary with "Integrated" Feel */}
      <div className="pt-8 border-t-2 border-gray-50 space-y-8">
        <div className="flex justify-between items-center group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-adorix-primary text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-adorix-primary/20 group-hover:rotate-6 transition-transform">
              {plan?.[0].toUpperCase()}
            </div>
            <div>
              <p className="text-base font-black text-adorix-dark uppercase tracking-tight">{plan} Membership</p>
              <p className="text-xs text-gray-400 font-bold">Billed monthly • Cancel anytime</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-adorix-dark tracking-tighter">
              LKR {plan === 'plus' ? '62.00' : plan === 'pro' ? '150.00' : '225.00'}
            </p>
            <div className="flex items-center justify-end gap-1 text-[9px] font-black text-emerald-600 uppercase tracking-widest">
              <CheckCircle2 className="w-3 h-3" /> Secure checkout
            </div>
          </div>
        </div>

        <button
          disabled={isSubmitting}
          className={`w-full py-5 rounded-[1.25rem] font-black text-lg transition-all shadow-2xl flex items-center justify-center gap-3 relative overflow-hidden group ${isSubmitting ? 'bg-gray-50 text-gray-300' : 'bg-adorix-dark text-white hover:bg-adorix-primary active:scale-[0.98]'
            }`}
        >
          <AnimatePresence mode="wait">
            {isSubmitting ? (
              <motion.div
                key="submitting"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-5 h-5 border-3 border-gray-300 border-t-adorix-primary rounded-full animate-spin" />
                <span>AUTHORIZING...</span>
              </motion.div>
            ) : (
              <motion.div
                key="ready"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3"
              >
                <div className="p-1 px-2 border border-white/20 rounded bg-white/10 text-[10px] tracking-widest">SSL</div>
                COMPLETE PAYMENT
              </motion.div>
            )}
          </AnimatePresence>
          <div className="absolute inset-0 bg-white/5 translate-x-[-100%] group-hover:translate-x-[120%] transition-transform duration-700 skew-x-[-20deg]" />
        </button>

        <p className="text-center text-[10px] text-gray-400 font-bold leading-relaxed max-w-[280px] mx-auto uppercase tracking-tighter">
          Your payment data is processed by <span className="text-adorix-dark">ADORIX Payments</span> under PCI DSS security standards.
        </p>
      </div>
    </form>
  );
}

function ProviderPayment({ plan, provider, navigate, icon: IconComponent = ShieldCheck }) {
  return (
    <div className="text-center py-20 bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-100 px-8">
      <div className="w-32 h-32 bg-white rounded-[2.5rem] shadow-xl flex items-center justify-center mx-auto mb-8 border border-gray-50 group hover:rotate-6 transition-transform">
        <IconComponent className="w-16 h-16" />
      </div>
      <h2 className="text-2xl font-black text-adorix-dark mb-3 uppercase tracking-tight">{provider} Authentication</h2>
      <p className="text-gray-500 font-medium mb-10 max-w-xs mx-auto">Click below to trigger the secure biometric authentication on your device.</p>

      <button
        onClick={() => { alert(`${provider} success`); navigate('/dashboard'); }}
        className="w-full py-5 bg-black text-white rounded-2xl font-black text-lg hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-2xl active:scale-[0.98]"
      >
        <span className="text-gray-400 text-sm">Pay with</span> {provider}
      </button>

      <div className="mt-8 flex items-center justify-center gap-2 text-gray-400">
        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Secure & Encrypted</span>
      </div>
    </div>
  );
}
