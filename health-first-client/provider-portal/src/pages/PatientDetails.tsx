import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '../ui/Table';

const Badge: React.FC<{ color?: 'green' | 'red' | 'blue' | 'gray'; children: React.ReactNode }> = ({ color = 'blue', children }) => (
	<span
		className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
			color === 'green' ? 'bg-emerald-100 text-emerald-800' : color === 'red' ? 'bg-red-100 text-red-800' : color === 'gray' ? 'bg-slate-100 text-slate-700' : 'bg-blue-100 text-blue-800'
		}`}
		aria-live="polite"
	>
		{children}
	</span>
);

const labs = [
	{ name: 'Hemoglobin', value: '13.8', unit: 'g/dL', status: 'Normal' },
	{ name: 'WBC', value: '11.2', unit: '10^9/L', status: 'High' },
	{ name: 'Platelets', value: '150', unit: '10^9/L', status: 'Low' },
];

const PatientDetails: React.FC = () => {
	return (
		<div className="mx-auto max-w-6xl px-4 py-8">
			<div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
				<h2 className="text-2xl font-bold text-slate-900">Patient Details</h2>
				<p className="mt-1 text-slate-600">John Appleseed • MRN 10293847</p>
				<div className="mt-4 flex flex-wrap gap-2">
					<Badge color="green">Stable</Badge>
					<Badge color="gray">Last visit: 2d ago</Badge>
				</div>
			</div>

			<div className="mt-8">
				<h3 className="mb-3 text-lg font-semibold text-slate-900">Recent Lab Results</h3>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell header>Test</TableCell>
							<TableCell header>Value</TableCell>
							<TableCell header>Status</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{labs.map((l, i) => (
							<TableRow key={i}>
								<TableCell className="font-medium">{l.name}</TableCell>
								<TableCell>
									<span className="text-xl font-semibold text-slate-900">{l.value}</span>
									<span className="ml-1 text-sm text-slate-500">{l.unit}</span>
								</TableCell>
								<TableCell>
									<Badge color={l.status === 'High' ? 'red' : l.status === 'Low' ? 'gray' : 'green'}>{l.status}</Badge>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default PatientDetails; 