import { useState } from 'react';
import { Button } from 'lightswind/dist/components/ui/button.js';
import { Input } from 'lightswind/dist/components/ui/input.js';
import { Label } from 'lightswind/dist/components/ui/label.js';
import { Checkbox } from 'lightswind/dist/components/ui/checkbox.js';
import { Alert, AlertDescription } from 'lightswind/dist/components/ui/alert.js';
import { Badge } from 'lightswind/dist/components/ui/badge.js';
import MagicLoader from 'lightswind/dist/components/ui/magic-loader.js';
import { AnimatedBlobBackground } from 'lightswind/dist/components/ui/animated-blob-background.js';
import { ShinyText } from 'lightswind/dist/components/ui/shiny-text.js';
import ScrollReveal from 'lightswind/dist/components/ui/scroll-reveal.js';
import { BorderBeam } from 'lightswind/dist/components/ui/border-beam.js';
import { User, Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle, Shield, Heart, ArrowRight } from 'lucide-react';

const LoginForm = ({ onLoginSuccess, onShowRegistration }) => {
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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const validatePhone = (phone) => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };
  
  const validatePassword = (password) => password.length >= 6;

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!value) return 'Email or phone number is required';
        if (!validateEmail(value) && !validatePhone(value)) return 'Please enter a valid email or phone number';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (!validatePassword(value)) return 'Password must be at least 6 characters long';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    const fieldValue = name === 'rememberMe' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: fieldValue }));
    if (name !== 'rememberMe') {
      const error = validateField(name, fieldValue);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
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
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (formData.email === 'patient@healthcare.com' && formData.password === 'password123') {
        setLoginStatus('success');
        setTimeout(() => onLoginSuccess(), 1500);
      } else {
        throw new Error('Invalid email or password. Please check your credentials and try again.');
      }
    } catch (error) {
      setLoginStatus('error');
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => formData.email && formData.password && !errors.email && !errors.password;

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 py-10">
      <AnimatedBlobBackground
        className="absolute inset-0"
        firstBlobColors={["#0F76FF", "#14B8A6", "#10B981", "#60A5FA", "#0F76FF"]}
        secondBlobColors={["#E0F2FE", "#F0F9FF", "#ECFDF5", "#F0F9FF", "#E0F2FE"]}
        firstBlobOpacity={0.12}
        secondBlobOpacity={0.08}
        blurAmount="2.5vw"
        firstBlobSpeed={15000}
        secondBlobSpeed={10000}
        interactive
        interactiveIntensity={4}
      />
      
      <div className="relative z-10 w-full max-w-[480px] animate-fade-in">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 via-teal-500/30 to-green-500/30 rounded-3xl blur-lg opacity-60 group-hover:opacity-80 transition-all duration-700 animate-pulse-gentle" />
          <BorderBeam size={120} duration={12} delay={9} />
          
          <div className="relative bg-white/98 backdrop-blur-xl rounded-3xl border border-white/60 shadow-2xl p-10 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-3xl hover-glow">
            
            {/* Header Section */}
            <div className="text-center mb-10">
              <div className="mb-6 flex justify-center animate-bounce-in">
                <div className="relative p-4 rounded-3xl bg-gradient-to-br from-blue-50 to-teal-50 border border-blue-100 animate-float">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-teal-500/10 rounded-3xl animate-pulse" />
                  <Shield className="relative w-10 h-10 text-blue-600" />
                </div>
              </div>
              
              <ScrollReveal size="xl" align="center">
                <ShinyText
                  size="4xl"
                  weight="bold"
                  baseColor="#0F172A"
                  shineColor="#0F76FF"
                  speed={2.2}
                  direction="left-to-right"
                  shineWidth={25}
                >
                  HealthFirst Portal
                </ShinyText>
              </ScrollReveal>
              
              <div className="flex items-center justify-center gap-2 mt-4 mb-2 animate-slide-up stagger-1">
                <Heart className="w-5 h-5 text-red-500 animate-heartbeat" />
                <p className="text-gray-700 text-lg font-medium">Your health, our priority</p>
                <Heart className="w-5 h-5 text-red-500 animate-heartbeat" />
              </div>
              
              <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 animate-slide-up stagger-2">
                Secure Healthcare Access
              </Badge>
            </div>

            {/* Status Messages */}
            {loginStatus === 'success' && (
              <Alert className="mb-6 border-green-200 bg-green-50/80 backdrop-blur-sm animate-bounce-in">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <AlertDescription className="text-green-800 font-medium">
                  Welcome back! Redirecting to your dashboard...
                </AlertDescription>
              </Alert>
            )}
            
            {loginStatus === 'error' && (
              <Alert className="mb-6 border-red-200 bg-red-50/80 backdrop-blur-sm animate-bounce-in">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <AlertDescription className="text-red-800 font-medium">
                  {errorMessage}
                </AlertDescription>
              </Alert>
            )}

            {/* Demo Credentials Info */}
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50/80 to-teal-50/80 backdrop-blur-sm border border-blue-200 rounded-2xl animate-slide-up stagger-3 hover-lift">
              <div className="text-center">
                <Badge variant="outline" className="mb-2 border-blue-300 text-blue-700">
                  Demo Credentials
                </Badge>
                <p className="text-sm text-gray-700">
                  <strong>Email:</strong> patient@healthcare.com<br />
                  <strong>Password:</strong> password123
                </p>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2 animate-slide-up stagger-4">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email or Phone Number
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="text"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email or phone"
                    className={`h-12 pl-12 text-base bg-white/90 backdrop-blur-sm transition-all duration-300 hover:bg-white/95 focus:bg-white ${
                      errors.email 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 focus:shadow-lg focus:-translate-y-0.5'
                    }`}
                  />
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                {errors.email && (
                  <p className="text-red-600 text-sm font-medium flex items-center gap-1 animate-bounce-in">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2 animate-slide-up stagger-5">
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
                    placeholder="Enter your password"
                    className={`h-12 pl-12 pr-12 text-base bg-white/90 backdrop-blur-sm transition-all duration-300 hover:bg-white/95 focus:bg-white ${
                      errors.password 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 focus:shadow-lg focus:-translate-y-0.5'
                    }`}
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 rounded-lg btn-animate"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-red-600 text-sm font-medium flex items-center gap-1 animate-bounce-in">
                    <AlertCircle className="w-4 h-4" />
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-3 text-sm font-medium text-gray-700 cursor-pointer group">
                  <Checkbox 
                    name="rememberMe" 
                    checked={formData.rememberMe} 
                    onCheckedChange={(checked) => handleInputChange({ target: { name: 'rememberMe', checked } })}
                    className="border-2 group-hover:border-blue-400 transition-colors duration-200"
                  />
                  Remember me for 30 days
                </label>
                <Button 
                  type="button"
                  variant="link" 
                  className="text-blue-600 hover:text-blue-800 font-semibold p-0 h-auto btn-animate"
                >
                  Forgot password?
                </Button>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 text-base font-semibold bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 btn-magnetic btn-ripple animate-glow-pulse"
                disabled={!isFormValid() || isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <MagicLoader size={24} particleCount={3} speed={1.8} />
                    Signing you in...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Sign In Securely
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                )}
              </Button>
            </form>

            {/* Footer */}
            <div className="text-center mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-600 text-sm mb-4">
                New to our healthcare platform?
              </p>
              <Button 
                type="button" 
                variant="outline"
                onClick={onShowRegistration} 
                className="w-full h-12 border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 font-semibold transition-all duration-300 btn-magnetic"
              >
                <User className="w-5 h-5 mr-2" />
                Create Your Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm; 