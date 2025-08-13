import { useState } from 'react';
import { MedicalIcon } from './IconLibrary';
import { Typography } from '../../theme/TypeScale';

const EmergencyButton = ({ 
  onClick,
  className = '',
  disabled = false,
  variant = 'primary',
  size = 'md',
  showConfirmation = true,
  confirmationText = 'Are you sure you want to trigger an emergency alert?',
  buttonText = 'Emergency',
  icon = true,
  pulse = true,
  ...props 
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  // Size configurations
  const sizeConfig = {
    sm: {
      padding: 'px-4 py-2',
      iconSize: 16,
      textClass: 'text-sm',
      minHeight: 'min-h-[36px]'
    },
    md: {
      padding: 'px-6 py-3',
      iconSize: 20,
      textClass: 'text-base',
      minHeight: 'min-h-[44px]'
    },
    lg: {
      padding: 'px-8 py-4',
      iconSize: 24,
      textClass: 'text-lg',
      minHeight: 'min-h-[52px]'
    },
    xl: {
      padding: 'px-10 py-5',
      iconSize: 28,
      textClass: 'text-xl',
      minHeight: 'min-h-[60px]'
    }
  };
  
  const currentSize = sizeConfig[size] || sizeConfig.md;
  
  // Variant configurations
  const variantConfig = {
    primary: {
      base: 'bg-red-600 hover:bg-red-700 text-white border-2 border-red-600',
      active: 'bg-red-800 border-red-800',
      shadow: 'shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40',
      glow: 'ring-4 ring-red-500/20'
    },
    outline: {
      base: 'bg-transparent hover:bg-red-50 text-red-600 border-2 border-red-600',
      active: 'bg-red-100 border-red-700 text-red-700',
      shadow: 'shadow-lg shadow-red-500/10 hover:shadow-xl hover:shadow-red-500/20',
      glow: 'ring-4 ring-red-500/10'
    },
    solid: {
      base: 'bg-red-500 hover:bg-red-600 text-white border-2 border-red-500',
      active: 'bg-red-700 border-red-700',
      shadow: 'shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/50',
      glow: 'ring-4 ring-red-500/25'
    },
    ghost: {
      base: 'bg-red-50 hover:bg-red-100 text-red-700 border-2 border-red-200',
      active: 'bg-red-200 border-red-300',
      shadow: 'shadow-md shadow-red-500/5 hover:shadow-lg hover:shadow-red-500/10',
      glow: 'ring-4 ring-red-500/5'
    }
  };
  
  const currentVariant = variantConfig[variant] || variantConfig.primary;
  
  const handleClick = () => {
    if (disabled) return;
    
    if (showConfirmation && !showConfirm) {
      setShowConfirm(true);
      return;
    }
    
    setIsPressed(true);
    onClick?.();
    
    // Reset pressed state after animation
    setTimeout(() => {
      setIsPressed(false);
      setShowConfirm(false);
    }, 200);
  };
  
  const handleCancel = () => {
    setShowConfirm(false);
  };
  
  // Base button classes
  const baseClasses = `
    relative inline-flex items-center justify-center
    ${currentSize.padding} ${currentSize.minHeight}
    rounded-xl font-bold uppercase tracking-wider
    transition-all duration-300 ease-out
    transform-gpu
    focus:outline-none focus:ring-4 focus:ring-red-500/50
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${isPressed ? 'scale-95' : 'hover:scale-105'}
    ${pulse && !disabled ? 'animate-pulse' : ''}
  `;
  
  const buttonClasses = `
    ${baseClasses}
    ${isPressed ? currentVariant.active : currentVariant.base}
    ${currentVariant.shadow}
    ${showConfirm ? currentVariant.glow : ''}
    ${className}
  `;
  
  // Confirmation dialog
  if (showConfirm) {
    return (
      <div className="relative">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={handleCancel}
        />
        
        {/* Confirmation Modal */}
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 max-w-md w-full mx-4">
          <div className="text-center">
            {/* Warning Icon */}
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <MedicalIcon.Emergency size={32} className="text-red-600" />
            </div>
            
            {/* Confirmation Text */}
            <Typography.H3 className="text-gray-900 mb-2">
              Emergency Alert
            </Typography.H3>
            <Typography.Body className="text-gray-600 mb-6">
              {confirmationText}
            </Typography.Body>
            
            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleClick}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Confirm Emergency
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled}
      aria-label="Emergency button"
      {...props}
    >
      {/* Background pulse effect */}
      <div className="absolute inset-0 bg-red-400 rounded-xl opacity-20 animate-ping" />
      
      {/* Button content */}
      <div className="relative flex items-center gap-2">
        {icon && (
          <MedicalIcon.Emergency 
            size={currentSize.iconSize} 
            className="animate-pulse" 
          />
        )}
        <span className={`${currentSize.textClass} font-bold`}>
          {buttonText}
        </span>
      </div>
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-400 to-red-600 opacity-0 hover:opacity-20 transition-opacity duration-300" />
    </button>
  );
};

// Quick emergency button variants
export const QuickEmergencyButton = (props) => (
  <EmergencyButton 
    size="sm" 
    variant="outline" 
    buttonText="911" 
    showConfirmation={false}
    className="fixed bottom-4 right-4 z-50"
    {...props}
  />
);

export const FullEmergencyButton = (props) => (
  <EmergencyButton 
    size="xl" 
    variant="primary" 
    buttonText="Emergency Alert"
    pulse={true}
    {...props}
  />
);

export const SubtleEmergencyButton = (props) => (
  <EmergencyButton 
    size="md" 
    variant="ghost" 
    buttonText="Emergency"
    pulse={false}
    {...props}
  />
);

export default EmergencyButton; 