import { useEffect, useState } from "react";
import { AdminView } from "../AdminPage";
import toast from "react-hot-toast";
import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";

interface PlaylistsManagementProps {
	onNavigate?: (view: AdminView) => void;
}

interface Playlist {
	_id: string;
	name: string;
	description: string;
	imageUrl: string;
	songs: string[];
	isPublic: boolean;
	createdAt: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PlaylistsManagement = ({ onNavigate: _onNavigate }: PlaylistsManagementProps) => {
	const { user } = useAuthStore();
	const [playlists, setPlaylists] = useState<Playlist[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [editingPlaylist, setEditingPlaylist] = useState<Playlist | null>(null);
	const [newPlaylist, setNewPlaylist] = useState({ name: "", description: "", isPublic: true });
	const [isCreating, setIsCreating] = useState(false);

	useEffect(() => {
		const fetchPlaylists = async () => {
			if (!user?.uid) return;
			try {
				const res = await axiosInstance.get(`/playlists?userId=${user.uid}`);
				setPlaylists(res.data);
			} catch (error: any) {
				toast.error("Failed to fetch playlists");
			}
		};
		fetchPlaylists();
	}, [user?.uid]);

	const filteredPlaylists = playlists.filter(p =>
		!searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description?.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const handleCreate = async () => {
		if (!newPlaylist.name.trim()) return toast.error("Please enter a playlist name");
		setIsCreating(true);
		try {
			const res = await axiosInstance.post("/playlists", newPlaylist);
			setPlaylists(prev => [res.data, ...prev]);
			setShowCreateModal(false);
			setNewPlaylist({ name: "", description: "", isPublic: true });
			toast.success(`Playlist "${res.data.name}" created!`);
		} catch (error: any) {
			toast.error(error.response?.data?.message || "Failed to create playlist");
		} finally {
			setIsCreating(false);
		}
	};

	const handleUpdate = async () => {
		if (!editingPlaylist || !editingPlaylist.name.trim()) return toast.error("Please enter a playlist name");
		setIsCreating(true);
		try {
			const { _id, name, description, isPublic } = editingPlaylist;
			const res = await axiosInstance.put(`/playlists/${_id}`, { name, description, isPublic });
			setPlaylists(prev => prev.map(p => p._id === _id ? res.data : p));
			setShowEditModal(false);
			setEditingPlaylist(null);
			toast.success(`Playlist updated!`);
		} catch (error: any) {
			toast.error(error.response?.data?.message || "Failed to update playlist");
		} finally {
			setIsCreating(false);
		}
	};

	const handleDelete = async (id: string, name: string) => {
		if (window.confirm(`Delete playlist "${name}"?`)) {
			try {
				await axiosInstance.delete(`/playlists/${id}`);
				setPlaylists(prev => prev.filter(p => p._id !== id));
				toast.success("Playlist deleted");
			} catch (error: any) {
				toast.error("Failed to delete playlist");
			}
		}
	};

	const toggleVisibility = async (id: string, currentPublic: boolean) => {
		try {
			const res = await axiosInstance.put(`/playlists/${id}`, { isPublic: !currentPublic });
			setPlaylists(prev => prev.map(p => p._id === id ? res.data : p));
			toast.success(`Playlist is now ${!currentPublic ? 'Public' : 'Private'}`);
		} catch (error: any) {
			toast.error("Failed to update visibility");
		}
	};

	const coverColors = ["from-purple-600 to-primary", "from-blue-500 to-cyan-400", "from-orange-500 to-rose-500", "from-green-500 to-emerald-400", "from-primary to-indigo-600"];


	return (
		<div className="animate-in fade-in duration-500 w-full relative z-0">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-10">
				<div className="space-y-1">
					<h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white italic">Playlists</h2>
					<p className="text-slate-400 text-lg font-medium">Create and manage curated collections for your listeners.</p>
				</div>
				<button
					onClick={() => setShowCreateModal(true)}
					className="bg-primary hover:scale-105 active:scale-95 text-white font-bold py-3.5 px-8 rounded-full flex items-center gap-2 transition-all shadow-[0_0_30px_rgba(218,19,236,0.3)] shrink-0"
				>
					<span className="material-symbols-outlined">add</span>
					Create Playlist
				</button>
			</div>

			{/* Stats */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
				{[
					{ icon: "featured_play_list", label: "Total Playlists", value: playlists.length, color: "primary" },
					{ icon: "public", label: "Public", value: playlists.filter(p => p.isPublic).length, color: "emerald" },
					{ icon: "lock", label: "Private", value: playlists.filter(p => !p.isPublic).length, color: "orange" },
				].map((s, i) => (
					<div key={i} className={`bg-${s.color === 'primary' ? 'primary' : s.color + '-500'}/5 p-6 rounded-3xl border border-${s.color === 'primary' ? 'primary' : s.color + '-500'}/10 hover:border-${s.color === 'primary' ? 'primary' : s.color + '-500'}/30 transition-all`}>
						<div className={`w-11 h-11 rounded-2xl mb-4 flex items-center justify-center bg-${s.color === 'primary' ? 'primary' : s.color + '-500'}/10 text-${s.color === 'primary' ? 'primary' : s.color + '-500'}`}>
							<span className="material-symbols-outlined">{s.icon}</span>
						</div>
						<p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">{s.label}</p>
						<h3 className="text-3xl font-black text-slate-900 dark:text-white">{s.value}</h3>
					</div>
				))}
			</div>

			{/* Search */}
			<div className="mb-6 relative group max-w-sm">
				<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors pointer-events-none">search</span>
				<input
					className="w-full bg-white dark:bg-zinc-900 border border-primary/15 rounded-2xl pl-11 pr-4 py-3 text-sm outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 font-medium transition-all focus:border-primary/40"
					placeholder="Search playlists..."
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
				/>
			</div>

			{/* Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
				{filteredPlaylists.map((playlist, idx) => (
					<div key={playlist._id} className="bg-white dark:bg-zinc-900/80 border border-primary/10 rounded-3xl overflow-hidden shadow-lg hover:shadow-primary/10 hover:border-primary/30 transition-all group">
						{/* Cover */}
						<div className={`h-44 bg-gradient-to-br ${coverColors[idx % coverColors.length]} relative overflow-hidden flex items-center justify-center`}>
							<span className="material-symbols-outlined text-white/40 text-8xl">featured_play_list</span>
							<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
								<button className="bg-primary text-white rounded-full p-3 shadow-xl hover:scale-110 transition-transform">
									<span className="material-symbols-outlined">play_arrow</span>
								</button>
							</div>
							{/* Visibility badge */}
							<span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${playlist.isPublic ? "bg-emerald-500/90 text-white" : "bg-slate-700/90 text-white"}`}>
								{playlist.isPublic ? "Public" : "Private"}
							</span>
						</div>

						<div className="p-6">
							<h3 className="font-black text-slate-900 dark:text-white text-lg mb-1 truncate group-hover:text-primary transition-colors">{playlist.name}</h3>
							<p className="text-slate-500 text-sm mb-4 line-clamp-2">{playlist.description || "No description"}</p>

							<div className="flex items-center justify-between">
								<span className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
									<span className="material-symbols-outlined text-[16px] text-primary">music_note</span>
									{playlist.songs?.length || 0} songs
								</span>
								<span className="text-xs text-slate-400">{new Date(playlist.createdAt).toLocaleDateString()}</span>
							</div>

							<div className="flex items-center gap-2 mt-5 pt-4 border-t border-primary/10">
								<button
									onClick={() => {
										setEditingPlaylist(playlist);
										setShowEditModal(true);
									}}
									className="flex-1 py-2 text-xs font-black uppercase tracking-widest bg-primary/5 hover:bg-primary hover:text-white text-primary rounded-xl transition-all border border-primary/10 flex items-center justify-center gap-1.5"
								>
									<span className="material-symbols-outlined text-[16px]">edit</span> Edit
								</button>
								<button
									onClick={() => toggleVisibility(playlist._id, playlist.isPublic)}
									className="py-2 px-3 text-xs font-black bg-primary/5 hover:bg-primary/10 text-slate-500 hover:text-primary rounded-xl transition-all border border-primary/10 flex items-center gap-1"
									title={playlist.isPublic ? "Make Private" : "Make Public"}
								>
									<span className="material-symbols-outlined text-[16px]">{playlist.isPublic ? "lock" : "public"}</span>
								</button>
								<button
									onClick={() => handleDelete(playlist._id, playlist.name)}
									className="py-2 px-3 text-xs font-black bg-rose-500/5 hover:bg-rose-500 hover:text-white text-rose-500 rounded-xl transition-all border border-rose-500/10 flex items-center gap-1"
									title="Delete"
								>
									<span className="material-symbols-outlined text-[16px]">delete</span>
								</button>
							</div>
						</div>
					</div>
				))}

				{/* Add Playlist Card */}
				<button
					onClick={() => setShowCreateModal(true)}
					className="border-2 border-dashed border-primary/20 rounded-3xl h-full min-h-[280px] flex flex-col items-center justify-center gap-4 hover:border-primary/50 hover:bg-primary/5 transition-all group cursor-pointer"
				>
					<div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
						<span className="material-symbols-outlined text-3xl">add</span>
					</div>
					<div className="text-center">
						<p className="font-black text-slate-900 dark:text-white">Create New Playlist</p>
						<p className="text-sm text-slate-500 mt-1">Add a curated collection</p>
					</div>
				</button>
			</div>

			{filteredPlaylists.length === 0 && searchQuery && (
				<div className="text-center py-16 text-slate-500">
					<span className="material-symbols-outlined text-6xl text-primary/20 mb-4 block">search_off</span>
					<p>No playlists match "{searchQuery}"</p>
				</div>
			)}

			{/* Create Modal */}
			{showCreateModal && (
				<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
					<div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 w-full max-w-md shadow-2xl border border-primary/20 animate-in fade-in zoom-in-95 duration-300">
						<div className="flex items-center justify-between mb-8">
							<div>
								<h3 className="text-2xl font-black text-slate-900 dark:text-white">Create Playlist</h3>
								<p className="text-slate-500 text-sm mt-1">Add a new curated collection</p>
							</div>
							<button onClick={() => setShowCreateModal(false)} className="size-10 rounded-xl bg-primary/5 flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
								<span className="material-symbols-outlined">close</span>
							</button>
						</div>

						<div className="space-y-5">
							<div>
								<label className="text-xs font-black uppercase tracking-widest text-primary/80 block mb-2">Playlist Name *</label>
								<input
									className="w-full bg-background-light dark:bg-zinc-800 border border-primary/15 rounded-2xl px-5 py-3.5 outline-none focus:border-primary/40 text-slate-900 dark:text-white font-medium transition-all"
									placeholder="e.g. Late Night Vibes"
									value={newPlaylist.name}
									onChange={e => setNewPlaylist({ ...newPlaylist, name: e.target.value })}
									autoFocus
								/>
							</div>
							<div>
								<label className="text-xs font-black uppercase tracking-widest text-primary/80 block mb-2">Description</label>
								<textarea
									className="w-full bg-background-light dark:bg-zinc-800 border border-primary/15 rounded-2xl px-5 py-3.5 outline-none focus:border-primary/40 text-slate-900 dark:text-white font-medium transition-all resize-none"
									placeholder="What's this playlist about?"
									rows={3}
									value={newPlaylist.description}
									onChange={e => setNewPlaylist({ ...newPlaylist, description: e.target.value })}
								/>
							</div>
							<label className="flex items-center justify-between cursor-pointer p-4 bg-primary/5 rounded-2xl border border-primary/10 hover:border-primary/30 transition-all">
								<div>
									<p className="font-bold text-slate-900 dark:text-white">Make Public</p>
									<p className="text-xs text-slate-500 mt-0.5">Visible to all users on platform</p>
								</div>
								<div className="relative">
									<input
										type="checkbox"
										className="sr-only peer"
										checked={newPlaylist.isPublic}
										onChange={e => setNewPlaylist({ ...newPlaylist, isPublic: e.target.checked })}
									/>
									<div className="w-12 h-6 bg-slate-300 dark:bg-slate-700 rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-6 after:shadow-sm"></div>
								</div>
							</label>
						</div>

						<div className="flex gap-3 mt-8">
							<button
								onClick={() => setShowCreateModal(false)}
								className="flex-1 py-3.5 rounded-2xl border-2 border-primary/15 font-black text-slate-600 dark:text-slate-400 hover:border-primary/30 transition-all"
							>
								Cancel
							</button>
							<button
								onClick={handleCreate}
								disabled={isCreating || !newPlaylist.name.trim()}
								className="flex-1 py-3.5 rounded-2xl bg-primary text-white font-black shadow-lg shadow-primary/30 hover:opacity-90 disabled:opacity-50 transition-all"
							>
								{isCreating ? "Creating..." : "Create Playlist"}
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Edit Modal */}
			{showEditModal && editingPlaylist && (
				<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
					<div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 w-full max-w-md shadow-2xl border border-primary/20 animate-in fade-in zoom-in-95 duration-300">
						<div className="flex items-center justify-between mb-8">
							<div>
								<h3 className="text-2xl font-black text-slate-900 dark:text-white">Edit Playlist</h3>
								<p className="text-slate-500 text-sm mt-1">Update playlist details</p>
							</div>
							<button onClick={() => { setShowEditModal(false); setEditingPlaylist(null); }} className="size-10 rounded-xl bg-primary/5 flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
								<span className="material-symbols-outlined">close</span>
							</button>
						</div>

						<div className="space-y-5">
							<div>
								<label className="text-xs font-black uppercase tracking-widest text-primary/80 block mb-2">Playlist Name *</label>
								<input
									className="w-full bg-background-light dark:bg-zinc-800 border border-primary/15 rounded-2xl px-5 py-3.5 outline-none focus:border-primary/40 text-slate-900 dark:text-white font-medium transition-all"
									placeholder="e.g. Late Night Vibes"
									value={editingPlaylist.name}
									onChange={e => setEditingPlaylist({ ...editingPlaylist, name: e.target.value })}
									autoFocus
								/>
							</div>
							<div>
								<label className="text-xs font-black uppercase tracking-widest text-primary/80 block mb-2">Description</label>
								<textarea
									className="w-full bg-background-light dark:bg-zinc-800 border border-primary/15 rounded-2xl px-5 py-3.5 outline-none focus:border-primary/40 text-slate-900 dark:text-white font-medium transition-all resize-none"
									placeholder="What's this playlist about?"
									rows={3}
									value={editingPlaylist.description || ""}
									onChange={e => setEditingPlaylist({ ...editingPlaylist, description: e.target.value })}
								/>
							</div>
							<label className="flex items-center justify-between cursor-pointer p-4 bg-primary/5 rounded-2xl border border-primary/10 hover:border-primary/30 transition-all">
								<div>
									<p className="font-bold text-slate-900 dark:text-white">Make Public</p>
									<p className="text-xs text-slate-500 mt-0.5">Visible to all users on platform</p>
								</div>
								<div className="relative">
									<input
										type="checkbox"
										className="sr-only peer"
										checked={editingPlaylist.isPublic}
										onChange={e => setEditingPlaylist({ ...editingPlaylist, isPublic: e.target.checked })}
									/>
									<div className="w-12 h-6 bg-slate-300 dark:bg-slate-700 rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-6 after:shadow-sm"></div>
								</div>
							</label>
						</div>

						<div className="flex gap-3 mt-8">
							<button
								onClick={() => { setShowEditModal(false); setEditingPlaylist(null); }}
								className="flex-1 py-3.5 rounded-2xl border-2 border-primary/15 font-black text-slate-600 dark:text-slate-400 hover:border-primary/30 transition-all"
							>
								Cancel
							</button>
							<button
								onClick={handleUpdate}
								disabled={isCreating || !editingPlaylist.name.trim()}
								className="flex-1 py-3.5 rounded-2xl bg-primary text-white font-black shadow-lg shadow-primary/30 hover:opacity-90 disabled:opacity-50 transition-all"
							>
								{isCreating ? "Saving..." : "Save Changes"}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PlaylistsManagement;
