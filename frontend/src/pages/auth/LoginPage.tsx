import { Input } from "@/components/ui/input";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const LoginPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
            await signInWithPopup(auth, googleProvider);
            navigate("/home");
        } catch (error: any) {
            console.error("Login failed", error);
            toast.error(error.message || "Failed to authenticate with Google. Check Firebase Config.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) return toast.error("Please fill in all fields");

        setIsLoading(true);
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            navigate("/home");
        } catch (error: any) {
            console.error("Auth error", error);
            toast.error(error.message || "Failed to authenticate.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-mesh bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 selection:bg-primary/30">
            <header className="flex items-center justify-between px-6 py-6 lg:px-20 max-w-7xl mx-auto w-full z-10">
                <Link to="/" className="flex items-center gap-3">
                    <div className="size-10 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(218,19,236,0.4)]">
                        <span className="material-symbols-outlined text-white">polymer</span>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-slate-900 dark:from-white to-primary/60 bg-clip-text text-transparent">Bessify</h2>
                </Link>
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
                    <a className="hover:text-primary transition-colors" href="#">Support</a>
                    <a className="hover:text-primary transition-colors" href="#">Privacy</a>
                    <a className="hover:text-primary transition-colors" href="#">Terms</a>
                </div>
            </header>

            <main className="flex-1 flex items-center justify-center px-4 py-8 z-10">
                <div className="w-full max-w-[480px] space-y-8">
                    <div className="text-center space-y-3">
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                            {isLogin ? "Welcome back" : "Create Account"}
                        </h1>
                        <p className="text-slate-500 text-lg">Experience the future of connection</p>
                    </div>
                    <div className="glass-panel rounded-xl p-8 shadow-2xl bg-white/50 dark:bg-background-dark/50 backdrop-blur-md border border-primary/10">
                        <div className="flex p-1 bg-slate-200 dark:bg-primary/10 rounded-full mb-8">
                            <button
                                onClick={() => setIsLogin(true)}
                                className={`flex-1 py-2 text-sm font-semibold rounded-full transition-all ${isLogin ? 'bg-primary text-white shadow-lg' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setIsLogin(false)}
                                className={`flex-1 py-2 text-sm font-semibold rounded-full transition-all ${!isLogin ? 'bg-primary text-white shadow-lg' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                            >
                                Signup
                            </button>
                        </div>
                        <form className="space-y-5" onSubmit={handleAuth}>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-600 dark:text-slate-300 ml-1">Email Address</label>
                                <div className="relative group">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">mail</span>
                                    <Input
                                        className="w-full pl-12 pr-4 py-6 bg-slate-100 dark:bg-primary/5 border border-primary/20 rounded-xl focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 transition-all outline-none text-slate-900 dark:text-white dark:placeholder:text-slate-600"
                                        placeholder="name@company.com"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Password</label>
                                    <a className="text-xs text-primary hover:underline" href="#">Forgot password?</a>
                                </div>
                                <div className="relative group">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">lock</span>
                                    <Input
                                        className="w-full pl-12 pr-12 py-6 bg-slate-100 dark:bg-primary/5 border border-primary/20 rounded-xl focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 transition-all outline-none text-slate-900 dark:text-white dark:placeholder:text-slate-600"
                                        placeholder="••••••••"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        minLength={6}
                                    />
                                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors" type="button">
                                        <span className="material-symbols-outlined">visibility</span>
                                    </button>
                                </div>
                            </div>
                            <button disabled={isLoading} className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(218,19,236,0.3)] transition-all transform hover:scale-[1.01] active:scale-[0.99] mt-4 flex justify-center items-center">
                                {isLoading ? <Loader2 className="animate-spin" /> : (isLogin ? "Sign In" : "Sign Up")}
                            </button>
                        </form>

                        <div className="relative my-8 text-center">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-primary/20"></div>
                            </div>
                            <span className="relative bg-white dark:bg-[#261528] px-4 text-xs font-medium text-slate-500 uppercase tracking-widest">Or continue with</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={handleGoogleLogin}
                                disabled={isLoading}
                                className="flex items-center justify-center gap-3 py-3 px-4 glass-panel bg-white/50 dark:bg-transparent hover:bg-primary/10 rounded-xl transition-all border border-primary/20"
                                type="button"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.9 3.22-1.76 4.08-1.1 1.1-2.76 2.21-5.64 2.21-4.46 0-7.85-3.59-7.85-8.05s3.39-8.05 7.85-8.05c2.42 0 4.14.93 5.43 2.14l2.3-2.3C18.44 2.05 15.7 0 12.48 0 6.67 0 1.93 4.74 1.93 10.55s4.74 10.55 10.55 10.55c3.39 0 5.96-1.1 7.99-3.22 2.09-2.09 2.76-5.02 2.76-7.39 0-.54-.05-1.03-.14-1.57h-10.6z" fill="#EA4335"></path>
                                </svg>
                                <span className="text-sm font-semibold text-slate-900 dark:text-white">Google</span>
                            </button>
                            <button
                                className="flex items-center justify-center gap-3 py-3 px-4 glass-panel bg-white/50 dark:bg-transparent hover:bg-primary/10 rounded-xl transition-all border border-primary/20"
                            >
                                <svg className="w-5 h-5 text-slate-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.05 20.28c-.96.95-2.04 1.72-3.23 1.72-1.18 0-1.6-.71-2.98-.71s-1.85.71-2.98.71c-1.18 0-2.33-.87-3.35-1.89C2.42 18.06 1 14.47 1 11.23c0-3.32 2.07-5.07 4.04-5.07 1.04 0 2.02.39 2.65.39.62 0 1.83-.46 3.03-.46 1.25 0 2.37.45 3.12 1.23-2.14 1.25-1.8 4.36.35 5.56-1.04 2.53-2.14 5.4-4.14 7.4zM12.03 5.07c0-2.3 1.89-4.07 4-4.07.13 2.45-2.08 4.56-4 4.07z"></path>
                                </svg>
                                <span className="text-sm font-semibold text-slate-900 dark:text-white">Apple</span>
                            </button>
                        </div>
                    </div>

                    <div className="text-center pb-8">
                        <p className="text-slate-500 text-sm">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button onClick={() => setIsLogin(!isLogin)} className="text-primary font-bold hover:underline">
                                {isLogin ? "Start for free" : "Sign In"}
                            </button>
                        </p>
                    </div>
                </div>
            </main>

            <div className="absolute -z-10 top-1/4 -right-24 size-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute -z-10 bottom-1/4 -left-24 size-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
        </div>
    );
};

export default LoginPage;
