import React from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/config";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import Loading from "./loading";

const auth = getAuth(firebase_app);
const firestore = getFirestore(firebase_app);
export const AppContext = React.createContext({});

export const useAppContext = () => React.useContext(AppContext);

export const AppContextProvider = ({ children, locale, route }) => {
    const router = useRouter();
    const [user, setUser] = React.useState(null);
    const [toastOps, setToastOps] = React.useState([]);
    const [lang, setLang] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [loading2, setLoading2] = React.useState(true);
    const [loading3, setLoading3] = React.useState(true);
    const [loading4, setLoading4] = React.useState(false);
    const [onlineStatus, setOnlineStatus] = React.useState(true);

    React.useEffect(() => {
        const getLang = async () => await import(`@/data/lang/${locale}.json`).then((e) => (setLang(e.data), setLoading2(false)));
        getLang();
    }, [locale]);
    React.useEffect(() => {
        // getDocs(collection(firestore, "/token")).then((e) => e.docs.map(x=>console.log(x.data())))
        window.addEventListener("offline", () => setOnlineStatus(false));
        window.addEventListener("online", () => setOnlineStatus(true));

        return () => {
            window.removeEventListener("offline", () => setOnlineStatus(false));
            window.removeEventListener("online", () => setOnlineStatus(true));
        };
    }, []);
    React.useEffect(() => {
        if (user && route.startsWith("/auth")) {
            setLoading4(true)
            console.log(lang);
            setToastOps([lang?.notification?.loginSuccess ?? "You've been logged in!", { type: "success", theme: localStorage.theme }]);
            router.push("/");
        } else {
            setLoading4(false)
            if (toastOps.length != 0) toast(toastOps[0], toastOps[1]), setToastOps([]);
            setLoading3(false);
        }
    }, [route, user]);
    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);
    React.useEffect(() => {
        console.log(loading, loading2, loading3,loading4);
    }, [loading, loading2, loading3,loading4]);
    return <AppContext.Provider value={{ user, lang, onlineStatus }}>{loading || loading2 || loading3 || loading4 ? <Loading /> : children}</AppContext.Provider>;
};
