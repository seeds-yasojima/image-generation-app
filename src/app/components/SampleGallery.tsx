"use client";

import * as React from "react";
import Image from "next/image";

type SampleItem = {
  src: string;
  alt: string;
  style: string;
  ratioClass: string;
  title?: string;
};

const defaultSamples: SampleItem[] = [
  {
    src: "/sample-image-1.jpg",
    alt: "Sample 1",
    style: "3Dレンダー",
    ratioClass: "aspect-[1/1]",
    title: "卵の殻から顔を出す宇宙服を着た猫",
  },
  {
    src: "/sample-image-12.jpg",
    alt: "Sample 12",
    style: "3Dレンダー",
    ratioClass: "aspect-[16/9]",
    title: "釣りをするおじいさん",
  },
  {
    src: "/sample-image-10.jpg",
    alt: "Sample 10",
    style: "写真風",
    ratioClass: "aspect-[1/1]",
    title: "ノートPCでリモートワークする人",
  },

  {
    src: "/sample-image-6.jpg",
    alt: "Sample 6",
    style: "シネマティック",
    ratioClass: "aspect-[16/9]",
    title: "古い木の机に万年筆とノート",
  },
  {
    src: "/sample-image-4.jpg",
    alt: "Sample 4",
    style: "水彩画",
    ratioClass: "aspect-[1/1]",
    title: "海辺のカフェで湯気の立つラテ",
  },
  {
    src: "/sample-image-5.jpg",
    alt: "Sample 5",
    style: "3Dレンダー",
    ratioClass: "aspect-[1/1]",
    title: "極薄ベゼルのスマートフォン",
  },
  {
    src: "/sample-image-7.jpg",
    alt: "Sample 7",
    style: "写真風",
    ratioClass: "aspect-[1/1]",
    title: "桜吹雪の中で微笑む女子学生",
  },
  {
    src: "/sample-image-2.jpg",
    alt: "Sample 2",
    style: "イラスト",
    ratioClass: "aspect-[16/9]",
    title: "木漏れ日の森に立つ日本人女性 ",
  },
  {
    src: "/sample-image-9.jpg",
    alt: "Sample 9",
    style: "アイソメトリック",
    ratioClass: "aspect-[1/1]",
    title: "1on1ミーティングの風景",
  },
  {
    src: "/sample-image-3.jpg",
    alt: "Sample 3",
    style: "写真風",
    ratioClass: "aspect-[1/1]",
    title: "海中を泳ぐクジラと差し込む光",
  },
  {
    src: "/sample-image-11.jpg",
    alt: "Sample 11",
    style: "アニメ",
    ratioClass: "aspect-[1/1]",
    title: "夕焼けの湖と桟橋に立つ人物",
  },

  {
    src: "/sample-image-8.jpg",
    alt: "Sample 8",
    style: "写真風",
    ratioClass: "aspect-[16/9]",
    title: "焼きたてクロワッサンとバターの朝食",
  },
];

export default function SampleGallery({
  samples = defaultSamples,
}: {
  samples?: SampleItem[];
}) {
  return (
    <section className="w-full max-w-7xl">
      <div className="px-2 sm:px-0 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          生成画像サンプル
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          タップ/ホバーでキャプションを表示
        </p>
      </div>

      <div className="mt-6 px-2 sm:px-0 columns-2 sm:columns-3 lg:columns-4 gap-5 md:gap-4 [column-fill:balance]">
        {samples.map((item, index) => (
          <figure
            key={`${item.src}-${index}`}
            className="group relative mb-4 break-inside-avoid"
          >
            <div
              className={`relative w-full overflow-hidden rounded-lg ${item.ratioClass} bg-muted shadow-sm ring-1 ring-black/5 dark:ring-white/10 transition-all duration-300 group-hover:ring-2 group-hover:ring-blue-500/40`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover will-change-transform group-hover:scale-[1.02] transition-transform duration-300"
                priority={index < 8}
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {item.title ? (
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-3 sm:p-4">
                  <div className="text-xs text-white/80">{item.style}</div>
                  <div className="text-sm sm:text-base font-medium text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]">
                    {item.title}
                  </div>
                </figcaption>
              ) : null}
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
