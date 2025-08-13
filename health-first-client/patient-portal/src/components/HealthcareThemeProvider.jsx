import { createContext, useContext, useState, useEffect } from 'react';
import healthcareTheme from '../theme/healthcareTheme';

// Create theme context
const HealthcareThemeContext = createContext();

// Custom hook to use healthcare theme
export const useHealthcareTheme = () => {
  const context = useContext(HealthcareThemeContext);
  if (!context) {
    throw new Error('useHealthcareTheme must be used within a HealthcareThemeProvider');
  }
  return context;
};

// Theme provider component
export const HealthcareThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(healthcareTheme);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  
  // Initialize theme based on system preferences
  useEffect(() => {
    // Check for dark mode preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    
    // Check for high contrast preference
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
    setHighContrast(prefersHighContrast);
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReducedMotion(prefersReducedMotion);
    
    // Apply initial CSS custom properties
    applyThemeVariables(theme, isDarkMode, highContrast);
  }, []);
  
  // Apply theme variables to CSS
  const applyThemeVariables = (currentTheme, dark = false, contrast = false) => {
    const root = document.documentElement;
    
    // Apply color variables
    Object.entries(currentTheme.colors).forEach(([key, value]) => {
      if (typeof value === 'object') {
        Object.entries(value).forEach(([subKey, subValue]) => {
          root.style.setProperty(`--color-${key}-${subKey}`, subValue);
        });
      } else {
        root.style.setProperty(`--color-${key}`, value);
      }
    });
    
    // Apply typography variables
    Object.entries(currentTheme.fonts).forEach(([key, value]) => {
      root.style.setProperty(`--font-${key}`, value);
    });
    
    // Apply spacing variables
    Object.entries(currentTheme.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value);
    });
    
    // Apply border radius variables
    Object.entries(currentTheme.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--radius-${key}`, value);
    });
    
    // Apply shadow variables
    Object.entries(currentTheme.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });
    
    // Apply accessibility adjustments
    if (contrast) {
      root.style.setProperty('--color-border-default', '#000000');
      root.style.setProperty('--color-text-primary', '#000000');
    }
    
    if (dark) {
      // Apply dark mode overrides
      root.style.setProperty('--color-background', '#1a1a1a');
      root.style.setProperty('--color-card', '#2d2d2d');
      root.style.setProperty('--color-text-primary', '#ffffff');
      root.style.setProperty('--color-text-secondary', '#e5e5e5');
    }
  };
  
  // Update theme
  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    applyThemeVariables(newTheme, isDarkMode, highContrast);
  };
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    applyThemeVariables(theme, newDarkMode, highContrast);
  };
  
  // Toggle high contrast
  const toggleHighContrast = () => {
    const newHighContrast = !highContrast;
    setHighContrast(newHighContrast);
    applyThemeVariables(theme, isDarkMode, newHighContrast);
  };
  
  // Get theme-aware classes
  const getThemeClasses = (baseClasses = '', options = {}) => {
    let classes = baseClasses;
    
    if (options.variant) {
      switch (options.variant) {
        case 'primary':
          classes += ' bg-healthcare-primary text-white';
          break;
        case 'secondary':
          classes += ' bg-healthcare-secondary text-white';
          break;
        case 'emergency':
          classes += ' bg-healthcare-emergency text-white';
          break;
        case 'warning':
          classes += ' bg-healthcare-warning text-white';
          break;
        default:
          break;
      }
    }
    
    if (options.status) {
      switch (options.status) {
        case 'normal':
          classes += ' status-stable';
          break;
        case 'warning':
          classes += ' status-monitoring';
          break;
        case 'critical':
          classes += ' status-urgent';
          break;
        default:
          break;
      }
    }
    
    if (options.size) {
      switch (options.size) {
        case 'sm':
          classes += ' text-sm px-3 py-1.5';
          break;
        case 'md':
          classes += ' text-base px-4 py-2';
          break;
        case 'lg':
          classes += ' text-lg px-6 py-3';
          break;
        default:
          break;
      }
    }
    
    return classes.trim();
  };
  
  // Get status color
  const getStatusColor = (status) => {
    return theme.colors.status[status] || theme.colors.status.normal;
  };
  
  // Get accessibility attributes
  const getA11yProps = (options = {}) => {
    const props = {};
    
    if (options.role) {
      props.role = options.role;
    }
    
    if (options.ariaLabel) {
      props['aria-label'] = options.ariaLabel;
    }
    
    if (options.ariaDescribedBy) {
      props['aria-describedby'] = options.ariaDescribedBy;
    }
    
    if (options.tabIndex !== undefined) {
      props.tabIndex = options.tabIndex;
    }
    
    if (reducedMotion) {
      props.style = { ...props.style, animationDuration: '0s', transitionDuration: '0s' };
    }
    
    return props;
  };
  
  const value = {
    theme,
    isDarkMode,
    highContrast,
    reducedMotion,
    updateTheme,
    toggleDarkMode,
    toggleHighContrast,
    getThemeClasses,
    getStatusColor,
    getA11yProps,
    
    // Convenience methods
    colors: theme.colors,
    fonts: theme.fonts,
    spacing: theme.spacing,
    borderRadius: theme.borderRadius,
    shadows: theme.shadows,
    typography: theme.typography,
    animation: theme.animation
  };
  
  return (
    <HealthcareThemeContext.Provider value={value}>
      <div 
        className={`healthcare-app ${isDarkMode ? 'dark' : ''} ${highContrast ? 'high-contrast' : ''} ${reducedMotion ? 'reduced-motion' : ''}`}
        style={{
          fontFamily: theme.fonts.body,
          backgroundColor: 'var(--color-background)',
          color: 'var(--color-text-primary)',
          minHeight: '100vh'
        }}
      >
        {children}
      </div>
    </HealthcareThemeContext.Provider>
  );
};

// Component variants helper
export const createHealthcareComponent = (Component, defaultProps = {}) => {
  return ({ variant, status, size, ...props }) => {
    const { getThemeClasses, getA11yProps } = useHealthcareTheme();
    
    const themeClasses = getThemeClasses(props.className || '', { variant, status, size });
    const a11yProps = getA11yProps(props);
    
    return (
      <Component
        {...defaultProps}
        {...props}
        {...a11yProps}
        className={themeClasses}
      />
    );
  };
};

export default HealthcareThemeProvider; 