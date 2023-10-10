import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import 'react-tooltip/dist/react-tooltip.css'
import { useEffect } from "react";
import updateColor from "@/utilities/primary";
import { AppContextProvider } from "@/context/AppContext";
import { ToastContainer } from "react-toastify";
import NextNProgress from "nextjs-progressbar";
export default function App({ Component, pageProps: { session, ...pageProps }, router: { locale, state } }) {
    useEffect(() => {
        updateColor();
        document.body.classList.remove("hidden");
    }, []);
    return (
        <AppContextProvider route={state?.route} locale={locale}>
            <NextNProgress
                height={4}
                options={{ easing: 'ease-out', speed: 150 }}
                transformCSS={(css) => {
                    // console.log(css);
                    return (
                        <style>
                            {css +
                                `#nprogress .spinner-icon {display:none;}#nprogress .bar {background:var(--primary);}#nprogress .peg {box-shadow: 0 0 0px var(--primary), 0 0 0px var(--primary);opacity: 1;}`}
                        </style>
                    );
                }}
            />
            <Component {...pageProps} />
            <ToastContainer />
        </AppContextProvider>
    );
}
