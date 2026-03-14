import { usePlayerStore } from "@/stores/usePlayerStore";
import { Song } from "@/types";

const PlayButton = ({ song }: { song: Song }) => {
	const { currentSong, isPlaying, setCurrentSong, togglePlay } = usePlayerStore();
	const isCurrentSong = currentSong?._id === song._id;

	const handlePlay = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (isCurrentSong) togglePlay();
		else setCurrentSong(song);
	};

	return (
		<div
			onClick={handlePlay}
			className={`absolute inset-0 bg-primary/40 flex items-center justify-center transition-opacity cursor-pointer z-10 rounded-xl
				${isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
			`}
		>
			<span className='material-symbols-outlined text-white text-5xl transition-transform'>
				{isCurrentSong && isPlaying ? "pause_circle" : "play_circle"}
			</span>
		</div>
	);
};
export default PlayButton;
