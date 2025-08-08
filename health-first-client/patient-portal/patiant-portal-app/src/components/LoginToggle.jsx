import React from 'react';
import { motion } from 'framer-motion';
import { User, Heart } from 'lucide-react';

const LoginToggle = ({ activeView, onToggle }) => {
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white/80 backdrop-blur-lg rounded-lg p-1 shadow-lg border border-white/20">
        <div className="flex space-x-1">
          <motion.button
            onClick={() => onToggle('patient')}
            className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-all duration-200 ${
              activeView === 'patient'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className="w-4 h-4" />
            <span>Patient</span>
          </motion.button>
          
          <motion.button
            onClick={() => onToggle('provider')}
            className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-all duration-200 ${
              activeView === 'provider'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <User className="w-4 h-4" />
            <span>Provider</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default LoginToggle; 