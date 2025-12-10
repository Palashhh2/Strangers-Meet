import { NextResponse } from "next/server";
import { evaluateApplicant } from "../utils/ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const evaluation = await evaluateApplicant(body);
    return NextResponse.json({ success: true, evaluation });
  } catch (error) {
    console.error("Evaluation error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to evaluate applicant" },
      { status: 500 }
    );
  }
}
