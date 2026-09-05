import { formatHeight, parseIsoDate } from "../aamva/format.ts";

export const CR80_IN = { w: 3.375, h: 2.125 } as const;
export const DESIGN_DPI = 300;
export const DESIGN = {
  w: Math.round(CR80_IN.w * DESIGN_DPI),
  h: Math.round(CR80_IN.h * DESIGN_DPI),
} as const;

export function cardSize(dpi: number, vertical: boolean) {
  const w = Math.round(CR80_IN.w * dpi);
  const h = Math.round(CR80_IN.h * dpi);
  return vertical ? { w: h, h: w } : { w, h };
}

export function displayDate(iso: string): string {
  const p = parseIsoDate(iso);
  if (!p) return iso || "—";
  return `${p.m}/${p.d}/${p.y}`;
}

export function displayHeight(raw: string): string {
  const formatted = formatHeight(raw);
  const m = formatted.match(/^(\d{3}) in$/i);
  if (!m) return formatted;
  const inches = Number.parseInt(m[1], 10);
  const ft = Math.floor(inches / 12);
  const inn = inches % 12;
  return `${ft}'-${String(inn).padStart(2, "0")}"`;
}

export function displaySex(code: string): string {
  if (code === "1") return "M";
  if (code === "2") return "F";
  return "X";
}

export function displayZip(postal: string): string {
  const digits = postal.replace(/\D/g, "");
  if (digits.length >= 9 && digits.slice(5) !== "0000") {
    return `${digits.slice(0, 5)}-${digits.slice(5, 9)}`;
  }
  return digits.slice(0, 5) || postal;
}

export function titleCaseName(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\b([a-z])/g, (ch) => ch.toUpperCase());
}

export function under21Until(dobIso: string): string | null {
  const p = parseIsoDate(dobIso);
  if (!p) return null;
  const y = Number.parseInt(p.y, 10) + 21;
  return `${p.m}/${p.d}/${y}`;
}
