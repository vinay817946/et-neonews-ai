import { NextResponse } from "next/server";
import { z } from "zod";
import { generateText } from "@/lib/server/openai";
import { systemPrompts } from "@/lib/server/prompts";
import { extractJson } from "@/lib/server/json";
import { buildFallbackBriefing } from "@/lib/server/fallbacks";

const schema = z.object({
  story: z.object({
    title: z.string(),
    summary: z.string().optional().default(""),
    description: z.string().optional().default(""),
    source: z.string().optional().default("Unknown"),
  }),
  persona: z.string().optional().default("Student"),
});

export async function POST(req) {
  try {
    const body = schema.parse(await req.json());
    const aiText = await generateText({
      instructions: systemPrompts.briefing,
      input: JSON.stringify(body),
    });
    const briefing = extractJson(aiText, buildFallbackBriefing(body.story));
    return NextResponse.json({ success: true, briefing, aiPowered: Boolean(aiText) });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || "Failed to generate briefing" }, { status: 500 });
  }
}
