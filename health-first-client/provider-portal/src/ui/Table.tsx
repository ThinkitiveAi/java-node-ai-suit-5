import React from 'react';
import { motion } from 'framer-motion';

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
	striped?: boolean;
	hover?: boolean;
}

export interface TableHeadProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
	animated?: boolean;
}

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
	header?: boolean;
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
	({ striped = false, hover = true, className = '', children, ...rest }, ref) => {
		return (
			<div className="w-full overflow-hidden rounded-xl border border-slate-200/60 bg-white/80 backdrop-blur-sm shadow-lg">
				<div className="overflow-x-auto">
					<table
						ref={ref}
						className={`w-full table-auto ${className}`}
						{...rest}
					>
						{children}
					</table>
				</div>
			</div>
		);
	}
);

const TableHead = React.forwardRef<HTMLTableSectionElement, TableHeadProps>(
	({ className = '', children, ...rest }, ref) => {
		return (
			<thead
				ref={ref}
				className={`bg-gradient-to-r from-slate-50 to-slate-100/80 ${className}`}
				{...rest}
			>
				{children}
			</thead>
		);
	}
);

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
	({ className = '', children, ...rest }, ref) => {
		return (
			<tbody
				ref={ref}
				className={`divide-y divide-slate-200/60 ${className}`}
				{...rest}
			>
				{children}
			</tbody>
		);
	}
);

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
	({ animated = true, className = '', children, ...rest }, ref) => {
		if (animated) {
			// Separate motion-conflicting props from HTML props
			const { 
				onDrag, onDragEnd, onDragStart,
				onAnimationStart, onAnimationEnd, onAnimationIteration,
				...htmlProps 
			} = rest;
			
			return (
				<motion.tr
					ref={ref}
					whileHover={{ 
						backgroundColor: 'rgba(248, 250, 252, 0.8)',
						scale: 1.01,
						transition: { duration: 0.2 }
					}}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
					className={`transition-all duration-200 hover:shadow-md ${className}`}
					{...htmlProps}
				>
					{children}
				</motion.tr>
			);
		}

		return (
			<tr
				ref={ref}
				className={`transition-all duration-200 hover:bg-slate-50/80 hover:shadow-md ${className}`}
				{...rest}
			>
				{children}
			</tr>
		);
	}
);

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
	({ header = false, className = '', children, ...rest }, ref) => {
		const baseClasses = 'px-6 py-4 text-left';
		const headerClasses = 'font-semibold text-slate-900 bg-gradient-to-r from-slate-50 to-slate-100/80 border-b border-slate-200/60';
		const cellClasses = 'text-slate-700 border-b border-slate-100/60';

		const Component = header ? 'th' : 'td';

		return (
			<Component
				ref={ref as any}
				className={`
					${baseClasses} 
					${header ? headerClasses : cellClasses} 
					${className}
				`}
				{...rest}
			>
				{header ? (
					<motion.div
						initial={{ opacity: 0, y: -5 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
					>
						{children}
					</motion.div>
				) : (
					children
				)}
			</Component>
		);
	}
);

Table.displayName = 'Table';
TableHead.displayName = 'TableHead';
TableBody.displayName = 'TableBody';
TableRow.displayName = 'TableRow';
TableCell.displayName = 'TableCell';

// Export all components
export { Table, TableHead, TableHead as TableHeader, TableBody, TableRow, TableCell };
export default Table; 