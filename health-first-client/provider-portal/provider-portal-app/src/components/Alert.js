import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertCircle, 
  CheckCircle, 
  Shield, 
  Wifi, 
  X,
  Info 
} from 'lucide-react';

const Alert = ({ 
  type = 'info',
  title,
  message,
  onClose,
  show = true,
  autoClose = false,
  duration = 5000
}) => {
  const [isVisible, setIsVisible] = React.useState(show);

  React.useEffect(() => {
    setIsVisible(show);
  }, [show]);

  React.useEffect(() => {
    if (autoClose && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, isVisible, duration, onClose]);

  const alertConfig = {
    info: {
      icon: Info,
      classes: 'lightwind-alert bg-blue-50 border-blue-400 text-blue-700',
      iconClasses: 'text-blue-400'
    },
    success: {
      icon: CheckCircle,
      classes: 'lightwind-alert bg-green-50 border-green-400 text-green-700',
      iconClasses: 'text-green-400'
    },
    warning: {
      icon: AlertCircle,
      classes: 'lightwind-alert bg-yellow-50 border-yellow-400 text-yellow-700',
      iconClasses: 'text-yellow-400'
    },
    error: {
      icon: Shield,
      classes: 'lightwind-alert bg-red-50 border-red-400 text-red-700',
      iconClasses: 'text-red-400'
    },
    network: {
      icon: Wifi,
      classes: 'lightwind-alert bg-yellow-50 border-yellow-400 text-yellow-700',
      iconClasses: 'text-yellow-400'
    }
  };

  const config = alertConfig[type];
  const IconComponent = config.icon;

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`${config.classes} relative overflow-hidden`}
        >
          {/* Background animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <IconComponent className={`w-5 h-5 ${config.iconClasses}`} />
            </div>
            
            <div className="ml-3 flex-1">
              {title && (
                <h3 className="text-sm font-medium mb-1">
                  {title}
                </h3>
              )}
              {message && (
                <p className="text-sm">
                  {message}
                </p>
              )}
            </div>
            
            {onClose && (
              <div className="ml-auto pl-3">
                <button
                  onClick={handleClose}
                  className="inline-flex text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          
          {/* Progress bar for auto-close */}
          {autoClose && (
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-current opacity-20"
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: duration / 1000, ease: 'linear' }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert; 