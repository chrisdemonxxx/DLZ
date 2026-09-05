import { titleCaseName } from "./format-card.ts";

export function signatureText(family: string, first: string, middle: string): string {
  const f = titleCaseName(first);
  const m = middle && middle.toUpperCase() !== "NONE" ? `${titleCaseName(middle).charAt(0)}.` : "";
  const l = titleCaseName(family);
  return [f, m, l].filter(Boolean).join(" ");
}

export function renderSignatureDataUrl(name: string, color = "#1a2744"): string {
  const canvas = document.createElement("canvas");
  canvas.width = 900;
  canvas.height = 220;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  ctx.font = "92px 'Great Vibes', cursive";
  ctx.textBaseline = "middle";
  ctx.fillText(name, 24, 120);
  return canvas.toDataURL("image/png");
}

export function emptySignaturePad(): string {
  const canvas = document.createElement("canvas");
  canvas.width = 900;
  canvas.height = 220;
  return canvas.toDataURL("image/png");
}
