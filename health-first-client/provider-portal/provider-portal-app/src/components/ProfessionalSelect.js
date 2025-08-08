import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ChevronDown, 
  User, 
  Heart, 
  Brain, 
  Eye, 
  Baby, 
  Bone, 
  Stethoscope,
  Pill,
  Activity,
  Zap,
  Shield,
  Users,
  Clock,
  Award
} from 'lucide-react';

const ProfessionalSelect = ({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  error, 
  required = false,
  type = 'specialization'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const dropdownRef = useRef(null);

  const specializations = [
    { value: 'cardiology', label: 'Cardiology', icon: <Heart className="w-4 h-4" />, description: 'Heart and cardiovascular system' },
    { value: 'dermatology', label: 'Dermatology', icon: <Shield className="w-4 h-4" />, description: 'Skin, hair, and nails' },
    { value: 'emergency-medicine', label: 'Emergency Medicine', icon: <Zap className="w-4 h-4" />, description: 'Acute care and trauma' },
    { value: 'family-medicine', label: 'Family Medicine', icon: <Users className="w-4 h-4" />, description: 'Primary care for all ages' },
    { value: 'gastroenterology', label: 'Gastroenterology', icon: <Activity className="w-4 h-4" />, description: 'Digestive system' },
    { value: 'internal-medicine', label: 'Internal Medicine', icon: <User className="w-4 h-4" />, description: 'Adult primary care' },
    { value: 'neurology', label: 'Neurology', icon: <Brain className="w-4 h-4" />, description: 'Nervous system disorders' },
    { value: 'obstetrics-gynecology', label: 'Obstetrics & Gynecology', icon: <Baby className="w-4 h-4" />, description: 'Women\'s health' },
    { value: 'oncology', label: 'Oncology', icon: <Pill className="w-4 h-4" />, description: 'Cancer treatment' },
    { value: 'ophthalmology', label: 'Ophthalmology', icon: <Eye className="w-4 h-4" />, description: 'Eye care and vision' },
    { value: 'orthopedics', label: 'Orthopedics', icon: <Bone className="w-4 h-4" />, description: 'Bones and joints' },
    { value: 'pediatrics', label: 'Pediatrics', icon: <Baby className="w-4 h-4" />, description: 'Child and adolescent care' },
    { value: 'psychiatry', label: 'Psychiatry', icon: <Brain className="w-4 h-4" />, description: 'Mental health' },
    { value: 'radiology', label: 'Radiology', icon: <Activity className="w-4 h-4" />, description: 'Medical imaging' },
    { value: 'surgery', label: 'Surgery', icon: <Stethoscope className="w-4 h-4" />, description: 'Surgical procedures' },
    { value: 'urology', label: 'Urology', icon: <Activity className="w-4 h-4" />, description: 'Urinary system' },
    { value: 'other', label: 'Other', icon: <User className="w-4 h-4" />, description: 'Other specializations' }
  ];

  const experienceLevels = [
    { value: '0', label: '0 years', icon: <Clock className="w-4 h-4" />, description: 'New graduate' },
    { value: '1', label: '1 year', icon: <Clock className="w-4 h-4" />, description: 'Early career' },
    { value: '2-5', label: '2-5 years', icon: <Clock className="w-4 h-4" />, description: 'Established practice' },
    { value: '6-10', label: '6-10 years', icon: <Award className="w-4 h-4" />, description: 'Experienced' },
    { value: '11-15', label: '11-15 years', icon: <Award className="w-4 h-4" />, description: 'Senior level' },
    { value: '16-20', label: '16-20 years', icon: <Award className="w-4 h-4" />, description: 'Expert level' },
    { value: '20+', label: '20+ years', icon: <Award className="w-4 h-4" />, description: 'Veteran practitioner' }
  ];

  const options = type === 'specialization' ? specializations : experienceLevels;

  useEffect(() => {
    const filtered = options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      option.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [searchTerm, options]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(option => option.value === value);

  const getInputClass = () => {
    let baseClass = 'lightwind-input cursor-pointer';
    if (error) baseClass += ' error';
    return baseClass;
  };

  const handleSelect = (option) => {
    onChange({ target: { value: option.value } });
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="form-group" ref={dropdownRef}>
      <label className="form-label">
        {label}
        {required && <span className="form-required">*</span>}
      </label>
      
      <div style={{ position: 'relative' }}>
        <div
          className={getInputClass()}
          onClick={() => setIsOpen(!isOpen)}
          style={{ cursor: 'pointer' }}
        >
          {selectedOption ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {selectedOption.icon}
              <span>{selectedOption.label}</span>
            </div>
          ) : (
            <span style={{ color: '#9ca3af' }}>{placeholder}</span>
          )}
        </div>
        
        <div style={{ 
          position: 'absolute', 
          right: '12px', 
          top: '50%', 
          transform: 'translateY(-50%)',
          transition: 'transform 0.2s ease'
        }}>
          <ChevronDown 
            style={{ 
              width: '16px', 
              height: '16px', 
              color: '#9ca3af',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
            }} 
          />
        </div>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
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
                marginTop: '4px',
                maxHeight: '300px',
                overflowY: 'auto'
              }}
            >
              <div style={{ padding: '12px', borderBottom: '1px solid #f3f4f6' }}>
                <div style={{ position: 'relative' }}>
                  <Search style={{ 
                    position: 'absolute', 
                    left: '12px', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    width: '16px',
                    height: '16px',
                    color: '#9ca3af'
                  }} />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px 8px 36px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
              
              <div>
                {filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option)}
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
                      gap: '12px'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    <div style={{ color: '#0f766e' }}>
                      {option.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '500', marginBottom: '2px' }}>
                        {option.label}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>
                        {option.description}
                      </div>
                    </div>
                  </button>
                ))}
                
                {filteredOptions.length === 0 && (
                  <div style={{ 
                    padding: '16px', 
                    textAlign: 'center', 
                    color: '#6b7280',
                    fontSize: '14px'
                  }}>
                    No options found
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
          <User style={{ width: '16px', height: '16px', marginRight: '4px' }} />
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default ProfessionalSelect; 