import { NextResponse } from "next/server";
import { readJSON, writeJSON } from "../utils/readWrite";
import { evaluateApplicant, ApplicantEvaluation } from "../utils/ai";
import { v4 as uuid } from "uuid";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate required fields
    if (!body.name || !body.email || !body.bio) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: name, email, bio" },
        { status: 400 }
      );
    }

    const applicants = await readJSON("applicants.json");

    // Normalize fields: number cast and availability parsing
    const normalized = {
      ...body,
      age: body.age ? Number(body.age) : undefined,
      availability: (() => {
        if (!body.availability) return [];
        if (Array.isArray(body.availability)) return body.availability;
        return String(body.availability)
          .split(/[;,\n]/)
          .map((s) => s.trim())
          .filter(Boolean);
      })(),
    };

    const id = uuid();
    const evaluation: ApplicantEvaluation = await evaluateApplicant(normalized);

    const data = {
      id,
      ...normalized,
      AI: evaluation,
      status: evaluation.decision,
      createdAt: new Date().toISOString(),
    };

    applicants.push(data);
    await writeJSON("applicants.json", applicants);

    return NextResponse.json({ success: true, applicant: data });
  } catch (error) {
    console.error("Application submit error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process application" },
      { status: 500 }
    );
  }
}
