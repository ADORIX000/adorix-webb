import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

const Verification = () => {
  return (
    <div className="pt-32 pb-32 flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-md text-center px-6">

        {/* Icon */}
        <div className="w-16 h-16 bg-adorix-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <Mail className="w-8 h-8 text-adorix-primary" />
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-adorix-dark mb-3">
          One last step.
        </h2>

        {/* Body */}
        <p className="text-gray-500 text-base leading-relaxed mb-2">
          We sent a link to your email. Open it to activate your account , it only takes a second.
        </p>
        <p className="text-gray-400 text-sm mb-10">
          No email? Check your spam folder or try again.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/login"
            className="px-6 py-2.5 rounded-full border border-gray-200 text-gray-600 font-medium hover:border-gray-300 hover:bg-gray-50 transition text-sm"
          >
            Back to Sign In
          </Link>
          <button
            type="button"
            className="px-6 py-2.5 rounded-full bg-adorix-dark text-white font-medium hover:bg-adorix-primary transition text-sm"
          >
            Resend Email
          </button>
        </div>

      </div>
    </div>
  );
};

export default Verification;