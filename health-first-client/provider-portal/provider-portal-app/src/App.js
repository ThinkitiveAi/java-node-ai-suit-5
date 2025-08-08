import React, { useState } from "react";
import "./App.css";
import ProviderLogin from "./components/ProviderLogin";
import ProviderRegistration from "./components/ProviderRegistration";

function App() {
  const [currentView, setCurrentView] = useState('login'); // 'login' or 'registration'

  return (
    <div className="App">
      {currentView === 'login' ? (
        <div>
          <ProviderLogin />
          <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000
          }}>
            <button
              onClick={() => setCurrentView('registration')}
              style={{
                padding: '12px 20px',
                backgroundColor: '#0f766e',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Switch to Registration
            </button>
          </div>
        </div>
      ) : (
        <div>
          <ProviderRegistration />
          <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000
          }}>
            <button
              onClick={() => setCurrentView('login')}
              style={{
                padding: '12px 20px',
                backgroundColor: '#0f766e',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Switch to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
