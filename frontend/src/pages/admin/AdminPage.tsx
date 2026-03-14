import { useAuthStore } from "@/stores/useAuthStore";
import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { useMusicStore } from "@/stores/useMusicStore";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";

// Views
import AdminDashboard from "./views/AdminDashboard";
import SongsManagement from "./views/SongsManagement";
import ArtistsLibrary from "./views/ArtistsLibrary";
import AlbumsManagement from "./views/AlbumsManagement";
import PlaylistsManagement from "./views/PlaylistsManagement";
import UsersManagement from "./views/UsersManagement";
import PlatformAnalytics from "./views/PlatformAnalytics";
import AdminCommandCenter from "./views/AdminCommandCenter";
import AdminSettings from "./views/AdminSettings";
import AddNewAlbum from "./views/AddNewAlbum";
import AddNewSong from "./views/AddNewSong";
import AddNewArtist from "./views/AddNewArtist";
import EditSong from "./views/EditSong";

export type AdminView = 
  | "dashboard" 
  | "songs" 
  | "artists" 
  | "albums" 
  | "playlists" 
  | "users" 
  | "analytics" 
  | "commandCenter" 
  | "settings"
  | "addAlbum"
  | "addSong"
  | "addArtist"
  | "editSong";

const AdminPage = () => {
	const { isAdmin, isLoading, checkAdminStatus, user } = useAuthStore();
	const { fetchAlbums, fetchSongs, fetchStats } = useMusicStore();
	const [activeView, setActiveView] = useState<AdminView>("dashboard");
	const [editingSongId, setEditingSongId] = useState<string | null>(null);

	useEffect(() => {
		if (user) {
			checkAdminStatus();
		}
	}, [user, checkAdminStatus]);

	useEffect(() => {
		if (isAdmin) {
			fetchAlbums();
			fetchSongs();
			fetchStats();
		}
	}, [isAdmin, fetchAlbums, fetchSongs, fetchStats]);

	if (!user && !isLoading) {
		window.location.href = "/login";
		return null;
	}

	if (isLoading) return (
		<div className="h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
			<div className="flex flex-col items-center gap-4 text-center">
				<span className="material-symbols-outlined text-5xl text-primary animate-spin">refresh</span>
				<p className="text-slate-500">Checking admin access...</p>
			</div>
		</div>
	);

	if (!isAdmin) return (
		<div className="h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
			<div className="flex flex-col items-center gap-4 text-center p-8 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/40 max-w-md">
				<span className="material-symbols-outlined text-5xl text-red-500">no_accounts</span>
				<h2 className="text-xl font-bold text-red-600">Admin Access Required</h2>
				<div className="bg-white dark:bg-black/20 rounded-xl p-4 w-full text-left space-y-2 border border-red-100 dark:border-red-900/30">
					<p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your account:</p>
					<p className="font-bold text-primary text-sm">{auth.currentUser?.email || "Not logged in"}</p>
					<p className="text-xs text-slate-400 mt-2">This email is not in the admin list. Contact your admin to get access.</p>
				</div>
				<p className="text-slate-500 text-xs">Sign in with the admin email account to access this dashboard.</p>
				<div className="flex gap-3">
					<a href="/login" className="bg-primary text-white font-bold px-5 py-2 rounded-full text-sm hover:opacity-90 transition-opacity">Switch Account</a>
					<a href="/home" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold px-5 py-2 rounded-full text-sm hover:opacity-90 transition-opacity">Go Home</a>
				</div>
			</div>
		</div>
	);

	const handleNavigate = (view: AdminView, data?: any) => {
		if (view === "editSong" && data?.songId) {
			setEditingSongId(data.songId);
		}
		if (view !== "editSong") {
			setEditingSongId(null);
		}
		setActiveView(view);
	};

	const renderView = () => {
		switch (activeView) {
			case "dashboard": return <AdminDashboard onNavigate={handleNavigate} />;
			case "songs": return <SongsManagement onNavigate={handleNavigate} />;
			case "artists": return <ArtistsLibrary onNavigate={handleNavigate} />;
			case "albums": return <AlbumsManagement onNavigate={handleNavigate} />;
			case "playlists": return <PlaylistsManagement onNavigate={handleNavigate} />;
			case "users": return <UsersManagement />;
			case "analytics": return <PlatformAnalytics />;
			case "commandCenter": return <AdminCommandCenter onNavigate={handleNavigate} />;
			case "settings": return <AdminSettings />;
			case "addAlbum": return <AddNewAlbum onNavigate={handleNavigate} />;
			case "addSong": return <AddNewSong onNavigate={handleNavigate} />;
			case "addArtist": return <AddNewArtist onNavigate={handleNavigate} />;
			case "editSong": return <EditSong onNavigate={handleNavigate} songId={editingSongId} />;
			default: return <AdminDashboard onNavigate={handleNavigate} />;
		}
	};

	return (
		<div className="flex bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
			{/* We remove Topbar and just use the new full-screen admin layout structure */}
			<AdminSidebar activeView={activeView} setActiveView={handleNavigate} />
			<main className="flex-1 overflow-y-auto flex flex-col h-screen">
				<AdminHeader
					title={
						activeView === "dashboard" ? "System Overview" :
						activeView === "commandCenter" ? "Command Center" :
						activeView === "addSong" ? "Add New Song" :
						activeView === "addAlbum" ? "Add New Album" :
						activeView === "addArtist" ? "Onboard Artist" :
						activeView === "editSong" ? "Edit Song" :
						activeView.charAt(0).toUpperCase() + activeView.slice(1)
					}
					onNavigate={handleNavigate}
				/>
				<div className="p-8 flex-1">
					{renderView()}
				</div>
			</main>
		</div>
	);
};

export default AdminPage;
