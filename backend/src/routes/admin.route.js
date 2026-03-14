import { Router } from "express";
import { createAlbum, createSong, deleteAlbum, deleteSong } from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

// Admin emails — read from env, with hardcoded fallbacks
const getAdminEmails = () => {
	const envEmails = (process.env.ADMIN_EMAIL || "")
		.split(",").map(e => e.trim().toLowerCase()).filter(Boolean);
	// Always include these admin accounts
	const fallbacks = ["abc@gmail.com", "kishan4u2007@gmail.com"];
	return [...new Set([...envEmails, ...fallbacks])];
};

// /check — only needs a valid token (protectRoute attaches decoded email)
// Does NOT call admin.auth().getUser() — no service account needed
router.get("/check", protectRoute, (req, res) => {
	try {
		const userEmail = req.auth?.email?.toLowerCase() || "";
		const isAdmin = getAdminEmails().includes(userEmail);
		console.log(`[Admin Check] email=${userEmail} isAdmin=${isAdmin} list=${getAdminEmails()}`);
		res.status(200).json({ admin: isAdmin });
	} catch (error) {
		res.status(200).json({ admin: false });
	}
});

// All mutative admin routes — need full admin check
router.use(protectRoute, requireAdmin);
router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);
router.post("/albums", createAlbum);
router.delete("/albums/:id", deleteAlbum);

export default router;
