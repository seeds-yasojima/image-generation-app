import ImageGenerator from "./components/ImageGenerator";
import SampleGallery from "./components/SampleGallery";

export default function Home() {
  return (
    <div className="w-full">
      <section className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground shadow-sm bg-background/80 backdrop-blur">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          ベータ版
        </div>
        <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
          いい感じにサクッと生成！
          <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
            画像生成
          </span>
        </h1>
        <p className="mx-auto mt-4 text-sm text-muted-foreground">
          あなたの日本語の指示を自動で高品質な英語プロンプトに変換して、
          高精度な画像をサクッと生成します。
        </p>
      </section>

      <div className="mt-8">
        <ImageGenerator />
      </div>
      <div className="mt-10">
        <SampleGallery />
      </div>
    </div>
  );
}
