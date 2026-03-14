import Topbar from "@/components/Topbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatDuration } from "../artist/ArtistPage";

const categories = [
    { title: "Pop", color: "from-indigo-500 to-purple-600", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop" },
    { title: "Hip-Hop", color: "from-emerald-500 to-teal-700", image: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5f4c5?w=300&h=300&fit=crop" },
    { title: "Rock", color: "from-orange-500 to-rose-600", image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop" },
    { title: "Electronic", color: "from-blue-600 to-cyan-500", image: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=300&h=300&fit=crop" },
    { title: "R&B", color: "from-pink-500 to-primary", image: "https://images.unsplash.com/photo-1493225244158-bdaab219277d?w=300&h=300&fit=crop" },
    { title: "Jazz", color: "from-amber-500 to-yellow-600", image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=300&h=300&fit=crop" },
    { title: "Classical", color: "from-slate-500 to-zinc-700", image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=300&fit=crop" },
    { title: "Lo-fi", color: "from-violet-600 to-fuchsia-600", image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&h=300&fit=crop" },
];

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const { trendingSongs, featuredSongs, songs, albums, fetchSongs, fetchAlbums, isLoading } = useMusicStore();
    const { setCurrentSong, currentSong, playAlbum } = usePlayerStore();

    useEffect(() => {
        fetchSongs();
        fetchAlbums();
    }, [fetchSongs, fetchAlbums]);

    const allSongs = songs.length > 0 ? songs : [...trendingSongs, ...featuredSongs];

    // Unique artists from songs
    const allArtists = Array.from(new Map(allSongs.map(s => [s.artist, s])).values());

    const filteredSongs = allSongs.filter(song =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredAlbums = albums.filter(album =>
        album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        album.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredArtists = allArtists.filter(s =>
        s.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const showResults = searchQuery.length > 0;

    const renderSongs = (list: typeof allSongs) => (
        <div className="space-y-1">
            {list.length === 0 ? (
                <p className="text-slate-500 text-center py-8">No songs found</p>
            ) : list.map((song, i) => (
                <div
                    key={song._id}
                    onClick={() => setCurrentSong(song)}
                    className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer group transition-colors ${currentSong?._id === song._id ? "bg-primary/15" : "hover:bg-primary/5"}`}
                >
                    <span className="w-6 text-center text-slate-400 text-sm group-hover:hidden">{i + 1}</span>
                    <span className="w-6 hidden group-hover:block text-primary material-symbols-outlined">play_arrow</span>
                    <img src={song.imageUrl} alt={song.title} className="size-12 rounded-lg object-cover" />
                    <div className="flex-1">
                        <p className={`font-semibold text-sm ${currentSong?._id === song._id ? "text-primary" : "text-slate-900 dark:text-white"}`}>{song.title}</p>
                        <Link to={`/artists/${encodeURIComponent(song.artist)}`} onClick={e => e.stopPropagation()} className="text-xs text-slate-500 hover:text-primary">{song.artist}</Link>
                    </div>
                    <span className="text-xs text-slate-500 hidden md:block">{formatDuration(song.duration)}</span>
                </div>
            ))}
        </div>
    );

    const renderAlbums = (list: typeof albums) => (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {list.length === 0 ? (
                <p className="col-span-full text-slate-500 text-center py-8">No albums found</p>
            ) : list.map(album => (
                <Link to={`/albums/${album._id}`} key={album._id} className="group flex flex-col gap-3">
                    <div className="relative aspect-square rounded-xl overflow-hidden shadow-md">
                        <img src={album.imageUrl} alt={album.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <button
                            onClick={e => { e.preventDefault(); playAlbum(album.songs, 0); }}
                            className="absolute bottom-2 right-2 bg-primary text-white p-2 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all shadow-lg"
                        >
                            <span className="material-symbols-outlined text-sm">play_arrow</span>
                        </button>
                    </div>
                    <div>
                        <p className="font-bold text-sm truncate text-slate-900 dark:text-white group-hover:text-primary transition-colors">{album.title}</p>
                        <p className="text-xs text-slate-500">{album.artist} â€¢ {album.releaseYear}</p>
                    </div>
                </Link>
            ))}
        </div>
    );

    const renderArtists = (list: typeof allArtists) => (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {list.length === 0 ? (
                <p className="col-span-full text-slate-500 text-center py-8">No artists found</p>
            ) : list.map(song => (
                <Link to={`/artists/${encodeURIComponent(song.artist)}`} key={song._id} className="group flex flex-col items-center text-center">
                    <div className="size-28 md:size-32 rounded-full overflow-hidden border-4 border-transparent group-hover:border-primary/30 transition-all mb-3 shadow-xl">
                        <img src={song.imageUrl} alt={song.artist} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <p className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-primary transition-colors truncate w-full">{song.artist}</p>
                    <p className="text-xs text-slate-500">Artist</p>
                </Link>
            ))}
        </div>
    );

    return (
        <main className="flex-1 h-full overflow-hidden bg-background-light dark:bg-background-dark relative flex flex-col">
            <Topbar />
            <ScrollArea className="h-full flex-1">
                <div className="px-4 sm:px-8 py-6 pb-32">
                    {/* Search Bar */}
                    <div className="max-w-4xl mx-auto mb-8">
                        <div className="relative group">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                            <input
                                className="w-full h-14 pl-12 pr-12 rounded-2xl border-none bg-slate-200/50 dark:bg-primary/10 focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-slate-100 text-lg transition-all placeholder:text-slate-400"
                                placeholder="Search for songs, artists, or albums..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                type="text"
                                autoFocus
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                    <span className="material-symbols-outlined">cancel</span>
                                </button>
                            )}
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                            {["All", "Songs", "Artists", "Albums", "Playlists"].map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all flex-shrink-0 ${activeFilter === filter
                                        ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105"
                                        : "bg-slate-200 dark:bg-primary/10 hover:bg-slate-300 dark:hover:bg-primary/20 text-slate-600 dark:text-slate-300"
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Search Results */}
                    {showResults ? (
                        <div className="space-y-10">
                            {(activeFilter === "All" || activeFilter === "Songs") && (
                                <section>
                                    <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Songs</h2>
                                    {isLoading ? <p className="text-slate-400">Loading...</p> : renderSongs(filteredSongs.slice(0, activeFilter === "Songs" ? 50 : 5))}
                                </section>
                            )}
                            {(activeFilter === "All" || activeFilter === "Artists") && (
                                <section>
                                    <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Artists</h2>
                                    {renderArtists(filteredArtists.slice(0, activeFilter === "Artists" ? 50 : 6))}
                                </section>
                            )}
                            {(activeFilter === "All" || activeFilter === "Albums") && (
                                <section>
                                    <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Albums</h2>
                                    {renderAlbums(filteredAlbums.slice(0, activeFilter === "Albums" ? 50 : 5))}
                                </section>
                            )}
                            {(activeFilter === "All" || activeFilter === "Playlists") && (
                                <section>
                                    <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Playlists</h2>
                                    <div className="py-8 text-center text-slate-500">
                                        <span className="material-symbols-outlined text-5xl text-primary/30 mb-3 block">playlist_play</span>
                                        <p>No playlists found</p>
                                    </div>
                                </section>
                            )}
                        </div>
                    ) : (
                        /* Browse All */
                        <section className="pb-20">
                            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Browse All</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {categories.map((category) => (
                                    <div
                                        key={category.title}
                                        onClick={() => { setSearchQuery(category.title); setActiveFilter("All"); }}
                                        className={`aspect-square rounded-2xl p-5 relative overflow-hidden bg-gradient-to-br ${category.color} group cursor-pointer shadow-lg hover:scale-[1.03] transition-transform`}
                                    >
                                        <h3 className="text-xl font-bold text-white relative z-10">{category.title}</h3>
                                        <img
                                            className="absolute -right-4 -bottom-4 size-28 rotate-12 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 opacity-80 rounded-xl shadow-lg"
                                            src={category.image}
                                            alt={category.title}
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </ScrollArea>
        </main>
    );
};

export default SearchPage;

