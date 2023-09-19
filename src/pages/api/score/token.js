import { NextRequest, NextResponse } from "next/server";

export default async (req = new NextRequest(), res = new NextResponse()) => {
	let result;
	await fetch("https://api.globalstats.io/oauth/access_token", {
		headers: {
			accept: "application/json",
			"content-type": "application/json",
		},
		method: "POST",
		body: JSON.stringify({
			grant_type: "client_credentials",
			scope: "endpoint_client",
			client_id: process.env.GLOBALSTATS_CLIENT,
			client_secret: process.env.GLOBALSTATS_SECRET,
		}),
	})
		.catch((e) => {
			result = {
				error: "Error",
			};
		})
		.then(async (e) => {
			let { access_token } = await e.json();
			result = {
				access_token,
			};
		});
	return res.json(result);
};
