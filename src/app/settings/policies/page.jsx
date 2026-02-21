import React from 'react';
import { FileText } from 'lucide-react';

const Policies = () => {
  return (
    <div className="pt-28 px-6 pb-20 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-adorix-primary/10">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-adorix-light p-3 rounded-full">
            <FileText className="w-6 h-6 text-adorix-primary" />
          </div>
          <h1 className="text-3xl font-bold text-adorix-dark">Terms & Policies</h1>
        </div>

        <div className="prose prose-slate max-w-none text-gray-600">
          <h3 className="text-adorix-dark font-bold text-xl">1. Ad Content Guidelines</h3>
          <p className="mb-4">
            All advertisements uploaded to Adorix Kiosks must comply with local laws. We strictly prohibit content related to illegal substances, violence, or hate speech. Our AI review system automatically flags violations.
          </p>

          <h3 className="text-adorix-dark font-bold text-xl">2. Payment Security</h3>
          <p className="mb-4">
            Adorix uses encrypted payment gateways (Stripe/PayPal) to process all transactions. We do not store your full credit card details on our servers. Refunds are processed within 5-10 business days.
          </p>

          <h3 className="text-adorix-dark font-bold text-xl">3. Data Privacy</h3>
          <p className="mb-4">
            We collect gaze tracking data solely for analytics purposes. No facial recognition data is stored permanently. All video feeds are processed locally on the kiosk device.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Policies;