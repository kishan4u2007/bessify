import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

export interface AuthStore {
	isAdmin: boolean;
	isLoading: boolean;
	error: string | null;
	user: any | null;

	checkAdminStatus: () => Promise<void>;
	setUser: (user: any | null) => void;
	reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
	isAdmin: false,
	isLoading: false,
	error: null,
	user: null,

	checkAdminStatus: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/admin/check");
			set({ isAdmin: response.data.admin });
		} catch (error: any) {
			set({ isAdmin: false, error: error.response?.data?.message || "Error checking admin status" });
		} finally {
			set({ isLoading: false });
		}
	},

	setUser: (user) => set({ user }),

	reset: () => {
		set({ isAdmin: false, isLoading: false, error: null, user: null });
	},
}));
