import { ScrollArea } from "@/components/ui/scroll-area";
import Topbar from "@/components/Topbar";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMusicStore } from "@/stores/useMusicStore";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProfilePage = () => {
    const { user } = useAuthStore();
    const { albums, songs, fetchAlbums, fetchSongs } = useMusicStore();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("playlists");

    useEffect(() => {
        fetchAlbums();
        fetchSongs();
    }, [fetchAlbums, fetchSongs]);

    const handleSignOut = () => {
        auth.signOut();
        navigate("/");
    };

    const savedAlbums = albums.length;
    const totalSongs = songs.length;

    return (
        <main className="h-full overflow-hidden flex flex-col bg-background-light dark:bg-background-dark">
            <Topbar />
            <ScrollArea className="h-full flex-1">
                <div className="max-w-5xl mx-auto px-4 lg:px-10 py-8 pb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* â”€â”€ LEFT PROFILE SIDEBAR â”€â”€ */}
                        <aside className="lg:col-span-4 flex flex-col gap-5">
                            {/* Avatar Card */}
                            <div className="flex flex-col items-center p-6 rounded-2xl bg-primary/5 dark:bg-primary/10 border border-primary/10">
                                <div className="relative">
                                    <div
                                        className="size-32 rounded-full border-4 border-primary shadow-xl shadow-primary/20 bg-slate-200 dark:bg-slate-700 overflow-hidden flex items-center justify-center"
                                    >
                                        {user?.photoURL ? (
                                            <img src={user.photoURL} alt="avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="material-symbols-outlined text-5xl text-primary/50">person</span>
                                        )}
                                    </div>
                                    <div className="absolute bottom-2 right-2 size-7 bg-primary rounded-full border-4 border-white dark:border-[#201022] flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[11px] text-white">verified</span>
                                    </div>
                                </div>
                                <div className="mt-4 text-center">
                                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {user?.displayName || user?.email?.split("@")[0] || "Bessify User"}
                                    </h1>
                                    <p className="text-primary font-medium text-sm mt-1">@{user?.email?.split("@")[0] || "user"}</p>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Music lover & vibe curator.</p>
                                </div>
                                <div className="w-full mt-5 space-y-2">
                                    <button className="flex w-full items-center justify-center gap-2 rounded-full h-10 px-4 bg-primary text-white text-sm font-bold hover:opacity-90 transition-opacity">
                                        <span className="material-symbols-outlined text-sm">edit</span>
                                        Edit Profile
                                    </button>
                                    <button
                                        onClick={handleSignOut}
                                        className="flex w-full items-center justify-center gap-2 rounded-full h-10 px-4 bg-red-50 dark:bg-red-900/20 text-red-500 text-sm font-bold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-sm">logout</span>
                                        Sign Out
                                    </button>
                                </div>
                            </div>

                            {/* Quick Nav */}
                            <nav className="flex flex-col gap-1 p-2 rounded-xl bg-primary/5 border border-primary/10">
                                {[
                                    { id: "playlists", icon: "playlist_play", label: "My Playlists" },
                                    { id: "statistics", icon: "bar_chart", label: "Statistics" },
                                ].map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium transition-colors text-left ${activeTab === item.id ? "bg-primary text-white" : "text-slate-600 dark:text-slate-400 hover:bg-primary/10"}`}
                                    >
                                        <span className="material-symbols-outlined text-sm">{item.icon}</span>
                                        {item.label}
                                    </button>
                                ))}
                                <button
                                    onClick={() => navigate("/settings")}
                                    className="flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-primary/10 transition-colors text-left"
                                >
                                    <span className="material-symbols-outlined text-sm">settings</span>
                                    Settings
                                </button>
                            </nav>
                        </aside>

                        {/* â”€â”€ MAIN CONTENT â”€â”€ */}
                        <div className="lg:col-span-8 flex flex-col gap-6">
                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { label: "Saved Albums", value: savedAlbums },
                                    { label: "Total Songs", value: totalSongs },
                                    { label: "Playlists", value: 0 },
                                ].map(stat => (
                                    <div key={stat.label} className="flex flex-col gap-1 rounded-xl border border-primary/20 p-4 items-center text-center bg-white dark:bg-primary/5">
                                        <p className="text-primary text-2xl font-bold">{stat.value}</p>
                                        <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Tab Bar */}
                            <div className="flex border-b border-primary/20">
                                {["playlists", "statistics"].map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb-3 px-6 text-sm font-bold capitalize border-b-2 transition-colors ${activeTab === tab ? "border-primary text-primary" : "border-transparent text-slate-500 dark:text-slate-400 hover:text-primary"}`}
                                    >
                                        {tab === "playlists" ? "Playlists" : "Statistics"}
                                    </button>
                                ))}
                            </div>

                            {/* Playlists Tab */}
                            {activeTab === "playlists" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { name: "Liked Songs", songs: totalSongs, icon: "favorite", gradient: "from-primary to-purple-900" },
                                        { name: "Recently Played", songs: 0, icon: "history", gradient: "from-blue-600 to-primary" },
                                    ].map(pl => (
                                        <div key={pl.name} className="flex items-center gap-4 p-3 rounded-xl bg-primary/5 border border-transparent hover:border-primary/30 transition-all group cursor-pointer">
                                            <div className={`size-14 rounded-lg bg-gradient-to-br ${pl.gradient} flex items-center justify-center shrink-0`}>
                                                <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{pl.icon}</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold truncate text-slate-900 dark:text-white">{pl.name}</p>
                                                <p className="text-xs text-slate-500">{pl.songs} songs</p>
                                            </div>
                                            <span className="material-symbols-outlined text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => navigate("/library")}
                                        className="flex items-center gap-4 p-3 rounded-xl border-2 border-dashed border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all cursor-pointer text-primary"
                                    >
                                        <div className="size-14 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-2xl">add</span>
                                        </div>
                                        <p className="font-bold text-sm">Create New Playlist</p>
                                    </button>
                                </div>
                            )}

                            {/* Statistics Tab */}
                            {activeTab === "statistics" && (
                                <div className="flex flex-col gap-4 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/10">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Your Music Library</h3>
                                        <span className="material-symbols-outlined text-primary">bar_chart</span>
                                    </div>
                                    {[
                                        { name: "Saved Albums", value: savedAlbums, pct: Math.min(savedAlbums * 10, 100) },
                                        { name: "Total Songs", value: totalSongs, pct: Math.min(totalSongs * 5, 100) },
                                    ].map(g => (
                                        <div key={g.name}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-slate-700 dark:text-slate-300">{g.name}</span>
                                                <span className="font-bold text-slate-900 dark:text-white">{g.value}</span>
                                            </div>
                                            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                                                <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${Math.max(g.pct, 3)}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                    <p className="text-xs text-slate-500 mt-1">Data is based on content available in the app.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </main>
    );
};

export default ProfilePage;

