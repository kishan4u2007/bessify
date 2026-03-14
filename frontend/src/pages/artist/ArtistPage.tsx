import { useParams } from "react-router-dom";
import Topbar from "@/components/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play } from "lucide-react";

export const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const ArtistPage = () => {
    const { artistName } = useParams();
    const { songs, fetchSongs, albums, fetchAlbums } = useMusicStore();

    useEffect(() => {
        fetchSongs();
        fetchAlbums();
    }, [fetchSongs, fetchAlbums]);

    // Simple mock filter until backend explicitly supports fetching by artist
    const artistSongs = songs.filter(s => s.artist.toLowerCase() === artistName?.toLowerCase());
    const artistAlbums = albums.filter(a => a.artist.toLowerCase() === artistName?.toLowerCase());

    const displayArtistName = artistName || "Unknown Artist";

    return (
        <main className="h-full overflow-hidden flex flex-col bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
            <Topbar className="bg-transparent border-none z-50 backdrop-blur-md absolute top-0 w-full" />

            <ScrollArea className="flex-1 w-full pb-24">
                {/* Hero Section */}
                <div className="relative h-[400px] md:h-[450px] w-full bg-slate-900 overflow-hidden">
                    <img
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                        alt="Artist Hero"
                        src={artistSongs[0]?.imageUrl || "https://images.unsplash.com/photo-1516280440502-a298811e550c?w=1200&h=800&fit=crop"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-background-dark/30 to-transparent"></div>

                    {/* Floating Glass Card */}
                    <div className="absolute bottom-8 left-8 right-8 md:right-auto md:w-[600px] p-6 rounded-xl bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl">
                        <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                            <div className="size-24 md:size-32 rounded-full border-4 border-primary/40 p-1 shadow-lg flex-shrink-0 bg-black/20">
                                <img
                                    className="size-full rounded-full object-cover"
                                    alt="Artist Avatar"
                                    src={artistSongs[0]?.imageUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop"}
                                />
                            </div>
                            <div className="flex-1 text-center md:text-left mt-4 md:mt-0">
                                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                                    <span className="material-symbols-outlined text-primary text-lg">verified</span>
                                    <span className="text-xs font-bold uppercase tracking-widest text-primary/80">Verified Artist</span>
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black mb-2 tracking-tight text-white capitalize">{displayArtistName}</h2>
                                <p className="text-white/70 text-sm font-medium">18,429,102 Monthly Listeners â€¢ #12 Global Artist</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-8">
                            <button className="flex items-center gap-2 bg-primary px-8 py-3 rounded-full text-white font-bold hover:scale-105 transition-transform shadow-[0_0_15px_rgba(218,19,236,0.5)]">
                                <span className="material-symbols-outlined text-xl">play_arrow</span> Play
                            </button>
                            <button className="flex items-center gap-2 border border-white/20 px-8 py-3 rounded-full text-white font-bold hover:bg-white/10 transition-colors">
                                Follow
                            </button>
                            <button className="flex items-center justify-center size-12 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors">
                                <span className="material-symbols-outlined">more_horiz</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="px-8 mt-12 space-y-12">
                    {/* Top Tracks Section */}
                    {artistSongs.length > 0 && (
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Popular Tracks</h3>
                                <button className="text-primary text-sm font-semibold hover:underline">Show all</button>
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                                {artistSongs.slice(0, 5).map((song, index) => (
                                    <div key={song._id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-primary/10 group transition-colors cursor-pointer bg-white/50 dark:bg-transparent">
                                        <span className="w-6 text-center text-slate-500 font-medium group-hover:hidden">{index + 1}</span>
                                        <span className="w-6 text-center hidden group-hover:block"><Play className="size-4 text-primary mx-auto" fill="currentColor" /></span>
                                        <img src={song.imageUrl} alt={song.title} className="size-12 rounded-lg object-cover flex-shrink-0 shadow-sm" />
                                        <div className="flex-1">
                                            <p className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{song.title}</p>
                                            <p className="text-sm text-slate-500">{song.artist}</p>
                                        </div>
                                        <span className="hidden md:block text-sm text-slate-500">{Math.floor(Math.random() * 90000) + 10000} plays</span>
                                        <span className="text-sm text-slate-500 px-4">{formatDuration(song.duration)}</span>
                                        <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 text-primary transition-opacity mr-2">favorite</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Popular Albums Section */}
                    {artistAlbums.length > 0 && (
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Popular Albums</h3>
                                <button className="text-primary text-sm font-semibold hover:underline">See Discography</button>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                                {artistAlbums.map((album) => (
                                    <div key={album._id} className="group cursor-pointer">
                                        <div className="aspect-square rounded-xl overflow-hidden shadow-lg mb-3 shadow-primary/5">
                                            <img src={album.imageUrl} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                        <p className="font-bold text-sm truncate text-slate-900 dark:text-white group-hover:text-primary transition-colors">{album.title}</p>
                                        <p className="text-xs text-slate-500">{album.releaseYear} â€¢ Album</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Fans Also Like Section (Mock) */}
                    <section className="pb-12">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Fans Also Like</h3>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="flex flex-col items-center text-center group cursor-pointer">
                                    <div className="size-28 md:size-32 rounded-full overflow-hidden mb-4 shadow-xl border-4 border-transparent group-hover:border-primary/20 transition-all">
                                        <img src={`https://images.unsplash.com/photo-1544168190-79c154273140?w=300&h=300&fit=crop&q=80&sig=${i}`} alt="Related Artist" className="w-full h-full object-cover group-hover:brightness-110 transition-all group-hover:scale-105" />
                                    </div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-primary transition-colors">Similar Artist {i}</p>
                                    <p className="text-xs text-slate-500">Artist</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </ScrollArea>
        </main>
    );
};

export default ArtistPage;

