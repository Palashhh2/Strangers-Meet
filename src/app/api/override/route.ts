import { NextResponse } from "next/server";
import { readJSON, writeJSON } from "../utils/readWrite";

export async function POST(req: Request) {
  try {
    const { id, decision } = await req.json();

    if (!id || !["accept", "reject"].includes(decision)) {
      return NextResponse.json(
        { success: false, message: "Invalid id or decision" },
        { status: 400 }
      );
    }

    const applicants = await readJSON("applicants.json");
    const applicant = applicants.find((a: any) => a.id === id);
    const oldStatus = applicant?.status;

    const updated = applicants.map((a: any) =>
      a.id === id ? { ...a, status: decision, updatedAt: new Date().toISOString() } : a
    );

    await writeJSON("applicants.json", updated);

    // Log to audit trail
    const auditLog = await readJSON("audit.json");
    auditLog.push({
      timestamp: new Date().toISOString(),
      action: "override",
      applicantId: id,
      applicantName: applicant?.name || "Unknown",
      from: oldStatus,
      to: decision,
    });
    await writeJSON("audit.json", auditLog);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Override error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update applicant" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing id" },
        { status: 400 }
      );
    }

    const applicants = await readJSON("applicants.json");
    const applicant = applicants.find((a: any) => a.id === id);

    const updated = applicants.filter((a: any) => a.id !== id);

    await writeJSON("applicants.json", updated);

    // Log to audit trail
    const auditLog = await readJSON("audit.json");
    auditLog.push({
      timestamp: new Date().toISOString(),
      action: "delete",
      applicantId: id,
      applicantName: applicant?.name || "Unknown",
      status: applicant?.status || "unknown",
    });
    await writeJSON("audit.json", auditLog);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete applicant" },
      { status: 500 }
    );
  }
}
