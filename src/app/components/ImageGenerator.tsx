"use client";

import * as React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { IMAGE_STYLES } from "@/lib/styles";
import { cn } from "@/lib/utils";
import { BotIcon, DownloadIcon, Pencil } from "lucide-react";

type PollResponse = {
  status: "starting" | "processing" | "succeeded" | "failed" | "canceled";
  outputUrl?: string;
  error?: string;
};

export default function ImageGenerator() {
  const [prompt, setPrompt] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [styleId, setStyleId] = React.useState<string>("none");
  const [aspectRatio, setAspectRatio] = React.useState<"16:9" | "1:1">("16:9");
  const [isDownloading, setIsDownloading] = React.useState(false);

  async function handleGenerate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setImageUrl("");

    const trimmed = prompt.trim();
    if (!trimmed) {
      setError("生成指示文を入力してください。");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: trimmed, styleId, aspectRatio }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "画像生成の開始に失敗しました。");
      }
      const { predictionId } = (await res.json()) as { predictionId: string };

      // Poll every 2 seconds
      let done = false;
      const maxTries = 120; // ~4 minutes
      for (let i = 0; i < maxTries && !done; i++) {
        await new Promise((r) => setTimeout(r, 2000));
        const pollRes = await fetch(
          `/api/poll?predictionId=${encodeURIComponent(predictionId)}`
        );
        if (!pollRes.ok) {
          const data = await pollRes.json().catch(() => ({}));
          throw new Error(data?.error || "ポーリングに失敗しました。");
        }
        const data = (await pollRes.json()) as PollResponse;
        if (data.status === "succeeded") {
          setImageUrl(data.outputUrl || "");
          done = true;
        } else if (data.status === "failed" || data.status === "canceled") {
          throw new Error("画像生成に失敗しました。");
        }
      }
      if (!done) {
        throw new Error(
          "タイムアウトしました。しばらくしてから再度お試しください。"
        );
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "エラーが発生しました。";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  const aspectClass = aspectRatio === "1:1" ? "aspect-square" : "aspect-video";

  async function handleDownload() {
    if (!imageUrl) return;
    setError(null);
    setIsDownloading(true);
    try {
      const response = await fetch(imageUrl, { cache: "no-store" });
      if (!response.ok) {
        throw new Error("画像の取得に失敗しました。");
      }
      const blob = await response.blob();
      const contentType = response.headers.get("content-type") || "";
      let extension = "png";
      if (contentType.includes("png")) extension = "png";
      else if (contentType.includes("jpeg")) extension = "jpg";
      else if (contentType.includes("webp")) extension = "webp";
      else {
        const fromUrl = imageUrl.split("?")[0].split(".");
        const maybeExt = fromUrl[fromUrl.length - 1];
        if (maybeExt && maybeExt.length <= 5) extension = maybeExt;
      }

      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      anchor.download = `generated-${timestamp}.${extension}`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(objectUrl);
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "ダウンロードに失敗しました。";
      setError(message);
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <Card className="w-full max-w-5xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-1.5">
          <Pencil className="size-4" />
          画像生成指示
        </CardTitle>
        <CardDescription className="text-xs mt-1">
          日本語で指示文を入力すると画像生成精度を向上させるために自動で英語に翻訳して、画像を生成します。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <form onSubmit={handleGenerate} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">生成指示文</label>
                <Input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="例：夕暮れの街並み"
                  disabled={isLoading}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">画像のテイスト</label>
                <div
                  className="grid grid-cols-2 md:grid-cols-3 gap-3"
                  role="radiogroup"
                  aria-label="画像のテイスト"
                >
                  {IMAGE_STYLES.map((style) => (
                    <div key={style.id} className="relative">
                      <input
                        type="radio"
                        id={`style-${style.id}`}
                        name="style"
                        value={style.id}
                        className="peer sr-only"
                        checked={styleId === style.id}
                        onChange={() => setStyleId(style.id)}
                        disabled={isLoading}
                      />
                      <label
                        htmlFor={`style-${style.id}`}
                        className={cn(
                          buttonVariants({ variant: "outline", size: "lg" }),
                          "w-full justify-center cursor-pointer select-none h-auto py-3 border-2",
                          "peer-checked:border-blue-700 peer-checked:bg-blue-50",
                          "peer-focus-visible:ring-ring/50 peer-focus-visible:border-ring peer-focus-visible:ring-[3px]"
                        )}
                      >
                        {style.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">アスペクト比</label>
                <div
                  className="grid grid-cols-2 md:grid-cols-3 gap-3"
                  role="radiogroup"
                  aria-label="アスペクト比"
                >
                  {["16:9", "1:1"].map((ratio) => (
                    <div key={ratio} className="relative">
                      <input
                        type="radio"
                        id={`aspect-${ratio}`}
                        name="aspect"
                        value={ratio}
                        className="peer sr-only"
                        checked={aspectRatio === ratio}
                        onChange={() => setAspectRatio(ratio as "16:9" | "1:1")}
                        disabled={isLoading}
                      />
                      <label
                        htmlFor={`aspect-${ratio}`}
                        className={cn(
                          buttonVariants({ variant: "outline", size: "lg" }),
                          "w-full justify-center cursor-pointer select-none h-auto py-3 border-2",
                          "peer-checked:border-blue-700 peer-checked:bg-blue-50",
                          "peer-focus-visible:ring-ring/50 peer-focus-visible:border-ring peer-focus-visible:ring-[3px]"
                        )}
                      >
                        {ratio}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  variant="gradient"
                  className="w-full cursor-pointer"
                  size="lg"
                  disabled={isLoading}
                  aria-busy={isLoading}
                >
                  {isLoading ? "生成中…" : "生成する"}
                </Button>
              </div>
            </form>

            {error ? (
              <p className="text-sm text-red-500 mt-3" role="alert">
                {error}
              </p>
            ) : null}
          </div>

          <div className="w-full">
            {isLoading ? (
              <Skeleton className={cn("w-full max-h-[512px]", aspectClass)}>
                <div className="flex flex-col items-center justify-center gap-2 h-full">
                  <BotIcon className="size-10 text-muted-foreground animate-bounce" />
                  <p className="text-sm text-muted-foreground">
                    画像を生成しています...
                  </p>
                </div>
              </Skeleton>
            ) : imageUrl ? (
              <div className={cn("relative w-full max-h-[512px]", aspectClass)}>
                <Image
                  src={imageUrl}
                  alt="生成された画像"
                  fill
                  sizes="(max-width: 768px) 100vw, 640px"
                  priority
                />
              </div>
            ) : (
              <div
                className={cn(
                  "w-full max-h-[512px] border rounded-md flex items-center justify-center text-sm text-muted-foreground",
                  aspectClass
                )}
              >
                ここに生成画像が表示されます
              </div>
            )}
            {imageUrl && (
              <div className="mt-3">
                <Button
                  type="button"
                  variant="default"
                  onClick={handleDownload}
                  disabled={isLoading || isDownloading}
                  aria-busy={isDownloading}
                  aria-disabled={isLoading || isDownloading}
                >
                  <DownloadIcon className="size-4 mr-1" />
                  {isDownloading ? "保存中…" : "ダウンロード"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
