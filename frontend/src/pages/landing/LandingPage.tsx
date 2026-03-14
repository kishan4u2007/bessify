import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";

const LandingPage = () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();

    const rooms = [
        {
            title: "Midnight Lo-fi Beats",
            desc: "The perfect room for late-night study sessions or unwinding after a long day.",
            listeners: "1.2k",
            img: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=600&h=400&fit=crop",
            avatars: [
                "https://images.unsplash.com/photo-1494790108755-2616b96cce0c?w=40&h=40&fit=crop&face",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&face",
            ],
        },
        {
            title: "Weekend Club Anthems",
            desc: "Live DJ set from Ibiza. High energy techno and house music to start your weekend.",
            listeners: "4.8k",
            img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop",
            avatars: [
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&face",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&face",
            ],
        },
        {
            title: "Indie Showcase",
            desc: "Discover the best upcoming independent artists from around the globe.",
            listeners: "850",
            img: "https://images.unsplash.com/photo-1493225255234-4c48d6cb7f70?w=600&h=400&fit=crop",
            avatars: [
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&face",
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&face",
            ],
        },
    ];

    const communityPlaylists = [
        { genre: "Synthwave", title: "Retro Futurism", by: "Alex Rivers", img: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=400&h=400&fit=crop" },
        { genre: "Underground", title: "Berlin Afterhours", by: "Marcus V", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop" },
        { genre: "Chill", title: "Morning Coffee", by: "Elena Ross", img: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&h=400&fit=crop" },
        { genre: "Indie", title: "Bedroom Pop", by: "Sam K.", img: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&h=400&fit=crop" },
    ];

    const features = [
        { icon: "auto_awesome", title: "Mood Sync", desc: "Feeling melancholic or hyper? Our algorithm adapts to your current emotional state instantly." },
        { icon: "explore", title: "Genre Bender", desc: "Break out of your music bubble with unexpected but perfect recommendations from outside your history." },
        { icon: "history_edu", title: "Deep Dives", desc: "Explore the roots and connections between your favorite artists and the genres they pioneered." },
    ];

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-dark text-slate-100 overflow-x-hidden font-display">

            {/* ─── NAVIGATION ─── */}
            <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background-dark/80 backdrop-blur-md px-6 md:px-20 py-4">
                <nav className="mx-auto flex max-w-7xl items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-3xl">music_note</span>
                            <h2 className="text-xl font-black tracking-tight">Bessify</h2>
                        </div>
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#rooms" className="text-sm font-medium text-slate-300 hover:text-primary transition-colors">Discover</a>
                            <a href="#rooms" className="text-sm font-medium text-slate-300 hover:text-primary transition-colors">Rooms</a>
                            <a href="#community" className="text-sm font-medium text-slate-300 hover:text-primary transition-colors">Community</a>
                            <a href="#cta" className="text-sm font-medium text-slate-300 hover:text-primary transition-colors">Pricing</a>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden lg:flex items-center rounded-full px-4 py-1.5 border border-primary/20 bg-primary/5 backdrop-blur-md">
                            <span className="material-symbols-outlined text-primary/70 text-sm">search</span>
                            <input className="bg-transparent border-none focus:outline-none text-sm text-slate-100 placeholder:text-slate-500 w-32 xl:w-48 ml-2" placeholder="Search vibes..." type="text" />
                        </div>
                        {user ? (
                            <button onClick={() => navigate("/home")} className="bg-primary hover:bg-primary/90 text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all" style={{ boxShadow: "0 0 20px rgba(218,19,236,0.4)" }}>
                                Open App
                            </button>
                        ) : (
                            <Link to="/login" className="bg-primary hover:bg-primary/90 text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all" style={{ boxShadow: "0 0 20px rgba(218,19,236,0.4)" }}>
                                Get Started
                            </Link>
                        )}
                    </div>
                </nav>
            </header>

            {/* ─── HERO ─── */}
            <section className="relative px-6 py-20 md:py-32 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 blur-[120px] rounded-full -z-10 opacity-50" />
                <div className="mx-auto max-w-7xl flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1 mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                        </span>
                        <span className="text-xs font-bold uppercase tracking-widest text-primary">Live Now: Global Techno Rave</span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black leading-tight tracking-tighter mb-6">
                        Listen{" "}
                        <span style={{ background: "linear-gradient(to right, #da13ec, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Together</span>,<br />
                        Discover Deeper.
                    </h1>
                    <p className="max-w-2xl text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
                        Experience music like never before with real-time social listening, shared queues, and AI-driven discovery tailored to your vibe.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Link to="/login" className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-10 rounded-full transition-all text-lg" style={{ boxShadow: "0 0 20px rgba(218,19,236,0.4)" }}>
                            Start Listening Free
                        </Link>
                        <Link to="/chat" className="text-slate-100 font-bold py-4 px-10 rounded-full transition-all text-lg border border-primary/20 bg-primary/5 backdrop-blur-md hover:bg-primary/10">
                            Join a Room
                        </Link>
                    </div>

                    {/* Hero Preview */}
                    <div className="mt-20 relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden border border-primary/30 bg-primary/5 backdrop-blur-md shadow-2xl">
                        <img
                            className="w-full h-full object-cover opacity-60"
                            alt="Concert crowd with purple and cyan neon lights"
                            src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1280&h=720&fit=crop"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent" />
                        <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                            <div className="flex flex-col gap-2">
                                <span className="text-primary font-bold">Now Playing</span>
                                <div className="flex items-center gap-4">
                                    <div className="size-16 rounded-lg bg-primary/20 p-1 border border-primary/40 overflow-hidden">
                                        <img className="w-full h-full object-cover rounded" alt="Album cover" src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=80&h=80&fit=crop" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white leading-tight">Neon Nights</h4>
                                        <p className="text-slate-400">Electronic Resonance</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex -space-x-4">
                                {["photo-1494790108755-2616b96cce0c", "photo-1507003211169-0a1dd7228f2d", "photo-1534528741775-53994a69daeb"].map((p, i) => (
                                    <div key={i} className="size-12 rounded-full border-2 border-background-dark overflow-hidden">
                                        <img className="w-full h-full object-cover" alt="" src={`https://images.unsplash.com/${p}?w=50&h=50&fit=crop&face`} />
                                    </div>
                                ))}
                                <div className="size-12 rounded-full border-2 border-background-dark bg-primary flex items-center justify-center text-xs font-bold text-white">+142</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── STATS ─── */}
            <section className="py-12 border-y border-primary/10">
                <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { label: "Active Listeners", value: "2.4M+" },
                        { label: "Music Rooms", value: "18K" },
                        { label: "Monthly Vibes", value: "50M+" },
                        { label: "Artist Partners", value: "120K" },
                    ].map((s, i) => (
                        <div key={s.label} className={`text-center ${i > 0 ? "border-l border-primary/10" : ""}`}>
                            <p className="text-slate-400 text-sm font-medium mb-1">{s.label}</p>
                            <p className="text-3xl font-black">{s.value}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── ROOMS ─── */}
            <section id="rooms" className="py-24 px-6 bg-gradient-to-b from-transparent to-primary/5">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Social Listening Rooms</h2>
                            <p className="text-lg text-slate-400">Jump into real-time interactive spaces where you can DJ with friends or join global listening parties hosted by your favorite artists.</p>
                        </div>
                        <Link to="/chat" className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all group whitespace-nowrap">
                            Browse all rooms <span className="material-symbols-outlined transition-all group-hover:translate-x-1">arrow_forward</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {rooms.map((room) => (
                            <div key={room.title} className="group relative rounded-xl overflow-hidden p-4 border border-primary/10 hover:border-primary/40 transition-all" style={{ background: "rgba(218,19,236,0.05)", backdropFilter: "blur(12px)" }}>
                                <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
                                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={room.img} alt={room.title} />
                                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-primary text-xs">group</span>
                                        <span className="text-white text-xs font-bold">{room.listeners}</span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{room.title}</h3>
                                <p className="text-slate-400 text-sm mb-6">{room.desc}</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex -space-x-2">
                                        {room.avatars.map((a, i) => (
                                            <div key={i} className="size-8 rounded-full border border-background-dark overflow-hidden">
                                                <img className="w-full h-full object-cover" src={a} alt="" />
                                            </div>
                                        ))}
                                    </div>
                                    <Link to="/chat" className="bg-primary/20 text-primary hover:bg-primary hover:text-white font-bold py-2 px-6 rounded-full text-xs transition-all uppercase tracking-wider">
                                        Join Room
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── SMART DISCOVERY ─── */}
            <section className="py-24 px-6 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
                <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">Smart Discovery:<br />Your Vibe, Multiplied.</h2>
                        <p className="text-lg text-slate-400 mb-10 leading-relaxed">Our AI doesn't just look at what you've heard. It understands your mood, the time of day, and even the weather to curate the perfect emotional soundscape.</p>
                        <div className="space-y-6">
                            {features.map(f => (
                                <div key={f.title} className="flex gap-4 items-start">
                                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                                        <span className="material-symbols-outlined">{f.icon}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-1">{f.title}</h4>
                                        <p className="text-slate-400">{f.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Mood Wheel UI */}
                    <div className="relative">
                        <div className="aspect-square rounded-xl overflow-hidden p-6 border border-primary/20 relative" style={{ background: "rgba(218,19,236,0.05)", backdropFilter: "blur(12px)" }}>
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-black text-white">Mood Wheel</h3>
                                <span className="material-symbols-outlined text-primary">settings</span>
                            </div>
                            <div className="flex-1 flex items-center justify-center">
                                <div className="relative size-64 flex items-center justify-center">
                                    <div className="absolute inset-0 border-4 border-dashed border-primary/20 rounded-full" />
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary px-4 py-1 rounded-full text-xs font-bold text-white" style={{ boxShadow: "0 0 15px rgba(218,19,236,0.4)" }}>ENERGETIC</div>
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-slate-800 px-4 py-1 rounded-full text-xs font-bold text-slate-400">CHILL</div>
                                    <div className="size-48 bg-gradient-to-tr from-primary to-blue-500 rounded-full blur-3xl opacity-30 animate-pulse" />
                                    <div className="absolute size-40 border border-primary/30 rounded-full flex items-center justify-center" style={{ background: "rgba(218,19,236,0.05)", backdropFilter: "blur(12px)" }}>
                                        <div className="text-center">
                                            <span className="material-symbols-outlined text-4xl text-primary mb-2">music_note</span>
                                            <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Optimizing Vibe</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="p-3 rounded-lg border border-primary/10" style={{ background: "rgba(218,19,236,0.05)" }}>
                                    <p className="text-xs text-slate-500 mb-1">Current Mood</p>
                                    <p className="text-sm font-bold text-white">Cloudy Afternoon</p>
                                </div>
                                <div className="p-3 rounded-lg border border-primary/10" style={{ background: "rgba(218,19,236,0.05)" }}>
                                    <p className="text-xs text-slate-500 mb-1">Energy Level</p>
                                    <p className="text-sm font-bold text-white">74% Hyper</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── COMMUNITY ─── */}
            <section id="community" className="py-24 px-6 bg-background-dark">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Community Curation</h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">The best music isn't found by machines, it's discovered by people. Follow the world's best curators and contribute to the hive mind.</p>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {communityPlaylists.map(pl => (
                            <div key={pl.title} className="group relative overflow-hidden rounded-xl cursor-pointer">
                                <img className="aspect-square w-full object-cover group-hover:scale-110 transition-transform duration-700" src={pl.img} alt={pl.title} />
                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-90" />
                                <div className="absolute bottom-0 left-0 p-6 w-full">
                                    <p className="text-xs font-bold text-primary mb-1 uppercase tracking-widest">{pl.genre}</p>
                                    <h4 className="text-lg font-bold text-white mb-2">{pl.title}</h4>
                                    <p className="text-xs text-slate-400">By {pl.by}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FINAL CTA ─── */}
            <section id="cta" className="py-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary opacity-5 -z-10" />
                <div className="mx-auto max-w-5xl rounded-xl p-12 md:p-20 text-center border border-primary/20 relative" style={{ background: "rgba(218,19,236,0.05)", backdropFilter: "blur(12px)" }}>
                    <div className="absolute -top-10 -right-10 size-40 bg-primary/20 blur-[60px] rounded-full" />
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">Ready to find your vibe?</h2>
                    <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">Join millions of music lovers who are already experiencing the future of social streaming. No ads, just connections.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/login" className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-12 rounded-full transition-all text-lg" style={{ boxShadow: "0 0 20px rgba(218,19,236,0.4)" }}>
                            Get Started for Free
                        </Link>
                        <button className="bg-slate-100 text-slate-900 hover:bg-white font-bold py-4 px-12 rounded-full transition-all text-lg">
                            Download Desktop App
                        </button>
                    </div>
                    <p className="mt-8 text-sm text-slate-500 italic">Available on iOS, Android, macOS, and Windows.</p>
                </div>
            </section>

            {/* ─── FOOTER ─── */}
            <footer className="py-12 px-6 border-t border-primary/10">
                <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-2xl">music_note</span>
                        <h2 className="text-lg font-black tracking-tight">Bessify</h2>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-slate-400">
                        {["Privacy Policy", "Terms of Service", "Cookies", "Contact"].map(item => (
                            <a key={item} className="hover:text-primary transition-colors" href="#">{item}</a>
                        ))}
                    </div>
                    <div className="flex gap-4">
                        {["alternate_email", "share"].map(icon => (
                            <div key={icon} className="size-8 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center text-slate-400 hover:text-primary cursor-pointer transition-colors">
                                <span className="material-symbols-outlined text-sm">{icon}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <p className="text-center text-xs text-slate-600 mt-12">© 2024 Bessify Streaming. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
