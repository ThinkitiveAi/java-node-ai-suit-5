import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const Section = ({ 
  children, 
  title, 
  icon, 
  isOptional = false, 
  isExpanded = true, 
  onToggle 
}) => {
  return (
    <div className="border border-gray-200 rounded-lg bg-white/50 backdrop-blur-sm">
      <div 
        className={`p-4 ${onToggle ? 'cursor-pointer' : ''}`}
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-primary-600">
              {icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              {isOptional && (
                <p className="text-sm text-gray-500">Optional</p>
              )}
            </div>
          </div>
          {onToggle && (
            <div className="text-gray-400">
              {isExpanded ? (
                <ChevronDown className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </div>
          )}
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default Section; 