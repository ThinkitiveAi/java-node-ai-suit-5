import React, { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { Input as LSInput } from 'lightswind/dist/components/ui/input.js';
import { Label as LSLabel } from 'lightswind/dist/components/ui/label.js';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
	label?: string;
	required?: boolean;
	helperText?: ReactNode;
	error?: boolean;
	fullWidth?: boolean;
	margin?: 'none' | 'dense' | 'normal';
	variant?: 'outlined' | 'filled' | 'standard';
	InputProps?: {
		startAdornment?: ReactNode;
		endAdornment?: ReactNode;
	};
}

/**
 * UI TextField wrapper compatible with common MUI TextField props.
 * - Supports label, helperText, error, required, start/end adornments
 * - Forwards ref and DOM props
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
	{
		label,
		required,
		helperText,
		error,
		fullWidth = true,
		margin,
		variant = 'outlined',
		InputProps,
		className,
		id,
		...rest
	},
	ref
) {
	const inputId = id || (label ? `${label.replace(/\s+/g, '-').toLowerCase()}-input` : undefined);
	const widthClass = fullWidth ? 'w-full' : 'w-auto';
	const borderClass = error ? 'border-danger focus-visible:ring-danger' : 'border-gray-300';
	const marginClass = margin === 'dense' ? 'my-1' : margin === 'normal' ? 'my-2' : '';

	return (
		<div className={[widthClass, marginClass].join(' ')}>
			{label ? (
				<LSLabel htmlFor={inputId} className="mb-1 block text-sm font-medium">
					{label}
					{required ? <span className="text-danger ml-1" aria-hidden>*</span> : null}
				</LSLabel>
			) : null}
			<div className={`relative flex items-center ${widthClass}`}>
				{InputProps?.startAdornment ? (
					<span className="absolute left-2 text-gray-500" aria-hidden>
						{InputProps.startAdornment}
					</span>
				) : null}
				<LSInput
					id={inputId}
					ref={ref}
					aria-invalid={error || undefined}
					aria-required={required || undefined}
					className={[
						className || '',
						borderClass,
						InputProps?.startAdornment ? 'pl-9' : '',
						InputProps?.endAdornment ? 'pr-9' : ''
					].join(' ')}
					{...rest}
				/>
				{InputProps?.endAdornment ? (
					<span className="absolute right-2 text-gray-500" aria-hidden>
						{InputProps.endAdornment}
					</span>
				) : null}
			</div>
			{helperText ? (
				<p className={`mt-1 text-xs ${error ? 'text-danger' : 'text-gray-500'}`}>{helperText}</p>
			) : null}
		</div>
	);
});

export default TextField; 