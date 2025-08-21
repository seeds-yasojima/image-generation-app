import OpenAI from "openai";

let client: OpenAI | null = null;

function getClient(): OpenAI {
  if (client) return client;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set");
  }
  client = new OpenAI({ apiKey });
  return client;
}

export async function translateJaToEn(input: string): Promise<string> {
  const trimmed = input.trim();
  if (!trimmed) return "";

  try {
    const openai = getClient();
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_TRANSLATION_MODEL || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a concise translator and prompt polisher. Translate the user's Japanese text into natural, compact English suitable for an image generation prompt. If the input is already English, lightly refine it without changing meaning. Reply with English only.",
        },
        { role: "user", content: trimmed },
      ],
      temperature: 0.2,
      max_tokens: 300,
    });
    const text = completion.choices?.[0]?.message?.content?.trim();
    return text || trimmed;
  } catch {
    // Fallback to original text if translation fails
    return trimmed;
  }
}
