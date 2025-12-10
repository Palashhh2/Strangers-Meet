import { NextResponse } from "next/server";
import { readJSON } from "../utils/readWrite";

export async function GET() {
  const applicants = await readJSON("applicants.json");
  return NextResponse.json({ applicants });
}
