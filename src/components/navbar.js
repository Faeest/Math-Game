import Account from "./account";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react"
export default function Navbar({ lang }) {
	const router = useRouter();
	return (
		<nav className='w-full flex rounded-2xl border-4 bg-static-onyx/5 dark:bg-static-anti-flash/5 border-primary px-10 py-3 justify-between items-center'>
			<div onClick={() => signOut()}>
				<img src='https://singlecolorimage.com/get/eaeaeb/64x64' width={"32px"} alt='icon' className='app-icon dark:block hidden' />
				<img src='https://singlecolorimage.com/get/3b3d40/64x64' width={"32px"} alt='icon' className='app-icon dark:hidden' />
			</div>
			<ul>
				<li className='flex gap-x-6 items-center'>
					<Link tabIndex={1}
						href={"/"}
						className={
							"light-hover dark:normal-hover rounded-xl button text-onyx dark:text-anti-flash " +
							(router.route == "/" ? "!bg-[--primary] dark:!bg-[--primary-dark] !hover:shadow-none text-static-anti-flash" : "")
						}
					>
						{lang?.navbar?.[0] ?? "Home"}
					</Link>
					<Link
						href={"/modes"}
						className={
							"light-hover dark:normal-hover rounded-xl button text-onyx dark:text-anti-flash " +
							(router.route.includes("/modes") ? "!bg-[--primary] dark:!bg-[--primary-dark] !hover:shadow-none text-static-anti-flash" : "")
						}
					>
						{lang?.navbar?.[1] ?? "Modes"}
					</Link>
					<Link
						href={"/scoreboard"}
						className={
							"light-hover dark:normal-hover rounded-xl button text-onyx dark:text-anti-flash " +
							(router.route.includes("scoreboard") ? "!bg-[--primary] dark:!bg-[--primary-dark] !hover:shadow-none text-static-anti-flash" : "")
						}
					>
						{lang?.navbar?.[2] ?? "Scoreboard"}
					</Link>
					<Link
						href={"/settings"}
						className={
							"light-hover dark:normal-hover rounded-xl button text-onyx dark:text-anti-flash " +
							(router.route.includes("settings") ? "!bg-[--primary] dark:!bg-[--primary-dark] !hover:shadow-none text-static-anti-flash" : "")
						}
					>
						{lang?.navbar?.[3] ?? "Settings"}
					</Link>
					<Account className='rounded-xl button text-anti-flash' />
				</li>
			</ul>
		</nav>
	);
}
