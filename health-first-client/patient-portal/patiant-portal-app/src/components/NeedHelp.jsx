import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HelpCircle, ArrowLeft, Phone, Mail, MessageCircle, 
  Clock, Shield, Users, FileText, AlertCircle
} from 'lucide-react';
import AuthCard from './ui/AuthCard';
import EmailInput from './ui/EmailInput';
import TextInput from './ui/TextInput';

const NeedHelp = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [selectedTopic, setSelectedTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const helpTopics = [
    {
      id: 'login',
      title: 'Login Issues',
      description: 'Having trouble signing in to your account',
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: 'registration',
      title: 'Account Registration',
      description: 'Need help creating a new account',
      icon: <Users className="w-5 h-5" />
    },
    {
      id: 'password',
      title: 'Password Reset',
      description: 'Forgot your password or need to reset it',
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: 'technical',
      title: 'Technical Support',
      description: 'Experiencing technical difficulties',
      icon: <HelpCircle className="w-5 h-5" />
    },
    {
      id: 'billing',
      title: 'Billing & Payments',
      description: 'Questions about charges or payment methods',
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 'other',
      title: 'Other',
      description: 'Something else not listed above',
      icon: <HelpCircle className="w-5 h-5" />
    }
  ];

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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error('Please fill in all required fields');
      }

      // Mock successful help request
      console.log('Help request submitted:', { ...formData, topic: selectedTopic });
      setIsSubmitted(true);
      
    } catch (err) {
      setError(err.message || 'Failed to submit help request. Please try again.');
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
        title="Help Request Sent" 
        subtitle="We'll get back to you within 24 hours"
        icon="help"
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
                <HelpCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Thank You!
            </h2>
            <p className="text-gray-600">
              We've received your help request and will respond within 24 hours.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">What happens next?</p>
                <ul className="space-y-1 text-blue-700">
                  <li>• You'll receive a confirmation email</li>
                  <li>• Our support team will review your request</li>
                  <li>• We'll respond within 24 hours</li>
                  <li>• For urgent issues, call our support line</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-3">
            <button
              type="button"
              onClick={() => {
                setFormData({ name: '', email: '', subject: '', message: '' });
                setSelectedTopic('');
                setIsSubmitted(false);
              }}
              className="btn-secondary"
            >
              Submit Another Request
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
      title="Need Help?" 
      subtitle="We're here to help you with any issues"
      icon="help"
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Quick Contact Options */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Quick Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-900">Phone Support</p>
                  <p className="text-sm text-blue-700">1-800-HEALTH-1</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">Email Support</p>
                  <p className="text-sm text-green-700">support@healthfirst.com</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Help Topics */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">What can we help you with?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {helpTopics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={`p-3 text-left rounded-lg border transition-all duration-200 ${
                  selectedTopic === topic.id
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-primary-25'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-primary-600">
                    {topic.icon}
                  </div>
                  <div>
                    <p className="font-medium">{topic.title}</p>
                    <p className="text-sm text-gray-600">{topic.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Send us a message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="Your Name*"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required={true}
              />
              <EmailInput
                autoComplete="email"
                validation={{ required: true }}
                value={formData.email}
                onChange={handleInputChange}
                name="email"
                placeholder="Your email address"
              />
            </div>

            <TextInput
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Brief description of your issue"
            />

            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message*
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Please describe your issue in detail..."
                className="input-field min-h-[120px] resize-none"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {error}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5" />
                    <span>Send Message</span>
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
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AuthCard>
  );
};

export default NeedHelp; 