import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingCard = ({ title, price, features, recommended }) => (
  <div className={`p-8 rounded-2xl border ${recommended ? 'border-adorix-500 shadow-xl scale-105 bg-white' : 'border-gray-200 bg-white/60 backdrop-blur-sm'}`}>
    {recommended && <span className="bg-adorix-100 text-adorix-700 text-xs font-bold px-3 py-1 rounded-full uppercase">Most Popular</span>}
    <h3 className="text-xl font-bold mt-4">{title}</h3>
    <div className="mt-4 mb-8">
      <span className="text-4xl font-bold">${price}</span>
      <span className="text-gray-500">/month</span>
    </div>
    <ul className="space-y-4 mb-8">
      {features.map((feat, i) => (
        <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
          <Check className="w-4 h-4 text-green-500" /> {feat}
        </li>
      ))}
    </ul>
    <Link to="/payment-method" className={`block text-center w-full py-3 rounded-lg font-bold transition ${recommended ? 'bg-adorix-600 text-white hover:bg-adorix-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
      Choose {title}
    </Link>
  </div>
);

const Pricing = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-adorix-dark mb-4">Simple, transparent pricing</h1>
        <p className="text-xl text-gray-500">Choose the plan that fits your advertising needs.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <PricingCard 
            title="Starter" 
            price="0" 
            features={["1 Kiosk Device", "Basic Analytics", "5 Active Campaigns", "Email Support"]} 
        />
        <PricingCard 
            title="Pro" 
            price="49" 
            features={["5 Kiosk Devices", "AI Gaze Tracking", "Unlimited Campaigns", "24/7 Priority Support", "Export Data"]} 
            recommended={true}
        />
        <PricingCard 
            title="Enterprise" 
            price="199" 
            features={["Unlimited Devices", "Custom AI Models", "API Access", "Dedicated Account Manager"]} 
        />
      </div>
    </div>
  );
};

export default Pricing;