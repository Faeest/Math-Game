import React, { useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/config";

const auth = getAuth(firebase_app);

export const AppContext = React.createContext({});

export const useAppContext = () => React.useContext(AppContext);

export const AppContextProvider = ({ children, locale }) => {
    const [user, setUser] = React.useState(null);
    const [lang, setLang] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    async function getLang() {
        await import(`@/data/lang/${locale}.json`).then((e) => setLang(e.data));
    }
    React,useEffect(() => {
        getLang();
    },[locale])
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

    return <AppContext.Provider value={{ user, lang }}>{loading ? <div>Loading...</div> : children}</AppContext.Provider>;
};
