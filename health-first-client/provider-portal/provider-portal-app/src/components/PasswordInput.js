import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Shield } from 'lucide-react';

const PasswordInput = ({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  error, 
  success, 
  required = false,
  showStrengthMeter = true 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const [strengthText, setStrengthText] = useState('');
  const [strengthColor, setStrengthColor] = useState('');

  const calculateStrength = (password) => {
    if (!password) return { score: 0, text: '', color: '' };
    
    let score = 0;
    let feedback = [];
    
    // Length check
    if (password.length >= 8) score += 1;
    else feedback.push('At least 8 characters');
    
    // Contains lowercase
    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('Lowercase letter');
    
    // Contains uppercase
    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('Uppercase letter');
    
    // Contains number
    if (/\d/.test(password)) score += 1;
    else feedback.push('Number');
    
    // Contains special character
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
    else feedback.push('Special character');
    
    const strengthMap = {
      0: { text: 'Very Weak', color: 'strength-weak' },
      1: { text: 'Weak', color: 'strength-weak' },
      2: { text: 'Fair', color: 'strength-fair' },
      3: { text: 'Good', color: 'strength-good' },
      4: { text: 'Strong', color: 'strength-strong' },
      5: { text: 'Very Strong', color: 'strength-strong' }
    };
    
    return {
      score,
      text: strengthMap[score]?.text || 'Very Weak',
      color: strengthMap[score]?.color || 'strength-weak'
    };
  };

  useEffect(() => {
    if (showStrengthMeter && value) {
      const strengthData = calculateStrength(value);
      setStrength(strengthData.score);
      setStrengthText(strengthData.text);
      setStrengthColor(strengthData.color);
    }
  }, [value, showStrengthMeter]);

  const getInputClass = () => {
    let baseClass = 'lightwind-input pr-12';
    if (error) baseClass += ' error';
    else if (success) baseClass += ' success';
    return baseClass;
  };

  const getStrengthPercentage = () => {
    return (strength / 5) * 100;
  };

  return (
    <div className="form-group">
      <label className="form-label">
        {label}
        {required && <span className="form-required">*</span>}
      </label>
      
      <div style={{ position: 'relative' }}>
        <input
          type={showPassword ? 'text' : 'password'}
          className={getInputClass()}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
        
        <div style={{ 
          position: 'absolute', 
          right: '12px', 
          top: '50%', 
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Lock style={{ width: '16px', height: '16px', color: '#9ca3af' }} />
          
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{ 
              color: '#9ca3af',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = '#6b7280'}
            onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
          >
            {showPassword ? (
              <EyeOff style={{ width: '16px', height: '16px' }} />
            ) : (
              <Eye style={{ width: '16px', height: '16px' }} />
            )}
          </button>
        </div>
      </div>
      
      {showStrengthMeter && value && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          style={{ marginTop: '12px' }}
        >
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            marginBottom: '6px' 
          }}>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>Password Strength:</span>
            <span style={{ 
              fontSize: '12px', 
              fontWeight: '600',
              color: strengthColor === 'strength-weak' ? '#dc2626' :
                     strengthColor === 'strength-fair' ? '#d97706' :
                     strengthColor === 'strength-good' ? '#3b82f6' : '#059669'
            }}>
              {strengthText}
            </span>
          </div>
          
          <div className="password-strength-meter">
            <motion.div
              className={`strength-bar ${strengthColor}`}
              initial={{ width: 0 }}
              animate={{ width: `${getStrengthPercentage()}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
            <Shield style={{ width: '12px', height: '12px', color: '#059669', marginRight: '4px' }} />
            <span style={{ fontSize: '12px', color: '#6b7280' }}>
              {strength >= 4 ? 'HIPAA compliant' : 'Consider adding more complexity'}
            </span>
          </div>
        </motion.div>
      )}
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ 
            fontSize: '14px', 
            color: '#dc2626', 
            marginTop: '6px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Shield style={{ width: '16px', height: '16px', marginRight: '4px' }} />
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default PasswordInput; 