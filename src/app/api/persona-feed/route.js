import { NextResponse } from "next/server";
import { z } from "zod";
import { getLiveArticles, heuristicPersonaFilter } from "@/lib/server/news";
import { generateText } from "@/lib/server/openai";
import { systemPrompts } from "@/lib/server/prompts";
import { extractJson } from "@/lib/server/json";

const schema = z.object({
  personaId: z.string().default("student"),
  search: z.string().optional().default(""),
});

export async function POST(req) {
  try {
    const body = schema.parse(await req.json());
    const articles = await getLiveArticles();
    const heuristic = heuristicPersonaFilter(articles, body.personaId, body.search).slice(0, 8);

    const promptPayload = heuristic.map(({ id, title, summary, category, tags, score }) => ({ id, title, summary, category, tags, score }));
    const aiText = await generateText({
      instructions: systemPrompts.personaFeed,
      input: JSON.stringify({ personaId: body.personaId, search: body.search, articles: promptPayload }),
    });

    const aiRanked = extractJson(aiText, null);
    let stories = heuristic;
    if (Array.isArray(aiRanked)) {
      stories = aiRanked.map((item) => {
        const source = heuristic.find((article) => article.id === item.id) || heuristic[0];
        return { ...source, ...item };
      });
    }

    return NextResponse.json({ success: true, stories, aiPowered: Boolean(aiText) });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || "Failed to generate persona feed" }, { status: 500 });
  }
}
