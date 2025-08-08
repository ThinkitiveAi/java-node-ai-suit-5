import React from 'react';
import { User, AlertCircle } from 'lucide-react';

const GenderSelect = ({ 
  value, 
  onChange, 
  name = "gender",
  error
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        Gender
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <User className="h-5 w-5 text-gray-400" />
        </div>
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`input-field pl-10 pr-10 ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
        >
          <option value="">Select gender (optional)</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="non-binary">Non-binary</option>
          <option value="other">Other</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </select>
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

export default GenderSelect; 