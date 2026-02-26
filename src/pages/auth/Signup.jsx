import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Mail, Lock, Eye, EyeOff,
  ArrowRight, Github, Chrome, Sparkles,
  CheckCircle2, AlertCircle, Info
} from 'lucide-react';
import { handleGoogleLogin } from '../../utils/auth';


const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: 'None' });

  // Password Strength Logic
  useEffect(() => {
    const pwd = formData.password;
    let score = 0;
    if (pwd.length > 5) score++;
    if (pwd.length > 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    const labels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong', 'Unbreakable'];
    setPasswordStrength({
      score: Math.min(score, 5),
      label: labels[score]
    });
  }, [formData.password]);

  const validateField = (name, value) => {
    let error = '';
    if (name === 'fullName') {
      if (!value) error = 'Full name is required';
      else if (value.length < 3) error = 'Name too short';
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) error = 'Email is required';
      else if (!emailRegex.test(value)) error = 'Invalid email format';
    } else if (name === 'password') {
      if (!value) error = 'Password is required';
      else if (value.length < 6) error = 'Minimum 6 characters';
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    setTouched({ fullName: true, email: true, password: true });

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        navigate('/verify');
      }, 1500);
    }
  };

  const shakeAnimation = {
    x: [0, -5, 5, -5, 5, 0],
    transition: { duration: 0.4 }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-white flex items-center justify-center px-6 pt-24 pb-12">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-adorix-primary/5 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-adorix-accent/5 rounded-full blur-[120px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[500px] bg-white rounded-[2rem] border border-gray-100 shadow-2xl relative z-10 overflow-hidden flex flex-col"
      >
        {/* Centered Form */}
        <div className="p-8 md:p-12 lg:p-14 w-full">
          <div className="max-w-md mx-auto">
            <div className="mb-10 text-center">
              <h1 className="text-4xl font-black text-adorix-dark mb-4 tracking-tight">Create account</h1>
              <p className="text-gray-500 font-medium">
                Already have an account? <Link to="/login" className="text-adorix-primary font-black hover:underline">Sign in</Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <motion.div animate={errors.fullName ? shakeAnimation : {}} className="space-y-2">
                <label className={`text-xs font-black uppercase tracking-[0.2em] ml-2 flex items-center gap-2 transition-colors ${errors.fullName ? 'text-red-500' : 'text-adorix-dark'}`}>
                  <User className="w-3 h-3" /> Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Alex Morgan"
                  className={`w-full bg-gray-50 border-2 rounded-[2rem] px-8 py-4.5 outline-none transition-all font-bold text-adorix-dark ${errors.fullName ? 'border-red-500 focus:bg-red-50/10' : 'border-transparent focus:border-adorix-primary focus:bg-white'}`}
                />
                <AnimatePresence>
                  {errors.fullName && (
                    <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-xs text-red-500 font-bold ml-4 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.fullName}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Email */}
              <motion.div animate={errors.email ? shakeAnimation : {}} className="space-y-2">
                <label className={`text-xs font-black uppercase tracking-[0.2em] ml-2 flex items-center gap-2 transition-colors ${errors.email ? 'text-red-500' : 'text-adorix-dark'}`}>
                  <Mail className="w-3 h-3" /> Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="alex@example.com"
                  className={`w-full bg-gray-50 border-2 rounded-[2rem] px-8 py-4.5 outline-none transition-all font-bold text-adorix-dark ${errors.email ? 'border-red-500 focus:bg-red-50/10' : 'border-transparent focus:border-adorix-primary focus:bg-white'}`}
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-xs text-red-500 font-bold ml-4 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Password */}
              <motion.div animate={errors.password ? shakeAnimation : {}} className="space-y-2">
                <label className={`text-xs font-black uppercase tracking-[0.2em] ml-2 flex items-center justify-between transition-colors ${errors.password ? 'text-red-500' : 'text-adorix-dark'}`}>
                  <span className="flex items-center gap-2"><Lock className="w-3 h-3" /> Password</span>
                  {formData.password && (
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${passwordStrength.score <= 1 ? 'bg-red-100 text-red-600' :
                      passwordStrength.score <= 3 ? 'bg-amber-100 text-amber-600' :
                        'bg-emerald-100 text-emerald-600'
                      }`}>
                      {passwordStrength.label}
                    </span>
                  )}
                </label>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="Create strong password"
                    className={`w-full bg-gray-50 border-2 rounded-[2rem] px-8 py-4.5 outline-none transition-all font-bold text-adorix-dark pr-16 ${errors.password ? 'border-red-500 focus:bg-red-50/10' : 'border-transparent focus:border-adorix-primary focus:bg-white'}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-adorix-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Strength Meter */}
                {formData.password && (
                  <div className="flex gap-1.5 px-6 mt-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div
                        key={s}
                        className={`h-1 flex-1 rounded-full transition-all duration-500 ${s <= passwordStrength.score
                          ? (passwordStrength.score <= 1 ? 'bg-red-500' : passwordStrength.score <= 3 ? 'bg-amber-500' : 'bg-emerald-500')
                          : 'bg-gray-100'
                          }`}
                      />
                    ))}
                  </div>
                )}

                <AnimatePresence>
                  {errors.password && (
                    <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-xs text-red-500 font-bold ml-4 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.password}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-adorix-dark text-white rounded-[2rem] font-black text-lg shadow-xl shadow-adorix-dark/20 hover:bg-adorix-primary transition-all flex items-center justify-center gap-3 group active:scale-[0.98] disabled:opacity-70 mt-4 overflow-hidden relative"
              >
                {isSubmitting ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                    <Sparkles className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <>
                    Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-[-20deg]" />
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100" /></div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em] font-black text-gray-400">
                <span className="bg-white/40 backdrop-blur-xl px-4 uppercase">or join with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-3 py-3.5 bg-white border-2 border-gray-100 rounded-2xl font-black text-sm hover:border-adorix-primary hover:bg-adorix-primary/5 transition-all text-adorix-dark active:scale-[0.98]"
              >
                <Chrome className="w-5 h-5" /> Google
              </button>

              <button className="flex items-center justify-center gap-3 py-3.5 bg-white border-2 border-gray-100 rounded-2xl font-black text-sm hover:border-adorix-primary hover:bg-adorix-primary/5 transition-all text-adorix-dark active:scale-[0.98]">
                <Github className="w-5 h-5" /> Github
              </button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-3 text-gray-400 p-4 bg-gray-50/50 rounded-2xl border border-dashed border-gray-100">
              <Info className="w-4 h-4 text-adorix-primary" />
              <p className="text-[9px] font-bold uppercase tracking-widest leading-relaxed">
                By joining, you agree to our <Link to="/policies" className="text-adorix-dark hover:underline">Terms</Link> & <Link to="/policies" className="text-adorix-dark hover:underline">Privacy</Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;