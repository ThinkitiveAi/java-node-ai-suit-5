import React from 'react';
// lightswind exports gradient-button under our vite alias
// Using native HTML button instead of lightswind gradient-button
import { motion } from 'framer-motion';

/**
 * Button wrapper to replace MUI Button while preserving common props.
 * Supported MUI-like props: variant (contained|outlined|text), color, size, startIcon, endIcon, disabled, fullWidth.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'contained' | 'outlined' | 'text';
	color?: 'primary' | 'success' | 'danger' | 'default';
	size?: 'small' | 'medium' | 'large';
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	fullWidth?: boolean;
}

const sizeMap: Record<NonNullable<ButtonProps['size']>, 'sm' | 'md' | 'lg'> = {
	small: 'sm',
	medium: 'md',
	large: 'lg',
};

const variantToGradientVariant: Record<NonNullable<ButtonProps['variant']>, 'default' | 'outline' | 'ghost'> = {
	contained: 'default',
	outlined: 'outline',
	text: 'ghost',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ variant = 'contained', color = 'primary', size = 'medium', startIcon, endIcon, disabled, fullWidth, className = '', children, ...rest }, ref) => {
		const gradientColors = color === 'primary'
			? ['#0F76FF', '#14B8A6', '#0F76FF']
			: color === 'success'
			? ['#10B981', '#14B8A6', '#10B981']
			: color === 'danger'
			? ['#EF4444', '#F59E0B', '#EF4444']
			: ['#64748B', '#94A3B8', '#64748B'];

		return (
			<motion.div
				whileHover={{ scale: 1.02, y: -1 }}
				whileTap={{ scale: 0.98 }}
				transition={{ type: "spring", stiffness: 400, damping: 25 }}
				className={fullWidth ? 'w-full' : 'inline-block'}
			>
				<button
					ref={ref}
					className={`
						inline-flex items-center justify-center gap-2 
						min-h-[44px] px-4 py-2 
						font-medium
						border-0 rounded-lg 
						transition-all duration-200 ease-in-out
						shadow-lg hover:shadow-xl
						relative overflow-hidden
						${variant === 'contained' ? 'text-white' : ''}
						${variant === 'outlined' ? 'bg-transparent border-2 text-gray-700' : ''}
						${variant === 'text' ? 'bg-transparent shadow-none hover:bg-gray-100 text-gray-700' : ''}
						${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
						${fullWidth ? 'w-full' : ''} 
						${className}
					`}
					style={{
						background: variant === 'contained' 
							? `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]}, ${gradientColors[2]})`
							: variant === 'outlined'
							? 'transparent'
							: 'transparent',
						borderColor: variant === 'outlined' ? gradientColors[0] : 'transparent',
					}}
					disabled={disabled}
					{...rest}
				>
					{/* Animated shimmer effect */}
					{!disabled && variant === 'contained' && (
						<motion.div
							className="absolute inset-0 opacity-0 hover:opacity-100"
							initial={{ x: '-100%' }}
							whileHover={{ x: '100%' }}
							transition={{ duration: 0.6, ease: "easeInOut" }}
							style={{
								background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
							}}
						/>
					)}
					
					{startIcon && (
						<motion.span 
							aria-hidden 
							className="inline-flex"
							initial={{ opacity: 0, x: -4 }} 
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.2 }}
						>
							{startIcon}
						</motion.span>
					)}
					
					<motion.span
						initial={{ opacity: 0.8 }}
						animate={{ opacity: 1 }}
						className="relative z-10"
					>
						{children}
					</motion.span>
					
					{endIcon && (
						<motion.span 
							aria-hidden 
							className="inline-flex"
							initial={{ opacity: 0, x: 4 }} 
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.2 }}
						>
							{endIcon}
						</motion.span>
					)}
				</button>
			</motion.div>
		);
	}
);

Button.displayName = 'Button';

export default Button;