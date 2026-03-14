import Topbar from "@/components/Topbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuthStore } from "@/stores/useAuthStore";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SettingsPage = () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("account");
    const [audioQuality, setAudioQuality] = useState("lossless");
    const [normalizeVolume, setNormalizeVolume] = useState(true);
    const [twoFactor, setTwoFactor] = useState(false);
    const [displayName, setDisplayName] = useState(user?.displayName || "");

    const handleSignOut = () => {
        auth.signOut();
        navigate("/");
    };

    const navItems = [
        { id: "account", label: "Account", icon: "person" },
        { id: "subscription", label: "Subscription", icon: "payments" },
        { id: "audio", label: "Audio Quality", icon: "equalizer" },
        { id: "privacy", label: "Privacy", icon: "security" },
        { id: "devices", label: "Connected Devices", icon: "devices" },
    ];

    return (
        <main className="h-full overflow-hidden flex flex-col bg-background-light dark:bg-background-dark">
            <Topbar />
            <ScrollArea className="h-full flex-1">
                <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8 pb-24">
                    <h1 className="text-3xl font-black mb-8 text-slate-900 dark:text-white">Settings</h1>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Sidebar Nav */}
                        <aside className="w-full md:w-56 shrink-0">
                            <div className="p-4 mb-4 bg-primary/10 rounded-2xl flex items-center gap-3 border border-primary/20">
                                <div
                                    className="size-12 rounded-full bg-cover bg-center bg-slate-200"
                                    style={{ backgroundImage: user?.photoURL ? `url(${user.photoURL})` : undefined }}
                                >
                                    {!user?.photoURL && <span className="material-symbols-outlined text-primary/50 text-2xl flex items-center justify-center h-full">person</span>}
                                </div>
                                <div className="min-w-0">
                                    <p className="font-bold text-sm truncate text-slate-900 dark:text-white">{user?.displayName || "User"}</p>
                                    <p className="text-xs text-primary font-medium">Free Plan</p>
                                </div>
                            </div>
                            <nav className="flex flex-col gap-1">
                                {navItems.map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveSection(item.id)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium transition-colors text-left ${activeSection === item.id ? "bg-primary text-white" : "text-slate-600 dark:text-slate-400 hover:bg-primary/10"}`}
                                    >
                                        <span className="material-symbols-outlined text-sm">{item.icon}</span>
                                        {item.label}
                                    </button>
                                ))}
                            </nav>
                        </aside>

                        {/* Content */}
                        <section className="flex-1 flex flex-col gap-6">
                            {activeSection === "account" && (
                                <div className="bg-primary/5 dark:bg-primary/5 rounded-3xl p-6 border border-primary/10">
                                    <div className="flex justify-between items-center mb-6">
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Profile Information</h3>
                                            <p className="text-slate-400 text-sm">Update your personal details.</p>
                                        </div>
                                        <button className="px-6 py-2 rounded-full bg-primary text-white font-bold text-sm hover:opacity-90 transition-opacity">
                                            Save Changes
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Display Name</label>
                                            <input
                                                className="bg-white dark:bg-primary/10 border border-primary/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white"
                                                value={displayName}
                                                onChange={e => setDisplayName(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Email Address</label>
                                            <input
                                                className="bg-white dark:bg-primary/10 border border-primary/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white"
                                                value={user?.email || ""}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeSection === "audio" && (
                                <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
                                        <span className="material-symbols-outlined text-primary">equalizer</span>
                                        Audio Quality
                                    </h3>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-3 block">Streaming Quality</label>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                {["Automatic", "Normal", "High", "Lossless"].map(q => (
                                                    <button
                                                        key={q}
                                                        onClick={() => setAudioQuality(q.toLowerCase())}
                                                        className={`px-4 py-3 rounded-2xl border text-sm font-medium transition-all ${audioQuality === q.toLowerCase() ? "border-primary bg-primary/20 text-primary font-bold" : "border-primary/20 bg-primary/5 hover:bg-primary/10 text-slate-700 dark:text-slate-300"}`}
                                                    >
                                                        {q}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="font-medium text-slate-900 dark:text-white block">Normalize Volume</span>
                                                <span className="text-xs text-slate-400">Set the same volume level for all tracks</span>
                                            </div>
                                            <button
                                                onClick={() => setNormalizeVolume(v => !v)}
                                                className={`w-11 h-6 rounded-full transition-colors relative ${normalizeVolume ? "bg-primary" : "bg-slate-300 dark:bg-slate-700"}`}
                                            >
                                                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${normalizeVolume ? "translate-x-5" : "translate-x-0.5"}`} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeSection === "privacy" && (
                                <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
                                        <span className="material-symbols-outlined text-primary">security</span>
                                        Security & Privacy
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-primary/5 border border-primary/10">
                                            <div>
                                                <span className="font-medium text-slate-900 dark:text-white block">Two-Factor Authentication</span>
                                                <span className="text-xs text-slate-400">Add an extra layer of security</span>
                                            </div>
                                            <button
                                                onClick={() => setTwoFactor(v => !v)}
                                                className={`w-11 h-6 rounded-full transition-colors relative ${twoFactor ? "bg-primary" : "bg-slate-300 dark:bg-slate-700"}`}
                                            >
                                                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${twoFactor ? "translate-x-5" : "translate-x-0.5"}`} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeSection === "subscription" && (
                                <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-primary to-purple-700 text-white">
                                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                                        <div>
                                            <h3 className="text-2xl font-bold mb-2">Bessify Free</h3>
                                            <p className="text-white/80">Upgrade to Premium for unlimited skips, offline listening, and high-fidelity audio.</p>
                                        </div>
                                        <button className="px-8 py-3 rounded-full bg-white text-primary font-bold text-sm hover:bg-slate-100 transition-colors shrink-0">
                                            Go Premium
                                        </button>
                                    </div>
                                    <div className="absolute -right-10 -bottom-10 opacity-20">
                                        <span className="material-symbols-outlined text-[160px]">stars</span>
                                    </div>
                                </div>
                            )}

                            {(activeSection === "devices") && (
                                <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10 text-center">
                                    <span className="material-symbols-outlined text-5xl text-primary/30 mb-4 block">devices</span>
                                    <p className="text-slate-500">No connected devices found.</p>
                                </div>
                            )}

                            {/* Sign Out */}
                            <div className="flex justify-center pt-4">
                                <button onClick={handleSignOut} className="text-red-500 font-bold flex items-center gap-2 hover:opacity-80 transition-opacity">
                                    <span className="material-symbols-outlined">logout</span>
                                    Sign Out
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </ScrollArea>
        </main>
    );
};

export default SettingsPage;

