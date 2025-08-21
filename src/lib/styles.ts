export type ImageStyle = {
  id: string;
  label: string;
  promptSuffix: string;
};

export const IMAGE_STYLES: ImageStyle[] = [
  {
    id: "none",
    label: "おまかせ",
    promptSuffix: "",
  },
  {
    id: "photorealistic",
    label: "写真風",
    promptSuffix:
      "Photorealistic, ultra-detailed, high dynamic range, 35mm, natural lighting, realistic textures",
  },
  {
    id: "cinematic",
    label: "シネマティック",
    promptSuffix:
      "Cinematic, dramatic lighting, shallow depth of field, film grain, color graded, composition like a movie still",
  },
  {
    id: "anime",
    label: "アニメ",
    promptSuffix:
      "Anime style, clean lineart, vibrant colors, Studio Ghibli and Makoto Shinkai inspired, soft lighting",
  },
  {
    id: "watercolor",
    label: "水彩画",
    promptSuffix:
      "Watercolor painting, soft gradients, paper texture, delicate brush strokes, gentle color bleeding",
  },
  {
    id: "illustration",
    label: "イラスト",
    promptSuffix:
      "Illustration, clean lines, flat shading, artstation trending, concept art, appealing composition",
  },
  {
    id: "blog_isometric",
    label: "アイソメトリック",
    promptSuffix:
      "Isometric illustration, technology theme, clean geometry, subtle gradients, light ambient occlusion, modern SaaS hero with room for overlay text",
  },
  {
    id: "three_d",
    label: "3Dレンダー",
    promptSuffix:
      "3D render, octane render, global illumination, subsurface scattering, detailed materials",
  },
];

export function findImageStyleById(styleId: string | undefined | null) {
  return IMAGE_STYLES.find((s) => s.id === styleId) || IMAGE_STYLES[0];
}
