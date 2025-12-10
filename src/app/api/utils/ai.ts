import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
}) as any;

export interface ApplicantEvaluation {
  decision: "accept" | "reject";
  confidence: number; // 0-1
  reason: string;
}

// -------------------------
// Evaluate a single applicant
// -------------------------
export async function evaluateApplicant(applicant: any): Promise<ApplicantEvaluation> {
  const prompt = `
You are evaluating an applicant for a curated dinner with strangers.
Applicant data:
${JSON.stringify(applicant, null, 2)}

Return STRICT JSON ONLY in this format:
{
  "decision": "accept" or "reject",
  "confidence": number between 0 and 1,
  "reason": "short explanation"
}
`;

  try {
    const response = await client.messages.create({
      model: "gpt-4-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const raw = response.content[0].type === "text" ? response.content[0].text : "";

    try {
      const parsed: ApplicantEvaluation = JSON.parse(raw);
      return parsed;
    } catch (err) {
      console.error("Failed to parse AI output:", raw);
      // fallback in case AI returns invalid JSON
      return {
        decision: "reject",
        confidence: 0,
        reason: "AI output parsing failed",
      };
    }
  } catch (err) {
    console.error("OpenAI API error:", err);
    return {
      decision: "reject",
      confidence: 0,
      reason: "API error - please try again",
    };
  }
}

// -------------------------
// Evaluate a group of applicants
// -------------------------
export async function evaluateGroup(group: any[]) {
  const prompt = `
Evaluate how well this group of applicants fits together.

Group:
${JSON.stringify(group, null, 2)}

Return STRICT JSON:
{
  "explanation": "why these people work well together based on personality, interests, and dietary compatibility"
}
`;

  try {
    const response = await client.messages.create({
      model: "gpt-4-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const raw = response.content[0].type === "text" ? response.content[0].text : "";

    try {
      return JSON.parse(raw);
    } catch (err) {
      console.error("Failed to parse group evaluation:", raw);
      return { explanation: "AI output parsing failed" };
    }
  } catch (err) {
    console.error("OpenAI API error:", err);
    return { explanation: "API error - please try again" };
  }
}
