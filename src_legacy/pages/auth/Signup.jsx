import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import API_URL from '../../config';
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: location.state?.email || '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [infoMessage, setInfoMessage] = useState(location.state?.info || '');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!form.password) {
      newErrors.password = 'Password is required.';
    } else if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
    if (serverError) setServerError('');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setServerError('');

    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: "User", email: form.email, password: form.password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.error || 'Signup failed. Please try again.');
        return;
      }

      login(data.user, data.token);
      navigate('/', { replace: true });
    } catch (err) {
      setServerError('Cannot connect to server. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const googleSignup = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log('Google Signup Success:', tokenResponse);
      navigate('/verify');
    },
    onError: (error) => console.log('Google Signup Failed:', error),
  });

  return (
    <div className="flex items-center justify-center px-4 py-20 min-h-screen">
      <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.07)] border border-gray-100 p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[22px] font-bold text-[#1F2B2D] tracking-tight text-center">
            Create account
          </h1>
          <p className="text-sm text-gray-400 font-normal mt-0.5 text-center">
            Join the ad revolution today.
          </p>
        </div>

        {/* Info Message Banner */}
        <AnimatePresence>
          {infoMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-4 text-xs text-blue-600 text-center bg-blue-50 p-2 rounded-lg border border-blue-100"
            >
              {infoMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Server Error Banner */}
        <AnimatePresence>
          {serverError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-4 text-xs text-red-500 text-center bg-red-50 p-2 rounded-lg border border-red-100"
            >
              {serverError}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Social Button */}
        <button
          onClick={() => googleSignup()}
          type="button"
          className="w-full h-10 border border-gray-200 rounded-lg text-[#1F2B2D] flex items-center justify-center gap-2 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-gray-400 text-xs px-3">or</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        <form onSubmit={handleSignup} noValidate>
          {/* Email */}
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full h-11 px-4 bg-white border rounded-md text-sm text-[#1F2B2D] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0D8A9E]/30 focus:border-[#0D8A9E] transition-all ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
              placeholder="Email address"
            />
            <AnimatePresence>
              {errors.email && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: 4 }} exit={{ opacity: 0, height: 0 }} className="text-red-500 text-xs overflow-hidden">
                  {errors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Password */}
          <div className="mb-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className={`w-full h-11 px-4 pr-12 bg-white border rounded-md text-sm text-[#1F2B2D] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0D8A9E]/30 focus:border-[#0D8A9E] transition-all ${errors.password ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1F2B2D] transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <AnimatePresence>
              {errors.password && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: 4 }} exit={{ opacity: 0, height: 0 }} className="text-red-500 text-xs overflow-hidden">
                  {errors.password}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 bg-[#0D8A9E] hover:bg-[#0a7a8d] active:bg-[#085a66] text-white text-sm font-semibold rounded-lg transition-all duration-150 shadow-none mt-2 flex items-center justify-center gap-1.5 disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {loading ? (
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                Sign up
                <span className="text-xs">▸</span>
              </>
            )}
          </button>
        </form>

        {/* Footer (Removed Don't have an account part) */}
        <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col items-center justify-center gap-4">

          {/* Clerk Badge Mimic */}
          <div className="text-center w-full bg-gray-50/50 py-3 rounded-xl border border-gray-50 mt-1">
            <div className="flex items-center justify-center gap-1.5">
              <span className="text-[11px] text-gray-500 font-medium">Secured by</span>
              <span className="text-xs text-[#1F2B2D] font-bold tracking-tight">clerk</span>
            </div>
            <p className="text-[11px] text-[#E87B35] font-semibold mt-1">Development mode</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;