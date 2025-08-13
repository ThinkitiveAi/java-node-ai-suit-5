import { useState, useCallback } from 'react';
import { HealthIcon, MedicalIcon } from './IconLibrary';
import { Typography } from '../../theme/TypeScale';

const AppointmentScheduler = ({ 
  appointments = [], 
  onAppointmentUpdate,
  onAppointmentCreate,
  timeSlots = [],
  // eslint-disable-next-line no-unused-vars
  providers = [], // For future provider filtering functionality
  className = '' 
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [draggedAppointment, setDraggedAppointment] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  
  // Generate default time slots if none provided
  const defaultTimeSlots = Array.from({ length: 16 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8; // Start at 8 AM
    const minute = (i % 2) * 30;
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  });
  
  const availableTimeSlots = timeSlots.length > 0 ? timeSlots : defaultTimeSlots;
  
  // Sample appointment types with colors
  const appointmentTypes = {
    checkup: { label: 'Routine Checkup', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    followup: { label: 'Follow-up', color: 'bg-green-100 text-green-800 border-green-200' },
    urgent: { label: 'Urgent Care', color: 'bg-red-100 text-red-800 border-red-200' },
    consultation: { label: 'Consultation', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    therapy: { label: 'Therapy', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' }
  };
  
  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Check if appointment exists for time slot
  const getAppointmentForSlot = useCallback((timeSlot) => {
    return appointments.find(apt => 
      apt.time === timeSlot && 
      apt.date === selectedDate.toISOString().split('T')[0]
    );
  }, [appointments, selectedDate]);
  
  // Drag and drop handlers
  const handleDragStart = (e, appointment) => {
    setDraggedAppointment(appointment);
    e.dataTransfer.effectAllowed = 'move';
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };
  
  const handleDrop = (e, newTimeSlot) => {
    e.preventDefault();
    if (draggedAppointment && draggedAppointment.time !== newTimeSlot) {
      const updatedAppointment = {
        ...draggedAppointment,
        time: newTimeSlot
      };
      onAppointmentUpdate?.(updatedAppointment);
    }
    setDraggedAppointment(null);
  };
  
  // Create new appointment
  const handleCreateAppointment = (appointmentData) => {
    const newAppointment = {
      id: Date.now().toString(),
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTimeSlot,
      ...appointmentData
    };
    onAppointmentCreate?.(newAppointment);
    setShowCreateModal(false);
    setSelectedTimeSlot(null);
  };
  
  // Time slot component
  const TimeSlot = ({ time, appointment }) => {
    const isEmpty = !appointment;
    
    return (
      <div
        className={`
          relative p-3 min-h-[80px] border-2 border-dashed rounded-lg
          transition-all duration-200 cursor-pointer
          ${isEmpty 
            ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/30' 
            : 'border-transparent'
          }
          ${draggedAppointment ? 'hover:border-green-400 hover:bg-green-50' : ''}
        `}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, time)}
        onClick={() => {
          if (isEmpty) {
            setSelectedTimeSlot(time);
            setShowCreateModal(true);
          }
        }}
      >
        {/* Time label */}
        <div className="absolute top-1 left-2">
          <Typography.Caption className="text-gray-500 font-medium">
            {time}
          </Typography.Caption>
        </div>
        
        {appointment ? (
          <div
            className={`
              mt-4 p-3 rounded-lg border cursor-move
              shadow-sm hover:shadow-md transition-all duration-200
              ${appointmentTypes[appointment.type]?.color || appointmentTypes.checkup.color}
            `}
            draggable
            onDragStart={(e) => handleDragStart(e, appointment)}
          >
            <div className="flex items-start justify-between mb-2">
              <Typography.BodySmall className="font-semibold">
                {appointment.patientName}
              </Typography.BodySmall>
              <HealthIcon 
                name="menu" 
                size={14} 
                className="text-gray-400 cursor-move" 
              />
            </div>
            
            <Typography.Caption className="block mb-1">
              {appointmentTypes[appointment.type]?.label || 'Appointment'}
            </Typography.Caption>
            
            {appointment.provider && (
              <Typography.Caption className="text-gray-600">
                Dr. {appointment.provider}
              </Typography.Caption>
            )}
            
            {appointment.duration && (
              <div className="flex items-center gap-1 mt-1">
                <HealthIcon name="clock" size={12} className="text-gray-500" />
                <Typography.Caption className="text-gray-500">
                  {appointment.duration} min
                </Typography.Caption>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-4 flex items-center justify-center h-12 text-gray-400">
            <div className="flex items-center gap-2">
              <HealthIcon name="add" size={16} />
              <Typography.Caption>Add appointment</Typography.Caption>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  // Create appointment modal
  const CreateAppointmentModal = () => {
    const [formData, setFormData] = useState({
      patientName: '',
      type: 'checkup',
      provider: '',
      duration: 30,
      notes: ''
    });
    
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
          <div className="flex items-center justify-between mb-6">
            <Typography.H3>Schedule Appointment</Typography.H3>
            <button
              onClick={() => setShowCreateModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <HealthIcon name="close" size={20} />
            </button>
          </div>
          
          <div className="space-y-4">
            {/* Time display */}
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <Typography.BodySmall className="text-blue-700">
                {formatDate(selectedDate)} at {selectedTimeSlot}
              </Typography.BodySmall>
            </div>
            
            {/* Patient name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.patientName}
                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                placeholder="Enter patient name"
              />
            </div>
            
            {/* Appointment type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                {Object.entries(appointmentTypes).map(([key, type]) => (
                  <option key={key} value={key}>{type.label}</option>
                ))}
              </select>
            </div>
            
            {/* Provider */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Provider
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.provider}
                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                placeholder="Assigned provider"
              />
            </div>
            
            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (minutes)
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>1 hour</option>
                <option value={90}>1.5 hours</option>
              </select>
            </div>
            
            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Additional notes..."
              />
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setShowCreateModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => handleCreateAppointment(formData)}
              disabled={!formData.patientName}
              className="flex-1 px-4 py-2 bg-[#2A5C8D] text-white rounded-lg hover:bg-[#1e4066] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Schedule
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MedicalIcon.Appointment size={24} />
            <div>
              <Typography.H3>Appointment Scheduler</Typography.H3>
              <Typography.Caption className="text-gray-600">
                Drag and drop to reschedule appointments
              </Typography.Caption>
            </div>
          </div>
          
          {/* Date picker */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedDate(new Date(selectedDate.getTime() - 24 * 60 * 60 * 1000))}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <HealthIcon name="previous" size={16} />
            </button>
            
            <div className="text-center min-w-[200px]">
              <Typography.Body className="font-semibold">
                {formatDate(selectedDate)}
              </Typography.Body>
            </div>
            
            <button
              onClick={() => setSelectedDate(new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000))}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <HealthIcon name="next" size={16} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Schedule grid */}
      <div className="p-6">
        <div className="grid gap-2 max-h-[600px] overflow-y-auto">
          {availableTimeSlots.map((timeSlot) => {
            const appointment = getAppointmentForSlot(timeSlot);
            return (
              <TimeSlot
                key={timeSlot}
                time={timeSlot}
                appointment={appointment}
              />
            );
          })}
        </div>
        
        {/* Legend */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <Typography.BodySmall className="text-gray-600 mb-3 font-medium">
            Appointment Types:
          </Typography.BodySmall>
          <div className="flex flex-wrap gap-2">
            {Object.entries(appointmentTypes).map(([key, type]) => (
              <div key={key} className={`px-2 py-1 rounded text-xs border ${type.color}`}>
                {type.label}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Create appointment modal */}
      {showCreateModal && <CreateAppointmentModal />}
    </div>
  );
};

export default AppointmentScheduler; 