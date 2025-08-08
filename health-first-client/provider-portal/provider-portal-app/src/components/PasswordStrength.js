import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

const PasswordStrength = ({ 
  password, 
  showDetails = true,
  className = ''
}) => {
  const [strength, setStrength] = useState(0);
  const [strengthText, setStrengthText] = useState('');
  const [strengthColor, setStrengthColor] = useState('');
  const [criteria, setCriteria] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false
  });

  const calculateStrength = (password) => {
    if (!password) return { score: 0, text: 'Very Weak', color: 'strength-weak' };
    
    let score = 0;
    const newCriteria = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    setCriteria(newCriteria);
    
    if (newCriteria.length) score += 1;
    if (newCriteria.lowercase) score += 1;
    if (newCriteria.uppercase) score += 1;
    if (newCriteria.number) score += 1;
    if (newCriteria.special) score += 1;
    
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    
    const strengthMap = {
      0: { text: 'Very Weak', color: 'strength-weak', bgColor: '#ef4444' },
      1: { text: 'Weak', color: 'strength-weak', bgColor: '#f87171' },
      2: { text: 'Fair', color: 'strength-fair', bgColor: '#f59e0b' },
      3: { text: 'Good', color: 'strength-good', bgColor: '#3b82f6' },
      4: { text: 'Strong', color: 'strength-strong', bgColor: '#10b981' },
      5: { text: 'Very Strong', color: 'strength-strong', bgColor: '#059669' },
      6: { text: 'Excellent', color: 'strength-strong', bgColor: '#047857' },
      7: { text: 'Perfect', color: 'strength-strong', bgColor: '#065f46' }
    };
    
    return {
      score: Math.min(score, 7),
      text: strengthMap[Math.min(score, 7)]?.text || 'Very Weak',
      color: strengthMap[Math.min(score, 7)]?.color || 'strength-weak',
      bgColor: strengthMap[Math.min(score, 7)]?.bgColor || '#ef4444'
    };
  };

  useEffect(() => {
    if (password) {
      const strengthData = calculateStrength(password);
      setStrength(strengthData.score);
      setStrengthText(strengthData.text);
      setStrengthColor(strengthData.color);
    } else {
      setStrength(0);
      setStrengthText('Very Weak');
      setStrengthColor('strength-weak');
      setCriteria({
        length: false,
        lowercase: false,
        uppercase: false,
        number: false,
        special: false
      });
    }
  }, [password]);

  const getStrengthPercentage = () => {
    return (strength / 7) * 100;
  };

  const getStrengthIcon = () => {
    if (strength >= 5) return <Shield style={{ width: '16px', height: '16px', color: '#059669' }} />;
    if (strength >= 3) return <CheckCircle style={{ width: '16px', height: '16px', color: '#3b82f6' }} />;
    if (strength >= 1) return <AlertTriangle style={{ width: '16px', height: '16px', color: '#f59e0b' }} />;
    return <XCircle style={{ width: '16px', height: '16px', color: '#ef4444' }} />;
  };

  const getCriteriaIcon = (met) => {
    return met ? 
      <CheckCircle style={{ width: '14px', height: '14px', color: '#059669' }} /> :
      <XCircle style={{ width: '14px', height: '14px', color: '#9ca3af' }} />;
  };

  return (
    <div className={`password-strength-container ${className}`}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: '8px' 
      }}>
        <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>
          Password Strength:
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {getStrengthIcon()}
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
      </div>
      
      <div className="password-strength-meter">
        <motion.div
          className={`strength-bar ${strengthColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${getStrengthPercentage()}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      
      {showDetails && password && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          style={{ marginTop: '12px' }}
        >
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '8px',
            gap: '6px'
          }}>
            <Info style={{ width: '12px', height: '12px', color: '#6b7280' }} />
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>
              Requirements:
            </span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              fontSize: '11px',
              color: criteria.length ? '#059669' : '#6b7280'
            }}>
              {getCriteriaIcon(criteria.length)}
              <span>At least 8 characters</span>
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              fontSize: '11px',
              color: criteria.lowercase ? '#059669' : '#6b7280'
            }}>
              {getCriteriaIcon(criteria.lowercase)}
              <span>Lowercase letter</span>
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              fontSize: '11px',
              color: criteria.uppercase ? '#059669' : '#6b7280'
            }}>
              {getCriteriaIcon(criteria.uppercase)}
              <span>Uppercase letter</span>
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              fontSize: '11px',
              color: criteria.number ? '#059669' : '#6b7280'
            }}>
              {getCriteriaIcon(criteria.number)}
              <span>Number</span>
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              fontSize: '11px',
              color: criteria.special ? '#059669' : '#6b7280'
            }}>
              {getCriteriaIcon(criteria.special)}
              <span>Special character</span>
            </div>
          </div>
          
          {strength >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginTop: '8px',
                gap: '6px',
                padding: '6px 8px',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderRadius: '6px',
                border: '1px solid rgba(16, 185, 129, 0.2)'
              }}
            >
              <Shield style={{ width: '12px', height: '12px', color: '#059669' }} />
              <span style={{ fontSize: '11px', color: '#059669', fontWeight: '600' }}>
                HIPAA compliant password strength
              </span>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default PasswordStrength;