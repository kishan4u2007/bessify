import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";
import fs from "fs";

// Upload a file to Cloudinary using its temp path on disk
const uploadToCloudinary = async (file) => {
	try {
		const response = await cloudinary.uploader.upload(file.tempFilePath, {
			resource_type: "auto",
		});
		return response.secure_url;
	} catch (error) {
		console.error("Cloudinary upload error:", error);
		throw new Error("Failed to upload file to Cloudinary");
	}
};

export const createSong = async (req, res, next) => {
	try {
		if (!req.files || !req.files.audioFile || !req.files.imageFile) {
			return res.status(400).json({ message: "Please upload both audio and image files" });
		}

		const { title, artist, albumId, duration } = req.body;

		if (!title || !artist || !duration) {
			return res.status(400).json({ message: "Title, artist, and duration are required" });
		}

		const audioFile = req.files.audioFile;
		const imageFile = req.files.imageFile;

		// Upload both files to Cloudinary in parallel
		const [audioUrl, imageUrl] = await Promise.all([
			uploadToCloudinary(audioFile),
			uploadToCloudinary(imageFile),
		]);

		const song = new Song({
			title,
			artist,
			audioUrl,
			imageUrl,
			duration: parseInt(duration),
			albumId: albumId && albumId !== "none" ? albumId : null,
		});

		await song.save();

		// If song belongs to an album, update the album's songs array
		if (albumId && albumId !== "none") {
			await Album.findByIdAndUpdate(albumId, {
				$push: { songs: song._id },
			});
		}

		res.status(201).json(song);
	} catch (error) {
		console.error("Error in createSong:", error);
		next(error);
	}
};

export const deleteSong = async (req, res, next) => {
	try {
		const { id } = req.params;

		const song = await Song.findById(id);
		if (!song) return res.status(404).json({ message: "Song not found" });

		// If song belongs to an album, remove it from the album's songs array
		if (song.albumId) {
			await Album.findByIdAndUpdate(song.albumId, {
				$pull: { songs: song._id },
			});
		}

		await Song.findByIdAndDelete(id);

		res.status(200).json({ message: "Song deleted successfully" });
	} catch (error) {
		console.error("Error in deleteSong:", error);
		next(error);
	}
};

export const createAlbum = async (req, res, next) => {
	try {
		if (!req.files || !req.files.imageFile) {
			return res.status(400).json({ message: "Please upload an album cover image" });
		}

		const { title, artist, releaseYear } = req.body;

		if (!title || !artist) {
			return res.status(400).json({ message: "Title and artist are required" });
		}

		const imageFile = req.files.imageFile;
		const imageUrl = await uploadToCloudinary(imageFile);

		const album = new Album({
			title,
			artist,
			imageUrl,
			releaseYear: parseInt(releaseYear) || new Date().getFullYear(),
		});

		await album.save();

		res.status(201).json(album);
	} catch (error) {
		console.error("Error in createAlbum:", error);
		next(error);
	}
};

export const deleteAlbum = async (req, res, next) => {
	try {
		const { id } = req.params;

		// Delete all songs in this album too
		await Song.deleteMany({ albumId: id });
		await Album.findByIdAndDelete(id);

		res.status(200).json({ message: "Album deleted successfully" });
	} catch (error) {
		console.error("Error in deleteAlbum:", error);
		next(error);
	}
};

export const checkAdmin = async (req, res, next) => {
	res.status(200).json({ admin: true });
};
