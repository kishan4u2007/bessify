import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/stores/useAuthStore";
import { AdminView } from "../AdminPage";
import { Link, useNavigate } from "react-router-dom";

interface AdminSidebarProps {
	activeView: AdminView;
	setActiveView: (view: AdminView) => void;
}

const AdminSidebar = ({ activeView, setActiveView }: AdminSidebarProps) => {
	const { user } = useAuthStore();
	const navigate = useNavigate();

	const handleSignOut = () => {
		auth.signOut();
		navigate("/");
	};

	const navItems = [
		{ id: "dashboard", label: "Dashboard", icon: "dashboard" },
		{ id: "songs", label: "Songs", icon: "library_music" },
		{ id: "artists", label: "Artists", icon: "person_pin" },
		{ id: "albums", label: "Albums", icon: "album" },
		{ id: "playlists", label: "Playlists", icon: "featured_play_list" },
		{ id: "users", label: "Users", icon: "group" },
	];

	const analysisItems = [
		{ id: "commandCenter", label: "Command Center", icon: "terminal" },
		{ id: "analytics", label: "Platform Analytics", icon: "monitoring" },
		{ id: "settings", label: "Profile Settings", icon: "settings" },
	];

	return (
		<aside className="w-72 bg-background-light dark:bg-background-dark border-r border-primary/10 flex-col hidden lg:flex h-screen shrink-0">
			<div className="p-6 flex items-center gap-3">
				<div className="size-10 rounded-full bg-primary flex items-center justify-center text-white">
					<span className="material-symbols-outlined">electric_bolt</span>
				</div>
				<div>
					<h1 className="text-xl font-bold tracking-tight text-primary">Bessify</h1>
					<p className="text-xs text-slate-500 dark:text-slate-400">Admin Console</p>
				</div>
			</div>
			
			<nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
				{navItems.map((item) => (
					<div
						key={item.id}
						onClick={() => setActiveView(item.id as AdminView)}
						className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${
							activeView === item.id
								? "bg-gradient-to-r from-primary/20 to-primary/5 border-l-4 border-primary text-primary"
								: "text-slate-600 dark:text-slate-400 hover:bg-primary/10"
						}`}
					>
						<span className="material-symbols-outlined">{item.icon}</span>
						<span className="font-medium">{item.label}</span>
					</div>
				))}

				<div className="pt-6 pb-2 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
					Analysis
				</div>
				
				{analysisItems.map((item) => (
					<div
						key={item.id}
						onClick={() => setActiveView(item.id as AdminView)}
						className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${
							activeView === item.id
								? "bg-gradient-to-r from-primary/20 to-primary/5 border-l-4 border-primary text-primary"
								: "text-slate-600 dark:text-slate-400 hover:bg-primary/10"
						}`}
					>
						<span className="material-symbols-outlined">{item.icon}</span>
						<span className="font-medium">{item.label}</span>
					</div>
				))}
				
				<div className="pt-4 border-t border-primary/10 mt-4">
					<Link
						to="/home"
						className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-primary/10 transition-colors cursor-pointer"
					>
						<span className="material-symbols-outlined">home</span>
						<span className="font-medium">Return to App</span>
					</Link>
					<div
						onClick={handleSignOut}
						className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer mt-1"
					>
						<span className="material-symbols-outlined">logout</span>
						<span className="font-medium">Sign Out</span>
					</div>
				</div>
			</nav>

			<div className="p-6 border-t border-primary/10 bg-background-light dark:bg-background-dark">
				<div className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/10 rounded-xl backdrop-blur-md">
					<img 
						className="size-10 rounded-full border border-primary/30 object-cover bg-slate-200"
						alt="Admin profile" 
						src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || user?.email || "Admin")}&background=da13ec&color=fff`}
					/>
					<div className="overflow-hidden">
						<p className="text-sm font-bold truncate text-slate-900 dark:text-white">
							{user?.displayName || user?.email?.split('@')[0] || "Admin"}
						</p>
						<p className="text-xs text-slate-500 truncate mt-0.5">Super Admin</p>
					</div>
				</div>
			</div>
		</aside>
	);
};

export default AdminSidebar;
