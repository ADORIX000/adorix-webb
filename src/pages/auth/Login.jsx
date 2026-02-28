import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!form.password) {
      newErrors.password = 'Password is required.';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Handle standard login logic here
    navigate('/dashboard');
  };

  // Google Login Functionality
  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log('Google Login Success:', tokenResponse);
      // Here you would typically send tokenResponse.access_token to your backend
      navigate('/dashboard');
    },
    onError: (error) => console.log('Google Login Failed:', error),
  });

  return (
    <div className="pt-28 pb-24 flex justify-center items-center min-h-[80vh]">
      <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md">
        <h2 className="text-3xl font-bold text-adorix-dark mb-2">Welcome back</h2>
        <p className="text-gray-500 mb-8">Sign in to your Adorix dashboard</p>

        <form onSubmit={handleLogin} className="space-y-5" noValidate>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              autoFocus
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-adorix-primary focus:outline-none transition ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
              placeholder="you@example.com"
            />
            <AnimatePresence>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 4 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  aria-live="assertive"
                  className="text-red-500 text-xs overflow-hidden"
                >
                  {errors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <Link to="#" className="text-xs text-adorix-primary font-medium hover:underline">Forgot password?</Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-adorix-primary focus:outline-none transition pr-10 ${errors.password ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            <AnimatePresence>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 4 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  aria-live="assertive"
                  className="text-red-500 text-xs overflow-hidden"
                >
                  {errors.password}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 pt-1">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-400 font-medium">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google Sign In - NOW FUNCTIONAL */}
          <button
            type="button"
            onClick={() => googleLogin()}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 active:bg-gray-100 transition font-semibold text-gray-700 bg-white shadow-sm"
          >
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          {/* Submit */}
          <button type="submit" className="w-full bg-adorix-dark hover:bg-adorix-primary text-white font-bold py-3 rounded-lg transition shadow-md">
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-adorix-primary font-semibold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;