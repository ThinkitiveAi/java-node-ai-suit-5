import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MedicalIcon, QuickIcons } from '../IconLibrary'
import { typeClasses } from '../../utils/TypeScale'

const VitalSignsGraph = ({ 
  vitalsData = [],
  patientId,
  timeRange = '24h',
  autoRefresh = true,
  onTimeRangeChange,
  className = ''
}) => {
  const [selectedVital, setSelectedVital] = useState('heartRate')
  const [isLive, setIsLive] = useState(autoRefresh)
  const [currentData, setCurrentData] = useState(vitalsData)
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  // Vital signs configuration
  const vitalConfig = {
    heartRate: {
      label: 'Heart Rate',
      unit: 'BPM',
      color: '#E53E3E',
      normalRange: [60, 100],
      icon: 'vitals',
      gradient: ['#E53E3E', '#F56565']
    },
    bloodPressure: {
      label: 'Blood Pressure',
      unit: 'mmHg',
      color: '#2A5C8D',
      normalRange: [80, 120], // systolic
      icon: 'vitalsChart',
      gradient: ['#2A5C8D', '#4299E1']
    },
    temperature: {
      label: 'Temperature',
      unit: '°F',
      color: '#F59E0B',
      normalRange: [97.0, 99.5],
      icon: 'temperature',
      gradient: ['#F59E0B', '#FBB040']
    },
    oxygenSaturation: {
      label: 'Oxygen Saturation',
      unit: '%',
      color: '#4CAF50',
      normalRange: [95, 100],
      icon: 'vitalsChart',
      gradient: ['#4CAF50', '#68D391']
    },
    respiratoryRate: {
      label: 'Respiratory Rate',
      unit: '/min',
      color: '#9F7AEA',
      normalRange: [12, 20],
      icon: 'vitalsChart',
      gradient: ['#9F7AEA', '#B794F6']
    }
  }

  const timeRanges = {
    '1h': { label: '1 Hour', points: 60 },
    '6h': { label: '6 Hours', points: 72 },
    '24h': { label: '24 Hours', points: 144 },
    '7d': { label: '7 Days', points: 168 }
  }

  // Generate mock real-time data for demonstration
  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      const newDataPoint = generateRealtimeDataPoint()
      setCurrentData(prev => [...prev.slice(-timeRanges[timeRange].points), newDataPoint])
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [isLive, timeRange])

  const generateRealtimeDataPoint = () => {
    const timestamp = new Date()
    return {
      timestamp: timestamp.toISOString(),
      heartRate: Math.floor(Math.random() * 40) + 70, // 70-110
      bloodPressure: {
        systolic: Math.floor(Math.random() * 40) + 110, // 110-150
        diastolic: Math.floor(Math.random() * 20) + 70  // 70-90
      },
      temperature: (Math.random() * 2 + 97.5).toFixed(1), // 97.5-99.5
      oxygenSaturation: Math.floor(Math.random() * 5) + 96, // 96-100
      respiratoryRate: Math.floor(Math.random() * 8) + 14 // 14-22
    }
  }

  // Draw the vital signs chart on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || currentData.length === 0) return

    const ctx = canvas.getContext('2d')
    const { width, height } = canvas
    const config = vitalConfig[selectedVital]
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height)
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, config.gradient[0] + '40') // 25% opacity
    gradient.addColorStop(1, config.gradient[1] + '10') // 6% opacity

    // Calculate chart dimensions
    const padding = 60
    const chartWidth = width - (padding * 2)
    const chartHeight = height - (padding * 2)
    
    // Get data points for selected vital
    const dataPoints = currentData.map(item => {
      let value = item[selectedVital]
      if (selectedVital === 'bloodPressure') {
        value = item[selectedVital].systolic
      }
      return typeof value === 'string' ? parseFloat(value) : value
    }).filter(val => !isNaN(val))

    if (dataPoints.length === 0) return

    const maxValue = Math.max(...dataPoints, config.normalRange[1] + 10)
    const minValue = Math.min(...dataPoints, config.normalRange[0] - 10)
    const valueRange = maxValue - minValue

    // Draw grid lines
    ctx.strokeStyle = '#E5E7EB'
    ctx.lineWidth = 1
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()
    }

    // Draw normal range background
    const normalMin = config.normalRange[0]
    const normalMax = config.normalRange[1]
    const normalMinY = padding + chartHeight - ((normalMin - minValue) / valueRange) * chartHeight
    const normalMaxY = padding + chartHeight - ((normalMax - minValue) / valueRange) * chartHeight
    
    ctx.fillStyle = config.color + '20'
    ctx.fillRect(padding, normalMaxY, chartWidth, normalMinY - normalMaxY)

    // Draw the line chart
    if (dataPoints.length > 1) {
      ctx.beginPath()
      const stepX = chartWidth / (dataPoints.length - 1)
      
      dataPoints.forEach((value, index) => {
        const x = padding + stepX * index
        const y = padding + chartHeight - ((value - minValue) / valueRange) * chartHeight
        
        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      // Fill area under curve
      ctx.lineTo(padding + chartWidth, padding + chartHeight)
      ctx.lineTo(padding, padding + chartHeight)
      ctx.closePath()
      ctx.fillStyle = gradient
      ctx.fill()

      // Draw line
      ctx.beginPath()
      dataPoints.forEach((value, index) => {
        const x = padding + stepX * index
        const y = padding + chartHeight - ((value - minValue) / valueRange) * chartHeight
        
        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      
      ctx.strokeStyle = config.color
      ctx.lineWidth = 3
      ctx.stroke()

      // Draw data points
      dataPoints.forEach((value, index) => {
        const x = padding + stepX * index
        const y = padding + chartHeight - ((value - minValue) / valueRange) * chartHeight
        
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, 2 * Math.PI)
        ctx.fillStyle = config.color
        ctx.fill()
        ctx.strokeStyle = '#FFFFFF'
        ctx.lineWidth = 2
        ctx.stroke()
      })
    }

    // Draw value labels
    ctx.fillStyle = '#6B7280'
    ctx.font = '12px Inter'
    ctx.textAlign = 'right'
    
    for (let i = 0; i <= 5; i++) {
      const value = minValue + (valueRange / 5) * (5 - i)
      const y = padding + (chartHeight / 5) * i + 4
      ctx.fillText(Math.round(value).toString(), padding - 10, y)
    }

  }, [currentData, selectedVital])

  const getCurrentValue = () => {
    if (currentData.length === 0) return null
    const latest = currentData[currentData.length - 1]
    let value = latest[selectedVital]
    
    if (selectedVital === 'bloodPressure') {
      return `${latest[selectedVital].systolic}/${latest[selectedVital].diastolic}`
    }
    
    return typeof value === 'string' ? value : value?.toString()
  }

  const isValueNormal = () => {
    if (currentData.length === 0) return true
    const latest = currentData[currentData.length - 1]
    let value = latest[selectedVital]
    
    if (selectedVital === 'bloodPressure') {
      value = latest[selectedVital].systolic
    }
    
    const numValue = typeof value === 'string' ? parseFloat(value) : value
    const [min, max] = vitalConfig[selectedVital].normalRange
    return numValue >= min && numValue <= max
  }

  const VitalSelector = () => (
    <div className="flex flex-wrap gap-2 mb-4">
      {Object.entries(vitalConfig).map(([key, config]) => (
        <motion.button
          key={key}
          className={`
            flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium
            ${selectedVital === key 
              ? 'bg-healthcare-primary text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }
            transition-colors duration-200
          `}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedVital(key)}
        >
          <MedicalIcon name={config.icon} size={16} variant={selectedVital === key ? 'inverse' : 'default'} />
          <span>{config.label}</span>
        </motion.button>
      ))}
    </div>
  )

  const currentConfig = vitalConfig[selectedVital]
  const currentValue = getCurrentValue()
  const valueIsNormal = isValueNormal()

  return (
    <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className={typeClasses.heading.h2}>Vital Signs Monitor</h2>
          <p className={`${typeClasses.body.regular} text-gray-600`}>
            Real-time patient vital signs tracking
          </p>
        </div>
        
        {/* Controls */}
        <div className="flex items-center space-x-3">
          {/* Time Range Selector */}
          <select 
            value={timeRange}
            onChange={(e) => onTimeRangeChange?.(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-healthcare-primary text-sm"
          >
            {Object.entries(timeRanges).map(([key, config]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>
          
          {/* Live Toggle */}
          <motion.button
            className={`
              flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium
              ${isLive 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
              transition-colors duration-200
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsLive(!isLive)}
          >
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
            <span>{isLive ? 'Live' : 'Paused'}</span>
          </motion.button>
        </div>
      </div>

      {/* Vital Selector */}
      <VitalSelector />

      {/* Current Value Display */}
      <div className="flex items-center justify-between mb-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center`} style={{ backgroundColor: currentConfig.color + '20' }}>
            <MedicalIcon name={currentConfig.icon} size={24} style={{ color: currentConfig.color }} />
          </div>
          <div>
            <h3 className={typeClasses.heading.h3}>{currentConfig.label}</h3>
            <span className={`${typeClasses.data.vitals} ${valueIsNormal ? 'text-green-600' : 'text-red-600'}`}>
              {currentValue || '--'} {currentConfig.unit}
            </span>
          </div>
        </div>
        
        {/* Status Indicator */}
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${valueIsNormal ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          <MedicalIcon 
            name={valueIsNormal ? 'success' : 'warning'} 
            size={14} 
            variant={valueIsNormal ? 'success' : 'warning'}
          />
          <span>{valueIsNormal ? 'Normal' : 'Abnormal'}</span>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="relative bg-gray-50 rounded-lg p-4 mb-4">
        <canvas
          ref={canvasRef}
          width={800}
          height={300}
          className="w-full h-full max-h-[300px]"
          style={{ background: 'transparent' }}
        />
        
        {/* No Data Overlay */}
        {currentData.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <MedicalIcon name="vitalsChart" size={32} variant="muted" />
              </div>
              <h3 className={typeClasses.heading.h3}>No Data Available</h3>
              <p className={typeClasses.body.regular}>Vital signs data will appear here when available</p>
            </div>
          </div>
        )}
      </div>

      {/* Normal Range Info */}
      <div className="flex items-center justify-between text-sm text-gray-600 bg-blue-50 rounded-lg p-3">
        <span>Normal Range: {currentConfig.normalRange[0]} - {currentConfig.normalRange[1]} {currentConfig.unit}</span>
        <span className="text-xs">Last updated: {currentData.length > 0 ? new Date(currentData[currentData.length - 1].timestamp).toLocaleTimeString() : 'N/A'}</span>
      </div>

      {/* ARIA Live Region */}
      <div className="sr-only" aria-live="polite">
        Current {currentConfig.label}: {currentValue} {currentConfig.unit}, Status: {valueIsNormal ? 'Normal' : 'Abnormal'}
      </div>
    </div>
  )
}

export default VitalSignsGraph 