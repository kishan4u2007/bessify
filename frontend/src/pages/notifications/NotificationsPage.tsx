import Topbar from "@/components/Topbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

const notifications = [
    { id: 1, type: "release", title: "New releases from artists", desc: "The Weeknd just dropped a new single 'Neon Lights'. Experience the future of pop.", time: "2m ago", icon: "new_releases", iconBg: "bg-primary", img: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5f4c5?w=80&h=80&fit=crop" },
    { id: 2, type: "playlist", title: "Playlist updates", desc: "Your 'Midnight Vibes' playlist has 12 new tracks added by the curators.", time: "1h ago", icon: "playlist_add_check", iconBg: "bg-cyan-500", img: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=80&h=80&fit=crop" },
    { id: 3, type: "follower", title: "New followers", desc: "Sarah, Mike and 3 others started following your public profile.", time: "3h ago", icon: "person_add", iconBg: "bg-green-500", img: null },
    { id: 4, type: "friend", title: "Friend listening activity", desc: "Alex is currently vibing to 'Lofi Chill'. Join the session?", time: "5h ago", icon: "headphones", iconBg: "bg-blue-500", img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop", action: "Join" },
    { id: 5, type: "premium", title: "Premium Anniversary", desc: "Happy 1 year! You've been vibing on Bessify for a whole year.", time: "Yesterday", icon: "workspace_premium", iconBg: "bg-amber-500", img: null },
];

const NotificationsPage = () => {
    const [activeTab, setActiveTab] = useState("All");

    return (
        <main className="h-full overflow-hidden flex flex-col bg-background-light dark:bg-background-dark">
            <Topbar />
            <ScrollArea className="h-full flex-1">
                <div className="max-w-3xl mx-auto px-4 lg:px-8 py-8 pb-24">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary">notifications_active</span>
                            </div>
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Notifications</h1>
                        </div>
                        <div className="flex gap-2">
                            <button title="Mark all read" className="size-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
                                <span className="material-symbols-outlined flex items-center justify-center h-full">done_all</span>
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-8 border-b border-primary/20 mb-6">
                        {["All", "Music", "Social"].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === tab ? "border-primary text-primary" : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-col gap-3">
                        {notifications.map(n => (
                            <div key={n.id} className="flex items-start gap-4 p-4 rounded-2xl bg-primary/5 dark:bg-primary/5 border border-transparent hover:border-primary/20 transition-all cursor-pointer group">
                                <div className="relative shrink-0">
                                    {n.img ? (
                                        <img src={n.img} alt="" className="size-16 rounded-xl object-cover" />
                                    ) : (
                                        <div className="size-16 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-primary text-2xl">{n.icon}</span>
                                        </div>
                                    )}
                                    <div className={`absolute -bottom-1 -right-1 ${n.iconBg} rounded-full size-6 flex items-center justify-center border-2 border-white dark:border-[#201022]`}>
                                        <span className="material-symbols-outlined text-[12px] text-white">{n.icon}</span>
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <p className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-primary transition-colors">{n.title}</p>
                                        <span className="text-[10px] text-slate-400 shrink-0 ml-4">{n.time}</span>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{n.desc}</p>
                                    {n.action && (
                                        <button className="mt-2 px-4 py-1.5 bg-primary/20 hover:bg-primary text-primary hover:text-white rounded-full text-xs font-bold transition-all">
                                            {n.action}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollArea>
        </main>
    );
};

export default NotificationsPage;

