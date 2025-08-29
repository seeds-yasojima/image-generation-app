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
      "Photorealistic, ultra-detailed, high dynamic range, 35mm lens, natural lighting, realistic textures, sharp focus, professional photography, depth of field, accurate shadows and highlights",
  },
  {
    id: "cinematic",
    label: "シネマティック",
    promptSuffix:
      "Cinematic, dramatic lighting, shallow depth of field, film grain, color graded, composition like a movie still, atmospheric, moody, professional cinematography, golden hour lighting",
  },
  {
    id: "anime",
    label: "アニメ",
    promptSuffix:
      "Anime style, clean lineart, vibrant colors, Studio Ghibli and Makoto Shinkai inspired, soft lighting, cel-shaded, expressive eyes, flowing hair, dynamic poses, Japanese animation aesthetic",
  },
  {
    id: "watercolor",
    label: "水彩画",
    promptSuffix:
      "Watercolor painting, soft gradients, paper texture, delicate brush strokes, gentle color bleeding, translucent layers, organic flow, artistic medium, traditional art technique, subtle color variations",
  },
  {
    id: "illustration",
    label: "イラスト",
    promptSuffix:
      "Illustration, clean lines, flat shading, artstation trending, concept art, appealing composition, digital art, professional illustration, clean design, modern art style, vector-like precision",
  },
  {
    id: "blog_isometric",
    label: "アイソメトリック",
    promptSuffix:
      "Isometric projection, 30-degree angle view, technical illustration, clean geometric shapes, flat design aesthetic, modern tech visualization, architectural diagram style, equal angle projection, grid-based composition, minimalist color palette, professional infographic look, precise geometric forms, clean vector-style lines, technology blueprint aesthetic",
  },
  {
    id: "three_d",
    label: "3Dレンダー",
    promptSuffix:
      "3D render, octane render, global illumination, subsurface scattering, detailed materials, realistic lighting, professional 3D visualization, high-quality textures, accurate shadows, photorealistic 3D art",
  },
];

export function findImageStyleById(styleId: string | undefined | null) {
  return IMAGE_STYLES.find((s) => s.id === styleId) || IMAGE_STYLES[0];
}
