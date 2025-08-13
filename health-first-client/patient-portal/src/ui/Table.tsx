import React from 'react';
import {
	Table as LSTable,
	TableHeader as LSTableHeader,
	TableBody as LSTableBody,
	TableFooter as LSTableFooter,
	TableHead as LSTableHead,
	TableRow as LSTableRow,
	TableCell as LSTableCell,
	TableCaption as LSTableCaption,
} from 'lightswind/dist/components/ui/table.js';

export const Table = LSTable as unknown as React.FC<React.HTMLAttributes<HTMLTableElement>>;
export const TableHead = LSTableHead;
export const TableBody = LSTableBody;
export const TableFooter = LSTableFooter;
export const TableRow = LSTableRow;
export const TableCell = LSTableCell;
export const TableHeader = LSTableHeader;
export const TableCaption = LSTableCaption;

export default Table; 