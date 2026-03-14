import { useState, useMemo } from "react";
import { useMusicStore } from "@/stores/useMusicStore";
import { AdminView } from "../AdminPage";
import toast from "react-hot-toast";

interface AlbumsManagementProps {
	onNavigate?: (view: AdminView, data?: any) => void;
}

const AlbumsManagement = ({ onNavigate }: AlbumsManagementProps) => {
	const { albums, stats, deleteAlbum } = useMusicStore();
	const [searchQuery, setSearchQuery] = useState("");
	const [yearFilter, setYearFilter] = useState("All Years");
	const [artistFilter, setArtistFilter] = useState("All Artists");

	const uniqueArtists = useMemo(() => [...new Set(albums.map(a => a.artist))], [albums]);
	const uniqueYears = useMemo(() => [...new Set(albums.map(a => String(a.releaseYear)))].sort((a, b) => Number(b) - Number(a)), [albums]);

	const filteredAlbums = useMemo(() => {
		return albums.filter(a => {
			const matchSearch = !searchQuery || a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.artist.toLowerCase().includes(searchQuery.toLowerCase());
			const matchYear = yearFilter === "All Years" || String(a.releaseYear) === yearFilter;
			const matchArtist = artistFilter === "All Artists" || a.artist === artistFilter;
			return matchSearch && matchYear && matchArtist;
		});
	}, [albums, searchQuery, yearFilter, artistFilter]);

	const handleDelete = (e: React.MouseEvent, id: string, title: string) => {
		e.stopPropagation();
		if (window.confirm(`Delete album "${title}"? This will also delete all its songs.`)) {
			deleteAlbum(id);
			toast.success("Album deleted");
		}
	};

	return (
		<div className="animate-in fade-in duration-500 w-full relative z-0">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
				<div>
					<h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2 italic">Albums</h2>
					<p className="text-slate-400 font-medium text-lg">View and manage your entire music catalog across all platforms.</p>
				</div>
				<button
					onClick={() => onNavigate?.("addAlbum")}
					className="flex items-center gap-2 px-7 py-3.5 bg-primary hover:scale-[1.02] active:scale-95 text-white rounded-full font-bold text-sm transition-all shadow-lg shadow-primary/30 w-fit"
				>
					<span className="material-symbols-outlined text-base">add_circle</span>
					Create Album
				</button>
			</div>

			{/* Stats Overview */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
				<div className="bg-primary/5 p-6 rounded-[2rem] border border-primary/10 relative overflow-hidden group hover:border-primary/30 transition-all">
					<div className="absolute -right-4 -top-4 p-8 opacity-10 group-hover:scale-125 transition-transform duration-500">
						<span className="material-symbols-outlined text-8xl text-primary">album</span>
					</div>
					<p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-2">Total Albums</p>
					<div className="flex items-baseline gap-3">
						<h3 className="text-4xl font-black text-slate-900 dark:text-white">{albums.length}</h3>
					</div>
				</div>
				<div className="bg-primary/5 p-6 rounded-[2rem] border border-primary/10 relative overflow-hidden group hover:border-primary/30 transition-all">
					<div className="absolute -right-4 -top-4 p-8 opacity-10 group-hover:scale-125 transition-transform duration-500">
						<span className="material-symbols-outlined text-8xl text-primary">trending_up</span>
					</div>
					<p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-2">Total Songs</p>
					<div className="flex items-baseline gap-3">
						<h3 className="text-4xl font-black text-slate-900 dark:text-white">{stats.totalSongs}</h3>
					</div>
				</div>
				<div className="bg-primary/5 p-6 rounded-[2rem] border border-primary/10 relative overflow-hidden group hover:border-primary/30 transition-all">
					<div className="absolute -right-4 -top-4 p-8 opacity-10 group-hover:scale-125 transition-transform duration-500">
						<span className="material-symbols-outlined text-8xl text-primary">new_releases</span>
					</div>
					<p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-2">Artists</p>
					<div className="flex items-baseline gap-3">
						<h3 className="text-4xl font-black text-slate-900 dark:text-white">{stats.totalArtists}</h3>
					</div>
				</div>
			</div>

			{/* Filters */}
			<div className="bg-primary/5 rounded-[2rem] p-4 mb-8 border border-primary/10">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					<div className="relative group">
						<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors pointer-events-none">search</span>
						<input
							className="w-full bg-white dark:bg-zinc-900 border border-primary/15 rounded-2xl pl-12 pr-4 py-3.5 text-sm outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 font-medium transition-all focus:border-primary/40"
							placeholder="Search albums or artists..."
							value={searchQuery}
							onChange={e => setSearchQuery(e.target.value)}
						/>
					</div>
					<div className="relative">
						<select
							value={artistFilter}
							onChange={e => setArtistFilter(e.target.value)}
							className="w-full bg-white dark:bg-zinc-900 border border-primary/15 rounded-2xl px-5 py-3.5 text-sm text-slate-900 dark:text-slate-100 appearance-none cursor-pointer outline-none focus:border-primary/40"
						>
							<option>All Artists</option>
							{uniqueArtists.map(a => <option key={a}>{a}</option>)}
						</select>
						<span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
					</div>
					<div className="relative">
						<select
							value={yearFilter}
							onChange={e => setYearFilter(e.target.value)}
							className="w-full bg-white dark:bg-zinc-900 border border-primary/15 rounded-2xl px-5 py-3.5 text-sm text-slate-900 dark:text-slate-100 appearance-none cursor-pointer outline-none focus:border-primary/40"
						>
							<option>All Years</option>
							{uniqueYears.map(y => <option key={y}>{y}</option>)}
						</select>
						<span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
					</div>
					<button
						onClick={() => { setSearchQuery(""); setArtistFilter("All Artists"); setYearFilter("All Years"); }}
						className="flex items-center justify-center gap-2 bg-white dark:bg-zinc-900 border border-primary/15 rounded-2xl px-5 py-3.5 text-sm text-slate-700 dark:text-slate-300 hover:border-primary/40 hover:text-primary transition-all font-medium"
					>
						<span className="material-symbols-outlined text-[18px]">filter_list_off</span>
						Clear Filters
					</button>
				</div>
				{(searchQuery || artistFilter !== "All Artists" || yearFilter !== "All Years") && (
					<p className="mt-3 px-2 text-xs text-primary font-bold">Showing {filteredAlbums.length} of {albums.length} albums</p>
				)}
			</div>

			{/* Table */}
			<div className="bg-white dark:bg-zinc-900/80 rounded-[2.5rem] border border-primary/10 overflow-hidden shadow-xl">
				<div className="p-6 border-b border-primary/10 flex items-center justify-between">
					<div className="flex items-center gap-4">
						<h4 className="text-lg font-black text-slate-900 dark:text-white">Album Catalog</h4>
						<span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase tracking-widest border border-primary/20">Live</span>
					</div>
					<button
						onClick={() => onNavigate?.("addAlbum")}
						className="text-primary text-sm font-black hover:underline flex items-center gap-1"
					>
						<span className="material-symbols-outlined text-[18px]">add</span> New Album
					</button>
				</div>

				<div className="overflow-x-auto">
					{filteredAlbums.length === 0 ? (
						<div className="p-12 text-center flex flex-col items-center">
							<span className="material-symbols-outlined text-6xl text-primary/20 mb-4">album</span>
							<p className="font-bold text-slate-900 dark:text-white mb-1">{searchQuery ? `No albums match "${searchQuery}"` : "No albums yet"}</p>
							<button onClick={() => onNavigate?.("addAlbum")} className="mt-2 text-primary font-black hover:underline text-sm">
								Create your first album →
							</button>
						</div>
					) : (
						<table className="w-full text-left">
							<thead>
								<tr className="bg-primary/5 text-slate-500 text-[11px] font-black uppercase tracking-[0.2em] border-b border-primary/10">
									<th className="px-8 py-5">Album Name</th>
									<th className="px-8 py-5">Artist</th>
									<th className="px-8 py-5 text-center">Year</th>
									<th className="px-8 py-5 text-center">Songs</th>
									<th className="px-8 py-5">Streams</th>
									<th className="px-8 py-5 text-right">Actions</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-primary/5">
								{filteredAlbums.map((album) => (
									<tr key={album._id} className="hover:bg-primary/5 transition-colors group">
										<td className="px-8 py-5">
											<div className="flex items-center gap-4">
												<div className="size-12 min-w-12 rounded-xl border border-primary/20 overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300">
													<img src={album.imageUrl} alt={album.title} className="w-full h-full object-cover" />
												</div>
												<span className="font-bold text-slate-900 dark:text-white text-[15px] whitespace-nowrap group-hover:text-primary transition-colors">{album.title}</span>
											</div>
										</td>
										<td className="px-8 py-5 text-slate-500 font-medium whitespace-nowrap text-sm">{album.artist}</td>
										<td className="px-8 py-5 text-slate-500 text-center text-sm font-medium">{album.releaseYear}</td>
										<td className="px-8 py-5 text-slate-500 text-center font-bold">{album.songs?.length || 0}</td>
										<td className="px-8 py-5">
											<span className="font-black text-primary bg-primary/10 px-3 py-1 rounded-lg border border-primary/20 text-sm">
												—
											</span>
										</td>
										<td className="px-8 py-5 text-right">
											<div className="flex items-center justify-end gap-2">
												<button
													onClick={() => onNavigate?.("songs")}
													className="size-9 bg-primary/5 text-primary rounded-xl hover:bg-primary hover:text-white transition-all flex items-center justify-center border border-primary/10"
													title="View Songs"
												>
													<span className="material-symbols-outlined text-xl">queue_music</span>
												</button>
												<button
													onClick={() => toast.success(`Editing "${album.title}" — full editor coming soon`)}
													className="size-9 bg-primary/5 text-slate-500 rounded-xl hover:bg-primary hover:text-white transition-all flex items-center justify-center border border-primary/10"
													title="Edit"
												>
													<span className="material-symbols-outlined text-xl">edit</span>
												</button>
												<button
													onClick={(e) => handleDelete(e, album._id, album.title)}
													className="size-9 bg-primary/5 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center border border-rose-500/10"
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

				{filteredAlbums.length > 0 && (
					<div className="px-8 py-5 bg-primary/5 border-t border-primary/10 flex flex-col sm:flex-row gap-4 items-center justify-between">
						<p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
							Showing 1 – {filteredAlbums.length} of {albums.length} albums
						</p>
						<div className="flex gap-2">
							<button className="size-10 rounded-xl bg-white dark:bg-zinc-900 text-slate-400 hover:bg-primary hover:text-white transition-all border border-primary/10 flex items-center justify-center">
								<span className="material-symbols-outlined text-lg">chevron_left</span>
							</button>
							<button className="size-10 rounded-xl bg-primary text-white font-black text-sm shadow-lg shadow-primary/30 flex items-center justify-center">1</button>
							<button className="size-10 rounded-xl bg-white dark:bg-zinc-900 text-slate-400 hover:bg-primary hover:text-white transition-all border border-primary/10 flex items-center justify-center">
								<span className="material-symbols-outlined text-lg">chevron_right</span>
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default AlbumsManagement;
