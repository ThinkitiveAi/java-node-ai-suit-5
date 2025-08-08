import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Heart, 
  Activity, 
  Clock,
  User,
  CheckCircle
} from 'lucide-react';
import TextInput from './TextInput';
import PasswordInput from './PasswordInput';
import Checkbox from './Checkbox';
import Button from './Button';
import Alert from './Alert';

const ProviderLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sslStatus, setSslStatus] = useState('secure');
  const [showCardFlip, setShowCardFlip] = useState(false);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Simulate SSL status changes
  useEffect(() => {
    const sslTimer = setInterval(() => {
      const statuses = ['secure', 'warning', 'danger'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      setSslStatus(randomStatus);
    }, 10000);
    return () => clearInterval(sslTimer);
  }, []);

  const getTimeGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email or phone number is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && 
               !/^[+]?[1-9][\d]{0,15}$/.test(formData.email.replace(/[\s\-()]/g, ''))) {
      newErrors.email = 'Please enter a valid email or phone number';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setShowCardFlip(true);
      setTimeout(() => setShowCardFlip(false), 600);
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      // Demo credentials check
      if (formData.email === 'provider@medicore.com' && formData.password === 'Demo!Pass123') {
        addAlert('success', 'Login Successful', 'Welcome back, Dr. Provider! Redirecting to dashboard...');
        // Simulate redirect
        setTimeout(() => {
          addAlert('info', 'Redirecting', 'Taking you to the provider dashboard...');
        }, 2000);
      } else {
        addAlert('error', 'Authentication Failed', 'Invalid credentials. Please check your email/phone and password.');
        setShowCardFlip(true);
        setTimeout(() => setShowCardFlip(false), 600);
      }
    }, 2000);
  };

  const addAlert = (type, title, message) => {
    const newAlert = {
      id: Date.now(),
      type,
      title,
      message
    };
    setAlerts(prev => [...prev, newAlert]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setAlerts(prev => prev.filter(alert => alert.id !== newAlert.id));
    }, 5000);
  };

  const removeAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0ea5e9 0%, #ffffff 100%)', position: 'relative', overflow: 'hidden' }}>
      {/* Background ECG wave */}
      <div className="ecg-wave-bg" />
      
      {/* Floating medical icons */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <motion.div
          style={{ position: 'absolute', top: '80px', left: '40px', color: 'rgba(15, 118, 110, 0.1)' }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Heart style={{ width: '32px', height: '32px' }} />
        </motion.div>
        <motion.div
          style={{ position: 'absolute', top: '160px', right: '80px', color: 'rgba(16, 185, 129, 0.1)' }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Activity style={{ width: '24px', height: '24px' }} />
        </motion.div>
        <motion.div
          style={{ position: 'absolute', bottom: '160px', left: '80px', color: 'rgba(14, 165, 233, 0.1)' }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Shield style={{ width: '28px', height: '28px' }} />
        </motion.div>
      </div>

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '16px' }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ width: '100%', maxWidth: '448px' }}
        >
          {/* Login Card */}
          <motion.div
            className={`medical-card ${showCardFlip ? 'animate-card-flip' : ''}`}
            style={{ padding: '32px' }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  width: '72px', 
                  height: '72px', 
                  background: 'linear-gradient(135deg, rgba(15, 118, 110, 0.1) 0%, rgba(15, 118, 110, 0.05) 100%)',
                  borderRadius: '50%', 
                  marginBottom: '20px',
                  border: '2px solid rgba(15, 118, 110, 0.1)',
                  boxShadow: '0 8px 16px rgba(15, 118, 110, 0.15)'
                }}
              >
                <Shield style={{ width: '36px', height: '36px', color: '#0f766e' }} />
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{ 
                  fontSize: '28px', 
                  fontWeight: '700', 
                  color: '#111827', 
                  marginBottom: '12px',
                  letterSpacing: '-0.025em'
                }}
              >
                Provider Portal
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{ 
                  color: '#6b7280',
                  fontSize: '16px',
                  lineHeight: '1.5',
                  marginBottom: '16px'
                }}
              >
                {getTimeGreeting()}, Healthcare Professional
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '8px', 
                  padding: '8px 16px',
                  backgroundColor: 'rgba(15, 118, 110, 0.05)',
                  borderRadius: '20px',
                  border: '1px solid rgba(15, 118, 110, 0.1)',
                  width: 'fit-content',
                  margin: '0 auto'
                }}
              >
                <Clock style={{ width: '16px', height: '16px', color: '#0f766e' }} />
                <span style={{ fontSize: '14px', color: '#0f766e', fontWeight: '500' }}>
                  {currentTime.toLocaleTimeString()}
                </span>
              </motion.div>
            </div>

            {/* Alerts */}
            <AnimatePresence>
              {alerts.map((alert) => (
                <Alert
                  key={alert.id}
                  type={alert.type}
                  title={alert.title}
                  message={alert.message}
                  onClose={() => removeAlert(alert.id)}
                  autoClose={true}
                />
              ))}
            </AnimatePresence>

            {/* Login Form */}
            <form onSubmit={handleSubmit} style={{ marginTop: '32px' }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="form-group"
              >
                <TextInput
                  label="Email or Phone"
                  placeholder="Enter your email or phone number"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  error={errors.email}
                  dualMode={true}
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="form-group"
              >
                <PasswordInput
                  label="Password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  error={errors.password}
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}
              >
                <Checkbox
                  label="Remember me"
                  checked={formData.rememberMe}
                  onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                />
                
                <button
                  type="button"
                  style={{ 
                    fontSize: '14px', 
                    color: '#0f766e', 
                    fontWeight: '500',
                    textDecoration: 'none',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#0d9488'}
                  onMouseLeave={(e) => e.target.style.color = '#0f766e'}
                >
                  Forgot password?
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <Button
                  type="submit"
                  loading={loading}
                  fullWidth
                  icon={<User style={{ width: '16px', height: '16px' }} />}
                >
                  {loading ? 'Authenticating...' : 'Sign In'}
                </Button>
              </motion.div>
            </form>

            {/* Security Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              style={{ 
                marginTop: '32px', 
                paddingTop: '24px', 
                borderTop: '1px solid #e5e7eb' 
              }}
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                fontSize: '14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Lock className={`ssl-lock ${sslStatus}`} style={{ width: '16px', height: '16px' }} />
                  <span style={{ color: '#6b7280', fontWeight: '500' }}>
                    {sslStatus === 'secure' ? 'Secure Connection' : 
                     sslStatus === 'warning' ? 'Connection Warning' : 'Connection Issue'}
                  </span>
                </div>
                
                {formData.rememberMe && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#059669' }}>
                    <CheckCircle style={{ width: '16px', height: '16px' }} />
                    <span style={{ fontSize: '12px', fontWeight: '600' }}>Secure Session</span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            style={{ textAlign: 'center', marginTop: '24px' }}
          >
            <div className="hipaa-badge">
              <Shield style={{ width: '12px', height: '12px', marginRight: '4px' }} />
              HIPAA Compliant
            </div>
            
            <p style={{ 
              fontSize: '12px', 
              color: '#9ca3af', 
              marginTop: '8px',
              fontStyle: 'italic'
            }}>
              Protected by enterprise-grade security protocols
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProviderLogin; 