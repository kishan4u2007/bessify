import admin from "../lib/firebase.js";

// Get admin email list — reads from env + hardcoded fallbacks
const getAdminEmails = () => {
	const envEmails = process.env.ADMIN_EMAIL || "";
	const fromEnv = envEmails.split(",").map(e => e.trim().toLowerCase()).filter(Boolean);
	const fallbacks = ["abc@gmail.com", "kishan4u2007@gmail.com"];
	return [...new Set([...fromEnv, ...fallbacks])];
};

export const protectRoute = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({ message: "Unauthorized - you must be logged in" });
		}

		const token = authHeader.split(" ")[1];
		const decodedToken = await admin.auth().verifyIdToken(token);

		req.auth = { 
			userId: decodedToken.uid,
			email: decodedToken.email 
		};
		next();
	} catch (error) {
		console.error("Error in protectRoute middleware", error);
		return res.status(401).json({ message: "Unauthorized - invalid token" });
	}
};

export const requireAdmin = async (req, res, next) => {
	try {
		const userEmail = req.auth.email;
		const adminEmails = getAdminEmails();
		const isAdmin = adminEmails.includes(userEmail?.toLowerCase());

		if (!isAdmin) {
			return res.status(403).json({ message: "Unauthorized - you must be an admin" });
		}

		next();
	} catch (error) {
		next(error);
	}
};
