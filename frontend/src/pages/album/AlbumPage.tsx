import { ScrollArea } from "@/components/ui/scroll-area";
import Topbar from "@/components/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const formatDuration = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const AlbumPage = () => {
	const { albumId } = useParams();
	const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();
	const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

	useEffect(() => {
		if (albumId) fetchAlbumById(albumId);
	}, [fetchAlbumById, albumId]);

	if (isLoading) return null;

	const handlePlayAlbum = () => {
		if (!currentAlbum) return;

		const isCurrentAlbumPlaying = currentAlbum?.songs.some((song) => song._id === currentSong?._id);
		if (isCurrentAlbumPlaying) togglePlay();
		else {
			playAlbum(currentAlbum?.songs, 0);
		}
	};

	const handlePlaySong = (index: number) => {
		if (!currentAlbum) return;
		playAlbum(currentAlbum?.songs, index);
	};

	return (
		<main className='flex-1 flex flex-col overflow-hidden bg-background-light dark:bg-background-dark h-full'>
			<Topbar />
			<ScrollArea className='flex-1 bg-gradient-to-b from-primary/10 to-transparent'>
				{/* Album Hero */}
				<div className='p-8 md:p-12 flex flex-col md:flex-row gap-8 items-end'>
					<div className='w-64 h-64 md:w-80 md:h-80 shadow-2xl rounded-xl overflow-hidden bg-primary/20 relative group'>
						<img
							src={currentAlbum?.imageUrl}
							alt={currentAlbum?.title}
							className='w-full h-full object-cover'
						/>
						<div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
							<button
								onClick={handlePlayAlbum}
								className='bg-primary p-4 rounded-full text-white shadow-lg'
							>
								<span className='material-symbols-outlined fill text-4xl'>
									{isPlaying && currentAlbum?.songs.some((song) => song._id === currentSong?._id) ? "pause" : "play_arrow"}
								</span>
							</button>
						</div>
					</div>
					<div className='flex flex-col gap-2 mb-2'>
						<span className='text-xs font-bold uppercase tracking-widest text-primary'>
							Album
						</span>
						<h1 className='text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white'>
							{currentAlbum?.title}
						</h1>
						<div className='flex items-center gap-2 mt-2'>
							<span className='font-bold text-slate-900 dark:text-white hover:underline cursor-pointer'>
								{currentAlbum?.artist}
							</span>
							<span className='text-slate-500'>•</span>
							<span className='font-medium text-slate-500'>
								{currentAlbum?.releaseYear}
							</span>
							<span className='text-slate-500'>•</span>
							<span className='font-medium text-slate-500'>
								{currentAlbum?.songs.length} songs
							</span>
						</div>
					</div>
				</div>

				{/* Tracklist Section */}
				<div className='px-8 pb-32'>
					<div className='flex items-center gap-6 mb-8 border-b border-slate-200 dark:border-primary/10 pb-4'>
						<button
							onClick={handlePlayAlbum}
							className='size-14 bg-primary rounded-full flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform'
						>
							<span className='material-symbols-outlined fill text-3xl'>
								{isPlaying && currentAlbum?.songs.some((song) => song._id === currentSong?._id) ? "pause" : "play_arrow"}
							</span>
						</button>
						<button className='material-symbols-outlined text-3xl text-slate-400 hover:text-primary transition-colors'>
							favorite
						</button>
						<button className='material-symbols-outlined text-3xl text-slate-400 hover:text-primary transition-colors'>
							download
						</button>
					</div>

					<div className='overflow-x-auto'>
						<table className='w-full text-left border-collapse min-w-[600px]'>
							<thead>
								<tr className='text-slate-500 text-xs font-bold uppercase border-b border-slate-200 dark:border-primary/10'>
									<th className='px-4 py-3 w-12 text-center'>#</th>
									<th className='px-4 py-3'>Title</th>
									<th className='px-4 py-3 w-40 text-center'>Date Added</th>
									<th className='px-4 py-3 w-20 text-right text-lg'>
										<span className='material-symbols-outlined text-sm'>
											schedule
										</span>
									</th>
								</tr>
							</thead>
							<tbody className='divide-y divide-slate-100 dark:divide-primary/5'>
								{currentAlbum?.songs.map((song, index) => {
									const isCurrentSong = currentSong?._id === song._id;
									return (
										<tr
											onClick={() => handlePlaySong(index)}
											key={song._id}
											className={`group transition-colors cursor-pointer ${isCurrentSong ? 'bg-primary/10' : 'hover:bg-primary/5'
												}`}
										>
											<td className={`px-4 py-4 text-center font-medium relative ${isCurrentSong ? 'text-primary font-bold' : 'text-slate-400 group-hover:text-primary'
												}`}>
												{isCurrentSong && isPlaying ? (
													<span className='material-symbols-outlined text-lg fill'>
														equalizer
													</span>
												) : (
													<span className='group-hover:hidden'>
														{index + 1}
													</span>
												)}
												{!isCurrentSong && (
													<span className='material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden group-hover:block'>
														play_arrow
													</span>
												)}
											</td>
											<td className='px-4 py-4'>
												<div className='flex items-center gap-3'>
													<img
														src={song.imageUrl}
														alt={song.title}
														className='size-10 rounded'
													/>
													<div className='flex flex-col'>
														<span
															className={`font-bold ${isCurrentSong
																? "text-primary"
																: "text-slate-800 dark:text-slate-100"
																}`}
														>
															{song.title}
														</span>
														<span className={`text-xs ${isCurrentSong ? 'text-primary/70' : 'text-slate-500'}`}>
															{song.artist}
														</span>
													</div>
												</div>
											</td>
											<td className='px-4 py-4 text-center'>
												<span className={`text-xs ${isCurrentSong ? 'text-primary/70' : 'text-slate-500'}`}>
													{song.createdAt.split("T")[0]}
												</span>
											</td>
											<td
												className={`px-4 py-4 text-right text-sm ${isCurrentSong
													? "text-primary font-bold"
													: "text-slate-500"
													}`}
											>
												{formatDuration(song.duration)}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</ScrollArea>
		</main>
	);
};
export default AlbumPage;
