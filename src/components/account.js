import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Account({ className }) {
	const { data: session } = useSession();
	return session ? (
		<Link href={"/profile"} className="flex cursor-pointer">
            <Image className="hover:ring-4 rounded-full active:ring-0 ring-[rgba(var(--primary-rgb),.3)] transition" src={session.user.image} alt="user profile" width={40} height={40} />
        </Link>
	) : (
		<button onClick={() => signIn()} className={className + " bg-folly text-anti-flash"}>
			Login
		</button>
	);
}
