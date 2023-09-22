import { useAppContext } from "@/context/AppContext";
import Account from "./account";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function Navbar() {
    const { lang, user } = useAppContext();
    const router = useRouter();
    return (
        <nav className="w-full flex rounded-2xl border-4 bg-static-onyx/5 dark:bg-static-anti-flash/5 border-primary px-10 py-3 justify-between items-center">
            <div onClick={() => 1}>
                <img src="https://singlecolorimage.com/get/eaeaeb/64x64" width={"32px"} alt="icon" className="app-icon dark:block hidden" />
                <img src="https://singlecolorimage.com/get/3b3d40/64x64" width={"32px"} alt="icon" className="app-icon dark:hidden" />
            </div>
            <ul>
                <li className="flex gap-x-3 md:gap-x-6 items-center">
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
                </li>
            </ul>
        </nav>
    );
}
