import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Account({ className }) {
	const { data: session } = useSession();
	return session ? (
		<Link href={"/profile"} className="flex cursor-pointer">
            <Image priority className="hover:ring-4 rounded-full active:ring-0 ring-[rgba(var(--primary-rgb),.3)] transition" src={session.user.image} alt="user profile" width={40} height={40} />
        </Link>
	) : (
		<Link href={"/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fsettings"} className={className + " bg-[--primary] dark:bg-[--primary-dark] text-anti-flash"}>
			Login
		</Link>
	);
}
