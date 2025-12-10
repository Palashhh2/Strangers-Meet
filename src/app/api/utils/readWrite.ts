import { promises as fs } from "fs";
import path from "path";

export async function readJSON(filename: string) {
  try {
    const filePath = path.join(process.cwd(), "data", filename);
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data || "[]");
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return [];
  }
}

export async function writeJSON(filename: string, data: any) {
  try {
    const filePath = path.join(process.cwd(), "data", filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(`Error writing ${filename}:`, err);
    throw err;
  }
}
