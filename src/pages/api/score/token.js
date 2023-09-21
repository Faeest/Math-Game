import read, { readWrite } from "@/utilities/files";
import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "request-ip";

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
            let ip = getClientIp(req);
			let oldData = await read("token.json")
            await readWrite("token.json", (e) => (((Number(e?.users?.[ip]) && e.users[ip]++) || (e.users[ip] = 1)) && false) || e);
            let { access_token } = await e.json();
            result = {
				oldData,
                access_token,
            };
        });
    return res.json(result);
};
// {"editable":["users"],"get":0,"post":0,"users":{"127.0.0.1":3,"127.0.1.1":2}}
