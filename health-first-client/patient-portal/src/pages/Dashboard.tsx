import { useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { Button } from '../ui/Button';
import { Badge } from 'lightswind/dist/components/ui/badge.js';
import { CountUp } from 'lightswind/dist/components/ui/count-up.js';
import ScrollReveal from 'lightswind/dist/components/ui/scroll-reveal.js';
import { ShinyText } from 'lightswind/dist/components/ui/shiny-text.js';

// Healthcare components
import PatientCard from '../components/healthcare/PatientCard';
import VitalSignsGraph from '../components/healthcare/VitalSignsGraph';
import AppointmentScheduler from '../components/healthcare/AppointmentScheduler';
import PrescriptionTracker from '../components/healthcare/PrescriptionTracker';
import LabResultsTable from '../components/healthcare/LabResultsTable';
import PatientTimeline from '../components/healthcare/PatientTimeline';
import EmergencyButton, { FullEmergencyButton } from '../components/healthcare/EmergencyButton';
import { MedicalIcon, HealthIcon } from '../components/healthcare/IconLibrary';
import { Typography } from '../theme/TypeScale';
import { useHealthcareTheme } from '../components/HealthcareThemeProvider';

const Dashboard = ({ onLogout, user }) => {
  const [activeView, setActiveView] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const { colors, getThemeClasses } = useHealthcareTheme();
  
  // Enhanced mock data for healthcare dashboard
  const healthcareData = {
    patient: {
      id: 'P12345',
      name: user?.name || 'Jane Doe',
      age: 42,
      gender: 'Female',
      mrn: 'MRN123456',
      status: 'stable',
      lastVisit: '2024-01-20',
      condition: 'Routine Care',
      avatar: null
    },
    vitals: {
      heartRate: { value: 72, unit: 'bpm', status: 'normal', range: '60-100' },
      bloodPressure: { value: '120/80', unit: 'mmHg', status: 'normal', range: '<140/90' },
      temperature: { value: 98.6, unit: '°F', status: 'normal', range: '97-99' },
      oxygenSat: { value: 98, unit: '%', status: 'normal', range: '95-100' },
      weight: { value: 145, unit: 'lbs', status: 'normal', range: 'BMI 18.5-24.9' }
    },
    appointments: [
      { 
        id: 'APT001', 
        date: '2024-01-22', 
        time: '09:00', 
        patientName: 'Jane Doe', 
        type: 'checkup', 
        provider: 'Dr. Smith', 
        duration: 30 
      },
      { 
        id: 'APT002', 
        date: '2024-01-22', 
        time: '14:30', 
        patientName: 'Follow-up', 
        type: 'followup', 
        provider: 'Dr. Johnson', 
        duration: 15 
      }
    ],
    stats: {
      totalAppointments: 24,
      prescriptions: 3,
      labResults: 12,
      vitalsRecorded: 156
    }
  };

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  const navigationItems = [
    { id: 'overview', label: 'Health Overview', icon: 'home' },
    { id: 'vitals', label: 'Vital Signs', icon: 'pulse' },
    { id: 'appointments', label: 'Appointments', icon: 'appointments' },
    { id: 'prescriptions', label: 'Prescriptions', icon: 'prescriptions' },
    { id: 'lab-results', label: 'Lab Results', icon: 'activity' },
    { id: 'timeline', label: 'Health Timeline', icon: 'records' }
  ];

  const renderViewContent = () => {
    switch (activeView) {
      case 'overview':
        return <OverviewView />;
      case 'vitals':
        return <VitalsView />;
      case 'appointments':
        return <AppointmentsView />;
      case 'prescriptions':
        return <PrescriptionsView />;
      case 'lab-results':
        return <LabResultsView />;
      case 'timeline':
        return <TimelineView />;
      default:
        return <OverviewView />;
    }
  };

  const OverviewView = () => (
    <ScrollReveal delay={0.2}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="medical-chart">
          <div className="medical-chart-header">
            <div className="flex items-center justify-between">
              <div>
                <Typography.H1 className="text-healthcare-primary mb-2">
                  Welcome back, {healthcareData.patient.name}!
                </Typography.H1>
                <Typography.Body className="text-gray-600">
                  Here's your health overview for today
                </Typography.Body>
              </div>
              <FullEmergencyButton 
                onClick={() => alert('Emergency contact initiated')}
                className="no-print"
              />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="medical-chart text-center hover-lift">
            <div className="medical-chart-content">
              <MedicalIcon.Appointment size={32} className="mx-auto mb-3 text-healthcare-primary" />
              <div className="text-3xl font-bold text-healthcare-primary mb-2">
                <CountUp from={0} to={healthcareData.stats.totalAppointments} duration={2} />
              </div>
              <Typography.Body className="text-gray-600">Total Appointments</Typography.Body>
            </div>
          </div>
          
          <div className="medical-chart text-center hover-lift">
            <div className="medical-chart-content">
              <MedicalIcon.Prescription size={32} className="mx-auto mb-3 text-healthcare-secondary" />
              <div className="text-3xl font-bold text-healthcare-secondary mb-2">
                <CountUp from={0} to={healthcareData.stats.prescriptions} duration={2} />
              </div>
              <Typography.Body className="text-gray-600">Active Prescriptions</Typography.Body>
            </div>
          </div>
          
          <div className="medical-chart text-center hover-lift">
            <div className="medical-chart-content">
              <MedicalIcon.Records size={32} className="mx-auto mb-3 text-healthcare-info" />
              <div className="text-3xl font-bold text-healthcare-info mb-2">
                <CountUp from={0} to={healthcareData.stats.labResults} duration={2} />
              </div>
              <Typography.Body className="text-gray-600">Lab Results</Typography.Body>
            </div>
          </div>
          
          <div className="medical-chart text-center hover-lift">
            <div className="medical-chart-content">
              <MedicalIcon.HeartRate size={32} className="mx-auto mb-3 text-healthcare-emergency" />
              <div className="text-3xl font-bold text-healthcare-emergency mb-2">
                <CountUp from={0} to={healthcareData.stats.vitalsRecorded} duration={2} />
              </div>
              <Typography.Body className="text-gray-600">Vitals Recorded</Typography.Body>
            </div>
          </div>
        </div>

        {/* Patient Card and Quick Actions */}
        <div className="grid gap-6 lg:grid-cols-2">
          <PatientCard 
            patient={healthcareData.patient}
            vitals={healthcareData.vitals}
            onClick={() => setActiveView('timeline')}
            showVitals={true}
          />
          
          <div className="medical-chart">
            <div className="medical-chart-content">
              <Typography.H3 className="mb-4">Quick Actions</Typography.H3>
              <div className="grid gap-3">
                <Button 
                  onClick={() => setActiveView('appointments')}
                  className="w-full justify-start gap-3 bg-healthcare-primary hover:bg-healthcare-primary/90"
                >
                  <MedicalIcon.Appointment size={20} />
                  Schedule Appointment
                </Button>
                <Button 
                  onClick={() => setActiveView('prescriptions')}
                  className="w-full justify-start gap-3 bg-healthcare-secondary hover:bg-healthcare-secondary/90"
                >
                  <MedicalIcon.Prescription size={20} />
                  View Prescriptions
                </Button>
                <Button 
                  onClick={() => setActiveView('lab-results')}
                  className="w-full justify-start gap-3 bg-healthcare-info hover:bg-healthcare-info/90"
                >
                  <MedicalIcon.Records size={20} />
                  Lab Results
                </Button>
                <Button 
                  onClick={() => setActiveView('vitals')}
                  className="w-full justify-start gap-3 bg-purple-600 hover:bg-purple-700"
                >
                  <MedicalIcon.HeartRate size={20} />
                  Vital Signs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );

  const VitalsView = () => (
    <div className="space-y-6">
      <Typography.H2 className="text-healthcare-primary">Vital Signs Monitoring</Typography.H2>
      <div className="grid gap-6 lg:grid-cols-2">
        <VitalSignsGraph vitalType="heartRate" timeRange="24h" />
        <VitalSignsGraph vitalType="bloodPressure" timeRange="24h" />
        <VitalSignsGraph vitalType="temperature" timeRange="24h" />
        <VitalSignsGraph vitalType="oxygenSat" timeRange="24h" />
      </div>
    </div>
  );

  const AppointmentsView = () => (
    <div className="space-y-6">
      <Typography.H2 className="text-healthcare-primary">Appointment Management</Typography.H2>
      <AppointmentScheduler 
        appointments={healthcareData.appointments}
        onAppointmentUpdate={(appointment) => console.log('Updated:', appointment)}
        onAppointmentCreate={(appointment) => console.log('Created:', appointment)}
      />
    </div>
  );

  const PrescriptionsView = () => (
    <div className="space-y-6">
      <Typography.H2 className="text-healthcare-primary">Prescription Management</Typography.H2>
      <PrescriptionTracker 
        onRefillRequest={(prescription) => console.log('Refill requested:', prescription)}
        onAdherenceUpdate={(prescription, adherence) => console.log('Adherence updated:', prescription, adherence)}
      />
    </div>
  );

  const LabResultsView = () => (
    <div className="space-y-6">
      <Typography.H2 className="text-healthcare-primary">Laboratory Results</Typography.H2>
      <LabResultsTable 
        onResultClick={(result) => console.log('Result clicked:', result)}
        onExport={() => console.log('Exporting results')}
      />
    </div>
  );

  const TimelineView = () => (
    <div className="space-y-6">
      <Typography.H2 className="text-healthcare-primary">Health Timeline</Typography.H2>
      <PatientTimeline 
        patientId={healthcareData.patient.id}
        onEventClick={(event) => console.log('Event clicked:', event)}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-healthcare-background">
      {/* Healthcare Navigation Header */}
      <nav className="healthcare-nav sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <MedicalIcon.Hospital size={32} />
              <ShinyText className="text-2xl font-bold bg-gradient-to-r from-healthcare-primary to-healthcare-secondary bg-clip-text text-transparent">
                HealthFirst Patient Portal
              </ShinyText>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-2">
                <MedicalIcon.Patient size={20} />
                <span className="text-gray-700 font-medium">
                  {user?.name || 'Patient'}
                </span>
              </div>
              <Button
                onClick={onLogout}
                variant="outline"
                className="border-healthcare-primary text-healthcare-primary hover:bg-healthcare-primary/10"
              >
                <HealthIcon name="lock" size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Healthcare Navigation */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2">
            <nav className="flex flex-wrap gap-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleViewChange(item.id)}
                  className={`healthcare-nav-item ${
                    activeView === item.id ? 'active' : ''
                  }`}
                >
                  <HealthIcon name={item.icon} size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="space-y-6">
            {renderViewContent()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 