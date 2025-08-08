import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

const PasswordInput = ({ 
  autoComplete = "current-password",
  showToggle = true,
  strengthMeter = false,
  onChange,
  value,
  placeholder = "Enter your password"
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState(value || '');

  const handleChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    
    if (onChange) {
      onChange(e);
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: '', color: '' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const strengthMap = {
      0: { label: 'Very Weak', color: 'bg-red-500' },
      1: { label: 'Weak', color: 'bg-orange-500' },
      2: { label: 'Fair', color: 'bg-yellow-500' },
      3: { label: 'Good', color: 'bg-blue-500' },
      4: { label: 'Strong', color: 'bg-green-500' },
      5: { label: 'Very Strong', color: 'bg-green-600' }
    };

    return { score, ...strengthMap[score] };
  };

  const strength = getPasswordStrength(password);

  return (
    <div className="space-y-2">
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
        Password
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Lock className="h-5 w-5 text-gray-400" />
        </div>
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete={autoComplete}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="input-field pl-10 pr-10"
        />
        {showToggle && (
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
        )}
      </div>
      
      {strengthMeter && password && (
        <div className="space-y-2">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  i < strength.score ? strength.color : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className={`text-xs ${
            strength.score >= 4 ? 'text-green-600' :
            strength.score >= 3 ? 'text-blue-600' :
            strength.score >= 2 ? 'text-yellow-600' :
            'text-red-600'
          }`}>
            Password strength: {strength.label}
          </p>
        </div>
      )}
    </div>
  );
};

export default PasswordInput; 