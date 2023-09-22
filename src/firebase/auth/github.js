import firebase_app from "@/config";
import { GithubAuthProvider, getAuth,signInWithPopup } from "firebase/auth";

const auth = getAuth(firebase_app);
 
export default async function githubSignIn() {
    const provider = new GithubAuthProvider();
    let result = null,
        error = null;
    try {
        result = await signInWithPopup(auth, provider);
    } catch (e) {
        error = e;
    }
    
    return { result, error };
}