import React from 'react';
import { CreditCard, Lock } from 'lucide-react';

const PaymentMethod = () => {
  return (
    <div className="pt-32 flex justify-center pb-20">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
            <Lock className="w-5 h-5 text-gray-400" />
        </div>
        
        {/* Plan Summary */}
        <div className="bg-adorix-50 p-4 rounded-lg mb-6 flex justify-between items-center">
            <div>
                <p className="font-bold text-adorix-900">Pro Plan</p>
                <p className="text-sm text-adorix-700">Monthly subscription</p>
            </div>
            <span className="font-bold text-xl">$49.00</span>
        </div>

        <form className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                <input type="text" className="w-full border p-3 rounded-lg outline-none focus:border-adorix-500" placeholder="John Doe" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <div className="relative">
                    <CreditCard className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                    <input type="text" className="w-full border p-3 pl-10 rounded-lg outline-none focus:border-adorix-500" placeholder="0000 0000 0000 0000" />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <input type="text" className="w-full border p-3 rounded-lg outline-none focus:border-adorix-500" placeholder="MM/YY" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                    <input type="text" className="w-full border p-3 rounded-lg outline-none focus:border-adorix-500" placeholder="123" />
                </div>
            </div>

            <button className="w-full bg-adorix-900 hover:bg-adorix-800 text-white font-bold py-4 rounded-lg mt-4 transition">
                Pay $49.00
            </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentMethod;