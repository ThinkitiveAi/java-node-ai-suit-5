import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, CheckCircle, XCircle, ChevronDown, Globe } from 'lucide-react';

const PhoneInput = ({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  error, 
  success, 
  required = false,
  showCountrySelector = true
}) => {
  const [isValid, setIsValid] = useState(null);
  const [showValidation, setShowValidation] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    code: 'US',
    dialCode: '+1',
    flag: '🇺🇸',
    name: 'United States'
  });

  const countries = [
    { code: 'US', dialCode: '+1', flag: '🇺🇸', name: 'United States' },
    { code: 'CA', dialCode: '+1', flag: '🇨🇦', name: 'Canada' },
    { code: 'GB', dialCode: '+44', flag: '🇬🇧', name: 'United Kingdom' },
    { code: 'AU', dialCode: '+61', flag: '🇦🇺', name: 'Australia' },
    { code: 'DE', dialCode: '+49', flag: '🇩🇪', name: 'Germany' },
    { code: 'FR', dialCode: '+33', flag: '🇫🇷', name: 'France' },
    { code: 'JP', dialCode: '+81', flag: '🇯🇵', name: 'Japan' },
    { code: 'IN', dialCode: '+91', flag: '🇮🇳', name: 'India' },
    { code: 'BR', dialCode: '+55', flag: '🇧🇷', name: 'Brazil' },
    { code: 'MX', dialCode: '+52', flag: '🇲🇽', name: 'Mexico' }
  ];

  const validatePhone = (phone) => {
    if (!phone) return null;
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(cleanPhone);
  };

  const formatPhoneNumber = (phone) => {
    if (!phone) return phone;
    const digits = phone.replace(/\D/g, '');
    
    switch (selectedCountry.code) {
      case 'US':
      case 'CA':
        if (digits.length <= 3) return `(${digits}`;
        if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
      default:
        return phone;
    }
  };

  useEffect(() => {
    if (value) {
      const valid = validatePhone(value);
      setIsValid(valid);
      setShowValidation(true);
    } else {
      setIsValid(null);
      setShowValidation(false);
    }
  }, [value]);

  const getInputClass = () => {
    let baseClass = 'lightwind-input pl-16';
    if (error) baseClass += ' error';
    else if (success || isValid) baseClass += ' success';
    return baseClass;
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setShowCountryDropdown(false);
    
    if (value && !value.startsWith('+')) {
      const cleanPhone = value.replace(/\D/g, '');
      onChange({ target: { value: `${country.dialCode}${cleanPhone}` } });
    }
  };

  const handlePhoneChange = (e) => {
    let newValue = e.target.value;
    
    if (newValue && !newValue.startsWith('+') && !newValue.startsWith('(')) {
      newValue = `${selectedCountry.dialCode}${newValue}`;
    }
    
    onChange({ target: { value: newValue } });
  };

  return (
    <div className="form-group">
      <label className="form-label">
        {label}
        {required && <span className="form-required">*</span>}
      </label>
      
      <div style={{ position: 'relative' }}>
        {showCountrySelector && (
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                zIndex: 5
              }}
            >
              <span style={{ fontSize: '16px' }}>{selectedCountry.flag}</span>
              <ChevronDown style={{ width: '12px', height: '12px', color: '#9ca3af' }} />
            </button>
            
            {showCountryDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  zIndex: 10,
                  marginTop: '4px',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  minWidth: '200px'
                }}
              >
                {countries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => handleCountrySelect(country)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: '#374151',
                      borderBottom: '1px solid #f3f4f6',
                      transition: 'background-color 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    <span style={{ fontSize: '16px' }}>{country.flag}</span>
                    <span>{country.name}</span>
                    <span style={{ marginLeft: 'auto', color: '#9ca3af', fontSize: '12px' }}>
                      {country.dialCode}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        )}
        
        <input
          type="tel"
          className={getInputClass()}
          placeholder={placeholder}
          value={value}
          onChange={handlePhoneChange}
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
          <Phone style={{ width: '16px', height: '16px', color: '#9ca3af' }} />
          
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
          Valid phone number
        </motion.p>
      )}
    </div>
  );
};

export default PhoneInput; 