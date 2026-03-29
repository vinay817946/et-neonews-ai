import { NextResponse } from "next/server";
import { z } from "zod";
import { generateText } from "@/lib/server/openai";
import { systemPrompts } from "@/lib/server/prompts";
import { extractJson } from "@/lib/server/json";
import { buildFallbackTranslation } from "@/lib/server/fallbacks";

const schema = z.object({
  text: z.string().min(1),
  language: z.string().default("English"),
});

export async function POST(req) {
  try {
    const body = schema.parse(await req.json());
    const aiText = await generateText({
      instructions: systemPrompts.translation,
      input: JSON.stringify(body),
    });
    const translation = extractJson(aiText, buildFallbackTranslation(body.text, body.language));
    return NextResponse.json({ success: true, ...translation, aiPowered: Boolean(aiText) });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || "Failed to translate text" }, { status: 500 });
  }
}
