import { Slider } from "@/components/ui/slider";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef, useState } from "react";

const formatTime = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.floor(seconds % 60);
	return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const PlaybackControls = () => {
	const { currentSong, isPlaying, togglePlay, playNext, playPrevious } = usePlayerStore();

	const [volume, setVolume] = useState(75);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		audioRef.current = document.querySelector("audio");

		const audio = audioRef.current;
		if (!audio) return;

		const updateTime = () => setCurrentTime(audio.currentTime);
		const updateDuration = () => setDuration(audio.duration);

		audio.addEventListener("timeupdate", updateTime);
		audio.addEventListener("loadedmetadata", updateDuration);

		const handleEnded = () => {
			usePlayerStore.setState({ isPlaying: false });
		};

		audio.addEventListener("ended", handleEnded);

		return () => {
			audio.removeEventListener("timeupdate", updateTime);
			audio.removeEventListener("loadedmetadata", updateDuration);
			audio.removeEventListener("ended", handleEnded);
		};
	}, [currentSong]);

	const handleSeek = (value: number[]) => {
		if (audioRef.current) {
			audioRef.current.currentTime = value[0];
		}
	};

	return (
		<footer className='h-20 sm:h-24 glass-panel border-t border-primary/20 px-4 sm:px-8 flex items-center justify-between z-50'>
			{/* Now Playing */}
			<div className='flex items-center gap-4 w-1/3 sm:w-1/4'>
				{currentSong && (
					<>
						<img
							src={currentSong.imageUrl}
							alt={currentSong.title}
							className='h-10 w-10 sm:h-14 sm:w-14 rounded-xl object-cover shadow-lg shadow-primary/20'
						/>
						<div className='hidden sm:block min-w-0'>
							<h4 className='text-sm font-bold text-slate-900 dark:text-white truncate cursor-pointer hover:text-primary transition-colors'>
								{currentSong.title}
							</h4>
							<p className='text-xs text-slate-500 font-medium truncate cursor-pointer hover:underline'>
								{currentSong.artist}
							</p>
						</div>
						<button className='text-primary ml-2 hover:scale-110 transition-transform hidden sm:block'>
							<span className='material-symbols-outlined'>favorite</span>
						</button>
					</>
				)}
			</div>

			{/* Player Controls */}
			<div className='flex flex-col items-center gap-2 flex-1 max-w-xl'>
				<div className='flex items-center gap-4 sm:gap-6'>
					<button className='hidden sm:block text-slate-400 hover:text-primary transition-colors'>
						<span className='material-symbols-outlined'>shuffle</span>
					</button>

					<button
						className='text-slate-600 dark:text-slate-200 hover:text-primary dark:hover:text-white transition-colors disabled:opacity-50'
						onClick={playPrevious}
						disabled={!currentSong}
					>
						<span className='material-symbols-outlined text-3xl'>skip_previous</span>
					</button>

					<button
						className='h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/40 hover:scale-105 transition-transform disabled:opacity-50'
						onClick={togglePlay}
						disabled={!currentSong}
					>
						<span className='material-symbols-outlined text-3xl'>
							{isPlaying ? 'pause' : 'play_arrow'}
						</span>
					</button>

					<button
						className='text-slate-600 dark:text-slate-200 hover:text-primary dark:hover:text-white transition-colors disabled:opacity-50'
						onClick={playNext}
						disabled={!currentSong}
					>
						<span className='material-symbols-outlined text-3xl'>skip_next</span>
					</button>

					<button className='hidden sm:block text-slate-400 hover:text-primary transition-colors'>
						<span className='material-symbols-outlined'>repeat</span>
					</button>
				</div>

				<div className='w-full flex items-center gap-3'>
					<span className='text-[10px] text-slate-500 font-bold min-w-[30px] text-right'>
						{formatTime(currentTime)}
					</span>
					<Slider
						value={[currentTime]}
						max={duration || 100}
						step={1}
						className='w-full hover:cursor-grab active:cursor-grabbing'
						onValueChange={handleSeek}
					/>
					<span className='text-[10px] text-slate-500 font-bold min-w-[30px] text-left'>
						{formatTime(duration)}
					</span>
				</div>
			</div>

			{/* volume controls */}
			<div className='hidden sm:flex items-center justify-end gap-6 w-1/4'>
				<div className='flex items-end gap-0.5 h-6 w-12 mr-2'>
					<div className='w-1 bg-primary/40 h-1/2'></div>
					<div className='w-1 bg-primary/60 h-2/3'></div>
					<div className='w-1 bg-primary h-full'></div>
					<div className='w-1 bg-primary/80 h-3/4'></div>
					<div className='w-1 bg-primary/50 h-1/2'></div>
					<div className='w-1 bg-primary/30 h-1/3'></div>
				</div>

				<div className='flex items-center gap-2'>
					<button className='text-slate-400 hover:text-primary transition-colors flex items-center'>
						<span className='material-symbols-outlined text-xl'>volume_up</span>
					</button>

					<Slider
						value={[volume]}
						max={100}
						step={1}
						className='w-24 hover:cursor-grab active:cursor-grabbing'
						onValueChange={(value) => {
							setVolume(value[0]);
							if (audioRef.current) {
								audioRef.current.volume = value[0] / 100;
							}
						}}
					/>
				</div>
				<button className='text-slate-400 hover:text-primary transition-colors flex items-center'>
					<span className='material-symbols-outlined text-xl'>fullscreen</span>
				</button>
			</div>
		</footer>
	);
};
