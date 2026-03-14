import { useState, useRef, useEffect } from "react";
import { AdminView } from "../AdminPage";
import toast from "react-hot-toast";
import { useMusicStore } from "@/stores/useMusicStore";

interface EditSongProps {
	onNavigate: (view: AdminView) => void;
	songId: string | null;
}

const EditSong = ({ onNavigate, songId }: EditSongProps) => {
	const { songs } = useMusicStore();
	const [isLoading, setIsLoading] = useState(false);
	
	const songToEdit = songs.find(s => s._id === songId);

	const [songData, setSongData] = useState({
		title: "",
		artist: "",
		albumId: "",
		duration: 0,
		imageUrl: "",
		audioUrl: ""
	});

	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const imageInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (songToEdit) {
			setSongData({
				title: songToEdit.title,
				artist: songToEdit.artist,
				albumId: songToEdit.albumId || "",
				duration: songToEdit.duration,
				imageUrl: songToEdit.imageUrl,
				audioUrl: songToEdit.audioUrl
			});
			setImagePreview(songToEdit.imageUrl);
		}
	}, [songToEdit]);

	const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async (e?: React.FormEvent) => {
		if (e) e.preventDefault();
		if (!songData.title || !songData.artist) {
			return toast.error("Please provide required fields");
		}

		setIsLoading(true);

		try {
			// Mocking API call for song edit
			await new Promise(resolve => setTimeout(resolve, 800));
			toast.success("Song updated successfully");
			onNavigate("songs");
		} catch (error: any) {
			toast.error("Failed to update song");
		} finally {
			setIsLoading(false);
		}
	};

	if (!songToEdit) {
		return (
			<div className="flex flex-col items-center justify-center p-20 text-center">
				<span className="material-symbols-outlined text-6xl text-slate-400 mb-4">music_off</span>
				<h2 className="text-2xl font-bold mb-2">Song Not Found</h2>
				<p className="text-slate-500 mb-6">The track you're trying to edit doesn't exist or was removed.</p>
				<button onClick={() => onNavigate("songs")} className="bg-primary text-white px-6 py-2 rounded-full font-bold">Go Back</button>
			</div>
		);
	}

	return (
		<div className="animate-in fade-in duration-500 max-w-6xl mx-auto w-full mb-12">
			{/* Page Title Section */}
			<div className="flex flex-col md:flex-row justify-between md:items-end mb-8 gap-4">
				<div>
					<nav className="flex gap-2 text-xs text-slate-500 mb-2 uppercase tracking-widest font-bold">
						<span className="hover:text-primary transition-colors cursor-pointer" onClick={() => onNavigate("dashboard")}>Dashboard</span>
						<span>/</span>
						<span className="hover:text-primary transition-colors cursor-pointer" onClick={() => onNavigate("songs")}>Songs</span>
						<span>/</span>
						<span className="text-primary/70">Edit Song</span>
					</nav>
					<h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2 text-slate-900 dark:text-white">
						Edit Track: <span className="text-primary italic">"{songToEdit.title}"</span>
					</h2>
					<p className="text-slate-500 text-lg">Manage song metadata, licensing, and media assets.</p>
				</div>
				<div className="flex gap-4 shrink-0">
					<button 
						onClick={() => onNavigate("songs")}
						className="px-6 py-2.5 rounded-full border-2 border-primary/20 hover:bg-primary/5 font-black text-sm text-slate-700 dark:text-slate-300 transition-all uppercase tracking-widest"
					>
						Discard
					</button>
					<button 
						onClick={handleSubmit}
						disabled={isLoading}
						className="px-6 py-2.5 rounded-full bg-primary text-white font-black text-sm hover:shadow-[0_0_20px_rgba(218,19,236,0.4)] transition-all disabled:opacity-50 uppercase tracking-widest"
					>
						{isLoading ? "Saving..." : "Save Changes"}
					</button>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Left Column: Form Fields */}
				<div className="lg:col-span-2 space-y-6">
					{/* Metadata Card */}
					<div className="bg-background-dark/30 border border-primary/10 backdrop-blur-md rounded-3xl p-8 shadow-sm">
						<h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
							<span className="material-symbols-outlined text-primary">info</span>
							Basic Information
						</h3>
						<div className="grid grid-cols-2 gap-6">
							<div className="col-span-2 sm:col-span-1">
								<label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">Song Title</label>
								<input 
									className="w-full bg-background-light dark:bg-black/20 border border-primary/10 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-primary/40 focus:border-primary/60 outline-none transition-all text-slate-900 dark:text-white font-medium" 
									type="text" 
									value={songData.title}
									onChange={e => setSongData({...songData, title: e.target.value})}
								/>
							</div>
							<div className="col-span-2 sm:col-span-1">
								<label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">Artist</label>
								<input 
									className="w-full bg-background-light dark:bg-black/20 border border-primary/10 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-primary/40 focus:border-primary/60 outline-none transition-all text-slate-900 dark:text-white font-medium" 
									type="text" 
									value={songData.artist}
									onChange={e => setSongData({...songData, artist: e.target.value})}
								/>
							</div>
							<div className="col-span-2 sm:col-span-1">
								<label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">Album (Optional)</label>
								<input 
									className="w-full bg-background-light dark:bg-black/20 border border-primary/10 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-primary/40 focus:border-primary/60 outline-none transition-all text-slate-900 dark:text-white font-medium" 
									type="text" 
									value={songData.albumId}
									onChange={e => setSongData({...songData, albumId: e.target.value})}
									placeholder="Album Name or Internal ID"
								/>
							</div>
							<div className="col-span-2 sm:col-span-1 relative">
								<label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">Genre</label>
								<select className="w-full bg-background-light dark:bg-black/20 border border-primary/10 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-primary/40 focus:border-primary/60 outline-none transition-all text-slate-900 dark:text-white font-medium appearance-none">
									<option>Synth-pop</option>
									<option>Indie Electronic</option>
									<option>Dream Pop</option>
									<option>Shoegaze</option>
									<option>Hip-Hop</option>
									<option>Classical</option>
									<option value="other">Other</option>
								</select>
								<span className="material-symbols-outlined absolute right-4 top-[38px] text-slate-400 pointer-events-none">expand_more</span>
							</div>
						</div>
					</div>

					{/* Lyrics Card */}
					<div className="bg-background-dark/30 border border-primary/10 backdrop-blur-md rounded-3xl p-8 shadow-sm">
						<div className="flex justify-between items-center mb-6">
							<h3 className="text-2xl font-black flex items-center gap-3 text-slate-900 dark:text-white">
								<span className="material-symbols-outlined text-primary">description</span>
								Lyrics
							</h3>
							<button className="text-xs text-primary font-black uppercase tracking-widest hover:underline hover:text-primary/80 transition-colors">Sync with Musixmatch</button>
						</div>
						<textarea 
							className="w-full bg-background-light dark:bg-black/20 border border-primary/10 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary/40 focus:border-primary/60 outline-none transition-all text-slate-900 dark:text-white font-mono text-sm leading-relaxed resize-y min-h-[200px]" 
							placeholder="Enter song lyrics here..." 
							defaultValue={`Waiting in a car
Waiting for a ride in the dark
The night city grows
Look at the horizon glow

Waiting in a car
Waiting for a ride in the dark...`}
						></textarea>
					</div>
				</div>

				{/* Right Column: Media Assets */}
				<div className="space-y-6">
					{/* Cover Art Card */}
					<div className="bg-background-dark/30 border border-primary/10 backdrop-blur-md rounded-3xl p-8 shadow-sm">
						<h3 className="text-xl font-black mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
							<span className="material-symbols-outlined text-primary">image</span>
							Cover Art
						</h3>
						<div 
							onClick={() => imageInputRef.current?.click()}
							className="relative group aspect-square rounded-2xl overflow-hidden mb-4 border border-primary/20 cursor-pointer shadow-lg"
						>
							<div 
								className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
								style={{ backgroundImage: `url('${imagePreview || 'https://via.placeholder.com/400'}')` }}
							></div>
							<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 backdrop-blur-sm">
								<div className="p-3 bg-primary rounded-full text-white shadow-[0_0_20px_rgba(218,19,236,0.6)]">
									<span className="material-symbols-outlined">edit</span>
								</div>
								<p className="text-xs font-black uppercase tracking-widest text-white">Change Cover</p>
							</div>
							<input 
								type="file" 
								ref={imageInputRef}
								onChange={handleImageSelect}
								accept="image/*"
								className="hidden" 
							/>
						</div>
						<p className="text-[10px] text-slate-500 text-center font-bold uppercase tracking-widest">Minimum 1400x1400px • JPG/PNG</p>
					</div>
					
					{/* Audio Assets Card */}
					<div className="bg-background-dark/30 border border-primary/10 backdrop-blur-md rounded-3xl p-8 shadow-sm">
						<h3 className="text-xl font-black mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
							<span className="material-symbols-outlined text-primary">audiotrack</span>
							Audio Files
						</h3>
						<div className="space-y-4">
							<div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 flex items-center justify-between shadow-sm">
								<div className="flex items-center gap-4">
									<span className="material-symbols-outlined text-primary text-2xl">graphic_eq</span>
									<div>
										<p className="text-sm font-black text-slate-900 dark:text-white">Main Master</p>
										<p className="text-[10px] text-primary mt-0.5 font-mono truncate max-w-[120px] sm:max-w-[180px]">{songData.audioUrl.split('/').pop() || 'audio_file.mp3'}</p>
									</div>
								</div>
								<button className="text-slate-400 hover:text-primary transition-colors hover:scale-110 active:scale-95">
									<span className="material-symbols-outlined text-2xl">cloud_upload</span>
								</button>
							</div>
							
							<div className="p-4 bg-background-light dark:bg-black/20 rounded-2xl border border-primary/10 flex items-center justify-between opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
								<div className="flex items-center gap-4">
									<span className="material-symbols-outlined text-slate-500 text-2xl">mic</span>
									<div>
										<p className="text-sm font-black text-slate-900 dark:text-white">Instrumental</p>
										<p className="text-[10px] text-slate-500 mt-0.5 uppercase tracking-widest font-bold">Not uploaded</p>
									</div>
								</div>
								<div className="text-slate-400 hover:text-primary transition-colors">
									<span className="material-symbols-outlined text-2xl">add_circle</span>
								</div>
							</div>
							
							<div className="pt-5 border-t border-primary/10 mt-2">
								<div className="flex justify-between text-xs mb-2">
									<span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Processing Status</span>
									<span className="text-green-500 font-black uppercase tracking-widest text-[10px]">Ready</span>
								</div>
								<div className="w-full bg-slate-200 dark:bg-white/5 h-2 rounded-full overflow-hidden">
									<div className="bg-primary w-full h-full shadow-[0_0_10px_rgba(218,19,236,0.6)] rounded-full"></div>
								</div>
							</div>
						</div>
					</div>

					{/* Stats Card */}
					<div className="bg-background-dark/30 border border-primary/10 backdrop-blur-md rounded-3xl p-8 shadow-sm">
						<h3 className="text-xl font-black mb-5 flex items-center gap-2 text-slate-900 dark:text-white">
							<span className="material-symbols-outlined text-primary">bolt</span>
							Quick Stats
						</h3>
						<div className="grid grid-cols-2 gap-4">
							<div className="bg-background-light dark:bg-black/20 border border-primary/5 p-4 rounded-2xl text-center">
								<p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Streams</p>
								<p className="text-xl font-black text-slate-900 dark:text-white italic">1.2M</p>
							</div>
							<div className="bg-primary/5 border border-primary/10 p-4 rounded-2xl text-center shadow-sm">
								<p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Revenue</p>
								<p className="text-xl font-black text-primary italic">$4,821</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditSong;
