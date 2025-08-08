import React from 'react';
import { Shield, Heart, User, ClipboardList } from 'lucide-react';

const FormCard = ({ children, title, subtitle, icon = 'shield' }) => {
  const getIcon = () => {
    switch (icon) {
      case 'heart':
        return <Heart className="w-8 h-8 text-healthcare-600" />;
      case 'user':
        return <User className="w-8 h-8 text-primary-600" />;
      case 'clipboard':
        return <ClipboardList className="w-8 h-8 text-primary-600" />;
      default:
        return <Shield className="w-8 h-8 text-primary-600" />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Particles Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-healthcare-50/50 via-primary-50/50 to-healthcare-100/50"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary-300/30 rounded-full animate-pulse-slow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Form Card */}
      <div className="auth-card smoky-cursor relative z-10 max-w-2xl w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-primary-100 to-healthcare-100 rounded-full">
              {getIcon()}
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          {subtitle && (
            <p className="text-gray-600 text-sm">{subtitle}</p>
          )}
        </div>

        {/* Content */}
        <div className="space-y-6">
          {children}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
            <Shield className="w-4 h-4" />
            <span>HIPAA Compliant • 256-bit SSL Encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCard; 