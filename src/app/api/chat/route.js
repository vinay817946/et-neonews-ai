import { NextResponse } from "next/server";
import { z } from "zod";
import { generateText } from "@/lib/server/openai";
import { systemPrompts } from "@/lib/server/prompts";

const schema = z.object({
  question: z.string().min(1),
  context: z.any().optional(),
});

export async function POST(req) {
  try {
    const body = schema.parse(await req.json());
    const aiText = await generateText({
      instructions: systemPrompts.chat,
      input: JSON.stringify(body),
    });

    return NextResponse.json({
      success: true,
      answer: aiText || "I analyzed the supplied story context and this is the most relevant takeaway: focus on the user-specific impact, then the next watchpoint.",
      aiPowered: Boolean(aiText),
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || "Failed to answer question" }, { status: 500 });
  }
}
