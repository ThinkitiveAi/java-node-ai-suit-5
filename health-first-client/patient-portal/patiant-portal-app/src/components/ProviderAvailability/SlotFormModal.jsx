import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Trash2, Clock, Users, Calendar, Repeat, AlertCircle } from 'lucide-react';

const SlotFormModal = ({ initialValues, onSave, onDelete, onClose }) => {
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    type: 'consultation',
    maxPatients: 1,
    isRecurring: false,
    recurrence: 'weekly'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDNAEffect, setShowDNAEffect] = useState(false);

  useEffect(() => {
    if (initialValues) {
      setFormData({
        date: initialValues.date || '',
        startTime: initialValues.startTime || '',
        endTime: initialValues.endTime || '',
        type: initialValues.type || 'consultation',
        maxPatients: initialValues.maxPatients || 1,
        isRecurring: initialValues.isRecurring || false,
        recurrence: initialValues.recurrence || 'weekly'
      });
    } else {
      // Set default date to today
      const today = new Date().toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, date: today }));
    }
  }, [initialValues]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (!formData.startTime) {
      newErrors.startTime = 'Start time is required';
    }

    if (!formData.endTime) {
      newErrors.endTime = 'End time is required';
    }

    if (formData.startTime && formData.endTime) {
      const start = new Date(`2000-01-01T${formData.startTime}`);
      const end = new Date(`2000-01-01T${formData.endTime}`);
      
      if (start >= end) {
        newErrors.endTime = 'End time must be after start time';
      }
    }

    if (formData.maxPatients < 1) {
      newErrors.maxPatients = 'Maximum patients must be at least 1';
    }

    if (formData.isRecurring && !formData.recurrence) {
      newErrors.recurrence = 'Recurrence pattern is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setShowDNAEffect(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    onSave(formData);
    setIsSubmitting(false);
    setShowDNAEffect(false);
  };

  const handleDelete = async () => {
    if (!initialValues?.id) return;

    setIsSubmitting(true);
    setShowDNAEffect(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    onDelete(initialValues.id);
    setIsSubmitting(false);
    setShowDNAEffect(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const appointmentTypes = [
    { value: 'consultation', label: 'Consultation', icon: Users },
    { value: 'follow-up', label: 'Follow-up', icon: Clock },
    { value: 'emergency', label: 'Emergency', icon: AlertCircle },
    { value: 'routine', label: 'Routine Check', icon: Calendar }
  ];

  const recurrenceOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* DNA Helix Effect */}
          {showDNAEffect && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-healthcare-400/20 rounded-xl z-10 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-primary-500 to-healthcare-500 rounded-full"
                    style={{
                      left: `${50 + Math.sin(i * 0.8) * 20}%`,
                      top: `${50 + Math.cos(i * 0.8) * 20}%`,
                    }}
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
                <div className="text-center text-white font-semibold">
                  {isSubmitting ? 'Saving...' : 'Success!'}
                </div>
              </div>
            </motion.div>
          )}

          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {initialValues ? 'Edit Time Slot' : 'New Time Slot'}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Configure availability for patient bookings
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                onClick={onClose}
              >
                <X className="w-5 h-5 text-gray-500" />
              </motion.button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${
                    errors.date ? 'border-red-300' : 'border-gray-300'
                  }`}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.date && (
                  <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Patients
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.maxPatients}
                  onChange={(e) => handleInputChange('maxPatients', parseInt(e.target.value))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${
                    errors.maxPatients ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.maxPatients && (
                  <p className="text-red-500 text-xs mt-1">{errors.maxPatients}</p>
                )}
              </div>
            </div>

            {/* Time Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => handleInputChange('startTime', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${
                    errors.startTime ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.startTime && (
                  <p className="text-red-500 text-xs mt-1">{errors.startTime}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => handleInputChange('endTime', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${
                    errors.endTime ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.endTime && (
                  <p className="text-red-500 text-xs mt-1">{errors.endTime}</p>
                )}
              </div>
            </div>

            {/* Appointment Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Appointment Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {appointmentTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <motion.button
                      key={type.value}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-3 border rounded-lg text-left transition-all duration-200 ${
                        formData.type === type.value
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => handleInputChange('type', type.value)}
                    >
                      <div className="flex items-center space-x-2">
                        <IconComponent className="w-4 h-4" />
                        <span className="text-sm font-medium">{type.label}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Recurrence */}
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <input
                  type="checkbox"
                  id="recurring"
                  checked={formData.isRecurring}
                  onChange={(e) => handleInputChange('isRecurring', e.target.checked)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="recurring" className="text-sm font-medium text-gray-700">
                  Recurring Slot
                </label>
              </div>
              
              {formData.isRecurring && (
                <div className="ml-7">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recurrence Pattern
                  </label>
                  <select
                    value={formData.recurrence}
                    onChange={(e) => handleInputChange('recurrence', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${
                      errors.recurrence ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    {recurrenceOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.recurrence && (
                    <p className="text-red-500 text-xs mt-1">{errors.recurrence}</p>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              {initialValues && (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors duration-200 flex items-center justify-center space-x-2"
                  onClick={handleDelete}
                  disabled={isSubmitting}
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </motion.button>
              )}
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-500 to-healthcare-500 text-white rounded-lg hover:from-primary-600 hover:to-healthcare-600 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSubmitting ? 'Saving...' : 'Save Slot'}</span>
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SlotFormModal; 