import firebase_app from "@/config";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signUp(email, password) {
    let result = null,
        error = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password).then(async () => {
            await updateProfile(auth.currentUser, { displayName: auth.currentUser.email });
        });
    } catch (e) {
        error = e;
    }

    return { result, error };
}
