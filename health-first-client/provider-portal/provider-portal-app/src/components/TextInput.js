import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Mail, Phone } from 'lucide-react';

const TextInput = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error, 
  success, 
  required = false,
  dualMode = false 
}) => {
  const [inputType, setInputType] = useState(type);
  const [isValid, setIsValid] = useState(null);
  const [showValidation, setShowValidation] = useState(false);

  const validateInput = React.useCallback((value) => {
    if (!value) return null;
    
    if (dualMode) {
      // Check if it's an email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(value)) {
        setInputType('email');
        return true;
      }
      
      // Check if it's a phone number
      const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
      if (phoneRegex.test(value.replace(/[\s\-()]/g, ''))) {
        setInputType('tel');
        return true;
      }
      
      return false;
    }
    
    if (inputType === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    }
    
    return true;
  }, [dualMode, inputType]);

  useEffect(() => {
    if (value) {
      const valid = validateInput(value);
      setIsValid(valid);
      setShowValidation(true);
    } else {
      setIsValid(null);
      setShowValidation(false);
    }
  }, [value, validateInput]);

  const getInputClass = () => {
    let baseClass = 'lightwind-input';
    if (error) baseClass += ' error';
    else if (success || isValid) baseClass += ' success';
    return baseClass;
  };

  const getIcon = () => {
    if (dualMode) {
      return inputType === 'email' ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />;
    }
    return inputType === 'email' ? <Mail className="w-4 h-4" /> : null;
  };

  return (
    <div className="form-group">
      <label className="form-label">
        {label}
        {required && <span className="form-required">*</span>}
      </label>
      
      <div style={{ position: 'relative' }}>
        <input
          type={inputType}
          className={getInputClass()}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
        
        {getIcon() && (
          <div style={{ 
            position: 'absolute', 
            right: '12px', 
            top: '50%', 
            transform: 'translateY(-50%)',
            color: '#9ca3af'
          }}>
            {getIcon()}
          </div>
        )}
        
        {showValidation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ 
              position: 'absolute', 
              right: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)' 
            }}
          >
            {isValid ? (
              <CheckCircle style={{ width: '20px', height: '20px', color: '#059669' }} />
            ) : (
              <XCircle style={{ width: '20px', height: '20px', color: '#dc2626' }} />
            )}
          </motion.div>
        )}
      </div>
      
      {dualMode && value && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ 
            fontSize: '12px', 
            color: '#6b7280', 
            marginTop: '6px',
            fontStyle: 'italic'
          }}
        >
          Detected as: {inputType === 'email' ? 'Email address' : 'Phone number'}
        </motion.p>
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
          <XCircle style={{ width: '16px', height: '16px', marginRight: '4px' }} />
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default TextInput; 