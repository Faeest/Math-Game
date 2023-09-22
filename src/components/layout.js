import Navbar from "./navbar";
import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export default function Layout({ children }) {
	
	return (
		<main className={poppins.className + " bg-anti-flash dark:bg-onyx p-[--margin] min-h-screen flex flex-col gap-[--margin]"}>
			<Navbar />
			<div className="flex flex-col w-full grow rounded-xl border-4 border-primary">{children}</div>
		</main>
	);
}
