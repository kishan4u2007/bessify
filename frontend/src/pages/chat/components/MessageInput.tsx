import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/stores/useChatStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { useState } from "react";

const MessageInput = () => {
	const [newMessage, setNewMessage] = useState("");
	const { user } = useAuthStore();
	const { selectedUser, sendMessage } = useChatStore();

	const handleSend = () => {
		if (!selectedUser || !user || !newMessage) return;
		sendMessage(selectedUser.authId, user.uid, newMessage.trim());
		setNewMessage("");
	};

	return (
		<div className='p-4 mt-auto border-t border-primary/10 bg-white/50 dark:bg-background-dark/50 backdrop-blur-md'>
			<div className='flex gap-2 items-center'>
				<Input
					placeholder='Type a message'
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					className='bg-slate-100 dark:bg-primary/5 border-none rounded-full px-6 focus-visible:ring-1 focus-visible:ring-primary h-12 text-slate-900 dark:text-slate-100'
					onKeyDown={(e) => e.key === "Enter" && handleSend()}
				/>

				<Button
					size={"icon"}
					onClick={handleSend}
					disabled={!newMessage.trim()}
					className="rounded-full bg-primary hover:bg-primary/90 text-white h-12 w-12 flex-shrink-0 shadow-lg shadow-primary/20"
				>
					<span className='material-symbols-outlined'>send</span>
				</Button>
			</div>
		</div>
	);
};
export default MessageInput;
