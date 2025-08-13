import { useState } from 'react';
import { HealthIcon, MedicalIcon } from './IconLibrary';
import { Typography } from '../../theme/TypeScale';

const PatientCard = ({ 
  patient, 
  vitals = {}, 
  onClick,
  className = '',
  showVitals = true,
  compact = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Default patient data structure
  const defaultPatient = {
    id: 'P001',
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    mrn: 'MRN123456',
    status: 'stable',
    lastVisit: '2024-01-15',
    condition: 'Routine Checkup',
    avatar: null,
    ...patient
  };
  
  // Default vitals with normal ranges
  const defaultVitals = {
    heartRate: { value: 72, unit: 'bpm', status: 'normal', range: '60-100' },
    bloodPressure: { value: '120/80', unit: 'mmHg', status: 'normal', range: '<140/90' },
    temperature: { value: 98.6, unit: '°F', status: 'normal', range: '97-99' },
    oxygenSat: { value: 98, unit: '%', status: 'normal', range: '95-100' },
    weight: { value: 165, unit: 'lbs', status: 'normal', range: 'BMI 18.5-24.9' },
    ...vitals
  };
  
  // Status styling
  const statusConfig = {
    critical: { 
      color: 'border-red-500 bg-red-50', 
      badge: 'bg-red-100 text-red-800 border-red-200',
      pulse: true 
    },
    warning: { 
      color: 'border-yellow-500 bg-yellow-50', 
      badge: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      pulse: false 
    },
    stable: { 
      color: 'border-green-500 bg-green-50', 
      badge: 'bg-green-100 text-green-800 border-green-200',
      pulse: false 
    },
    normal: { 
      color: 'border-gray-200 bg-white', 
      badge: 'bg-gray-100 text-gray-800 border-gray-200',
      pulse: false 
    }
  };
  
  const currentStatus = statusConfig[defaultPatient.status] || statusConfig.normal;
  
  // Vital sign component
  const VitalSign = ({ vital, label, icon }) => {
    if (!vital) return null;
    
    const _vitalStatus = statusConfig[vital.status] || statusConfig.normal;
    
    return (
      <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50/50 border border-gray-100 hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-2">
          <HealthIcon 
            name={icon} 
            size={16} 
            status={vital.status}
            className="text-gray-600"
          />
          <Typography.BodySmall className="text-gray-600 font-medium">
            {label}
          </Typography.BodySmall>
        </div>
        <div className="text-right">
          <Typography.Data className={`text-gray-800 ${vital.status === 'critical' ? 'text-red-600' : ''}`}>
            {vital.value} {vital.unit}
          </Typography.Data>
          {vital.range && (
            <Typography.Caption className="text-gray-500">
              Normal: {vital.range}
            </Typography.Caption>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div 
      className={`
        relative bg-white rounded-2xl border-2 transition-all duration-300 cursor-pointer
        ${currentStatus.color}
        ${currentStatus.pulse ? 'animate-pulse-gentle' : ''}
        ${isHovered ? 'shadow-xl -translate-y-1 scale-[1.02]' : 'shadow-lg'}
        ${compact ? 'p-4' : 'p-6'}
        ${className}
      `}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`Patient card for ${defaultPatient.name}`}
    >
      {/* Emergency indicator */}
      {defaultPatient.status === 'critical' && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="bg-red-500 text-white rounded-full p-2 shadow-lg animate-pulse">
            <MedicalIcon.Emergency size={16} />
          </div>
        </div>
      )}
      
      {/* Patient Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-semibold text-lg shadow-md">
            {defaultPatient.avatar ? (
              <img 
                src={defaultPatient.avatar} 
                alt={defaultPatient.name}
                className="w-full h-full rounded-xl object-cover"
              />
            ) : (
              defaultPatient.name.split(' ').map(n => n[0]).join('').toUpperCase()
            )}
          </div>
          
          {/* Patient Info */}
          <div>
            <Typography.H4 className="text-gray-900 mb-1">
              {defaultPatient.name}
            </Typography.H4>
            <div className="flex items-center gap-3">
              <Typography.BodySmall className="text-gray-600">
                Age: {defaultPatient.age} • {defaultPatient.gender}
              </Typography.BodySmall>
              <span className="text-gray-300">•</span>
              <Typography.Caption className="text-gray-500">
                MRN: {defaultPatient.mrn}
              </Typography.Caption>
            </div>
          </div>
        </div>
        
        {/* Status Badge */}
        <div className={`
          inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border
          ${currentStatus.badge}
        `}>
          <HealthIcon 
            name={defaultPatient.status === 'critical' ? 'critical' : 
                  defaultPatient.status === 'warning' ? 'warning' : 'normal'} 
            size={12} 
          />
          {defaultPatient.status.charAt(0).toUpperCase() + defaultPatient.status.slice(1)}
        </div>
      </div>
      
      {/* Condition & Last Visit */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <Typography.BodySmall className="text-gray-600 mb-1">
              Current Condition
            </Typography.BodySmall>
            <Typography.Body className="text-gray-800 font-medium">
              {defaultPatient.condition}
            </Typography.Body>
          </div>
          <div className="text-right">
            <Typography.BodySmall className="text-gray-600 mb-1">
              Last Visit
            </Typography.BodySmall>
            <Typography.Body className="text-gray-800">
              {new Date(defaultPatient.lastVisit).toLocaleDateString()}
            </Typography.Body>
          </div>
        </div>
      </div>
      
      {/* Vitals Section */}
      {showVitals && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-3">
            <MedicalIcon.HeartRate size={16} />
            <Typography.H5 className="text-gray-700">
              Vital Signs
            </Typography.H5>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            <VitalSign 
              vital={defaultVitals.heartRate} 
              label="Heart Rate" 
              icon="pulse" 
            />
            <VitalSign 
              vital={defaultVitals.bloodPressure} 
              label="Blood Pressure" 
              icon="activity" 
            />
            {!compact && (
              <>
                <VitalSign 
                  vital={defaultVitals.temperature} 
                  label="Temperature" 
                  icon="temperature" 
                />
                <VitalSign 
                  vital={defaultVitals.oxygenSat} 
                  label="Oxygen Saturation" 
                  icon="activity" 
                />
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Action Buttons */}
      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
        <button className="flex-1 bg-[#2A5C8D] text-white py-2 px-4 rounded-lg hover:bg-[#1e4066] transition-colors flex items-center justify-center gap-2">
          <HealthIcon name="view" size={16} />
          <span className="text-sm font-medium">View Details</span>
        </button>
        <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
          <HealthIcon name="edit" size={16} />
          <span className="text-sm font-medium">Update</span>
        </button>
      </div>
    </div>
  );
};

export default PatientCard; 