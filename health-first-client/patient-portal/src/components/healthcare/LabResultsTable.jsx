import { useState, useMemo } from 'react';
import { HealthIcon, MedicalIcon } from './IconLibrary';
import { Typography } from '../../theme/TypeScale';

const LabResultsTable = ({ 
  results = [],
  onResultClick,
  onExport,
  className = '' 
}) => {
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [filterConfig, setFilterConfig] = useState({ 
    status: 'all', 
    category: 'all',
    dateRange: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample lab results if none provided
  const sampleResults = [
    {
      id: 'LAB001',
      testName: 'Complete Blood Count (CBC)',
      category: 'Hematology',
      date: '2024-01-20',
      status: 'normal',
      value: 'Normal',
      reference: 'Normal ranges',
      unit: '',
      orderedBy: 'Dr. Smith',
      results: [
        { parameter: 'Hemoglobin', value: '14.2', unit: 'g/dL', reference: '12.0-15.5', status: 'normal' },
        { parameter: 'White Blood Cell Count', value: '7.8', unit: '10³/μL', reference: '4.5-11.0', status: 'normal' },
        { parameter: 'Platelet Count', value: '285', unit: '10³/μL', reference: '150-450', status: 'normal' },
        { parameter: 'Hematocrit', value: '42.5', unit: '%', reference: '36.0-46.0', status: 'normal' }
      ]
    },
    {
      id: 'LAB002',
      testName: 'Lipid Panel',
      category: 'Chemistry',
      date: '2024-01-18',
      status: 'warning',
      value: 'Elevated Cholesterol',
      reference: 'See detailed results',
      unit: '',
      orderedBy: 'Dr. Johnson',
      results: [
        { parameter: 'Total Cholesterol', value: '245', unit: 'mg/dL', reference: '<200', status: 'warning' },
        { parameter: 'LDL Cholesterol', value: '165', unit: 'mg/dL', reference: '<100', status: 'critical' },
        { parameter: 'HDL Cholesterol', value: '45', unit: 'mg/dL', reference: '>40', status: 'normal' },
        { parameter: 'Triglycerides', value: '180', unit: 'mg/dL', reference: '<150', status: 'warning' }
      ]
    },
    {
      id: 'LAB003',
      testName: 'Thyroid Function Tests',
      category: 'Endocrinology',
      date: '2024-01-15',
      status: 'normal',
      value: 'Normal',
      reference: 'Normal ranges',
      unit: '',
      orderedBy: 'Dr. Wilson',
      results: [
        { parameter: 'TSH', value: '2.1', unit: 'mIU/L', reference: '0.4-4.0', status: 'normal' },
        { parameter: 'Free T4', value: '1.3', unit: 'ng/dL', reference: '0.8-1.8', status: 'normal' },
        { parameter: 'Free T3', value: '3.2', unit: 'pg/mL', reference: '2.3-4.2', status: 'normal' }
      ]
    }
  ];
  
  const labResults = results.length > 0 ? results : sampleResults;
  
  // Status configurations
  const statusConfig = {
    normal: {
      label: 'Normal',
      color: 'bg-green-100 text-green-800 border-green-200',
      icon: 'normal',
      sortValue: 0
    },
    warning: {
      label: 'Abnormal',
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      icon: 'warning',
      sortValue: 1
    },
    critical: {
      label: 'Critical',
      color: 'bg-red-100 text-red-800 border-red-200',
      icon: 'critical',
      sortValue: 2
    },
    pending: {
      label: 'Pending',
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: 'clock',
      sortValue: 3
    }
  };
  
  // Categories
  const categories = [...new Set(labResults.map(result => result.category))];
  
  // Sorting logic
  const sortedResults = useMemo(() => {
    let filtered = [...labResults];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(result =>
        result.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.orderedBy.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (filterConfig.status !== 'all') {
      filtered = filtered.filter(result => result.status === filterConfig.status);
    }
    
    // Apply category filter
    if (filterConfig.category !== 'all') {
      filtered = filtered.filter(result => result.category === filterConfig.category);
    }
    
    // Apply date range filter
    if (filterConfig.dateRange !== 'all') {
      const now = new Date();
      const days = filterConfig.dateRange === '7d' ? 7 : filterConfig.dateRange === '30d' ? 30 : 90;
      const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
      
      filtered = filtered.filter(result => new Date(result.date) >= cutoffDate);
    }
    
    // Apply sorting
    return filtered.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];
      
      // Special handling for status sorting
      if (sortConfig.key === 'status') {
        aValue = statusConfig[a.status]?.sortValue || 0;
        bValue = statusConfig[b.status]?.sortValue || 0;
      }
      
      // Special handling for date sorting
      if (sortConfig.key === 'date') {
        aValue = new Date(a.date);
        bValue = new Date(b.date);
      }
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [labResults, sortConfig, filterConfig, searchTerm, statusConfig]);
  
  // Handle sorting
  const handleSort = (key) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };
  
  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Get status color for individual parameter
  const _getParameterStatus = (parameter) => {
    if (!parameter.reference || parameter.reference === 'See detailed results') return 'normal';
    return parameter.status || 'normal';
  };
  
  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <MedicalIcon.Records size={24} />
            <div>
              <Typography.H3>Lab Results</Typography.H3>
              <Typography.Caption className="text-gray-600">
                Recent laboratory test results and analysis
              </Typography.Caption>
            </div>
          </div>
          
          {/* Export button */}
          <button
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2 bg-[#2A5C8D] text-white rounded-lg hover:bg-[#1e4066] transition-colors"
          >
            <HealthIcon name="download" size={16} />
            <span className="text-sm font-medium">Export Results</span>
          </button>
        </div>
        
        {/* Filters and Search */}
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <HealthIcon 
                name="search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              />
              <input
                type="text"
                placeholder="Search lab results..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Status filter */}
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filterConfig.status}
            onChange={(e) => setFilterConfig(prev => ({ ...prev, status: e.target.value }))}
          >
            <option value="all">All Statuses</option>
            <option value="normal">Normal</option>
            <option value="warning">Abnormal</option>
            <option value="critical">Critical</option>
            <option value="pending">Pending</option>
          </select>
          
          {/* Category filter */}
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filterConfig.category}
            onChange={(e) => setFilterConfig(prev => ({ ...prev, category: e.target.value }))}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          {/* Date range filter */}
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filterConfig.dateRange}
            onChange={(e) => setFilterConfig(prev => ({ ...prev, dateRange: e.target.value }))}
          >
            <option value="all">All Time</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-4 text-left cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('testName')}
              >
                <div className="flex items-center gap-2">
                  <Typography.BodySmall className="font-semibold text-gray-700">
                    Test Name
                  </Typography.BodySmall>
                  {sortConfig.key === 'testName' && (
                    <HealthIcon 
                      name={sortConfig.direction === 'asc' ? 'up' : 'down'} 
                      size={14} 
                      className="text-gray-500" 
                    />
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('category')}
              >
                <div className="flex items-center gap-2">
                  <Typography.BodySmall className="font-semibold text-gray-700">
                    Category
                  </Typography.BodySmall>
                  {sortConfig.key === 'category' && (
                    <HealthIcon 
                      name={sortConfig.direction === 'asc' ? 'up' : 'down'} 
                      size={14} 
                      className="text-gray-500" 
                    />
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center gap-2">
                  <Typography.BodySmall className="font-semibold text-gray-700">
                    Date
                  </Typography.BodySmall>
                  {sortConfig.key === 'date' && (
                    <HealthIcon 
                      name={sortConfig.direction === 'asc' ? 'up' : 'down'} 
                      size={14} 
                      className="text-gray-500" 
                    />
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center gap-2">
                  <Typography.BodySmall className="font-semibold text-gray-700">
                    Status
                  </Typography.BodySmall>
                  {sortConfig.key === 'status' && (
                    <HealthIcon 
                      name={sortConfig.direction === 'asc' ? 'up' : 'down'} 
                      size={14} 
                      className="text-gray-500" 
                    />
                  )}
                </div>
              </th>
              <th className="px-6 py-4 text-left">
                <Typography.BodySmall className="font-semibold text-gray-700">
                  Summary
                </Typography.BodySmall>
              </th>
              <th className="px-6 py-4 text-left">
                <Typography.BodySmall className="font-semibold text-gray-700">
                  Ordered By
                </Typography.BodySmall>
              </th>
              <th className="px-6 py-4 text-center">
                <Typography.BodySmall className="font-semibold text-gray-700">
                  Actions
                </Typography.BodySmall>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedResults.map((result, index) => {
              const status = statusConfig[result.status] || statusConfig.normal;
              
              return (
                <tr 
                  key={result.id}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                  }`}
                  onClick={() => onResultClick?.(result)}
                >
                  <td className="px-6 py-4">
                    <Typography.Body className="font-medium text-gray-900">
                      {result.testName}
                    </Typography.Body>
                  </td>
                  <td className="px-6 py-4">
                    <Typography.BodySmall className="text-gray-600">
                      {result.category}
                    </Typography.BodySmall>
                  </td>
                  <td className="px-6 py-4">
                    <Typography.BodySmall className="text-gray-600">
                      {formatDate(result.date)}
                    </Typography.BodySmall>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${status.color}`}>
                      <HealthIcon name={status.icon} size={12} />
                      {status.label}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Typography.BodySmall className="text-gray-700">
                      {result.value}
                    </Typography.BodySmall>
                  </td>
                  <td className="px-6 py-4">
                    <Typography.BodySmall className="text-gray-600">
                      {result.orderedBy}
                    </Typography.BodySmall>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      className="text-[#2A5C8D] hover:text-[#1e4066] transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        onResultClick?.(result);
                      }}
                    >
                      <HealthIcon name="view" size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {sortedResults.length === 0 && (
          <div className="text-center py-12">
            <MedicalIcon.Records size={48} className="text-gray-300 mx-auto mb-4" />
            <Typography.Body className="text-gray-500 mb-2">
              No lab results found
            </Typography.Body>
            <Typography.Caption className="text-gray-400">
              Try adjusting your search or filter criteria
            </Typography.Caption>
          </div>
        )}
      </div>
      
      {/* Results summary */}
      {sortedResults.length > 0 && (
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <Typography.BodySmall className="text-gray-600">
              Showing {sortedResults.length} of {labResults.length} results
            </Typography.BodySmall>
            <div className="flex items-center gap-4">
              {Object.entries(statusConfig).map(([key, config]) => {
                const count = sortedResults.filter(r => r.status === key).length;
                if (count === 0) return null;
                
                return (
                  <div key={key} className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full" style={{ 
                      backgroundColor: config.color.includes('green') ? '#10B981' :
                                    config.color.includes('yellow') ? '#F59E0B' :
                                    config.color.includes('red') ? '#EF4444' : '#3B82F6'
                    }}></div>
                    <Typography.Caption className="text-gray-600">
                      {config.label}: {count}
                    </Typography.Caption>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabResultsTable; 