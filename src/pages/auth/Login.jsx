import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Github, Chrome, Sparkles, ShieldCheck } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsSubmitting(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-white flex items-center justify-center px-6">
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
        className="w-full max-w-[1100px] grid lg:grid-cols-2 bg-white/40 backdrop-blur-2xl rounded-[3rem] border border-white/40 shadow-2xl relative z-10 overflow-hidden"
      >
        {/* Left Side: Brand/Visual */}
        <div className="hidden lg:flex relative bg-adorix-dark p-16 flex-col justify-between overflow-hidden">
          <div className="relative z-10">
            <Link to="/" className="text-3xl font-black text-white tracking-tighter flex items-center gap-3 mb-16">
              <div className="w-10 h-10 bg-adorix-primary rounded-xl flex items-center justify-center">A</div>
              ADORIX
            </Link>

            <h2 className="text-5xl font-black text-white leading-tight mb-8">
              Experience the <br />
              <span className="text-adorix-primary">AI revolution.</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-sm leading-relaxed">
              Step into the future of interactive display intelligence. Your portal to the Adorix ecosystem awaits.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-8">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-adorix-dark overflow-hidden bg-gray-800">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="User" />
                </div>
              ))}
            </div>
            <p className="text-sm font-bold text-gray-400">Join 10k+ advertisers</p>
          </div>

          {/* Decorative mesh */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#0D8A9E,transparent)]" />
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 md:p-16 lg:p-20">
          <div className="max-w-md mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl font-black text-adorix-dark mb-4 tracking-tight">Welcome back</h1>
              <p className="text-gray-500 font-medium">
                New to Adorix? <Link to="/signup" className="text-adorix-primary font-black hover:underline">Create an account</Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-adorix-dark uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                  <Mail className="w-3 h-3 text-adorix-primary" /> Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full bg-gray-50 border-2 border-transparent rounded-[2rem] px-8 py-5 outline-none focus:border-adorix-primary focus:bg-white transition-all font-bold text-adorix-dark"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-2">
                  <label className="text-xs font-black text-adorix-dark uppercase tracking-[0.2em] flex items-center gap-2">
                    <Lock className="w-3 h-3 text-adorix-primary" /> Password
                  </label>
                  <Link to="#" className="text-xs font-black text-adorix-secondary hover:text-adorix-primary transition-colors uppercase tracking-widest">Forgot?</Link>
                </div>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-gray-50 border-2 border-transparent rounded-[2rem] px-8 py-5 outline-none focus:border-adorix-primary focus:bg-white transition-all font-bold text-adorix-dark pr-16"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-adorix-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-6 bg-adorix-dark text-white rounded-[2rem] font-black text-lg shadow-xl shadow-adorix-dark/20 hover:bg-adorix-primary transition-all flex items-center justify-center gap-3 group active:scale-[0.98] disabled:opacity-70"
              >
                {isSubmitting ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                    <Sparkles className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <>
                    Sign In <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="relative my-12">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100" /></div>
              <div className="relative flex justify-center text-xs uppercase tracking-[0.3em] font-black text-gray-400">
                <span className="bg-white/40 backdrop-blur-xl px-4 uppercase">or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-4 bg-white border-2 border-gray-100 rounded-2xl font-black text-sm hover:border-adorix-primary hover:bg-adorix-primary/5 transition-all text-adorix-dark active:scale-[0.98]">
                <Chrome className="w-5 h-5" /> Google
              </button>
              <button className="flex items-center justify-center gap-3 py-4 bg-white border-2 border-gray-100 rounded-2xl font-black text-sm hover:border-adorix-primary hover:bg-adorix-primary/5 transition-all text-adorix-dark active:scale-[0.98]">
                <Github className="w-5 h-5" /> Github
              </button>
            </div>

            <p className="mt-12 text-center text-xs text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
              By continuing, you agree to our <br />
              <Link to="/settings/policies" className="text-adorix-dark hover:text-adorix-primary underline underline-offset-4">Terms</Link> & <Link to="/settings/policies" className="text-adorix-dark hover:text-adorix-primary underline underline-offset-4">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;