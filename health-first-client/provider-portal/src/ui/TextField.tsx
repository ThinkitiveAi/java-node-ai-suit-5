import React from 'react';
// Using native HTML input instead of lightswind input
import { motion, AnimatePresence } from 'framer-motion';

/**
 * TextField wrapper to replace MUI TextField while preserving common props.
 * Supported props: label, placeholder, helperText, error, required, fullWidth, size, type, value, onChange.
 */
export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
	label?: string;
	helperText?: React.ReactNode;
	error?: boolean;
	fullWidth?: boolean;
	size?: 'small' | 'medium';
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
	({ label, helperText, error, fullWidth, size = 'medium', required, className = '', id, ...rest }, ref) => {
		const inputId = id || React.useId();
		const describedById = helperText ? `${inputId}-helper` : undefined;
		const [isFocused, setIsFocused] = React.useState(false);
		
		return (
			<motion.div 
				className={`flex w-full flex-col gap-1 ${fullWidth ? 'w-full' : ''}`}
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
			>
				{label ? (
					<motion.label 
						htmlFor={inputId} 
						className={`text-sm font-medium transition-colors duration-200 ${
							error ? 'text-red-600' : isFocused ? 'text-blue-600' : 'text-slate-700'
						}`}
						animate={{ 
							scale: isFocused ? 1.02 : 1,
							y: isFocused ? -1 : 0 
						}}
						transition={{ type: "spring", stiffness: 300, damping: 25 }}
					>
						{label} {required ? <span aria-hidden className="text-red-600">*</span> : null}
					</motion.label>
				) : null}
				
				<div className="relative">
					<input
						ref={ref}
						id={inputId}
						aria-required={required}
						aria-invalid={error || undefined}
						aria-describedby={describedById}
						onFocus={(e) => {
							setIsFocused(true);
							rest.onFocus?.(e);
						}}
						onBlur={(e) => {
							setIsFocused(false);
							rest.onBlur?.(e);
						}}
						className={`
							${size === 'small' ? 'h-9 text-sm px-3' : 'h-11 text-base px-4'} 
							w-full
							border rounded-lg
							bg-white
							transition-all duration-200 ease-in-out
							${error 
								? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
								: 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
							}
							${className}
						`}
						style={{
							minHeight: size === 'small' ? '36px' : '44px',
							display: 'block',
							width: '100%',
							color: '#0f172a',
							backgroundColor: 'white',
						}}
						{...rest}
					/>
					
					{/* Animated focus indicator */}
					<AnimatePresence>
						{isFocused && (
							<motion.div
								className={`absolute inset-0 rounded-lg pointer-events-none ${
									error ? 'ring-2 ring-red-200' : 'ring-2 ring-blue-100'
								}`}
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
								transition={{ duration: 0.2 }}
							/>
						)}
					</AnimatePresence>
					
					{/* Shimmer effect on focus */}
					{isFocused && !error && (
						<motion.div
							className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							<motion.div
								className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/50 to-transparent"
								animate={{ x: ['-100%', '100%'] }}
								transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
							/>
						</motion.div>
					)}
				</div>
				
				{helperText ? (
					<AnimatePresence>
						<motion.p 
							id={describedById} 
							className={`text-xs ${error ? 'text-red-600' : 'text-slate-500'}`}
							initial={{ opacity: 0, y: -5 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -5 }}
							transition={{ duration: 0.2 }}
						>
							{helperText}
						</motion.p>
					</AnimatePresence>
				) : null}
			</motion.div>
		);
	}
);

TextField.displayName = 'TextField';

export default TextField; 