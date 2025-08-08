import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, ArrowRight, ArrowLeft, CheckCircle, AlertCircle, 
  Shield, Loader2, Send
} from 'lucide-react';
import AuthCard from './ui/AuthCard';
import EmailInput from './ui/EmailInput';

const ForgotPassword = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (!email.trim()) {
        throw new Error('Please enter your email address');
      }

      // Mock successful password reset request
      console.log('Password reset requested for:', email);
      setIsSubmitted(true);
      
    } catch (err) {
      setError(err.message || 'Failed to send reset email. Please try again.');
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

  if (isSubmitted) {
    return (
      <AuthCard 
        title="Check Your Email" 
        subtitle="We've sent you a password reset link"
        icon="shield"
      >
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.div variants={itemVariants} className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Reset Link Sent
            </h2>
            <p className="text-gray-600">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">What happens next?</p>
                <ul className="space-y-1 text-blue-700">
                  <li>• Check your email inbox (and spam folder)</li>
                  <li>• Click the reset link in the email</li>
                  <li>• Create a new password</li>
                  <li>• Sign in with your new password</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-3">
            <button
              type="button"
              onClick={() => setEmail('')}
              className="btn-secondary"
            >
              Send to a different email
            </button>
            
            <button
              type="button"
              onClick={onBack}
              className="w-full flex items-center justify-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login</span>
            </button>
          </motion.div>
        </motion.div>
      </AuthCard>
    );
  }

  return (
    <AuthCard 
      title="Forgot Password" 
      subtitle="Enter your email to receive a reset link"
      icon="shield"
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
            validation={{ required: true }}
            smokyHover={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="Enter your email address"
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
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Sending Reset Link...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Send Reset Link</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onBack}
            className="w-full flex items-center justify-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Login</span>
          </button>
        </motion.div>

        <motion.div variants={itemVariants} className="pt-4 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            Remember your password?{' '}
            <button
              type="button"
              onClick={onBack}
              className="text-primary-600 hover:text-primary-700 font-medium underline"
            >
              Sign in here
            </button>
          </p>
        </motion.div>
      </motion.form>
    </AuthCard>
  );
};

export default ForgotPassword; 