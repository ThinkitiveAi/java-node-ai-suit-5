import React, { createContext, useContext, useEffect } from 'react'
import healthcareTheme, { cssVariables } from '../theme/healthcareTheme'

// Create theme context
const HealthcareThemeContext = createContext({
  theme: healthcareTheme,
  cssVariables: cssVariables
})

// Custom hook to use the healthcare theme
export const useHealthcareTheme = () => {
  const context = useContext(HealthcareThemeContext)
  if (!context) {
    throw new Error('useHealthcareTheme must be used within a HealthcareThemeProvider')
  }
  return context
}

// Healthcare Theme Provider Component
const HealthcareThemeProvider = ({ children, customTheme = {} }) => {
  // Merge custom theme with default healthcare theme
  const mergedTheme = {
    ...healthcareTheme,
    ...customTheme,
    colors: {
      ...healthcareTheme.colors,
      ...customTheme.colors
    }
  }

  // Apply CSS custom properties to the document root
  useEffect(() => {
    const root = document.documentElement
    
    // Apply all CSS variables
    Object.entries(cssVariables).forEach(([property, value]) => {
      root.style.setProperty(property, value)
    })

    // Apply theme-based CSS classes to body
    document.body.classList.add('healthcare-theme')
    
    // Set meta theme color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', mergedTheme.colors.primary)
    } else {
      const meta = document.createElement('meta')
      meta.name = 'theme-color'
      meta.content = mergedTheme.colors.primary
      document.head.appendChild(meta)
    }

    // Cleanup function
    return () => {
      document.body.classList.remove('healthcare-theme')
    }
  }, [mergedTheme])

  // Apply accessibility settings
  useEffect(() => {
    // High contrast mode detection and application
    const mediaQuery = window.matchMedia('(prefers-contrast: high)')
    
    const handleContrastChange = (e) => {
      if (e.matches) {
        document.body.classList.add('high-contrast')
      } else {
        document.body.classList.remove('high-contrast')
      }
    }

    // Initial check
    handleContrastChange(mediaQuery)
    
    // Listen for changes
    mediaQuery.addListener(handleContrastChange)

    // Reduced motion detection
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    
    const handleMotionChange = (e) => {
      if (e.matches) {
        document.body.classList.add('reduced-motion')
      } else {
        document.body.classList.remove('reduced-motion')
      }
    }

    // Initial check
    handleMotionChange(reducedMotionQuery)
    
    // Listen for changes
    reducedMotionQuery.addListener(handleMotionChange)

    // Cleanup
    return () => {
      mediaQuery.removeListener(handleContrastChange)
      reducedMotionQuery.removeListener(handleMotionChange)
      document.body.classList.remove('high-contrast', 'reduced-motion')
    }
  }, [])

  // Theme context value
  const themeContextValue = {
    theme: mergedTheme,
    cssVariables: cssVariables,
    
    // Utility functions
    getColor: (colorPath) => {
      const keys = colorPath.split('.')
      let value = mergedTheme.colors
      
      for (const key of keys) {
        value = value?.[key]
        if (value === undefined) break
      }
      
      return value || '#000000'
    },
    
    getSpacing: (size) => {
      return mergedTheme.spacing[size] || size
    },
    
    getFontFamily: (type) => {
      return mergedTheme.fonts[type] || mergedTheme.fonts.body
    },
    
    // Component variant helpers
    getButtonVariant: (variant) => {
      return mergedTheme.componentVariants?.button?.[variant] || ''
    },
    
    getCardVariant: (variant) => {
      return mergedTheme.componentVariants?.card?.[variant] || ''
    },
    
    getStatusVariant: (variant) => {
      return mergedTheme.componentVariants?.status?.[variant] || ''
    },
    
    // Accessibility helpers
    isHighContrast: () => {
      return document.body.classList.contains('high-contrast')
    },
    
    isReducedMotion: () => {
      return document.body.classList.contains('reduced-motion')
    },
    
    // Medical-specific helpers
    getVitalColor: (vital, value, normalRange) => {
      if (!normalRange || value === null || value === undefined) {
        return mergedTheme.colors.status.pending
      }
      
      const numValue = typeof value === 'string' ? parseFloat(value) : value
      
      if (isNaN(numValue)) {
        return mergedTheme.colors.status.pending
      }
      
      if (numValue < normalRange[0] || numValue > normalRange[1]) {
        return mergedTheme.colors.status.critical
      }
      
      return mergedTheme.colors.status.normal
    },
    
    getStatusColor: (status) => {
      const statusColors = {
        normal: mergedTheme.colors.status.normal,
        warning: mergedTheme.colors.status.warning,
        critical: mergedTheme.colors.status.critical,
        pending: mergedTheme.colors.status.pending,
        emergency: mergedTheme.colors.emergency
      }
      
      return statusColors[status] || statusColors.normal
    },
    
    // Emergency state helpers
    triggerEmergencyMode: () => {
      document.body.classList.add('emergency-mode')
      
      // Flash the screen with emergency color
      const overlay = document.createElement('div')
      overlay.className = 'fixed inset-0 bg-healthcare-emergency opacity-20 pointer-events-none z-50 animate-emergency-pulse'
      document.body.appendChild(overlay)
      
      // Remove after 3 seconds
      setTimeout(() => {
        document.body.removeChild(overlay)
        document.body.classList.remove('emergency-mode')
      }, 3000)
    }
  }

  return (
    <HealthcareThemeContext.Provider value={themeContextValue}>
      <div className="healthcare-app-wrapper min-h-screen bg-healthcare-background">
        {children}
      </div>
    </HealthcareThemeContext.Provider>
  )
}

// Higher-order component for theme injection
export const withHealthcareTheme = (Component) => {
  return function ThemedComponent(props) {
    return (
      <HealthcareThemeProvider>
        <Component {...props} />
      </HealthcareThemeProvider>
    )
  }
}

// Component for accessing theme values in class components
export const HealthcareThemeConsumer = HealthcareThemeContext.Consumer

export default HealthcareThemeProvider 