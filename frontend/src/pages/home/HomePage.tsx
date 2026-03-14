import Topbar from "@/components/Topbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { formatDuration } from "../artist/ArtistPage";

const moods = [
	{ label: "Hyper Focus", color: "from-pink-500 to-primary" },
	{ label: "Deep Chill", color: "from-blue-600 to-indigo-800" },
	{ label: "High Energy", color: "from-orange-400 to-red-600" },
	{ label: "Nature Flow", color: "from-emerald-400 to-teal-700" },
];

const getGreeting = () => {
	const h = new Date().getHours();
	if (h < 12) return "Good Morning";
	if (h < 17) return "Good Afternoon";
	return "Good Evening";
};

const HomePage = () => {
	const { featuredSongs, madeForYouSongs, trendingSongs, fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs, isLoading } = useMusicStore();
	const { setCurrentSong, currentSong } = usePlayerStore();
	const { user } = useAuthStore();

	useEffect(() => {
		fetchFeaturedSongs();
		fetchMadeForYouSongs();
		fetchTrendingSongs();
	}, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

	const displayName = user?.displayName?.split(" ")[0] || user?.email?.split("@")[0] || "there";

	const SongCard = ({ song, onClick }: { song: any; onClick: () => void }) => (
		<div onClick={onClick} className="min-w-[160px] group cursor-pointer">
			<div
				className="aspect-square rounded-xl bg-center bg-cover mb-3 relative overflow-hidden ring-1 ring-white/10 shadow-xl"
				style={{ backgroundImage: `url(${song.imageUrl})` }}
			>
				<div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${currentSong?._id === song._id ? "bg-primary/30 opacity-100" : "bg-primary/40 opacity-0 group-hover:opacity-100"}`}>
					<span className="material-symbols-outlined text-white text-5xl scale-75 group-hover:scale-100 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
				</div>
				{currentSong?._id === song._id && (
					<div className="absolute bottom-2 right-2 flex gap-0.5 items-end h-5">
						{[1, 0.6, 0.8, 0.4, 0.9].map((h, i) => (
							<div key={i} className="w-1 bg-primary rounded-sm animate-bounce" style={{ height: `${h * 100}%`, animationDelay: `${i * 0.1}s` }} />
						))}
					</div>
				)}
			</div>
			<h4 className={`font-bold text-sm truncate ${currentSong?._id === song._id ? "text-primary" : "text-slate-900 dark:text-white"}`}>{song.title}</h4>
			<p className="text-xs text-slate-500 font-medium truncate">{song.artist}</p>
		</div>
	);

	const Skeleton = () => (
		<div className="flex gap-5 overflow-hidden">
			{[...Array(5)].map((_, i) => (
				<div key={i} className="min-w-[160px]">
					<div className="aspect-square rounded-xl bg-primary/10 animate-pulse mb-3" />
					<div className="h-3 w-3/4 bg-primary/10 rounded animate-pulse mb-1" />
					<div className="h-2 w-1/2 bg-primary/10 rounded animate-pulse" />
				</div>
			))}
		</div>
	);

	return (
		<main className="h-full overflow-hidden relative flex flex-col bg-background-light dark:bg-background-dark">
			<Topbar />
			<ScrollArea className="h-full flex-1">
				<div className="p-6 md:p-8 pb-32 space-y-10">
					{/* Greeting */}
					<div className="flex justify-between items-end">
						<div>
							<h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
								{getGreeting()}, {displayName} ðŸ‘‹
							</h2>
							<p className="text-slate-500 dark:text-primary/70 font-medium mt-1">
								Discover your next favorite song
							</p>
						</div>
					</div>

					{/* â”€â”€ FEATURED â”€â”€ */}
					<section>
						<div className="flex justify-between items-center mb-5">
							<h3 className="text-xl font-bold text-slate-900 dark:text-white">Featured</h3>
							<Link to="/search" className="text-primary text-sm font-semibold hover:underline">See all</Link>
						</div>
						{isLoading ? <Skeleton /> : (
							<div className="flex gap-5 overflow-x-auto pb-2">
								{featuredSongs.map(song => (
									<SongCard key={song._id} song={song} onClick={() => setCurrentSong(song)} />
								))}
							</div>
						)}
					</section>

					{/* â”€â”€ MOOD DISCOVERY â”€â”€ */}
					<section>
						<h3 className="text-xl font-bold text-slate-900 dark:text-white mb-5">Mood-Based Discovery</h3>
						<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
							{moods.map(mood => (
								<div
									key={mood.label}
									className={`h-24 rounded-2xl bg-gradient-to-br ${mood.color} p-4 flex flex-col justify-end cursor-pointer hover:scale-[1.02] transition-transform shadow-lg`}
								>
									<span className="text-white font-black text-lg">{mood.label}</span>
								</div>
							))}
						</div>
					</section>

					{/* â”€â”€ MADE FOR YOU â”€â”€ */}
					<section>
						<div className="flex justify-between items-center mb-5">
							<h3 className="text-xl font-bold text-slate-900 dark:text-white">Made For You</h3>
							<Link to="/search" className="text-primary text-sm font-semibold hover:underline">See all</Link>
						</div>
						{isLoading ? <Skeleton /> : (
							<div className="flex gap-5 overflow-x-auto pb-2">
								{madeForYouSongs.map(song => (
									<SongCard key={song._id} song={song} onClick={() => setCurrentSong(song)} />
								))}
							</div>
						)}
					</section>

					{/* â”€â”€ TRENDING â”€â”€ */}
					<section>
						<h3 className="text-xl font-bold text-slate-900 dark:text-white mb-5">Community Trending</h3>
						<div className="space-y-3">
							{trendingSongs.slice(0, 8).map((song, i) => (
								<div
									key={song._id}
									onClick={() => setCurrentSong(song)}
									className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-colors border ${currentSong?._id === song._id ? "bg-primary/15 border-primary/20" : "bg-primary/5 hover:bg-primary/10 border-primary/5"}`}
								>
									<span className="text-xl font-black text-primary w-8">{String(i + 1).padStart(2, "0")}</span>
									<img src={song.imageUrl} alt={song.title} className="h-12 w-12 rounded-lg object-cover shadow-sm shrink-0" />
									<div className="flex-1 min-w-0">
										<h4 className={`font-bold text-sm truncate ${currentSong?._id === song._id ? "text-primary" : "text-slate-900 dark:text-white"}`}>{song.title}</h4>
										<p className="text-xs text-slate-500 truncate">{song.artist}</p>
									</div>
									<span className="text-xs text-slate-500 hidden md:block shrink-0">{formatDuration(song.duration)}</span>
									<button
										onClick={e => { e.stopPropagation(); setCurrentSong(song); }}
										className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-primary/30 shrink-0"
									>
										<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
									</button>
								</div>
							))}
						</div>
					</section>
				</div>
			</ScrollArea>
		</main>
	);
};

export default HomePage;

