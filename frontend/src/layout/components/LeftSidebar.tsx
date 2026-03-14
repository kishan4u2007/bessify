import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const LeftSidebar = () => {
	const { albums, fetchAlbums, isLoading } = useMusicStore();
	const { user } = useAuthStore();
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		fetchAlbums();
	}, [fetchAlbums]);

	const navLink = (to: string, icon: string, label: string) => (
		<Link
			key={to}
			to={to}
			className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${location.pathname === to
				? 'bg-primary/10 text-primary font-bold'
				: 'hover:bg-primary/5 text-slate-600 dark:text-slate-400 hover:text-primary'
				}`}
		>
			<span className='material-symbols-outlined text-[20px]'>{icon}</span>
			<span className="hidden md:inline">{label}</span>
		</Link>
	);

	return (
		<div className='h-full flex flex-col border-r border-primary/10 bg-background-light dark:bg-background-dark overflow-hidden'>
			{/* Logo */}
			<div className='p-4 sm:p-5 pb-3 shrink-0'>
				<Link to={user ? "/home" : "/"} className='flex items-center gap-3 px-2'>
					<div className='h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-purple-400 flex flex-shrink-0 items-center justify-center shadow-lg shadow-primary/20'>
						<span className='material-symbols-outlined text-white'>electric_bolt</span>
					</div>
					<div className="hidden md:block">
						<h1 className='text-xl font-black tracking-tight text-slate-900 dark:text-white'>Bessify</h1>
						<p className='text-[10px] text-primary font-medium uppercase tracking-widest leading-none'>Vibe Together</p>
					</div>
				</Link>
			</div>

			{/* Main Navigation */}
			<nav className='flex flex-col gap-1 px-2 sm:px-3 shrink-0'>
				{navLink("/home", "home", "Home")}
				{navLink("/search", "search", "Search")}
				{navLink("/library", "library_music", "Library")}
				{navLink("/liked", "favorite", "Liked Songs")}
				{navLink("/chat", "groups", "Listening Rooms")}
				{user && navLink("/profile", "person", "Profile")}
				{user && navLink("/notifications", "notifications", "Notifications")}
				{user && navLink("/admin", "admin_panel_settings", "Admin")}
			</nav>

			{/* Divider */}
			<div className='mx-4 my-3 border-t border-primary/10 shrink-0' />

			{/* Albums section label */}
			<div className='px-5 shrink-0'>
				<p className='text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2'>Albums</p>
			</div>

			{/* Scrollable albums list — takes remaining space */}
			<div className='flex-1 min-h-0 px-2 sm:px-3'>
				<ScrollArea className='h-full'>
					<div className='space-y-1 pb-2'>
						{isLoading ? (
							<PlaylistSkeleton />
						) : (
							albums.map((album) => (
								<Link
									to={`/albums/${album._id}`}
									key={album._id}
									className={`px-3 py-2 hover:bg-primary/5 rounded-xl flex items-center gap-3 group cursor-pointer transition-colors ${location.pathname === `/albums/${album._id}` ? 'bg-primary/10' : ''}`}
								>
									<img
										src={album.imageUrl}
										alt='Album'
										className='size-10 rounded-lg flex-shrink-0 object-cover shadow-sm'
									/>
									<div className='flex-1 min-w-0 hidden md:block'>
										<p className='font-bold text-sm text-slate-900 dark:text-white truncate group-hover:text-primary transition-colors'>{album.title}</p>
										<p className='text-xs text-slate-500 truncate'>{album.artist}</p>
									</div>
								</Link>
							))
						)}
					</div>
				</ScrollArea>
			</div>

			{/* Upgrade to Pro Banner — fixed at bottom, never overlaps */}
			<div className='p-3 shrink-0 hidden md:block'>
				<div className='p-3 rounded-xl bg-gradient-to-br from-primary/20 to-purple-900/40 border border-primary/20'>
					<p className='text-xs font-bold text-primary uppercase mb-1'>✨ Go Premium</p>
					<p className='text-[10px] text-slate-600 dark:text-slate-300 mb-2 leading-relaxed'>Unlock spatial audio, offline & private rooms.</p>
					<button
						onClick={() => navigate("/settings")}
						className='w-full bg-primary hover:bg-primary/90 py-1.5 rounded-lg text-white text-xs font-bold shadow-lg shadow-primary/30 transition-all hover:scale-105'
					>
						Upgrade Now →
					</button>
				</div>
			</div>
		</div>
	);
};
export default LeftSidebar;
