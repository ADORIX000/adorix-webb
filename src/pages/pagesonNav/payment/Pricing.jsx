import React, { useState } from 'react';
import { Check, Star, Zap, Sparkles, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PricingCard = ({
  title,
  oldPrice,
  offerPrice,
  afterPrice,
  savings,
  features,
  icon: Icon,
  recommended
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative p-8 rounded-3xl border transition-all duration-500 h-full flex flex-col ${recommended && isHovered
        ? 'border-adorix-primary bg-gradient-to-br from-white to-adorix-light shadow-2xl scale-105'
        : 'border-gray-200 bg-white hover:border-adorix-primary/30'
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Most Popular Tag - appears only on hover for Recommended card */}
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

      <Link
        to={`/upgrade/${title.toLowerCase()}`}
        className={`block text-center w-full py-4 rounded-2xl font-bold transition-all ${recommended
          ? 'bg-adorix-dark text-white hover:bg-adorix-primary shadow-lg shadow-adorix-dark/20'
          : 'bg-gray-100 text-gray-900 hover:bg-adorix-light hover:text-adorix-dark'
          }`}
      >
        Get Started with {title}
      </Link>
    </div>
  );
};



const Pricing = () => {

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
              Kiosk Plans for <span className="text-adorix-primary">Growers</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
              Take your kiosks to the next level with our pro features and AI analytics.
            </p>
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
              <PricingCard {...plan} />
            </motion.div>
          ))}
        </div>



      </div>
    </div>
  );
};

export default Pricing;