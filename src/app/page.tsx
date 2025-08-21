import ImageGenerator from "./components/ImageGenerator";
import SampleGallery from "./components/SampleGallery";

export default function Home() {
  return (
    <div className="font-sans min-h-screen p-6 sm:p-10 flex items-start justify-center bg-slate-50">
      <main className="w-full flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            いい感じにサクッと生成！画像生成アプリ 🎨
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            あなたの指示をいい感じに解釈して画像を生成します
          </p>
        </div>

        <div className="my-8">
          <ImageGenerator />
        </div>
        <SampleGallery />
      </main>
    </div>
  );
}
