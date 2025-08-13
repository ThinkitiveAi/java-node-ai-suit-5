import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

export interface IconButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
	"aria-label": string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(({ className = '', children, ...rest }, ref) => {
	return (
		<motion.button
			ref={ref}
			whileTap={{ scale: 0.95 }}
			whileHover={{ scale: 1.05 }}
			className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${className}`}
			{...(rest as any)}
		>
			{children}
		</motion.button>
	);
});

IconButton.displayName = 'IconButton';

export default IconButton; 