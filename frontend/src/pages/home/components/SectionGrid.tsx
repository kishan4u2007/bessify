import { Song } from "@/types";
import SectionGridSkeleton from "./SectionGridSkeleton";
import { Button } from "@/components/ui/button";
import PlayButton from "./PlayButton";

type SectionGridProps = {
	title: string;
	songs: Song[];
	isLoading: boolean;
};
const SectionGrid = ({ songs, title, isLoading }: SectionGridProps) => {
	if (isLoading) return <SectionGridSkeleton />;

	return (
		<div className='mb-10'>
			<div className='flex items-center justify-between mb-6'>
				<h2 className='text-xl sm:text-2xl font-bold text-slate-900 dark:text-white'>{title}</h2>
				<Button variant='link' className='text-sm text-primary font-medium hover:underline'>
					Show all
				</Button>
			</div>

			<div className='flex gap-6 overflow-x-auto pb-4 custom-scrollbar lg:grid lg:grid-cols-4 lg:overflow-x-visible'>
				{songs.map((song) => (
					<div
						key={song._id}
						className='min-w-[160px] sm:min-w-[180px] group cursor-pointer'
					>
						<div className='aspect-square rounded-xl bg-center bg-cover mb-4 relative overflow-hidden ring-1 ring-black/5 dark:ring-white/10'>
							<img
								src={song.imageUrl}
								alt={song.title}
								className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
							/>
							<PlayButton song={song} />
						</div>
						<h4 className='font-bold text-slate-900 dark:text-white text-sm truncate'>{song.title}</h4>
						<p className='text-xs text-slate-500 font-medium truncate'>{song.artist}</p>
					</div>
				))}
			</div>
		</div>
	);
};
export default SectionGrid;
