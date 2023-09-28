import firebase_app from "@/config";
import { getAuth } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const bucket = getStorage(firebase_app);
const auth = getAuth(firebase_app);
export default async function Upload(file = "") {
    const storageRef = ref(bucket, `photoProfile/${auth.currentUser.uid}`);
    let result = "",
        error = "";
    await uploadBytes(storageRef, file, "data_url", { contentType: "image/png" })
        .then(async (snapshot) => {
            await getDownloadURL(snapshot.ref).then((url) => {
                result = url;
            });
        })
        .catch((e) => (error = e));
    return { error, result };
}
