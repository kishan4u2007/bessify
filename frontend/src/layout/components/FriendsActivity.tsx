import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/stores/useChatStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";

const FriendsActivity = () => {
	const { users, fetchUsers, onlineUsers, userActivities } = useChatStore();
	const { user } = useAuthStore();

	useEffect(() => {
		if (user) fetchUsers();
	}, [fetchUsers, user]);

	return (
		<div className='h-full border-l border-primary/10 bg-background-light dark:bg-background-dark flex flex-col'>
			<div className='p-6 pb-2 flex justify-between items-center'>
				<h3 className='text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2'>
					<span className='material-symbols-outlined text-primary'>diversity_3</span>
					Live Activity
				</h3>
			</div>

			{!user && <LoginPrompt />}

			<ScrollArea className='flex-1'>
				<div className='p-6 flex flex-col gap-6'>
					{users.map((u) => {
						const activity = userActivities.get(u.authId);
						const isPlaying = activity && activity !== "Idle";
						const isOnline = onlineUsers.has(u.authId);

						return (
							<div key={u._id} className='group'>
								<div className='flex items-center gap-3 mb-3'>
									<div className='relative'>
										<Avatar className={`size-12 ring-2 ${isOnline ? 'ring-emerald-500' : 'ring-slate-500'}`}>
											<AvatarImage src={u.imageUrl} alt={u.fullName} className='object-cover' />
											<AvatarFallback>{u.fullName[0]}</AvatarFallback>
										</Avatar>
										<div
											className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background-light dark:border-background-dark 
												${isOnline ? "bg-emerald-500" : "bg-slate-500"}
												`}
											aria-hidden='true'
										/>
									</div>

									<div>
										<p className='text-sm font-bold text-slate-900 dark:text-white'>{u.fullName}</p>
										{isPlaying ? (
											<p className='text-[10px] text-emerald-500 font-bold uppercase'>Listening Now</p>
										) : (
											<p className='text-[10px] text-slate-500 font-bold uppercase'>Idle</p>
										)}
									</div>
								</div>

								{isPlaying && (
									<div className='bg-primary/5 rounded-2xl p-4 border border-primary/10'>
										<div className='flex items-center gap-3 mb-3'>
											<div className='h-10 w-10 flex-shrink-0 rounded-lg bg-zinc-800 flex items-center justify-center overflow-hidden'>
												<span className='material-symbols-outlined text-primary'>music_note</span>
											</div>
											<div className='overflow-hidden min-w-0'>
												<p className='text-xs font-bold truncate text-slate-900 dark:text-slate-200'>
													{activity.replace("Playing ", "").split(" by ")[0]}
												</p>
												<p className='text-[10px] text-slate-500 truncate'>
													{activity.split(" by ")[1] || "Unknown Artist"}
												</p>
											</div>
										</div>
										<button className='w-full bg-primary/20 hover:bg-primary text-primary hover:text-white py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2'>
											<span className='material-symbols-outlined text-sm'>headphones</span> Join Room
										</button>
									</div>
								)}
							</div>
						);
					})}
				</div>
			</ScrollArea>
		</div>
	);
};
export default FriendsActivity;

const LoginPrompt = () => (
	<div className='h-full flex flex-col items-center justify-center p-6 text-center space-y-4'>
		<div className='relative shadow-lg ring-1 ring-white/10 rounded-full p-4'>
			<span className='material-symbols-outlined text-4xl text-emerald-400'>headphones</span>
		</div>

		<div className='space-y-2 max-w-[250px]'>
			<h3 className='text-lg font-bold text-slate-900 dark:text-white'>See What Friends Are Playing</h3>
			<p className='text-sm text-slate-500'>Login to discover what music your friends are enjoying right now</p>
		</div>
	</div>
);
