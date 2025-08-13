import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Search,
  Calendar,
  Clock,
  User,
  Video,
  Home,
  UserCheck,
  Save,
  Loader2
} from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import TextField from '../ui/TextField';

const ScheduleAppointmentModal = ({ open, onClose, onSave }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    appointmentMode: 'In-Person',
    provider: '',
    appointmentType: '',
    estimatedAmount: '',
    dateTime: '',
    reasonForVisit: ''
  });

  const [errors, setErrors] = useState({});

  const appointmentModes = [
    { value: 'In-Person', label: 'In-Person', icon: User },
    { value: 'Video Call', label: 'Video Call', icon: Video },
    { value: 'Home Visit', label: 'Home Visit', icon: Home }
  ];

  const providers = [
    'Dr. Jacob Jones',
    'Dr. Bessie Cooper',
    'Dr. Jane Smith',
    'Dr. Williams',
    'Dr. Brown'
  ];

  const appointmentTypes = [
    'New Patient Consultation',
    'Follow-up Visit',
    'Annual Physical',
    'Specialist Consultation',
    'Lab Results Review',
    'Preventive Care',
    'Emergency Consultation'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.patientName) newErrors.patientName = 'Patient name is required';
    if (!formData.provider) newErrors.provider = 'Provider selection is required';
    if (!formData.appointmentType) newErrors.appointmentType = 'Appointment type is required';
    if (!formData.dateTime) newErrors.dateTime = 'Date and time is required';
    if (!formData.reasonForVisit) newErrors.reasonForVisit = 'Reason for visit is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const appointmentData = {
        id: Date.now(),
        ...formData,
        status: 'Scheduled',
        createdAt: new Date().toISOString()
      };
      
      onSave(appointmentData);
      handleClose();
    } catch (error) {
      console.error('Failed to schedule appointment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      patientName: '',
      appointmentMode: 'In-Person',
      provider: '',
      appointmentType: '',
      estimatedAmount: '',
      dateTime: '',
      reasonForVisit: ''
    });
    setErrors({});
    setIsLoading(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900 flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg">
              <Calendar className="h-4 w-4 text-white" />
            </div>
            <span>Schedule Appointment</span>
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </motion.button>
        </div>
        <p className="text-sm text-slate-600 mt-1">
          Schedule a new appointment for a patient
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 px-4">
          {/* Patient Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Patient Name *</label>
            <div className="relative">
              <TextField
                placeholder="Search or enter patient name"
                value={formData.patientName}
                onChange={(e) => handleInputChange('patientName', e.target.value)}
                error={!!errors.patientName}
                helperText={errors.patientName}
                fullWidth
                required
              />
              <Search className="absolute right-3 top-3 h-4 w-4 text-slate-400" />
            </div>
          </div>

          {/* Appointment Mode */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700">Appointment Mode</label>
            <div className="grid grid-cols-3 gap-3">
              {appointmentModes.map((mode) => {
                const Icon = mode.icon;
                const isSelected = formData.appointmentMode === mode.value;
                
                return (
                  <motion.button
                    key={mode.value}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleInputChange('appointmentMode', mode.value)}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 flex flex-col items-center space-y-2 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-xs font-medium">{mode.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Provider Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Provider *</label>
            <select
              value={formData.provider}
              onChange={(e) => handleInputChange('provider', e.target.value)}
              className={`w-full h-11 px-3 border rounded-lg bg-white text-slate-900 ${
                errors.provider ? 'border-red-500' : 'border-slate-200'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              required
            >
              <option value="">Select a provider</option>
              {providers.map(provider => (
                <option key={provider} value={provider}>{provider}</option>
              ))}
            </select>
            {errors.provider && (
              <p className="text-xs text-red-600">{errors.provider}</p>
            )}
          </div>

          {/* Appointment Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Appointment Type *</label>
            <select
              value={formData.appointmentType}
              onChange={(e) => handleInputChange('appointmentType', e.target.value)}
              className={`w-full h-11 px-3 border rounded-lg bg-white text-slate-900 ${
                errors.appointmentType ? 'border-red-500' : 'border-slate-200'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              required
            >
              <option value="">Select appointment type</option>
              {appointmentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.appointmentType && (
              <p className="text-xs text-red-600">{errors.appointmentType}</p>
            )}
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Date & Time *</label>
              <div className="relative">
                <TextField
                  type="datetime-local"
                  value={formData.dateTime}
                  onChange={(e) => handleInputChange('dateTime', e.target.value)}
                  error={!!errors.dateTime}
                  helperText={errors.dateTime}
                  fullWidth
                  required
                />
                <Clock className="absolute right-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Estimated Amount</label>
              <TextField
                placeholder="$ 0.00"
                value={formData.estimatedAmount}
                onChange={(e) => handleInputChange('estimatedAmount', e.target.value)}
                fullWidth
              />
            </div>
          </div>

          {/* Reason for Visit */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Reason for Visit *</label>
            <textarea
              value={formData.reasonForVisit}
              onChange={(e) => handleInputChange('reasonForVisit', e.target.value)}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg bg-white text-slate-900 resize-none ${
                errors.reasonForVisit ? 'border-red-500' : 'border-slate-200'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Describe the reason for this appointment..."
              required
            />
            {errors.reasonForVisit && (
              <p className="text-xs text-red-600">{errors.reasonForVisit}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
            <Button
              type="button"
              variant="outlined"
              onClick={handleClose}
            >
              Cancel
            </Button>
            
            <Button
              type="submit"
              disabled={isLoading}
              startIcon={isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              className="min-w-[120px]"
            >
              {isLoading ? 'Scheduling...' : 'Schedule'}
            </Button>
          </div>
        </form>
      </motion.div>
    </Modal>
  );
};

export default ScheduleAppointmentModal;
