import admin from "firebase-admin";
import path from "path";

// Replace the path with your actual Firebase Admin SDK JSON key file
const serviceAccount = path.resolve(__dirname, "./firbsesdk.json");

// Initialize the admin app
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
