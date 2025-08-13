import React from 'react';
import {
	Dialog as LSDocument,
	DialogContent as LSDocumentContent,
	DialogHeader as LSDocumentHeader,
	DialogTitle as LSDocumentTitle,
	DialogDescription as LSDocumentDescription,
	DialogFooter as LSDocumentFooter,
} from 'lightswind/dist/components/ui/dialog.js';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
	open: boolean;
	onClose?: () => void;
	title?: React.ReactNode;
	description?: React.ReactNode;
	actions?: React.ReactNode;
}

/**
 * UI Modal wrapper providing a Dialog-like API compatible with MUI's Dialog usage.
 */
export function Modal({ open, onClose, title, description, actions, children, ...rest }: ModalProps) {
	return (
		<LSDocument open={open} onOpenChange={(v: boolean) => { if (!v) onClose?.(); }}>
			<LSDocumentContent {...rest}>
				{(title || description) ? (
					<LSDocumentHeader>
						{title ? <LSDocumentTitle>{title}</LSDocumentTitle> : null}
						{description ? <LSDocumentDescription>{description}</LSDocumentDescription> : null}
					</LSDocumentHeader>
				) : null}
				{children}
				{actions ? <LSDocumentFooter>{actions}</LSDocumentFooter> : null}
			</LSDocumentContent>
		</LSDocument>
	);
}

export default Modal; 