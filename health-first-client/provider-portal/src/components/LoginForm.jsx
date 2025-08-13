import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock,
  Phone,
  AlertCircle,
  CheckCircle,
  User,
  Hospital
} from 'lucide-react';
import Button from '../ui/Button';
import TextField from '../ui/TextField';

const LoginForm = ({ onLoginSuccess, onBackToLogin, onGuestLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!value) return 'Email is required';
        if (!validateEmail(value) && !validatePhone(value)) {
          return 'Please enter a valid email or phone number';
        }
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (!validatePassword(value)) {
          return 'Password must be at least 6 characters long';
        }
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    const fieldValue = name === 'rememberMe' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    // Real-time validation
    if (name !== 'rememberMe') {
      const error = validateField(name, fieldValue);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'rememberMe') {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setLoginStatus(null);
    setErrorMessage('');

    // Mock login with specific credentials
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock credentials check
      if (formData.email === 'doctor@healthcare.com' && formData.password === 'password123') {
        setLoginStatus('success');
        setTimeout(() => {
          onLoginSuccess();
        }, 1500);
      } else {
        throw new Error('Invalid email or password');
      }

    } catch (error) {
      setLoginStatus('error');
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    return formData.email && formData.password && 
           !errors.email && !errors.password;
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
      className="glass rounded-xl p-6 sm:p-8 max-w-md w-full mx-auto shadow-2xl"
    >
      {/* Header */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <motion.div 
          className="mb-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Hospital className="w-16 h-16 mx-auto text-primary drop-shadow-lg" />
        </motion.div>
        
        <motion.h1 
          className="text-3xl font-bold bg-gradient-to-r from-primary to-teal bg-clip-text text-transparent mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Provider Portal
        </motion.h1>
        
        <motion.p 
          className="text-slate-600"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Sign in to access your healthcare dashboard
        </motion.p>
      </motion.div>

      {/* Status Messages */}
      <AnimatePresence>
        {loginStatus === 'success' && (
          <motion.div 
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">
              Login successful! Redirecting to dashboard...
            </span>
          </motion.div>
        )}

        {loginStatus === 'error' && (
          <motion.div 
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-800 font-medium">{errorMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Form */}
      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="relative">
          <TextField
            fullWidth
            label="Email or Phone Number"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
            className="pl-12"
          />
          <div className="absolute left-3 top-9 pointer-events-none">
            {formData.email.includes('@') ? 
              <Mail className="w-5 h-5 text-slate-400" /> : 
              <Phone className="w-5 h-5 text-slate-400" />
            }
          </div>
        </div>

        <div className="relative">
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange}
            error={!!errors.password}
            helperText={errors.password}
            className="pl-12 pr-12"
          />
          <div className="absolute left-3 top-9 pointer-events-none">
            <Lock className="w-5 h-5 text-slate-400" />
          </div>
          <button
            type="button"
            className="absolute right-3 top-9 text-slate-400 hover:text-slate-600 transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary focus:ring-2"
            />
            Remember me
          </label>
          <button
            type="button"
            className="text-sm text-primary hover:underline font-medium transition-colors"
          >
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={!isFormValid() || isLoading}
          className="h-12 text-lg font-semibold"
        >
          {isLoading ? (
            <motion.div 
              className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          ) : (
            'Sign In'
          )}
        </Button>
      </motion.form>

      {/* Guest Login Section */}
      <motion.div 
        className="mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-slate-500">OR</span>
          </div>
        </div>
        
        <div className="mt-6">
          <Button
            fullWidth
            variant="outlined"
            onClick={onGuestLogin}
            startIcon={<User className="w-5 h-5" />}
            className="h-12 text-primary border-primary hover:bg-primary/5"
          >
            Continue as Guest
          </Button>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div 
        className="mt-8 text-center space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <p className="text-sm text-slate-600">
          Need help? Contact{' '}
          <button className="text-primary hover:underline font-medium">
            technical support
          </button>
        </p>
        <p className="text-sm text-slate-600">
          Don't have an account?{' '}
          <button
            onClick={onBackToLogin}
            className="text-primary hover:underline font-medium"
          >
            Register here
          </button>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default LoginForm; 