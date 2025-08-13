import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Phone,
  CheckCircle,
  AlertCircle,
  Loader2,
  UserPlus,
  ShieldCheck
} from 'lucide-react';
import Button from '../ui/Button';
import TextField from '../ui/TextField';

interface LoginFormProps {
  onLoginSuccess: () => void;
  onBackToLogin: () => void;
  onGuestLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess, onBackToLogin, onGuestLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const validateField = (name: string, value: string) => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    const fieldValue = name === 'rememberMe' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    // Real-time validation
    if (name !== 'rememberMe') {
      const error = validateField(name, fieldValue as string);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'rememberMe') {
        const error = validateField(key, formData[key as keyof typeof formData] as string);
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

    } catch (error: any) {
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
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            y: [-8, 8, -8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-teal-200/30 rounded-full blur-xl"
        />
        <motion.div 
          animate={{ 
            y: [8, -8, 8],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-teal-200/20 to-blue-200/20 rounded-full blur-xl"
        />
        <motion.div 
          animate={{ 
            y: [-4, 4, -4],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-1/2 right-1/4 w-20 h-20 bg-gradient-to-br from-blue-300/40 to-purple-300/40 rounded-full blur-lg"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative"
      >
        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-8 relative overflow-hidden"
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/40 to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center mb-8"
            >
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl mb-4 shadow-lg"
              >
                <Heart className="h-8 w-8 text-white" />
              </motion.div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                Provider Portal
              </h1>
              <p className="text-slate-600 text-sm">
                Secure access to your healthcare dashboard
              </p>
            </motion.div>

            {/* Status Messages */}
            <AnimatePresence>
              {loginStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center space-x-3"
                >
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  <span className="text-emerald-800 text-sm font-medium">
                    Login successful! Redirecting...
                  </span>
                </motion.div>
              )}

              {loginStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3"
                >
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <span className="text-red-800 text-sm font-medium">
                    {errorMessage}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <motion.form 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onSubmit={handleSubmit} 
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="relative">
                  <TextField
                    label="Email or Phone"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    fullWidth
                    className="transition-all duration-200"
                  />
                  <div className="absolute right-3 top-3 pointer-events-none">
                    {formData.email.includes('@') ? 
                      <Mail className="h-4 w-4 text-slate-400" /> : 
                      <Phone className="h-4 w-4 text-slate-400" />
                    }
                  </div>
                </div>

                <div className="relative">
                  <TextField
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    error={!!errors.password}
                    helperText={errors.password}
                    fullWidth
                  />
                  <div className="absolute right-3 top-3 flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-1 rounded-md hover:bg-slate-100 transition-colors"
                    >
                      {showPassword ? 
                        <EyeOff className="h-4 w-4 text-slate-400" /> : 
                        <Eye className="h-4 w-4 text-slate-400" />
                      }
                    </button>
                    <Lock className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-600">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <motion.div whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={!isFormValid() || isLoading}
                  fullWidth
                  className="h-12 text-base font-semibold relative overflow-hidden"
                >
                  {isLoading ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center space-x-2"
                    >
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Signing in...</span>
                    </motion.div>
                  ) : (
                    <motion.span
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                    >
                      Sign In
                    </motion.span>
                  )}
                </Button>
              </motion.div>
            </motion.form>

            {/* Divider */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="my-6"
            >
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-slate-500">OR</span>
                </div>
              </div>
            </motion.div>

            {/* Guest Login */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <motion.div whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outlined"
                  onClick={onGuestLogin}
                  fullWidth
                  className="h-11 border-2 border-slate-200 hover:border-slate-300 transition-all duration-200"
                  startIcon={<ShieldCheck className="h-4 w-4" />}
                >
                  Continue as Guest
                </Button>
              </motion.div>
            </motion.div>

            {/* Footer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 text-center space-y-3"
            >
              <p className="text-xs text-slate-500">
                Need help? Contact{' '}
                <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                  technical support
                </button>
              </p>
              <div className="flex items-center justify-center space-x-1 text-sm">
                <span className="text-slate-600">Don't have an account?</span>
                <button
                  onClick={onBackToLogin}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors inline-flex items-center space-x-1"
                >
                  <UserPlus className="h-3 w-3" />
                  <span>Register here</span>
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Demo credentials hint */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-6 p-4 bg-blue-50/80 backdrop-blur-sm rounded-xl border border-blue-200/50"
        >
          <div className="text-center">
            <p className="text-xs text-blue-700 font-medium mb-1">Demo Credentials</p>
            <p className="text-xs text-blue-600">doctor@healthcare.com / password123</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginForm; 