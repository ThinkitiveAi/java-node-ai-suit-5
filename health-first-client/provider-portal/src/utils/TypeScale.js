// Clinical Typography System
export const typeScale = {
  // Medical Headings
  heading: {
    h1: {
      fontSize: '2.25rem',
      fontWeight: '700',
      lineHeight: '1.25',
      fontFamily: 'Roboto, system-ui, sans-serif',
      color: '#1A202C'
    },
    h2: {
      fontSize: '1.875rem',
      fontWeight: '600',
      lineHeight: '1.25',
      fontFamily: 'Roboto, system-ui, sans-serif',
      color: '#1A202C'
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: '600',
      lineHeight: '1.25',
      fontFamily: 'Roboto, system-ui, sans-serif',
      color: '#2A5C8D'
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: '600',
      lineHeight: '1.5',
      fontFamily: 'Roboto, system-ui, sans-serif',
      color: '#2A5C8D'
    }
  },
  
  // Body Text
  body: {
    large: {
      fontSize: '1.125rem',
      fontWeight: '400',
      lineHeight: '1.75',
      fontFamily: 'Open Sans, system-ui, sans-serif',
      color: '#4A5568'
    },
    regular: {
      fontSize: '1rem',
      fontWeight: '400',
      lineHeight: '1.5',
      fontFamily: 'Open Sans, system-ui, sans-serif',
      color: '#4A5568'
    },
    small: {
      fontSize: '0.875rem',
      fontWeight: '400',
      lineHeight: '1.5',
      fontFamily: 'Open Sans, system-ui, sans-serif',
      color: '#718096'
    }
  },
  
  // Medical Data Points
  data: {
    vitals: {
      fontSize: '1.5rem',
      fontWeight: '700',
      lineHeight: '1.25',
      fontFamily: 'SFMono-Regular, Consolas, monospace',
      color: '#2A5C8D'
    },
    labValues: {
      fontSize: '1.125rem',
      fontWeight: '600',
      lineHeight: '1.25',
      fontFamily: 'SFMono-Regular, Consolas, monospace',
      color: '#1A202C'
    },
    metrics: {
      fontSize: '1rem',
      fontWeight: '500',
      lineHeight: '1.25',
      fontFamily: 'SFMono-Regular, Consolas, monospace',
      color: '#4A5568'
    }
  },
  
  // Status and Alerts
  status: {
    critical: {
      fontSize: '0.875rem',
      fontWeight: '600',
      lineHeight: '1.25',
      fontFamily: 'Open Sans, system-ui, sans-serif',
      color: '#E53E3E'
    },
    warning: {
      fontSize: '0.875rem',
      fontWeight: '600',
      lineHeight: '1.25',
      fontFamily: 'Open Sans, system-ui, sans-serif',
      color: '#F59E0B'
    },
    normal: {
      fontSize: '0.875rem',
      fontWeight: '500',
      lineHeight: '1.25',
      fontFamily: 'Open Sans, system-ui, sans-serif',
      color: '#4CAF50'
    }
  },
  
  // Labels and Captions
  label: {
    primary: {
      fontSize: '0.875rem',
      fontWeight: '600',
      lineHeight: '1.25',
      fontFamily: 'Open Sans, system-ui, sans-serif',
      color: '#1A202C'
    },
    secondary: {
      fontSize: '0.75rem',
      fontWeight: '500',
      lineHeight: '1.25',
      fontFamily: 'Open Sans, system-ui, sans-serif',
      color: '#718096'
    }
  }
}

// Utility function to apply typography styles
export const applyTypeStyle = (element, styleType, variant = 'regular') => {
  const styles = typeScale[styleType]?.[variant]
  if (!styles) return {}
  
  return {
    fontSize: styles.fontSize,
    fontWeight: styles.fontWeight,
    lineHeight: styles.lineHeight,
    fontFamily: styles.fontFamily,
    color: styles.color
  }
}

// Tailwind CSS classes for typography
export const typeClasses = {
  heading: {
    h1: 'text-4xl font-bold leading-tight font-heading text-gray-900',
    h2: 'text-3xl font-semibold leading-tight font-heading text-gray-900',
    h3: 'text-2xl font-semibold leading-tight font-heading text-healthcare-primary',
    h4: 'text-xl font-semibold leading-normal font-heading text-healthcare-primary'
  },
  body: {
    large: 'text-lg font-normal leading-relaxed font-body text-gray-600',
    regular: 'text-base font-normal leading-normal font-body text-gray-600',
    small: 'text-sm font-normal leading-normal font-body text-gray-500'
  },
  data: {
    vitals: 'text-2xl font-bold leading-tight font-mono text-healthcare-primary',
    labValues: 'text-lg font-semibold leading-tight font-mono text-gray-900',
    metrics: 'text-base font-medium leading-tight font-mono text-gray-600'
  },
  status: {
    critical: 'text-sm font-semibold leading-tight font-body text-red-600',
    warning: 'text-sm font-semibold leading-tight font-body text-yellow-600',
    normal: 'text-sm font-medium leading-tight font-body text-green-600'
  },
  label: {
    primary: 'text-sm font-semibold leading-tight font-body text-gray-900',
    secondary: 'text-xs font-medium leading-tight font-body text-gray-500'
  }
}

// Accessibility helpers
export const a11yTextStyles = {
  screenReaderOnly: 'sr-only',
  highContrast: 'contrast-more:text-black contrast-more:bg-white',
  focusVisible: 'focus-visible:outline-2 focus-visible:outline-healthcare-primary focus-visible:outline-offset-2'
} 