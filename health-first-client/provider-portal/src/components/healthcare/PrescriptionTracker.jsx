import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MedicalIcon, QuickIcons } from '../IconLibrary'
import { typeClasses } from '../../utils/TypeScale'

const PrescriptionTracker = ({ 
  prescriptions = [],
  patientId,
  onAddPrescription,
  onUpdatePrescription,
  onDiscontinue,
  className = ''
}) => {
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedMedication, setSelectedMedication] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)

  // Filter prescriptions based on status
  const filteredPrescriptions = prescriptions.filter(prescription => {
    if (filterStatus === 'all') return true
    return prescription.status === filterStatus
  })

  // Status configurations
  const statusConfig = {
    active: {
      color: 'bg-green-100 text-green-800 border-green-200',
      indicator: 'bg-green-500',
      label: 'Active'
    },
    completed: {
      color: 'bg-gray-100 text-gray-600 border-gray-200',
      indicator: 'bg-gray-400',
      label: 'Completed'
    },
    discontinued: {
      color: 'bg-red-100 text-red-600 border-red-200',
      indicator: 'bg-red-500',
      label: 'Discontinued'
    },
    pending: {
      color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      indicator: 'bg-yellow-500',
      label: 'Pending'
    }
  }

  // Calculate medication adherence
  const calculateAdherence = (prescription) => {
    const { dosesGiven = 0, totalDoses = 0 } = prescription
    if (totalDoses === 0) return 0
    return Math.round((dosesGiven / totalDoses) * 100)
  }

  // Get days remaining
  const getDaysRemaining = (endDate) => {
    const end = new Date(endDate)
    const now = new Date()
    const diffTime = end - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
  }

  const MedicationCard = ({ prescription }) => {
    const config = statusConfig[prescription.status] || statusConfig.active
    const adherence = calculateAdherence(prescription)
    const daysRemaining = getDaysRemaining(prescription.endDate)
    
    return (
      <motion.div
        className={`relative p-4 rounded-lg border-l-4 ${config.color} cursor-pointer hover:shadow-md transition-all duration-200`}
        whileHover={{ y: -2, scale: 1.01 }}
        onClick={() => setSelectedMedication(prescription)}
        layout
      >
        {/* Status Indicator */}
        <div className={`absolute top-3 right-3 w-2 h-2 rounded-full ${config.indicator}`} />
        
        {/* Medication Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-healthcare-primary/10 rounded-full flex items-center justify-center">
              <QuickIcons.Prescription size={20} variant="default" />
            </div>
            <div>
              <h4 className={typeClasses.heading.h4}>{prescription.medicationName}</h4>
              <p className={typeClasses.body.small}>{prescription.dosage} • {prescription.frequency}</p>
            </div>
          </div>
        </div>

        {/* Prescription Details */}
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <span className={typeClasses.label.secondary}>Prescribed by</span>
            <p className={typeClasses.body.small}>Dr. {prescription.prescribedBy}</p>
          </div>
          <div>
            <span className={typeClasses.label.secondary}>Start Date</span>
            <p className={typeClasses.body.small}>{prescription.startDate}</p>
          </div>
        </div>

        {/* Progress and Adherence */}
        {prescription.status === 'active' && (
          <div className="space-y-3">
            {/* Adherence Progress */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className={typeClasses.label.secondary}>Adherence</span>
                <span className={`${typeClasses.label.primary} ${adherence >= 80 ? 'text-green-600' : adherence >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {adherence}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full ${adherence >= 80 ? 'bg-green-500' : adherence >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${adherence}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Days Remaining */}
            <div className="flex justify-between items-center">
              <span className={typeClasses.label.secondary}>Days Remaining</span>
              <span className={`${typeClasses.body.small} ${daysRemaining <= 3 ? 'text-red-600 font-semibold' : ''}`}>
                {daysRemaining} days
              </span>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">
          <div className="flex space-x-2">
            {prescription.status === 'active' && (
              <>
                <motion.button
                  className="p-2 hover:bg-healthcare-primary/10 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    // Handle record dose
                  }}
                  aria-label="Record dose taken"
                >
                  <MedicalIcon name="success" size={14} variant="success" />
                </motion.button>
                
                <motion.button
                  className="p-2 hover:bg-healthcare-primary/10 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    onDiscontinue?.(prescription.id)
                  }}
                  aria-label="Discontinue medication"
                >
                  <MedicalIcon name="close" size={14} variant="warning" />
                </motion.button>
              </>
            )}
          </div>
          
          <span className={`${typeClasses.label.secondary} capitalize`}>
            {config.label}
          </span>
        </div>

        {/* Low Stock Warning */}
        {prescription.status === 'active' && daysRemaining <= 3 && (
          <motion.div
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
          >
            Low Stock
          </motion.div>
        )}
      </motion.div>
    )
  }

  const DosageTimeline = ({ prescription }) => {
    const timeline = prescription.dosageHistory || []
    
    return (
      <div className="space-y-3">
        <h4 className={typeClasses.heading.h4}>Dosage Timeline</h4>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-300" />
          
          {timeline.map((entry, index) => (
            <motion.div
              key={index}
              className="relative flex items-center space-x-4 pb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Timeline Dot */}
              <div className={`w-3 h-3 rounded-full z-10 ${entry.taken ? 'bg-green-500' : 'bg-red-500'}`} />
              
              {/* Entry Details */}
              <div className="flex-1 bg-white p-3 rounded-lg shadow-sm border">
                <div className="flex justify-between items-center">
                  <span className={typeClasses.body.small}>{entry.time}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${entry.taken ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {entry.taken ? 'Taken' : 'Missed'}
                  </span>
                </div>
                {entry.notes && (
                  <p className={`${typeClasses.label.secondary} mt-1`}>{entry.notes}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className={typeClasses.heading.h2}>Prescription Tracker</h2>
          <p className={`${typeClasses.body.regular} text-gray-600`}>
            Monitor medication adherence and schedules
          </p>
        </div>
        
        <motion.button
          className="px-4 py-2 bg-healthcare-primary text-white rounded-lg hover:bg-healthcare-primary/90 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddForm(true)}
        >
          <MedicalIcon name="add" size={16} variant="inverse" className="mr-2" />
          Add Prescription
        </motion.button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-6">
        {['all', 'active', 'completed', 'discontinued'].map((status) => (
          <motion.button
            key={status}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium capitalize
              ${filterStatus === status 
                ? 'bg-healthcare-primary text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
              transition-colors duration-200
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setFilterStatus(status)}
          >
            {status === 'all' ? 'All' : statusConfig[status]?.label || status}
          </motion.button>
        ))}
      </div>

      {/* Medications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <AnimatePresence>
          {filteredPrescriptions.map((prescription) => (
            <MedicationCard key={prescription.id} prescription={prescription} />
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredPrescriptions.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <QuickIcons.Prescription size={32} variant="muted" />
          </div>
          <h3 className={typeClasses.heading.h3}>No prescriptions found</h3>
          <p className={`${typeClasses.body.regular} text-gray-600`}>
            {filterStatus === 'all' 
              ? 'No prescriptions have been added yet.' 
              : `No ${filterStatus} prescriptions found.`
            }
          </p>
        </div>
      )}

      {/* Detailed View Modal */}
      <AnimatePresence>
        {selectedMedication && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedication(null)}
          >
            <motion.div
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className={typeClasses.heading.h3}>
                    {selectedMedication.medicationName}
                  </h3>
                  <motion.button
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedMedication(null)}
                  >
                    <MedicalIcon name="close" size={20} variant="muted" />
                  </motion.button>
                </div>
                
                <DosageTimeline prescription={selectedMedication} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ARIA Live Region */}
      <div className="sr-only" aria-live="polite">
        {filteredPrescriptions.length} prescriptions displayed
      </div>
    </div>
  )
}

export default PrescriptionTracker 