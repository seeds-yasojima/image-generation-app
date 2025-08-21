import { NextRequest, NextResponse } from "next/server";
import { extractOutputUrl, getPrediction } from "@/lib/replicate";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const predictionId = searchParams.get("predictionId");

    if (!predictionId) {
      return NextResponse.json(
        { error: "predictionId is required" },
        { status: 400 }
      );
    }

    const prediction = await getPrediction(predictionId);
    const status = prediction.status;
    const outputUrl = extractOutputUrl(prediction.output);

    return NextResponse.json({ status, outputUrl });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch prediction";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
