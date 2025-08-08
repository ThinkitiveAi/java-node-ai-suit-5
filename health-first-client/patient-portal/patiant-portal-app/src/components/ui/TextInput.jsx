import React from 'react';
import { AlertCircle } from 'lucide-react';

const TextInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = false, 
  validation = {}, 
  error,
  type = "text",
  autoComplete
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          className={`input-field ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
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

export default TextInput; 