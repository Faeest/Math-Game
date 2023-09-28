import firebase_app from "@/config";
import { updateProfile, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function update(data = { displayName: "", photoURL: "" }) {
    let result = null,
        error = null;
    try {
        if (!auth.currentUser) throw new Error("Login First");
        result = await updateProfile(auth.currentUser, data);
    } catch (e) {
        error = e;
    }

    return { result, error };
}
