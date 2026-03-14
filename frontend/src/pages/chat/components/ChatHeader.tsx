import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/stores/useChatStore";

const ChatHeader = () => {
	const { selectedUser, onlineUsers } = useChatStore();

	if (!selectedUser) return null;

	return (
		<div className='p-4 border-b border-primary/10 bg-white/50 dark:bg-background-dark/50 backdrop-blur-md'>
			<div className='flex items-center gap-3'>
				<Avatar className="border border-primary/20 shadow-sm">
					<AvatarImage src={selectedUser.imageUrl} />
					<AvatarFallback>{selectedUser.fullName[0]}</AvatarFallback>
				</Avatar>
				<div>
					<h2 className='font-bold text-slate-900 dark:text-white'>{selectedUser.fullName}</h2>
					<p className='text-xs font-medium text-slate-500'>
						{onlineUsers.has(selectedUser.authId) ? (
							<span className="text-green-500 flex items-center gap-1">
								<span className="size-1.5 bg-green-500 rounded-full inline-block"></span>
								Online
							</span>
						) : "Offline"}
					</p>
				</div>
			</div>
		</div>
	);
};
export default ChatHeader;
