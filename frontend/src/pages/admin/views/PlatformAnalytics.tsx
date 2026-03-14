import { useMusicStore } from "@/stores/useMusicStore";
import { AdminView } from "../AdminPage";

interface PlatformAnalyticsProps {
	onNavigate?: (view: AdminView) => void;
}

const PlatformAnalytics = ({ onNavigate }: PlatformAnalyticsProps) => {
	const { stats } = useMusicStore();

	return (
		<div className="animate-in fade-in duration-500 max-w-7xl mx-auto w-full mb-12">
			{/* Header Section */}
			<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
				<div>
					<nav className="flex gap-2 text-xs text-slate-500 mb-2 uppercase tracking-widest font-bold">
						<span className="hover:text-primary transition-colors cursor-pointer" onClick={() => onNavigate?.("dashboard")}>Dashboard</span>
						<span>/</span>
						<span className="text-primary/70">Analytics</span>
					</nav>
					<h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 text-slate-900 dark:text-white">Analytics Overview</h1>
					<p className="text-slate-500 dark:text-slate-400 max-w-xl text-lg">Real-time performance metrics across the platform ecosystem.</p>
				</div>
				<div className="flex gap-3 shrink-0">
					<button className="px-5 py-3 rounded-2xl bg-background-light dark:bg-white/5 border border-primary/10 flex items-center gap-2 hover:bg-primary/10 transition-colors text-sm font-bold text-slate-700 dark:text-slate-300">
						<span className="material-symbols-outlined text-lg text-primary">calendar_today</span>
						Last 30 Days
					</button>
					<button className="px-6 py-3 rounded-2xl bg-primary text-white font-bold hover:opacity-90 transition-opacity text-sm shadow-lg shadow-primary/20">
						Export Report
					</button>
				</div>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				<div className="bg-primary/5 dark:bg-background-dark/60 border border-primary/10 p-6 rounded-3xl flex flex-col justify-between group hover:border-primary/30 transition-all shadow-sm">
					<div>
						<div className="flex justify-between items-start mb-4">
							<span className="text-slate-500 text-[11px] font-black uppercase tracking-wider">Total Users</span>
						</div>
						<div className="text-4xl font-black text-slate-900 dark:text-white">{stats.totalUsers.toLocaleString()}</div>
					</div>
				</div>

				<div className="bg-purple-500/5 dark:bg-background-dark/60 border border-purple-500/10 p-6 rounded-3xl flex flex-col justify-between group hover:border-purple-500/30 transition-all shadow-sm">
					<div>
						<div className="flex justify-between items-start mb-4">
							<span className="text-slate-500 text-[11px] font-black uppercase tracking-wider">Active Songs</span>
						</div>
						<div className="text-4xl font-black text-slate-900 dark:text-white">{stats.totalSongs.toLocaleString()}</div>
					</div>
				</div>

				<div className="bg-rose-500/5 dark:bg-background-dark/60 border border-rose-500/10 p-6 rounded-3xl flex flex-col justify-between group hover:border-rose-500/30 transition-all shadow-sm">
					<div>
						<div className="flex justify-between items-start mb-4">
							<span className="text-slate-500 text-[11px] font-black uppercase tracking-wider">Total Albums</span>
						</div>
						<div className="text-4xl font-black text-slate-900 dark:text-white">{stats.totalAlbums.toLocaleString()}</div>
					</div>
				</div>

				<div className="bg-amber-500/5 dark:bg-background-dark/60 border border-amber-500/10 p-6 rounded-3xl flex flex-col justify-between group hover:border-amber-500/30 transition-all shadow-sm">
					<div>
						<div className="flex justify-between items-start mb-4">
							<span className="text-slate-500 text-[11px] font-black uppercase tracking-wider">Artists</span>
						</div>
						<div className="text-4xl font-black text-slate-900 dark:text-white">{stats.totalArtists.toLocaleString()}</div>
					</div>
				</div>
			</div>

			{/* Main Visualizations */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
				{/* Catalog Overview */}
				<div className="bg-background-dark/50 border border-primary/10 rounded-3xl p-8 backdrop-blur-md">
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
						<div>
							<h3 className="text-2xl font-black text-slate-900 dark:text-white">Catalog Overview</h3>
							<p className="text-slate-500 text-sm font-medium mt-1">Songs and albums on platform</p>
						</div>
					</div>
					
					<div className="space-y-6">
						<div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl">
							<div className="flex items-center gap-3">
								<span className="material-symbols-outlined text-primary">music_note</span>
								<span className="font-bold text-slate-700 dark:text-slate-300">Total Songs</span>
							</div>
							<span className="text-2xl font-black text-primary">{stats.totalSongs.toLocaleString()}</span>
						</div>
						<div className="flex items-center justify-between p-4 bg-purple-500/5 rounded-xl">
							<div className="flex items-center gap-3">
								<span className="material-symbols-outlined text-purple-500">album</span>
								<span className="font-bold text-slate-700 dark:text-slate-300">Total Albums</span>
							</div>
							<span className="text-2xl font-black text-purple-500">{stats.totalAlbums.toLocaleString()}</span>
						</div>
						<div className="flex items-center justify-between p-4 bg-rose-500/5 rounded-xl">
							<div className="flex items-center gap-3">
								<span className="material-symbols-outlined text-rose-500">person</span>
								<span className="font-bold text-slate-700 dark:text-slate-300">Total Artists</span>
							</div>
							<span className="text-2xl font-black text-rose-500">{stats.totalArtists.toLocaleString()}</span>
						</div>
					</div>
				</div>

				{/* User Stats */}
				<div className="bg-background-dark/50 border border-primary/10 rounded-3xl p-8 backdrop-blur-md">
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
						<div>
							<h3 className="text-2xl font-black text-slate-900 dark:text-white">User Statistics</h3>
							<p className="text-slate-500 text-sm font-medium mt-1">Platform user metrics</p>
						</div>
					</div>
					
					<div className="space-y-6">
						<div className="flex items-center justify-between p-4 bg-amber-500/5 rounded-xl">
							<div className="flex items-center gap-3">
								<span className="material-symbols-outlined text-amber-500">group</span>
								<span className="font-bold text-slate-700 dark:text-slate-300">Total Users</span>
							</div>
							<span className="text-2xl font-black text-amber-500">{stats.totalUsers.toLocaleString()}</span>
						</div>
						<div className="flex items-center justify-between p-4 bg-emerald-500/5 rounded-xl">
							<div className="flex items-center gap-3">
								<span className="material-symbols-outlined text-emerald-500">library_music</span>
								<span className="font-bold text-slate-700 dark:text-slate-300">Total Catalog Size</span>
							</div>
							<span className="text-2xl font-black text-emerald-500">{(stats.totalSongs + stats.totalAlbums).toLocaleString()}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlatformAnalytics;
