import React from 'react'
import { motion } from 'framer-motion'
import { MedicalIcon, QuickIcons } from '../IconLibrary'
import { typeClasses } from '../../utils/TypeScale'

const PatientCard = ({ 
  patient, 
  showVitals = true, 
  showFullDetails = false,
  onViewDetails,
  className = '' 
}) => {
  const {
    id,
    name,
    age,
    gender,
    bloodType,
    condition,
    status = 'normal',
    lastVisit,
    nextAppointment,
    vitals = {},
    medications = [],
    allergies = [],
    emergencyContact
  } = patient

  // Status variant mapping for healthcare states
  const statusConfig = {
    normal: {
      borderColor: 'border-healthcare-secondary',
      bgColor: 'bg-green-50',
      textColor: 'text-healthcare-secondary',
      indicator: 'bg-healthcare-secondary'
    },
    critical: {
      borderColor: 'border-healthcare-emergency',
      bgColor: 'bg-red-50',
      textColor: 'text-healthcare-emergency',
      indicator: 'bg-healthcare-emergency animate-pulse'
    },
    warning: {
      borderColor: 'border-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      indicator: 'bg-yellow-500'
    },
    pending: {
      borderColor: 'border-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      indicator: 'bg-purple-500'
    }
  }

  const config = statusConfig[status] || statusConfig.normal

  const VitalsDisplay = () => (
    <div className="grid grid-cols-3 gap-3 mt-4 p-3 bg-slate-50/50 rounded-lg">
      <div className="text-center">
        <div className="flex items-center justify-center mb-1">
          <QuickIcons.Vitals size={14} />
          <span className={`ml-1 ${typeClasses.data.vitals}`}>
            {vitals.heartRate || '--'}
          </span>
        </div>
        <span className={typeClasses.label.secondary}>BPM</span>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center mb-1">
          <MedicalIcon name="temperature" size={14} variant="default" />
          <span className={`ml-1 ${typeClasses.data.vitals}`}>
            {vitals.temperature || '--'}
          </span>
        </div>
        <span className={typeClasses.label.secondary}>°F</span>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center mb-1">
          <MedicalIcon name="vitalsChart" size={14} variant="default" />
          <span className={`ml-1 ${typeClasses.data.vitals}`}>
            {vitals.bloodPressure || '--/--'}
          </span>
        </div>
        <span className={typeClasses.label.secondary}>mmHg</span>
      </div>
    </div>
  )

  return (
    <motion.div
      className={`relative bg-white rounded-xl shadow-md border-l-4 ${config.borderColor} ${config.bgColor} p-6 cursor-pointer hover:shadow-lg transition-all duration-200 ${className}`}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onViewDetails}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onViewDetails?.()}
      aria-label={`View details for patient ${name}`}
    >
      {/* Status Indicator */}
      <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${config.indicator}`} />
      
      {/* Patient Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-healthcare-primary/10 rounded-full flex items-center justify-center">
            <QuickIcons.Patient size={24} variant="default" />
          </div>
          <div>
            <h3 className={typeClasses.heading.h3}>{name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className={typeClasses.body.small}>
                {age} yr • {gender} • {bloodType}
              </span>
            </div>
          </div>
        </div>
        
        {/* Quick Action */}
        <motion.button
          className="p-2 hover:bg-healthcare-primary/10 rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation()
            // Handle quick action
          }}
          aria-label="Quick actions"
        >
          <MedicalIcon name="expand" size={16} variant="muted" />
        </motion.button>
      </div>

      {/* Medical Condition */}
      {condition && (
        <div className="mb-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}>
            <MedicalIcon name="examination" size={12} className="mr-1" />
            {condition}
          </span>
        </div>
      )}

      {/* Vitals Section */}
      {showVitals && <VitalsDisplay />}

      {/* Additional Info for Full Details */}
      {showFullDetails && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 space-y-3"
        >
          {/* Medications */}
          {medications.length > 0 && (
            <div>
              <h4 className={typeClasses.label.primary}>Current Medications</h4>
              <div className="flex flex-wrap gap-1 mt-1">
                {medications.slice(0, 3).map((med, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-800"
                  >
                    <QuickIcons.Prescription size={10} className="mr-1" />
                    {med}
                  </span>
                ))}
                {medications.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{medications.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Allergies */}
          {allergies.length > 0 && (
            <div>
              <h4 className={typeClasses.label.primary}>Allergies</h4>
              <div className="flex flex-wrap gap-1 mt-1">
                {allergies.map((allergy, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-red-100 text-red-800"
                  >
                    <MedicalIcon name="warning" size={10} className="mr-1" />
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Last Visit & Next Appointment */}
          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
            <div>
              <span className={typeClasses.label.secondary}>Last Visit</span>
              <p className={typeClasses.body.small}>{lastVisit || 'N/A'}</p>
            </div>
            <div>
              <span className={typeClasses.label.secondary}>Next Appointment</span>
              <p className={typeClasses.body.small}>{nextAppointment || 'None scheduled'}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Actions Footer */}
      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <motion.button
            className="p-2 hover:bg-healthcare-primary/10 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation()
              // Handle schedule appointment
            }}
            aria-label="Schedule appointment"
          >
            <QuickIcons.Schedule size={16} variant="default" />
          </motion.button>
          
          <motion.button
            className="p-2 hover:bg-healthcare-primary/10 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation()
              // Handle message patient
            }}
            aria-label="Message patient"
          >
            <MedicalIcon name="messages" size={16} variant="default" />
          </motion.button>
        </div>
        
        <span className={`${typeClasses.label.secondary} capitalize`}>
          {status} Status
        </span>
      </div>

      {/* ARIA Live Region for Status Updates */}
      <div 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      >
        Patient {name} has {status} status with {vitals.heartRate ? `heart rate ${vitals.heartRate} BPM` : 'vitals pending'}
      </div>
    </motion.div>
  )
}

export default PatientCard 