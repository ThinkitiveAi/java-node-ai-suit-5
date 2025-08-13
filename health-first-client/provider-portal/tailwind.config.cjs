module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		extend: {
			colors: {
				// Legacy colors (maintain compatibility)
				primary: '#0F76FF',
				teal: '#14B8A6',
				success: '#10B981',
				danger: '#EF4444',
				background: '#F8FAFC',
				foreground: '#0F172A',
				
				// Healthcare Color Palette
				'healthcare-primary': '#2A5C8D',
				'healthcare-secondary': '#4CAF50',
				'healthcare-emergency': '#E53E3E',
				'healthcare-background': '#F8F9FA',
				'healthcare-card': '#FFFFFF',
				'healthcare-surface': '#F1F5F9',
				'healthcare-text-primary': '#1A202C',
				'healthcare-text-secondary': '#4A5568',
				'healthcare-text-muted': '#718096',
				'healthcare-text-inverse': '#FFFFFF',
				
				// Healthcare Status Colors
				'healthcare-status-normal': '#4CAF50',
				'healthcare-status-warning': '#F59E0B',
				'healthcare-status-critical': '#E53E3E',
				'healthcare-status-pending': '#8B5CF6',
				'healthcare-status-info': '#3B82F6',
				
				// Healthcare Accent Colors
				'healthcare-accent-teal': '#319795',
				'healthcare-accent-mint': '#38B2AC',
				'healthcare-accent-lavender': '#9F7AEA',
				'healthcare-accent-coral': '#FF6B6B',
			},
			fontFamily: {
				// Healthcare Typography
				'heading': ['Roboto', 'system-ui', 'sans-serif'],
				'body': ['Open Sans', 'system-ui', 'sans-serif'],
				'mono': ['SFMono-Regular', 'Consolas', 'Monaco', 'Liberation Mono', 'Lucida Console', 'monospace'],
				
				// Legacy font (maintain compatibility)
				sans: ['Inter', 'system-ui', 'sans-serif'],
			},
			fontSize: {
				// Healthcare Typography Scale
				'healthcare-xs': ['0.75rem', { lineHeight: '1.25' }],
				'healthcare-sm': ['0.875rem', { lineHeight: '1.5' }],
				'healthcare-base': ['1rem', { lineHeight: '1.5' }],
				'healthcare-lg': ['1.125rem', { lineHeight: '1.75' }],
				'healthcare-xl': ['1.25rem', { lineHeight: '1.5' }],
				'healthcare-2xl': ['1.5rem', { lineHeight: '1.25' }],
				'healthcare-3xl': ['1.875rem', { lineHeight: '1.25' }],
				'healthcare-4xl': ['2.25rem', { lineHeight: '1.25' }],
			},
			spacing: {
				// Healthcare spacing scale
				'healthcare-xs': '0.25rem',
				'healthcare-sm': '0.5rem',
				'healthcare-md': '1rem',
				'healthcare-lg': '1.5rem',
				'healthcare-xl': '2rem',
				'healthcare-2xl': '3rem',
				'healthcare-3xl': '4rem',
			},
			borderRadius: {
				md: '8px',
				lg: '12px',
				xl: '16px',
				
				// Healthcare specific radii
				'healthcare-sm': '0.25rem',
				'healthcare-md': '0.5rem',
				'healthcare-lg': '0.75rem',
				'healthcare-xl': '1rem',
			},
			boxShadow: {
				// Healthcare shadows
				'healthcare-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
				'healthcare-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
				'healthcare-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
				'healthcare-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
				'medical': '0 4px 12px rgba(42, 92, 141, 0.15)',
				'emergency': '0 4px 12px rgba(229, 62, 62, 0.25)',
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-in-out',
				'slide-up': 'slideUp 0.3s ease-out',
				'scale-in': 'scaleIn 0.2s ease-out',
				'shimmer': 'shimmer 2s infinite',
				'emergency-pulse': 'emergencyPulse 1.5s ease-in-out infinite',
				'vital-pulse': 'vitalPulse 2s ease-in-out infinite',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				slideUp: {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				scaleIn: {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
				shimmer: {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' },
				},
				emergencyPulse: {
					'0%, 100%': { 
						boxShadow: '0 0 0 0 rgba(229, 62, 62, 0.7)',
						transform: 'scale(1)'
					},
					'50%': { 
						boxShadow: '0 0 0 10px rgba(229, 62, 62, 0)',
						transform: 'scale(1.05)'
					}
				},
				vitalPulse: {
					'0%, 100%': { 
						boxShadow: '0 0 0 0 rgba(76, 175, 80, 0.7)' 
					},
					'50%': { 
						boxShadow: '0 0 0 8px rgba(76, 175, 80, 0)' 
					}
				}
			},
		},
	},
	safelist: [
		'glass',
		'glass-dark',
		'animate-float',
		'animate-pulse-glow',
		'animate-gradient',
		'shimmer-effect',
		'animate-emergency-pulse',
		'animate-vital-pulse',

		// Dynamic color classes
		'text-primary',
		'text-teal',
		'text-success',
		'text-danger',
		'bg-primary',
		'bg-teal',
		'bg-success',
		'bg-danger',
		'border-primary',
		'border-teal',
		'border-success',
		'border-danger',
		
		// Healthcare color classes
		'text-healthcare-primary',
		'text-healthcare-secondary',
		'text-healthcare-emergency',
		'bg-healthcare-primary',
		'bg-healthcare-secondary',
		'bg-healthcare-emergency',
		'border-healthcare-primary',
		'border-healthcare-secondary',
		'border-healthcare-emergency',
		
		// Healthcare status classes
		'text-healthcare-status-normal',
		'text-healthcare-status-warning',
		'text-healthcare-status-critical',
		'text-healthcare-status-pending',
		'bg-healthcare-status-normal',
		'bg-healthcare-status-warning',
		'bg-healthcare-status-critical',
		'bg-healthcare-status-pending',
		
		// Font families
		'font-heading',
		'font-body',
		'font-mono',
		
		// Healthcare component variants
		'shadow-medical',
		'shadow-emergency',
		'rounded-healthcare-lg',
		'rounded-healthcare-xl',
	],
	plugins: [
		function({ addUtilities, theme }) {
			const newUtilities = {
				// Healthcare component utilities
				'.btn-healthcare': {
					backgroundColor: theme('colors.healthcare-primary'),
					color: theme('colors.healthcare-text-inverse'),
					padding: theme('spacing.3') + ' ' + theme('spacing.6'),
					borderRadius: theme('borderRadius.healthcare-lg'),
					fontWeight: theme('fontWeight.medium'),
					transition: 'all 0.2s ease-in-out',
					'&:hover': {
						backgroundColor: theme('colors.healthcare-primary') + 'E6', // 90% opacity
						transform: 'translateY(-1px)',
					}
				},
				'.btn-emergency': {
					backgroundColor: theme('colors.healthcare-emergency'),
					color: theme('colors.healthcare-text-inverse'),
					padding: theme('spacing.3') + ' ' + theme('spacing.6'),
					borderRadius: theme('borderRadius.healthcare-lg'),
					fontWeight: theme('fontWeight.bold'),
					animation: 'emergencyPulse 1.5s ease-in-out infinite',
					'&:hover': {
						backgroundColor: theme('colors.red.700'),
					}
				},
				'.card-medical': {
					backgroundColor: theme('colors.healthcare-card'),
					borderRadius: theme('borderRadius.healthcare-xl'),
					boxShadow: theme('boxShadow.medical'),
					border: '1px solid ' + theme('colors.slate.200') + '99', // 60% opacity
					padding: theme('spacing.6'),
				},
				'.card-patient': {
					backgroundColor: theme('colors.healthcare-card'),
					borderRadius: theme('borderRadius.healthcare-lg'),
					boxShadow: theme('boxShadow.healthcare-md'),
					borderLeft: '4px solid ' + theme('colors.healthcare-secondary'),
					padding: theme('spacing.4'),
				},
				'.card-emergency': {
					backgroundColor: theme('colors.healthcare-card'),
					borderRadius: theme('borderRadius.healthcare-lg'),
					boxShadow: theme('boxShadow.emergency'),
					borderLeft: '4px solid ' + theme('colors.healthcare-emergency'),
					padding: theme('spacing.4'),
				},
				'.text-data-vitals': {
					fontSize: theme('fontSize.healthcare-2xl')[0],
					lineHeight: theme('fontSize.healthcare-2xl')[1].lineHeight,
					fontFamily: theme('fontFamily.mono'),
					fontWeight: theme('fontWeight.bold'),
					color: theme('colors.healthcare-primary'),
				},
				'.text-data-labs': {
					fontSize: theme('fontSize.healthcare-lg')[0],
					lineHeight: theme('fontSize.healthcare-lg')[1].lineHeight,
					fontFamily: theme('fontFamily.mono'),
					fontWeight: theme('fontWeight.semibold'),
					color: theme('colors.healthcare-text-primary'),
				}
			}
			addUtilities(newUtilities)
		}
	],
}; 