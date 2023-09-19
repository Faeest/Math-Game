/** @type {import('next').NextConfig} */
const nextConfig = {
	i18n: {
		locales: ["en", "id"],
		defaultLocale: "en",
	},
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
};

module.exports = nextConfig;
