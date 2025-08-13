import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/globals.css'
import App from './App.jsx'

// Performance optimization: preload critical resources
const preloadCriticalResources = () => {
  // Preload key fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
  fontLink.as = 'style';
  fontLink.onload = function() { this.onload = null; this.rel = 'stylesheet'; };
  document.head.appendChild(fontLink);


};

// Initialize performance monitoring
const initPerformanceMonitoring = () => {
  // Web Vitals tracking (optional, for production analytics)
  if ('performance' in window && 'PerformanceObserver' in window) {
    // Track Largest Contentful Paint
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        }
      });
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // Track Cumulative Layout Shift
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
          console.log('CLS:', entry.value);
        }
      });
    }).observe({ entryTypes: ['layout-shift'] });
  }
};

// Initialize application
const initApp = () => {
  const container = document.getElementById('root');
  
  if (!container) {
    throw new Error('Root element not found');
  }

  const root = createRoot(container);

  root.render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
};

// Run initialization
document.addEventListener('DOMContentLoaded', () => {
  preloadCriticalResources();
  
  if (process.env.NODE_ENV === 'development') {
    initPerformanceMonitoring();
  }
  
  initApp();
});
