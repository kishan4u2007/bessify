import { Playlist } from "../models/playlist.model.js";

export const getUserPlaylists = async (req, res, next) => {
	try {
		const userId = req.auth?.userId || req.query.userId;
		if (!userId) {
			return res.status(401).json({ message: "User ID required" });
		}
		const playlists = await Playlist.find({ owner: userId }).sort({ createdAt: -1 });
		res.status(200).json(playlists);
	} catch (error) {
		next(error);
	}
};

export const createPlaylist = async (req, res, next) => {
	try {
		const userId = req.auth?.userId;
		const { name, description } = req.body;
		
		if (!userId) {
			return res.status(401).json({ message: "Authentication required" });
		}

		const playlist = new Playlist({
			name,
			description: description || "",
			owner: userId,
			songs: [],
			isPublic: false,
		});

		await playlist.save();
		res.status(201).json(playlist);
	} catch (error) {
		next(error);
	}
};

export const addSongToPlaylist = async (req, res, next) => {
	try {
		const userId = req.auth?.userId;
		const { playlistId } = req.params;
		const { songId } = req.body;

		const playlist = await Playlist.findOneAndUpdate(
			{ _id: playlistId, owner: userId },
			{ $addToSet: { songs: songId } },
			{ new: true }
		);

		if (!playlist) {
			return res.status(404).json({ message: "Playlist not found or unauthorized" });
		}

		res.status(200).json(playlist);
	} catch (error) {
		next(error);
	}
};

export const removeSongFromPlaylist = async (req, res, next) => {
	try {
		const userId = req.auth?.userId;
		const { playlistId } = req.params;
		const { songId } = req.body;

		const playlist = await Playlist.findOneAndUpdate(
			{ _id: playlistId, owner: userId },
			{ $pull: { songs: songId } },
			{ new: true }
		);

		if (!playlist) {
			return res.status(404).json({ message: "Playlist not found or unauthorized" });
		}

		res.status(200).json(playlist);
	} catch (error) {
		next(error);
	}
};

export const deletePlaylist = async (req, res, next) => {
	try {
		const userId = req.auth?.userId;
		const { playlistId } = req.params;

		const playlist = await Playlist.findOneAndDelete({ _id: playlistId, owner: userId });

		if (!playlist) {
			return res.status(404).json({ message: "Playlist not found or unauthorized" });
		}

		res.status(200).json({ message: "Playlist deleted successfully" });
	} catch (error) {
		next(error);
	}
};

export const updatePlaylist = async (req, res, next) => {
	try {
		const userId = req.auth?.userId;
		const { playlistId } = req.params;
		const { name, description, isPublic } = req.body;

		const playlist = await Playlist.findOneAndUpdate(
			{ _id: playlistId, owner: userId },
			{ name, description, isPublic },
			{ new: true }
		);

		if (!playlist) {
			return res.status(404).json({ message: "Playlist not found or unauthorized" });
		}

		res.status(200).json(playlist);
	} catch (error) {
		next(error);
	}
};
