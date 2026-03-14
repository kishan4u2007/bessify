import { Router } from "express";
import { 
	getUserPlaylists, 
	createPlaylist, 
	addSongToPlaylist, 
	removeSongFromPlaylist,
	deletePlaylist,
	updatePlaylist
} from "../controller/playlist.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", protectRoute, getUserPlaylists);
router.post("/", protectRoute, createPlaylist);
router.put("/:playlistId", protectRoute, updatePlaylist);
router.delete("/:playlistId", protectRoute, deletePlaylist);
router.post("/:playlistId/songs", protectRoute, addSongToPlaylist);
router.delete("/:playlistId/songs", protectRoute, removeSongFromPlaylist);

export default router;
