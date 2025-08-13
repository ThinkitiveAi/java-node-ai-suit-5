import React, { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

// Try to import from lightswind, fallback to a regular button if not available
let LSButton: any;
try {
	LSButton = require('lightswind/dist/components/ui/button.js').Button;
} catch (error) {
	LSButton = 'button';
}

export type ButtonVariant = 'text' | 'outlined' | 'contained' | 'primary' | 'secondary' | 'ghost';
export type ButtonColor = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	color?: ButtonColor;
	size?: ButtonSize;
	fullWidth?: boolean;
	disabled?: boolean;
	startIcon?: ReactNode;
	endIcon?: ReactNode;
	children?: ReactNode;
	animate?: boolean;
	ripple?: boolean;
	magnetic?: boolean;
}

/**
 * UI Button wrapper.
 * Prop-compatibility shim for MUI's Button so call sites do not need rewriting.
 * - variant maps to Lightswind variants (contained->primary, outlined->outline, text->ghost)
 * - color maps to theme tokens; unsupported colors fall back to primary
 * - forwards ref and DOM props
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
	{
		variant = 'contained',
		color = 'primary',
		size = 'medium',
		fullWidth = false,
		disabled,
		startIcon,
		endIcon,
		children,
		className,
		animate = true,
		ripple = false,
		magnetic = false,
		...rest
	},
	ref
) {
	const lsVariant = (() => {
		switch (variant) {
			case 'contained':
				return 'default';
			case 'outlined':
				return 'outline';
			case 'text':
				return 'ghost';
			default:
				return 'default';
		}
	})();

	const sizeClasses = size === 'small' ? 'px-3 py-2 text-sm' : size === 'large' ? 'px-6 py-4 text-lg' : 'px-4 py-2.5';
	const widthClass = fullWidth ? 'w-full' : '';

	const colorClass = (() => {
		switch (color) {
			case 'primary':
				return lsVariant === 'outline' || lsVariant === 'ghost' 
					? 'text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300' 
					: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl';
			case 'success':
				return lsVariant === 'outline' || lsVariant === 'ghost'
					? 'text-green-600 border-green-200 hover:bg-green-50 hover:border-green-300'
					: 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl';
			case 'error':
				return lsVariant === 'outline' || lsVariant === 'ghost'
					? 'text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300'
					: 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl';
			case 'secondary':
				return lsVariant === 'outline' || lsVariant === 'ghost'
					? 'text-teal-600 border-teal-200 hover:bg-teal-50 hover:border-teal-300'
					: 'bg-gradient-to-r from-teal-600 to-teal-700 text-white hover:from-teal-700 hover:to-teal-800 shadow-lg hover:shadow-xl';
			case 'warning':
				return lsVariant === 'outline' || lsVariant === 'ghost'
					? 'text-yellow-600 border-yellow-200 hover:bg-yellow-50 hover:border-yellow-300'
					: 'bg-gradient-to-r from-yellow-600 to-yellow-700 text-white hover:from-yellow-700 hover:to-yellow-800 shadow-lg hover:shadow-xl';
			case 'info':
				return lsVariant === 'outline' || lsVariant === 'ghost'
					? 'text-purple-600 border-purple-200 hover:bg-purple-50 hover:border-purple-300'
					: 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 shadow-lg hover:shadow-xl';
			case 'inherit':
				return '';
			default:
				return 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl';
		}
	})();

	// Animation classes
	const animationClasses: string[] = [];
	if (animate) animationClasses.push('btn-animate');
	if (ripple) animationClasses.push('btn-ripple');
	if (magnetic) animationClasses.push('btn-magnetic');

	const ButtonComponent = LSButton || 'button';

	return (
		<ButtonComponent
			ref={ref}
			variant={LSButton ? lsVariant : undefined}
			disabled={disabled}
			className={[
				'rounded-xl min-h-[44px] inline-flex items-center justify-center gap-2 font-semibold',
				'transition-all duration-300 ease-out transform-gpu',
				'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
				'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
				sizeClasses,
				widthClass,
				colorClass,
				...animationClasses,
				className || ''
			].join(' ')}
			{...rest}
		>
			{startIcon ? <span aria-hidden className="pointer-events-none flex-shrink-0">{startIcon}</span> : null}
			<span className="flex-1 text-center">{children}</span>
			{endIcon ? <span aria-hidden className="pointer-events-none flex-shrink-0">{endIcon}</span> : null}
		</ButtonComponent>
	);
});

export default Button; 