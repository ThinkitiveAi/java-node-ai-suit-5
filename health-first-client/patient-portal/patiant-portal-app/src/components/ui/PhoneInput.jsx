import React from 'react';
import { Phone, AlertCircle } from 'lucide-react';

const PhoneInput = ({ 
  value, 
  onChange, 
  name = "phone", 
  placeholder = "Enter your phone number",
  international = false,
  error
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        Phone Number
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Phone className="h-5 w-5 text-gray-400" />
        </div>
        <input
          id={name}
          name={name}
          type="tel"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="tel"
          className={`input-field pl-10 pr-10 ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500" />
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-600 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

export default PhoneInput; 