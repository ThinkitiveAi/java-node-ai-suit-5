import React from 'react';
import { Shield, AlertCircle } from 'lucide-react';

const PasswordStrengthMeter = ({ password, requirements = [8, 'upper', 'lower', 'number', 'special'] }) => {
  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: '', color: '' };
    
    let score = 0;
    const checks = {
      length: password.length >= requirements[0],
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password)
    };

    if (checks.length) score++;
    if (checks.upper) score++;
    if (checks.lower) score++;
    if (checks.number) score++;
    if (checks.special) score++;

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
      <label className="block text-sm font-medium text-gray-700">
        Password*
      </label>
      <div className="space-y-3">
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                i < strength.score ? strength.color : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className={`font-medium ${
            strength.score >= 4 ? 'text-green-600' :
            strength.score >= 3 ? 'text-blue-600' :
            strength.score >= 2 ? 'text-yellow-600' :
            'text-red-600'
          }`}>
            {strength.label}
          </span>
          <span className="text-gray-500">
            {strength.score}/5
          </span>
        </div>

        <div className="space-y-1">
          <p className="text-xs text-gray-600 font-medium">Requirements:</p>
          <div className="grid grid-cols-1 gap-1 text-xs">
            <div className={`flex items-center space-x-2 ${
              password.length >= requirements[0] ? 'text-green-600' : 'text-gray-500'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                password.length >= requirements[0] ? 'bg-green-500' : 'bg-gray-300'
              }`} />
              <span>At least {requirements[0]} characters</span>
            </div>
            <div className={`flex items-center space-x-2 ${
              /[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-500'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                /[A-Z]/.test(password) ? 'bg-green-500' : 'bg-gray-300'
              }`} />
              <span>One uppercase letter</span>
            </div>
            <div className={`flex items-center space-x-2 ${
              /[a-z]/.test(password) ? 'text-green-600' : 'text-gray-500'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                /[a-z]/.test(password) ? 'bg-green-500' : 'bg-gray-300'
              }`} />
              <span>One lowercase letter</span>
            </div>
            <div className={`flex items-center space-x-2 ${
              /[0-9]/.test(password) ? 'text-green-600' : 'text-gray-500'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                /[0-9]/.test(password) ? 'bg-green-500' : 'bg-gray-300'
              }`} />
              <span>One number</span>
            </div>
            <div className={`flex items-center space-x-2 ${
              /[^A-Za-z0-9]/.test(password) ? 'text-green-600' : 'text-gray-500'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                /[^A-Za-z0-9]/.test(password) ? 'bg-green-500' : 'bg-gray-300'
              }`} />
              <span>One special character</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordStrengthMeter; 