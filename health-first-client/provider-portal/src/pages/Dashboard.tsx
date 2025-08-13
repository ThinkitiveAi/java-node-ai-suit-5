import React, { useEffect, useState } from 'react';
import ProvidersList from '../components/ProvidersList';
import AddProviderModal from '../components/AddProviderModal';
import { dummyProviders } from '../utils/providersData';
import Button from '../ui/Button';
import { motion } from 'framer-motion';
import { 
	Users, 
	Calendar, 
	FileText, 
	AlertTriangle, 
	Plus,
	TrendingUp,
	Activity,
	Clock
} from 'lucide-react';

const fadeUp = {
	initial: { opacity: 0, y: 16 },
	animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const stagger = {
	animate: { transition: { staggerChildren: 0.08 } },
};

const cardReveal = {
	initial: { opacity: 0, scale: 0.96, y: 20 },
	whileInView: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
	viewport: { once: true, amount: 0.3 },
};

const Dashboard: React.FC<{ onLogout?: () => void; isGuestMode?: boolean }> = ({ onLogout, isGuestMode = false }) => {
	const [providers, setProviders] = useState<any[]>([]);
	const [showAddModal, setShowAddModal] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);

	useEffect(() => {
		setProviders(dummyProviders);
	}, []);

	const handleAddProvider = (newProvider: any) => {
		setProviders(prev => [newProvider, ...prev]);
		setShowSuccess(true);
		setTimeout(() => setShowSuccess(false), 2500);
	};

	const stats = [
		{ 
			label: 'Active Providers', 
			value: providers.length, 
			icon: Users, 
			color: 'from-blue-500 to-blue-600',
			trend: '+12%'
		},
		{ 
			label: "Today's Appointments", 
			value: 23, 
			icon: Calendar, 
			color: 'from-emerald-500 to-emerald-600',
			trend: '+8%'
		},
		{ 
			label: 'Pending Reports', 
			value: 8, 
			icon: FileText, 
			color: 'from-amber-500 to-amber-600',
			trend: '-3%'
		},
		{ 
			label: 'Emergency Cases', 
			value: 12, 
			icon: AlertTriangle, 
			color: 'from-red-500 to-red-600',
			trend: '+5%'
		},
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/30 relative overflow-hidden">
			{/* Animated background elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<motion.div 
					className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-teal-200/20 rounded-full blur-3xl"
					animate={{ y: [0, -10, 0] }}
					transition={{
						duration: 4,
						repeat: Infinity,
						ease: "easeInOut"
					}}
				/>
				<motion.div 
					className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-teal-200/15 to-blue-200/15 rounded-full blur-3xl"
					animate={{
						y: [0, 15, 0],
						x: [0, 10, 0],
					}}
					transition={{
						duration: 6,
						repeat: Infinity,
						ease: "easeInOut",
						delay: 1
					}}
				/>
				<motion.div 
					className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-2xl"
					animate={{
						scale: [1, 1.2, 1],
						opacity: [0.3, 0.6, 0.3],
					}}
					transition={{
						duration: 4,
						repeat: Infinity,
						ease: "easeInOut",
						delay: 2
					}}
				/>
			</div>

			{/* Header */}
			<header className="relative overflow-hidden">
				<div className="mx-auto max-w-7xl px-4 py-8">
					<motion.div variants={stagger} initial="initial" animate="animate">
						<motion.div variants={fadeUp} className="mb-6">
							<motion.h1 
								className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-2"
								whileHover={{ scale: 1.02 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<span className="bg-gradient-to-r from-[#0F76FF] via-[#14B8A6] to-[#0F76FF] bg-clip-text text-transparent animate-gradient">
									Healthcare Provider Dashboard
								</span>
							</motion.h1>
							<motion.p 
								variants={fadeUp} 
								className="text-lg text-slate-600 max-w-2xl"
							>
								Manage patients, appointments, and medical records with ease
							</motion.p>
						</motion.div>

						<motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-6">
							<Button 
								onClick={() => setShowAddModal(true)} 
								variant="contained" 
								color="primary"
								startIcon={<Plus className="h-4 w-4" />}
								className="shimmer-effect"
							>
								Add Clinician
							</Button>
							<Button variant="outlined" startIcon={<Users className="h-4 w-4" />}>
								View Patients
							</Button>
							<Button variant="outlined" startIcon={<Calendar className="h-4 w-4" />}>
								Manage Appointments
							</Button>
							<Button variant="outlined" startIcon={<FileText className="h-4 w-4" />}>
								Medical Records
							</Button>
						</motion.div>

						{showSuccess && (
							<motion.div 
								initial={{ opacity: 0, y: -20, scale: 0.95 }} 
								animate={{ opacity: 1, y: 0, scale: 1 }} 
								exit={{ opacity: 0, y: -20, scale: 0.95 }}
								className="glass rounded-xl p-4 text-emerald-700 border border-emerald-200/50 backdrop-blur-md"
							>
								<div className="flex items-center space-x-2">
									<motion.div
										animate={{ scale: [1, 1.2, 1] }}
										transition={{ duration: 0.5 }}
										className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center"
									>
										<motion.div 
											className="w-2 h-2 bg-white rounded-full"
											animate={{ opacity: [0.5, 1, 0.5] }}
											transition={{ duration: 1, repeat: Infinity }}
										/>
									</motion.div>
									<span className="font-medium">Provider added successfully!</span>
								</div>
							</motion.div>
						)}
					</motion.div>
				</div>
			</header>

			{/* Enhanced Stats with animations */}
			<section className="mx-auto max-w-7xl px-4 pb-8">
				<motion.div 
					className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
					variants={stagger}
					initial="initial"
					whileInView="animate"
					viewport={{ once: true, amount: 0.3 }}
				>
					{stats.map((stat, i) => {
						const IconComponent = stat.icon;
						return (
							<motion.div 
								key={stat.label} 
								variants={cardReveal} 
								whileHover={{ 
									y: -8, 
									scale: 1.02,
									transition: { type: "spring", stiffness: 300, damping: 25 }
								}}
								className="glass rounded-2xl p-6 shadow-xl backdrop-blur-md border border-white/50 relative overflow-hidden group cursor-pointer"
							>
								{/* Animated background gradient */}
								<motion.div 
									className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
									layoutId={`stat-bg-${i}`}
								/>
								
								<div className="relative z-10">
									<div className="flex items-center justify-between mb-4">
										<motion.div 
											className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}
											whileHover={{ rotate: 5, scale: 1.1 }}
											transition={{ type: "spring", stiffness: 300 }}
										>
											<IconComponent className="h-6 w-6 text-white" />
										</motion.div>
										<motion.div 
											className={`text-xs font-semibold px-2 py-1 rounded-full ${
												stat.trend.startsWith('+') 
													? 'bg-emerald-100 text-emerald-700' 
													: 'bg-red-100 text-red-700'
											}`}
											whileHover={{ scale: 1.05 }}
										>
											<TrendingUp className="inline h-3 w-3 mr-1" />
											{stat.trend}
										</motion.div>
									</div>
									
									<motion.div 
										className="text-3xl font-bold text-slate-900 mb-1"
										initial={{ scale: 0.5, opacity: 0 }}
										whileInView={{ scale: 1, opacity: 1 }}
										transition={{ delay: i * 0.1 + 0.3, type: "spring", stiffness: 200 }}
										viewport={{ once: true }}
									>
										{stat.value}
									</motion.div>
									<div className="text-sm font-medium text-slate-600">{stat.label}</div>
								</div>
								
								{/* Shimmer effect on hover */}
								<motion.div
									className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
									animate={{ x: ['-100%', '100%'] }}
									transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
								/>
							</motion.div>
						);
					})}
				</motion.div>
			</section>

			{/* Quick Actions */}
			<section className="mx-auto max-w-7xl px-4 pb-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="glass rounded-2xl p-6 backdrop-blur-md border border-white/50"
				>
					<h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
						<Activity className="h-5 w-5 mr-2 text-blue-600" />
						Quick Actions
					</h3>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						{[
							{ name: 'Schedule Appointment', icon: Calendar },
							{ name: 'Patient Check-in', icon: Users },
							{ name: 'View Reports', icon: FileText },
							{ name: 'Emergency Protocol', icon: AlertTriangle },
						].map((action, i) => {
							const ActionIcon = action.icon;
							return (
								<motion.button
									key={action.name}
									whileHover={{ scale: 1.05, y: -2 }}
									whileTap={{ scale: 0.98 }}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: i * 0.1 }}
									className="p-4 rounded-xl bg-white/70 hover:bg-white/90 border border-slate-200/50 text-center group transition-all duration-200"
								>
									<ActionIcon className="h-6 w-6 mx-auto mb-2 text-slate-600 group-hover:text-blue-600 transition-colors" />
									<span className="text-sm font-medium text-slate-700">{action.name}</span>
								</motion.button>
							);
						})}
					</div>
				</motion.div>
			</section>

			{/* Providers Directory */}
			<section className="mx-auto max-w-7xl px-4 pb-12">
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true, amount: 0.2 }}
					className="mb-6"
				>
					<h2 className="text-2xl font-semibold text-slate-900 mb-2 flex items-center">
						<Users className="h-6 w-6 mr-2 text-blue-600" />
						Provider Directory
					</h2>
					<p className="text-slate-600">Manage your healthcare team</p>
				</motion.div>
				
				<motion.div 
					initial={{ opacity: 0, y: 20 }} 
					whileInView={{ opacity: 1, y: 0 }} 
					viewport={{ once: true, amount: 0.2 }}
					transition={{ duration: 0.6 }}
				>
					<ProvidersList
						providers={providers}
						onViewProvider={(p: any) => console.log('View', p)}
						onEditProvider={(p: any) => console.log('Edit', p)}
						onDeleteProvider={(p: any) => setProviders(prev => prev.filter(x => x.id !== p.id))}
					/>
				</motion.div>
			</section>

			<AddProviderModal 
				open={showAddModal} 
				onClose={() => setShowAddModal(false)} 
				onAddProvider={handleAddProvider} 
			/>
		</div>
	);
};

export default Dashboard; 