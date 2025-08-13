export default {
  colors: {
    primary: '#2A5C8D',
    secondary: '#4CAF50',
    emergency: '#E53E3E',
    background: '#F8F9FA',
    card: '#FFFFFF',
    accent: {
      teal: '#319795',
      blue: '#2A5C8D',
      green: '#4CAF50',
      amber: '#F59E0B',
      red: '#E53E3E'
    },
    status: {
      normal: '#4CAF50',
      warning: '#F59E0B', 
      critical: '#E53E3E',
      pending: '#F59E0B',
      stable: '#4CAF50'
    },
    text: {
      primary: '#1A202C',
      secondary: '#4A5568',
      muted: '#718096',
      inverse: '#FFFFFF'
    },
    border: {
      default: '#E2E8F0',
      muted: '#EDF2F7',
      accent: '#CBD5E0'
    }
  },
  fonts: {
    heading: 'Roboto, system-ui, sans-serif',
    body: 'Open Sans, system-ui, sans-serif',
    mono: 'JetBrains Mono, Monaco, Consolas, monospace'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem'
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    emergency: '0 0 0 1px #E53E3E, 0 0 0 3px rgba(229, 62, 62, 0.2)'
  },
  typography: {
    scale: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75'
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    }
  },
  animation: {
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    emergency: 'emergency-pulse 1s ease-in-out infinite',
    vitals: 'vitals-beat 1.2s ease-in-out infinite',
    fadeIn: 'fadeIn 0.6s ease-out',
    slideUp: 'slideUp 0.4s ease-out'
  }
} 