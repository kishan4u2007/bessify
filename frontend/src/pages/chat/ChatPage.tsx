import Topbar from "@/components/Topbar";
import { useChatStore } from "@/stores/useChatStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Link } from "react-router-dom";

const formatTime = (date: string) => {
	return new Date(date).toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});
};

const ChatPage = () => {
	const { user } = useAuthStore();
	const { messages, selectedUser, fetchUsers, fetchMessages, sendMessage, users, onlineUsers, userActivities, setSelectedUser } = useChatStore();
	const { currentSong, isPlaying } = usePlayerStore();
	const [messageText, setMessageText] = useState("");
	const [activeView, setActiveView] = useState<"chat" | "queue" | "listeners">("chat");
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (user) fetchUsers();
	}, [fetchUsers, user]);

	useEffect(() => {
		if (selectedUser?.authId) fetchMessages(selectedUser.authId);
	}, [selectedUser, fetchMessages]);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSend = () => {
		if (!user || !selectedUser || !messageText.trim()) return;
		sendMessage(selectedUser.authId, user.uid, messageText.trim());
		setMessageText("");
		inputRef.current?.focus();
	};

	const onlineCount = onlineUsers.size;

	if (!user) {
		return (
			<main className="h-full overflow-hidden flex flex-col bg-background-light dark:bg-background-dark">
				<Topbar />
				<div className="flex-1 flex items-center justify-center flex-col gap-6">
					<div className="size-24 bg-primary/10 rounded-full flex items-center justify-center">
						<span className="material-symbols-outlined text-5xl text-primary">groups</span>
					</div>
					<div className="text-center">
						<h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Sign in to join Listening Rooms</h2>
						<p className="text-slate-500">Listen & chat with friends in real-time</p>
					</div>
					<Link to="/login" className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity">
						Sign In
					</Link>
				</div>
			</main>
		);
	}

	return (
		<main className='flex-1 h-full overflow-hidden bg-background-light dark:bg-background-dark relative flex flex-col'>
			<Topbar />

			<div className='flex-1 grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] xl:grid-cols-[280px_1fr_320px] overflow-hidden border-t border-primary/10'>

				{/* LEFT SIDEBAR: Users / Listeners */}
				<aside className='hidden lg:flex flex-col border-r border-primary/10 bg-background-light dark:bg-background-dark/50'>
					{/* Room Header */}
					<div className='p-4 border-b border-primary/10'>
						<div className='flex items-center gap-2 mb-1'>
							<span className='flex h-2 w-2 rounded-full bg-red-500 animate-pulse' />
							<span className='text-xs font-bold text-red-500 uppercase tracking-widest'>Live Now</span>
						</div>
						<h2 className='font-bold text-slate-900 dark:text-white'>Listening Rooms</h2>
						<p className='text-xs text-slate-500'>{onlineCount} online</p>
					</div>

					{/* "Your Spaces" nav */}
					<div className='p-3 border-b border-primary/10'>
						<p className='px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2'>Your Spaces</p>
						<div className='flex items-center gap-3 px-3 py-2 rounded-xl bg-primary/10 text-primary cursor-pointer'>
							<span className='material-symbols-outlined' style={{ fontVariationSettings: "'FILL' 1" }}>headphones</span>
							<span className='font-medium text-sm'>Listening Room</span>
						</div>
					</div>

					{/* Users who are online */}
					<div className='p-3 flex-1 overflow-auto'>
						<p className='px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2'>
							Members ({users.length})
						</p>
						<div className='flex flex-col gap-1'>
							{users.map(u => {
								const isOnline = onlineUsers.has(u.authId);
								const activity = userActivities.get(u.authId);
								const isSelected = selectedUser?.authId === u.authId;
								return (
									<div
										key={u._id}
										onClick={() => setSelectedUser(isSelected ? null : u)}
										className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${isSelected ? 'bg-primary/15 text-primary' : 'hover:bg-primary/5'}`}
									>
										<div className='relative shrink-0'>
											<div className='size-9 rounded-full bg-slate-300 dark:bg-slate-700 overflow-hidden'>
												<img src={u.imageUrl || "/spotify.png"} alt={u.fullName} className='w-full h-full object-cover' />
											</div>
											{isOnline && (
												<span className='absolute bottom-0 right-0 size-3 rounded-full bg-green-500 border-2 border-white dark:border-[#201022]' />
											)}
										</div>
										<div className='flex-1 min-w-0'>
											<p className={`font-medium text-sm truncate ${isSelected ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>{u.fullName}</p>
											{activity ? (
												<p className='text-[10px] text-primary truncate'>{activity}</p>
											) : (
												<p className='text-[10px] text-slate-400'>{isOnline ? 'Online' : 'Offline'}</p>
											)}
										</div>
									</div>
								);
							})}
							{users.length === 0 && (
								<p className='text-xs text-slate-400 text-center py-4'>No other users yet</p>
							)}
						</div>
					</div>

					{/* Live Session Banner */}
					{currentSong && (
						<div className='p-3 border-t border-primary/10'>
							<div className='p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/20'>
								<p className='text-[10px] font-bold text-primary uppercase tracking-widest mb-1'>Now Playing</p>
								<p className='text-xs text-slate-700 dark:text-slate-300 font-medium truncate'>{currentSong.title}</p>
								<p className='text-[10px] text-slate-500 truncate'>{currentSong.artist}</p>
							</div>
						</div>
					)}
				</aside>

				{/* CENTER: Main Player + Live Activity */}
				<div className='flex flex-col min-w-0'>
					{/* Mobile tab bar */}
					<div className='lg:hidden flex border-b border-primary/10'>
						{(["chat", "queue", "listeners"] as const).map(v => (
							<button
								key={v}
								onClick={() => setActiveView(v)}
								className={`flex-1 py-3 text-xs font-bold capitalize transition-colors ${activeView === v ? 'border-b-2 border-primary text-primary' : 'text-slate-500'}`}
							>
								{v === "listeners" ? "Users" : v}
							</button>
						))}
					</div>

					<div className='flex-1 overflow-auto p-4 md:p-6'>
						{/* Room Header */}
						<div className='flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8'>
							<div>
								<div className='flex items-center gap-2 mb-2'>
									<span className='flex h-2 w-2 rounded-full bg-red-500 animate-pulse' />
									<span className='text-xs font-bold text-red-500 uppercase tracking-widest'>Live Activity</span>
								</div>
								<h1 className='text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white'>
									{selectedUser ? `Chat with ${selectedUser.fullName}` : "Midnight City Lounge"}
								</h1>
								<p className='text-slate-500 dark:text-slate-400 text-sm'>
									{selectedUser ? selectedUser.fullName : `${onlineCount} listeners online`}
								</p>
							</div>
							<div className='flex gap-2'>
								{selectedUser && (
									<button onClick={() => setSelectedUser(null)} className='flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors'>
										<span className='material-symbols-outlined text-sm'>arrow_back</span> All Rooms
									</button>
								)}
								<button className='flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity'>
									<span className='material-symbols-outlined text-sm'>person_add</span> Invite
								</button>
							</div>
						</div>

						{/* Now Playing Card */}
						{currentSong && !selectedUser && (
							<div className='relative rounded-2xl bg-slate-900 text-white overflow-hidden shadow-2xl mb-8 p-6 md:p-8'>
								<div className='absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-blue-500/20 pointer-events-none' />
								<div className='relative z-10 flex flex-col md:flex-row gap-6 items-center'>
									<div className='relative shrink-0'>
										<img src={currentSong.imageUrl} alt={currentSong.title} className={`h-40 w-40 md:h-56 md:w-56 rounded-xl shadow-2xl border-4 border-white/10 object-cover ${isPlaying ? "animate-[spin_20s_linear_infinite]" : ""}`} style={isPlaying ? {} : {}} />
										<div className='absolute -bottom-3 -right-3 bg-primary text-white p-2.5 rounded-full shadow-lg'>
											<span className='material-symbols-outlined' style={{ fontVariationSettings: "'FILL' 1" }}>music_note</span>
										</div>
									</div>
									<div className='flex-1 w-full text-center md:text-left'>
										<h2 className='text-3xl font-bold mb-1'>{currentSong.title}</h2>
										<p className='text-slate-300 text-lg mb-6'>{currentSong.artist}</p>
										{/* Emoji reactions */}
										<div className='flex justify-center md:justify-start gap-3 bg-white/10 backdrop-blur rounded-full p-2 max-w-xs mx-auto md:mx-0'>
											{["ðŸ”¥", "ðŸ’–", "ðŸ™Œ", "ðŸŽ¸", "âœ¨"].map(e => (
												<button key={e} className='h-10 w-10 flex items-center justify-center rounded-full hover:bg-white/20 text-xl transition-all hover:scale-125'>{e}</button>
											))}
										</div>
									</div>
								</div>
							</div>
						)}

						{/* No song playing */}
						{!currentSong && !selectedUser && (
							<div className='flex flex-col items-center justify-center py-16 gap-4 bg-primary/5 rounded-2xl border border-primary/10 mb-8'>
								<span className='material-symbols-outlined text-6xl text-primary/30'>headphones</span>
								<p className='font-semibold text-slate-500'>No song playing yet</p>
								<Link to="/home" className='text-primary font-bold hover:underline text-sm'>Go pick a song â†’</Link>
							</div>
						)}

						{/* Selected user friend list (no chat selected) */}
						{!selectedUser && (
							<div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
								{users.slice(0, 6).map(u => (
									<div
										key={u._id}
										onClick={() => setSelectedUser(u)}
										className='flex flex-col items-center gap-3 p-4 rounded-2xl bg-primary/5 border border-transparent hover:border-primary/30 hover:bg-primary/10 transition-all cursor-pointer group'
									>
										<div className='relative'>
											<div className='size-16 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors'>
												<img src={u.imageUrl || "/spotify.png"} alt={u.fullName} className='w-full h-full object-cover' />
											</div>
											{onlineUsers.has(u.authId) && (
												<span className='absolute bottom-0.5 right-0.5 size-4 rounded-full bg-green-400 border-2 border-white dark:border-[#201022]' />
											)}
										</div>
										<div className='text-center'>
											<p className='font-bold text-sm text-slate-900 dark:text-white group-hover:text-primary transition-colors truncate w-full'>{u.fullName}</p>
											<p className='text-[10px] text-slate-400'>{userActivities.get(u.authId) || (onlineUsers.has(u.authId) ? "Online" : "Offline")}</p>
										</div>
										<button className='text-xs font-bold text-primary bg-primary/10 hover:bg-primary hover:text-white px-3 py-1 rounded-full transition-all'>
											Chat
										</button>
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				{/* RIGHT SIDEBAR: Live Chat */}
				<aside className='hidden lg:flex flex-col border-l border-primary/10 bg-background-light dark:bg-background-dark/50'>
					<div className='p-4 border-b border-primary/10'>
						<h3 className='font-bold flex items-center gap-2 text-slate-900 dark:text-white'>
							<span className='material-symbols-outlined text-primary'>chat_bubble</span>
							{selectedUser ? `${selectedUser.fullName}` : "Live Chat"}
						</h3>
						{selectedUser && (
							<p className={`text-xs mt-0.5 ${onlineUsers.has(selectedUser.authId) ? "text-green-500" : "text-slate-400"}`}>
								{onlineUsers.has(selectedUser.authId) ? "â— Online" : "â—‹ Offline"}
							</p>
						)}
					</div>

					{!selectedUser ? (
						<div className='flex-1 flex items-center justify-center flex-col gap-3 p-6 text-center'>
							<span className='material-symbols-outlined text-5xl text-primary/20'>chat_bubble</span>
							<p className='text-slate-500 text-sm'>Select a person from the left sidebar to start chatting</p>
						</div>
					) : (
						<>
							<ScrollArea className='flex-1 p-4'>
								<div className='flex flex-col gap-4'>
									{messages.length === 0 && (
										<div className='text-center py-8'>
											<p className='text-slate-400 text-sm'>Say hi to {selectedUser.fullName}! ðŸ‘‹</p>
										</div>
									)}
									{messages.map(m => {
										const isMine = m.senderId === user?.uid;
										return (
											<div key={m._id} className={`flex flex-col gap-1 ${isMine ? "items-end" : "items-start"}`}>
												<div className='flex items-center gap-2'>
													<span className={`text-xs font-bold ${isMine ? "text-primary" : "text-slate-500"}`}>
														{isMine ? "You" : selectedUser.fullName}
													</span>
													<span className='text-[10px] text-slate-400'>{formatTime(m.createdAt)}</span>
												</div>
												<div className={`max-w-[200px] px-3 py-2 rounded-2xl text-sm ${isMine ? "bg-primary text-white rounded-tr-sm" : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-sm"}`}>
													{m.content}
												</div>
											</div>
										);
									})}
									<div ref={messagesEndRef} />
								</div>
							</ScrollArea>

							{/* Message Input */}
							<div className='p-4 border-t border-primary/10'>
								<div className='relative'>
									<input
										ref={inputRef}
										className='w-full bg-slate-100 dark:bg-slate-800 border-none rounded-full px-4 py-2.5 pr-12 focus:ring-2 focus:ring-primary/50 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none'
										placeholder='Type a message...'
										value={messageText}
										onChange={e => setMessageText(e.target.value)}
										onKeyDown={e => e.key === "Enter" && handleSend()}
									/>
									<button
										onClick={handleSend}
										disabled={!messageText.trim()}
										className='absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-primary/70 disabled:text-slate-300 transition-colors'
									>
										<span className='material-symbols-outlined' style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
									</button>
								</div>
							</div>
						</>
					)}
				</aside>
			</div>
		</main>
	);
};

export default ChatPage;

