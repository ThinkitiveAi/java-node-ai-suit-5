import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, Users, Calendar as CalendarIcon } from 'lucide-react';

const AvailabilityCalendar = ({ view, slots, onSlotClick, smokyHover }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredSlot, setHoveredSlot] = useState(null);

  const calendarData = useMemo(() => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    const days = [];
    const totalDays = view === 'week' ? 7 : 28;
    
    for (let i = 0; i < totalDays; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      days.push(date);
    }
    
    return days;
  }, [currentDate, view]);

  const timeSlots = useMemo(() => {
    const slots = [];
    for (let hour = 8; hour <= 18; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return slots;
  }, []);

  const getSlotsForDateAndTime = (date, time) => {
    const dateStr = date.toISOString().split('T')[0];
    return slots.filter(slot => 
      slot.date === dateStr && slot.startTime === time
    );
  };

  const getSlotColor = (slot) => {
    const occupancy = slot.currentPatients / slot.maxPatients;
    if (occupancy === 1) return 'bg-red-100 border-red-300 text-red-800';
    if (occupancy >= 0.7) return 'bg-yellow-100 border-yellow-300 text-yellow-800';
    return 'bg-green-100 border-green-300 text-green-800';
  };

  const getSlotIcon = (slot) => {
    switch (slot.type) {
      case 'consultation':
        return <Users className="w-3 h-3" />;
      case 'follow-up':
        return <Clock className="w-3 h-3" />;
      default:
        return <CalendarIcon className="w-3 h-3" />;
    }
  };

  const navigateCalendar = (direction) => {
    const newDate = new Date(currentDate);
    if (view === 'week') {
      newDate.setDate(currentDate.getDate() + (direction * 7));
    } else {
      newDate.setMonth(currentDate.getMonth() + direction);
    }
    setCurrentDate(newDate);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      weekday: 'short'
    });
  };

  const formatTime = (time) => {
    const [hour] = time.split(':');
    const hourNum = parseInt(hour);
    return hourNum > 12 ? `${hourNum - 12} PM` : `${hourNum} AM`;
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Calendar Header */}
      <div className="bg-gradient-to-r from-primary-500 to-healthcare-500 text-white p-4">
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
            onClick={() => navigateCalendar(-1)}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          
          <div className="text-center">
            <h2 className="text-lg font-semibold">
              {view === 'week' 
                ? `${formatDate(calendarData[0])} - ${formatDate(calendarData[6])}`
                : currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
              }
            </h2>
            <p className="text-sm opacity-90">
              {view === 'week' ? 'Week View' : 'Month View'}
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
            onClick={() => navigateCalendar(1)}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Time Column Header */}
          <div className="grid grid-cols-8 border-b border-gray-200">
            <div className="p-3 bg-gray-50 font-medium text-gray-700">Time</div>
            {calendarData.slice(0, 7).map((date, index) => (
              <div key={index} className="p-3 bg-gray-50 text-center">
                <div className="font-medium text-gray-900">
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="text-sm text-gray-600">
                  {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            ))}
          </div>

          {/* Time Slots */}
          {timeSlots.map((time, timeIndex) => (
            <div key={time} className="grid grid-cols-8 border-b border-gray-100">
              {/* Time Label */}
              <div className="p-3 bg-gray-50 text-sm text-gray-600 font-medium border-r border-gray-200">
                {formatTime(time)}
              </div>
              
              {/* Day Columns */}
              {calendarData.slice(0, 7).map((date, dayIndex) => {
                const daySlots = getSlotsForDateAndTime(date, time);
                const isToday = date.toDateString() === new Date().toDateString();
                
                return (
                  <div
                    key={dayIndex}
                    className={`p-2 border-r border-gray-100 min-h-[80px] relative ${
                      isToday ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <AnimatePresence>
                      {daySlots.map((slot, slotIndex) => (
                        <motion.div
                          key={slot.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
                          }}
                          className={`absolute inset-2 p-2 rounded-lg border cursor-pointer transition-all duration-200 ${getSlotColor(slot)} ${
                            hoveredSlot === slot.id ? 'ring-2 ring-teal-400 ring-opacity-50' : ''
                          }`}
                          onClick={() => onSlotClick(slot)}
                          onMouseEnter={() => setHoveredSlot(slot.id)}
                          onMouseLeave={() => setHoveredSlot(null)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center space-x-1">
                              {getSlotIcon(slot)}
                              <span className="text-xs font-medium capitalize">
                                {slot.type}
                              </span>
                            </div>
                            <span className="text-xs">
                              {slot.currentPatients}/{slot.maxPatients}
                            </span>
                          </div>
                          
                          <div className="text-xs opacity-75">
                            {slot.startTime} - {slot.endTime}
                          </div>
                          
                          {slot.isRecurring && (
                            <div className="absolute top-1 right-1">
                              <div className="w-2 h-2 bg-current rounded-full opacity-60" />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {/* Empty slot indicator */}
                    {daySlots.length === 0 && (
                      <div className="h-full flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-dashed border-gray-300 rounded-full opacity-40" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-100 border border-green-300 rounded" />
              <span className="text-gray-600">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded" />
              <span className="text-gray-600">Nearly Full</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-100 border border-red-300 rounded" />
              <span className="text-gray-600">Full</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-current rounded-full opacity-60" />
            <span className="text-gray-600">Recurring</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar; 