import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
}) as any;

export async function generateGroupReason(group: any[]) {
  try {
    const prompt = `
Explain why the following group of people work well for a curated dinner:
${JSON.stringify(group)}

Consider: personality blend, creativity, interests, diet compatibility, conversational balance.

Respond in one paragraph.
`;

    const completion = await client.messages.create({
      model: "gpt-4-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const text =
      completion.content[0].type === "text" ? completion.content[0].text : "";
    return text;
  } catch (error) {
    console.error("Error generating group reason:", error);
    return "Unable to generate explanation.";
  }
}
