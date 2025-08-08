import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Shield, MapPin, Phone, CreditCard, ClipboardList, 
  ArrowRight, CheckCircle, AlertCircle, Loader2, ArrowLeft,
  Eye, EyeOff, Calendar, Mail, Lock, Heart
} from 'lucide-react';
import FormCard from './ui/FormCard';
import Section from './ui/Section';
import DoubleInputGrid from './ui/DoubleInputGrid';
import TextInput from './ui/TextInput';
import EmailInput from './ui/EmailInput';
import PhoneInput from './ui/PhoneInput';
import DatePicker from './ui/DatePicker';
import GenderSelect from './ui/GenderSelect';
import PasswordStrengthMeter from './ui/PasswordStrengthMeter';
import PasswordInput from './ui/PasswordInput';
import AddressInputs from './ui/AddressInputs';

const PatientRegistration = ({ onBack }) => {
  const [formData, setFormData] = useState({
    // Personal Information
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
    confirm_password: '',
    date_of_birth: '',
    gender: '',
    
    // Address
    street: '',
    city: '',
    state: '',
    zip: '',
    
    // Emergency Contact (optional)
    emergency_name: '',
    emergency_phone: '',
    emergency_relationship: '',
    
    // Insurance Info (optional)
    insurance_provider: '',
    policy_number: '',
    
    // Medical History (optional)
    medical_history: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);



  // Validation rules
  const validationRules = {
    first_name: {
      required: true,
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-Z\s'-]+$/
    },
    last_name: {
      required: true,
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-Z\s'-]+$/
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    phone_number: {
      required: true,
      pattern: /^\+?[\d\s\-\(\)]{10,}$/
    },
    password: {
      required: true,
      minLength: 8,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    },
    confirm_password: {
      required: true,
      match: 'password'
    },
    date_of_birth: {
      required: true,
      pastDate: true,
      minAge: 13
    },
    street: {
      required: true,
      maxLength: 200
    },
    city: {
      required: true,
      maxLength: 100
    },
    state: {
      required: true,
      maxLength: 50
    },
    zip: {
      required: true,
      pattern: /^\d{5}(-\d{4})?$/
    },
    emergency_name: {
      maxLength: 100
    },
    emergency_phone: {
      pattern: /^\+?[\d\s\-\(\)]{10,}$/
    },
    emergency_relationship: {
      maxLength: 50
    }
  };

  // Validation functions
  const validateField = (name, value) => {
    const rules = validationRules[name];
    if (!rules) return '';

    // Required field validation
    if (rules.required && !value.trim()) {
      return `${name.replace('_', ' ')} is required`;
    }

    // Min length validation
    if (rules.minLength && value.length < rules.minLength) {
      return `${name.replace('_', ' ')} must be at least ${rules.minLength} characters`;
    }

    // Max length validation
    if (rules.maxLength && value.length > rules.maxLength) {
      return `${name.replace('_', ' ')} must be no more than ${rules.maxLength} characters`;
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value)) {
      switch (name) {
        case 'email':
          return 'Please enter a valid email address';
        case 'phone_number':
        case 'emergency_phone':
          return 'Please enter a valid phone number';
        case 'zip':
          return 'Please enter a valid ZIP code';
        case 'password':
          return 'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character';
        case 'first_name':
        case 'last_name':
          return 'Please enter a valid name (letters, spaces, hyphens, and apostrophes only)';
        default:
          return 'Please enter a valid value';
      }
    }

    // Password confirmation validation
    if (name === 'confirm_password' && value !== formData.password) {
      return 'Passwords do not match';
    }

    // Date validation
    if (name === 'date_of_birth' && value) {
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age < 13) {
        return 'You must be at least 13 years old to register';
      }

      if (birthDate > today) {
        return 'Date of birth cannot be in the future';
      }
    }

    return '';
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => {
    // Check if all required fields are filled
    const requiredFields = [
      'first_name', 'last_name', 'email', 'phone_number', 
      'password', 'confirm_password', 'date_of_birth',
      'street', 'city', 'state', 'zip'
    ];
    
    // Check if all required fields have values
    const allFieldsFilled = requiredFields.every(field => 
      formData[field] && formData[field].trim() !== ''
    );
    
    if (!allFieldsFilled) {
      return false;
    }
    
    // Check if there are any validation errors
    if (Object.keys(errors).length > 0) {
      return false;
    }
    
    return true;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = value.trim();
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle field blur for validation
  const handleFieldBlur = (name) => {
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, formData[name]);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Sanitize data before submission
      const sanitizedData = Object.keys(formData).reduce((acc, key) => {
        acc[key] = typeof formData[key] === 'string' ? formData[key].trim() : formData[key];
        return acc;
      }, {});

      console.log('Registration successful:', sanitizedData);
      setIsSubmitted(true);
      
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
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

  // Success state
  if (isSubmitted) {
    return (
      <FormCard 
        title="Registration Successful!" 
        subtitle="Welcome to HealthFirst Patient Portal"
        icon="heart"
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
              Account Created Successfully
            </h2>
            <p className="text-gray-600">
              Your patient portal account has been created. You can now sign in to access your health services.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Next Steps:</p>
                <ul className="space-y-1 text-blue-700">
                  <li>• Check your email for verification</li>
                  <li>• Sign in to your new account</li>
                  <li>• Complete your health profile</li>
                  <li>• Schedule your first appointment</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-3">
            <button
              type="button"
              onClick={onBack}
              className="btn-primary flex items-center justify-center space-x-2"
            >
              <ArrowRight className="w-5 h-5" />
              <span>Continue to Login</span>
            </button>
          </motion.div>
        </motion.div>
      </FormCard>
    );
  }

  return (
    <FormCard 
      title="Patient Registration" 
      subtitle="Create your secure patient portal account"
      icon="clipboard"
    >
      {/* Back Button */}
      <div className="absolute top-4 left-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Login</span>
        </button>
      </div>

      <motion.form 
        onSubmit={handleSubmit}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Personal Information Section */}
        <Section title="Personal Information" icon={<User className="w-6 h-6" />}>
          <motion.div variants={itemVariants} className="space-y-4">
            <DoubleInputGrid>
              <div className="space-y-2">
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                  First Name*
                </label>
                <div className="relative">
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    onBlur={() => handleFieldBlur('first_name')}
                    placeholder="Enter your first name"
                    className={`input-field ${errors.first_name && touched.first_name ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                    required
                    maxLength={50}
                  />
                  {errors.first_name && touched.first_name && (
                    <p className="text-sm text-red-600 mt-1">{errors.first_name}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                  Last Name*
                </label>
                <div className="relative">
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    onBlur={() => handleFieldBlur('last_name')}
                    placeholder="Enter your last name"
                    className={`input-field ${errors.last_name && touched.last_name ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                    required
                    maxLength={50}
                  />
                  {errors.last_name && touched.last_name && (
                    <p className="text-sm text-red-600 mt-1">{errors.last_name}</p>
                  )}
                </div>
              </div>
            </DoubleInputGrid>
            
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={() => handleFieldBlur('email')}
                  placeholder="Enter your email address"
                  className={`input-field pl-10 ${errors.email && touched.email ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                  required
                  autoComplete="email"
                />
                {errors.email && touched.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                Phone Number*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone_number"
                  name="phone_number"
                  type="tel"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  onBlur={() => handleFieldBlur('phone_number')}
                  placeholder="Enter your phone number"
                  className={`input-field pl-10 ${errors.phone_number && touched.phone_number ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                  required
                  autoComplete="tel"
                />
                {errors.phone_number && touched.phone_number && (
                  <p className="text-sm text-red-600 mt-1">{errors.phone_number}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700">
                Date of Birth*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="date_of_birth"
                  name="date_of_birth"
                  type="date"
                  value={formData.date_of_birth}
                  onChange={handleInputChange}
                  onBlur={() => handleFieldBlur('date_of_birth')}
                  className={`input-field pl-10 ${errors.date_of_birth && touched.date_of_birth ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                  required
                  max={new Date().toISOString().split('T')[0]}
                />
                {errors.date_of_birth && touched.date_of_birth && (
                  <p className="text-sm text-red-600 mt-1">{errors.date_of_birth}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">Must be at least 13 years old</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="input-field pl-10"
                >
                  <option value="">Select gender (optional)</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>
            </div>
          </motion.div>
        </Section>

        {/* Account Security Section */}
        <Section title="Account Security" icon={<Shield className="w-6 h-6" />}>
          <motion.div variants={itemVariants} className="space-y-4">
            <PasswordStrengthMeter 
              password={formData.password}
              requirements={[8, 'upper', 'lower', 'number', 'special']}
            />
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={() => handleFieldBlur('password')}
                  placeholder="Create a strong password"
                  className={`input-field pl-10 pr-10 ${errors.password && touched.password ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
                {errors.password && touched.password && (
                  <p className="text-sm text-red-600 mt-1">{errors.password}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
                Confirm Password*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirm_password}
                  onChange={handleInputChange}
                  onBlur={() => handleFieldBlur('confirm_password')}
                  placeholder="Confirm your password"
                  className={`input-field pl-10 pr-10 ${errors.confirm_password && touched.confirm_password ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
                {errors.confirm_password && touched.confirm_password && (
                  <p className="text-sm text-red-600 mt-1">{errors.confirm_password}</p>
                )}
              </div>
            </div>
          </motion.div>
        </Section>

        {/* Address Section */}
        <Section title="Address" icon={<MapPin className="w-6 h-6" />}>
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                Street Address*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="street"
                  name="street"
                  type="text"
                  value={formData.street}
                  onChange={handleInputChange}
                  onBlur={() => handleFieldBlur('street')}
                  placeholder="Enter your street address"
                  className={`input-field pl-10 ${errors.street && touched.street ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                  required
                  maxLength={200}
                />
                {errors.street && touched.street && (
                  <p className="text-sm text-red-600 mt-1">{errors.street}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City*
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleInputChange}
                  onBlur={() => handleFieldBlur('city')}
                  placeholder="City"
                  className={`input-field ${errors.city && touched.city ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                  required
                  maxLength={100}
                />
                {errors.city && touched.city && (
                  <p className="text-sm text-red-600 mt-1">{errors.city}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                  State*
                </label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  value={formData.state}
                  onChange={handleInputChange}
                  onBlur={() => handleFieldBlur('state')}
                  placeholder="State"
                  className={`input-field ${errors.state && touched.state ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                  required
                  maxLength={50}
                />
                {errors.state && touched.state && (
                  <p className="text-sm text-red-600 mt-1">{errors.state}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                  ZIP Code*
                </label>
                <input
                  id="zip"
                  name="zip"
                  type="text"
                  value={formData.zip}
                  onChange={handleInputChange}
                  onBlur={() => handleFieldBlur('zip')}
                  placeholder="ZIP Code"
                  className={`input-field ${errors.zip && touched.zip ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                  required
                  pattern="\d{5}(-\d{4})?"
                />
                {errors.zip && touched.zip && (
                  <p className="text-sm text-red-600 mt-1">{errors.zip}</p>
                )}
              </div>
            </div>
          </motion.div>
        </Section>

        {/* Emergency Contact Section */}
        <Section 
          title="Emergency Contact" 
          icon={<Phone className="w-6 h-6" />}
          isOptional={true}
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="emergency_name" className="block text-sm font-medium text-gray-700">
                Emergency Contact Name
              </label>
              <input
                id="emergency_name"
                name="emergency_name"
                type="text"
                value={formData.emergency_name}
                onChange={handleInputChange}
                onBlur={() => handleFieldBlur('emergency_name')}
                placeholder="Enter emergency contact name"
                className={`input-field ${errors.emergency_name && touched.emergency_name ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                maxLength={100}
              />
              {errors.emergency_name && touched.emergency_name && (
                <p className="text-sm text-red-600 mt-1">{errors.emergency_name}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="emergency_phone" className="block text-sm font-medium text-gray-700">
                Emergency Contact Phone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="emergency_phone"
                  name="emergency_phone"
                  type="tel"
                  value={formData.emergency_phone}
                  onChange={handleInputChange}
                  onBlur={() => handleFieldBlur('emergency_phone')}
                  placeholder="Enter emergency contact phone"
                  className={`input-field pl-10 ${errors.emergency_phone && touched.emergency_phone ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                  autoComplete="tel"
                />
                {errors.emergency_phone && touched.emergency_phone && (
                  <p className="text-sm text-red-600 mt-1">{errors.emergency_phone}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="emergency_relationship" className="block text-sm font-medium text-gray-700">
                Relationship
              </label>
              <input
                id="emergency_relationship"
                name="emergency_relationship"
                type="text"
                value={formData.emergency_relationship}
                onChange={handleInputChange}
                onBlur={() => handleFieldBlur('emergency_relationship')}
                placeholder="e.g., Spouse, Parent, Friend"
                className={`input-field ${errors.emergency_relationship && touched.emergency_relationship ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                maxLength={50}
              />
              {errors.emergency_relationship && touched.emergency_relationship && (
                <p className="text-sm text-red-600 mt-1">{errors.emergency_relationship}</p>
              )}
            </div>
          </motion.div>
        </Section>

        {/* Insurance Section */}
        <Section 
          title="Insurance Information" 
          icon={<CreditCard className="w-6 h-6" />}
          isOptional={true}
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="insurance_provider" className="block text-sm font-medium text-gray-700">
                Insurance Provider
              </label>
              <input
                id="insurance_provider"
                name="insurance_provider"
                type="text"
                value={formData.insurance_provider}
                onChange={handleInputChange}
                placeholder="e.g., Blue Cross Blue Shield"
                className="input-field"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="policy_number" className="block text-sm font-medium text-gray-700">
                Policy Number
              </label>
              <input
                id="policy_number"
                name="policy_number"
                type="text"
                value={formData.policy_number}
                onChange={handleInputChange}
                placeholder="Enter policy number"
                className="input-field"
              />
            </div>
          </motion.div>
        </Section>

        {/* Medical History Section */}
        <Section 
          title="Medical History" 
          icon={<ClipboardList className="w-6 h-6" />}
          isOptional={true}
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="medical_history" className="block text-sm font-medium text-gray-700">
                Medical Conditions & History
              </label>
              <textarea
                id="medical_history"
                name="medical_history"
                value={formData.medical_history}
                onChange={handleInputChange}
                placeholder="List any medical conditions, allergies, or relevant medical history (optional)"
                className="input-field min-h-[120px] resize-none"
              />
              <p className="text-xs text-gray-500">
                This information helps us provide better care. All information is kept confidential and secure.
              </p>
            </div>
          </motion.div>
        </Section>

        {/* Debug Info - Remove this after testing */}
        <motion.div variants={itemVariants} className="p-4 bg-gray-100 rounded-lg mb-4">
          <h4 className="font-medium text-gray-700 mb-2">Debug Info:</h4>
          <div className="text-xs text-gray-600 space-y-1">
            <div>Form Valid: {isFormValid() ? '✅ Yes' : '❌ No'}</div>
            <div>Has Errors: {Object.keys(errors).length > 0 ? '❌ Yes' : '✅ No'}</div>
            <div>Required Fields Filled: {[
              'first_name', 'last_name', 'email', 'phone_number', 
              'password', 'confirm_password', 'date_of_birth',
              'street', 'city', 'state', 'zip'
            ].every(field => formData[field] && formData[field].trim() !== '') ? '✅ Yes' : '❌ No'}</div>
            <div>Errors: {Object.keys(errors).length > 0 ? Object.keys(errors).join(', ') : 'None'}</div>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div variants={itemVariants} className="pt-6">
          <button
            type="submit"
            disabled={isLoading || !isFormValid()}
            className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isLoading || !isFormValid()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'btn-primary hover:scale-[1.02] focus:ring-primary-500'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 inline mr-2" />
                <span>Create Patient Account</span>
                <ArrowRight className="w-5 h-5 inline ml-2" />
              </>
            )}
          </button>
        </motion.div>

        {/* Terms and Privacy */}
        <motion.div variants={itemVariants} className="text-center text-sm text-gray-600">
          <p>
            By creating an account, you agree to our{' '}
            <button type="button" className="text-primary-600 hover:text-primary-700 underline">
              Terms of Service
            </button>{' '}
            and{' '}
            <button type="button" className="text-primary-600 hover:text-primary-700 underline">
              Privacy Policy
            </button>
          </p>
        </motion.div>

        {/* Submit Error */}
        {errors.submit && (
          <motion.div 
            variants={itemVariants}
            className="p-3 bg-red-50 border border-red-200 rounded-lg"
          >
            <div className="flex items-center text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 mr-2" />
              {errors.submit}
            </div>
          </motion.div>
        )}
      </motion.form>
    </FormCard>
  );
};

export default PatientRegistration; 