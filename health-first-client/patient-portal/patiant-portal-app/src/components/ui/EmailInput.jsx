import React, { useState } from 'react';
import { Mail, AlertCircle, CheckCircle } from 'lucide-react';

const EmailInput = ({ 
  autoComplete = "email", 
  validation = {}, 
  smokyHover = true,
  onChange,
  value,
  name,
  placeholder = "Enter your email address"
}) => {
  const [isValid, setIsValid] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const email = e.target.value;
    
    if (onChange) {
      onChange(e);
    }

    if (email === '') {
      setIsValid(null);
      setErrorMessage('');
      return;
    }

    if (validateEmail(email)) {
      setIsValid(true);
      setErrorMessage('');
    } else {
      setIsValid(false);
      setErrorMessage('Please enter a valid email address');
    }
  };

  return (
    <div className="space-y-2">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email Address
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Mail className="h-5 w-5 text-gray-400" />
        </div>
        <input
          id="email"
          name={name || "email"}
          type="email"
          autoComplete={autoComplete}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`input-field pl-10 pr-10 ${smokyHover ? 'smoky-cursor' : ''} ${
            isValid === true ? 'border-green-500 focus:border-green-500 focus:ring-green-200' :
            isValid === false ? 'border-red-500 focus:border-red-500 focus:ring-red-200' :
            ''
          }`}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {isValid === true && (
            <CheckCircle className="h-5 w-5 text-green-500" />
          )}
          {isValid === false && (
            <AlertCircle className="h-5 w-5 text-red-500" />
          )}
        </div>
      </div>
      {errorMessage && (
        <p className="text-sm text-red-600 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default EmailInput; 