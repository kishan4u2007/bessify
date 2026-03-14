import admin from "firebase-admin";

// Firebase Admin SDK — initialize with projectId only.
// For verifyIdToken(), the SDK only needs the projectId, not a service account.
// It uses Google's public JWKS endpoint to verify tokens.
if (!admin.apps.length) {
    admin.initializeApp({
        projectId: process.env.FIREBASE_PROJECT_ID || "bessify-pro",
    });
}

export default admin;
