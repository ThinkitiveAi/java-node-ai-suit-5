import { useState } from 'react';
import { Button } from 'lightswind/dist/components/ui/button.js';
import { Input } from 'lightswind/dist/components/ui/input.js';
import { Label } from 'lightswind/dist/components/ui/label.js';
import { Alert, AlertDescription } from 'lightswind/dist/components/ui/alert.js';
import { Badge } from 'lightswind/dist/components/ui/badge.js';
import MagicLoader from 'lightswind/dist/components/ui/magic-loader.js';
import { AnimatedBlobBackground } from 'lightswind/dist/components/ui/animated-blob-background.js';
import { ShinyText } from 'lightswind/dist/components/ui/shiny-text.js';
import ScrollReveal from 'lightswind/dist/components/ui/scroll-reveal.js';
import { BorderBeam } from 'lightswind/dist/components/ui/border-beam.js';
import { CountUp } from 'lightswind/dist/components/ui/count-up.js';
import {
  Select as LSSelect,
  SelectTrigger as LSSelectTrigger,
  SelectValue as LSSelectValue,
  SelectContent as LSSelectContent,
  SelectItem as LSSelectItem,
  SelectGroup as LSSelectGroup,
} from 'lightswind/dist/components/ui/select.js';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Home, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  AlertCircle,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  Shield,
  Heart,
  Star,
  Sparkles
} from 'lucide-react';

const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];
const relationshipOptions = ['Spouse', 'Parent', 'Child', 'Sibling', 'Friend', 'Other'];
const steps = ['Personal Info', 'Address', 'Emergency Contact', 'Security'];

const RegistrationForm = ({ onRegistrationSuccess, onBackToLogin }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    emergencyName: '',
    emergencyRelationship: '',
    emergencyPhone: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[+]?[1-9][\d]{0,15}$/.test(phone.replace(/\s/g, ''));
  const validatePassword = (p) => p.length >= 8 && /[A-Z]/.test(p) && /[a-z]/.test(p) && /[0-9]/.test(p);
  const validateZipCode = (zip) => /^\d{5}(-\d{4})?$/.test(zip);
  const validateDateOfBirth = (date) => { const d=new Date(date); const t=new Date(); const age=t.getFullYear()-d.getFullYear(); return age>=13 && d<t; };

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
      case 'lastName': {
        if (!value) return `${name === 'firstName' ? 'First' : 'Last'} name is required`;
        if (value.length < 2) return `${name === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters`;
        if (value.length > 50) return `${name === 'firstName' ? 'First' : 'Last'} name must be less than 50 characters`;
        return '';
      }
      case 'email': {
        if (!value) return 'Email is required';
        if (!validateEmail(value)) return 'Please enter a valid email address';
        return '';
      }
      case 'phone': {
        if (!value) return 'Phone number is required';
        if (!validatePhone(value)) return 'Please enter a valid phone number';
        return '';
      }
      case 'dateOfBirth': {
        if (!value) return 'Date of birth is required';
        if (!validateDateOfBirth(value)) return 'You must be at least 13 years old';
        return '';
      }
      case 'gender': {
        if (!value) return 'Gender is required';
        return '';
      }
      case 'streetAddress': {
        if (!value) return 'Street address is required';
        if (value.length > 200) return 'Street address must be less than 200 characters';
        return '';
      }
      case 'city': {
        if (!value) return 'City is required';
        if (value.length > 100) return 'City must be less than 100 characters';
        return '';
      }
      case 'state': {
        if (!value) return 'State/Province is required';
        if (value.length > 50) return 'State/Province must be less than 50 characters';
        return '';
      }
      case 'zipCode': {
        if (!value) return 'ZIP/Postal code is required';
        if (!validateZipCode(value)) return 'Please enter a valid ZIP/Postal code';
        return '';
      }
      case 'emergencyPhone': {
        if (value && !validatePhone(value)) return 'Please enter a valid phone number';
        return '';
      }
      case 'password': {
        if (!value) return 'Password is required';
        if (!validatePassword(value)) return 'Password must be at least 8 characters with uppercase, lowercase, and number';
        return '';
      }
      case 'confirmPassword': {
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return '';
      }
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    let isValid = true;

    switch (step) {
      case 0:
        ;['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'gender'].forEach((f) => {
          const e = validateField(f, formData[f]); if (e) { newErrors[f] = e; isValid = false; }
        });
        break;
      case 1:
        ;['streetAddress', 'city', 'state', 'zipCode'].forEach((f) => {
          const e = validateField(f, formData[f]); if (e) { newErrors[f] = e; isValid = false; }
        });
        break;
      case 2:
        if (formData.emergencyName || formData.emergencyPhone) {
          if (formData.emergencyPhone) {
            const e = validateField('emergencyPhone', formData.emergencyPhone); if (e) { newErrors.emergencyPhone = e; isValid = false; }
          }
        }
        break;
      case 3:
        ;['password', 'confirmPassword'].forEach((f) => {
          const e = validateField(f, formData[f]); if (e) { newErrors[f] = e; isValid = false; }
        });
        break;
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const handleNext = () => { if (validateStep(activeStep)) setActiveStep((s) => s + 1); };
  const handleBack = () => setActiveStep((s) => s - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(activeStep)) return;
    setIsLoading(true);
    setRegistrationStatus(null);
    setErrorMessage('');
    try {
      await new Promise((r) => setTimeout(r, 2000));
      const random = Math.random();
      if (random < 0.1) throw new Error('Email already exists');
      else if (random < 0.15) throw new Error('Phone number already registered');
      else if (random < 0.2) throw new Error('Network error. Please try again.');
      setRegistrationStatus('success');
      setTimeout(() => onRegistrationSuccess(), 2000);
    } catch (error) {
      setRegistrationStatus('error');
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4" />
                First Name
              </Label>
              <div className="relative">
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                  className={`h-12 pl-12 text-base ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                />
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4" />
                Last Name
              </Label>
              <div className="relative">
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                  className={`h-12 pl-12 text-base ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                />
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              {errors.lastName && <p className="text-red-600 text-sm">{errors.lastName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  className={`h-12 pl-12 text-base ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </Label>
              <div className="relative">
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  className={`h-12 pl-12 text-base ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                />
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date of Birth
              </Label>
              <div className="relative">
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className={`h-12 pl-12 text-base ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
                />
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              {errors.dateOfBirth && <p className="text-red-600 text-sm">{errors.dateOfBirth}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4" />
                Gender
              </Label>
              <LSSelect value={formData.gender} onValueChange={(v) => handleInputChange({ target: { name: 'gender', value: v } })}>
                <LSSelectTrigger className="w-full h-12">
                  <LSSelectValue placeholder="Select gender" />
                </LSSelectTrigger>
                <LSSelectContent>
                  <LSSelectGroup>
                    {genderOptions.map((g) => (<LSSelectItem key={g} value={g}>{g}</LSSelectItem>))}
                  </LSSelectGroup>
                </LSSelectContent>
              </LSSelect>
              {errors.gender && <p className="text-red-600 text-sm">{errors.gender}</p>}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2 space-y-2">
              <Label htmlFor="streetAddress" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Home className="w-4 h-4" />
                Street Address
              </Label>
              <div className="relative">
                <Input
                  id="streetAddress"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  placeholder="Enter street address"
                  className={`h-12 pl-12 text-base ${errors.streetAddress ? 'border-red-500' : 'border-gray-300'}`}
                />
                <Home className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              {errors.streetAddress && <p className="text-red-600 text-sm">{errors.streetAddress}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                City
              </Label>
              <div className="relative">
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                  className={`h-12 pl-12 text-base ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                />
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              {errors.city && <p className="text-red-600 text-sm">{errors.city}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="state" className="text-sm font-semibold text-gray-700">
                State/Province
              </Label>
              <Input
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="Enter state/province"
                className={`h-12 text-base ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.state && <p className="text-red-600 text-sm">{errors.state}</p>}
            </div>

            <div className="sm:col-span-2 space-y-2">
              <Label htmlFor="zipCode" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                ZIP/Postal Code
              </Label>
              <div className="relative">
                <Input
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="Enter ZIP/postal code"
                  className={`h-12 pl-12 text-base ${errors.zipCode ? 'border-red-500' : 'border-gray-300'}`}
                />
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              {errors.zipCode && <p className="text-red-600 text-sm">{errors.zipCode}</p>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="emergencyName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4" />
                Emergency Contact Name
              </Label>
              <div className="relative">
                <Input
                  id="emergencyName"
                  name="emergencyName"
                  value={formData.emergencyName}
                  onChange={handleInputChange}
                  placeholder="Enter contact name (optional)"
                  className="h-12 pl-12 text-base border-gray-300"
                />
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">Relationship</Label>
              <LSSelect value={formData.emergencyRelationship} onValueChange={(v) => handleInputChange({ target: { name: 'emergencyRelationship', value: v } })}>
                <LSSelectTrigger className="w-full h-12">
                  <LSSelectValue placeholder="Select relationship" />
                </LSSelectTrigger>
                <LSSelectContent>
                  <LSSelectGroup>
                    {relationshipOptions.map((r) => (<LSSelectItem key={r} value={r}>{r}</LSSelectItem>))}
                  </LSSelectGroup>
                </LSSelectContent>
              </LSSelect>
            </div>

            <div className="sm:col-span-2 space-y-2">
              <Label htmlFor="emergencyPhone" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Emergency Phone Number
              </Label>
              <div className="relative">
                <Input
                  id="emergencyPhone"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleInputChange}
                  placeholder="Enter emergency contact phone (optional)"
                  className={`h-12 pl-12 text-base ${errors.emergencyPhone ? 'border-red-500' : 'border-gray-300'}`}
                />
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              {errors.emergencyPhone && <p className="text-red-600 text-sm">{errors.emergencyPhone}</p>}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a strong password"
                  className={`h-12 pl-12 pr-12 text-base ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 rounded-lg"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className={`h-12 pl-12 pr-12 text-base ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 rounded-lg"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword}</p>}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 py-10">
      <AnimatedBlobBackground
        className="absolute inset-0"
        firstBlobColors={["#10B981", "#14B8A6", "#0F76FF", "#60A5FA", "#10B981"]}
        secondBlobColors={["#ECFDF5", "#E0F2FE", "#F0F9FF", "#EEF2FF", "#ECFDF5"]}
        firstBlobOpacity={0.1}
        secondBlobOpacity={0.06}
        blurAmount="2vw"
        firstBlobSpeed={12000}
        secondBlobSpeed={18000}
        interactive
        interactiveIntensity={3}
      />
      
      <div className="relative z-10 w-full max-w-[900px]">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500/25 via-blue-500/25 to-purple-500/25 rounded-3xl blur-lg opacity-60 group-hover:opacity-80 transition-all duration-700" />
          <BorderBeam size={150} duration={15} delay={12} />
          
          <div className="relative bg-white/96 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl p-10 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-3xl">
            
            {/* Header Section */}
            <div className="text-center mb-10">
              <div className="mb-6 flex justify-center">
                <div className="relative p-4 rounded-3xl bg-gradient-to-br from-green-50 to-blue-50 border border-green-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-3xl animate-pulse" />
                  <UserPlus className="relative w-10 h-10 text-green-600" />
                </div>
              </div>
              
              <ScrollReveal size="xl" align="center">
                <ShinyText
                  size="4xl"
                  weight="bold"
                  baseColor="#0F172A"
                  shineColor="#10B981"
                  speed={2.8}
                  direction="left-to-right"
                  shineWidth={30}
                >
                  Join HealthFirst
                </ShinyText>
              </ScrollReveal>
              
              <div className="flex items-center justify-center gap-2 mt-4 mb-2">
                <Sparkles className="w-5 h-5 text-green-500 animate-pulse" />
                <p className="text-gray-600 text-lg">Your journey to better health starts here</p>
                <Sparkles className="w-5 h-5 text-green-500 animate-pulse" />
              </div>
              
              <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                Free & Secure Registration
              </Badge>
            </div>

            {/* Progress Indicator */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-6">
                {steps.map((label, idx) => (
                  <div key={label} className={`flex-1 flex items-center ${idx < activeStep ? 'text-green-600' : idx === activeStep ? 'text-blue-600' : 'text-gray-400'}`}>
                    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mr-3 transition-all ${
                      idx < activeStep 
                        ? 'bg-green-600 border-green-600 text-white shadow-lg' 
                        : idx === activeStep 
                          ? 'border-blue-600 text-blue-600 bg-blue-50 shadow-md' 
                          : 'border-gray-300 bg-white'
                    }`}>
                      {idx < activeStep ? <CheckCircle className="w-5 h-5" /> : <CountUp value={idx + 1} duration={0.5} />}
                    </div>
                    <span className="hidden sm:inline text-sm font-semibold">{label}</span>
                    {idx < steps.length - 1 && (
                      <div className={`flex-1 h-0.5 ml-3 transition-all ${idx < activeStep ? 'bg-green-600' : 'bg-gray-300'}`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-600 to-blue-600 h-3 rounded-full transition-all duration-700 ease-out shadow-sm"
                  style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Status Messages */}
            {registrationStatus === 'success' && (
              <Alert className="mb-8 border-green-200 bg-green-50">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <AlertDescription className="text-green-800 font-medium">
                  🎉 Registration successful! Welcome to our healthcare community.
                </AlertDescription>
              </Alert>
            )}
            
            {registrationStatus === 'error' && (
              <Alert className="mb-8 border-red-200 bg-red-50">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <AlertDescription className="text-red-800 font-medium">
                  {errorMessage}
                </AlertDescription>
              </Alert>
            )}

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="min-h-[500px] bg-gradient-to-br from-gray-50/50 to-blue-50/30 rounded-2xl p-8 border border-gray-100">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Step {activeStep + 1}: {steps[activeStep]}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {activeStep === 0 && "Let's start with your basic information"}
                    {activeStep === 1 && "Where can we reach you?"}
                    {activeStep === 2 && "Emergency contact details (optional but recommended)"}
                    {activeStep === 3 && "Secure your account with a strong password"}
                  </p>
                </div>
                {renderStepContent(activeStep)}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                <Button 
                  type="button"
                  disabled={activeStep === 0} 
                  onClick={handleBack}
                  variant="outline"
                  className="h-12 px-6 border-2 border-gray-300 hover:border-gray-400 font-semibold transition-all duration-300"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous Step
                </Button>
                
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="text-gray-600">
                    {activeStep + 1} of {steps.length}
                  </Badge>
                  
                  {activeStep === steps.length - 1 ? (
                    <Button 
                      type="submit" 
                      className="h-14 px-8 text-base font-semibold bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-3">
                          <MagicLoader size={24} particleCount={4} speed={2} />
                          Creating your account...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Shield className="w-5 h-5" />
                          Complete Registration
                          <Sparkles className="w-5 h-5" />
                        </div>
                      )}
                    </Button>
                  ) : (
                    <Button 
                      type="button"
                      variant="default"
                      onClick={handleNext}
                      className="h-12 px-6 bg-blue-600 hover:bg-blue-700 font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Continue
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </form>

            {/* Footer */}
            <div className="text-center mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-600 text-sm mb-4">
                Already have an account with us?
              </p>
              <Button 
                type="button" 
                variant="outline"
                onClick={onBackToLogin} 
                className="w-full h-12 border-2 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 font-semibold transition-all duration-300"
              >
                <User className="w-5 h-5 mr-2" />
                Sign In Instead
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm; 