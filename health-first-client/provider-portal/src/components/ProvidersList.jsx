import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  User,
  Heart,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  UserCheck
} from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '../ui/Table';
import Button from '../ui/Button';

const ProvidersList = ({ providers, onEditProvider, onDeleteProvider, onViewProvider }) => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getSpecializationColor = (specialization) => {
    const colors = {
      'Cardiology': '#ef4444',
      'Neurology': '#3b82f6',
      'Pediatrics': '#10b981',
      'Orthopedics': '#f59e0b',
      'Dermatology': '#a855f7',
      'General Practice': '#64748b',
      'Gynecology': '#ec4899',
      'Oncology': '#8b5cf6',
      'Ophthalmology': '#06b6d4',
      'Psychiatry': '#84cc16',
      'Radiology': '#f97316',
      'Surgery': '#6366f1',
      'Urology': '#059669',
      'Endocrinology': '#eab308',
      'Gastroenterology': '#7c3aed'
    };
    return colors[specialization] || '#64748b';
  };

  const handleMenuToggle = (provider) => {
    if (selectedProvider?.id === provider.id) {
      setIsMenuOpen(!isMenuOpen);
    } else {
      setSelectedProvider(provider);
      setIsMenuOpen(true);
    }
  };

  const handleAction = (action) => {
    if (selectedProvider) {
      switch (action) {
        case 'view':
          onViewProvider?.(selectedProvider);
          break;
        case 'edit':
          onEditProvider?.(selectedProvider);
          break;
        case 'delete':
          onDeleteProvider?.(selectedProvider);
          break;
      }
    }
    setIsMenuOpen(false);
    setSelectedProvider(null);
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
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeInUp} className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl shadow-lg">
          <Heart className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Healthcare Providers</h2>
          <p className="text-slate-600">Manage and view all registered healthcare providers</p>
        </div>
      </motion.div>

      {/* Table Container */}
      <motion.div 
        variants={fadeInUp}
        className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 overflow-hidden"
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-blue-600 to-teal-600 border-none">
              <TableHead className="text-white font-semibold py-4 px-6">Provider</TableHead>
              <TableHead className="text-white font-semibold py-4 px-6">Specialization</TableHead>
              <TableHead className="text-white font-semibold py-4 px-6">Contact</TableHead>
              <TableHead className="text-white font-semibold py-4 px-6">License</TableHead>
              <TableHead className="text-white font-semibold py-4 px-6">Location</TableHead>
              <TableHead className="text-white font-semibold py-4 px-6 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {providers.map((provider, index) => (
              <motion.tr
                key={provider.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`border-b border-slate-100 transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-teal-50/50 ${
                  hoveredRow === provider.id ? 'shadow-lg transform -translate-y-0.5' : ''
                }`}
                onMouseEnter={() => setHoveredRow(provider.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <TableCell className="py-4 px-6">
                  <div className="flex items-center space-x-4">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold text-sm shadow-lg"
                      style={{ backgroundColor: getSpecializationColor(provider.specialization) }}
                    >
                      {getInitials(provider.firstName, provider.lastName)}
                    </motion.div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {provider.firstName} {provider.lastName}
                      </p>
                      <p className="text-sm text-slate-500">
                        {provider.yearsExperience} years experience
                      </p>
                    </div>
                  </div>
                </TableCell>
                
                <TableCell className="py-4 px-6">
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white shadow-sm"
                    style={{ backgroundColor: getSpecializationColor(provider.specialization) }}
                  >
                    {provider.specialization}
                  </span>
                </TableCell>
                
                <TableCell className="py-4 px-6">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <Mail className="h-4 w-4 text-slate-400" />
                      <span>{provider.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <Phone className="h-4 w-4 text-slate-400" />
                      <span>{provider.phone}</span>
                    </div>
                  </div>
                </TableCell>
                
                <TableCell className="py-4 px-6">
                  <span className="font-mono text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {provider.licenseNumber}
                  </span>
                </TableCell>
                
                <TableCell className="py-4 px-6">
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span>{provider.city}, {provider.state}</span>
                  </div>
                </TableCell>

                <TableCell className="py-4 px-6">
                  <div className="flex items-center justify-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onViewProvider?.(provider)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onEditProvider?.(provider)}
                      className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                      title="Edit Provider"
                    >
                      <Edit className="h-4 w-4" />
                    </motion.button>

                    <div className="relative">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleMenuToggle(provider)}
                        className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
                        title="More Actions"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </motion.button>

                      {/* Action Menu */}
                      <AnimatePresence>
                        {isMenuOpen && selectedProvider?.id === provider.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200/60 py-2 z-10"
                          >
                            <button
                              onClick={() => handleAction('view')}
                              className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                            >
                              <Eye className="h-4 w-4" />
                              <span>View Details</span>
                            </button>
                            <button
                              onClick={() => handleAction('edit')}
                              className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
                            >
                              <Edit className="h-4 w-4" />
                              <span>Edit Provider</span>
                            </button>
                            <div className="border-t border-slate-100 my-1"></div>
                            <button
                              onClick={() => handleAction('delete')}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span>Delete Provider</span>
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>

        {providers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <UserCheck className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg font-medium">No providers found</p>
            <p className="text-slate-400">Add your first healthcare provider to get started.</p>
          </motion.div>
        )}
      </motion.div>

      {/* Click outside to close menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => {
            setIsMenuOpen(false);
            setSelectedProvider(null);
          }}
        />
      )}
    </motion.div>
  );
};

export default ProvidersList; 