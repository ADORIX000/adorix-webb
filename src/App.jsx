import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/navbar';
import GradientWrapper from './components/layout/GradientWrapper';

// Pages
import Home from './pages/public/Home';
import Contact from './pages/public/Contact';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Verification from './pages/auth/Verification';
import AudienceInsights from './pages/dashboard/AudienceInsights';
import CampaignStudio from './pages/dashboard/CampaignStudio';
import VirtualPage from './pages/dashboard/VirtualPage';
import Profile from './pages/dashboard/Profile';
import Pricing from './pages/payment/Pricing';
import PaymentMethod from './pages/payment/PaymentMethod';

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
          <Route path="/dashboard" element={<AudienceInsights />} />
          <Route path="/dashboard/studio" element={<CampaignStudio />} />
          <Route path="/dashboard/virtual" element={<VirtualPage />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* Payment */}
          <Route path="/payment-method" element={<PaymentMethod />} />
        </Routes>
      </GradientWrapper>
    </Router>
  );
}

export default App;