import React, { useCallback } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/config";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Loading from "../components/loading";

const auth = getAuth(firebase_app);
export const AppContext = React.createContext({});

export const useAppContext = () => React.useContext(AppContext);

export const AppContextProvider = ({ children, locale, route }) => {
    const router = useRouter();
    const [user, setUser] = React.useState(null);
    const [toastOps, setToastOps] = React.useState([]);
    const [lang, setLang] = React.useState(null);
    const [loading, setLoading] = React.useState(true); // fetching user
    const [loading2, setLoading2] = React.useState(true); // fetching language
    const [loading3, setLoading3] = React.useState(true); // authorization
    const [loading4, setLoading4] = React.useState(false); // notification
    const [onlineStatus, setOnlineStatus] = React.useState(true);

    React.useEffect(() => {
        const getLang = async () => await import(`@/data/lang/${locale}.json`).then((e) => (setLang(e.data), setLoading2(false)));
        getLang();
    }, [locale]);
    React.useEffect(() => {
        setOnlineStatus(navigator.onLine)
        // getDocs(collection(firestore, "/token")).then((e) => e.docs.map(x=>console.log(x.data())))
        window.addEventListener("offline", () => setOnlineStatus(false));
        window.addEventListener("online", () => setOnlineStatus(true));

        return () => {
            window.removeEventListener("offline", () => setOnlineStatus(false));
            window.removeEventListener("online", () => setOnlineStatus(true));
        };
    }, []);
    React.useEffect(() => {
        if (user && lang && route.startsWith("/auth")) {
            setLoading4(true);
            setToastOps([lang?.notification?.loginSuccess ?? "You've been logged in!", { type: "success", theme: localStorage.theme }]);
            router.push("/");
        } else if (!user && !loading && lang && route.startsWith("/profile")) {
            setLoading4(true);
            setToastOps([lang?.notification?.unauthorized ?? "You can't visit this page!", { type: "error", theme: localStorage.theme }]);
            router.push("/");
        } else {
            setLoading4(false);
            if (toastOps.length != 0) toast(toastOps[0], toastOps[1]), setToastOps([]);
            setLoading3(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [route, user, lang]);
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
    return (
        <AppContext.Provider value={{ user, lang, onlineStatus }}>{loading || loading2 || loading3 || loading4 ? <Loading /> : children}</AppContext.Provider>
    );
};
