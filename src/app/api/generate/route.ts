import { NextRequest, NextResponse } from "next/server";
import { createPrediction } from "@/lib/replicate";
import { translateJaToEn } from "@/lib/openai";
import { findImageStyleById } from "@/lib/styles";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
    const styleId = typeof body?.styleId === "string" ? body.styleId : "none";
    const aspectRatio: "16:9" | "1:1" =
      body?.aspectRatio === "1:1" ? "1:1" : "16:9";

    if (!prompt) {
      return NextResponse.json(
        { error: "prompt is required" },
        { status: 400 }
      );
    }

    // 1) Translate JA -> EN (no-op if already EN or if translation fails)
    const translated = await translateJaToEn(prompt);

    // 2) Apply style preset
    const style = findImageStyleById(styleId);
    const finalPrompt = style.promptSuffix
      ? `${translated}. ${style.promptSuffix}`
      : translated;

    const { id } = await createPrediction(finalPrompt, aspectRatio);
    return NextResponse.json({ predictionId: id });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to start prediction";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
