import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { useEffect } from "react";
import updateColor from "@/utilities/primary";
export default function App({ Component, pageProps: { session, ...pageProps } }) {
	useEffect(() => {
		updateColor();
		document.body.classList.remove("hidden");
	}, []);
	return (
		<SessionProvider session={session}>
			<Component {...pageProps} />
		</SessionProvider>
	);
}
