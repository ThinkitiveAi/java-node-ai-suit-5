import React, { useState } from 'react';
import PatientLogin from './components/PatientLogin';
import ProviderLogin from './components/ProviderLogin';
import PatientRegistration from './components/PatientRegistration';
import SmookyCursor from './components/SmookyCursor';
import LoginToggle from './components/LoginToggle';

function App() {
  const [activeView, setActiveView] = useState('patient');
  const [showRegistration, setShowRegistration] = useState(false);

  const renderContent = () => {
    if (showRegistration) {
      return <PatientRegistration />;
    }
    
    if (activeView === 'patient') {
      return <PatientLogin onShowRegistration={() => setShowRegistration(true)} />;
    } else {
      return <ProviderLogin />;
    }
  };

  return (
    <div className="App">
      <SmookyCursor />
      {!showRegistration && (
        <LoginToggle activeView={activeView} onToggle={setActiveView} />
      )}
      {renderContent()}
    </div>
  );
}

export default App;
