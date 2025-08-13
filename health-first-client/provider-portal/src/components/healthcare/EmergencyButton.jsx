import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MedicalIcon, QuickIcons } from '../IconLibrary'
import { typeClasses } from '../../utils/TypeScale'

const EmergencyButton = ({ 
  onEmergency, 
  disabled = false,
  size = 'default',
  showConfirmation = true,
  emergencyType = 'general',
  className = ''
}) => {
  const [showConfirm, setShowConfirm] = useState(false)
  const [isActivating, setIsActivating] = useState(false)

  // Size configurations
  const sizeConfig = {
    small: {
      button: 'w-12 h-12 text-sm',
      icon: 16,
      text: 'text-xs'
    },
    default: {
      button: 'w-16 h-16 text-base',
      icon: 24,
      text: 'text-sm'
    },
    large: {
      button: 'w-20 h-20 text-lg',
      icon: 32,
      text: 'text-base'
    }
  }

  // Emergency type configurations
  const emergencyConfig = {
    general: {
      label: 'Emergency',
      icon: 'emergency',
      bgColor: 'bg-healthcare-emergency',
      hoverColor: 'hover:bg-red-700',
      description: 'Activate general emergency protocol'
    },
    medical: {
      label: 'Medical Emergency',
      icon: 'critical',
      bgColor: 'bg-healthcare-emergency',
      hoverColor: 'hover:bg-red-700',
      description: 'Activate medical emergency response'
    },
    cardiac: {
      label: 'Cardiac Alert',
      icon: 'vitals',
      bgColor: 'bg-red-600',
      hoverColor: 'hover:bg-red-800',
      description: 'Activate cardiac emergency protocol'
    },
    code: {
      label: 'Code Blue',
      icon: 'emergencyCall',
      bgColor: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-800',
      description: 'Activate Code Blue emergency response'
    }
  }

  const config = emergencyConfig[emergencyType] || emergencyConfig.general
  const size_config = sizeConfig[size] || sizeConfig.default

  const handleEmergencyClick = () => {
    if (disabled) return

    if (showConfirmation) {
      setShowConfirm(true)
    } else {
      activateEmergency()
    }
  }

  const activateEmergency = async () => {
    setIsActivating(true)
    setShowConfirm(false)
    
    try {
      await onEmergency?.(emergencyType)
    } finally {
      setIsActivating(false)
    }
  }

  const cancelEmergency = () => {
    setShowConfirm(false)
  }

  return (
    <div className={`relative ${className}`}>
      {/* Main Emergency Button */}
      <motion.button
        className={`
          ${size_config.button} ${config.bgColor} ${config.hoverColor}
          text-white font-bold rounded-full shadow-lg
          flex items-center justify-center
          relative overflow-hidden
          transition-all duration-200
          focus:outline-none focus:ring-4 focus:ring-red-300
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${isActivating ? 'animate-bounce' : ''}
        `}
        whileHover={!disabled ? { scale: 1.05 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
        onClick={handleEmergencyClick}
        disabled={disabled || isActivating}
        aria-label={config.description}
        role="button"
      >
        {/* Pulse Animation Background */}
        <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
        <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse" />
        
        {/* Icon */}
        <div className="relative z-10">
          {isActivating ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <MedicalIcon name="urgent" size={size_config.icon} variant="inverse" />
            </motion.div>
          ) : (
            <MedicalIcon name={config.icon} size={size_config.icon} variant="inverse" />
          )}
        </div>

        {/* Ripple Effect on Click */}
        <motion.div
          className="absolute inset-0 bg-white/30 rounded-full"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6 }}
          key={showConfirm ? 'confirm' : 'normal'}
        />
      </motion.button>

      {/* Button Label */}
      <div className={`mt-2 text-center ${size_config.text} font-semibold text-gray-700`}>
        {config.label}
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 max-w-sm mx-4 shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              {/* Alert Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <MedicalIcon name="emergency" size={32} variant="emergency" />
                </div>
              </div>

              {/* Confirmation Content */}
              <div className="text-center">
                <h3 className={typeClasses.heading.h3}>
                  Activate {config.label}?
                </h3>
                <p className={`mt-2 ${typeClasses.body.regular} text-gray-600`}>
                  This will immediately alert emergency response teams and medical staff.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-6">
                <motion.button
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={cancelEmergency}
                >
                  Cancel
                </motion.button>
                <motion.button
                  className={`flex-1 px-4 py-2 ${config.bgColor} text-white rounded-lg ${config.hoverColor} transition-colors font-semibold`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={activateEmergency}
                >
                  Activate Emergency
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Activation Status */}
      <AnimatePresence>
        {isActivating && (
          <motion.div
            className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            Activating...
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen Reader Status */}
      <div className="sr-only" aria-live="assertive">
        {isActivating && `${config.label} is being activated`}
        {showConfirm && `${config.label} confirmation dialog is open`}
      </div>
    </div>
  )
}

// Pre-configured emergency button variants
export const EmergencyVariants = {
  Medical: (props) => (
    <EmergencyButton emergencyType="medical" {...props} />
  ),
  Cardiac: (props) => (
    <EmergencyButton emergencyType="cardiac" {...props} />
  ),
  CodeBlue: (props) => (
    <EmergencyButton emergencyType="code" {...props} />
  ),
  General: (props) => (
    <EmergencyButton emergencyType="general" {...props} />
  )
}

export default EmergencyButton 