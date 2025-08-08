import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Button = ({ 
  children, 
  onClick, 
  type = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  fullWidth = false,
  className = ''
}) => {
  const baseClasses = 'lightwind-button inline-flex items-center justify-center font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-medical-teal text-white hover:bg-medical-teal/90 focus:ring-medical-teal shadow-medical hover:shadow-medical-hover',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500 border border-gray-300',
    success: 'bg-medical-emerald text-white hover:bg-medical-emerald/90 focus:ring-medical-emerald',
    danger: 'bg-medical-rose text-white hover:bg-medical-rose/90 focus:ring-medical-rose',
    outline: 'bg-transparent text-medical-teal border-2 border-medical-teal hover:bg-medical-teal hover:text-white focus:ring-medical-teal'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;
  
  const isDisabled = disabled || loading;
  
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={buttonClasses}
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
    >
      {loading && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mr-2"
        >
          <Loader2 className="w-4 h-4 animate-spin" />
        </motion.div>
      )}
      
      {icon && !loading && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mr-2"
        >
          {icon}
        </motion.div>
      )}
      
      <motion.span
        initial={{ opacity: 1 }}
        animate={{ opacity: loading ? 0.7 : 1 }}
      >
        {children}
      </motion.span>
      
      {/* Smoke particle effect on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="smoke-trail" />
        </div>
      </motion.div>
    </motion.button>
  );
};

export default Button; 