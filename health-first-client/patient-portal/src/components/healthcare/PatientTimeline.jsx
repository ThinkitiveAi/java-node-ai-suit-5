import React from 'react';
import { Calendar, Clock, User, Activity } from 'lucide-react';

const PatientTimeline = ({ 
  events = [],
  patientName = "John Doe",
  showCompact = false 
}) => {
  const defaultEvents = [
    {
      id: 1,
      type: 'appointment',
      title: 'Annual Physical Exam',
      date: '2024-01-15',
      time: '09:00 AM',
      doctor: 'Dr. Sarah Smith',
      status: 'completed',
      description: 'Routine check-up with blood work'
    },
    {
      id: 2,
      type: 'lab',
      title: 'Blood Test Results',
      date: '2024-01-20',
      time: '02:30 PM',
      doctor: 'Lab Department',
      status: 'completed',
      description: 'Cholesterol and glucose levels normal'
    },
    {
      id: 3,
      type: 'prescription',
      title: 'Medication Refill',
      date: '2024-02-01',
      time: '11:15 AM',
      doctor: 'Dr. Sarah Smith',
      status: 'pending',
      description: 'Lisinopril 10mg - 30 day supply'
    },
    {
      id: 4,
      type: 'appointment',
      title: 'Follow-up Consultation',
      date: '2024-02-15',
      time: '10:00 AM',
      doctor: 'Dr. Sarah Smith',
      status: 'scheduled',
      description: 'Review lab results and medication adjustment'
    }
  ];

  const timelineEvents = events.length > 0 ? events : defaultEvents;

  const getEventIcon = (type) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="w-4 h-4" />;
      case 'lab':
        return <Activity className="w-4 h-4" />;
      case 'prescription':
        return <User className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'appointment':
        return 'bg-primary text-white';
      case 'lab':
        return 'bg-teal-500 text-white';
      case 'prescription':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  if (showCompact) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Recent Activity
        </h3>
        <div className="space-y-3">
          {timelineEvents.slice(0, 3).map((event) => (
            <div key={event.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className={`p-2 rounded-full ${getEventTypeColor(event.type)}`}>
                {getEventIcon(event.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{event.title}</p>
                <p className="text-xs text-gray-500">{event.date} at {event.time}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(event.status)}`}>
                {event.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Clock className="w-6 h-6 text-primary" />
          Patient Timeline
        </h2>
        <span className="text-sm text-gray-500">
          Patient: {patientName}
        </span>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                 <div className="space-y-6">
           {timelineEvents.map((event) => (
             <div key={event.id} className="relative flex items-start gap-4">
              {/* Timeline Dot */}
              <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${getEventTypeColor(event.type)} shadow-lg`}>
                {getEventIcon(event.type)}
              </div>

              {/* Event Content */}
              <div className="flex-1 bg-gray-50 rounded-xl p-4 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {event.date} at {event.time}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                      <User className="w-4 h-4" />
                      {event.doctor}
                    </p>
                  </div>
                  <span className={`px-3 py-1 text-sm rounded-full border ${getStatusColor(event.status)} font-medium`}>
                    {event.status}
                  </span>
                </div>
                {event.description && (
                  <p className="text-gray-700 text-sm mt-3 p-3 bg-white rounded-lg border border-gray-200">
                    {event.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientTimeline; 