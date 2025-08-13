import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trash2,
  Plus,
  Clock,
  Calendar,
  Settings,
  Save,
  X,
  CheckCircle
} from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '../ui/Table';
import Button from '../ui/Button';
import TextField from '../ui/TextField';

const ProviderAvailability = ({ onNavigate }) => {
  const [availabilitySlots, setAvailabilitySlots] = useState([
    { id: 1, day: 'Monday', startTime: '09:00', endTime: '17:00', location: 'Main Clinic' },
    { id: 2, day: 'Tuesday', startTime: '08:30', endTime: '16:30', location: 'Main Clinic' },
    { id: 3, day: 'Wednesday', startTime: '10:00', endTime: '18:00', location: 'Satellite Office' },
    { id: 4, day: 'Thursday', startTime: '09:00', endTime: '17:00', location: 'Main Clinic' },
    { id: 5, day: 'Friday', startTime: '08:00', endTime: '16:00', location: 'Main Clinic' }
  ]);

  const [newSlot, setNewSlot] = useState({
    day: '',
    startTime: '',
    endTime: '',
    location: ''
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const locations = ['Main Clinic', 'Satellite Office', 'Home Office', 'Hospital Ward'];

  const handleInputChange = (field, value) => {
    setNewSlot(prev => ({ ...prev, [field]: value }));
  };

  const handleAddSlot = () => {
    if (newSlot.day && newSlot.startTime && newSlot.endTime && newSlot.location) {
      const slot = {
        id: Date.now(),
        ...newSlot
      };
      setAvailabilitySlots(prev => [...prev, slot]);
      setNewSlot({ day: '', startTime: '', endTime: '', location: '' });
      setShowAddForm(false);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  };

  const handleDeleteSlot = (id) => {
    setAvailabilitySlots(prev => prev.filter(slot => slot.id !== id));
  };

  const handleCancelAdd = () => {
    setNewSlot({ day: '', startTime: '', endTime: '', location: '' });
    setShowAddForm(false);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="p-6 space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeInUp} className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl shadow-lg">
            <Settings className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Provider Availability</h1>
            <p className="text-slate-600">Manage your schedule and availability</p>
          </div>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          startIcon={<Plus className="h-4 w-4" />}
          className="shadow-lg"
        >
          Add Time Slot
        </Button>
      </motion.div>

      {/* Success Message */}
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center space-x-3"
          >
            <CheckCircle className="h-5 w-5 text-emerald-600" />
            <span className="text-emerald-800 text-sm font-medium">
              Availability slot added successfully!
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add New Slot Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-900">Add New Availability Slot</h2>
              <button
                onClick={handleCancelAdd}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Day of Week</label>
                <select
                  value={newSlot.day}
                  onChange={(e) => handleInputChange('day', e.target.value)}
                  className="w-full h-11 px-3 border border-slate-200 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select day</option>
                  {daysOfWeek.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Start Time</label>
                <TextField
                  type="time"
                  value={newSlot.startTime}
                  onChange={(e) => handleInputChange('startTime', e.target.value)}
                  fullWidth
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">End Time</label>
                <TextField
                  type="time"
                  value={newSlot.endTime}
                  onChange={(e) => handleInputChange('endTime', e.target.value)}
                  fullWidth
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Location</label>
                <select
                  value={newSlot.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full h-11 px-3 border border-slate-200 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select location</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6">
              <Button
                variant="outlined"
                onClick={handleCancelAdd}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddSlot}
                startIcon={<Save className="h-4 w-4" />}
                disabled={!newSlot.day || !newSlot.startTime || !newSlot.endTime || !newSlot.location}
              >
                Add Slot
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Availability Table */}
      <motion.div
        variants={fadeInUp}
        className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 overflow-hidden"
      >
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Current Availability Schedule</h2>
          <p className="text-sm text-slate-600 mt-1">Manage your weekly availability slots</p>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-purple-50 to-indigo-50 border-none">
              <TableHead className="font-semibold text-slate-700 py-4 px-6">Day</TableHead>
              <TableHead className="font-semibold text-slate-700 py-4 px-6">Start Time</TableHead>
              <TableHead className="font-semibold text-slate-700 py-4 px-6">End Time</TableHead>
              <TableHead className="font-semibold text-slate-700 py-4 px-6">Location</TableHead>
              <TableHead className="font-semibold text-slate-700 py-4 px-6">Duration</TableHead>
              <TableHead className="font-semibold text-slate-700 py-4 px-6 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {availabilitySlots.map((slot, index) => {
              const startTime = new Date(`2000-01-01T${slot.startTime}`);
              const endTime = new Date(`2000-01-01T${slot.endTime}`);
              const duration = (endTime - startTime) / (1000 * 60 * 60); // hours

              return (
                <motion.tr
                  key={slot.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-purple-50/30 hover:to-indigo-50/30 transition-all duration-200"
                >
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-purple-500" />
                      <span className="font-medium text-slate-900">{slot.day}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-700">{slot.startTime}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-700">{slot.endTime}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 border border-indigo-200">
                      {slot.location}
                    </span>
                  </TableCell>
                  
                  <TableCell className="py-4 px-6">
                    <span className="font-medium text-slate-700">{duration.toFixed(1)} hours</span>
                  </TableCell>
                  
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center justify-center">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDeleteSlot(slot.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Slot"
                      >
                        <Trash2 className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </TableCell>
                </motion.tr>
              );
            })}
          </TableBody>
        </Table>

        {availabilitySlots.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Settings className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg font-medium">No availability slots configured</p>
            <p className="text-slate-400">Add your first availability slot to get started.</p>
            <Button
              onClick={() => setShowAddForm(true)}
              startIcon={<Plus className="h-4 w-4" />}
              className="mt-4"
            >
              Add Time Slot
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        variants={fadeInUp}
        className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200/50"
      >
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outlined"
            onClick={() => onNavigate('dashboard')}
            className="justify-start"
          >
            Back to Dashboard
          </Button>
          <Button
            variant="outlined"
            onClick={() => onNavigate('scheduling')}
            className="justify-start"
          >
            View Appointments
          </Button>
          <Button
            variant="outlined"
            className="justify-start"
          >
            Export Schedule
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProviderAvailability;
