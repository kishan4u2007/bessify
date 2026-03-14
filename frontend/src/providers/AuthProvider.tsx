import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

const updateApiToken = (token: string | null) => {
	if (token) axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	else delete axiosInstance.defaults.headers.common["Authorization"];
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [loading, setLoading] = useState(true);
	const { checkAdminStatus, setUser } = useAuthStore();
	const { initSocket, disconnectSocket } = useChatStore();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			setUser(user);
			try {
				if (user) {
					const token = await user.getIdToken();
					updateApiToken(token);
					await checkAdminStatus();
					// init socket
					initSocket(user.uid);

					// Synchronize user to our backend database
					await axiosInstance.post('/auth/sync', {
						uid: user.uid,
						email: user.email,
						displayName: user.displayName,
						photoURL: user.photoURL,
					});
				} else {
					updateApiToken(null);
					disconnectSocket();
				}
			} catch (error: any) {
				updateApiToken(null);
				console.log("Error in auth provider", error);
			} finally {
				setLoading(false);
			}
		});

		// clean up
		return () => {
			unsubscribe();
			disconnectSocket();
		};
	}, [checkAdminStatus, initSocket, disconnectSocket, setUser]);

	if (loading)
		return (
			<div className='h-screen w-full flex items-center justify-center bg-background-light dark:bg-background-dark'>
				<Loader className='size-8 text-primary animate-spin' />
			</div>
		);

	return <>{children}</>;
};
export default AuthProvider;
