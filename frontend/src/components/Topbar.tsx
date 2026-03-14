import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { auth } from "@/lib/firebase";
import { useState, useRef, useEffect } from "react";

const Topbar = ({ className }: { className?: string }) => {
	const { isAdmin, user } = useAuthStore();
	const navigate = useNavigate();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleSignOut = () => {
		auth.signOut();
		setDropdownOpen(false);
		navigate("/");
	};

	// Close dropdown on outside click
	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
				setDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, []);

	return (
		<div className={cn('flex items-center justify-between p-4 px-6 md:px-8 bg-background-light dark:bg-background-dark z-10', className)}>
			{/* Mobile Logo */}
			<Link to={user ? "/home" : "/"} className='flex gap-2 items-center md:hidden'>
				<div className='h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-purple-400 flex flex-shrink-0 items-center justify-center shadow-lg shadow-primary/20'>
					<span className='material-symbols-outlined text-white text-sm'>electric_bolt</span>
				</div>
				<span className="font-black tracking-tight text-slate-900 dark:text-white">Bessify</span>
			</Link>

			<div className='hidden md:block'></div>

			<div className='flex items-center gap-4'>
				{/* Admin Dashboard Button */}
				{isAdmin && (
					<Link to={"/admin"} className={cn(buttonVariants({ variant: "outline" }), "border-primary/30 hover:bg-primary/10 text-primary")}>
						<span className='material-symbols-outlined text-sm mr-2'>dashboard</span>
						Admin Dashboard
					</Link>
				)}

				{!user ? (
					<Link to="/login" className={cn(buttonVariants({ variant: "default" }), "bg-primary hover:bg-primary/90 text-white rounded-full")}>
						Sign In
					</Link>
				) : (
					<div className="flex items-center gap-3">
						{/* Notifications */}
						<Link to="/notifications" className="h-10 w-10 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary/10 transition-colors">
							<span className="material-symbols-outlined text-sm text-slate-900 dark:text-white">notifications</span>
						</Link>

						{/* User Avatar with dropdown */}
						<div className="relative" ref={dropdownRef}>
							<button
								onClick={() => setDropdownOpen(prev => !prev)}
								className="h-10 w-10 rounded-full overflow-hidden border-2 border-primary/30 transition-transform hover:scale-105 hover:border-primary"
								title="Account menu"
							>
								<img src={user.photoURL || "/spotify.png"} alt="User Avatar" className="w-full h-full object-cover" />
							</button>

							{/* Dropdown Menu */}
							{dropdownOpen && (
								<div className="absolute right-0 top-12 w-52 bg-white dark:bg-[#1a0b25] border border-primary/20 rounded-2xl shadow-2xl shadow-primary/20 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
									<div className="px-4 py-3 border-b border-primary/10">
										<p className="font-bold text-sm truncate text-slate-900 dark:text-white">{user.displayName || "User"}</p>
										<p className="text-xs text-slate-500 truncate">{user.email}</p>
									</div>
									<Link
										to="/profile"
										onClick={() => setDropdownOpen(false)}
										className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-primary/10 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors"
									>
										<span className="material-symbols-outlined text-sm">person</span>
										Profile
									</Link>
									<Link
										to="/library"
										onClick={() => setDropdownOpen(false)}
										className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-primary/10 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors"
									>
										<span className="material-symbols-outlined text-sm">library_music</span>
										Library
									</Link>
									<Link
										to="/settings"
										onClick={() => setDropdownOpen(false)}
										className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-primary/10 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors"
									>
										<span className="material-symbols-outlined text-sm">settings</span>
										Settings
									</Link>
									<Link
										to="/admin"
										onClick={() => setDropdownOpen(false)}
										className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-primary/10 text-primary font-medium transition-colors"
									>
										<span className="material-symbols-outlined text-sm">admin_panel_settings</span>
										Admin Dashboard
									</Link>
									<div className="border-t border-primary/10 mt-1 pt-1">
										<button
											onClick={handleSignOut}
											className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors w-full text-left"
										>
											<span className="material-symbols-outlined text-sm">logout</span>
											Sign Out
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
export default Topbar;
