import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  MoreVertical,
  Filter,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '../ui/Table';
import Button from '../ui/Button';
import TextField from '../ui/TextField';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);

  // Mock data for appointments
  const mockAppointments = [
    {
      id: 1,
      patientName: 'John Doe',
      appointmentDate: '2024-01-15',
      appointmentTime: '10:00 AM',
      status: 'confirmed',
      type: 'Follow-up',
      provider: 'Dr. Smith'
    },
    {
      id: 2,
      patientName: 'Jane Wilson',
      appointmentDate: '2024-01-15',
      appointmentTime: '2:30 PM',
      status: 'pending',
      type: 'New Patient',
      provider: 'Dr. Johnson'
    },
    {
      id: 3,
      patientName: 'Mike Brown',
      appointmentDate: '2024-01-16',
      appointmentTime: '11:15 AM',
      status: 'cancelled',
      type: 'Consultation',
      provider: 'Dr. Davis'
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setAppointments(mockAppointments);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || appointment.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <motion.div
          className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Appointments</h2>
        <Button
          variant="contained"
          startIcon={<Calendar className="w-4 h-4" />}
        >
          Schedule New
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <TextField
            fullWidth
            placeholder="Search by patient name or provider..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
        
        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
          
          <Button
            variant="outlined"
            startIcon={<Filter className="w-4 h-4" />}
          >
            Filter
          </Button>
        </div>
      </div>

      {/* Appointments Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-xl overflow-hidden"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.map((appointment, index) => (
              <TableRow 
                key={appointment.id}
                animated
                className="hover:bg-slate-50/50"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium text-slate-800">
                      {appointment.patientName}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-slate-800">
                      <Calendar className="w-4 h-4" />
                      {appointment.appointmentDate}
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 text-sm">
                      <Clock className="w-4 h-4" />
                      {appointment.appointmentTime}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-slate-700">{appointment.type}</span>
                </TableCell>
                <TableCell>
                  <span className="text-slate-700">{appointment.provider}</span>
                </TableCell>
                <TableCell>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                    {getStatusIcon(appointment.status)}
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<MoreVertical className="w-4 h-4" />}
                  >
                    Actions
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {filteredAppointments.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 mx-auto text-slate-400 mb-4" />
            <p className="text-slate-600">No appointments found</p>
            <p className="text-sm text-slate-500 mt-1">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Schedule your first appointment to get started'
              }
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AppointmentList;
