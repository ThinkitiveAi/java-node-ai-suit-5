import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MedicalIcon, QuickIcons } from '../IconLibrary'
import { typeClasses } from '../../utils/TypeScale'

const LabResultsTable = ({ 
  labResults = [],
  patientId,
  onResultClick,
  onDownloadReport,
  className = ''
}) => {
  const [sortConfig, setSortConfig] = useState({ key: 'testDate', direction: 'desc' })
  const [filterText, setFilterText] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedResults, setSelectedResults] = useState([])

  // Status configurations for lab results
  const statusConfig = {
    normal: {
      color: 'bg-green-100 text-green-800 border-green-200',
      indicator: 'bg-green-500',
      label: 'Normal',
      icon: 'success'
    },
    abnormal: {
      color: 'bg-red-100 text-red-800 border-red-200',
      indicator: 'bg-red-500',
      label: 'Abnormal',
      icon: 'warning'
    },
    critical: {
      color: 'bg-red-100 text-red-800 border-red-200',
      indicator: 'bg-red-600 animate-pulse',
      label: 'Critical',
      icon: 'emergency'
    },
    pending: {
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      indicator: 'bg-yellow-500',
      label: 'Pending',
      icon: 'pending'
    },
    high: {
      color: 'bg-orange-100 text-orange-800 border-orange-200',
      indicator: 'bg-orange-500',
      label: 'High',
      icon: 'warning'
    },
    low: {
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      indicator: 'bg-blue-500',
      label: 'Low',
      icon: 'warning'
    }
  }

  // Reference ranges for common lab tests
  const referenceRanges = {
    'Complete Blood Count': {
      'WBC': { min: 4.0, max: 11.0, unit: 'K/μL' },
      'RBC': { min: 4.2, max: 5.9, unit: 'M/μL' },
      'Hemoglobin': { min: 12.0, max: 17.5, unit: 'g/dL' },
      'Hematocrit': { min: 36, max: 52, unit: '%' },
      'Platelets': { min: 150, max: 450, unit: 'K/μL' }
    },
    'Basic Metabolic Panel': {
      'Glucose': { min: 70, max: 99, unit: 'mg/dL' },
      'Sodium': { min: 136, max: 144, unit: 'mEq/L' },
      'Potassium': { min: 3.5, max: 5.0, unit: 'mEq/L' },
      'Chloride': { min: 98, max: 107, unit: 'mEq/L' },
      'BUN': { min: 7, max: 20, unit: 'mg/dL' },
      'Creatinine': { min: 0.6, max: 1.3, unit: 'mg/dL' }
    },
    'Lipid Panel': {
      'Total Cholesterol': { min: 0, max: 200, unit: 'mg/dL' },
      'LDL': { min: 0, max: 100, unit: 'mg/dL' },
      'HDL': { min: 40, max: 999, unit: 'mg/dL' },
      'Triglycerides': { min: 0, max: 150, unit: 'mg/dL' }
    }
  }

  // Filter and sort lab results
  const filteredAndSortedResults = useMemo(() => {
    let filtered = labResults.filter(result => {
      const matchesText = !filterText || 
        result.testName.toLowerCase().includes(filterText.toLowerCase()) ||
        result.testCategory.toLowerCase().includes(filterText.toLowerCase())
      
      const matchesStatus = statusFilter === 'all' || result.status === statusFilter
      
      return matchesText && matchesStatus
    })

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key]
        let bValue = b[sortConfig.key]
        
        if (sortConfig.key === 'testDate') {
          aValue = new Date(aValue)
          bValue = new Date(bValue)
        }
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
      })
    }

    return filtered
  }, [labResults, filterText, statusFilter, sortConfig])

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'desc' ? 'asc' : 'desc'
    }))
  }

  const determineResultStatus = (result) => {
    if (result.status) return result.status
    
    const range = referenceRanges[result.testCategory]?.[result.testName]
    if (!range || !result.value) return 'pending'
    
    const numValue = parseFloat(result.value)
    if (isNaN(numValue)) return 'pending'
    
    if (numValue < range.min) return 'low'
    if (numValue > range.max) return 'high'
    return 'normal'
  }

  const formatTestDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const formatTestTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const handleSelectResult = (resultId) => {
    setSelectedResults(prev => 
      prev.includes(resultId) 
        ? prev.filter(id => id !== resultId)
        : [...prev, resultId]
    )
  }

  const handleSelectAll = () => {
    if (selectedResults.length === filteredAndSortedResults.length) {
      setSelectedResults([])
    } else {
      setSelectedResults(filteredAndSortedResults.map(result => result.id))
    }
  }

  const ResultRow = ({ result, index }) => {
    const status = determineResultStatus(result)
    const config = statusConfig[status] || statusConfig.normal
    const isSelected = selectedResults.includes(result.id)
    
    return (
      <motion.tr
        className={`border-b border-gray-200 hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : ''} cursor-pointer`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        onClick={() => onResultClick?.(result)}
      >
        {/* Selection Checkbox */}
        <td className="px-4 py-3">
          <motion.input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => {
              e.stopPropagation()
              handleSelectResult(result.id)
            }}
            className="w-4 h-4 text-healthcare-primary focus:ring-healthcare-primary border-gray-300 rounded"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
        </td>

        {/* Test Name */}
        <td className="px-4 py-3">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${config.indicator}`} />
            <div>
              <p className={`${typeClasses.label.primary} font-semibold`}>{result.testName}</p>
              <p className={`${typeClasses.label.secondary} text-gray-500`}>{result.testCategory}</p>
            </div>
          </div>
        </td>

        {/* Value */}
        <td className="px-4 py-3">
          <span className={`${typeClasses.data.labValues} ${status === 'normal' ? 'text-green-600' : status === 'critical' ? 'text-red-600' : 'text-orange-600'}`}>
            {result.value || 'Pending'}
          </span>
          {result.unit && (
            <span className={`${typeClasses.label.secondary} ml-1`}>{result.unit}</span>
          )}
        </td>

        {/* Reference Range */}
        <td className="px-4 py-3">
          {referenceRanges[result.testCategory]?.[result.testName] ? (
            <span className={typeClasses.body.small}>
              {referenceRanges[result.testCategory][result.testName].min} - {referenceRanges[result.testCategory][result.testName].max} {referenceRanges[result.testCategory][result.testName].unit}
            </span>
          ) : (
            <span className={`${typeClasses.label.secondary} text-gray-400`}>N/A</span>
          )}
        </td>

        {/* Status */}
        <td className="px-4 py-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
            <MedicalIcon name={config.icon} size={12} className="mr-1" />
            {config.label}
          </span>
        </td>

        {/* Date */}
        <td className="px-4 py-3">
          <div>
            <p className={typeClasses.body.small}>{formatTestDate(result.testDate)}</p>
            <p className={`${typeClasses.label.secondary} text-gray-500`}>{formatTestTime(result.testDate)}</p>
          </div>
        </td>

        {/* Actions */}
        <td className="px-4 py-3">
          <div className="flex items-center space-x-2">
            <motion.button
              className="p-1 hover:bg-healthcare-primary/10 rounded transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation()
                onDownloadReport?.(result)
              }}
              aria-label="Download report"
            >
              <MedicalIcon name="download" size={14} variant="default" />
            </motion.button>
          </div>
        </td>
      </motion.tr>
    )
  }

  return (
    <div className={`bg-white rounded-xl shadow-md ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className={typeClasses.heading.h2}>Lab Results</h2>
            <p className={`${typeClasses.body.regular} text-gray-600`}>
              Patient laboratory test results and analysis
            </p>
          </div>
          
          {selectedResults.length > 0 && (
            <motion.button
              className="px-4 py-2 bg-healthcare-primary text-white rounded-lg hover:bg-healthcare-primary/90 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onDownloadReport?.(selectedResults)}
            >
              <MedicalIcon name="download" size={16} variant="inverse" className="mr-2" />
              Download Selected ({selectedResults.length})
            </motion.button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <MedicalIcon name="search" size={16} variant="muted" className="absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search tests..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-primary"
              />
            </div>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-primary"
          >
            <option value="all">All Status</option>
            {Object.entries(statusConfig).map(([key, config]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3">
                <motion.input
                  type="checkbox"
                  checked={selectedResults.length === filteredAndSortedResults.length && filteredAndSortedResults.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-healthcare-primary focus:ring-healthcare-primary border-gray-300 rounded"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                />
              </th>
              
              {[
                { key: 'testName', label: 'Test' },
                { key: 'value', label: 'Value' },
                { key: null, label: 'Reference Range' },
                { key: 'status', label: 'Status' },
                { key: 'testDate', label: 'Date' },
                { key: null, label: 'Actions' }
              ].map(({ key, label }) => (
                <th
                  key={label}
                  className={`px-4 py-3 text-left ${typeClasses.label.primary} ${key ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                  onClick={() => key && handleSort(key)}
                >
                  <div className="flex items-center space-x-2">
                    <span>{label}</span>
                    {key && sortConfig.key === key && (
                      <MedicalIcon 
                        name={sortConfig.direction === 'asc' ? 'next' : 'previous'} 
                        size={12} 
                        variant="muted"
                        className="transform rotate-90"
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody>
            <AnimatePresence>
              {filteredAndSortedResults.map((result, index) => (
                <ResultRow key={result.id} result={result} index={index} />
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredAndSortedResults.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MedicalIcon name="vitalsChart" size={32} variant="muted" />
          </div>
          <h3 className={typeClasses.heading.h3}>No lab results found</h3>
          <p className={`${typeClasses.body.regular} text-gray-600`}>
            {filterText || statusFilter !== 'all' 
              ? 'Try adjusting your filters or search terms.'
              : 'Lab results will appear here when available.'
            }
          </p>
        </div>
      )}

      {/* Footer with Summary */}
      {filteredAndSortedResults.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>
              Showing {filteredAndSortedResults.length} of {labResults.length} results
            </span>
            
            <div className="flex items-center space-x-4">
              {Object.entries(statusConfig).map(([key, config]) => {
                const count = filteredAndSortedResults.filter(result => determineResultStatus(result) === key).length
                return count > 0 ? (
                  <div key={key} className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${config.indicator}`} />
                    <span className="text-xs">{count} {config.label}</span>
                  </div>
                ) : null
              })}
            </div>
          </div>
        </div>
      )}

      {/* ARIA Live Region */}
      <div className="sr-only" aria-live="polite">
        {filteredAndSortedResults.length} lab results displayed
      </div>
    </div>
  )
}

export default LabResultsTable 