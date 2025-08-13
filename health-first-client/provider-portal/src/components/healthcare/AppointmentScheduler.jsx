import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MedicalIcon, QuickIcons } from '../IconLibrary'
import { typeClasses } from '../../utils/TypeScale'

const AppointmentScheduler = ({ 
  date = new Date(),
  appointments = [],
  onAppointmentMove,
  onAppointmentCreate,
  onAppointmentEdit,
  providers = [],
  timeSlots = [],
  className = ''
}) => {
  const [draggedAppointment, setDraggedAppointment] = useState(null)
  const [dragOver, setDragOver] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [view, setView] = useState('day') // day, week, month
  
  const dragRef = useRef(null)

  // Generate time slots if not provided
  const defaultTimeSlots = timeSlots.length > 0 ? timeSlots : generateTimeSlots()

  function generateTimeSlots() {
    const slots = []
    for (let hour = 8; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        slots.push({
          id: `${hour}-${minute}`,
          time,
          available: true
        })
      }
    }
    return slots
  }

  // Appointment type configurations
  const appointmentTypes = {
    consultation: {
      label: 'Consultation',
      color: 'bg-blue-100 border-blue-300 text-blue-800',
      icon: 'examination',
      duration: 30
    },
    followup: {
      label: 'Follow-up',
      color: 'bg-green-100 border-green-300 text-green-800',
      icon: 'appointments',
      duration: 20
    },
    emergency: {
      label: 'Emergency',
      color: 'bg-red-100 border-red-300 text-red-800',
      icon: 'emergency',
      duration: 60
    },
    routine: {
      label: 'Routine Check',
      color: 'bg-purple-100 border-purple-300 text-purple-800',
      icon: 'vitals',
      duration: 45
    },
    specialist: {
      label: 'Specialist',
      color: 'bg-orange-100 border-orange-300 text-orange-800',
      icon: 'critical',
      duration: 60
    }
  }

  const handleDragStart = (e, appointment) => {
    setDraggedAppointment(appointment)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e, slotId) => {
    e.preventDefault()
    setDragOver(slotId)
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDragLeave = () => {
    setDragOver(null)
  }

  const handleDrop = (e, slotId) => {
    e.preventDefault()
    setDragOver(null)
    
    if (draggedAppointment) {
      onAppointmentMove?.(draggedAppointment, slotId)
      setDraggedAppointment(null)
    }
  }

  const handleSlotClick = (slot) => {
    if (slot.available) {
      setSelectedSlot(slot)
      setShowCreateModal(true)
    }
  }

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    return `${displayHour}:${minutes} ${ampm}`
  }

  const getAppointmentForSlot = (slotId) => {
    return appointments.find(apt => apt.slotId === slotId)
  }

  const AppointmentCard = ({ appointment, isDragging = false }) => {
    const config = appointmentTypes[appointment.type] || appointmentTypes.consultation
    
    return (
      <motion.div
        className={`
          ${config.color} p-3 rounded-lg border-l-4 cursor-move
          ${isDragging ? 'opacity-50 rotate-3 scale-105' : ''}
          transition-all duration-200 hover:shadow-md
        `}
        draggable
        onDragStart={(e) => handleDragStart(e, appointment)}
        whileHover={{ scale: 1.02 }}
        whileDrag={{ scale: 1.05, rotate: 3 }}
        layout
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <MedicalIcon name={config.icon} size={14} />
            <span className={`${typeClasses.label.primary} text-xs`}>
              {config.label}
            </span>
          </div>
          <span className={`${typeClasses.label.secondary} text-xs`}>
            {appointment.duration || config.duration}min
          </span>
        </div>
        
        <div className="space-y-1">
          <p className={`${typeClasses.body.small} font-semibold`}>
            {appointment.patientName}
          </p>
          <p className={`${typeClasses.label.secondary} text-xs`}>
            {appointment.reason}
          </p>
          {appointment.provider && (
            <p className={`${typeClasses.label.secondary} text-xs`}>
              Dr. {appointment.provider}
            </p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex justify-end mt-2 space-x-1">
          <motion.button
            className="p-1 hover:bg-white/50 rounded transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation()
              onAppointmentEdit?.(appointment)
            }}
          >
            <MedicalIcon name="edit" size={12} />
          </motion.button>
        </div>
      </motion.div>
    )
  }

  const TimeSlot = ({ slot }) => {
    const appointment = getAppointmentForSlot(slot.id)
    const isDropTarget = dragOver === slot.id
    
    return (
      <motion.div
        className={`
          min-h-[80px] p-2 border border-gray-200 rounded-lg
          ${slot.available ? 'bg-white hover:bg-gray-50' : 'bg-gray-100'}
          ${isDropTarget ? 'border-healthcare-primary bg-blue-50' : ''}
          transition-all duration-200 cursor-pointer
        `}
        onDragOver={(e) => handleDragOver(e, slot.id)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, slot.id)}
        onClick={() => handleSlotClick(slot)}
        whileHover={{ scale: 1.01 }}
        layout
      >
        <div className="flex justify-between items-center mb-2">
          <span className={`${typeClasses.label.primary} text-xs text-gray-600`}>
            {formatTime(slot.time)}
          </span>
          {slot.available && (
            <MedicalIcon name="add" size={12} variant="muted" />
          )}
        </div>
        
        {appointment && (
          <AppointmentCard 
            appointment={appointment} 
            isDragging={draggedAppointment?.id === appointment.id}
          />
        )}
        
        {isDropTarget && (
          <motion.div
            className="border-2 border-dashed border-healthcare-primary bg-blue-50/50 rounded-lg p-2 mt-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <span className="text-xs text-healthcare-primary">Drop here</span>
          </motion.div>
        )}
      </motion.div>
    )
  }

  return (
    <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className={typeClasses.heading.h2}>
            Appointment Scheduler
          </h2>
          <p className={`${typeClasses.body.regular} text-gray-600`}>
            {date.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        
        {/* View Toggle */}
        <div className="flex space-x-2">
          {['day', 'week'].map((viewType) => (
            <motion.button
              key={viewType}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium capitalize
                ${view === viewType 
                  ? 'bg-healthcare-primary text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
                transition-colors duration-200
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setView(viewType)}
            >
              {viewType}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Provider Filter */}
      {providers.length > 0 && (
        <div className="mb-4">
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-primary">
            <option value="">All Providers</option>
            {providers.map(provider => (
              <option key={provider.id} value={provider.id}>
                Dr. {provider.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Time Slots Grid */}
      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
        {defaultTimeSlots.map(slot => (
          <TimeSlot key={slot.id} slot={slot} />
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className={`${typeClasses.label.primary} mb-3`}>Appointment Types</h4>
        <div className="flex flex-wrap gap-3">
          {Object.entries(appointmentTypes).map(([key, config]) => (
            <div key={key} className="flex items-center space-x-2">
              <div className={`w-4 h-4 rounded border-l-4 ${config.color}`} />
              <span className={typeClasses.label.secondary}>{config.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Drag Instructions */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className={`${typeClasses.body.small} text-blue-700`}>
          💡 Drag appointments to reschedule, click empty slots to create new appointments
        </p>
      </div>

      {/* ARIA Live Region for Screen Readers */}
      <div className="sr-only" aria-live="polite">
        {draggedAppointment && `Moving appointment for ${draggedAppointment.patientName}`}
        {dragOver && `Hovering over time slot ${formatTime(defaultTimeSlots.find(s => s.id === dragOver)?.time || '')}`}
      </div>
    </div>
  )
}

export default AppointmentScheduler 