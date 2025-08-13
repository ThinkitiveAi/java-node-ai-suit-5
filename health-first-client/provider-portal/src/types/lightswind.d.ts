declare module 'lightswind/ui/*' {
	import { ComponentType, ReactNode } from 'react'
	
	// Base component props
	interface BaseComponentProps {
		className?: string
		children?: ReactNode
	}

	// Button components
	export const Button: ComponentType<BaseComponentProps & {
		variant?: 'default' | 'outline' | 'ghost'
		size?: 'sm' | 'md' | 'lg'
		disabled?: boolean
	}>
	
	export const GradientButton: ComponentType<BaseComponentProps & {
		variant?: 'default' | 'outline' | 'ghost'
		size?: 'sm' | 'md' | 'lg'
		gradientColors?: string[]
		disabled?: boolean
		onClick?: () => void
	}>

	// Input components
	export const Input: ComponentType<BaseComponentProps & {
		type?: string
		value?: string
		placeholder?: string
		disabled?: boolean
		onChange?: (e: Event) => void
		onFocus?: (e: Event) => void
		onBlur?: (e: Event) => void
	}>

	// Table components
	export const Table: ComponentType<BaseComponentProps>
	export const TableHeader: ComponentType<BaseComponentProps>
	export const TableBody: ComponentType<BaseComponentProps>
	export const TableRow: ComponentType<BaseComponentProps>
	export const TableCell: ComponentType<BaseComponentProps & {
		as?: 'th' | 'td'
	}>
	export const TableHead: ComponentType<BaseComponentProps>

	// Dialog components
	export const Dialog: ComponentType<BaseComponentProps & {
		open?: boolean
		onClose?: () => void
	}>
	export const DialogContent: ComponentType<BaseComponentProps>
	export const DialogHeader: ComponentType<BaseComponentProps>
	export const DialogTitle: ComponentType<BaseComponentProps>
	export const DialogDescription: ComponentType<BaseComponentProps>
	export const DialogFooter: ComponentType<BaseComponentProps>

	// Default export for each component
	const Component: ComponentType<any>
	export default Component
}

declare module 'lightswind/styles/*' {
	const styles: Record<string, string>
	export default styles
}

// Global styles augmentation
declare global {
	namespace React {
		interface CSSProperties {
			'--lightswind-primary'?: string
			'--lightswind-secondary'?: string
			'--lightswind-accent'?: string
		}
	}
} 