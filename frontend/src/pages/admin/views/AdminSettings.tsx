import { useAuthStore } from "@/stores/useAuthStore";
import toast from "react-hot-toast";

const AdminSettings = () => {
	const { user } = useAuthStore();

	const handleSave = () => {
		toast.success("Settings saved successfully");
	};

	return (
		<div className="animate-in fade-in duration-500 max-w-5xl mx-auto w-full mb-12">
			{/* Profile Hero Section */}
			<div className="bg-primary/5 border border-primary/10 rounded-3xl p-8 mb-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
				<div className="relative">
					<div className="size-32 rounded-full border-4 border-primary/20 p-1 bg-background-light dark:bg-background-dark">
						<img 
							className="w-full h-full rounded-full object-cover shadow-2xl" 
							src={user?.imageUrl || "https://xsgames.co/randomusers/avatar.php?g=female&1"} 
							alt={user?.fullName || "Admin"}
						/>
					</div>
					<button className="absolute bottom-0 right-0 bg-primary p-2.5 rounded-full text-white shadow-lg border-4 border-background-light dark:border-background-dark hover:scale-105 transition-transform">
						<span className="material-symbols-outlined text-sm">photo_camera</span>
					</button>
				</div>
				<div className="flex-1 text-center md:text-left">
					<h2 className="text-3xl font-black mb-1.5 text-slate-900 dark:text-white">{user?.fullName || "Bessify Admin"}</h2>
					<p className="text-slate-500 flex items-center justify-center md:justify-start gap-2 mb-4 font-medium tracking-wide">
						<span className="material-symbols-outlined text-primary text-lg">verified</span>
						Super Administrator
					</p>
					<div className="flex flex-wrap gap-2 justify-center md:justify-start">
						<span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20 uppercase tracking-widest">HQ Office</span>
						<span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded-full border border-emerald-500/20 uppercase tracking-widest">Active</span>
						<span className="px-3 py-1 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-full border border-slate-300 dark:border-slate-700 uppercase tracking-widest">Since Jan 2023</span>
					</div>
				</div>
				<button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
					View Public Profile
				</button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Main Form Section */}
				<div className="lg:col-span-2 space-y-8">
					{/* Edit Profile Card */}
					<section className="bg-background-dark/30 border border-primary/10 backdrop-blur-md rounded-3xl p-8 shadow-sm">
						<div className="flex items-center gap-3 mb-8">
							<span className="material-symbols-outlined text-primary text-2xl">person_edit</span>
							<h3 className="text-2xl font-black text-slate-900 dark:text-white">Personal Information</h3>
						</div>
						
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-2">
								<label className="text-sm font-bold text-slate-500 uppercase tracking-wider">First Name</label>
								<input 
									className="w-full bg-background-light dark:bg-black/20 border border-primary/10 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-primary/40 focus:border-primary/60 outline-none transition-all text-slate-900 dark:text-white" 
									type="text" 
									defaultValue={user?.fullName?.split(' ')[0] || "Admin"}
								/>
							</div>
							<div className="space-y-2">
								<label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Last Name</label>
								<input 
									className="w-full bg-background-light dark:bg-black/20 border border-primary/10 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-primary/40 focus:border-primary/60 outline-none transition-all text-slate-900 dark:text-white" 
									type="text" 
									defaultValue={user?.fullName?.split(' ').slice(1).join(' ') || "User"}
								/>
							</div>
							<div className="space-y-2 md:col-span-2">
								<label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
								<input 
									className="w-full bg-background-light dark:bg-black/20 border border-primary/10 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-primary/40 focus:border-primary/60 outline-none transition-all text-slate-900 dark:text-white opacity-80 cursor-not-allowed" 
									type="email" 
									disabled
									defaultValue={user?.email || "admin@bessify.com"}
								/>
								<p className="text-xs text-slate-400 mt-1">Email address is managed by Firebase Authentication.</p>
							</div>
							<div className="space-y-2 md:col-span-2">
								<label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Bio</label>
								<textarea 
									className="w-full bg-background-light dark:bg-black/20 border border-primary/10 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-primary/40 focus:border-primary/60 outline-none transition-all text-slate-900 dark:text-white resize-none" 
									rows={4}
									defaultValue="Managing digital infrastructure and core security protocols for Bessify Admin systems."
								></textarea>
							</div>
						</div>
						
						<div className="mt-8 flex justify-end">
							<button 
								onClick={handleSave}
								className="bg-primary text-white px-8 py-3.5 rounded-2xl font-black tracking-wide hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
							>
								Save Changes
							</button>
						</div>
					</section>

					{/* Change Password Card */}
					<section className="bg-background-dark/30 border border-primary/10 backdrop-blur-md rounded-3xl p-8 shadow-sm">
						<div className="flex items-center gap-3 mb-8">
							<span className="material-symbols-outlined text-primary text-2xl">lock_reset</span>
							<h3 className="text-2xl font-black text-slate-900 dark:text-white">Security & Password</h3>
						</div>
						
						<div className="space-y-6">
							<div className="space-y-2">
								<label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Current Password</label>
								<input 
									className="w-full bg-background-light dark:bg-black/20 border border-primary/10 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-primary/40 focus:border-primary/60 outline-none transition-all text-slate-900 dark:text-white" 
									placeholder="••••••••" 
									type="password"
								/>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<label className="text-sm font-bold text-slate-500 uppercase tracking-wider">New Password</label>
									<input 
										className="w-full bg-background-light dark:bg-black/20 border border-primary/10 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-primary/40 focus:border-primary/60 outline-none transition-all text-slate-900 dark:text-white" 
										placeholder="Min 8 characters" 
										type="password"
									/>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Confirm Password</label>
									<input 
										className="w-full bg-background-light dark:bg-black/20 border border-primary/10 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-primary/40 focus:border-primary/60 outline-none transition-all text-slate-900 dark:text-white" 
										placeholder="Re-type password" 
										type="password"
									/>
								</div>
							</div>
							
							<div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
								<p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
									<strong className="text-primary font-bold inline-flex items-center gap-1.5 mb-1"><span className="material-symbols-outlined text-sm">lightbulb</span> Security Tip:</strong><br/>
									Use a combination of uppercase, lowercase, numbers, and special characters for a strong password. Enable 2FA in Firebase console.
								</p>
							</div>
						</div>
						
						<div className="mt-8 flex justify-end">
							<button 
								onClick={handleSave}
								className="bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 px-8 py-3.5 rounded-2xl font-black tracking-wide hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
							>
								Update Password
							</button>
						</div>
					</section>
				</div>

				{/* Sidebar Content */}
				<div className="space-y-8">
					{/* Roles & Permissions Card */}
					<section className="bg-primary/5 border border-primary/10 rounded-3xl p-8 border-l-4 border-l-primary shadow-sm">
						<div className="flex items-center gap-3 mb-8">
							<span className="material-symbols-outlined text-primary text-2xl">security</span>
							<h3 className="text-2xl font-black text-slate-900 dark:text-white">Role Access</h3>
						</div>
						
						<div className="space-y-8">
							<div>
								<h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Your Role</h4>
								<div className="px-4 py-3.5 rounded-2xl bg-primary text-white font-black tracking-wide flex items-center justify-between shadow-lg shadow-primary/20">
									Super Administrator
									<span className="material-symbols-outlined">shield_person</span>
								</div>
							</div>
							<div>
								<h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Permissions</h4>
								<div className="space-y-3">
									{[
										"Full System Access",
										"Financial Reports View",
										"User Management (All Roles)",
										"API Configuration",
										"Audit Log Management"
									].map((permission, i) => (
										<div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
											<span className="material-symbols-outlined text-primary text-lg">check_circle</span>
											{permission}
										</div>
									))}
								</div>
							</div>
							
							<button className="w-full py-3.5 border-2 border-primary/20 rounded-2xl text-xs font-black text-primary hover:bg-primary/10 transition-colors uppercase tracking-widest">
								Request Permission Change
							</button>
						</div>
					</section>

					{/* Session Card */}
					<section className="bg-background-dark/30 border border-primary/10 rounded-3xl p-8 backdrop-blur-md shadow-sm">
						<div className="flex items-center gap-3 mb-8">
							<span className="material-symbols-outlined text-primary text-2xl">devices</span>
							<h3 className="text-2xl font-black text-slate-900 dark:text-white">Active Sessions</h3>
						</div>
						
						<div className="space-y-5">
							<div className="flex items-start gap-4">
								<div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0">
									<span className="material-symbols-outlined">desktop_windows</span>
								</div>
								<div className="flex-1 min-w-0 pt-0.5">
									<p className="text-[15px] font-bold text-slate-900 dark:text-white truncate">Windows PC · Chrome</p>
									<p className="text-[11px] font-bold uppercase tracking-widest text-primary mt-1">Current Session</p>
								</div>
							</div>
							
							<div className="flex items-start gap-4">
								<div className="p-2.5 rounded-xl bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400 border border-slate-300 dark:border-slate-700 shrink-0">
									<span className="material-symbols-outlined">smartphone</span>
								</div>
								<div className="flex-1 min-w-0 pt-0.5">
									<p className="text-[15px] font-bold text-slate-900 dark:text-white truncate">iPhone 14 Pro · Safari</p>
									<p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 mt-1">2 hours ago · London, UK</p>
								</div>
							</div>
							
							<button className="w-full mt-6 py-3.5 text-xs font-black uppercase tracking-widest text-rose-500 border-2 border-rose-500/20 rounded-2xl hover:bg-rose-500/10 transition-colors">
								Sign out from all devices
							</button>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
};

export default AdminSettings;
