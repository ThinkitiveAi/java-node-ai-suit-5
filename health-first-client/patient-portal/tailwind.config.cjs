module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{js,jsx,ts,tsx}',
		'./node_modules/lightswind/dist/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			colors: {
				// Healthcare-specific colors
				healthcare: {
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
					}
				},
				primary: {
					DEFAULT: '#2A5C8D',
					50: '#eff6ff',
					100: '#dbeafe',
					200: '#bfdbfe',
					300: '#93c5fd',
					400: '#60a5fa',
					500: '#2A5C8D',
					600: '#2563eb',
					700: '#1d4ed8',
					800: '#1e40af',
					900: '#1e3a8a',
					foreground: '#FFFFFF'
				},
				teal: {
					DEFAULT: '#14B8A6',
					50: '#f0fdfa',
					100: '#ccfbf1',
					200: '#99f6e4',
					300: '#5eead4',
					400: '#2dd4bf',
					500: '#14b8a6',
					600: '#0d9488',
					700: '#0f766e',
					800: '#115e59',
					900: '#134e4a'
				},
				success: {
					DEFAULT: '#10B981',
					50: '#ecfdf5',
					100: '#d1fae5',
					200: '#a7f3d0',
					300: '#6ee7b7',
					400: '#34d399',
					500: '#10b981',
					600: '#059669',
					700: '#047857',
					800: '#065f46',
					900: '#064e3b'
				},
				danger: {
					DEFAULT: '#EF4444',
					50: '#fef2f2',
					100: '#fee2e2',
					200: '#fecaca',
					300: '#fca5a5',
					400: '#f87171',
					500: '#ef4444',
					600: '#dc2626',
					700: '#b91c1c',
					800: '#991b1b',
					900: '#7f1d1d'
				},
				warning: {
					DEFAULT: '#F59E0B',
					50: '#fffbeb',
					100: '#fef3c7',
					200: '#fde68a',
					300: '#fcd34d',
					400: '#fbbf24',
					500: '#f59e0b',
					600: '#d97706',
					700: '#b45309',
					800: '#92400e',
					900: '#78350f'
				},
				purple: {
					DEFAULT: '#8B5CF6',
					50: '#f5f3ff',
					100: '#ede9fe',
					200: '#ddd6fe',
					300: '#c4b5fd',
					400: '#a78bfa',
					500: '#8b5cf6',
					600: '#7c3aed',
					700: '#6d28d9',
					800: '#5b21b6',
					900: '#4c1d95'
				},
				neutral: {
					50: '#F8FAFC',
					100: '#F1F5F9',
					200: '#E2E8F0',
					300: '#CBD5E1',
					400: '#94A3B8',
					500: '#64748B',
					600: '#475569',
					700: '#334155',
					800: '#1E293B',
					900: '#0F172A'
				}
			},
			fontFamily: {
				sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
			},
			animation: {
				'spin-slow': 'spin 3s linear infinite',
				'pulse-gentle': 'pulseGentle 2s ease-in-out infinite',
				'fade-in': 'fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
				'slide-in-right': 'slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
				'bounce-gentle': 'bounce 1s ease-in-out infinite',
				'bounce-in': 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				'slide-up': 'slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
				'float': 'float 3s ease-in-out infinite',
				'glow-pulse': 'glowPulse 2s ease-in-out infinite',
				'heartbeat': 'heartbeat 1s ease-in-out infinite',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0', transform: 'translateY(30px) scale(0.9)' },
					'100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
				},
				slideInRight: {
					'0%': { opacity: '0', transform: 'translateX(100%) scale(0.9)' },
					'100%': { opacity: '1', transform: 'translateX(0) scale(1)' },
				},
				bounceIn: {
					'0%': { opacity: '0', transform: 'scale(0.3) translateY(-50px)' },
					'50%': { opacity: '1', transform: 'scale(1.05) translateY(-10px)' },
					'70%': { transform: 'scale(0.95) translateY(0)' },
					'100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
				},
				slideUp: {
					'0%': { opacity: '0', transform: 'translateY(100px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				glowPulse: {
					'0%, 100%': { boxShadow: '0 0 20px rgba(15, 118, 255, 0.4)' },
					'50%': { boxShadow: '0 0 40px rgba(15, 118, 255, 0.8), 0 0 60px rgba(15, 118, 255, 0.6)' },
				},
				heartbeat: {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.1)' },
				},
				pulseGentle: {
					'0%, 100%': { opacity: '1', transform: 'scale(1)' },
					'50%': { opacity: '0.8', transform: 'scale(1.05)' },
				},
			},
			backdropBlur: {
				xs: '2px',
			},
			borderRadius: {
				'4xl': '2rem',
			},
			boxShadow: {
				'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				'medium': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
				'hard': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
				'glow': '0 0 20px rgba(59, 130, 246, 0.15)',
				'glow-lg': '0 0 40px rgba(59, 130, 246, 0.2)',
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'128': '32rem',
			},
			minHeight: {
				'screen-75': '75vh',
				'screen-50': '50vh',
			},
			maxWidth: {
				'8xl': '88rem',
				'9xl': '96rem',
			},
			zIndex: {
				'60': '60',
				'70': '70',
				'80': '80',
				'90': '90',
				'100': '100',
			}
		}
	},
	plugins: [
		// Custom plugin for healthcare-specific utilities
		function({ addUtilities, theme }) {
			const newUtilities = {
				// Glass morphism effects
				'.glass-card': {
					background: 'rgba(255, 255, 255, 0.25)',
					backdropFilter: 'blur(10px)',
					border: '1px solid rgba(255, 255, 255, 0.18)',
				},
				'.glass-card-dark': {
					background: 'rgba(0, 0, 0, 0.25)',
					backdropFilter: 'blur(10px)',
					border: '1px solid rgba(255, 255, 255, 0.125)',
				},
				// Text shadows
				'.text-shadow': {
					textShadow: '0 2px 4px rgba(0,0,0,0.10)',
				},
				'.text-shadow-lg': {
					textShadow: '0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)',
				},
				// Scrollbar hiding
				'.scrollbar-hide': {
					'-ms-overflow-style': 'none',
					'scrollbar-width': 'none',
					'&::-webkit-scrollbar': {
						display: 'none',
					},
				},
				// Healthcare-specific utilities
				'.text-healthcare-primary': { color: '#2A5C8D' },
				'.text-healthcare-secondary': { color: '#4CAF50' },
				'.text-healthcare-emergency': { color: '#E53E3E' },
				'.text-healthcare-warning': { color: '#F59E0B' },
				'.text-healthcare-info': { color: '#319795' },
				'.bg-healthcare-primary': { backgroundColor: '#2A5C8D' },
				'.bg-healthcare-secondary': { backgroundColor: '#4CAF50' },
				'.bg-healthcare-emergency': { backgroundColor: '#E53E3E' },
				'.bg-healthcare-background': { backgroundColor: '#F8F9FA' },
				'.border-healthcare-primary': { borderColor: '#2A5C8D' },
				'.border-healthcare-secondary': { borderColor: '#4CAF50' },
				'.border-healthcare-emergency': { borderColor: '#E53E3E' },
				// Animation delay utilities
				'.stagger-1': {
					'animation-delay': '0.1s',
				},
				'.stagger-2': {
					'animation-delay': '0.2s',
				},
				'.stagger-3': {
					'animation-delay': '0.3s',
				},
				'.stagger-4': {
					'animation-delay': '0.4s',
				},
				'.stagger-5': {
					'animation-delay': '0.5s',
				},
			}
			addUtilities(newUtilities)
		}
	]
}; 