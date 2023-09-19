import Layout from "@/components/layout";
import colors from "@/data/primary-colors.json";
import updateColor from "@/utilities/primary";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
export async function getServerSideProps(context) {
	let lang = {};
	await import(`@/data/lang/${context.locale}.json`).then((e) => (lang = e.data));
	return {
		props: {
			lang,
		},
	};
}
export default function Home({ lang }) {
	const router = useRouter();
	useEffect(() => {
		if (localStorage.primary && document.querySelector(`#primary-${localStorage.primary}`)) {
			document.querySelector(`#primary-${localStorage.primary}`).checked = true;
		} else {
			document.querySelector("#primary-folly").checked = true;
		}
		if (localStorage.theme == "dark" && document.querySelector(`[value="dark"]`)) {
			document.querySelector(`[value="dark"]`).checked = true;
		} else {
			document.querySelector(`[value="light"]`).checked = true;
		}
		let radios = document.querySelectorAll('input[type=radio][name="primary-color"]');
		let themes = document.querySelectorAll('input[type=radio][name="theme-color"]');

		function changeHandler(event) {
			localStorage.primary = this.value;
			updateColor();
		}
		function changeHandler2(event) {
			localStorage.theme = this.value;
			updateColor();
		}

		Array.prototype.forEach.call(radios, function (radio) {
			radio.addEventListener("change", changeHandler);
		});
		Array.prototype.forEach.call(themes, function (radio) {
			radio.addEventListener("change", changeHandler2);
		});
	}, []);
	return (
		<Layout lang={lang}>
			<div className='flex flex-col gap-y-6 items-center p-[--margin]'>
				<div className='w-full text-center text-2xl font-medium pt-8 text-onyx dark:text-anti-flash'>{lang?.settings?.[0] ?? "Primary Color :"}</div>
				<div className='flex w-full justify-center gap-10'>
					{Object.keys(colors.data).map((e) => (
						<input
							value={e}
							key={colors.data[e]}
							id={"primary-" + e}
							name='primary-color'
							className={`picker`}
							style={{ "--picker-color": colors.data[e] }}
							type='radio'
						/>
					))}
				</div>
				<div className='w-full text-center text-2xl font-medium pt-8 text-onyx dark:text-anti-flash'>{lang?.settings?.[1] ?? "Theme :"}</div>
				<div className='flex w-full justify-center gap-10'>
					<input value={"light"} name='theme-color' className={`theme-picker bg-anti-flash`} type='radio' />
					<input value={"dark"} name='theme-color' className={`theme-picker bg-onyx`} type='radio' />
				</div>
				<div className='w-full text-center text-2xl font-medium pt-8 text-onyx dark:text-anti-flash'>{lang?.settings?.[2] ?? "Language :"}</div>
				<div className='flex w-full justify-center gap-10'>
					{router.locales.map((e) => (
						<Link href={"/settings"} locale={e} key={"locale-" + e} className={`text-anti-flash bg-[--primary] dark:bg-[--primary-dark] button`} type='radio'>
							{e}
						</Link>
					))}
				</div>
			</div>
		</Layout>
	);
}
