declare module 'lightswind/dist/components/ui/*.js' {
	const Component: any;
	export = Component;
}

declare module 'lightswind/dist/components/ui/button.js' {
	export const Button: any;
	export function buttonVariants(options?: any): string;
}

declare module 'lightswind/dist/components/ui/input.js' {
	export const Input: any;
}

declare module 'lightswind/dist/components/ui/label.js' {
	export const Label: any;
}

declare module 'lightswind/dist/components/ui/dialog.js' {
	export const Dialog: any;
	export const DialogTrigger: any;
	export const DialogContent: any;
	export const DialogHeader: any;
	export const DialogTitle: any;
	export const DialogDescription: any;
	export const DialogFooter: any;
}

declare module 'lightswind/dist/components/ui/table.js' {
	export const Table: any;
	export const TableHeader: any;
	export const TableBody: any;
	export const TableFooter: any;
	export const TableHead: any;
	export const TableRow: any;
	export const TableCell: any;
	export const TableCaption: any;
}

declare module 'lightswind/dist/components/ui/aurora-background.js' {
	export const AuroraBackground: any;
}

declare module 'lightswind/dist/components/ui/count-up.js' {
	export const CountUp: any;
}

declare module 'lightswind/dist/components/ui/scroll-reveal.js' {
	const ScrollReveal: any;
	export default ScrollReveal;
}

declare module 'lightswind/dist/components/ui/badge.js' {
	export const Badge: any;
	export const badgeVariants: any;
}

declare module 'lightswind/dist/components/ui/border-beam.js' {
	export const BorderBeam: any;
}

declare module 'lightswind/dist/components/ui/animated-blob-background.js' {
	export const AnimatedBlobBackground: any;
}

declare module 'lightswind/dist/components/ui/shiny-text.js' {
	export const ShinyText: any;
}

declare module 'lightswind/dist/components/ui/select.js' {
	export const Select: any;
	export const SelectTrigger: any;
	export const SelectValue: any;
	export const SelectContent: any;
	export const SelectItem: any;
	export const SelectGroup: any;
}

declare module 'lightswind/dist/components/ui/checkbox.js' {
	export const Checkbox: any;
}

declare module 'lightswind/dist/components/ui/alert.js' {
	export const Alert: any;
	export const AlertDescription: any;
	export const AlertTitle: any;
}

declare module 'lightswind/dist/components/ui/magic-loader.js' {
	const MagicLoader: any;
	export default MagicLoader;
} 