import { useMusicStore } from "@/stores/useMusicStore";
import { AdminView } from "../AdminPage";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";

interface User {
	_id: string;
	fullName: string;
	imageUrl: string;
	clerkId: string;
	createdAt: string;
}

interface UsersManagementProps {
	onNavigate?: (view: AdminView) => void;
}

const UsersManagement = ({ onNavigate: _onNavigate }: UsersManagementProps) => {
	const { stats } = useMusicStore();
	const [users, setUsers] = useState<User[]>([]);
	const [, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axiosInstance.get("/users");
				setUsers(response.data);
			} catch (error) {
				console.error("Error fetching users:", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchUsers();
	}, []);

	const mockUsers: User[] = users.length > 0 ? users : [
		{
			_id: "1",
			fullName: "Sarah Jenkins",
			imageUrl: "https://xsgames.co/randomusers/avatar.php?g=female&1",
			clerkId: "",
			createdAt: "2023-10-12"
		},
		{
			_id: "2",
			fullName: "Marcus Thorne",
			imageUrl: "https://xsgames.co/randomusers/avatar.php?g=male&2",
			clerkId: "",
			createdAt: "2023-09-28"
		},
		{
			_id: "3",
			fullName: "Elena Rodriguez",
			imageUrl: "https://xsgames.co/randomusers/avatar.php?g=female&3",
			clerkId: "",
			createdAt: "2023-11-04"
		},
		{
			_id: "4",
			fullName: "Liam Fletcher",
			imageUrl: "https://xsgames.co/randomusers/avatar.php?g=male&4",
			clerkId: "",
			createdAt: "2023-10-02"
		}
	];

	const displayUsers = users.length > 0 ? users : mockUsers;

	return (
		<div className="animate-in fade-in duration-500 w-full mb-10">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-10">
				<div className="space-y-1">
					<h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">Users Management</h2>
					<p className="text-slate-500 text-lg font-medium tracking-wide">Monitor platform users, moderation and subscriptions.</p>
				</div>
				<button className="bg-primary hover:scale-105 active:scale-95 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-full flex items-center gap-2 transition-all shadow-[0_8px_20px_rgba(218,19,236,0.3)] shrink-0">
					<span className="material-symbols-outlined text-[20px]">add</span>
					CREATE USER
				</button>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
				<div className="bg-primary/5 dark:bg-white/[0.02] border border-primary/10 rounded-[2rem] p-8 relative overflow-hidden group">
					<div className="absolute -right-4 -bottom-4 size-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors"></div>
					<span className="text-slate-500 text-[11px] font-black uppercase tracking-widest">Total Users</span>
					<div className="flex items-baseline gap-3 mt-4">
						<h3 className="text-4xl font-black text-slate-900 dark:text-white">{stats.totalUsers.toLocaleString()}</h3>
					</div>
				</div>
				
				<div className="bg-primary/5 dark:bg-white/[0.02] border border-primary/10 rounded-[2rem] p-8 relative overflow-hidden border-l-4 border-l-primary group">
					<div className="absolute -right-4 -bottom-4 size-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors"></div>
					<span className="text-slate-500 text-[11px] font-black uppercase tracking-widest">Active Now</span>
					<div className="flex items-baseline gap-3 mt-4">
						<h3 className="text-4xl font-black text-slate-900 dark:text-white">{displayUsers.length}</h3>
						<div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
							<span className="size-1.5 rounded-full bg-primary animate-pulse"></span>
							<span className="text-primary text-[10px] font-black tracking-widest">LIVE</span>
						</div>
					</div>
				</div>
				
				<div className="bg-primary/5 dark:bg-white/[0.02] border border-primary/10 rounded-[2rem] p-8 relative overflow-hidden group">
					<div className="absolute -right-4 -bottom-4 size-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors"></div>
					<span className="text-slate-500 text-[11px] font-black uppercase tracking-widest">Free Users</span>
					<div className="flex items-baseline gap-3 mt-4">
						<h3 className="text-4xl font-black text-slate-900 dark:text-white">{stats.totalUsers.toLocaleString()}</h3>
					</div>
				</div>
				
				<div className="bg-primary/5 dark:bg-white/[0.02] border border-primary/10 rounded-[2rem] p-8 relative overflow-hidden group">
					<div className="absolute -right-4 -bottom-4 size-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors"></div>
					<span className="text-slate-500 text-[11px] font-black uppercase tracking-widest">Monthly Growth</span>
					<div className="flex items-baseline gap-3 mt-4">
						<h3 className="text-4xl font-black text-slate-900 dark:text-white">8.4%</h3>
						<span className="text-green-500 text-xs font-black">+2.1%</span>
					</div>
				</div>
			</div>

			{/* Table Container */}
			<div className="bg-background-dark/50 shadow-2xl rounded-[2.5rem] overflow-hidden flex flex-col border border-primary/10 backdrop-blur-md">
				{/* Filters/Actions Header */}
				<div className="p-8 border-b border-primary/10 flex flex-wrap gap-6 items-center justify-between">
					<div className="flex items-center gap-4 flex-1 min-w-[350px]">
						<div className="relative flex-1 max-w-md group">
							<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">search</span>
							<input 
								className="w-full bg-background-light dark:bg-black/20 border border-primary/10 rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all outline-none text-slate-900 dark:text-slate-200 placeholder:text-slate-500" 
								placeholder="Search user by name, email or ID..." 
								type="text"
							/>
						</div>
						<div className="flex items-center gap-3">
							<button className="bg-primary/5 border border-primary/10 px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 hover:bg-primary/10 transition-all text-slate-700 dark:text-slate-300">
								<span className="material-symbols-outlined text-[18px]">filter_list</span>
								FILTERS
							</button>
							<button className="bg-primary/5 border border-primary/10 px-5 py-3 rounded-2xl text-xs font-bold hover:bg-primary/10 transition-all text-slate-700 dark:text-slate-300">
								EXPORT CSV
							</button>
						</div>
					</div>
					
					<div className="flex gap-2 p-1.5 bg-background-light dark:bg-black/20 rounded-full border border-primary/10">
						<button className="px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-primary text-white shadow-lg shadow-primary/20">All Users</button>
						<button className="px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-500 hover:text-primary transition-colors">Premium</button>
						<button className="px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-500 hover:text-primary transition-colors">Free</button>
						<button className="px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-500 hover:text-primary transition-colors">Banned</button>
					</div>
				</div>

				{/* Table */}
				<div className="overflow-x-auto">
					<table className="w-full text-left">
						<thead>
							<tr className="text-slate-500 text-[10px] uppercase tracking-[0.2em] border-b border-primary/5 bg-primary/5">
								<th className="px-8 py-6 font-black">User Profile</th>
								<th className="px-8 py-6 font-black hidden md:table-cell">Location</th>
								<th className="px-8 py-6 font-black hidden lg:table-cell">Joined</th>
								<th className="px-8 py-6 font-black">Subscription</th>
								<th className="px-8 py-6 font-black">Status</th>
								<th className="px-8 py-6 font-black text-right">Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-primary/5">
							{displayUsers.map((user) => (
								<tr key={user._id} className="hover:bg-primary/5 transition-colors group">
									<td className="px-8 py-5">
										<div className="flex items-center gap-4">
											<div className="size-11 rounded-full border border-primary/20 overflow-hidden ring-4 ring-primary/5 shrink-0 bg-primary/10">
												<img alt={user.fullName} className="w-full h-full object-cover" src={user.imageUrl} />
											</div>
											<div>
												<p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors truncate max-w-[150px] sm:max-w-xs">{user.fullName}</p>
												<p className="text-[11px] text-slate-500 font-medium truncate max-w-[150px] sm:max-w-xs">{user._id}</p>
											</div>
										</div>
									</td>
									<td className="px-8 py-5 hidden md:table-cell">
										<div className="flex items-center gap-2 text-[13px] font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap">
											<span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
											Unknown
										</div>
									</td>
									<td className="px-8 py-5 text-[13px] font-semibold text-slate-500 dark:text-slate-400 hidden lg:table-cell whitespace-nowrap">
										{new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
									</td>
									<td className="px-8 py-5">
										<span className="px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 whitespace-nowrap">Free</span>
									</td>
									<td className="px-8 py-5">
										<div className="flex items-center gap-2 whitespace-nowrap">
											<span className="size-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
											<span className="text-[11px] text-green-500 font-black uppercase tracking-wider">Active</span>
										</div>
									</td>
									<td className="px-8 py-5 text-right">
										<div className="flex items-center justify-end gap-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
											<button className="size-9 rounded-xl flex items-center justify-center bg-primary/5 hover:bg-primary/20 text-slate-400 hover:text-primary transition-all" title="View Profile">
												<span className="material-symbols-outlined text-[20px]">visibility</span>
											</button>
											<button className="size-9 rounded-xl flex items-center justify-center bg-primary/5 hover:bg-yellow-500/20 text-slate-400 hover:text-yellow-500 transition-all" title="Suspend">
												<span className="material-symbols-outlined text-[20px]">pause_circle</span>
											</button>
											<button className="size-9 rounded-xl flex items-center justify-center bg-primary/5 hover:bg-orange-500/20 text-slate-400 hover:text-orange-500 transition-all" title="Ban User">
												<span className="material-symbols-outlined text-[20px]">gavel</span>
											</button>
											<button className="size-9 rounded-xl flex items-center justify-center bg-primary/5 hover:bg-red-500/20 text-slate-400 hover:text-red-500 transition-all" title="Delete">
												<span className="material-symbols-outlined text-[20px]">delete</span>
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* Pagination */}
				<div className="p-8 border-t border-primary/10 flex flex-col sm:flex-row items-center justify-between bg-white/[0.01] gap-4">
					<p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">
						Showing <span className="text-slate-900 dark:text-white">1 - {displayUsers.length}</span> of {stats.totalUsers.toLocaleString()} users
					</p>
					<div className="flex items-center gap-3">
						<button className="size-10 rounded-2xl border border-primary/10 block items-center justify-center text-slate-400 hover:bg-primary/10 hover:text-primary transition-all">
							<span className="material-symbols-outlined mt-1.5 ml-0.5">chevron_left</span>
						</button>
						<div className="flex items-center gap-2">
							<button className="size-10 rounded-2xl bg-primary text-white flex items-center justify-center text-xs font-black shadow-lg shadow-primary/20">1</button>
							<button className="size-10 rounded-2xl border border-primary/10 flex items-center justify-center text-slate-400 hover:bg-primary/10 hover:text-primary transition-all text-xs font-bold">2</button>
							<button className="size-10 rounded-2xl border border-primary/10 flex items-center justify-center text-slate-400 hover:bg-primary/10 hover:text-primary transition-all text-xs font-bold">3</button>
							<span className="text-slate-600 px-1 font-bold">...</span>
						</div>
						<button className="size-10 rounded-2xl border border-primary/10 flex items-center justify-center text-slate-400 hover:bg-primary/10 hover:text-primary transition-all">
							<span className="material-symbols-outlined mt-1.5 ml-0.5">chevron_right</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UsersManagement;
