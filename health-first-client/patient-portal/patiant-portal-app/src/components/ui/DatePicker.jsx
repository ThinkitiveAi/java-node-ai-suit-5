import React from 'react';
import { Calendar, AlertCircle } from 'lucide-react';

const DatePicker = ({ 
  value, 
  onChange, 
  name = "dateOfBirth", 
  minAge = 13,
  error
}) => {
  const getMaxDate = () => {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    return maxDate.toISOString().split('T')[0];
  };

  const getMinDate = () => {
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
    return minDate.toISOString().split('T')[0];
  };

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        Date of Birth*
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Calendar className="h-5 w-5 text-gray-400" />
        </div>
        <input
          id={name}
          name={name}
          type="date"
          value={value}
          onChange={onChange}
          min={getMinDate()}
          max={getMaxDate()}
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
      <p className="text-xs text-gray-500">
        Must be at least {minAge} years old
      </p>
    </div>
  );
};

export default DatePicker; 