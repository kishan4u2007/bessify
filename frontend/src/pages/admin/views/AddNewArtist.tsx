import { useState, useRef } from "react";
import { AdminView } from "../AdminPage";
import toast from "react-hot-toast";

interface AddNewArtistProps {
	onNavigate: (view: AdminView) => void;
}

const AddNewArtist = ({ onNavigate }: AddNewArtistProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const [artistData, setArtistData] = useState({
		name: "",
		bio: "",
		genres: "",
		instagram: "",
		twitter: "",
		website: "",
	});
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const imageInputRef = useRef<HTMLInputElement>(null);

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
		if (!artistData.name) {
			return toast.error("Please provide the artist's stage name");
		}

		setIsLoading(true);

		try {
			// Mocking API call for artist creation
			await new Promise(resolve => setTimeout(resolve, 800));
			toast.success("Artist profile created successfully");
			onNavigate("artists");
		} catch (error: any) {
			toast.error("Failed to create artist profile");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="animate-in fade-in duration-500 max-w-5xl mx-auto w-full">
			{/* Breadcrumbs & Title */}
			<div className="mb-8">
				<nav className="flex text-sm text-slate-500 mb-2 gap-2 font-bold uppercase tracking-widest text-[10px]">
					<span className="hover:text-primary cursor-pointer transition-colors" onClick={() => onNavigate("dashboard")}>Dashboard</span>
					<span>/</span>
					<span className="hover:text-primary cursor-pointer transition-colors" onClick={() => onNavigate("artists")}>Artists</span>
					<span>/</span>
					<span className="text-primary/70">Add New Artist</span>
				</nav>
				<h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100 mb-2">Add New Artist</h1>
				<p className="text-slate-500">Configure the public profile for a new talent in your catalog.</p>
			</div>

			<form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Form Column */}
				<div className="lg:col-span-2 space-y-8">
					{/* Artist Information */}
					<section className="bg-primary/5 border border-primary/10 rounded-xl p-8 shadow-sm">
						<h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
							<span className="material-symbols-outlined text-primary">info</span>
							Artist Information
						</h2>
						<div className="space-y-6">
							<div>
								<label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Stage Name</label>
								<input 
									required
									value={artistData.name}
									onChange={(e) => setArtistData({...artistData, name: e.target.value})}
									className="w-full bg-background-light dark:bg-background-dark border border-primary/20 rounded px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-slate-900 dark:text-slate-100" 
									placeholder="e.g. Luna Eclipse" 
									type="text"
								/>
							</div>
							<div>
								<label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Biography</label>
								<textarea 
									value={artistData.bio}
									onChange={(e) => setArtistData({...artistData, bio: e.target.value})}
									className="w-full bg-background-light dark:bg-background-dark border border-primary/20 rounded px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-slate-900 dark:text-slate-100 resize-none" 
									placeholder="Tell the artist's story..." 
									rows={4}
								></textarea>
							</div>
							<div>
								<label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Genres</label>
								<div className="flex flex-wrap gap-2 mb-3">
									<span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/20 flex items-center gap-1">
										Pop <span className="material-symbols-outlined text-xs cursor-pointer hover:text-white transition-colors">close</span>
									</span>
									<span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/20 flex items-center gap-1">
										Electronic <span className="material-symbols-outlined text-xs cursor-pointer hover:text-white transition-colors">close</span>
									</span>
								</div>
								<input 
									value={artistData.genres}
									onChange={(e) => setArtistData({...artistData, genres: e.target.value})}
									className="w-full bg-background-light dark:bg-background-dark border border-primary/20 rounded px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-slate-900 dark:text-slate-100" 
									placeholder="Type genre and press Enter..." 
									type="text"
								/>
							</div>
						</div>
					</section>

					{/* Social Presence */}
					<section className="bg-primary/5 border border-primary/10 rounded-xl p-8 shadow-sm">
						<h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
							<span className="material-symbols-outlined text-primary">public</span>
							Social Presence
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Instagram</label>
								<div className="flex">
									<span className="inline-flex items-center px-4 rounded-l border border-r-0 border-primary/20 bg-background-light dark:bg-primary/10 text-slate-500 text-sm italic">@</span>
									<input 
										value={artistData.instagram}
										onChange={(e) => setArtistData({...artistData, instagram: e.target.value})}
										className="flex-1 min-w-0 bg-background-light dark:bg-background-dark border border-primary/20 rounded-r px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-slate-900 dark:text-slate-100" 
										placeholder="username" 
										type="text"
									/>
								</div>
							</div>
							<div>
								<label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Twitter (X)</label>
								<div className="flex">
									<span className="inline-flex items-center px-4 rounded-l border border-r-0 border-primary/20 bg-background-light dark:bg-primary/10 text-slate-500 text-sm italic">@</span>
									<input 
										value={artistData.twitter}
										onChange={(e) => setArtistData({...artistData, twitter: e.target.value})}
										className="flex-1 min-w-0 bg-background-light dark:bg-background-dark border border-primary/20 rounded-r px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-slate-900 dark:text-slate-100" 
										placeholder="username" 
										type="text"
									/>
								</div>
							</div>
							<div className="md:col-span-2">
								<label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Official Website</label>
								<input 
									value={artistData.website}
									onChange={(e) => setArtistData({...artistData, website: e.target.value})}
									className="w-full bg-background-light dark:bg-background-dark border border-primary/20 rounded px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-slate-900 dark:text-slate-100" 
									placeholder="https://lunaeclipse.com" 
									type="url"
								/>
							</div>
						</div>
					</section>
				</div>

				{/* Right Column: Media */}
				<div className="space-y-8">
					<section className="bg-primary/5 border border-primary/10 rounded-xl p-8 shadow-sm">
						<h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
							<span className="material-symbols-outlined text-primary">image</span>
							Profile Media
						</h2>
						<div className="space-y-6">
							<div 
								onClick={() => imageInputRef.current?.click()}
								className="aspect-square w-full rounded-xl bg-background-light dark:bg-primary/5 border-2 border-dashed border-primary/30 flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-primary/10 hover:border-primary/60 transition-colors group relative overflow-hidden"
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
										<div className="size-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
											<span className="material-symbols-outlined text-3xl text-primary">cloud_upload</span>
										</div>
										<p className="font-semibold text-sm dark:text-white">Upload Profile Image</p>
										<p className="text-xs text-slate-500 mt-1 dark:text-slate-400">Min 1080x1080px. JPG or PNG.</p>
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

							<div className="p-4 rounded bg-primary/10 border border-primary/20">
								<h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-3">Cover Art Preview</h3>
								<div className="relative rounded-lg overflow-hidden h-32 bg-slate-200 dark:bg-slate-800">
									{imagePreview ? (
										<img className="w-full h-full object-cover" src={imagePreview} alt="Preview" />
									) : (
										<div className="w-full h-full bg-gradient-to-r from-primary/40 to-purple-600/40 opacity-50"></div>
									)}
									<div className="absolute inset-0 flex items-center justify-center">
										<span className="text-xs font-medium text-slate-900 dark:text-slate-100 bg-white/50 dark:bg-black/40 backdrop-blur px-3 py-1 rounded-full border border-white/30 hidden">Preview</span>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className="bg-primary/10 border border-primary/20 rounded-xl p-6 shadow-sm">
						<div className="flex items-start gap-4">
							<div className="size-10 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center">
								<span className="material-symbols-outlined text-primary">verified</span>
							</div>
							<div>
								<h3 className="font-bold text-slate-900 dark:text-white">Verification</h3>
								<p className="text-sm text-slate-500 mt-1 leading-relaxed">Verified artists receive a badge and premium listing on the platform.</p>
								<label className="inline-flex items-center mt-4 cursor-pointer">
									<input type="checkbox" className="sr-only peer"/>
									<div className="relative w-11 h-6 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
									<span className="ms-3 text-sm font-medium text-slate-900 dark:text-slate-100">Apply for Verification</span>
								</label>
							</div>
						</div>
					</section>

					<div className="flex flex-col gap-3">
						<button 
							type="submit"
							disabled={isLoading}
							className="w-full py-4 rounded-xl bg-primary text-white font-bold text-lg shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
						>
							{isLoading ? "Saving..." : "Save Artist Profile"}
						</button>
						<button 
							type="button"
							onClick={() => onNavigate("artists")}
							className="w-full py-4 rounded-xl bg-transparent border border-slate-300 dark:border-primary/20 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-primary/5 transition-all"
						>
							Discard Draft
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddNewArtist;
