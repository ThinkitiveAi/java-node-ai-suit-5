import { createElement } from 'react';

// Typography hierarchy for healthcare applications
export const typeScale = {
  // Primary Headings - Critical Information
  h1: {
    fontSize: '2.25rem',
    fontWeight: '700',
    lineHeight: '1.25',
    fontFamily: 'Roboto, system-ui, sans-serif',
    letterSpacing: '-0.025em'
  },
  
  // Section Headings - Major Areas
  h2: {
    fontSize: '1.875rem',
    fontWeight: '600',
    lineHeight: '1.25',
    fontFamily: 'Roboto, system-ui, sans-serif',
    letterSpacing: '-0.025em'
  },
  
  // Subsection Headings - Categories
  h3: {
    fontSize: '1.5rem',
    fontWeight: '600',
    lineHeight: '1.375',
    fontFamily: 'Roboto, system-ui, sans-serif'
  },
  
  // Component Headings - Cards, Panels
  h4: {
    fontSize: '1.25rem',
    fontWeight: '600',
    lineHeight: '1.375',
    fontFamily: 'Roboto, system-ui, sans-serif'
  },
  
  // Field Labels - Forms, Data Points
  h5: {
    fontSize: '1.125rem',
    fontWeight: '500',
    lineHeight: '1.5',
    fontFamily: 'Roboto, system-ui, sans-serif'
  },
  
  // Small Labels - Status, Tags
  h6: {
    fontSize: '1rem',
    fontWeight: '500',
    lineHeight: '1.5',
    fontFamily: 'Roboto, system-ui, sans-serif'
  },
  
  // Body Text - Primary Content
  body: {
    fontSize: '1rem',
    fontWeight: '400',
    lineHeight: '1.5',
    fontFamily: 'Open Sans, system-ui, sans-serif'
  },
  
  // Large Body Text - Important Information
  bodyLarge: {
    fontSize: '1.125rem',
    fontWeight: '400',
    lineHeight: '1.5',
    fontFamily: 'Open Sans, system-ui, sans-serif'
  },
  
  // Small Body Text - Secondary Information
  bodySmall: {
    fontSize: '0.875rem',
    fontWeight: '400',
    lineHeight: '1.5',
    fontFamily: 'Open Sans, system-ui, sans-serif'
  },
  
  // Medical Data - Lab Values, Measurements
  data: {
    fontSize: '1rem',
    fontWeight: '500',
    lineHeight: '1.25',
    fontFamily: 'JetBrains Mono, Monaco, Consolas, monospace',
    letterSpacing: '0.025em'
  },
  
  // Large Medical Data - Primary Vitals
  dataLarge: {
    fontSize: '1.5rem',
    fontWeight: '600',
    lineHeight: '1.25',
    fontFamily: 'JetBrains Mono, Monaco, Consolas, monospace',
    letterSpacing: '0.025em'
  },
  
  // Caption Text - Timestamps, Notes
  caption: {
    fontSize: '0.75rem',
    fontWeight: '400',
    lineHeight: '1.5',
    fontFamily: 'Open Sans, system-ui, sans-serif',
    color: '#718096'
  },
  
  // Button Text - Interactive Elements
  button: {
    fontSize: '0.875rem',
    fontWeight: '500',
    lineHeight: '1.25',
    fontFamily: 'Roboto, system-ui, sans-serif',
    letterSpacing: '0.025em'
  },
  
  // Emergency Text - Critical Alerts
  emergency: {
    fontSize: '1.125rem',
    fontWeight: '700',
    lineHeight: '1.25',
    fontFamily: 'Roboto, system-ui, sans-serif',
    color: '#E53E3E',
    textTransform: 'uppercase',
    letterSpacing: '0.1em'
  }
};

// Typography component factory
export const createTypographyComponent = (variant, className = '', ...additionalProps) => {
  const styles = typeScale[variant] || typeScale.body;
  const baseClasses = `font-${styles.fontWeight} leading-${styles.lineHeight}`;
  const combinedClassName = `${baseClasses} ${className}`.trim();
  
  return (props) => {
    const elementTag = variant.startsWith('h') ? variant : 'p';
    return createElement(elementTag, {
      className: combinedClassName,
      style: {
        fontSize: styles.fontSize,
        fontFamily: styles.fontFamily,
        letterSpacing: styles.letterSpacing,
        color: styles.color,
        textTransform: styles.textTransform,
        ...props.style
      },
      ...additionalProps,
      ...props
    });
  };
};

// Pre-built typography components
export const Typography = {
  H1: createTypographyComponent('h1', 'text-gray-900'),
  H2: createTypographyComponent('h2', 'text-gray-800'),
  H3: createTypographyComponent('h3', 'text-gray-800'),
  H4: createTypographyComponent('h4', 'text-gray-700'),
  H5: createTypographyComponent('h5', 'text-gray-700'),
  H6: createTypographyComponent('h6', 'text-gray-600'),
  Body: createTypographyComponent('body', 'text-gray-700'),
  BodyLarge: createTypographyComponent('bodyLarge', 'text-gray-700'),
  BodySmall: createTypographyComponent('bodySmall', 'text-gray-600'),
  Data: createTypographyComponent('data', 'text-gray-800 font-mono'),
  DataLarge: createTypographyComponent('dataLarge', 'text-gray-900 font-mono'),
  Caption: createTypographyComponent('caption', 'text-gray-500'),
  Button: createTypographyComponent('button', 'text-current'),
  Emergency: createTypographyComponent('emergency', 'text-red-600')
};

// Utility function for dynamic typography
export const getTypographyClasses = (variant, additional = '') => {
  const styles = typeScale[variant] || typeScale.body;
  return `${additional} font-${styles.fontWeight} leading-${styles.lineHeight}`.trim();
};

// Responsive typography helpers
export const responsiveText = {
  xs: 'text-xs',
  sm: 'text-sm md:text-base',
  base: 'text-base md:text-lg',
  lg: 'text-lg md:text-xl',
  xl: 'text-xl md:text-2xl',
  '2xl': 'text-2xl md:text-3xl',
  '3xl': 'text-3xl md:text-4xl'
}; 