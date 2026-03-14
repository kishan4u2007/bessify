import Topbar from "@/components/Topbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { formatDuration } from "../artist/ArtistPage";

const LikedSongsPage = () => {
    const { songs, fetchSongs, isLoading } = useMusicStore();
    const { setCurrentSong, currentSong, playAlbum } = usePlayerStore();

    useEffect(() => { fetchSongs(); }, [fetchSongs]);

    return (
        <main className="h-full overflow-hidden flex flex-col bg-background-light dark:bg-background-dark">
            <Topbar />
            <ScrollArea className="h-full flex-1">
                {/* Hero */}
                <div className="p-8 lg:p-12 bg-gradient-to-b from-primary/20 to-transparent">
                    <div className="flex flex-col md:flex-row items-end gap-8">
                        <div className="bg-gradient-to-br from-primary to-purple-700 rounded-xl h-48 w-48 shadow-2xl flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-white text-7xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                            <span className="text-xs font-bold uppercase tracking-wider text-primary">Playlist</span>
                            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-4 text-slate-900 dark:text-white">Liked Songs</h1>
                            <p className="text-slate-500">{songs.length} songs</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-8">
                        <button
                            onClick={() => songs.length > 0 && playAlbum(songs, 0)}
                            className="flex items-center justify-center gap-2 rounded-full h-14 px-8 bg-primary text-white text-lg font-bold shadow-xl shadow-primary/30 hover:scale-105 transition-transform"
                        >
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                            Play All
                        </button>
                        <button className="flex items-center justify-center gap-2 rounded-full h-14 px-8 bg-primary/10 text-primary border border-primary/20 text-lg font-bold hover:bg-primary/20 transition-all">
                            <span className="material-symbols-outlined">shuffle</span>
                            Shuffle
                        </button>
                    </div>
                </div>

                {/* Songs List */}
                <div className="px-8 pb-32">
                    <div className="grid grid-cols-[40px_1fr_1fr_80px_40px] gap-4 px-4 py-3 border-b border-primary/10 text-xs font-bold uppercase text-primary/60 tracking-wider">
                        <div>#</div>
                        <div>Title</div>
                        <div className="hidden md:block">Album</div>
                        <div className="text-right">Time</div>
                        <div></div>
                    </div>

                    {isLoading ? (
                        <div className="py-12 text-center text-slate-500">
                            <span className="material-symbols-outlined text-5xl text-primary/30 mb-4 block animate-spin" style={{ fontVariationSettings: "'FILL' 1" }}>refresh</span>
                            Loading...
                        </div>
                    ) : songs.length === 0 ? (
                        <div className="py-16 text-center">
                            <span className="material-symbols-outlined text-6xl text-primary/20 mb-4 block">favorite</span>
                            <p className="text-slate-500 text-lg font-semibold">No songs yet</p>
                            <Link to="/search" className="mt-4 inline-block text-primary font-bold hover:underline">Find songs to like</Link>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-1 mt-4">
                            {songs.map((song, i) => (
                                <div
                                    key={song._id}
                                    onClick={() => setCurrentSong(song)}
                                    className={`grid grid-cols-[40px_1fr_1fr_80px_40px] gap-4 items-center px-4 py-3 rounded-xl cursor-pointer group transition-colors ${currentSong?._id === song._id ? "bg-primary/15" : "hover:bg-primary/5"}`}
                                >
                                    <div>
                                        <span className="text-slate-500 group-hover:hidden text-sm">{i + 1}</span>
                                        <span className="material-symbols-outlined hidden group-hover:block text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                                    </div>
                                    <div className="flex items-center gap-4 min-w-0">
                                        <img src={song.imageUrl} alt={song.title} className="size-10 rounded-lg object-cover shrink-0" />
                                        <div className="min-w-0">
                                            <p className={`font-bold text-sm truncate ${currentSong?._id === song._id ? "text-primary" : "text-slate-900 dark:text-white"}`}>{song.title}</p>
                                            <Link to={`/artists/${encodeURIComponent(song.artist)}`} onClick={e => e.stopPropagation()} className="text-xs text-slate-500 truncate hover:text-primary">{song.artist}</Link>
                                        </div>
                                    </div>
                                    <div className="hidden md:block text-sm text-slate-500 truncate">Bessify Collection</div>
                                    <div className="text-right text-sm text-slate-500">{formatDuration(song.duration)}</div>
                                    <div className="flex justify-end">
                                        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </ScrollArea>
        </main>
    );
};

export default LikedSongsPage;

