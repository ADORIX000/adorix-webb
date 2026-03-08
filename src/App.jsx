import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import ScrollToTop from './components/common/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

// Pages
import Home from './pages/pagesonNav/Home';
import Features from './pages/pagesonNav/Features';
import Contact from './pages/pagesonNav/Contact';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Verification from './pages/auth/Verification';
import ForgotPassword from './pages/auth/ForgotPassword';
import Dashboard from './pages/pagesonNav/Dashboard';
import CampaignStudio from './pages/pagesonNav/CampaignStudio';
import Profile from './pages/pagesonNav/Profile';
import Pricing from './pages/pagesonNav/payment/Pricing';
import PaymentMethod from './pages/pagesonNav/payment/PaymentMethod';
import UpgradePlan from './pages/pagesonNav/payment/UpgradePlan';
import Checkout from './pages/pagesonNav/payment/Checkout';

// Settings Pages
import AccountInfo from './pages/settings/AccountInfo';
import Security from './pages/settings/Security';
import Policies from './pages/settings/Policies';
import Help from './pages/settings/Help';
import Feedback from './pages/settings/Feedback';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<MainLayout />}>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify" element={<Verification />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/studio" element={<ProtectedRoute><CampaignStudio /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

            {/* Protected Payment Routes */}
            <Route path="/payment-method" element={<ProtectedRoute><PaymentMethod /></ProtectedRoute>} />
            <Route path="/upgrade/:plan" element={<ProtectedRoute><UpgradePlan /></ProtectedRoute>} />
            <Route path="/checkout/:plan/:method" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />

            {/* Protected Settings Routes */}
            <Route path="/settings/account" element={<ProtectedRoute><AccountInfo /></ProtectedRoute>} />
            <Route path="/settings/security" element={<ProtectedRoute><Security /></ProtectedRoute>} />
            <Route path="/settings/policies" element={<ProtectedRoute><Policies /></ProtectedRoute>} />
            <Route path="/settings/help" element={<ProtectedRoute><Help /></ProtectedRoute>} />
            <Route path="/settings/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;