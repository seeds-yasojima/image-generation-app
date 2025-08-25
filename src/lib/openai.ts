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
            "You are an expert prompt engineer for the black-forest-labs/flux-schnell image model. Convert the user's Japanese instruction into a single concise English prompt optimized for this model. Preserve the user's intent; add concrete, believable specifics only when natural: subject, key attributes, composition/framing, environment, lighting, color mood, and (if photographic) camera/lens/shot type. Use clear nouns and precise adjectives; avoid long synonym lists and parentheticals. Constraints: English only, one line, under 85 words, no markdown. Do NOT add style labels like photorealistic, cinematic, anime, watercolor, illustration, isometric, or 3D render unless explicitly requested (a style suffix may be appended later). If the input is already English, lightly polish without changing meaning. End with: sharp focus, detailed textures, clean background, no text, no watermark.",
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
