import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ChevronRight, Landmark, CreditCard, ShieldCheck
} from 'lucide-react';
import ApplePayIcon from '../../../components/common/ApplePayIcon';

export default function UpgradePlan() {
  const { plan } = useParams();
  const navigate = useNavigate();
  const [selectedPlan] = useState(plan || 'pro');

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, AMEX',
      color: 'blue'
    },
    {
      id: 'applepay',
      name: 'Apple Pay',
      icon: ApplePayIcon,
      description: 'Quick payment with Apple',
      color: 'gray'
    },
  ];

  const handlePaymentSelect = (methodId) => {
    navigate(`/checkout/${selectedPlan}/${methodId}`);
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-[#FDFEFF] relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-adorix-primary/5 rounded-full blur-[120px] -ml-64 -mt-64" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-adorix-accent/5 rounded-full blur-[120px] -mr-64 -mb-64" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.button
          onClick={() => navigate(-1)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-gray-400 font-black text-xs uppercase tracking-widest hover:text-adorix-primary transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </motion.button>

        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-adorix-dark mb-6 tracking-tight"
          >
            Choose your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-adorix-primary to-adorix-accent">
              Payment Method.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 font-bold bg-white/50 backdrop-blur-md border border-gray-100 px-6 py-2 rounded-full inline-block"
          >
            Upgrading to: <span className="text-adorix-primary uppercase tracking-widest font-black ml-2">{selectedPlan} Plan</span>
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {paymentMethods.map((method, index) => (
            <motion.div
              key={method.id}
              onClick={() => handlePaymentSelect(method.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/70 backdrop-blur-xl p-8 rounded-[2.5rem] border border-gray-100 hover:border-adorix-primary/30 cursor-pointer transition-all group shadow-xl shadow-adorix-dark/5 flex items-center justify-between"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-adorix-dark group-hover:bg-adorix-primary group-hover:text-white transition-all duration-500">
                  <method.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-adorix-dark mb-1">{method.name}</h3>
                  <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">{method.description}</p>
                </div>
              </div>
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-adorix-primary/10 group-hover:text-adorix-primary transition-all">
                <ChevronRight className="w-5 h-5" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="flex items-center justify-center gap-4 text-gray-400 mb-6">
            <ShieldCheck className="w-5 h-5 text-adorix-primary" />
            <p className="text-xs font-black uppercase tracking-[0.2em]">Secure bit-level encryption active</p>
          </div>
          <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed font-medium">
            Your payment is secure. We use 256-bit SSL encryption to protect your sensitive information.
          </p>
        </div>
      </div>
    </div>
  );
}
