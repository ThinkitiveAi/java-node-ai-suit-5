import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import Dashboard from '../pages/Dashboard';
import PatientDetails from '../pages/PatientDetails';
import AppointmentList from './AppointmentList';
import ProviderAvailability from './ProviderAvailability';
import ScheduleAppointmentModal from './ScheduleAppointmentModal';

const MainLayout = ({ isGuestMode = false, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // Get current page from location
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/' || path === '/dashboard') return 'dashboard';
    if (path === '/scheduling') return 'scheduling';
    if (path === '/settings') return 'settings';
    if (path === '/patient') return 'patient';
    return 'dashboard';
  };

  const handleNavigate = (page) => {
    switch (page) {
      case 'dashboard':
        navigate('/');
        break;
      case 'scheduling':
        navigate('/scheduling');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'patient':
        navigate('/patient');
        break;
      default:
        navigate('/');
    }
  };

  const handleCloseScheduleModal = () => {
    setShowScheduleModal(false);
  };

  const handleSaveAppointment = (appointmentData) => {
    console.log('Saving appointment:', appointmentData);
    // Handle appointment saving logic
    setShowScheduleModal(false);
  };

  const handleOpenScheduleModal = () => {
    setShowScheduleModal(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/30">
      <Navigation 
        currentPage={getCurrentPage()}
        onNavigate={handleNavigate}
        onLogout={onLogout}
        isGuestMode={isGuestMode}
        userName="John Doe"
      />
      
      <main className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<Dashboard onLogout={onLogout} isGuestMode={isGuestMode} />} />
          <Route path="/dashboard" element={<Dashboard onLogout={onLogout} isGuestMode={isGuestMode} />} />
          <Route path="/scheduling" element={<AppointmentList onScheduleAppointment={handleOpenScheduleModal} />} />
          <Route path="/settings" element={<ProviderAvailability onNavigate={handleNavigate} />} />
          <Route path="/patient" element={<PatientDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Schedule Appointment Modal */}
      <ScheduleAppointmentModal
        open={showScheduleModal}
        onClose={handleCloseScheduleModal}
        onSave={handleSaveAppointment}
      />
    </div>
  );
};

export default MainLayout;
