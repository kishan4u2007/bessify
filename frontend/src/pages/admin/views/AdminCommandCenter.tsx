import { AdminView } from "../AdminPage";
import { useMusicStore } from "@/stores/useMusicStore";

interface AdminCommandCenterProps {
	onNavigate?: (view: AdminView) => void;
}

const AdminCommandCenter = ({ onNavigate }: AdminCommandCenterProps) => {
	const { stats } = useMusicStore();

	return (
		<div className="animate-in fade-in duration-500 max-w-7xl mx-auto w-full mb-12">
			{/* Header */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
				<div>
					<nav className="flex gap-2 text-xs text-slate-500 mb-2 uppercase tracking-widest font-bold">
						<span className="hover:text-primary transition-colors cursor-pointer" onClick={() => onNavigate?.("dashboard")}>Dashboard</span>
						<span>/</span>
						<span className="text-primary/70">Command Center</span>
					</nav>
					<h1 className="text-4xl md:text-5xl font-black tracking-tight flex items-center gap-4 text-slate-900 dark:text-white">
						Command Center
						<span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 font-black text-emerald-500 ring-2 ring-inset ring-emerald-500/30 text-xs shadow-[0_0_15px_rgba(16,185,129,0.3)] animate-pulse">LIVE</span>
					</h1>
					<p className="text-slate-500 dark:text-slate-400 mt-2 text-lg font-medium">Real-time node performance & user telemetry</p>
				</div>
				<div className="flex gap-3 shrink-0">
					<button className="bg-background-light dark:bg-white/5 text-primary border-2 border-primary/20 px-6 py-3 rounded-2xl font-black text-sm hover:bg-primary/10 transition-colors uppercase tracking-widest mt-4 sm:mt-0">Export Logic</button>
					<button className="bg-primary text-white px-6 py-3 rounded-2xl font-black text-sm hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all flex items-center gap-2 uppercase tracking-widest mt-4 sm:mt-0">
						<span className="material-symbols-outlined text-[20px]">bolt</span>
						System Sync
					</button>
				</div>
			</div>

			{/* Metrics Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
				<div className="bg-primary/5 dark:bg-background-dark/60 border border-primary/10 rounded-3xl p-8 relative overflow-hidden group hover:border-primary/40 transition-colors shadow-sm">
					<div className="absolute -right-4 -top-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/30 transition-all"></div>
					<div className="flex justify-between items-start mb-6">
						<span className="material-symbols-outlined text-primary bg-primary/10 p-3 rounded-2xl shadow-inner border border-primary/20">music_note</span>
					</div>
					<p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-2">Total Songs</p>
					<h3 className="text-4xl font-black text-slate-900 dark:text-white">{stats.totalSongs.toLocaleString()}</h3>
				</div>
				
				<div className="bg-primary/5 dark:bg-background-dark/60 border border-primary/10 rounded-3xl p-8 relative overflow-hidden group hover:border-primary/40 transition-colors shadow-sm">
					<div className="absolute -right-4 -top-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/30 transition-all"></div>
					<div className="flex justify-between items-start mb-6">
						<span className="material-symbols-outlined text-primary bg-primary/10 p-3 rounded-2xl shadow-inner border border-primary/20">album</span>
					</div>
					<p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-2">Total Albums</p>
					<h3 className="text-4xl font-black text-slate-900 dark:text-white">{stats.totalAlbums.toLocaleString()}</h3>
				</div>
				
				<div className="bg-primary/5 dark:bg-background-dark/60 border border-primary/10 rounded-3xl p-8 relative overflow-hidden group hover:border-primary/40 transition-colors shadow-sm">
					<div className="absolute -right-4 -top-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/30 transition-all"></div>
					<div className="flex justify-between items-start mb-6">
						<span className="material-symbols-outlined text-primary bg-primary/10 p-3 rounded-2xl shadow-inner border border-primary/20">person</span>
					</div>
					<p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-2">Total Users</p>
					<h3 className="text-4xl font-black text-slate-900 dark:text-white">{stats.totalUsers.toLocaleString()}</h3>
				</div>
				
				<div className="bg-primary/5 dark:bg-background-dark/60 border border-primary/10 rounded-3xl p-8 relative overflow-hidden group hover:border-primary/40 transition-colors shadow-sm">
					<div className="absolute -right-4 -top-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/30 transition-all"></div>
					<div className="flex justify-between items-start mb-6">
						<span className="material-symbols-outlined text-primary bg-primary/10 p-3 rounded-2xl shadow-inner border border-primary/20">artist</span>
					</div>
					<p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-2">Total Artists</p>
					<h3 className="text-4xl font-black text-slate-900 dark:text-white">{stats.totalArtists.toLocaleString()}</h3>
				</div>
			</div>

			{/* Chart Row */}
			<div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
				{/* Catalog Overview */}
				<div className="xl:col-span-2 bg-background-dark/50 border border-primary/10 rounded-3xl p-8 backdrop-blur-md shadow-sm">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
						<div>
							<h4 className="text-2xl font-black text-slate-900 dark:text-white">Platform Catalog</h4>
							<p className="text-slate-500 text-sm font-medium mt-1">Current music library statistics</p>
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="bg-primary/10 p-6 rounded-2xl">
							<span className="material-symbols-outlined text-4xl text-primary mb-2">music_note</span>
							<p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">Songs</p>
							<p className="text-3xl font-black text-slate-900 dark:text-white">{stats.totalSongs.toLocaleString()}</p>
						</div>
						<div className="bg-purple-500/10 p-6 rounded-2xl">
							<span className="material-symbols-outlined text-4xl text-purple-500 mb-2">album</span>
							<p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">Albums</p>
							<p className="text-3xl font-black text-slate-900 dark:text-white">{stats.totalAlbums.toLocaleString()}</p>
						</div>
						<div className="bg-rose-500/10 p-6 rounded-2xl">
							<span className="material-symbols-outlined text-4xl text-rose-500 mb-2">person</span>
							<p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">Artists</p>
							<p className="text-3xl font-black text-slate-900 dark:text-white">{stats.totalArtists.toLocaleString()}</p>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Row: Quick Stats */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Platform Health */}
				<div className="bg-background-dark/50 border border-primary/10 rounded-3xl overflow-hidden flex flex-col backdrop-blur-md shadow-sm">
					<div className="p-8 border-b border-primary/10 flex justify-between items-center bg-background-light/50 dark:bg-white/5">
						<h4 className="text-2xl font-black text-slate-900 dark:text-white">Platform Overview</h4>
					</div>
					<div className="p-8 space-y-6">
						<div className="flex items-center justify-between p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
							<div className="flex items-center gap-3">
								<span className="material-symbols-outlined text-emerald-500">check_circle</span>
								<span className="font-bold text-slate-700 dark:text-slate-300">System Status</span>
							</div>
							<span className="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">Operational</span>
						</div>
						<div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/10">
							<div className="flex items-center gap-3">
								<span className="material-symbols-outlined text-primary">library_music</span>
								<span className="font-bold text-slate-700 dark:text-slate-300">Total Catalog</span>
							</div>
							<span className="text-xl font-black text-primary">{(stats.totalSongs + stats.totalAlbums).toLocaleString()}</span>
						</div>
						<div className="flex items-center justify-between p-4 bg-purple-500/5 rounded-xl border border-purple-500/10">
							<div className="flex items-center gap-3">
								<span className="material-symbols-outlined text-purple-500">group</span>
								<span className="font-bold text-slate-700 dark:text-slate-300">Registered Users</span>
							</div>
							<span className="text-xl font-black text-purple-500">{stats.totalUsers.toLocaleString()}</span>
						</div>
					</div>
				</div>

				{/* Quick Actions */}
				<div className="bg-background-dark/50 border border-primary/10 rounded-3xl p-8 flex flex-col backdrop-blur-md shadow-sm">
					<div className="mb-6">
						<h4 className="text-2xl font-black text-slate-900 dark:text-white">Quick Actions</h4>
						<p className="text-sm font-medium text-slate-500 mt-1">Common administrative tasks</p>
					</div>
					<div className="space-y-4 flex-1">
						<button onClick={() => onNavigate?.("addSong")} className="w-full flex items-center gap-4 p-4 bg-primary/5 hover:bg-primary/10 rounded-xl border border-primary/10 transition-colors text-left">
							<span className="material-symbols-outlined text-primary">add_circle</span>
							<div>
								<p className="font-bold text-slate-900 dark:text-white">Add New Song</p>
								<p className="text-xs text-slate-500">Upload a new track to the platform</p>
							</div>
						</button>
						<button onClick={() => onNavigate?.("addAlbum")} className="w-full flex items-center gap-4 p-4 bg-purple-500/5 hover:bg-purple-500/10 rounded-xl border border-purple-500/10 transition-colors text-left">
							<span className="material-symbols-outlined text-purple-500">album</span>
							<div>
								<p className="font-bold text-slate-900 dark:text-white">Create Album</p>
								<p className="text-xs text-slate-500">Add a new album to the catalog</p>
							</div>
						</button>
						<button onClick={() => onNavigate?.("users")} className="w-full flex items-center gap-4 p-4 bg-rose-500/5 hover:bg-rose-500/10 rounded-xl border border-rose-500/10 transition-colors text-left">
							<span className="material-symbols-outlined text-rose-500">person_add</span>
							<div>
								<p className="font-bold text-slate-900 dark:text-white">Manage Users</p>
								<p className="text-xs text-slate-500">View and manage platform users</p>
							</div>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminCommandCenter;
