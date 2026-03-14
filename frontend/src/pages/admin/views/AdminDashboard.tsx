import { useMemo } from "react";
import { useMusicStore } from "@/stores/useMusicStore";
import { AdminView } from "../AdminPage";

interface AdminDashboardProps {
	onNavigate: (view: AdminView) => void;
}

const AdminDashboard = ({ onNavigate }: AdminDashboardProps) => {
	const { stats, songs, albums } = useMusicStore();

	// Real recent songs (last 5)
	const recentSongs = useMemo(() => songs.slice(0, 5), [songs]);

	// Bar chart heights scaled relative to song count per artist (top 7 artists by song count)
	const chartData = useMemo(() => {
		if (songs.length === 0) return [40, 60, 85, 55, 95, 70, 80];
		const artistMap = new Map<string, number>();
		songs.forEach(s => artistMap.set(s.artist, (artistMap.get(s.artist) || 0) + 1));
		const sorted = [...artistMap.values()].sort((a, b) => b - a).slice(0, 7);
		const max = Math.max(...sorted, 1);
		return sorted.map(v => Math.max(15, Math.round((v / max) * 95)));
	}, [songs]);

	const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

	return (
		<div className="space-y-8 animate-in fade-in duration-500">
			{/* Metrics Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
				{[
					{ icon: "music_note", label: "Total Songs", value: stats.totalSongs.toLocaleString(), view: "songs" as AdminView },
					{ icon: "artist", label: "Total Artists", value: stats.totalArtists.toLocaleString(), view: "artists" as AdminView },
					{ icon: "album", label: "Total Albums", value: stats.totalAlbums.toLocaleString(), view: "albums" as AdminView },
					{ icon: "person", label: "Total Users", value: stats.totalUsers.toLocaleString(), view: "users" as AdminView },
					{ icon: "playlist_play", label: "Playlists", value: "0", view: "playlists" as AdminView },
					{ icon: "stream", label: "Catalog Size", value: `${stats.totalSongs + stats.totalAlbums}`, view: "analytics" as AdminView },
				].map((card, i) => (
					<div
						key={i}
						onClick={() => onNavigate(card.view)}
						className="bg-primary/5 border border-primary/10 p-6 rounded-xl flex flex-col justify-between group hover:border-primary/40 transition-all cursor-pointer"
					>
						<div className="flex justify-between items-start mb-4">
							<div className="p-2 bg-primary/10 rounded-lg text-primary">
								<span className="material-symbols-outlined">{card.icon}</span>
							</div>
						</div>
						<div>
							<p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{card.label}</p>
							<h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{card.value}</h3>
						</div>
					</div>
				))}
			</div>

			{/* Charts Section */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Song Distribution by Artist */}
				<div className="bg-primary/5 border border-primary/10 p-8 rounded-xl">
					<div className="flex justify-between items-center mb-6">
						<div>
							<h3 className="text-lg font-bold text-slate-900 dark:text-white">Songs by Artist</h3>
							<p className="text-sm text-slate-500">Top artists by catalog size</p>
						</div>
						<div className="text-right">
							<p className="text-2xl font-bold text-primary">{stats.totalSongs}</p>
							<p className="text-xs text-emerald-500 font-medium">Total tracks</p>
						</div>
					</div>
					<div className="h-64 flex items-end gap-2 w-full pt-4">
						{chartData.map((h, i) => (
							<div
								key={i}
								className="flex-1 bg-primary/20 rounded-t-lg transition-all hover:bg-primary"
								style={{ height: `${h}%` }}
								title={`${h}% of max`}
							></div>
						))}
					</div>
					<div className="flex justify-between mt-4 text-xs text-slate-400 font-bold uppercase tracking-widest">
						{days.map(d => <span key={d}>{d}</span>)}
					</div>
				</div>

				{/* Albums vs Songs ratio */}
				<div className="bg-primary/5 border border-primary/10 p-8 rounded-xl">
					<div className="flex justify-between items-center mb-6">
						<div>
							<h3 className="text-lg font-bold text-slate-900 dark:text-white">Catalog Growth</h3>
							<p className="text-sm text-slate-500">Albums and songs over time</p>
						</div>
						<div className="text-right">
							<p className="text-2xl font-bold text-primary">{stats.totalAlbums}</p>
							<p className="text-xs text-emerald-500 font-medium">Albums</p>
						</div>
					</div>
					<div className="h-64 relative flex items-center justify-center">
						<svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 200">
							{/* Songs line - scaled based on actual count */}
							<path
								className="text-primary"
								d={`M0 ${200 - Math.min(Math.max(stats.totalSongs, 1) * 10, 180)} Q 100 ${200 - Math.min(Math.max(stats.totalSongs, 1) * 8, 160)}, 200 ${200 - Math.min(Math.max(stats.totalSongs, 1) * 9, 170)} T 400 ${200 - Math.min(Math.max(stats.totalSongs, 1) * 10, 185)}`}
								fill="none"
								stroke="currentColor"
								strokeWidth="3"
							/>
							{/* Albums line */}
							<path
								d={`M0 ${200 - Math.min(Math.max(stats.totalAlbums, 1) * 20, 160)} Q 100 ${200 - Math.min(Math.max(stats.totalAlbums, 1) * 15, 140)}, 200 ${200 - Math.min(Math.max(stats.totalAlbums, 1) * 18, 150)} T 400 ${200 - Math.min(Math.max(stats.totalAlbums, 1) * 20, 160)}`}
								fill="none"
								stroke="#60a5fa"
								strokeWidth="3"
								strokeDasharray="6 3"
							/>
							<path
								d={`M0 ${200 - Math.min(Math.max(stats.totalSongs, 1) * 10, 180)} Q 100 ${200 - Math.min(Math.max(stats.totalSongs, 1) * 8, 160)}, 200 ${200 - Math.min(Math.max(stats.totalSongs, 1) * 9, 170)} T 400 ${200 - Math.min(Math.max(stats.totalSongs, 1) * 10, 185)} V 200 H 0 Z`}
								fill="url(#dash_grad)"
								opacity="0.08"
							/>
							<defs>
								<linearGradient id="dash_grad" x1="0%" x2="0%" y1="0%" y2="100%">
									<stop offset="0%" style={{ stopColor: "#da13ec", stopOpacity: 1 }}></stop>
									<stop offset="100%" style={{ stopColor: "#da13ec", stopOpacity: 0 }}></stop>
								</linearGradient>
							</defs>
						</svg>
					</div>
					<div className="flex items-center gap-6 mt-4 text-xs font-bold">
						<div className="flex items-center gap-2"><div className="w-4 h-1 bg-primary rounded"></div><span className="text-slate-400 uppercase tracking-widest">Songs ({stats.totalSongs})</span></div>
						<div className="flex items-center gap-2"><div className="w-4 h-1 bg-blue-400 rounded border-dashed"></div><span className="text-slate-400 uppercase tracking-widest">Albums ({stats.totalAlbums})</span></div>
					</div>
				</div>
			</div>

			{/* Tables Section */}
			<div className="grid grid-cols-1 xl:grid-cols-2 gap-8 pb-8">
				{/* Real Songs Table */}
				<div className="bg-primary/5 border border-primary/10 rounded-xl overflow-hidden">
					<div className="p-6 border-b border-primary/10 flex justify-between items-center">
						<h3 className="font-bold text-slate-900 dark:text-white">Recently Added Songs</h3>
						<button onClick={() => onNavigate("songs")} className="text-sm text-primary font-medium hover:underline">View All</button>
					</div>
					<div className="overflow-x-auto">
						{recentSongs.length === 0 ? (
							<div className="p-8 text-center text-slate-500">
								<span className="material-symbols-outlined text-4xl text-primary/20 block mb-2">music_off</span>
								No songs yet. <button onClick={() => onNavigate("addSong")} className="text-primary font-bold hover:underline">Add your first song →</button>
							</div>
						) : (
							<table className="w-full text-left">
								<thead className="bg-primary/5 text-xs text-slate-400 font-bold uppercase tracking-widest">
									<tr>
										<th className="px-6 py-4">Track</th>
										<th className="px-6 py-4">Artist</th>
										<th className="px-6 py-4">Duration</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-primary/5 text-sm">
									{recentSongs.map((song) => (
										<tr key={song._id} className="hover:bg-primary/5 transition-colors">
											<td className="px-6 py-4">
												<div className="flex items-center gap-3">
													<div className="size-10 rounded bg-primary/10 flex items-center justify-center overflow-hidden shrink-0">
														<img src={song.imageUrl} alt="" className="w-full h-full object-cover" />
													</div>
													<span className="font-medium text-slate-900 dark:text-white truncate max-w-[150px]">{song.title}</span>
												</div>
											</td>
											<td className="px-6 py-4 text-slate-500 whitespace-nowrap">{song.artist}</td>
											<td className="px-6 py-4 text-slate-500 font-mono">
												{Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, "0")}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						)}
					</div>
				</div>

				{/* Real Albums Table */}
				<div className="bg-primary/5 border border-primary/10 rounded-xl overflow-hidden">
					<div className="p-6 border-b border-primary/10 flex justify-between items-center">
						<h3 className="font-bold text-slate-900 dark:text-white">Recent Albums</h3>
						<button onClick={() => onNavigate("albums")} className="text-sm text-primary font-medium hover:underline">Manage Albums</button>
					</div>
					<div className="overflow-x-auto">
						{albums.length === 0 ? (
							<div className="p-8 text-center text-slate-500">
								<span className="material-symbols-outlined text-4xl text-primary/20 block mb-2">album</span>
								No albums yet. <button onClick={() => onNavigate("addAlbum")} className="text-primary font-bold hover:underline">Create one →</button>
							</div>
						) : (
							<table className="w-full text-left">
								<thead className="bg-primary/5 text-xs text-slate-400 font-bold uppercase tracking-widest">
									<tr>
										<th className="px-6 py-4">Album</th>
										<th className="px-6 py-4">Artist</th>
										<th className="px-6 py-4">Year</th>
										<th className="px-6 py-4">Songs</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-primary/5 text-sm">
									{albums.slice(0, 5).map((album) => (
										<tr key={album._id} className="hover:bg-primary/5 transition-colors">
											<td className="px-6 py-4">
												<div className="flex items-center gap-3">
													<div className="size-10 rounded overflow-hidden shrink-0 bg-primary/10">
														<img src={album.imageUrl} alt="" className="w-full h-full object-cover" />
													</div>
													<span className="font-medium text-slate-900 dark:text-white truncate max-w-[130px]">{album.title}</span>
												</div>
											</td>
											<td className="px-6 py-4 text-slate-500 whitespace-nowrap">{album.artist}</td>
											<td className="px-6 py-4 text-slate-500">{album.releaseYear}</td>
											<td className="px-6 py-4 text-primary font-bold">{album.songs?.length || 0}</td>
										</tr>
									))}
								</tbody>
							</table>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
