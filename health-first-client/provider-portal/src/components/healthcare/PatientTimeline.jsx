import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MedicalIcon, QuickIcons } from '../IconLibrary'
import { typeClasses } from '../../utils/TypeScale'

const PatientTimeline = ({ 
  timelineEvents = [],
  patientId,
  onEventClick,
  onAddEvent,
  showFilters = true,
  className = ''
}) => {
  const [filterType, setFilterType] = useState('all')
  const [expandedEvents, setExpandedEvents] = useState(new Set())
  const [timeRange, setTimeRange] = useState('all')

  // Event type configurations
  const eventTypes = {
    appointment: {
      label: 'Appointment',
      icon: 'appointments',
      color: 'blue',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-100',
      textColor: 'text-blue-800'
    },
    diagnosis: {
      label: 'Diagnosis',
      icon: 'examination',
      color: 'purple',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      iconBg: 'bg-purple-100',
      textColor: 'text-purple-800'
    },
    medication: {
      label: 'Medication',
      icon: 'prescriptions',
      color: 'green',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      iconBg: 'bg-green-100',
      textColor: 'text-green-800'
    },
    lab: {
      label: 'Lab Result',
      icon: 'vitalsChart',
      color: 'teal',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      iconBg: 'bg-teal-100',
      textColor: 'text-teal-800'
    },
    procedure: {
      label: 'Procedure',
      icon: 'critical',
      color: 'orange',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      iconBg: 'bg-orange-100',
      textColor: 'text-orange-800'
    },
    emergency: {
      label: 'Emergency',
      icon: 'emergency',
      color: 'red',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      iconBg: 'bg-red-100',
      textColor: 'text-red-800'
    },
    vitals: {
      label: 'Vital Signs',
      icon: 'vitals',
      color: 'pink',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      iconBg: 'bg-pink-100',
      textColor: 'text-pink-800'
    },
    surgery: {
      label: 'Surgery',
      icon: 'critical',
      color: 'indigo',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      iconBg: 'bg-indigo-100',
      textColor: 'text-indigo-800'
    }
  }

  // Filter events based on type and time range
  const filteredEvents = timelineEvents.filter(event => {
    const typeMatch = filterType === 'all' || event.type === filterType
    
    if (!timeRange || timeRange === 'all') return typeMatch
    
    const eventDate = new Date(event.date)
    const now = new Date()
    
    switch (timeRange) {
      case '7d':
        return typeMatch && (now - eventDate) <= 7 * 24 * 60 * 60 * 1000
      case '30d':
        return typeMatch && (now - eventDate) <= 30 * 24 * 60 * 60 * 1000
      case '6m':
        return typeMatch && (now - eventDate) <= 6 * 30 * 24 * 60 * 60 * 1000
      case '1y':
        return typeMatch && (now - eventDate) <= 365 * 24 * 60 * 60 * 1000
      default:
        return typeMatch
    }
  }).sort((a, b) => new Date(b.date) - new Date(a.date))

  // Group events by date
  const groupedEvents = filteredEvents.reduce((groups, event) => {
    const date = new Date(event.date).toDateString()
    if (!groups[date]) groups[date] = []
    groups[date].push(event)
    return groups
  }, {})

  const toggleEventExpansion = (eventId) => {
    setExpandedEvents(prev => {
      const newSet = new Set(prev)
      if (newSet.has(eventId)) {
        newSet.delete(eventId)
      } else {
        newSet.add(eventId)
      }
      return newSet
    })
  }

  const formatEventDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const formatEventTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const getRelativeDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
    return `${Math.floor(diffDays / 365)} years ago`
  }

  const TimelineEvent = ({ event, isLast = false }) => {
    const config = eventTypes[event.type] || eventTypes.appointment
    const isExpanded = expandedEvents.has(event.id)
    
    return (
      <motion.div
        className="relative"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        layout
      >
        {/* Timeline line */}
        {!isLast && (
          <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-300" />
        )}
        
        {/* Event content */}
        <div className="flex items-start space-x-4 pb-6">
          {/* Timeline dot/icon */}
          <motion.div
            className={`w-12 h-12 ${config.iconBg} rounded-full flex items-center justify-center relative z-10 shadow-sm`}
            whileHover={{ scale: 1.05 }}
          >
            <MedicalIcon name={config.icon} size={20} variant="default" />
          </motion.div>
          
          {/* Event card */}
          <motion.div
            className={`flex-1 ${config.bgColor} rounded-lg border ${config.borderColor} p-4 cursor-pointer hover:shadow-md transition-all duration-200`}
            whileHover={{ y: -2, scale: 1.01 }}
            onClick={() => {
              toggleEventExpansion(event.id)
              onEventClick?.(event)
            }}
            layout
          >
            {/* Event header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}>
                    {config.label}
                  </span>
                  {event.priority === 'high' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                      <MedicalIcon name="warning" size={10} className="mr-1" />
                      High Priority
                    </span>
                  )}
                </div>
                
                <h4 className={`${typeClasses.heading.h4} mb-1`}>{event.title}</h4>
                <p className={`${typeClasses.body.small} text-gray-600`}>{event.description}</p>
                
                {/* Event metadata */}
                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                  <span>{formatEventTime(event.date)}</span>
                  {event.provider && (
                    <span>Dr. {event.provider}</span>
                  )}
                  {event.location && (
                    <span>{event.location}</span>
                  )}
                </div>
              </div>
              
              {/* Expand/collapse button */}
              <motion.button
                className="p-1 hover:bg-white/50 rounded transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleEventExpansion(event.id)
                }}
              >
                <MedicalIcon 
                  name={isExpanded ? 'previous' : 'next'} 
                  size={14} 
                  variant="muted"
                  className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                />
              </motion.button>
            </div>
            
            {/* Expanded content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-t border-gray-200 pt-3 mt-3"
                >
                  {/* Additional details */}
                  {event.details && (
                    <div className="space-y-2">
                      {Object.entries(event.details).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className={`${typeClasses.label.secondary} capitalize`}>
                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>
                          <span className={typeClasses.body.small}>{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Attachments */}
                  {event.attachments && event.attachments.length > 0 && (
                    <div className="mt-3">
                      <h5 className={`${typeClasses.label.primary} mb-2`}>Attachments</h5>
                      <div className="space-y-1">
                        {event.attachments.map((attachment, index) => (
                          <motion.button
                            key={index}
                            className="flex items-center space-x-2 text-healthcare-primary hover:text-healthcare-primary/80 text-sm"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={(e) => {
                              e.stopPropagation()
                              // Handle attachment download
                            }}
                          >
                            <MedicalIcon name="document" size={14} />
                            <span>{attachment.name}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Follow-up actions */}
                  {event.followUp && (
                    <div className="mt-3 p-2 bg-yellow-50 rounded border border-yellow-200">
                      <div className="flex items-center space-x-2">
                        <MedicalIcon name="pending" size={14} variant="warning" />
                        <span className={`${typeClasses.label.primary} text-yellow-700`}>
                          Follow-up required: {event.followUp}
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className={typeClasses.heading.h2}>Patient Timeline</h2>
          <p className={`${typeClasses.body.regular} text-gray-600`}>
            Complete medical history and events
          </p>
        </div>
        
        <motion.button
          className="px-4 py-2 bg-healthcare-primary text-white rounded-lg hover:bg-healthcare-primary/90 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onAddEvent?.()}
        >
          <MedicalIcon name="add" size={16} variant="inverse" className="mr-2" />
          Add Event
        </motion.button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Event Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-primary"
          >
            <option value="all">All Events</option>
            {Object.entries(eventTypes).map(([key, config]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>
          
          {/* Time Range Filter */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-primary"
          >
            <option value="all">All Time</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="6m">Last 6 months</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      )}

      {/* Timeline */}
      <div className="relative">
        {Object.entries(groupedEvents).map(([dateString, events], groupIndex) => (
          <div key={dateString} className="mb-8">
            {/* Date header */}
            <div className="sticky top-0 bg-white z-10 mb-4">
              <div className="flex items-center space-x-3">
                <h3 className={typeClasses.heading.h3}>{formatEventDate(dateString)}</h3>
                <span className={`${typeClasses.label.secondary} text-gray-500`}>
                  {getRelativeDate(dateString)}
                </span>
              </div>
              <div className="h-px bg-gray-200 mt-2" />
            </div>
            
            {/* Events for this date */}
            <div className="space-y-0">
              {events.map((event, eventIndex) => (
                <TimelineEvent 
                  key={event.id} 
                  event={event} 
                  isLast={groupIndex === Object.keys(groupedEvents).length - 1 && eventIndex === events.length - 1}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MedicalIcon name="appointments" size={32} variant="muted" />
          </div>
          <h3 className={typeClasses.heading.h3}>No events found</h3>
          <p className={`${typeClasses.body.regular} text-gray-600`}>
            {filterType !== 'all' || timeRange !== 'all'
              ? 'Try adjusting your filters to see more events.'
              : 'Patient timeline events will appear here when available.'
            }
          </p>
        </div>
      )}

      {/* Summary */}
      {filteredEvents.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>
              Showing {filteredEvents.length} events
            </span>
            
            <div className="flex items-center space-x-4">
              {Object.entries(eventTypes).map(([key, config]) => {
                const count = filteredEvents.filter(event => event.type === key).length
                return count > 0 ? (
                  <div key={key} className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${config.iconBg}`} />
                    <span className="text-xs">{count} {config.label}</span>
                  </div>
                ) : null
              })}
            </div>
          </div>
        </div>
      )}

      {/* ARIA Live Region */}
      <div className="sr-only" aria-live="polite">
        Timeline showing {filteredEvents.length} events
      </div>
    </div>
  )
}

export default PatientTimeline 