import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/navbar';
import GradientWrapper from './components/layout/GradientWrapper';

// Pages
import Home from './pages/pagesonNav/Home';
import Contact from './pages/pagesonNav/Contact';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Verification from './pages/auth/Verification';
import Dashboard from './pages/pagesonNav/Dashboard';
import CampaignStudio from './pages/pagesonNav/CampaignStudio';
import Profile from './pages/pagesonNav/Profile';
import Pricing from './pages/pagesonNav/payment/Pricing';
import PaymentMethod from './pages/pagesonNav/payment/PaymentMethod';

// New Settings Pages (Ensure these files exist in src/pages/settings/)
import AccountInfo from './pages/settings/AccountInfo';
import Security from './pages/settings/Security';
import Policies from './pages/settings/Policies';
import Help from './pages/settings/Help';
import Feedback from './pages/settings/Feedback';

function App() {
  return (
    <Router>
      <GradientWrapper>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<Verification />} />

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/studio" element={<CampaignStudio />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* Payment */}
          <Route path="/payment-method" element={<PaymentMethod />} />

          {/* Settings Module Routes */}
          <Route path="/settings/account" element={<AccountInfo />} />
          <Route path="/settings/security" element={<Security />} />
          <Route path="/settings/policies" element={<Policies />} />
          <Route path="/settings/help" element={<Help />} />
          <Route path="/settings/feedback" element={<Feedback />} />
          
        </Routes>
      </GradientWrapper>
    </Router>
  );
}

export default App;