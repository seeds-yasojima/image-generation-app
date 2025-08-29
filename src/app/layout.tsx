import type { Metadata } from "next";
import "./globals.css";

import { Noto_Sans_JP } from "next/font/google";
import ThemeToggle from "@/components/ThemeToggle";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "いい感じにサクッと生成！画像生成アプリ",
  description: "あなたの指示をいい感じに解釈して画像を生成します",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.className} antialiased`}
        suppressHydrationWarning
      >
        <div className="min-h-dvh bg-[radial-gradient(1200px_600px_at_70%_-10%,_oklch(0.94_0.02_250_/_0.8),_transparent),radial-gradient(800px_400px_at_0%_0%,_oklch(0.96_0.02_200_/_0.8),_transparent)] dark:bg-[radial-gradient(1200px_600px_at_70%_-20%,_oklch(0.22_0.03_260/_0.7),_transparent),radial-gradient(800px_400px_at_0%_0%,_oklch(0.18_0.03_230/_0.6),_transparent)] transition-colors">
          <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 h-14 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-7 rounded-md bg-gradient-to-br from-sky-500 to-blue-600" />
                <span className="text-sm sm:text-base font-semibold">
                  いい感じにサクッと生成
                </span>
              </div>
              <ThemeToggle />
            </div>
          </header>
          <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-10">
            {children}
          </main>
          <footer className="py-8 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Schnell
          </footer>
        </div>
      </body>
    </html>
  );
}
