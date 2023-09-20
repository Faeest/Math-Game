import fsPromises from "fs/promises";
import _ from "lodash";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
export default async function handler(req = new NextRequest(), res = new NextResponse()) {
    const dataFilePath = path.join(process.cwd(), `src/data/${req.query?.data?.[0] ?? "token"}.json`);
    try {
        if (req.method === "GET") {
            const jsonData = await fsPromises.readFile(dataFilePath).catch((e) => {
                throw new Error("Bad Request");
            });
            const objectData = JSON.parse(jsonData);

            res.status(200).json(objectData);
        }
        if (req.method === "POST" && req.body?.data) {
            const pushes = JSON.parse(req.body?.data);
            const jsonData = await fsPromises.readFile(dataFilePath);
            const objectData = JSON.parse(jsonData);
            if (validatePostData(objectData, pushes)) {
                const newData = _.merge(objectData, pushes);
                await fsPromises.writeFile(dataFilePath, JSON.stringify(newData)).catch((e) => {
                    throw new Error("Bad Request");
                });
                res.status(200).json(_.pick(newData, objectData.editable));
            } else throw new Error("Bad Request");
        } else throw new Error("Bad Request");
    } catch (e) {
        res.status(400).json({ code: 400, error: e.message?.includes("JSON") ? "Bad Request" : e.message });
    }
}
function validatePostData(origin, pushes) {
    if (!origin.editable) return;
    let { editable } = origin;
    let key = Object.keys(pushes);
    return typeof pushes == "object" && _.difference(key, editable).length == 0;
}
