import UsersListSkeleton from "@/components/skeletons/UsersListSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/stores/useChatStore";

const UsersList = () => {
	const { users, selectedUser, isLoading, setSelectedUser, onlineUsers } = useChatStore();

	return (
		<div className='border-r border-primary/10 bg-white dark:bg-black/20'>
			<div className='flex flex-col h-full'>
				<ScrollArea className='h-[calc(100vh-280px)]'>
					<div className='space-y-2 p-4'>
						{isLoading ? (
							<UsersListSkeleton />
						) : (
							users.map((user) => (
								<div
									key={user._id}
									onClick={() => setSelectedUser(user)}
									className={`flex items-center justify-center lg:justify-start gap-3 p-3 
										rounded-xl cursor-pointer transition-colors
                    ${selectedUser?.authId === user.authId ? "bg-primary/10" : "hover:bg-primary/5"}`}
								>
									<div className='relative'>
										<Avatar className='size-8 md:size-12 border border-primary/20'>
											<AvatarImage src={user.imageUrl} />
											<AvatarFallback>{user.fullName[0]}</AvatarFallback>
										</Avatar>
										{/* online indicator */}
										<div
											className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-white dark:ring-background-dark
                        ${onlineUsers.has(user.authId) ? "bg-green-500" : "bg-slate-400"}`}
										/>
									</div>

									<div className='flex-1 min-w-0 lg:block hidden'>
										<span className='font-bold text-slate-900 dark:text-white text-sm truncate block'>{user.fullName}</span>
										<span className='text-xs text-slate-500 font-medium truncate block'>
											{onlineUsers.has(user.authId) ? "Online" : "Offline"}
										</span>
									</div>
								</div>
							))
						)}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
};

export default UsersList;
