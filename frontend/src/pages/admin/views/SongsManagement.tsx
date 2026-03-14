import { useState, useMemo } from "react";
import { useMusicStore } from "@/stores/useMusicStore";
import { AdminView } from "../AdminPage";
import toast from "react-hot-toast";

interface SongsManagementProps {
	onNavigate?: (view: AdminView, data?: any) => void;
}

const SongsManagement = ({ onNavigate }: SongsManagementProps) => {
	const { songs, stats, deleteSong } = useMusicStore();
	const [searchQuery, setSearchQuery] = useState("");
	const [genreFilter, setGenreFilter] = useState("All Genres");
	const [artistFilter, setArtistFilter] = useState("All Artists");



	// Unique artists from songs for the filter dropdown
	const uniqueArtists = useMemo(() => [...new Set(songs.map(s => s.artist))], [songs]);

	// Filtered songs
	const filteredSongs = useMemo(() => {
		return songs.filter(s => {
			const matchSearch = !searchQuery || s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.artist.toLowerCase().includes(searchQuery.toLowerCase());
			const matchArtist = artistFilter === "All Artists" || s.artist === artistFilter;
			return matchSearch && matchArtist;
		});
	}, [songs, searchQuery, artistFilter]);

	const handleDelete = (e: React.MouseEvent, id: string) => {
		e.stopPropagation();
		if (window.confirm("Are you sure you want to delete this song?")) {
			deleteSong(id);
			toast.success("Song deleted");
		}
	};

	return (
		<div className="animate-in fade-in duration-500 w-full relative z-0">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-10">
				<div className="space-y-1">
					<h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white italic">Music Library</h2>
					<p className="text-slate-400 text-lg font-medium">Oversee, edit, and monitor all tracks on the platform.</p>
				</div>
				<button
					onClick={() => onNavigate?.("addSong")}
					className="bg-primary hover:scale-105 active:scale-95 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-full flex items-center gap-2 transition-all shadow-[0_0_30px_rgba(218,19,236,0.3)] shrink-0"
				>
					<span className="material-symbols-outlined">add</span>
					Add New Song
				</button>
			</div>

			{/* Filters Section */}
			<section className="bg-primary/5 rounded-[2rem] p-4 mb-8 border border-primary/10 backdrop-blur-md">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					<div className="relative group">
						<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors pointer-events-none">search</span>
						<input
							className="w-full bg-white dark:bg-zinc-900 border border-primary/15 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:ring-1 focus:ring-primary focus:border-primary/50 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 transition-all font-medium outline-none"
							placeholder="Search by title, artist..."
							type="text"
							value={searchQuery}
							onChange={e => setSearchQuery(e.target.value)}
						/>
					</div>
					<div className="relative">
						<select
							value={genreFilter}
							onChange={e => setGenreFilter(e.target.value)}
							className="w-full bg-white dark:bg-zinc-900 border border-primary/15 rounded-2xl px-5 py-3.5 text-sm focus:ring-1 focus:ring-primary text-slate-900 dark:text-slate-100 appearance-none cursor-pointer outline-none"
						>
							<option>All Genres</option>
							<option>Pop</option>
							<option>Synthwave</option>
							<option>Lo-fi</option>
							<option>Hip-Hop</option>
							<option>Electronic</option>
						</select>
						<span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
					</div>
					<div className="relative">
						<select
							value={artistFilter}
							onChange={e => setArtistFilter(e.target.value)}
							className="w-full bg-white dark:bg-zinc-900 border border-primary/15 rounded-2xl px-5 py-3.5 text-sm focus:ring-1 focus:ring-primary text-slate-900 dark:text-slate-100 appearance-none cursor-pointer outline-none"
						>
							<option>All Artists</option>
							{uniqueArtists.map(a => <option key={a}>{a}</option>)}
						</select>
						<span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
					</div>
					<button
						onClick={() => { setSearchQuery(""); setGenreFilter("All Genres"); setArtistFilter("All Artists"); }}
						className="flex items-center justify-center gap-2 bg-white dark:bg-zinc-900 border border-primary/15 rounded-2xl px-5 py-3.5 text-sm text-slate-700 dark:text-slate-300 hover:border-primary/40 hover:text-primary transition-all font-medium"
					>
						<span className="material-symbols-outlined text-[18px]">filter_list_off</span>
						Clear Filters
					</button>
				</div>
				{(searchQuery || artistFilter !== "All Artists") && (
					<p className="mt-3 px-2 text-xs text-primary font-bold">
						Showing {filteredSongs.length} of {songs.length} songs
					</p>
				)}
			</section>

			{/* Data Table */}
			<section className="bg-white dark:bg-zinc-900/80 rounded-[2.5rem] overflow-hidden border border-primary/10 shadow-xl">
				<div className="overflow-x-auto">
					<table className="w-full text-left border-collapse">
						<thead>
							<tr className="bg-primary/5 border-b border-primary/10">
								<th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.15em] text-primary">Song Title</th>
								<th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.15em] text-primary">Artist</th>
								<th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.15em] text-primary hidden md:table-cell">Duration</th>
								<th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.15em] text-primary hidden lg:table-cell">Streams</th>
								<th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.15em] text-primary hidden lg:table-cell">Status</th>
								<th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.15em] text-primary text-right">Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-primary/5">
							{filteredSongs.map((song) => {
								return (
									<tr key={song._id} className="hover:bg-primary/5 transition-colors group">
										<td className="px-8 py-4">
											<div className="flex items-center gap-4">
												<div className="size-12 rounded-xl overflow-hidden border border-primary/20 group-hover:border-primary/50 transition-colors shrink-0 shadow-lg">
													<img alt={song.title} src={song.imageUrl} className="w-full h-full object-cover" />
												</div>
												<span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors truncate max-w-[200px] sm:max-w-[300px]">
													{song.title}
												</span>
											</div>
										</td>
										<td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-medium text-sm whitespace-nowrap">{song.artist}</td>
										<td className="px-6 py-4 text-slate-500 font-mono text-sm hidden md:table-cell">
											{Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, "0")}
										</td>
										<td className="px-6 py-4 font-bold text-slate-900 dark:text-slate-100 hidden lg:table-cell">
											—
										</td>
										<td className="px-6 py-4 hidden lg:table-cell">
											<div className="flex items-center gap-2">
												<div className="size-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
												<span className="text-[11px] font-black uppercase tracking-wider text-green-500">Active</span>
											</div>
										</td>
										<td className="px-8 py-4 text-right">
											<div className="flex justify-end gap-1">
												<button
													onClick={(e) => { e.stopPropagation(); onNavigate?.("editSong", { songId: song._id }); }}
													className="p-2 hover:bg-primary/20 text-slate-400 hover:text-primary rounded-lg transition-colors"
													title="Edit"
												>
													<span className="material-symbols-outlined text-xl">edit</span>
												</button>
												<button
													onClick={(e) => handleDelete(e, song._id)}
													className="p-2 hover:bg-red-500/10 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
													title="Delete"
												>
													<span className="material-symbols-outlined text-xl">delete</span>
												</button>
											</div>
										</td>
									</tr>
								);
							})}
							{filteredSongs.length === 0 && (
								<tr>
									<td colSpan={6} className="px-8 py-16 text-center text-slate-500">
										<span className="material-symbols-outlined text-6xl text-primary/20 mb-4 block">music_off</span>
										{searchQuery ? `No songs match "${searchQuery}"` : 'No songs found. Click "Add New Song" to upload your first track.'}
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>

				{/* Pagination */}
				{filteredSongs.length > 0 && (
					<div className="px-8 py-5 bg-primary/5 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-primary/10">
						<p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
							Showing 1 to {filteredSongs.length} of {filteredSongs.length} results
						</p>
						<div className="flex gap-2">
							<button className="size-10 rounded-xl flex items-center justify-center bg-white dark:bg-zinc-900 text-slate-400 hover:bg-primary hover:text-white transition-all border border-primary/10">
								<span className="material-symbols-outlined text-lg">chevron_left</span>
							</button>
							<button className="size-10 rounded-xl flex items-center justify-center bg-primary text-white font-black text-sm shadow-[0_0_15px_rgba(218,19,236,0.3)]">1</button>
							<button className="size-10 rounded-xl flex items-center justify-center bg-white dark:bg-zinc-900 text-slate-400 hover:bg-primary hover:text-white transition-all border border-primary/10">
								<span className="material-symbols-outlined text-lg">chevron_right</span>
							</button>
						</div>
					</div>
				)}
			</section>

			{/* Stats Overview Cards */}
			<section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 pb-10">
				<div className="bg-primary/5 p-6 rounded-[2.5rem] border-l-4 border-primary transition-transform hover:scale-105">
					<p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Total Tracks</p>
					<h3 className="text-3xl font-black text-slate-900 dark:text-white italic">{stats.totalSongs.toLocaleString()}</h3>
				</div>
				<div className="bg-blue-500/5 p-6 rounded-[2.5rem] border-l-4 border-blue-500 transition-transform hover:scale-105">
					<p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Total Albums</p>
					<h3 className="text-3xl font-black text-slate-900 dark:text-white italic">{stats.totalAlbums.toLocaleString()}</h3>
				</div>
				<div className="bg-pink-500/5 p-6 rounded-[2.5rem] border-l-4 border-pink-500 transition-transform hover:scale-105">
					<p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Active Artists</p>
					<h3 className="text-3xl font-black text-slate-900 dark:text-white italic">{stats.totalArtists.toLocaleString()}</h3>
				</div>
			</section>
		</div>
	);
};

export default SongsManagement;
