import "../styles/globals.css";
import { useEffect } from "react";
import updateColor from "@/utilities/primary";
import { AppContextProvider } from "@/context/AppContext";
export default function App({ Component, pageProps: { session, ...pageProps }, router: { locale } }) {
    useEffect(() => {
        updateColor();
        document.body.classList.remove("hidden");
    }, []);
    return (
        <AppContextProvider locale={locale}>
            <Component {...pageProps} />
        </AppContextProvider>
    );
}
