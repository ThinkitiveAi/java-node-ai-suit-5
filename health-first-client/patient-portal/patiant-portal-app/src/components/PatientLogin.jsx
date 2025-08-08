import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, ArrowRight, HelpCircle, Lock, AlertCircle } from 'lucide-react';
import AuthCard from './ui/AuthCard';
import EmailInput from './ui/EmailInput';
import PasswordInput from './ui/PasswordInput';

const PatientLogin = ({ onShowRegistration, onForgotPassword, onNeedHelp }) => {
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
    setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock validation
      if (!formData.email || !formData.password) {
        throw new Error('Please fill in all fields');
      }

      // Mock successful login
      console.log('Patient login successful:', formData);
      
      // Here you would typically redirect to the patient dashboard
      // or handle the successful login response
      
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
      title="Patient Portal Login" 
      subtitle="Access your healthcare information securely"
      icon="heart"
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
                <span>Sign In to Patient Portal</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          <div className="flex items-center justify-between text-sm">
            <button
              type="button"
              onClick={onNeedHelp}
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Need Help?</span>
            </button>
            
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
            >
              <Lock className="w-4 h-4" />
              <span>Forgot Password?</span>
            </button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="pt-4 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            New to our patient portal?{' '}
            <button
              type="button"
              onClick={onShowRegistration}
              className="text-primary-600 hover:text-primary-700 font-medium underline"
            >
              Create an account
            </button>
          </p>
        </motion.div>
      </motion.form>
    </AuthCard>
  );
};

export default PatientLogin; 