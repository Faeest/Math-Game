import { useAppContext } from "@/context/AppContext";
import Account from "./account";
import Link from "next/link";
import { useRouter } from "next/router";
import signOut from "@/firebase/auth/signout";
import Image from "next/image";
import { useState } from "react";
export default function Navbar() {
    const { lang, user } = useAppContext();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();
    return (
        <nav className="w-full flex rounded-2xl border-4 bg-static-anti-flash dark:bg-static-onyx border-primary px-10 py-3 justify-between items-center">
            <div onClick={signOut}>
                <Image src="https://singlecolorimage.com/get/eaeaeb/64x64" width={32} height={32} alt="icon" className="app-icon dark:block hidden" />
                <Image src="https://singlecolorimage.com/get/3b3d40/64x64" width={32} height={32} alt="icon" className="app-icon dark:hidden" />
            </div>
            <div className="button max-h-[32px]" onClick={() => setSidebarOpen(!sidebarOpen)}>
                x
            </div>
            <div className={"flex gap-x-3 md:gap-x-6 items-center max-lg:sidebar" + (!sidebarOpen? " sidebar-hidden":" sidebar-open")}>
                <Link
                    tabIndex={1}
                    href={"/"}
                    className={
                        "light-hover md:px-5 px-3 dark:normal-hover rounded-xl button text-onyx dark:text-anti-flash " +
                        (router.route == "/" ? "!bg-[--primary] dark:!bg-[--primary-light] !hover:shadow-none !text-anti-flash dark:!text-onyx" : "")
                    }
                >
                    {lang?.navbar?.[0] ?? "Home"}
                </Link>
                <Link
                    href={"/modes"}
                    className={
                        "light-hover md:px-5 px-3 dark:normal-hover rounded-xl button text-onyx dark:text-anti-flash " +
                        (router.route.includes("/modes")
                            ? "!bg-[--primary] dark:!bg-[--primary-light] !hover:shadow-none !text-anti-flash dark:!text-onyx"
                            : "")
                    }
                >
                    {lang?.navbar?.[1] ?? "Modes"}
                </Link>
                <Link
                    href={"/scoreboard"}
                    className={
                        "light-hover md:px-5 px-3 dark:normal-hover rounded-xl button text-onyx dark:text-anti-flash " +
                        (router.route.includes("scoreboard")
                            ? "!bg-[--primary] dark:!bg-[--primary-light] !hover:shadow-none !text-anti-flash dark:!text-onyx"
                            : "")
                    }
                >
                    {lang?.navbar?.[2] ?? "Scoreboard"}
                </Link>
                <Link
                    href={"/settings"}
                    className={
                        "light-hover md:px-5 px-3 dark:normal-hover rounded-xl button text-onyx dark:text-anti-flash " +
                        (router.route.includes("settings")
                            ? "!bg-[--primary] dark:!bg-[--primary-light] !hover:shadow-none !text-anti-flash dark:!text-onyx"
                            : "")
                    }
                >
                    {lang?.navbar?.[3] ?? "Settings"}
                </Link>
                <Account className={"rounded-xl text-anti-flash" + (user ? " ps-3" : "")} />
            </div>
        </nav>
    );
}
