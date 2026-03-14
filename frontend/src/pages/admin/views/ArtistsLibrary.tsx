import { useState, useMemo } from "react";
import { useMusicStore } from "@/stores/useMusicStore";
import { AdminView } from "../AdminPage";
import toast from "react-hot-toast";

interface ArtistsLibraryProps {
	onNavigate?: (view: AdminView, data?: any) => void;
}

type FilterType = "All Artists" | "Verified Only" | "Awaiting Review" | "Contract Ending";

const ArtistsLibrary = ({ onNavigate }: ArtistsLibraryProps) => {
	const { stats, albums, songs } = useMusicStore();
	const [activeFilter, setActiveFilter] = useState<FilterType>("All Artists");
	const [searchQuery, setSearchQuery] = useState("");



	const getUniqueArtists = () => {
		const artistMap = new Map<string, { name: string; albumsCount: number; songsCount: number; imageUrl: string }>();

		albums.forEach(album => {
			if (!artistMap.has(album.artist)) {
				artistMap.set(album.artist, { name: album.artist, albumsCount: 1, songsCount: 0, imageUrl: album.imageUrl });
			} else {
				artistMap.get(album.artist)!.albumsCount++;
			}
		});

		songs.forEach(song => {
			if (!artistMap.has(song.artist)) {
				artistMap.set(song.artist, { name: song.artist, albumsCount: 0, songsCount: 1, imageUrl: song.imageUrl });
			} else {
				artistMap.get(song.artist)!.songsCount++;
				if (!artistMap.get(song.artist)!.imageUrl) {
					artistMap.get(song.artist)!.imageUrl = song.imageUrl;
				}
			}
		});

		return Array.from(artistMap.values());
	};

	const allArtists = useMemo(() => getUniqueArtists(), [albums, songs]);

	// Assign stable status per artist
	const artistsWithStatus = useMemo(() => 
		allArtists.map((a) => ({
			...a,
			status: "Active",
			country: "—",
			followers: "—",
			verified: true,
		})),
	[allArtists]);

	const filteredArtists = useMemo(() => {
		let list = artistsWithStatus;

		// Apply tab filter
		if (activeFilter === "Verified Only") list = list.filter(a => a.verified);
		else if (activeFilter === "Awaiting Review") list = list.filter(a => a.status === "Pending");
		else if (activeFilter === "Contract Ending") list = list.filter(a => a.status === "Contract Ending");

		// Apply search
		if (searchQuery) list = list.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()));

		return list;
	}, [artistsWithStatus, activeFilter, searchQuery]);

	const handleExportCSV = () => {
		const rows = [
			["Name", "Country", "Songs", "Albums", "Followers", "Status"],
			...artistsWithStatus.map(a => [a.name, a.country, a.songsCount, a.albumsCount, a.followers, a.status]),
		];
		const csv = rows.map(r => r.join(",")).join("\n");
		const blob = new Blob([csv], { type: "text/csv" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = "bessify_artists.csv";
		link.click();
		URL.revokeObjectURL(url);
		toast.success("Exported artists list as CSV");
	};

	const handleDelete = (artistName: string) => {
		if (window.confirm(`Remove ${artistName} from the platform? This will not delete their songs.`)) {
			toast.success(`${artistName} removed`);
		}
	};

	const filters: FilterType[] = ["All Artists", "Verified Only", "Awaiting Review", "Contract Ending"];

	return (
		<div className="animate-in fade-in duration-500 w-full">
			{/* Header */}
			<div className="flex flex-wrap items-end justify-between gap-6 mb-12">
				<div>
					<h2 className="text-4xl md:text-5xl font-black tracking-tight mb-3 text-slate-900 dark:text-white">Artists Library</h2>
					<p className="text-slate-500 text-lg">Manage your global roster and distribution statuses.</p>
				</div>
				<div className="flex gap-4">
					<button
						onClick={handleExportCSV}
						className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-primary/5 hover:bg-primary/10 border border-primary/10 text-slate-700 dark:text-slate-300 text-sm font-bold transition-all hover:border-primary/30"
					>
						<span className="material-symbols-outlined text-lg">download</span>
						Export CSV
					</button>
					<button
						onClick={() => onNavigate?.("addArtist")}
						className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-primary text-white shadow-xl shadow-primary/25 text-sm font-bold hover:scale-[1.02] active:scale-95 transition-all"
					>
						<span className="material-symbols-outlined text-lg">person_add</span>
						Onboard Artist
					</button>
				</div>
			</div>

			{/* Stats Overview */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
				{[
					{ icon: "groups", label: "Total Artists", value: stats.totalArtists.toLocaleString(), badge: "Total", badgeColor: "emerald", bg: "primary" },
					{ icon: "verified", label: "Active Roster", value: Math.max(0, stats.totalArtists), badge: "Active", badgeColor: "blue", bg: "blue" },
					{ icon: "music_note", label: "Total Songs", value: stats.totalSongs.toLocaleString(), badge: "Songs", badgeColor: "purple", bg: "purple" },
					{ icon: "album", label: "Total Albums", value: stats.totalAlbums.toLocaleString(), badge: "Albums", badgeColor: "orange", bg: "orange" },
				].map((card, i) => (
					<div key={i} className={`bg-${card.bg}-500/5 p-7 rounded-3xl border border-${card.bg === 'primary' ? 'primary' : card.bg + '-500'}/10 hover:border-${card.bg === 'primary' ? 'primary' : card.bg + '-500'}/20 transition-all group`}>
						<div className="flex justify-between items-start mb-6">
							<div className={`w-12 h-12 rounded-2xl bg-${card.bg === 'primary' ? 'primary' : card.bg + '-500'}/10 flex items-center justify-center text-${card.bg === 'primary' ? 'primary' : card.bg + '-500'}`}>
								<span className="material-symbols-outlined">{card.icon}</span>
							</div>
							<span className={`text-[11px] font-bold text-${card.badgeColor}-500 bg-${card.badgeColor}-500/10 px-2.5 py-1 rounded-lg`}>{card.badge}</span>
						</div>
						<p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{card.label}</p>
						<h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{card.value}</h3>
					</div>
				))}
			</div>

			{/* Filter Tabs + Search */}
			<div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
				<div className="flex flex-wrap items-center gap-3">
					{filters.map(f => (
						<button
							key={f}
							onClick={() => setActiveFilter(f)}
							className={`px-5 py-2.5 rounded-full text-[13px] font-bold transition-all ${
								activeFilter === f
									? "bg-primary text-white shadow-lg shadow-primary/20"
									: "bg-primary/5 border border-primary/10 hover:bg-primary/10 text-slate-600 dark:text-slate-400 hover:text-primary"
							}`}
						>
							{f}
						</button>
					))}
				</div>
				<div className="flex-1 relative group max-w-xs ml-auto">
					<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-[20px] pointer-events-none">search</span>
					<input
						className="w-full bg-white dark:bg-zinc-900 border border-primary/15 rounded-2xl pl-11 pr-4 py-2.5 text-sm outline-none focus:border-primary/40 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 font-medium transition-all"
						placeholder="Search artists..."
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
					/>
				</div>
			</div>

			{/* Artist Management Table */}
			<div className="bg-white dark:bg-zinc-900/80 rounded-3xl overflow-hidden border border-primary/10 shadow-xl">
				<div className="overflow-x-auto">
					{filteredArtists.length === 0 ? (
						<div className="p-12 text-center text-slate-500">
							<span className="material-symbols-outlined text-6xl text-primary/20 mb-4 block">person</span>
							<p className="font-bold mb-1 text-slate-900 dark:text-white">No artists found</p>
							<p className="text-sm">{searchQuery ? `No results for "${searchQuery}"` : "Upload songs to see artists here."}</p>
						</div>
					) : (
						<table className="w-full text-left border-collapse">
							<thead>
								<tr className="bg-primary/5 border-b border-primary/10">
									<th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.15em] text-primary">Artist Profile</th>
									<th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.15em] text-primary hidden md:table-cell">Country</th>
									<th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.15em] text-primary text-center hidden lg:table-cell">Followers</th>
									<th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.15em] text-primary text-center">Songs</th>
									<th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.15em] text-primary text-center hidden sm:table-cell">Albums</th>
									<th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.15em] text-primary">Status</th>
									<th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.15em] text-primary text-right">Actions</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-primary/5">
								{filteredArtists.map((artist, idx) => (
									<tr key={idx} className="hover:bg-primary/5 transition-colors group">
										<td className="px-8 py-5">
											<div className="flex items-center gap-4">
												<div className="w-11 h-11 rounded-full overflow-hidden border border-primary/10 bg-primary/5 shrink-0">
													{artist.imageUrl ? (
														<img alt={artist.name} className="w-full h-full object-cover" src={artist.imageUrl} />
													) : (
														<div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-black text-lg">{artist.name.charAt(0)}</div>
													)}
												</div>
												<div>
													<p className="text-[15px] font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors flex items-center gap-1.5">
														{artist.name}
														{artist.verified && <span className="material-symbols-outlined text-blue-500 text-[16px]">verified</span>}
													</p>
													<p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mt-0.5">Musician</p>
												</div>
											</div>
										</td>
										<td className="px-8 py-5 hidden md:table-cell">
											<div className="flex items-center gap-2 text-[13px] text-slate-500 font-medium whitespace-nowrap">
												<span className="material-symbols-outlined text-[16px] text-slate-400">public</span>
												{artist.country}
											</div>
										</td>
										<td className="px-8 py-5 text-[14px] font-bold text-slate-700 dark:text-slate-200 text-center hidden lg:table-cell">{artist.followers}</td>
										<td className="px-8 py-5 text-[14px] font-medium text-slate-500 text-center">{artist.songsCount}</td>
										<td className="px-8 py-5 text-[14px] font-medium text-slate-500 text-center hidden sm:table-cell">{artist.albumsCount}</td>
										<td className="px-8 py-5">
											<span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
												artist.status === "Active" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
												artist.status === "Pending" ? "bg-orange-500/10 text-orange-500 border-orange-500/20" :
												"bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
											}`}>
												<span className={`w-1.5 h-1.5 rounded-full ${
													artist.status === "Active" ? "bg-emerald-500 animate-pulse" :
													artist.status === "Pending" ? "bg-orange-500" : "bg-yellow-500"
												}`}></span>
												{artist.status}
											</span>
										</td>
										<td className="px-8 py-5">
											<div className="flex items-center justify-end gap-2">
												<button
													onClick={() => toast.success(`Viewing ${artist.name}'s profile`)}
													className="w-9 h-9 rounded-xl flex items-center justify-center bg-primary/5 text-slate-400 hover:text-primary hover:bg-primary/10 transition-all border border-primary/10"
													title="View"
												>
													<span className="material-symbols-outlined text-xl">visibility</span>
												</button>
												<button
													onClick={() => onNavigate?.("addArtist")}
													className="w-9 h-9 rounded-xl flex items-center justify-center bg-primary/5 text-slate-400 hover:text-primary hover:bg-primary/10 transition-all border border-primary/10"
													title="Edit"
												>
													<span className="material-symbols-outlined text-xl">edit</span>
												</button>
												<button
													onClick={() => handleDelete(artist.name)}
													className="w-9 h-9 rounded-xl flex items-center justify-center bg-primary/5 text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-all border border-primary/10"
													title="Delete"
												>
													<span className="material-symbols-outlined text-xl">delete</span>
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>

				{/* Pagination */}
				{filteredArtists.length > 0 && (
					<div className="px-8 py-5 bg-primary/5 flex flex-col sm:flex-row items-center justify-between border-t border-primary/10 gap-4">
						<p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
							Showing <span className="text-slate-900 dark:text-white">1 – {filteredArtists.length}</span> of {artistsWithStatus.length} artists
						</p>
						<div className="flex items-center gap-2">
							<button className="w-10 h-10 rounded-xl flex items-center justify-center bg-white dark:bg-zinc-900 text-slate-500 hover:text-primary hover:bg-primary/10 transition-all border border-primary/10">
								<span className="material-symbols-outlined text-xl">chevron_left</span>
							</button>
							<button className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary text-white text-sm font-black shadow-lg shadow-primary/20">1</button>
							<button className="w-10 h-10 rounded-xl flex items-center justify-center bg-white dark:bg-zinc-900 text-slate-500 hover:text-primary hover:bg-primary/10 transition-all border border-primary/10">
								<span className="material-symbols-outlined text-xl">chevron_right</span>
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ArtistsLibrary;
