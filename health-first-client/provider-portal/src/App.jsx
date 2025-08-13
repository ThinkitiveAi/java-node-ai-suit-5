import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from './pages/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import MainLayout from './components/MainLayout';
import ErrorBoundary from './components/ErrorBoundary';
import HealthcareThemeProvider from './components/HealthcareThemeProvider';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuestMode, setIsGuestMode] = useState(false);
  const [currentView, setCurrentView] = useState('login');

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setIsGuestMode(false);
  };

  const handleGuestLogin = () => {
    setIsAuthenticated(true);
    setIsGuestMode(true);
  };

  const handleRegistrationSuccess = () => {
    setCurrentView('login');
  };

  const handleBackToLogin = () => {
    setCurrentView('login');
  };

  const handleShowRegistration = () => {
    setCurrentView('registration');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsGuestMode(false);
    setCurrentView('login');
  };

  const renderAuthContent = () => {
    switch (currentView) {
      case 'login':
        return (
          <LoginForm 
            onLoginSuccess={handleLoginSuccess}
            onBackToLogin={handleShowRegistration}
            onGuestLogin={handleGuestLogin}
          />
        );
      case 'registration':
        return (
          <RegistrationForm 
            onRegistrationSuccess={handleRegistrationSuccess}
            onBackToLogin={handleBackToLogin}
          />
        );
      default:
        return (
          <LoginForm 
            onLoginSuccess={handleLoginSuccess}
            onBackToLogin={handleShowRegistration}
            onGuestLogin={handleGuestLogin}
          />
        );
    }
  };

  const pageTransition = {
    initial: { opacity: 0, scale: 0.98, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.98, y: -20 },
    transition: { 
      duration: 0.4, 
      ease: [0.4, 0.0, 0.2, 1]
    }
  };

  return (
    <HealthcareThemeProvider>
      <ErrorBoundary>
        <div className="min-h-screen bg-gradient-to-br from-healthcare-background via-blue-50/50 to-healthcare-accent-mint/20 relative overflow-hidden">
          {/* Healthcare-themed animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              className="absolute top-0 left-0 w-full h-full opacity-20"
              animate={{
                background: [
                  'radial-gradient(circle at 20% 80%, rgba(42, 92, 141, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 20%, rgba(76, 175, 80, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 40% 40%, rgba(49, 151, 149, 0.3) 0%, transparent 50%)',
                ],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Healthcare pulse animation overlay */}
            <motion.div
              className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full opacity-10"
              animate={{
                scale: [1, 1.2, 1],
                background: [
                  'radial-gradient(circle, rgba(76, 175, 80, 0.4) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(42, 92, 141, 0.4) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(76, 175, 80, 0.4) 0%, transparent 70%)',
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Subtle medical cross pattern */}
            <div className="absolute inset-0 opacity-5">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <pattern id="medical-cross" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect width="20" height="20" fill="none"/>
                    <path d="M8 6h4v8h-4zM6 8h8v4h-8z" fill="currentColor" className="text-healthcare-primary"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#medical-cross)"/>
              </svg>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {isAuthenticated ? (
              <motion.div
                key="main-app"
                {...pageTransition}
                className="relative z-10"
              >
                <ErrorBoundary>
                  <MainLayout onLogout={handleLogout} isGuestMode={isGuestMode} />
                </ErrorBoundary>
              </motion.div>
            ) : (
              <motion.div
                key={`auth-${currentView}`}
                {...pageTransition}
                className="relative z-10"
              >
                <ErrorBoundary>
                  {renderAuthContent()}
                </ErrorBoundary>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Healthcare compliance footer */}
          <div className="fixed bottom-0 left-0 right-0 z-20 p-4 pointer-events-none">
            <div className="flex justify-center">
              <div className="text-xs text-healthcare-text-muted opacity-60 glass-healthcare px-3 py-1 rounded-full">
                🏥 HIPAA Compliant • Secure Healthcare Platform
              </div>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </HealthcareThemeProvider>
  );
}

export default App
