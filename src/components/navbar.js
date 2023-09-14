import modeToggler from "@/utilities/modeToggler";
import Account from "./account";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
	const router = useRouter();
	return (
		<nav className='w-full flex rounded-2xl border-4 bg-static-onyx/5 dark:bg-static-anti-flash/5 border-primary px-10 py-3 justify-between items-center'>
			<div onClick={modeToggler}>
				<img src='https://singlecolorimage.com/get/eaeaeb/64x64' width={"32px"} alt='icon' className='app-icon dark:block hidden' />
				<img src='https://singlecolorimage.com/get/3b3d40/64x64' width={"32px"} alt='icon' className='app-icon dark:hidden' />
			</div>
			<ul>
				<li className='flex gap-x-6 items-center'>
					<Link href={"/"} className={'light-hover dark:normal-hover rounded-xl button text-onyx dark:text-anti-flash ' + (router.route == "/"? "!bg-[rgba(var(--primary-rgb))] !hover:shadow-none text-static-anti-flash" : "")}>
						Home
					</Link>
					<Link href={"/modes"} className={'light-hover dark:normal-hover rounded-xl button text-onyx dark:text-anti-flash ' + (router.route.includes("/modes")? "!bg-[rgba(var(--primary-rgb))] !hover:shadow-none text-static-anti-flash" : "")}>
						Modes
					</Link>
					<Link href={"/scoreboard"} className={'light-hover dark:normal-hover rounded-xl button text-onyx dark:text-anti-flash ' + (router.route.includes("scoreboard")? "!bg-[rgba(var(--primary-rgb))] !hover:shadow-none text-static-anti-flash" : "")}>
						Scoreboard
					</Link>
					<Link href={"/settings"} className={'light-hover dark:normal-hover rounded-xl button text-onyx dark:text-anti-flash ' + (router.route.includes("settings")? "!bg-[rgba(var(--primary-rgb))] !hover:shadow-none text-static-anti-flash" : "")}>
						Settings
					</Link>
					<Account className='light-hover dark:normal-hover rounded-xl button text-onyx dark:text-anti-flash' />
				</li>
			</ul>
		</nav>
	);
}
