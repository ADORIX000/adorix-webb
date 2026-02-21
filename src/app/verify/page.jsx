import React from 'react';
import { Mail } from 'lucide-react';
import Link from "next/link";

const Verification = () => {
  return (
    <div className="pt-32 flex justify-center items-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md text-center">
        <div className="bg-adorix-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="w-8 h-8 text-adorix-600" />
        </div>
        <h2 className="text-2xl font-bold text-adorix-dark mb-2">Check your inbox</h2>
        <p className="text-gray-500 mb-6">
          We sent a verification link to your email. Please click the link to activate your account.
        </p>
        <Link href="/login" className="text-adorix-600 font-semibold hover:underline">
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default Verification;