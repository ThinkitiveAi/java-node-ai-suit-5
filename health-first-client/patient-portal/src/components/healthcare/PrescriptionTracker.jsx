import { useState, useMemo } from 'react';
import { HealthIcon, MedicalIcon } from './IconLibrary';
import { Typography } from '../../theme/TypeScale';

const PrescriptionTracker = ({ 
  prescriptions = [],
  onRefillRequest,
  className = '' 
}) => {
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Sample prescription data if none provided
  const samplePrescriptions = [
    {
      id: 'RX001',
      medication: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      prescribedBy: 'Dr. Smith',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      refillsRemaining: 2,
      totalRefills: 5,
      status: 'active',
      adherence: 85,
      lastTaken: '2024-01-20T08:00:00Z',
      nextDue: '2024-01-21T08:00:00Z',
      instructions: 'Take with water, preferably in the morning',
      sideEffects: ['Dizziness', 'Dry cough'],
      interactions: ['Potassium supplements']
    },
    {
      id: 'RX002',
      medication: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      prescribedBy: 'Dr. Johnson',
      startDate: '2023-12-15',
      endDate: '2024-03-15',
      refillsRemaining: 0,
      totalRefills: 3,
      status: 'needs_refill',
      adherence: 92,
      lastTaken: '2024-01-20T20:00:00Z',
      nextDue: '2024-01-21T08:00:00Z',
      instructions: 'Take with meals to reduce stomach upset',
      sideEffects: ['Nausea', 'Stomach upset'],
      interactions: ['Alcohol']
    }
  ];
  
  const prescriptionData = prescriptions.length > 0 ? prescriptions : samplePrescriptions;
  
  // Status configurations
  const statusConfig = {
    active: {
      label: 'Active',
      color: 'bg-green-100 text-green-800 border-green-200',
      icon: 'normal'
    },
    needs_refill: {
      label: 'Needs Refill',
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      icon: 'warning'
    },
    expired: {
      label: 'Expired',
      color: 'bg-red-100 text-red-800 border-red-200',
      icon: 'critical'
    },
    paused: {
      label: 'Paused',
      color: 'bg-gray-100 text-gray-800 border-gray-200',
      icon: 'stable'
    }
  };
  
  // Filter prescriptions
  const filteredPrescriptions = useMemo(() => {
    if (filterStatus === 'all') return prescriptionData;
    return prescriptionData.filter(rx => rx.status === filterStatus);
  }, [prescriptionData, filterStatus]);
  
  // Calculate adherence color
  const getAdherenceColor = (adherence) => {
    if (adherence >= 90) return 'text-green-600';
    if (adherence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Get days until end
  const getDaysUntilEnd = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  // Prescription card component
  const PrescriptionCard = ({ prescription }) => {
    const status = statusConfig[prescription.status] || statusConfig.active;
    const daysRemaining = getDaysUntilEnd(prescription.endDate);
    
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 cursor-pointer">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
              <MedicalIcon.Prescription size={20} />
            </div>
            <div>
              <Typography.H4 className="text-gray-900 mb-1">
                {prescription.medication}
              </Typography.H4>
              <Typography.BodySmall className="text-gray-600">
                {prescription.dosage} • {prescription.frequency}
              </Typography.BodySmall>
            </div>
          </div>
          
          <div className="text-right">
            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${status.color} mb-1`}>
              <HealthIcon name={status.icon} size={12} />
              {status.label}
            </div>
            <Typography.Caption className="block text-gray-500">
              ID: {prescription.id}
            </Typography.Caption>
          </div>
        </div>
        
        {/* Progress bars */}
        <div className="space-y-3">
          {/* Adherence */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <Typography.BodySmall className="text-gray-600">
                Adherence
              </Typography.BodySmall>
              <Typography.BodySmall className={`font-semibold ${getAdherenceColor(prescription.adherence)}`}>
                {prescription.adherence}%
              </Typography.BodySmall>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  prescription.adherence >= 90 ? 'bg-green-500' :
                  prescription.adherence >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${prescription.adherence}%` }}
              />
            </div>
          </div>
          
          {/* Refills remaining */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <Typography.BodySmall className="text-gray-600">
                Refills
              </Typography.BodySmall>
              <Typography.BodySmall className="font-semibold text-gray-800">
                {prescription.refillsRemaining} of {prescription.totalRefills}
              </Typography.BodySmall>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 bg-blue-500 rounded-full transition-all duration-500"
                style={{ 
                  width: `${(prescription.refillsRemaining / prescription.totalRefills) * 100}%` 
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Timeline info */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <div className="text-center">
            <Typography.Caption className="text-gray-500 block">
              Prescribed by
            </Typography.Caption>
            <Typography.BodySmall className="font-medium text-gray-800">
              {prescription.prescribedBy}
            </Typography.BodySmall>
          </div>
          
          <div className="text-center">
            <Typography.Caption className="text-gray-500 block">
              Days remaining
            </Typography.Caption>
            <Typography.BodySmall className={`font-medium ${
              daysRemaining < 7 ? 'text-red-600' : 
              daysRemaining < 14 ? 'text-yellow-600' : 'text-green-600'
            }`}>
              {daysRemaining > 0 ? daysRemaining : 'Expired'}
            </Typography.BodySmall>
          </div>
          
          <div className="text-center">
            <Typography.Caption className="text-gray-500 block">
              Started
            </Typography.Caption>
            <Typography.BodySmall className="font-medium text-gray-800">
              {formatDate(prescription.startDate)}
            </Typography.BodySmall>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <button 
            className="flex-1 bg-[#2A5C8D] text-white py-2 px-3 rounded-lg hover:bg-[#1e4066] transition-colors text-sm font-medium"
            onClick={() => setSelectedPrescription(prescription)}
          >
            View Details
          </button>
          {prescription.status === 'needs_refill' && (
            <button 
              className="flex-1 bg-yellow-500 text-white py-2 px-3 rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium"
              onClick={() => onRefillRequest?.(prescription)}
            >
              Request Refill
            </button>
          )}
        </div>
      </div>
    );
  };
  
  // Detailed prescription modal
  const PrescriptionModal = () => {
    if (!selectedPrescription) return null;
    
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white">
                  <MedicalIcon.Prescription size={24} />
                </div>
                <div>
                  <Typography.H2 className="text-gray-900">
                    {selectedPrescription.medication}
                  </Typography.H2>
                  <Typography.Body className="text-gray-600">
                    {selectedPrescription.dosage} • {selectedPrescription.frequency}
                  </Typography.Body>
                </div>
              </div>
              <button
                onClick={() => setSelectedPrescription(null)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <HealthIcon name="close" size={24} />
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Typography.DataLarge className={getAdherenceColor(selectedPrescription.adherence)}>
                  {selectedPrescription.adherence}%
                </Typography.DataLarge>
                <Typography.Caption className="text-gray-600">
                  Adherence Rate
                </Typography.Caption>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Typography.DataLarge className="text-blue-600">
                  {selectedPrescription.refillsRemaining}
                </Typography.DataLarge>
                <Typography.Caption className="text-gray-600">
                  Refills Left
                </Typography.Caption>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Typography.DataLarge className="text-purple-600">
                  {getDaysUntilEnd(selectedPrescription.endDate)}
                </Typography.DataLarge>
                <Typography.Caption className="text-gray-600">
                  Days Remaining
                </Typography.Caption>
              </div>
            </div>
            
            {/* Instructions */}
            <div>
              <Typography.H4 className="text-gray-900 mb-3">
                Instructions
              </Typography.H4>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <Typography.Body className="text-blue-800">
                  {selectedPrescription.instructions}
                </Typography.Body>
              </div>
            </div>
            
            {/* Side effects */}
            {selectedPrescription.sideEffects && (
              <div>
                <Typography.H4 className="text-gray-900 mb-3">
                  Possible Side Effects
                </Typography.H4>
                <div className="space-y-2">
                  {selectedPrescription.sideEffects.map((effect, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <HealthIcon name="warning" size={16} className="text-yellow-500" />
                      <Typography.Body className="text-gray-700">
                        {effect}
                      </Typography.Body>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Drug interactions */}
            {selectedPrescription.interactions && (
              <div>
                <Typography.H4 className="text-gray-900 mb-3">
                  Drug Interactions
                </Typography.H4>
                <div className="space-y-2">
                  {selectedPrescription.interactions.map((interaction, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <HealthIcon name="critical" size={16} className="text-red-500" />
                      <Typography.Body className="text-gray-700">
                        {interaction}
                      </Typography.Body>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Timeline */}
            <div>
              <Typography.H4 className="text-gray-900 mb-3">
                Treatment Timeline
              </Typography.H4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <Typography.Body className="text-gray-800">Start Date</Typography.Body>
                  <Typography.Body className="font-medium">{formatDate(selectedPrescription.startDate)}</Typography.Body>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <Typography.Body className="text-gray-800">End Date</Typography.Body>
                  <Typography.Body className="font-medium">{formatDate(selectedPrescription.endDate)}</Typography.Body>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <Typography.Body className="text-gray-800">Last Taken</Typography.Body>
                  <Typography.Body className="font-medium">
                    {new Date(selectedPrescription.lastTaken).toLocaleString()}
                  </Typography.Body>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <Typography.Body className="text-gray-800">Next Due</Typography.Body>
                  <Typography.Body className="font-medium">
                    {new Date(selectedPrescription.nextDue).toLocaleString()}
                  </Typography.Body>
                </div>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex gap-3">
              <button className="flex-1 bg-[#2A5C8D] text-white py-3 px-4 rounded-lg hover:bg-[#1e4066] transition-colors font-medium">
                Mark as Taken
              </button>
              <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                Set Reminder
              </button>
              {selectedPrescription.status === 'needs_refill' && (
                <button className="flex-1 bg-yellow-500 text-white py-3 px-4 rounded-lg hover:bg-yellow-600 transition-colors font-medium">
                  Request Refill
                </button>
              )}
            </div>
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
            <MedicalIcon.Prescription size={24} />
            <div>
              <Typography.H3>Prescription Tracker</Typography.H3>
              <Typography.Caption className="text-gray-600">
                Monitor medication adherence and refills
              </Typography.Caption>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex items-center gap-3">
            <select 
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Prescriptions</option>
              <option value="active">Active</option>
              <option value="needs_refill">Needs Refill</option>
              <option value="expired">Expired</option>
              <option value="paused">Paused</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Prescription list */}
      <div className="p-6">
        <div className="grid gap-4">
          {filteredPrescriptions.map((prescription) => (
            <PrescriptionCard 
              key={prescription.id} 
              prescription={prescription} 
            />
          ))}
        </div>
        
        {filteredPrescriptions.length === 0 && (
          <div className="text-center py-12">
            <MedicalIcon.Prescription size={48} className="text-gray-300 mx-auto mb-4" />
            <Typography.Body className="text-gray-500">
              No prescriptions found for the selected filter.
            </Typography.Body>
          </div>
        )}
      </div>
      
      {/* Prescription modal */}
      <PrescriptionModal />
    </div>
  );
};

export default PrescriptionTracker; 