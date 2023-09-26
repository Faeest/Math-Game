import firebase_app from "@/config";
import { signOut as out, getAuth } from "firebase/auth";
import { toast } from "react-toastify";

const auth = getAuth(firebase_app);

export default async function signOut() {
    let result = null,
        error = null;
    try {
        result = await out(auth);
    } catch (e) {
        error = e;
    }

    return { result, error };
}
