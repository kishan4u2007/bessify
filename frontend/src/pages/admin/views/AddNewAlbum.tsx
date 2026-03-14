import { useState, useRef } from "react";
import { AdminView } from "../AdminPage";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";

interface AddNewAlbumProps {
	onNavigate: (view: AdminView) => void;
}

const AddNewAlbum = ({ onNavigate }: AddNewAlbumProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	
	const [newAlbum, setNewAlbum] = useState({
		title: "",
		artist: "",
		releaseYear: new Date().getFullYear(),
	});

	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);

	const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImageFile(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async () => {
		if (!imageFile) return toast.error("Please upload an album cover");
		if (!newAlbum.title || !newAlbum.artist) return toast.error("Please fill all required fields");

		setIsLoading(true);

		try {
			const formData = new FormData();
			formData.append("title", newAlbum.title);
			formData.append("artist", newAlbum.artist);
			formData.append("releaseYear", newAlbum.releaseYear.toString());
			formData.append("imageFile", imageFile);

			await axiosInstance.post("/admin/albums", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});

			toast.success("Album created successfully");
			onNavigate("albums");
		} catch (error: any) {
			toast.error("Failed to create album: " + error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="animate-in fade-in duration-500 max-w-5xl mx-auto w-full">
			{/* Page Title & Actions */}
			<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
				<div>
					<nav className="flex gap-2 text-xs text-slate-500 mb-2 uppercase tracking-widest font-bold">
						<span className="hover:text-primary transition-colors cursor-pointer" onClick={() => onNavigate("dashboard")}>Dashboard</span>
						<span>/</span>
						<span className="hover:text-primary transition-colors cursor-pointer" onClick={() => onNavigate("albums")}>Albums</span>
						<span>/</span>
						<span className="text-primary/70">Add New</span>
					</nav>
					<h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
						Add New <span className="text-primary">Album</span>
					</h2>
					<p className="text-slate-500 mt-2">Create and publish a new musical masterpiece to the platform.</p>
				</div>
				<div className="flex gap-3">
					<button 
						onClick={() => onNavigate("albums")}
						className="px-6 py-3 rounded-full border border-primary/20 hover:bg-primary/5 transition-all font-bold text-sm text-slate-900 dark:text-white"
					>
						Discard
					</button>
					<button 
						onClick={handleSubmit}
						disabled={isLoading}
						className="px-8 py-3 rounded-full bg-primary text-white shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all font-bold text-sm disabled:opacity-50 disabled:hover:scale-100"
					>
						{isLoading ? "Publishing..." : "Save & Publish"}
					</button>
				</div>
			</div>

			{/* Form Section */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Cover Upload */}
				<div className="lg:col-span-1">
					<div 
						onClick={() => fileInputRef.current?.click()}
						className={`bg-primary/5 rounded-xl p-6 h-full flex flex-col items-center justify-center border-dashed border-2 min-h-[400px] relative group cursor-pointer overflow-hidden transition-all ${imagePreview ? 'border-transparent' : 'border-primary/30 hover:border-primary/60'}`}
					>
						{imagePreview ? (
							<img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
						) : (
							<>
								<div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
								<span className="material-symbols-outlined text-primary text-6xl mb-4 group-hover:scale-110 transition-transform">add_a_photo</span>
								<p className="font-bold text-slate-900 dark:text-white">Album Cover</p>
								<p className="text-xs text-slate-500 text-center mt-2 px-4 leading-relaxed">
									Drag and drop or click to upload. 3000x3000px JPG/PNG recommended.
								</p>
							</>
						)}
						<input 
							type="file" 
							ref={fileInputRef}
							onChange={handleImageSelect}
							accept="image/*"
							className="absolute inset-0 opacity-0 cursor-pointer hidden" 
						/>
					</div>
				</div>

				{/* Details Fields */}
				<div className="lg:col-span-2 space-y-6">
					<div className="bg-primary/5 rounded-xl p-8 space-y-6 border border-primary/10">
						<div className="space-y-2">
							<label className="text-xs font-black uppercase tracking-widest text-primary/70">Album Title</label>
							<input 
								value={newAlbum.title}
								onChange={e => setNewAlbum({...newAlbum, title: e.target.value})}
								className="w-full bg-background-light dark:bg-background-dark border border-primary/10 rounded py-4 px-5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all text-lg font-medium text-slate-900 dark:text-white" 
								placeholder="e.g. Midnight Melodies" 
								type="text"
							/>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-2">
								<label className="text-xs font-black uppercase tracking-widest text-primary/70">Artist Name</label>
								<input 
									value={newAlbum.artist}
									onChange={e => setNewAlbum({...newAlbum, artist: e.target.value})}
									className="w-full bg-background-light dark:bg-background-dark border border-primary/10 rounded py-4 px-5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all text-slate-900 dark:text-white" 
									placeholder="e.g. Luna Eclipse" 
									type="text"
								/>
							</div>

							<div className="space-y-2">
								<label className="text-xs font-black uppercase tracking-widest text-primary/70">Release Year</label>
								<input 
									type="number"
									value={newAlbum.releaseYear}
									onChange={e => setNewAlbum({...newAlbum, releaseYear: parseInt(e.target.value) || new Date().getFullYear()})}
									min={1900}
									max={new Date().getFullYear() + 5}
									className="w-full bg-background-light dark:bg-background-dark border border-primary/10 rounded py-4 px-5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all text-slate-900 dark:text-white" 
								/>
							</div>
						</div>
					</div>

					<div className="bg-primary/5 rounded-xl p-8 border border-primary/10">
						<h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
							<span className="material-symbols-outlined text-primary">settings_suggest</span>
							Advanced Options
						</h3>
						<div className="space-y-4">
							<label className="flex items-center justify-between cursor-pointer group">
								<div>
									<p className="font-medium group-hover:text-primary transition-colors text-slate-900 dark:text-white">Enable Explicit Warning</p>
									<p className="text-xs text-slate-500">Apply the 'Parental Advisory' tag</p>
								</div>
								<div className="relative inline-flex items-center cursor-pointer">
									<input type="checkbox" className="sr-only peer" />
									<div className="w-11 h-6 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
								</div>
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddNewAlbum;
