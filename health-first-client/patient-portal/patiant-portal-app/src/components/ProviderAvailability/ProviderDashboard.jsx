import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Settings, Users, Plus, Edit, Trash2, Eye } from 'lucide-react';
import AvailabilityCalendar from './AvailabilityCalendar';
import SlotFormModal from './SlotFormModal';
import SmokyCursor from '../SmookyCursor';

const ProviderDashboard = () => {
  const [view, setView] = useState('week');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slots, setSlots] = useState([]);
  const [smokyHover, setSmokyHover] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    const mockSlots = [
      {
        id: 1,
        date: '2024-01-15',
        startTime: '09:00',
        endTime: '10:00',
        type: 'consultation',
        maxPatients: 3,
        currentPatients: 1,
        isRecurring: true,
        recurrence: 'weekly'
      },
      {
        id: 2,
        date: '2024-01-15',
        startTime: '14:00',
        endTime: '15:00',
        type: 'follow-up',
        maxPatients: 1,
        currentPatients: 0,
        isRecurring: false,
        recurrence: null
      }
    ];
    setSlots(mockSlots);
  }, []);

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setIsModalOpen(true);
  };

  const handleSlotSave = (slotData) => {
    if (selectedSlot) {
      setSlots(prev => prev.map(slot => 
        slot.id === selectedSlot.id ? { ...slot, ...slotData } : slot
      ));
    } else {
      setSlots(prev => [...prev, { ...slotData, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setSelectedSlot(null);
  };

  const handleSlotDelete = (slotId) => {
    setSlots(prev => prev.filter(slot => slot.id !== slotId));
    setIsModalOpen(false);
    setSelectedSlot(null);
  };

  const handleNewSlot = () => {
    setSelectedSlot(null);
    setIsModalOpen(true);
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
              <div className="p-2 bg-gradient-to-br from-primary-100 to-healthcare-100 rounded-lg">
                <Calendar className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Provider Availability</h1>
                <p className="text-sm text-gray-600">Manage your schedule and patient bookings</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-healthcare-500 text-white rounded-lg hover:from-primary-600 hover:to-healthcare-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={handleNewSlot}
                onMouseEnter={() => setSmokyHover(true)}
                onMouseLeave={() => setSmokyHover(false)}
              >
                <Plus className="w-4 h-4" />
                <span>New Slot</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary-50 to-healthcare-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-primary-600" />
                    <span className="text-sm font-medium text-gray-700">Total Slots</span>
                  </div>
                  <span className="text-lg font-bold text-primary-600">{slots.length}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-healthcare-50 to-primary-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-healthcare-600" />
                    <span className="text-sm font-medium text-gray-700">Booked Patients</span>
                  </div>
                  <span className="text-lg font-bold text-healthcare-600">
                    {slots.reduce((acc, slot) => acc + slot.currentPatients, 0)}
                  </span>
                </div>
              </div>

              {/* View Toggle */}
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Calendar View</h4>
                <div className="flex space-x-2">
                  {['week', 'month'].map((viewOption) => (
                    <motion.button
                      key={viewOption}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        view === viewOption
                          ? 'bg-primary-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setView(viewOption)}
                    >
                      {viewOption.charAt(0).toUpperCase() + viewOption.slice(1)}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Calendar */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <AvailabilityCalendar
              view={view}
              slots={slots}
              onSlotClick={handleSlotClick}
              smokyHover={smokyHover}
            />
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <SlotFormModal
            initialValues={selectedSlot}
            onSave={handleSlotSave}
            onDelete={handleSlotDelete}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedSlot(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProviderDashboard; 