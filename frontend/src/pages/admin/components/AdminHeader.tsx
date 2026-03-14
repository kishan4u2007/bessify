import { useState } from "react";
import { AdminView } from "../AdminPage";

interface AdminHeaderProps {
	title: string;
	onNavigate?: (view: AdminView) => void;
}

const AdminHeader = ({ title, onNavigate }: AdminHeaderProps) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [showNotifications, setShowNotifications] = useState(false);

	return (
		<header className="sticky top-0 z-30 flex items-center justify-between px-8 py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
			<div className="flex items-center gap-4">
				<button className="lg:hidden text-slate-400 hover:text-primary transition-colors">
					<span className="material-symbols-outlined">menu</span>
				</button>
				<h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
					{title}
				</h2>
			</div>
			<div className="flex items-center gap-4">
				{/* Search */}
				<div className="relative hidden md:block group">
					<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-[20px]">
						search
					</span>
					<input
						className="bg-primary/5 border border-primary/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-full pl-10 pr-4 py-2 w-64 text-sm outline-none text-slate-900 dark:text-white placeholder:text-slate-500 transition-all"
						placeholder="Search catalog..."
						type="text"
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						onKeyDown={e => {
							if (e.key === "Enter" && searchQuery.trim()) {
								// Could dispatch a global search event here
							}
						}}
					/>
					{searchQuery && (
						<button
							onClick={() => setSearchQuery("")}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
						>
							<span className="material-symbols-outlined text-[18px]">close</span>
						</button>
					)}
				</div>

				<div className="flex items-center gap-2">
					{/* Notifications */}
					<div className="relative">
						<button
							onClick={() => setShowNotifications(!showNotifications)}
							className="size-10 flex items-center justify-center rounded-full bg-primary/5 border border-primary/10 text-slate-500 dark:text-slate-400 hover:text-primary hover:border-primary/30 transition-colors relative"
						>
							<span className="material-symbols-outlined">notifications</span>
							<span className="absolute top-1.5 right-1.5 size-2 bg-primary rounded-full border-2 border-background-light dark:border-background-dark shadow-[0_0_6px_rgba(218,19,236,0.8)]"></span>
						</button>
						{showNotifications && (
							<div className="absolute right-0 top-14 w-80 bg-background-light dark:bg-background-dark border border-primary/20 rounded-2xl shadow-2xl shadow-primary/10 z-50 overflow-hidden">
								<div className="p-4 border-b border-primary/10 flex items-center justify-between">
									<h4 className="font-black text-slate-900 dark:text-white">Notifications</h4>
									<span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-full">3 New</span>
								</div>
								{[
									{ icon: "music_note", text: "New song uploaded by admin", time: "2m ago", color: "primary" },
									{ icon: "person_add", text: "New artist onboarding request", time: "15m ago", color: "blue" },
									{ icon: "album", text: "Album reviewed successfully", time: "1h ago", color: "green" },
								].map((n, i) => (
									<div key={i} className="p-4 hover:bg-primary/5 transition-colors cursor-pointer border-b border-primary/5 last:border-0">
										<div className="flex items-start gap-3">
											<div className={`p-2 rounded-xl ${n.color === 'primary' ? 'bg-primary/10 text-primary' : n.color === 'blue' ? 'bg-blue-500/10 text-blue-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
												<span className="material-symbols-outlined text-[18px]">{n.icon}</span>
											</div>
											<div>
												<p className="text-sm font-medium text-slate-900 dark:text-white">{n.text}</p>
												<p className="text-xs text-slate-500 mt-0.5">{n.time}</p>
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</div>

					{/* Add button — opens addSong by default */}
					<button
						onClick={() => onNavigate?.("addSong")}
						className="size-10 flex items-center justify-center rounded-full bg-primary text-white hover:opacity-90 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
						title="Add New Song"
					>
						<span className="material-symbols-outlined">add</span>
					</button>
				</div>
			</div>
		</header>
	);
};

export default AdminHeader;
