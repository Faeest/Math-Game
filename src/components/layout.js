import Navbar from "./navbar";
import { Poppins } from "next/font/google";
import { BsThreeDots } from "react-icons/bs";
const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export default function Layout({ children }) {
    return (
        <main
            id="app"
            className={
                poppins.className +
                " bg-anti-flash dark:bg-onyx overflow-hidden p-[--margin] min-h-screen flex flex-col transition-[gap] max-sm:sidenav-show-sibling gap-[--margin] max-lg:flex-row"
            }
        >
            <div
                onClick={() => {
                    document.querySelector("#app").classList.toggle("max-sm:sidenav-show-sibling");
                    document.querySelector("nav").classList.toggle("sidenav-show");
                }}
                className="sm:hidden right-[--margin] top-[--margin] absolute p-4 border-4 border-[--primary] rounded-tl-none rounded-tr-xl rounded-bl-xl rounded-br-none button cursor-pointer"
            >
                <BsThreeDots className="aspect-square dark:text-[--primary-light] text-[--primary]" />
            </div>
            <Navbar />
            <div className="flex flex-col w-full grow rounded-xl border-4 border-primary">{children}</div>
        </main>
    );
}
