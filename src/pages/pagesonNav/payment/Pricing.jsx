import React, { useState } from 'react';
import { Check, X, ChevronDown, Star, Shield, Zap, Users, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const PricingCard = ({ title, monthlyPrice, annualPrice, features, icon: Icon, recommended, isAnnual }) => {
  const price = isAnnual ? annualPrice : monthlyPrice;
  const savings = isAnnual ? Math.round(((monthlyPrice * 12 - annualPrice * 12) / (monthlyPrice * 12)) * 100) : 0;

  return (
    <motion.div
      layout
      className={`relative p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${recommended
        ? 'border-adorix-primary bg-gradient-to-br from-white to-adorix-light shadow-xl scale-105'
        : 'border-gray-200 bg-white hover:border-adorix-primary/30'
        }`}
    >
      {recommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-gradient-to-r from-adorix-primary to-adorix-secondary text-white text-xs font-bold px-4 py-2 rounded-full uppercase shadow-lg flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Most Popular
          </span>
        </div>
      )}

      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-xl ${recommended ? 'bg-adorix-primary/10' : 'bg-gray-100'}`}>
          <Icon className={`w-6 h-6 ${recommended ? 'text-adorix-primary' : 'text-gray-600'}`} />
        </div>
        <h3 className="text-2xl font-bold text-adorix-dark">{title}</h3>
      </div>

      <div className="mb-8">
        <div className="flex items-baseline gap-2">
          <motion.span
            key={price}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-adorix-dark"
          >
            ${price}
          </motion.span>
          <span className="text-gray-500 text-lg">/month</span>
        </div>
        {isAnnual && savings > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full"
          >
            <Zap className="w-3 h-3" /> Save {savings}% annually
          </motion.div>
        )}
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feat, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
            <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>{feat}</span>
          </li>
        ))}
      </ul>

      <Link
        to="/payment-method"
        className={`block text-center w-full py-4 rounded-xl font-bold transition-all ${recommended
          ? 'bg-adorix-dark text-white hover:bg-adorix-primary shadow-lg hover:shadow-xl hover:scale-105'
          : 'bg-gray-100 text-gray-900 hover:bg-adorix-light hover:text-adorix-dark'
          }`}
      >
        Get Started with {title}
      </Link>
    </motion.div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-adorix-primary transition-colors"
      >
        <span className="font-bold text-lg text-adorix-dark pr-8">{question}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      title: 'Starter',
      icon: Users,
      monthlyPrice: 0,
      annualPrice: 0,
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
      monthlyPrice: 49,
      annualPrice: 39,
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
      monthlyPrice: 199,
      annualPrice: 159,
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

  const faqs = [
    {
      question: 'Can I switch plans at any time?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any charges or credits to your account.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for Enterprise plans. All payments are processed securely through Stripe.'
    },
    {
      question: 'Is there a free trial available?',
      answer: 'Yes! All paid plans come with a 14-day free trial. No credit card required to start. You can test all features before committing to a subscription.'
    },
    {
      question: 'What happens to my data if I cancel?',
      answer: 'Your data remains accessible for 30 days after cancellation. You can export all your analytics and campaign data at any time. After 30 days, data is permanently deleted per our privacy policy.'
    },
    {
      question: 'Do you offer discounts for non-profits or educational institutions?',
      answer: 'Yes! We offer special pricing for non-profit organizations and educational institutions. Contact our sales team for more information about our discount programs.'
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-adorix-dark mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Choose the perfect plan for your intelligent advertising needs. All plans include core AI features.
            </p>
          </motion.div>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-4 bg-white p-2 rounded-full shadow-lg border border-gray-200"
          >
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-3 rounded-full font-bold transition-all ${!isAnnual
                ? 'bg-adorix-dark text-white shadow-md'
                : 'text-gray-600 hover:text-adorix-dark'
                }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2 ${isAnnual
                ? 'bg-adorix-dark text-white shadow-md'
                : 'text-gray-600 hover:text-adorix-dark'
                }`}
            >
              Annual
              <span className="text-xs bg-emerald-500 text-white px-2 py-1 rounded-full">Save 20%</span>
            </button>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <PricingCard {...plan} isAnnual={isAnnual} />
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-adorix-dark text-center mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Can't find what you're looking for? <Link to="/contact" className="text-adorix-primary hover:underline font-bold">Contact our team</Link>
          </p>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            {faqs.map((faq, index) => (
              <FAQItem key={index} {...faq} />
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <h3 className="text-3xl font-bold text-adorix-dark mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-8">
            Our team is here to help you find the perfect plan for your needs.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-adorix-primary hover:bg-adorix-secondary text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            Talk to Sales
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

export default Pricing;