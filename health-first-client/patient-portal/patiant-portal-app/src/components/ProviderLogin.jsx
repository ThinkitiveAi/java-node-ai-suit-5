import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, ArrowRight, HelpCircle, Lock, AlertCircle } from 'lucide-react';
import AuthCard from './ui/AuthCard';
import EmailInput from './ui/EmailInput';
import PasswordInput from './ui/PasswordInput';

const ProviderLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const emailValidationRules = {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (!formData.email || !formData.password) {
        throw new Error('Please fill in all fields');
      }

      console.log('Provider login successful:', formData);
      
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <AuthCard 
      title="Provider Portal Login" 
      subtitle="Access your healthcare provider dashboard securely"
      icon="user"
    >
      <motion.form 
        onSubmit={handleSubmit}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={itemVariants}>
          <EmailInput
            autoComplete="email"
            validation={emailValidationRules}
            smokyHover={true}
            value={formData.email}
            onChange={handleInputChange}
            name="email"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <PasswordInput
            autoComplete="current-password"
            showToggle={true}
            strengthMeter={false}
            value={formData.password}
            onChange={handleInputChange}
            name="password"
          />
        </motion.div>

        {error && (
          <motion.div 
            variants={itemVariants}
            className="p-3 bg-red-50 border border-red-200 rounded-lg"
          >
            <div className="flex items-center text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 mr-2" />
              {error}
            </div>
          </motion.div>
        )}

        <motion.div variants={itemVariants} className="space-y-4">
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                <span>Sign In to Provider Portal</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          <div className="flex items-center justify-between text-sm">
            <button
              type="button"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Need Help?</span>
            </button>
            
            <button
              type="button"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
            >
              <Lock className="w-4 h-4" />
              <span>Forgot Password?</span>
            </button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="pt-4 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            New provider?{' '}
            <button
              type="button"
              className="text-primary-600 hover:text-primary-700 font-medium underline"
            >
              Request access
            </button>
          </p>
        </motion.div>
      </motion.form>
    </AuthCard>
  );
};

export default ProviderLogin; 