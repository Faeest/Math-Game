import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import Link from "next/link";

export default function Account({ className }) {
	const { user } = useAppContext()
	const session = false;
	return user ? (
		<Link href={"/profile"} className={className + " flex cursor-pointer"}>
            <Image priority className="hover:ring-4 rounded-full active:ring-0 ring-[rgba(var(--primary-rgb),.3)] transition" src={user?.image ?? "/user.png"} alt="user profile" width={40} height={40} />
        </Link>
	) : (
		<Link href={"/auth/signin"} className={className + " bg-[--primary] dark:bg-[--primary-dark] text-anti-flash button"}>
			Login
		</Link>
	);
}
