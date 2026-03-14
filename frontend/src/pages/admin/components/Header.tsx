import { auth } from "@/lib/firebase";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
	const navigate = useNavigate();

	const handleSignOut = () => {
		auth.signOut();
		navigate("/");
	};

	return (
		<div className='flex items-center justify-between'>
			<div className='flex items-center gap-3 mb-8'>
				<Link to='/home' className='rounded-lg'>
					<img src='/spotify.png' className='size-10 text-black' />
				</Link>
				<div>
					<h1 className='text-3xl font-bold'>Music Manager</h1>
					<p className='text-zinc-500 dark:text-zinc-400 mt-1'>Manage your music catalog</p>
				</div>
			</div>
			<div className="flex gap-4 items-center">
				<Link to="/home" className='text-slate-600 dark:text-slate-300 font-semibold hover:text-primary transition-colors'>
					Go Home
				</Link>
				<button onClick={handleSignOut} className='flex items-center gap-2 text-red-500 font-semibold hover:opacity-80 transition-opacity'>
					<span className="material-symbols-outlined">logout</span>
					Sign Out
				</button>
			</div>
		</div>
	);
};
export default Header;
