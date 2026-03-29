import { NextResponse } from "next/server";
import { z } from "zod";
import { generateText } from "@/lib/server/openai";
import { systemPrompts } from "@/lib/server/prompts";
import { extractJson } from "@/lib/server/json";
import { buildFallbackStoryArc } from "@/lib/server/fallbacks";

const schema = z.object({
  story: z.object({
    title: z.string(),
    summary: z.string().optional().default(""),
    description: z.string().optional().default(""),
  }),
});

export async function POST(req) {
  try {
    const body = schema.parse(await req.json());
    const aiText = await generateText({
      instructions: systemPrompts.storyArc,
      input: JSON.stringify(body),
    });
    const storyArc = extractJson(aiText, buildFallbackStoryArc(body.story));
    return NextResponse.json({ success: true, storyArc, aiPowered: Boolean(aiText) });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || "Failed to build story arc" }, { status: 500 });
  }
}
