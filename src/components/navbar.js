import { useAppContext } from "@/context/AppContext";
import Account from "./account";
import Link from "next/link";
import { useRouter } from "next/router";
import signOut from "@/firebase/auth/signout";
import Image from "next/image";
import { FaGamepad, FaGear } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { toast } from "react-toastify";
import modeToggler from "@/utilities/modeToggler";
export default function Navbar() {
    const devAction = () => {
        modeToggler()
        // signOut().then(() => toast(lang?.notification?.logoutSuccess ?? "You've been logged out!", { type: "info", theme: localStorage.theme }));
    };
    const { lang, user } = useAppContext();
    const router = useRouter();
    return (
        <nav className="w-full flex rounded-2xl border-0 bg-static-anti-flash max-lg:sidenav sm:sidenav-show dark:bg-static-onyx border-primary px-10 py-3 justify-between items-center">
            <div
                onClick={devAction}
                className="max-sm:hidden select-none"
            >
                <Image src="https://singlecolorimage.com/get/eaeaeb/64x64" width={32} height={32} alt="icon" className="app-icon dark:block hidden" />
                <Image src="https://singlecolorimage.com/get/3b3d40/64x64" width={32} height={32} alt="icon" className="app-icon dark:hidden" />
            </div>
            <div className={"flex gap-x-3 md:gap-x-6 items-center max-lg:sidebar max-lg:w-full"}>
                <Link tabIndex={1} href={"/"} className={"nav-link " + (router.route == "/" ? "selected-nav" : "")}>
                    <span className="max-lg:hidden">{lang?.navbar?.[0] ?? "Home"}</span> <FaHome className="lg:hidden max-lg:text-xl" />
                </Link>
                <Link href={"/games"} className={"nav-link " + (router.route.includes("/games") ? "selected-nav" : "")}>
                    <span className="max-lg:hidden">{lang?.navbar?.[1] ?? "Games"}</span> <FaGamepad className="lg:hidden max-lg:text-xl" />
                </Link>
                <Link href={"/scoreboard"} className={"nav-link " + (router.route.includes("scoreboard") ? "selected-nav" : "")}>
                    <span className="max-lg:hidden">{lang?.navbar?.[2] ?? "Scoreboard"}</span> <MdLeaderboard className="lg:hidden max-lg:text-xl" />
                </Link>
                <Link href={"/settings"} className={"nav-link " + (router.route.includes("settings") ? "selected-nav" : "")}>
                    <span className="max-lg:hidden">{lang?.navbar?.[3] ?? "Settings"}</span> <FaGear className="lg:hidden max-lg:text-xl" />
                </Link>
                <Account className={"rounded-xl text-anti-flash" + (user ? " lg:ms-3 max-lg:mx-1 select-none" : "")} />
            </div>
        </nav>
    );
}
