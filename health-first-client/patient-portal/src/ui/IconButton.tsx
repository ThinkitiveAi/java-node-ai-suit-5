import React, { forwardRef } from 'react';
import { Button as LSButton } from 'lightswind/dist/components/ui/button.js';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error';
	ariaLabel?: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
	{ color = 'inherit', className, ariaLabel, children, ...rest }, ref
) {
	const colorClass = color === 'primary'
		? 'bg-primary text-white hover:opacity-95'
		: color === 'secondary'
		? 'bg-teal text-white hover:opacity-95'
		: color === 'success'
		? 'bg-success text-white hover:opacity-95'
		: color === 'error'
		? 'bg-danger text-white hover:opacity-95'
		: '';
	return (
		<LSButton
			ref={ref}
			variant={colorClass ? 'default' as any : 'ghost' as any}
			className={[
				'rounded-md min-h-[44px] inline-flex items-center justify-center p-2 h-10 w-10',
				colorClass,
				className || ''
			].join(' ')}
			aria-label={ariaLabel}
			{...rest}
		>
			<span aria-hidden className="pointer-events-none">{children}</span>
		</LSButton>
	);
});

export default IconButton; 