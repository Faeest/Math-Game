import "../styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import updateColor from "@/utilities/primary";
import { AppContextProvider } from "@/context/AppContext";
import { ToastContainer } from "react-toastify";
export default function App({
    Component,
    pageProps: { session, ...pageProps },
    router: {
        locale,
        state
    },
}) {
    useEffect(() => {
        updateColor();
        document.body.classList.remove("hidden");
    }, []);
    return (
        <AppContextProvider route={state?.route} locale={locale}>
            <Component {...pageProps} />
            <ToastContainer />
        </AppContextProvider>
    );
}
