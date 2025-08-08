import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const Checkbox = ({ 
  label, 
  checked, 
  onChange, 
  disabled = false,
  required = false 
}) => {
  return (
    <label style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '12px',
      cursor: disabled ? 'not-allowed' : 'pointer'
    }}>
      <div style={{ position: 'relative' }}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          required={required}
          style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
        />
        
        <motion.div
          style={{
            width: '20px',
            height: '20px',
            border: '2px solid',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: checked ? '#0f766e' : '#ffffff',
            borderColor: checked ? '#0f766e' : '#d1d5db',
            opacity: disabled ? 0.5 : 1,
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: checked ? '0 2px 4px rgba(15, 118, 110, 0.2)' : 'none'
          }}
          whileHover={!disabled ? { scale: 1.05 } : {}}
          whileTap={!disabled ? { scale: 0.95 } : {}}
          onMouseEnter={(e) => {
            if (!disabled && !checked) {
              e.target.style.borderColor = '#0f766e';
              e.target.style.backgroundColor = 'rgba(15, 118, 110, 0.05)';
            }
          }}
          onMouseLeave={(e) => {
            if (!disabled && !checked) {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.backgroundColor = '#ffffff';
            }
          }}
        >
          {checked && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <Check style={{ width: '12px', height: '12px', color: 'white' }} />
            </motion.div>
          )}
        </motion.div>
        
        {/* Ripple effect */}
        {checked && (
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '6px',
              backgroundColor: 'rgba(15, 118, 110, 0.2)'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        )}
      </div>
      
      <span style={{ 
        fontSize: '14px',
        color: disabled ? '#9ca3af' : '#374151',
        userSelect: 'none',
        fontWeight: '500',
        transition: 'color 0.2s ease'
      }}>
        {label}
        {required && <span style={{ color: '#dc2626', marginLeft: '4px' }}>*</span>}
      </span>
    </label>
  );
};

export default Checkbox; 