import { Link, useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import Topbar from "@/components/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { usePlaylistStore } from "@/stores/usePlaylistStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const LibraryPage = () => {
    const { albums, fetchAlbums, isLoading } = useMusicStore();
    const { playAlbum } = usePlayerStore();
    const { user } = useAuthStore();
    const { playlists, fetchPlaylists, createPlaylist } = usePlaylistStore();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("liked");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [playlistName, setPlaylistName] = useState("");

useEffect(() => {
        fetchAlbums();
        if (user?.clerkId) {
            fetchPlaylists(user.clerkId);
        }
    }, [fetchAlbums, fetchPlaylists, user]);

    const handleCreatePlaylist = () => {
        if (!user) {
            toast.error("Please sign in to create playlists");
            navigate("/login");
            return;
        }
        setShowCreateModal(true);
    };

    const handleSubmitPlaylist = async () => {
        if (!playlistName.trim()) {
            toast.error("Please enter a playlist name");
            return;
        }
        if (user?.clerkId) {
            await createPlaylist(playlistName, "", user.clerkId);
        }
        setPlaylistName("");
        setShowCreateModal(false);
    };

    const tabs = [
        { id: "liked", label: "Liked Songs", icon: "favorite" },
        { id: "playlists", label: "Playlists", icon: "playlist_play" },
        { id: "artists", label: "Artists", icon: "person" },
        { id: "albums", label: "Albums", icon: "album" },
    ];

    return (
        <main className="h-full overflow-hidden flex flex-col bg-background-light dark:bg-background-dark">
            <Topbar />
            {/* Create Playlist Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#1a0b25] border border-primary/20 rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Create Playlist</h2>
                        <p className="text-slate-500 text-sm mb-5">Give your new playlist a name</p>
                        <input
                            autoFocus
                            value={playlistName}
                            onChange={e => setPlaylistName(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && handleSubmitPlaylist()}
                            className="w-full bg-slate-100 dark:bg-slate-800 border border-primary/20 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 mb-4"
                            placeholder="My awesome playlist..."
                        />
                        <div className="flex gap-3">
                            <button onClick={() => setShowCreateModal(false)} className="flex-1 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm">
                                Cancel
                            </button>
                            <button onClick={handleSubmitPlaylist} className="flex-1 py-2.5 rounded-full bg-primary text-white font-bold hover:opacity-90 transition-opacity text-sm shadow-lg shadow-primary/30">
                                Create ✨
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ScrollArea className="h-full flex-1">
                <div className="px-6 lg:px-10 py-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                        <div>
                            <h1 className="text-4xl font-black tracking-tight mb-2 text-slate-900 dark:text-white">Your Library</h1>
                            <p className="text-slate-500 dark:text-slate-400">Manage your music, playlists, and followed artists.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={handleCreatePlaylist} className="flex items-center gap-2 bg-primary px-6 py-2.5 rounded-full text-white font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                                <span className="material-symbols-outlined text-lg">add</span>
                                <span>Create New</span>
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-4 mb-8 border-b border-primary/10">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex h-10 shrink-0 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold transition-all ${activeTab === tab.id
                                    ? "bg-primary text-white shadow-md shadow-primary/30"
                                    : "bg-primary/10 text-slate-700 dark:text-slate-300 hover:bg-primary/20"
                                    }`}
                            >
                                <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Liked Songs Banner */}
                    {activeTab === "liked" && (
                        <div className="space-y-10">
                            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-purple-700 p-8 flex items-center justify-between cursor-pointer group">
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="bg-white/20 p-4 rounded-xl backdrop-blur-md">
                                            <span className="material-symbols-outlined text-4xl text-white" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white">Liked Songs</h3>
                                            <p className="text-white/80">All your favorited tracks</p>
                                        </div>
                                    </div>
                                    <Link to="/liked" className="bg-white text-primary px-6 py-2 rounded-full font-bold inline-flex items-center gap-2 group-hover:scale-105 transition-transform">
                                        <span className="material-symbols-outlined">play_arrow</span>
                                        Play All
                                    </Link>
                                </div>
                                <div className="absolute -right-10 -bottom-10 opacity-20 pointer-events-none">
                                    <span className="material-symbols-outlined text-[200px] text-white">music_note</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Albums Tab */}
                    {activeTab === "albums" && (
                        <section className="pb-20">
                            {isLoading ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {[...Array(8)].map((_, i) => (
                                        <div key={i} className="aspect-square rounded-xl bg-primary/10 animate-pulse"></div>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {albums.map((album) => (
                                        <div key={album._id} className="flex flex-col gap-3 group">
                                            <div className="relative aspect-square rounded-xl overflow-hidden shadow-md">
                                                <img src={album.imageUrl} alt={album.title} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                                                <button
                                                    onClick={() => playAlbum(album.songs, 0)}
                                                    className="absolute bottom-3 right-3 bg-primary text-white p-3 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl"
                                                >
                                                    <span className="material-symbols-outlined">play_arrow</span>
                                                </button>
                                            </div>
                                            <div>
                                                <Link to={`/albums/${album._id}`} className="font-bold truncate block hover:text-primary transition-colors text-slate-900 dark:text-white">
                                                    {album.title}
                                                </Link>
                                                <p className="text-sm text-slate-500">{album.artist} â€¢ {album.releaseYear}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    )}

                    {activeTab === "playlists" && (
                        <section className="pb-20">
                            {playlists.length === 0 ? (
                                <div className="py-20 text-center text-slate-500">
                                    <span className="material-symbols-outlined text-6xl text-primary/30 mb-4 block">playlist_play</span>
                                    <p className="text-lg font-semibold">No playlists yet</p>
                                    <p className="text-sm mt-1">Create your first playlist to get started</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {playlists.map((playlist) => (
                                        <div key={playlist._id} className="flex flex-col gap-3 group">
                                            <div className="relative aspect-square rounded-xl overflow-hidden shadow-md bg-gradient-to-br from-primary/30 to-purple-600/30">
                                                <span className="material-symbols-outlined text-5xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/50">playlist_play</span>
                                            </div>
                                            <div>
                                                <Link to={`/playlist/${playlist._id}`} className="font-bold truncate block hover:text-primary transition-colors text-slate-900 dark:text-white">
                                                    {playlist.name}
                                                </Link>
                                                <p className="text-sm text-slate-500">{playlist.songs?.length || 0} songs</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    )}

                    {activeTab === "artists" && (
                        <div className="py-20 text-center text-slate-500">
                            <span className="material-symbols-outlined text-6xl text-primary/30 mb-4 block">person</span>
                            <p className="text-lg font-semibold">Coming Soon</p>
                            <p className="text-sm mt-1">This feature is under development.</p>
                        </div>
                    )}
                </div>
            </ScrollArea>
        </main>
    );
};

export default LibraryPage;

