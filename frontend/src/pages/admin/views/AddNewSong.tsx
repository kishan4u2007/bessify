import { useState, useRef } from "react";
import { AdminView } from "../AdminPage";
import { axiosInstance } from "@/lib/axios";
import { useMusicStore } from "@/stores/useMusicStore";
import toast from "react-hot-toast";

interface AddNewSongProps {
	onNavigate: (view: AdminView) => void;
}

const AddNewSong = ({ onNavigate }: AddNewSongProps) => {
	const { albums } = useMusicStore();
	const [isLoading, setIsLoading] = useState(false);
	
	const [newSong, setNewSong] = useState({
		title: "",
		artist: "",
		album: "none",
		duration: "0",
	});

	const [files, setFiles] = useState<{ audio: File | null; image: File | null }>({
		audio: null,
		image: null,
	});

	const [imagePreview, setImagePreview] = useState<string | null>(null);

	const audioInputRef = useRef<HTMLInputElement>(null);
	const imageInputRef = useRef<HTMLInputElement>(null);

	const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setFiles(prev => ({ ...prev, image: file }));
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleAudioSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setFiles(prev => ({ ...prev, audio: file }));
		}
	};

	const handleSubmit = async (e?: React.FormEvent) => {
		if (e) e.preventDefault();
		if (!files.audio || !files.image) {
			return toast.error("Please upload both audio and image files");
		}
		if (!newSong.title || !newSong.artist || !newSong.duration) {
			return toast.error("Please fill all required fields");
		}

		setIsLoading(true);

		try {
			const formData = new FormData();
			formData.append("title", newSong.title);
			formData.append("artist", newSong.artist);
			formData.append("duration", newSong.duration);
			if (newSong.album && newSong.album !== "none") {
				formData.append("albumId", newSong.album);
			}

			formData.append("audioFile", files.audio);
			formData.append("imageFile", files.image);

			await axiosInstance.post("/admin/songs", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});

			toast.success("Song published successfully");
			onNavigate("songs");
		} catch (error: any) {
			toast.error("Failed to add song: " + error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="animate-in fade-in duration-500 max-w-5xl mx-auto w-full">
			<div className="mb-10">
				<nav className="flex gap-2 text-xs text-slate-500 mb-2 uppercase tracking-widest font-bold">
					<span className="hover:text-primary transition-colors cursor-pointer" onClick={() => onNavigate("dashboard")}>Dashboard</span>
					<span>/</span>
					<span className="hover:text-primary transition-colors cursor-pointer" onClick={() => onNavigate("songs")}>Music Library</span>
					<span>/</span>
					<span className="text-primary/70">Add New</span>
				</nav>
				<h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-2">Add New Song</h2>
				<p className="text-slate-500 dark:text-slate-400">Fill in the metadata and upload your high-quality assets to publish.</p>
			</div>

			<form className="space-y-8" onSubmit={handleSubmit}>
				{/* Section: Song Information */}
				<div className="bg-primary/5 rounded-xl p-8 border border-primary/10">
					<div className="flex items-center gap-2 mb-6 text-primary">
						<span className="material-symbols-outlined">info</span>
						<h3 className="text-xl font-bold dark:text-white">Song Information</h3>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-2">
							<label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Song Title</label>
							<input 
								value={newSong.title}
								onChange={e => setNewSong({...newSong, title: e.target.value})}
								required
								className="w-full bg-background-light dark:bg-background-dark border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary rounded px-4 py-3 outline-none transition-all dark:text-white" 
								placeholder="e.g. Midnight City" 
								type="text"
							/>
						</div>
						
						<div className="space-y-2">
							<label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Artist</label>
							<input 
								value={newSong.artist}
								onChange={e => setNewSong({...newSong, artist: e.target.value})}
								required
								className="w-full bg-background-light dark:bg-background-dark border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary rounded px-4 py-3 outline-none transition-all dark:text-white" 
								placeholder="Artist Name" 
								type="text"
							/>
						</div>
						
						<div className="space-y-2">
							<label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Album (Optional)</label>
							<select 
								value={newSong.album}
								onChange={e => setNewSong({...newSong, album: e.target.value})}
								className="w-full bg-background-light dark:bg-background-dark border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary rounded px-4 py-3 outline-none transition-all dark:text-white appearance-none cursor-pointer"
							>
								<option value="none">No Album (Single)</option>
								{albums.map((a) => (
									<option key={a._id} value={a._id}>{a.title}</option>
								))}
							</select>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Duration (seconds)</label>
							<input 
								type="number"
								min="0"
								required
								value={newSong.duration}
								onChange={e => setNewSong({...newSong, duration: e.target.value})}
								className="w-full bg-background-light dark:bg-background-dark border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary rounded px-4 py-3 outline-none transition-all dark:text-white" 
								placeholder="e.g. 215 for 3m 35s" 
							/>
						</div>
					</div>
				</div>

				{/* Section: Media Upload */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* Cover Upload */}
					<div className="bg-primary/5 rounded-xl p-8 flex flex-col items-center text-center border border-primary/10">
						<div className="flex items-center gap-2 mb-6 text-primary w-full text-left">
							<span className="material-symbols-outlined">image</span>
							<h3 className="text-xl font-bold dark:text-white">Cover Image</h3>
						</div>
						
						<div 
							onClick={() => imageInputRef.current?.click()}
							className="w-48 h-48 rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer hover:border-primary/60 transition-colors"
						>
							{imagePreview ? (
								<>
									<img src={imagePreview} className="absolute inset-0 w-full h-full object-cover" alt="Preview"/>
									<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
										<span className="material-symbols-outlined text-white text-3xl">edit</span>
									</div>
								</>
							) : (
								<>
									<span className="material-symbols-outlined text-4xl text-primary/40 group-hover:scale-110 transition-transform">add_photo_alternate</span>
									<p className="text-xs text-slate-500 mt-2 font-medium px-4 dark:text-slate-400">Drag cover art or click to browse</p>
								</>
							)}
							<input 
								type="file" 
								ref={imageInputRef}
								onChange={handleImageSelect}
								accept="image/*"
								className="absolute inset-0 opacity-0 cursor-pointer hidden" 
							/>
						</div>
						<div className="mt-4 text-xs text-slate-500">
							JPG, PNG (Min 1500x1500px recommended)
						</div>
					</div>

					{/* Audio Upload */}
					<div className="bg-primary/5 rounded-xl p-8 border border-primary/10">
						<div className="flex items-center gap-2 mb-6 text-primary">
							<span className="material-symbols-outlined">cloud_upload</span>
							<h3 className="text-xl font-bold dark:text-white">Audio Track</h3>
						</div>

						<div 
							onClick={() => audioInputRef.current?.click()}
							className={`w-full h-48 rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 flex flex-col items-center justify-center relative group cursor-pointer hover:border-primary/60 transition-colors ${files.audio ? 'border-emerald-500/50 bg-emerald-500/5' : ''}`}
						>
							{files.audio ? (
								<>
									<span className="material-symbols-outlined text-4xl text-emerald-500 mb-2">check_circle</span>
									<p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Audio ready</p>
									<p className="text-xs text-slate-500 truncate max-w-[80%] mt-1">{files.audio.name}</p>
								</>
							) : (
								<>
									<span className="material-symbols-outlined text-4xl text-primary/40 group-hover:scale-110 transition-transform">audio_file</span>
									<p className="text-sm font-semibold mt-2 dark:text-white">Upload audio file</p>
									<p className="text-xs text-slate-500">MP3 or AAC only, max 50MB</p>
								</>
							)}
							<input 
								type="file" 
								ref={audioInputRef}
								onChange={handleAudioSelect}
								accept="audio/*"
								className="absolute inset-0 opacity-0 cursor-pointer hidden" 
							/>
						</div>
					</div>
				</div>

				{/* Actions */}
				<div className="flex items-center justify-end gap-4 py-6 border-t border-primary/10">
					<button 
						type="button"
						onClick={() => onNavigate("songs")}
						className="px-8 py-3 rounded font-bold text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
					>
						Cancel
					</button>
					<button 
						type="submit"
						disabled={isLoading}
						className="px-10 py-3 rounded-full bg-primary text-white font-bold shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
					>
						{isLoading ? "Publishing..." : "Publish Song"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddNewSong;
