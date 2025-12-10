import { NextResponse } from "next/server";
import { readJSON } from "../utils/readWrite";

export async function GET() {
  const groups = await readJSON("groups.json");
  return NextResponse.json({ groups });
}
