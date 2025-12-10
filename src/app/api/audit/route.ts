import { NextResponse } from "next/server";
import { readJSON } from "../utils/readWrite";

export async function GET() {
  try {
    const auditLog = await readJSON("audit.json");
    return NextResponse.json({ success: true, logs: auditLog });
  } catch (error) {
    console.error("Audit log read error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to read audit log" },
      { status: 500 }
    );
  }
}
