import { useState, useEffect, useMemo } from 'react';
import { HealthIcon, MedicalIcon } from './IconLibrary';
import { Typography } from '../../theme/TypeScale';

const VitalSignsGraph = ({ 
  vitalType = 'heartRate',
  data = [],
  timeRange = '24h',
  className = '',
  animate = true,
  showAlerts = true,
  onDataPointClick
}) => {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  
  // Vital sign configurations
  const vitalConfigs = {
    heartRate: {
      label: 'Heart Rate',
      unit: 'bpm',
      icon: 'pulse',
      color: '#E53E3E',
      normalRange: { min: 60, max: 100 },
      criticalRange: { min: 40, max: 150 },
      gradientColors: ['#FED7D7', '#E53E3E']
    },
    bloodPressure: {
      label: 'Blood Pressure',
      unit: 'mmHg',
      icon: 'activity',
      color: '#2A5C8D',
      normalRange: { min: 90, max: 140 },
      criticalRange: { min: 70, max: 180 },
      gradientColors: ['#E6FFFA', '#2A5C8D']
    },
    temperature: {
      label: 'Temperature',
      unit: '°F',
      icon: 'temperature',
      color: '#F59E0B',
      normalRange: { min: 97, max: 99 },
      criticalRange: { min: 95, max: 103 },
      gradientColors: ['#FEF3C7', '#F59E0B']
    },
    oxygenSat: {
      label: 'Oxygen Saturation',
      unit: '%',
      icon: 'activity',
      color: '#4CAF50',
      normalRange: { min: 95, max: 100 },
      criticalRange: { min: 85, max: 100 },
      gradientColors: ['#D1FAE5', '#4CAF50']
    },
    respiratoryRate: {
      label: 'Respiratory Rate',
      unit: 'rpm',
      icon: 'activity',
      color: '#319795',
      normalRange: { min: 12, max: 20 },
      criticalRange: { min: 8, max: 30 },
      gradientColors: ['#E6FFFA', '#319795']
    }
  };
  
  const config = vitalConfigs[vitalType] || vitalConfigs.heartRate;
  
  // Generate sample data if none provided
  const sampleData = useMemo(() => {
    if (data.length > 0) return data;
    
    const points = [];
    const now = new Date();
    const hoursBack = timeRange === '24h' ? 24 : timeRange === '7d' ? 168 : 1;
    const intervalMinutes = timeRange === '24h' ? 60 : timeRange === '7d' ? 60 * 6 : 10;
    
    for (let i = hoursBack; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - (i * intervalMinutes * 60 * 1000));
      const baseValue = (config.normalRange.min + config.normalRange.max) / 2;
      const variation = (Math.random() - 0.5) * 20;
      const value = Math.max(config.criticalRange.min, Math.min(config.criticalRange.max, baseValue + variation));
      
      points.push({
        timestamp: timestamp.toISOString(),
        value: parseFloat(value.toFixed(1)),
        status: getValueStatus(value, config)
      });
    }
    
    return points;
  }, [data, timeRange, config]);
  
  // Determine value status
  function getValueStatus(value, config) {
    if (value < config.criticalRange.min || value > config.criticalRange.max) return 'critical';
    if (value < config.normalRange.min || value > config.normalRange.max) return 'warning';
    return 'normal';
  }
  
  // Animation effect
  useEffect(() => {
    if (!animate) {
      setAnimationProgress(1);
      return;
    }
    
    const timer = setTimeout(() => {
      setAnimationProgress(1);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [animate, vitalType]);
  
  // Graph dimensions
  const width = 800;
  const height = 300;
  const padding = { top: 20, right: 20, bottom: 40, left: 60 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;
  
  // Data processing
  const minValue = Math.min(...sampleData.map(d => d.value), config.criticalRange.min);
  const maxValue = Math.max(...sampleData.map(d => d.value), config.criticalRange.max);
  const valueRange = maxValue - minValue;
  
  // Scale functions
  const scaleX = (index) => (index / (sampleData.length - 1)) * graphWidth;
  const scaleY = (value) => graphHeight - ((value - minValue) / valueRange) * graphHeight;
  
  // Generate path data
  const generatePath = (progress = 1) => {
    if (sampleData.length === 0) return '';
    
    const visiblePoints = Math.floor(sampleData.length * progress);
    const points = sampleData.slice(0, visiblePoints);
    
    if (points.length === 0) return '';
    
    let path = `M ${scaleX(0)} ${scaleY(points[0].value)}`;
    
    for (let i = 1; i < points.length; i++) {
      const x = scaleX(i);
      const y = scaleY(points[i].value);
      path += ` L ${x} ${y}`;
    }
    
    return path;
  };
  
  // Format time
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    if (timeRange === '24h') {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (timeRange === '7d') {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };
  
  // Handle point interaction
  const handlePointClick = (point, index) => {
    setSelectedPoint({ ...point, index });
    onDataPointClick?.(point, index);
  };
  
  // Get alerts
  const alerts = useMemo(() => {
    return sampleData.filter(point => point.status === 'critical' || point.status === 'warning');
  }, [sampleData]);
  
  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${config.color}20` }}>
              <HealthIcon 
                name={config.icon} 
                size={20} 
                style={{ color: config.color }}
                animate={vitalType === 'heartRate' ? 'heartbeat' : false}
              />
            </div>
            <div>
              <Typography.H3 className="text-gray-900">
                {config.label}
              </Typography.H3>
              <Typography.Caption className="text-gray-600">
                Real-time monitoring • Last {timeRange}
              </Typography.Caption>
            </div>
          </div>
          
          {/* Current value */}
          <div className="text-right">
            <Typography.DataLarge style={{ color: config.color }}>
              {sampleData.length > 0 ? sampleData[sampleData.length - 1].value : '--'}
            </Typography.DataLarge>
            <Typography.Caption className="text-gray-600">
              {config.unit}
            </Typography.Caption>
          </div>
        </div>
        
        {/* Alerts */}
        {showAlerts && alerts.length > 0 && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2">
              <MedicalIcon.Warning size={16} />
              <Typography.BodySmall className="text-red-800 font-medium">
                {alerts.length} reading{alerts.length > 1 ? 's' : ''} outside normal range
              </Typography.BodySmall>
            </div>
          </div>
        )}
      </div>
      
      {/* Graph */}
      <div className="p-6">
        <div className="relative">
          <svg 
            width={width} 
            height={height} 
            className="w-full h-auto"
            viewBox={`0 0 ${width} ${height}`}
          >
            {/* Background grid */}
            <defs>
              <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#f1f5f9" strokeWidth="1"/>
              </pattern>
              <linearGradient id={`gradient-${vitalType}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={config.gradientColors[1]} stopOpacity="0.3"/>
                <stop offset="100%" stopColor={config.gradientColors[1]} stopOpacity="0.05"/>
              </linearGradient>
            </defs>
            
            <rect 
              x={padding.left} 
              y={padding.top} 
              width={graphWidth} 
              height={graphHeight} 
              fill="url(#grid)" 
            />
            
            {/* Normal range indicator */}
            <rect
              x={padding.left}
              y={padding.top + scaleY(config.normalRange.max)}
              width={graphWidth}
              height={scaleY(config.normalRange.min) - scaleY(config.normalRange.max)}
              fill={config.color}
              fillOpacity="0.1"
            />
            
            {/* Area under curve */}
            {sampleData.length > 0 && (
              <path
                d={`${generatePath(animationProgress)} L ${scaleX(Math.floor(sampleData.length * animationProgress) - 1)} ${graphHeight + padding.top} L ${padding.left} ${graphHeight + padding.top} Z`}
                fill={`url(#gradient-${vitalType})`}
                className="transition-all duration-1000 ease-out"
              />
            )}
            
            {/* Main line */}
            <path
              d={generatePath(animationProgress)}
              fill="none"
              stroke={config.color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-1000 ease-out"
            />
            
            {/* Data points */}
            {sampleData.slice(0, Math.floor(sampleData.length * animationProgress)).map((point, index) => (
              <circle
                key={index}
                cx={padding.left + scaleX(index)}
                cy={padding.top + scaleY(point.value)}
                r={hoveredPoint === index ? 6 : 4}
                fill={point.status === 'critical' ? '#E53E3E' : 
                      point.status === 'warning' ? '#F59E0B' : config.color}
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200 hover:r-6"
                onMouseEnter={() => setHoveredPoint(index)}
                onMouseLeave={() => setHoveredPoint(null)}
                onClick={() => handlePointClick(point, index)}
              />
            ))}
            
            {/* Y-axis labels */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
              const value = minValue + (valueRange * ratio);
              const y = padding.top + graphHeight - (ratio * graphHeight);
              
              return (
                <g key={ratio}>
                  <line
                    x1={padding.left - 5}
                    y1={y}
                    x2={padding.left}
                    y2={y}
                    stroke="#9ca3af"
                    strokeWidth="1"
                  />
                  <text
                    x={padding.left - 10}
                    y={y + 4}
                    textAnchor="end"
                    fontSize="12"
                    fill="#6b7280"
                  >
                    {Math.round(value)}
                  </text>
                </g>
              );
            })}
            
            {/* X-axis labels */}
            {sampleData.filter((_, index) => index % Math.ceil(sampleData.length / 6) === 0).map((point) => {
              const originalIndex = sampleData.indexOf(point);
              const x = padding.left + scaleX(originalIndex);
              
              return (
                <g key={originalIndex}>
                  <line
                    x1={x}
                    y1={padding.top + graphHeight}
                    x2={x}
                    y2={padding.top + graphHeight + 5}
                    stroke="#9ca3af"
                    strokeWidth="1"
                  />
                  <text
                    x={x}
                    y={padding.top + graphHeight + 18}
                    textAnchor="middle"
                    fontSize="12"
                    fill="#6b7280"
                  >
                    {formatTime(point.timestamp)}
                  </text>
                </g>
              );
            })}
          </svg>
          
          {/* Tooltip */}
          {hoveredPoint !== null && (
            <div 
              className="absolute bg-gray-900 text-white p-3 rounded-lg shadow-lg z-10 pointer-events-none"
              style={{
                left: `${((hoveredPoint / (sampleData.length - 1)) * 100)}%`,
                top: '10px',
                transform: 'translateX(-50%)'
              }}
            >
              <Typography.BodySmall className="text-white">
                {formatTime(sampleData[hoveredPoint].timestamp)}
              </Typography.BodySmall>
              <Typography.Data className="text-white">
                {sampleData[hoveredPoint].value} {config.unit}
              </Typography.Data>
              <Typography.Caption className={`
                ${sampleData[hoveredPoint].status === 'critical' ? 'text-red-300' :
                  sampleData[hoveredPoint].status === 'warning' ? 'text-yellow-300' : 'text-green-300'}
              `}>
                {sampleData[hoveredPoint].status.charAt(0).toUpperCase() + sampleData[hoveredPoint].status.slice(1)}
              </Typography.Caption>
            </div>
          )}
        </div>
        
        {/* Legend */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: config.color }}></div>
              <Typography.Caption className="text-gray-600">Current Reading</Typography.Caption>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <Typography.Caption className="text-gray-600">Normal Range</Typography.Caption>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <Typography.Caption className="text-gray-600">Warning</Typography.Caption>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <Typography.Caption className="text-gray-600">Critical</Typography.Caption>
            </div>
          </div>
          
          <div className="text-right">
            <Typography.Caption className="text-gray-500">
              Normal: {config.normalRange.min}-{config.normalRange.max} {config.unit}
            </Typography.Caption>
          </div>
        </div>
      </div>
      
      {/* Selected point details */}
      {selectedPoint && (
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <Typography.H5 className="text-gray-900 mb-1">
                Selected Reading
              </Typography.H5>
              <Typography.Body className="text-gray-600">
                {formatTime(selectedPoint.timestamp)}
              </Typography.Body>
            </div>
            <div className="text-right">
              <Typography.DataLarge style={{ color: config.color }}>
                {selectedPoint.value} {config.unit}
              </Typography.DataLarge>
              <Typography.Caption className={`
                ${selectedPoint.status === 'critical' ? 'text-red-600' :
                  selectedPoint.status === 'warning' ? 'text-yellow-600' : 'text-green-600'}
              `}>
                {selectedPoint.status.charAt(0).toUpperCase() + selectedPoint.status.slice(1)}
              </Typography.Caption>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VitalSignsGraph; 