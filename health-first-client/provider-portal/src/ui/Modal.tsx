import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export interface ModalProps {
	open: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
	size?: 'sm' | 'md' | 'lg' | 'xl';
	showCloseButton?: boolean;
	className?: string;
}

const sizeClasses = {
	sm: 'max-w-sm',
	md: 'max-w-md',
	lg: 'max-w-lg',
	xl: 'max-w-xl'
};

export const Modal: React.FC<ModalProps> = ({
	open,
	onClose,
	title,
	children,
	size = 'md',
	showCloseButton = true,
	className = ''
}) => {
	React.useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		if (open) {
			document.addEventListener('keydown', handleEscape);
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.body.style.overflow = 'unset';
		};
	}, [open, onClose]);

	return (
		<AnimatePresence>
			{open && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="absolute inset-0 bg-black/50 backdrop-blur-sm"
						onClick={onClose}
					/>

					{/* Modal */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 20 }}
						transition={{ 
							type: "spring", 
							stiffness: 300, 
							damping: 25,
							duration: 0.3 
						}}
						className={`
							relative w-full ${sizeClasses[size]} 
							bg-white rounded-2xl shadow-2xl 
							backdrop-blur-xl border border-white/50
							overflow-hidden
							${className}
						`}
						onClick={(e) => e.stopPropagation()}
					>
						{/* Glass morphism overlay */}
						<div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/40 pointer-events-none" />
						
						{/* Header */}
						{(title || showCloseButton) && (
							<motion.div 
								className="relative z-10 flex items-center justify-between p-6 border-b border-slate-200/50"
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.1 }}
							>
								{title && (
									<h2 className="text-xl font-semibold text-slate-900">
										{title}
									</h2>
								)}
								{showCloseButton && (
									<motion.button
										whileHover={{ scale: 1.1, rotate: 90 }}
										whileTap={{ scale: 0.9 }}
										onClick={onClose}
										className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
									>
										<X className="h-5 w-5" />
									</motion.button>
								)}
							</motion.div>
						)}

						{/* Content */}
						<motion.div 
							className="relative z-10 p-6"
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.15 }}
						>
							{children}
						</motion.div>

						{/* Animated border */}
						<motion.div
							className="absolute inset-0 rounded-2xl"
							animate={{
								background: [
									'conic-gradient(from 0deg, transparent, rgba(15, 118, 255, 0.1), transparent)',
									'conic-gradient(from 180deg, transparent, rgba(20, 184, 166, 0.1), transparent)',
									'conic-gradient(from 360deg, transparent, rgba(15, 118, 255, 0.1), transparent)',
								]
							}}
							transition={{
								duration: 3,
								repeat: Infinity,
								ease: "linear"
							}}
							style={{ padding: '1px', borderRadius: '16px' }}
						/>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
};

export default Modal; 