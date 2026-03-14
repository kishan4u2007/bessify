import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface Playlist {
	_id: string;
	name: string;
	description: string;
	imageUrl: string;
	songs: string[];
	owner: string;
	isPublic: boolean;
	createdAt: string;
}

interface PlaylistStore {
	playlists: Playlist[];
	isLoading: boolean;
	error: string | null;
	fetchPlaylists: (userId: string) => Promise<void>;
	createPlaylist: (name: string, description: string, userId: string) => Promise<Playlist | null>;
	deletePlaylist: (playlistId: string) => Promise<void>;
	updatePlaylist: (playlistId: string, data: Partial<Playlist>) => Promise<void>;
	addSongToPlaylist: (playlistId: string, songId: string) => Promise<void>;
	removeSongFromPlaylist: (playlistId: string, songId: string) => Promise<void>;
}

export const usePlaylistStore = create<PlaylistStore>((set) => ({
	playlists: [],
	isLoading: false,
	error: null,

	fetchPlaylists: async (userId: string) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get(`/playlists?userId=${userId}`);
			set({ playlists: response.data });
		} catch (error: any) {
			console.error("Error fetching playlists:", error);
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},

	createPlaylist: async (name: string, description: string, _userId: string) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.post("/playlists", { name, description });
			set((state) => ({ playlists: [response.data, ...state.playlists] }));
			toast.success(`Playlist "${name}" created!`);
			return response.data;
		} catch (error: any) {
			console.error("Error creating playlist:", error);
			toast.error("Failed to create playlist: " + (error.response?.data?.message || error.message));
			set({ error: error.message });
			return null;
		} finally {
			set({ isLoading: false });
		}
	},

	deletePlaylist: async (playlistId: string) => {
		set({ isLoading: true, error: null });
		try {
			await axiosInstance.delete(`/playlists/${playlistId}`);
			set((state) => ({
				playlists: state.playlists.filter((p) => p._id !== playlistId),
			}));
			toast.success("Playlist deleted");
		} catch (error: any) {
			console.error("Error deleting playlist:", error);
			toast.error("Failed to delete playlist");
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},

	updatePlaylist: async (playlistId: string, data: Partial<Playlist>) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.put(`/playlists/${playlistId}`, data);
			set((state) => ({
				playlists: state.playlists.map((p) => (p._id === playlistId ? response.data : p)),
			}));
			toast.success("Playlist updated");
		} catch (error: any) {
			console.error("Error updating playlist:", error);
			toast.error("Failed to update playlist");
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},

	addSongToPlaylist: async (playlistId: string, songId: string) => {
		try {
			const response = await axiosInstance.post(`/playlists/${playlistId}/songs`, { songId });
			set((state) => ({
				playlists: state.playlists.map((p) => (p._id === playlistId ? response.data : p)),
			}));
			toast.success("Song added to playlist");
		} catch (error: any) {
			console.error("Error adding song to playlist:", error);
			toast.error("Failed to add song");
		}
	},

	removeSongFromPlaylist: async (playlistId: string, songId: string) => {
		try {
			const response = await axiosInstance.delete(`/playlists/${playlistId}/songs`, { data: { songId } });
			set((state) => ({
				playlists: state.playlists.map((p) => (p._id === playlistId ? response.data : p)),
			}));
			toast.success("Song removed from playlist");
		} catch (error: any) {
			console.error("Error removing song from playlist:", error);
			toast.error("Failed to remove song");
		}
	},
}));
