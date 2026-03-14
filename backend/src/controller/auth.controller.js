import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
	try {
		const { uid, email, displayName, photoURL } = req.body;

		// check if user already exists
		const user = await User.findOne({ clerkId: uid });

		if (!user) {
			// signup
			await User.create({
				clerkId: uid,
				fullName: displayName || email.split("@")[0],
				imageUrl: photoURL || "https://ui-avatars.com/api/?name=" + encodeURIComponent(displayName || email.split("@")[0]),
			});
		}

		res.status(200).json({ success: true });
	} catch (error) {
		console.log("Error in auth callback", error);
		next(error);
	}
};
