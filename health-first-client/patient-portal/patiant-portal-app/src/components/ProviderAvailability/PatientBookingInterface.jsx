import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, CheckCircle, AlertCircle, Heart, Star } from 'lucide-react';
import SmokyCursor from '../SmookyCursor';

const PatientBookingInterface = () => {
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingStep, setBookingStep] = useState('provider'); // provider, date, slot, confirm
  const [providers, setProviders] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isBooking, setIsBooking] = useState(false);

  // Mock data
  useEffect(() => {
    const mockProviders = [
      {
        id: 1,
        name: 'Dr. Sarah Johnson',
        specialty: 'Cardiology',
        rating: 4.8,
        reviews: 127,
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
        availableDays: ['Monday', 'Wednesday', 'Friday'],
        consultationFee: 150
      },
      {
        id: 2,
        name: 'Dr. Michael Chen',
        specialty: 'Neurology',
        rating: 4.9,
        reviews: 89,
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
        availableDays: ['Tuesday', 'Thursday', 'Saturday'],
        consultationFee: 180
      },
      {
        id: 3,
        name: 'Dr. Emily Rodriguez',
        specialty: 'Pediatrics',
        rating: 4.7,
        reviews: 203,
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop&crop=face',
        availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        consultationFee: 120
      }
    ];
    setProviders(mockProviders);
  }, []);

  useEffect(() => {
    if (selectedProvider && selectedDate) {
      // Mock available slots
      const mockSlots = [
        { id: 1, time: '09:00', duration: 30, type: 'consultation', available: true },
        { id: 2, time: '10:00', duration: 30, type: 'consultation', available: true },
        { id: 3, time: '11:00', duration: 30, type: 'consultation', available: false },
        { id: 4, time: '14:00', duration: 30, type: 'consultation', available: true },
        { id: 5, time: '15:00', duration: 30, type: 'consultation', available: true },
        { id: 6, time: '16:00', duration: 30, type: 'consultation', available: false }
      ];
      setAvailableSlots(mockSlots);
    }
  }, [selectedProvider, selectedDate]);

  const handleProviderSelect = (provider) => {
    setSelectedProvider(provider);
    setBookingStep('date');
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setBookingStep('slot');
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setBookingStep('confirm');
  };

  const handleBookingConfirm = async () => {
    setIsBooking(true);
    // Simulate booking API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsBooking(false);
    setBookingStep('success');
  };

  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const formatTime = (time) => {
    const [hour] = time.split(':');
    const hourNum = parseInt(hour);
    return hourNum > 12 ? `${hourNum - 12} PM` : `${hourNum} AM`;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-healthcare-50 via-primary-50 to-healthcare-100 relative">
      <SmokyCursor />
      
      {/* Header */}
      <motion.div 
        className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-br from-healthcare-100 to-primary-100 rounded-lg">
                <Heart className="w-6 h-6 text-healthcare-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Book Appointment</h1>
                <p className="text-sm text-gray-600">Find and book your healthcare provider</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Progress Steps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-center space-x-8">
          {['provider', 'date', 'slot', 'confirm'].map((step, index) => (
            <div key={step} className="flex items-center">
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  bookingStep === step
                    ? 'bg-primary-500 text-white'
                    : index < ['provider', 'date', 'slot', 'confirm'].indexOf(bookingStep)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {index + 1}
              </motion.div>
              {index < 3 && (
                <div className={`w-16 h-1 mx-2 ${
                  index < ['provider', 'date', 'slot', 'confirm'].indexOf(bookingStep)
                    ? 'bg-green-500'
                    : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {/* Provider Selection */}
          {bookingStep === 'provider' && (
            <motion.div
              key="provider"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Provider</h2>
                <p className="text-gray-600">Select a healthcare provider from our network</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {providers.map((provider) => (
                  <motion.div
                    key={provider.id}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-6 cursor-pointer hover:shadow-xl transition-all duration-200"
                    onClick={() => handleProviderSelect(provider)}
                  >
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gradient-to-r from-primary-100 to-healthcare-100">
                        <img
                          src={provider.image}
                          alt={provider.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{provider.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{provider.specialty}</p>
                      
                      <div className="flex items-center justify-center space-x-2 mb-3">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{provider.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">({provider.reviews} reviews)</span>
                      </div>
                      
                      <div className="text-lg font-bold text-primary-600">
                        ${provider.consultationFee}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Date Selection */}
          {bookingStep === 'date' && (
            <motion.div
              key="date"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Date</h2>
                <p className="text-gray-600">Choose your preferred appointment date</p>
              </div>

              <div className="grid grid-cols-7 gap-3">
                {getAvailableDates().map((date, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedDate?.toDateString() === date.toDateString()
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                    onClick={() => handleDateSelect(date)}
                  >
                    <div className="text-center">
                      <div className="text-sm text-gray-600">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="text-lg font-semibold">
                        {date.getDate()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {date.toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Slot Selection */}
          {bookingStep === 'slot' && (
            <motion.div
              key="slot"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Time Slot</h2>
                <p className="text-gray-600">Available time slots for {formatDate(selectedDate)}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {availableSlots.map((slot) => (
                  <motion.button
                    key={slot.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!slot.available}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      slot.available
                        ? selectedSlot?.id === slot.id
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50/50'
                        : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    onClick={() => slot.available && handleSlotSelect(slot)}
                  >
                    <div className="text-center">
                      <div className="text-lg font-semibold">{formatTime(slot.time)}</div>
                      <div className="text-sm text-gray-600">{slot.duration} min</div>
                      {slot.available && (
                        <div className="mt-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mx-auto animate-pulse" />
                        </div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Confirmation */}
          {bookingStep === 'confirm' && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirm Booking</h2>
                <p className="text-gray-600">Review your appointment details</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-primary-600" />
                        <span className="text-gray-700">
                          <strong>Provider:</strong> {selectedProvider.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-primary-600" />
                        <span className="text-gray-700">
                          <strong>Date:</strong> {formatDate(selectedDate)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-primary-600" />
                        <span className="text-gray-700">
                          <strong>Time:</strong> {formatTime(selectedSlot.time)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-primary-600" />
                        <span className="text-gray-700">
                          <strong>Duration:</strong> {selectedSlot.duration} minutes
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Consultation Fee</span>
                        <span className="font-semibold">${selectedProvider.consultationFee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Platform Fee</span>
                        <span className="font-semibold">$5.00</span>
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex justify-between">
                          <span className="text-lg font-semibold">Total</span>
                          <span className="text-lg font-bold text-primary-600">
                            ${selectedProvider.consultationFee + 5}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => setBookingStep('slot')}
                  >
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isBooking}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-healthcare-500 text-white rounded-lg hover:from-primary-600 hover:to-healthcare-600 transition-all duration-200 disabled:opacity-50"
                    onClick={handleBookingConfirm}
                  >
                    {isBooking ? 'Confirming...' : 'Confirm Booking'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Success */}
          {bookingStep === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
                <p className="text-gray-600">Your appointment has been successfully scheduled.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-healthcare-500 text-white rounded-lg hover:from-primary-600 hover:to-healthcare-600 transition-all duration-200"
                onClick={() => setBookingStep('provider')}
              >
                Book Another Appointment
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PatientBookingInterface; 