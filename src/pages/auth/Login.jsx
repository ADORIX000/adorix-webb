import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      navigate('/dashboard');
    }
  };

  const handleGoogleSignIn = () => {
    // In a real app, this triggers Google OAuth
    // Google will handle showing the user's own accounts
    console.log('Redirecting to Google OAuth...');
    // window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
    
    // For demo purposes, redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="auth-container">
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="auth-header">
          <h1 className="auth-title">Sign in</h1>
          <p className="auth-subtitle">
            or{' '}
            <Link to="/signup" className="auth-link">
              create an account
            </Link>
          </p>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-checkbox">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember">Remember me</label>
          </div>

          <motion.button
            type="submit"
            className="btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign in
          </motion.button>
        </form>

        {/* Google Sign In */}
        <div className="divider">
          or
        </div>

        <motion.button
          type="button"
          className="btn-google"
          onClick={handleGoogleSignIn}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg viewBox="0 0 24 24" className="google-icon">
            <text x="12" y="16" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#4285F4">G</text>
          </svg>
          Sign in with Google
        </motion.button>

        {/* Footer Links */}
        <div className="auth-footer">
          <Link to="#" className="footer-link">
            Forgotten your password?
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;