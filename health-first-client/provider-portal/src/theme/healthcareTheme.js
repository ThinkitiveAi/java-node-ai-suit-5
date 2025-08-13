export default {
  colors: {
    primary: '#2A5C8D',      // Serene blue
    secondary: '#4CAF50',    // Healing green
    emergency: '#E53E3E',    // Emergency red
    background: '#F8F9FA',   // Clean white background
    card: '#FFFFFF',         // Pure white for cards
    surface: '#F1F5F9',      // Light surface
    text: {
      primary: '#1A202C',    // Dark text
      secondary: '#4A5568',  // Medium gray
      muted: '#718096',      // Light gray
      inverse: '#FFFFFF'     // White text
    },
    status: {
      normal: '#4CAF50',     // Green for normal/healthy
      warning: '#F59E0B',    // Amber for warnings
      critical: '#E53E3E',   // Red for critical
      pending: '#8B5CF6',    // Purple for pending
      info: '#3B82F6'        // Blue for information
    },
    accent: {
      teal: '#319795',       // Professional teal
      mint: '#38B2AC',       // Calming mint
      lavender: '#9F7AEA',   // Soothing lavender
      coral: '#FF6B6B'       // Warm coral
    }
  },
  fonts: {
    heading: 'Roboto, system-ui, sans-serif',
    body: 'Open Sans, system-ui, sans-serif',
    mono: 'SFMono-Regular, Consolas, monospace'
  },
  fontSize: {
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
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    medical: '0 4px 12px rgba(42, 92, 141, 0.15)'
  },
  animations: {
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    bounce: 'bounce 1s infinite',
    fadeIn: 'fadeIn 0.3s ease-in-out',
    slideUp: 'slideUp 0.3s ease-out',
    emergency: 'emergencyPulse 1.5s ease-in-out infinite'
  }
}

// CSS Custom Properties mapping
export const cssVariables = {
  '--healthcare-primary': '#2A5C8D',
  '--healthcare-secondary': '#4CAF50',
  '--healthcare-emergency': '#E53E3E',
  '--healthcare-background': '#F8F9FA',
  '--healthcare-card': '#FFFFFF',
  '--healthcare-text-primary': '#1A202C',
  '--healthcare-text-secondary': '#4A5568',
  '--healthcare-status-normal': '#4CAF50',
  '--healthcare-status-critical': '#E53E3E',
  '--healthcare-status-warning': '#F59E0B',
  '--healthcare-accent-teal': '#319795'
}

// Lightswind variants configuration
export const componentVariants = {
  button: {
    healthcare: 'bg-healthcare-primary hover:bg-healthcare-primary/90 text-white font-medium rounded-lg transition-colors duration-200',
    emergency: 'bg-healthcare-emergency hover:bg-healthcare-emergency/90 text-white font-bold rounded-lg animate-pulse',
    secondary: 'bg-healthcare-secondary hover:bg-healthcare-secondary/90 text-white font-medium rounded-lg',
    outline: 'border-2 border-healthcare-primary text-healthcare-primary hover:bg-healthcare-primary hover:text-white'
  },
  card: {
    medical: 'bg-healthcare-card rounded-xl shadow-medical border border-slate-200/60 p-6',
    patient: 'bg-healthcare-card rounded-lg shadow-md border-l-4 border-healthcare-secondary p-4',
    emergency: 'bg-healthcare-card rounded-lg shadow-lg border-l-4 border-healthcare-emergency p-4',
    vitals: 'bg-gradient-to-r from-healthcare-card to-slate-50 rounded-lg shadow-sm p-4'
  },
  status: {
    normal: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800',
    critical: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800',
    warning: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800',
    pending: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800'
  }
} 