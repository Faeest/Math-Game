import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import Layout from "@/components/layout";
import { getCsrfToken } from "next-auth/react";
export default function SignIn({ providers, lang, csrfToken }) {
	return (
		<Layout lang={lang}>
			<div className="pt-14 pb-8 w-full text-onyx dark:text-anti-flash flex justify-center text-5xl font-semibold">Login</div>
			{Object.values(providers).map((provider) => (
				<div key={provider.name} className='text-onyx dark:text-anti-flash flex w-full justify-center'>
					{provider.name == "Credentials" ? (
						<form method='post' className="flex justify-center flex-col items-center" action='/api/auth/callback/credentials'>
							<input name="csrfToken" type="hidden" defaultValue={csrfToken} />
							<div className='mb-4 w-fit flex flex-col gap-y-1'>
								<input
									className='appearance-none placeholder:text-static-onyx/60 ring-4 dark:ring-0 ring-[--primary] bg-static-anti-flash text-onyx rounded-xl w-fit py-3 px-3 leading-tight focus:outline-none focus:!ring-4 lighter-hover transition'
									id='username'
									type='text'
									name="username"
									placeholder="Username"
									required
									minLength={4}
									maxLength={20}
								/>
							</div>
							<button className='button border-4 border-[--primary] light-hover dark:normal-hover rounded-xl my-2 w-fit' type='submit'>
								Sign in with Username
							</button>
						</form>
					) : (
						<button className='button border-4 border-[--primary] light-hover dark:normal-hover rounded-xl my-2' onClick={() => signIn(provider.id)}>
							Sign in with {provider.name}
						</button>
					)}
				</div>
			))}
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const session = await getServerSession(context.req, context.res, authOptions);
	if (session) {
		return { redirect: { destination: "/" } };
	}

	const providers = await getProviders();

	let lang = {};
	await import(`@/data/lang/${context.locale}.json`).then((e) => (lang = e.data));
	return {
		props: { providers: providers ?? [], lang, csrfToken: await getCsrfToken(context) },
	};
}
