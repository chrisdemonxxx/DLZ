import type { SexCode } from "../aamva/types.ts";

export type SpecimenPortrait = {
  id: string;
  url: string;
  sex: SexCode;
  label: string;
};

export const SPECIMEN_PORTRAITS: SpecimenPortrait[] = [
  { id: "male-01", url: "/portraits/male-01.jpg", sex: "1", label: "Specimen A" },
  { id: "male-02", url: "/portraits/male-02.jpg", sex: "1", label: "Specimen B" },
  { id: "female-01", url: "/portraits/female-01.jpg", sex: "2", label: "Specimen C" },
  { id: "female-02", url: "/portraits/female-02.jpg", sex: "2", label: "Specimen D" },
];

export const PAPER_TEXTURE = "/card/paper.jpg";
export const FOIL_TEXTURE = "/card/foil.jpg";
export const OVD_TEXTURE = "/card/ovd.jpg";
export const OVI_STRIP = "/card/ovi.jpg";

export function defaultPortraitForSex(sex: SexCode): SpecimenPortrait {
  return SPECIMEN_PORTRAITS.find((p) => p.sex === sex) ?? SPECIMEN_PORTRAITS[0];
}

export function isSpecimenPortrait(url: string | null): boolean {
  return !!url && SPECIMEN_PORTRAITS.some((p) => p.url === url);
}

const imageCache = new Map<string, HTMLImageElement | Promise<HTMLImageElement>>();

export function loadImage(src: string): Promise<HTMLImageElement> {
  if (!src.startsWith("data:")) {
    const hit = imageCache.get(src);
    if (hit instanceof HTMLImageElement) return Promise.resolve(hit);
    if (hit) return hit;
  }
  const promise = new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (!src.startsWith("data:")) imageCache.set(src, img);
      resolve(img);
    };
    img.onerror = () => {
      imageCache.delete(src);
      reject(new Error(`Failed to load ${src}`));
    };
    img.src = src;
  });
  if (!src.startsWith("data:")) imageCache.set(src, promise);
  return promise;
}

export async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export async function cropToPortrait(dataUrl: string): Promise<string> {
  const img = await loadImage(dataUrl);
  const ratio = 3 / 4;
  let sx = 0;
  let sy = 0;
  let sw = img.width;
  let sh = img.height;
  const current = sw / sh;
  if (current > ratio) {
    sw = Math.round(sh * ratio);
    sx = Math.round((img.width - sw) / 2);
  } else {
    sh = Math.round(sw / ratio);
    sy = Math.round((img.height - sh) / 2);
  }
  const canvas = document.createElement("canvas");
  canvas.width = 900;
  canvas.height = 1200;
  const ctx = canvas.getContext("2d");
  if (!ctx) return dataUrl;
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, 900, 1200);
  return canvas.toDataURL("image/jpeg", 0.92);
}

export function drawFallbackPortrait(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  sex: SexCode,
) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  const bg = ctx.createLinearGradient(x, y, x, y + h);
  bg.addColorStop(0, "#c8ced6");
  bg.addColorStop(1, "#9aa3ad");
  ctx.fillStyle = bg;
  ctx.fillRect(x, y, w, h);

  ctx.fillStyle = sex === "2" ? "#2c2420" : "#1d2a38";
  ctx.fillRect(x, y + h * 0.62, w, h * 0.38);

  ctx.fillStyle = sex === "2" ? "#c9a58a" : "#c4a27c";
  ctx.beginPath();
  ctx.ellipse(x + w / 2, y + h * 0.42, w * 0.28, h * 0.24, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = sex === "2" ? "#2a1d16" : "#3a2a1c";
  ctx.beginPath();
  ctx.ellipse(x + w / 2, y + h * 0.28, w * 0.3, h * 0.16, 0, Math.PI, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(18,21,26,0.55)";
  ctx.font = `${Math.round(h * 0.06)}px "IBM Plex Sans"`;
  ctx.textAlign = "center";
  ctx.fillText("SPECIMEN", x + w / 2, y + h * 0.9);
  ctx.restore();
}
