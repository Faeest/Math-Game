import Layout from "@/components/layout";
export async function getServerSideProps(context) {
	let lang = {};
	await import(`@/data/lang/${context.locale}.json`).then((e) => (lang = e.data));
	return {
		props: {
			lang,
		},
	};
}
export default function ErrorSignIn({ lang }) {
	return <Layout lang={lang}>LOL BRR ERROR</Layout>;
}
