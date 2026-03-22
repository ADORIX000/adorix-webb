'use client';

import React, { useState } from 'react';
import { Check, Star, Zap, Sparkles, Shield, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import TypingText from '@/components/home/TypingText';

const PricingCard = ({
  title,
  oldPrice,
  offerPrice,
  afterPrice,
  savings,
  features,
  icon: Icon,
  recommended,
  isSignedIn,
  user,
  router
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!isSignedIn || !user) {
      router.push('/signup');
      return;
    }

    try {
      setIsLoading(true);

      const itemId = `plan_${title.toLowerCase()}`;
      const amount = Number(offerPrice.replace(/,/g, ''));
      const customerName = user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Customer';
      
      const payload = {
        user_id: user.id,
        amount: amount,
        item_type: 'Subscription',
        item_id: itemId,
        customer_name: customerName,
        customer_email: user.primaryEmailAddress?.emailAddress || ''
      };

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/payments/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.checkoutUrl && data.payload) {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = data.checkoutUrl;

        Object.keys(data.payload).forEach(key => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = data.payload[key];
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      } else {
        console.error('Invalid payment response:', data);
        alert('Payment initiation failed. Please try again.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('An error occurred during payment initiation.');
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`relative p-8 rounded-3xl border transition-all duration-500 h-full flex flex-col ${recommended && isHovered
        ? 'border-adorix-primary bg-gradient-to-br from-white to-adorix-light shadow-2xl scale-105'
        : 'border-gray-200 bg-white hover:border-adorix-primary/30'
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Most Popular Tag */}
      {recommended && (
        <div className={`absolute -top-4 left-1/2 -translate-x-1/2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
          }`}>
          <span className="bg-gradient-to-r from-adorix-primary to-adorix-secondary text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase shadow-lg flex items-center gap-1 tracking-widest">
            <Sparkles className="w-3 h-3" /> Most Popular
          </span>
        </div>
      )}

      <div className="flex items-center gap-3 mb-8">
        <div className={`p-3 rounded-xl ${recommended ? 'bg-adorix-primary/10' : 'bg-gray-100'}`}>
          <Icon className={`w-6 h-6 ${recommended ? 'text-adorix-primary' : 'text-gray-600'}`} />
        </div>
        <h3 className="text-2xl font-black text-adorix-dark">{title}</h3>
      </div>

      <div className="mb-10 min-h-[120px]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-gray-400 line-through text-lg font-medium">LKR {oldPrice}</span>
          <div className="flex items-baseline">
            <span className="text-adorix-dark text-3xl font-black ml-2">Rs {offerPrice}</span>
            <span className="text-gray-500 font-bold ml-1">/mo</span>
          </div>
        </div>

        <p className="text-gray-500 text-sm font-medium mb-3">for 3 months</p>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
            <Zap className="w-3 h-3" /> Save up to Rs {savings} with offer
          </div>
          <p className="text-[11px] text-gray-400 mt-2 font-medium uppercase tracking-wider">
            LKR {afterPrice}/month after
          </p>
        </div>
      </div>

      <ul className="space-y-4 mb-10 flex-1">
        {features.map((feat, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
            <div className="mt-1 w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <Check className="w-2.5 h-2.5 text-emerald-600 stroke-[3]" />
            </div>
            <span className="leading-tight font-medium">{feat}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleSubscribe}
        disabled={isLoading}
        className={`block text-center w-full py-4 rounded-2xl font-bold transition-all flex justify-center items-center gap-2 ${recommended
          ? 'bg-adorix-dark text-white hover:bg-adorix-primary shadow-lg shadow-adorix-dark/20'
          : 'bg-gray-100 text-gray-900 hover:bg-adorix-light hover:text-adorix-dark'
          }`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : (
          `Get Started with ${title}`
        )}
      </button>
    </div>
  );
};

const Pricing = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const plans = [
    {
      title: 'Plus',
      icon: Sparkles,
      oldPrice: '250',
      offerPrice: '62',
      afterPrice: '250',
      savings: '564',
      features: [
        '1 Kiosk Device',
        'Basic Analytics Dashboard',
        'Up to 5 Active Campaigns',
        'Email Support (48h response)',
        'Standard AI Models',
        'Community Access'
      ]
    },
    {
      title: 'Pro',
      icon: Zap,
      oldPrice: '575',
      offerPrice: '150',
      afterPrice: '575',
      savings: '1,275',
      recommended: true,
      features: [
        'Up to 5 Kiosk Devices',
        'Advanced AI Gaze Tracking',
        'Unlimited Campaigns',
        '24/7 Priority Support',
        'Advanced Analytics & Export',
        'Custom Branding',
        'A/B Testing Tools',
        'API Access (Basic)'
      ]
    },
    {
      title: 'Enterprise',
      icon: Shield,
      oldPrice: '875',
      offerPrice: '225',
      afterPrice: '875',
      savings: '1,950',
      features: [
        'Unlimited Kiosk Devices',
        'Custom AI Model Training',
        'Full API Access',
        'Dedicated Account Manager',
        'White-label Solutions',
        'SLA Guarantee (99.9%)',
        'Advanced Security Features',
        'On-premise Deployment Option'
      ]
    }
  ];

  if (!isLoaded) return null;

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-black text-adorix-dark mb-6 tracking-tight">
              <TypingText text="Kiosk Plans for " speed={0.05} />
              <span className="text-adorix-primary">
                <TypingText text="Growers" speed={0.05} delay={0.85} />
              </span>
            </h1>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="h-full"
            >
              <PricingCard {...plan} isSignedIn={isSignedIn} user={user} router={router} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
