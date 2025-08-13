import { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Dashboard from './pages/Dashboard';
import ErrorBoundary from './components/ErrorBoundary';
import { AuroraBackground } from 'lightswind/dist/components/ui/aurora-background.js';
import { AnimatedBlobBackground } from 'lightswind/dist/components/ui/animated-blob-background.js';
import { HealthcareThemeProvider } from './components/HealthcareThemeProvider';
import { QuickEmergencyButton } from './components/healthcare/EmergencyButton';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [user, setUser] = useState(null);

  const handleViewTransition = (newView, userData = null) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentView(newView);
      if (userData) setUser(userData);
      setIsTransitioning(false);
    }, 400);
  };

  const handleLoginSuccess = (userData = { name: 'Jane Doe', email: 'patient@healthcare.com' }) => {
    handleViewTransition('dashboard', userData);
  };

  const handleRegistrationSuccess = () => {
    handleViewTransition('login');
  };

  const handleShowRegistration = () => {
    handleViewTransition('registration');
  };

  const handleBackToLogin = () => {
    handleViewTransition('login');
  };

  const handleLogout = () => {
    setUser(null);
    handleViewTransition('login');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'login':
        return (
          <LoginForm
            onLoginSuccess={handleLoginSuccess}
            onShowRegistration={handleShowRegistration}
          />
        );
      case 'registration':
        return (
          <RegistrationForm
            onRegistrationSuccess={handleRegistrationSuccess}
            onBackToLogin={handleBackToLogin}
          />
        );
      case 'dashboard':
        return <Dashboard onLogout={handleLogout} user={user} />;
      default:
        return (
          <LoginForm
            onLoginSuccess={handleLoginSuccess}
            onShowRegistration={handleShowRegistration}
          />
        );
    }
  };

  return (
    <ErrorBoundary>
      <HealthcareThemeProvider>
        <div className="relative min-h-screen overflow-hidden bg-healthcare-background">
          {/* Global Background for Dashboard */}
          {currentView === 'dashboard' && (
            <div className="absolute inset-0 animate-fade-in">
              <AuroraBackground className="w-full h-full" showRadialGradient>
                <AnimatedBlobBackground
                  className="absolute inset-0"
                  firstBlobColors={["#2A5C8D", "#4CAF50", "#319795", "#E53E3E"]}
                  secondBlobColors={["#F8F9FA", "#E6FFFA", "#F0FDF4", "#FEF2F2"]}
                  firstBlobOpacity={0.05}
                  secondBlobOpacity={0.03}
                  blurAmount="5vw"
                  firstBlobSpeed={30000}
                  secondBlobSpeed={35000}
                  interactive
                  interactiveIntensity={1}
                />
              </AuroraBackground>
            </div>
          )}

          {/* Main Content with Enhanced Transition */}
          <div 
            className={`relative z-10 transition-all duration-500 ease-out ${
              isTransitioning 
                ? 'opacity-0 scale-95 transform translate-y-4 blur-sm' 
                : 'opacity-100 scale-100 transform translate-y-0 blur-0'
            }`}
          >
            {renderCurrentView()}
          </div>

          {/* Enhanced Loading Overlay */}
          {isTransitioning && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-md animate-fade-in">
              <div className="flex items-center gap-4 bg-white/95 backdrop-blur-xl rounded-3xl px-8 py-6 shadow-2xl border border-white/60 animate-bounce-in hover-glow">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-healthcare-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-3 h-3 bg-healthcare-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-3 h-3 bg-healthcare-info rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="text-gray-700 font-semibold text-lg">Loading Healthcare Portal...</span>
              </div>
            </div>
          )}

          {/* Quick Emergency Button - Always visible */}
          <QuickEmergencyButton 
            onClick={() => {
              // Emergency action
              alert('Emergency services have been contacted.');
            }}
          />
        </div>
      </HealthcareThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
