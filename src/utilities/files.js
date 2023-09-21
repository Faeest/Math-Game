import fsPromises from "fs/promises";
import _ from "lodash";
import path from "path";
export default async function read(filePath = "") {
    const dataFilePath = path.join(process.cwd(), `src/data/${filePath}`);
    try {
        const jsonData = await fsPromises.readFile(dataFilePath);
        const objectData = JSON.parse(jsonData);
        return objectData;
    } catch (e) {
        return false;
    }
}
export async function write(filePath = "", data = {}) {
    const dataFilePath = path.join(process.cwd(), `src/data/${filePath}`);
    try {
        await fsPromises.writeFile(dataFilePath, JSON.stringify(data));
    } catch (e) {
        return false;
    } finally {
        return true;
    }
}
export async function readWrite(
    filePath = "",
    callback = (data = {}) => {
        return {};
    }
) {
    let oldData = await read(filePath);
    let newData = callback(oldData);
    let stored = await write(filePath, newData);
    return stored;
}
