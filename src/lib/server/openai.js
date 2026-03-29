import OpenAI from "openai";

let client;

export function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) return null;
  if (!client) {
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return client;
}

export async function generateText({
  instructions,
  input,
  model = process.env.OPENAI_MODEL || "gpt-5.2",
  temperature,
  responseFormat,
}) {
  const openai = getOpenAIClient();
  if (!openai) return null;

  const response = await openai.responses.create({
    model,
    instructions,
    input,
    ...(typeof temperature === "number" ? { temperature } : {}),
    ...(responseFormat ? { text: responseFormat } : {}),
  });

  return response.output_text?.trim() || "";
}
