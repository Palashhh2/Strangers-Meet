import { NextResponse } from "next/server";
import { readJSON, writeJSON } from "../utils/readWrite";
import { evaluateGroup } from "../utils/ai";
import { buildGroups } from "@/lib/grouping/groupingBuilder";

function chooseMeetingTime(members: any[]): string | null {
  // members[].availability is expected to be string[]
  const availLists = members.map((m) => (Array.isArray(m.availability) ? m.availability : []));

  // Find intersection of all members' availabilities
  if (availLists.length === 0) return null;

  let intersection = availLists[0].slice();
  for (let i = 1; i < availLists.length; i++) {
    intersection = intersection.filter((x: string) => availLists[i].includes(x));
  }

  if (intersection && intersection.length > 0) {
    // choose earliest lexicographically (dates should be ISO-like if possible)
    return intersection.sort()[0];
  }

  // otherwise pick most common availability across members
  const freq: Record<string, number> = {};
  for (const list of availLists) {
    for (const a of list) {
      freq[a] = (freq[a] || 0) + 1;
    }
  }

  const entries = Object.entries(freq);
  if (entries.length === 0) return null;
  entries.sort((a, b) => b[1] - a[1]);
  return entries[0][0];
}

export async function GET() {
  try {
    const applicants = await readJSON("applicants.json");

    if (!applicants.length) {
      return NextResponse.json({
        success: false,
        message: "No applicants found."
      });
    }

    // Only use accepted applicants for grouping
    const accepted = applicants.filter((a: any) => a.status === "accept" || (a.AI && a.AI.decision === "accept"));

    if (!accepted.length) {
      return NextResponse.json({ success: false, message: "No accepted applicants to group." });
    }

    // Build groups using compatibility scoring
    const groups = buildGroups(accepted);

    const evaluatedGroups: any[] = [];

    for (const group of groups) {
      const explanation = await evaluateGroup(group);
      const scheduledAt = chooseMeetingTime(group);

      evaluatedGroups.push({
        members: group,
        explanation: explanation.explanation || explanation || "No explanation provided",
        scheduledAt: scheduledAt,
        createdAt: new Date().toISOString(),
      });
    }

    // Save to local DB
    await writeJSON("groups.json", evaluatedGroups);

    return NextResponse.json({
      success: true,
      groups: evaluatedGroups,
    });
  } catch (error) {
    console.error("Group generation error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to generate groups" },
      { status: 500 }
    );
  }
}
