import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, XCircle, Globe } from 'lucide-react';

const EmailInput = ({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  error, 
  success, 
  required = false,
  showDomainSuggestions = true
}) => {
  const [isValid, setIsValid] = useState(null);
  const [showValidation, setShowValidation] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const commonDomains = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
    'icloud.com', 'protonmail.com', 'aol.com', 'live.com'
  ];

  const validateEmail = (email) => {
    if (!email) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const generateSuggestions = (input) => {
    if (!input || !input.includes('@')) return [];
    
    const [localPart, domain] = input.split('@');
    if (!domain) return [];
    
    return commonDomains
      .filter(d => d.startsWith(domain))
      .map(d => `${localPart}@${d}`)
      .slice(0, 3);
  };

  useEffect(() => {
    if (value) {
      const valid = validateEmail(value);
      setIsValid(valid);
      setShowValidation(true);
      
      if (showDomainSuggestions && value.includes('@') && !value.endsWith('@')) {
        const newSuggestions = generateSuggestions(value);
        setSuggestions(newSuggestions);
        setShowSuggestions(newSuggestions.length > 0);
      } else {
        setShowSuggestions(false);
      }
    } else {
      setIsValid(null);
      setShowValidation(false);
      setShowSuggestions(false);
    }
  }, [value, showDomainSuggestions]);

  const getInputClass = () => {
    let baseClass = 'lightwind-input';
    if (error) baseClass += ' error';
    else if (success || isValid) baseClass += ' success';
    return baseClass;
  };

  const handleSuggestionClick = (suggestion) => {
    onChange({ target: { value: suggestion } });
    setShowSuggestions(false);
  };

  return (
    <div className="form-group">
      <label className="form-label">
        {label}
        {required && <span className="form-required">*</span>}
      </label>
      
      <div style={{ position: 'relative' }}>
        <input
          type="email"
          className={getInputClass()}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => {
            if (value && showDomainSuggestions) {
              const newSuggestions = generateSuggestions(value);
              setSuggestions(newSuggestions);
              setShowSuggestions(newSuggestions.length > 0);
            }
          }}
          onBlur={() => {
            setTimeout(() => setShowSuggestions(false), 200);
          }}
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
          <Mail style={{ width: '16px', height: '16px', color: '#9ca3af' }} />
          
          {showValidation && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {isValid ? (
                <CheckCircle style={{ width: '20px', height: '20px', color: '#059669' }} />
              ) : (
                <XCircle style={{ width: '20px', height: '20px', color: '#dc2626' }} />
              )}
            </motion.div>
          )}
        </div>
        
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              zIndex: 10,
              marginTop: '4px'
            }}
          >
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#374151',
                  borderBottom: index < suggestions.length - 1 ? '1px solid #f3f4f6' : 'none',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Globe style={{ width: '14px', height: '14px', color: '#9ca3af' }} />
                  {suggestion}
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </div>
      
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
      
      {isValid && !error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ 
            fontSize: '12px', 
            color: '#059669', 
            marginTop: '6px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <CheckCircle style={{ width: '14px', height: '14px', marginRight: '4px' }} />
          Valid email address
        </motion.p>
      )}
    </div>
  );
};

export default EmailInput; 