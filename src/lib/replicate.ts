export type ReplicatePrediction = {
  id: string;
  status: "starting" | "processing" | "succeeded" | "failed" | "canceled";
  output?: string | string[] | null;
  error?: string | null;
};

const REPLICATE_API_URL = "https://api.replicate.com/v1";

function getAuthHeaders() {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) {
    throw new Error("REPLICATE_API_TOKEN is not set");
  }
  return {
    Authorization: `Token ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

export async function createPrediction(
  prompt: string,
  aspectRatio: "16:9" | "1:1" = "16:9"
): Promise<{ id: string }> {
  const modelSlug =
    process.env.REPLICATE_MODEL_SLUG || "black-forest-labs/flux-schnell";
  const response = await fetch(
    `${REPLICATE_API_URL}/models/${modelSlug}/predictions`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        input: { prompt, aspect_ratio: aspectRatio, output_format: "jpg" },
      }),
      // Replicate is fine with edge/runtime fetch
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Failed to create prediction: ${response.status} ${text}`);
  }

  const data = (await response.json()) as { id: string };
  return { id: data.id };
}

export async function getPrediction(id: string): Promise<ReplicatePrediction> {
  const response = await fetch(`${REPLICATE_API_URL}/predictions/${id}`, {
    method: "GET",
    headers: getAuthHeaders(),
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Failed to get prediction: ${response.status} ${text}`);
  }

  const data = (await response.json()) as ReplicatePrediction;
  return data;
}

export function extractOutputUrl(
  output: ReplicatePrediction["output"]
): string {
  if (!output) return "";
  if (Array.isArray(output)) {
    return typeof output[0] === "string" ? (output[0] as string) : "";
  }
  return typeof output === "string" ? output : "";
}
