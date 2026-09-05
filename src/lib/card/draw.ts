import type { LicenseForm } from "../aamva/types.ts";
import { ageOn, parseIsoDate, todayIso } from "../aamva/format.ts";
import { JURISDICTION_BY_CODE } from "../aamva/jurisdictions.ts";
import { DESIGN, displayDate, displayHeight, displaySex, displayZip, under21Until } from "./format-card.ts";
import { drawFallbackPortrait } from "./portraits.ts";
import { themeFor, type CardTheme, type Motif } from "./themes.ts";

export type CardAssets = {
  portrait: HTMLImageElement | null;
  paper: HTMLImageElement | null;
  foil: HTMLImageElement | null;
  signature: HTMLImageElement | null;
  bg: HTMLImageElement | null;
  ovd: HTMLImageElement | null;
  ovi: HTMLImageElement | null;
  code128: HTMLCanvasElement | null;
  inv128: HTMLCanvasElement | null;
};

export type CardDrawOptions = {
  form: LicenseForm;
  assets: CardAssets;
  vertical: boolean;
  showGhost: boolean;
  dpi?: number;
};

export function isVerticalCard(form: LicenseForm, orientation: "auto" | "horizontal" | "vertical"): boolean {
  if (orientation === "vertical") return true;
  if (orientation === "horizontal") return false;
  const age = ageOn(form.dob, todayIso());
  return age !== null && age < 21;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function seedFrom(code: string): number {
  return [...code].reduce((n, ch) => n + ch.charCodeAt(0) * 13, 17);
}

export function drawCardFront(ctx: CanvasRenderingContext2D, opts: CardDrawOptions) {
  const dpi = opts.dpi ?? 300;
  const scale = dpi / 300;
  const vertical = opts.vertical;
  const W = vertical ? DESIGN.h : DESIGN.w;
  const H = vertical ? DESIGN.w : DESIGN.h;
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.clearRect(0, 0, W, H);
  ctx.save();
  roundRect(ctx, 0, 0, W, H, 22);
  ctx.clip();

  const theme = themeFor(opts.form.jurisdictionCode);
  paintGround(ctx, W, H, theme, opts.assets);
  if (vertical) drawVertical(ctx, W, H, opts, theme);
  else drawHorizontal(ctx, W, H, opts, theme);
  drawSecurityOverlay(ctx, W, H, theme, opts);
  ctx.restore();

  ctx.save();
  roundRect(ctx, 0.5, 0.5, W - 1, H - 1, 22);
  ctx.strokeStyle = "rgba(18,21,26,0.35)";
  ctx.lineWidth = 1.2;
  ctx.stroke();
  ctx.restore();
}

export function drawCardBack(ctx: CanvasRenderingContext2D, opts: CardDrawOptions, barcode: HTMLCanvasElement | null) {
  const dpi = opts.dpi ?? 300;
  const scale = dpi / 300;
  const vertical = opts.vertical;
  const W = vertical ? DESIGN.h : DESIGN.w;
  const H = vertical ? DESIGN.w : DESIGN.h;
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.clearRect(0, 0, W, H);
  ctx.save();
  roundRect(ctx, 0, 0, W, H, 22);
  ctx.clip();

  const theme = themeFor(opts.form.jurisdictionCode);
  const form = opts.form;
  const j = JURISDICTION_BY_CODE[form.jurisdictionCode];

  ctx.fillStyle = "#f3efe6";
  ctx.fillRect(0, 0, W, H);
  if (opts.assets.bg) {
    ctx.globalAlpha = 0.42;
    coverImage(ctx, opts.assets.bg, 0, 0, W, H);
    ctx.globalAlpha = 1;
  } else if (opts.assets.paper) {
    ctx.globalAlpha = 0.3;
    ctx.drawImage(opts.assets.paper, 0, 0, W, H);
    ctx.globalAlpha = 1;
  }
  drawGuilloche(ctx, W, H, theme, seedFrom(theme.code + "B"));

  let y = 0;
  if (theme.magStripe) {
    ctx.fillStyle = "#111111";
    ctx.fillRect(0, 0, W, 46);
    ctx.fillStyle = "rgba(255,255,255,0.28)";
    ctx.font = '8px "IBM Plex Sans"';
    ctx.fillText("SPECIMEN  ·  MAGNETIC STRIPE NOT ENCODED", 16, 28);
    y = 50;
  } else {
    y = 10;
  }

  if (opts.assets.code128) {
    const c = opts.assets.code128;
    const barH = 36;
    const barW = W - 28;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(14, y, barW, barH);
    ctx.drawImage(c, 16, y + 3, barW - 4, barH - 6);
    y += barH + 10;
  }

  const pdfTop = y;
  if (barcode) {
    const maxW = vertical ? W - 40 : 560;
    const maxH = vertical ? 220 : 268;
    const ratio = barcode.width / Math.max(1, barcode.height);
    let bw = maxW;
    let bh = bw / ratio;
    if (bh > maxH) {
      bh = maxH;
      bw = bh * ratio;
    }
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(16, pdfTop, bw + 12, bh + 12);
    ctx.drawImage(barcode, 22, pdfTop + 6, bw, bh);

    const rx = vertical ? 20 : Math.min(W - 300, 28 + bw + 24);
    const ry = vertical ? pdfTop + bh + 28 : pdfTop + 8;
    ctx.fillStyle = theme.header;
    ctx.font = '700 10px "IBM Plex Sans"';
    ctx.fillText("CLASS", rx, ry);
    ctx.fillStyle = theme.ink;
    ctx.font = '700 15px "IBM Plex Sans"';
    ctx.fillText((form.vehicleClass || "NONE").toUpperCase(), rx, ry + 20);
    ctx.fillStyle = theme.muted;
    ctx.font = '600 10px "IBM Plex Sans"';
    ctx.fillText("ENDORSEMENTS", rx, ry + 44);
    ctx.fillStyle = theme.ink;
    ctx.font = '600 13px "IBM Plex Sans"';
    ctx.fillText((form.endorsements || "NONE").toUpperCase(), rx, ry + 62);
    ctx.fillStyle = theme.muted;
    ctx.font = '600 10px "IBM Plex Sans"';
    ctx.fillText("RESTRICTIONS", rx, ry + 86);
    ctx.fillStyle = theme.ink;
    ctx.font = '600 13px "IBM Plex Sans"';
    ctx.fillText((form.restrictions || "NONE").toUpperCase(), rx, ry + 104);

    if (opts.showGhost && opts.assets.portrait) {
      const gx = vertical ? W / 2 - 48 : rx;
      const gy = vertical ? H - 210 : ry + 124;
      ctx.save();
      ctx.globalAlpha = 0.55;
      ctx.beginPath();
      ctx.arc(gx + 54, gy + 64, 54, 0, Math.PI * 2);
      ctx.clip();
      ctx.filter = "grayscale(1)";
      coverImage(ctx, opts.assets.portrait, gx, gy, 108, 140);
      ctx.restore();
      ctx.strokeStyle = theme.gold;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(gx + 54, gy + 64, 54, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  if (opts.assets.inv128) {
    const c = opts.assets.inv128;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(16, H - 54, 320, 28);
    ctx.drawImage(c, 18, H - 52, 316, 24);
  }

  ctx.fillStyle = theme.ink;
  ctx.font = '600 11px "IBM Plex Sans"';
  ctx.fillText(theme.nickname, W - 280, H - 36);
  ctx.font = '10px "IBM Plex Mono"';
  ctx.fillStyle = theme.muted;
  ctx.fillText(`IIN ${j?.iin ?? "------"}  ${form.jurisdictionCode} ${form.documentKind}  v${String(form.aamvaVersion).padStart(2, "0")}`, W - 280, H - 18);

  ctx.font = '7px "IBM Plex Mono"';
  ctx.fillStyle = "rgba(18,21,26,0.45)";
  ctx.fillText(`SPECIMEN ${form.inventory}  ${form.discriminator}  NOT A GOVERNMENT DOCUMENT`.repeat(3), 16, H - 8);

  drawWatermark(ctx, W, H, 0.07);
  ctx.restore();

  ctx.save();
  roundRect(ctx, 0.5, 0.5, W - 1, H - 1, 22);
  ctx.strokeStyle = "rgba(18,21,26,0.35)";
  ctx.lineWidth = 1.2;
  ctx.stroke();
  ctx.restore();
}

function paintGround(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  theme: CardTheme,
  assets: CardAssets,
) {
  ctx.fillStyle = theme.ground;
  ctx.fillRect(0, 0, W, H);
  const plate = assets.bg ?? assets.paper;
  if (plate) {
    ctx.save();
    coverImage(ctx, plate, 0, 0, W, H);
    ctx.restore();
    ctx.fillStyle = "rgba(247,244,236,0.18)";
    ctx.fillRect(0, 0, W, H);
  }
  drawGuilloche(ctx, W, H, theme, seedFrom(theme.code));
}

function drawHorizontal(ctx: CanvasRenderingContext2D, W: number, H: number, opts: CardDrawOptions, theme: CardTheme) {
  const form = opts.form;
  drawHeader(ctx, W, theme, form, false);
  drawOviStrip(ctx, 0, 58, W, 9, opts.assets);
  ctx.fillStyle = "rgba(247,244,236,0.28)";
  ctx.fillRect(258, 66, W - 270, 430);
  const photo = { x: 22, y: 70, w: 228, h: 304 };
  drawPhotoFrame(ctx, photo, opts, theme);
  drawSignature(ctx, 22, 378, 228, 50, opts);
  if (opts.showGhost) {
    if (theme.ghost === "rosette") drawRosetteGhost(ctx, W - 132, 430, 108, opts, theme);
    else drawGhost(ctx, W - 178, 360, 140, 186, opts);
  }
  drawAamvaFields(ctx, 268, 76, form, theme, false, W);
}

function drawVertical(ctx: CanvasRenderingContext2D, W: number, H: number, opts: CardDrawOptions, theme: CardTheme) {
  const form = opts.form;
  drawHeader(ctx, W, theme, form, true);
  const until = under21Until(form.dob);
  const age = ageOn(form.dob, todayIso());
  const showU21 = age !== null && age < 21;
  let y = 86;
  if (showU21) {
    ctx.fillStyle = theme.accent;
    ctx.fillRect(0, 78, W, 32);
    ctx.fillStyle = "#F6F3EB";
    ctx.font = '700 13px "IBM Plex Sans"';
    ctx.textAlign = "center";
    ctx.fillText(until ? `UNDER 21 UNTIL ${until}` : "UNDER 21", W / 2, 99);
    ctx.textAlign = "left";
    y = 118;
  }
  const photo = { x: 24, y, w: 220, h: 292 };
  drawPhotoFrame(ctx, photo, opts, theme);
  drawSignature(ctx, 24, photo.y + photo.h + 6, 220, 46, opts);
  drawAamvaFields(ctx, 260, y, form, theme, true, W);
  if (opts.showGhost) drawRosetteGhost(ctx, W / 2, H - 150, 90, opts, theme);
}

function drawHeader(ctx: CanvasRenderingContext2D, W: number, theme: CardTheme, form: LicenseForm, vertical: boolean) {
  const title = form.documentKind === "ID" ? theme.titleId : theme.titleDl;
  ctx.fillStyle = "rgba(247,244,236,0.55)";
  ctx.fillRect(0, 0, W, 64);

  ctx.fillStyle = theme.headerInk;
  if (theme.headerStyle === "script") {
    ctx.font = '700 38px "Great Vibes", cursive';
    ctx.fillText(theme.displayName, 20, 44);
    ctx.font = '700 13px "IBM Plex Sans"';
    ctx.textAlign = "center";
    ctx.fillText(title, W * 0.58, 30);
    ctx.font = '500 10px "IBM Plex Sans"';
    ctx.fillText(`${theme.code}, USA`, W * 0.58, 46);
    ctx.textAlign = "left";
  } else if (theme.headerStyle === "serif") {
    ctx.font = '700 24px "Playfair Display", "Times New Roman", serif';
    ctx.fillText(theme.displayName.toUpperCase(), 20, 30);
    ctx.font = '600 11px "IBM Plex Sans"';
    ctx.fillText(`${title}   USA`, 20, 50);
  } else {
    ctx.font = '700 20px "IBM Plex Sans"';
    ctx.fillText(theme.displayName.toUpperCase(), 20, 30);
    ctx.font = '600 11px "IBM Plex Sans"';
    ctx.fillText(`${title}   USA`, 20, 50);
  }

  if (form.veteran) {
    ctx.fillStyle = theme.headerInk;
    ctx.font = 'italic 600 11px "Playfair Display", serif';
    ctx.fillText("Veteran", W - 210, 24);
  }

  if (form.compliance === "F") {
    drawRealIdMark(ctx, W - 42, 32, 16, theme);
  } else {
    ctx.strokeStyle = theme.headerInk;
    ctx.lineWidth = 1.2;
    ctx.strokeRect(W - 96, 12, 78, 36);
    ctx.fillStyle = theme.headerInk;
    ctx.font = '700 8px "IBM Plex Sans"';
    ctx.textAlign = "center";
    ctx.fillText("NOT FOR", W - 57, 26);
    ctx.fillText("FEDERAL ID", W - 57, 38);
    ctx.textAlign = "left";
  }
}

function drawPhotoFrame(
  ctx: CanvasRenderingContext2D,
  box: { x: number; y: number; w: number; h: number },
  opts: CardDrawOptions,
  theme: CardTheme,
) {
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(box.x - 3, box.y - 3, box.w + 6, box.h + 6);
  ctx.save();
  ctx.beginPath();
  ctx.rect(box.x, box.y, box.w, box.h);
  ctx.clip();
  if (opts.assets.portrait) {
    coverImage(ctx, opts.assets.portrait, box.x, box.y, box.w, box.h);
  } else {
    drawFallbackPortrait(ctx, box.x, box.y, box.w, box.h, opts.form.sex);
  }
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = '700 28px "IBM Plex Sans"';
  ctx.fillText(dobMonogram(opts.form.dob), box.x + 10, box.y + box.h - 14);
  ctx.restore();

  ctx.save();
  ctx.fillStyle = mix(theme.header, "#ffffff", 0.15);
  ctx.fillRect(box.x - 16, box.y, 14, box.h);
  ctx.translate(box.x - 5, box.y + box.h - 8);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = '700 9px "IBM Plex Sans"';
  ctx.fillText("SPECIMEN  SPECIMEN  SPECIMEN  SPECIMEN", 0, 0);
  ctx.restore();

  ctx.strokeStyle = mix(theme.header, "#000000", 0.25);
  ctx.lineWidth = 1;
  ctx.strokeRect(box.x, box.y, box.w, box.h);
}

function drawAamvaFields(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  form: LicenseForm,
  theme: CardTheme,
  compact: boolean,
  W: number,
) {
  const family = form.familyName.trim().toUpperCase() || "—";
  const given = [form.firstName, form.middleName === "NONE" ? "" : form.middleName, form.suffix]
    .map((s) => s.trim())
    .filter(Boolean)
    .join(" ")
    .toUpperCase();
  const street = form.street.trim().toUpperCase();
  const cityLine = `${form.city.trim().toUpperCase()}, ${form.jurisdictionCode}  ${displayZip(form.postal)}`;
  const col2 = compact ? x : x + 290;

  field(ctx, x, y, "4d", compact ? "DL" : "DLN", form.licenseNumber.toUpperCase(), theme, '700 20px "IBM Plex Mono"');
  field(ctx, col2, y, "4b", "EXP", displayDate(form.expDate), theme, '700 16px "IBM Plex Sans"', theme.expColor);
  field(ctx, x, y + 36, "3", "DOB", displayDate(form.dob), theme, '700 15px "IBM Plex Sans"');
  field(ctx, x, y + 72, "1", "LN", family, theme, '700 20px "IBM Plex Sans"');
  field(ctx, x, y + 108, "2", "FN", given || "—", theme, '600 14px "IBM Plex Sans"');
  field(ctx, x, y + 146, "8", "ADD", street, theme, '500 13px "IBM Plex Sans"');
  ctx.fillStyle = theme.ink;
  ctx.font = '500 13px "IBM Plex Sans"';
  ctx.fillText(cityLine, x, y + 164);

  field(ctx, x, y + 190, "9", "CLASS", (form.vehicleClass || "NONE").toUpperCase(), theme, '700 13px "IBM Plex Sans"');
  field(ctx, x + 90, y + 190, "9a", "END", (form.endorsements || "NONE").toUpperCase(), theme, '700 13px "IBM Plex Sans"');
  field(ctx, x + 200, y + 190, "12", "REST", (form.restrictions || "NONE").toUpperCase(), theme, '700 13px "IBM Plex Sans"');

  field(ctx, x, y + 226, "4a", "ISS", displayDate(form.issueDate), theme, '600 13px "IBM Plex Sans"');
  field(ctx, x + 150, y + 226, "5", "DD", form.discriminator, theme, '500 11px "IBM Plex Mono"');

  field(ctx, x, y + 262, "15", "SEX", displaySex(form.sex), theme, '700 13px "IBM Plex Sans"');
  field(ctx, x + 70, y + 262, "16", "HGT", displayHeight(form.height), theme, '700 13px "IBM Plex Sans"');
  field(ctx, x + 170, y + 262, "17", "WGT", form.weightLbs ? `${form.weightLbs} lb` : "—", theme, '700 13px "IBM Plex Sans"');
  field(ctx, x + 270, y + 262, "18", "EYES", form.eyes, theme, '700 13px "IBM Plex Sans"');
  field(ctx, x + 360, y + 262, "19", "HAIR", form.hair, theme, '700 13px "IBM Plex Sans"');

  if (form.organDonor) {
    ctx.fillStyle = theme.expColor;
    ctx.beginPath();
    const hx = compact ? x + 200 : W - 210;
    const hy = y + 48;
    ctx.moveTo(hx, hy);
    ctx.bezierCurveTo(hx, hy - 8, hx - 12, hy - 8, hx - 12, hy);
    ctx.bezierCurveTo(hx - 12, hy + 10, hx, hy + 16, hx, hy + 22);
    ctx.bezierCurveTo(hx, hy + 16, hx + 12, hy + 10, hx + 12, hy);
    ctx.bezierCurveTo(hx + 12, hy - 8, hx, hy - 8, hx, hy);
    ctx.fill();
    ctx.fillStyle = theme.muted;
    ctx.font = '600 8px "IBM Plex Sans"';
    ctx.fillText("ORGAN DONOR", hx + 16, hy + 8);
  }
}

function field(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  num: string,
  lab: string,
  value: string,
  theme: CardTheme,
  font: string,
  color?: string,
) {
  ctx.fillStyle = theme.muted;
  ctx.font = '600 8px "IBM Plex Sans"';
  ctx.fillText(`${num}  ${lab}`, x, y);
  ctx.fillStyle = color ?? theme.ink;
  ctx.font = font;
  ctx.fillText(value, x, y + 16);
}

function dobMonogram(iso: string): string {
  const p = parseIsoDate(iso);
  if (!p) return "";
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const m = months[Number.parseInt(p.m, 10) - 1] ?? p.m;
  return `${m} ${p.y.slice(2)}`;
}

function drawRosetteGhost(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  opts: CardDrawOptions,
  theme: CardTheme,
) {
  ctx.save();
  ctx.globalAlpha = 0.22;
  ctx.strokeStyle = theme.header;
  ctx.lineWidth = 0.8;
  for (let i = 6; i < r; i += 7) {
    ctx.beginPath();
    ctx.arc(cx, cy, i, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.72, 0, Math.PI * 2);
  ctx.clip();
  if (opts.assets.portrait) {
    ctx.filter = "grayscale(1) contrast(1.15)";
    ctx.globalAlpha = 0.55;
    coverImage(ctx, opts.assets.portrait, cx - r * 0.7, cy - r * 0.9, r * 1.4, r * 1.8);
  }
  ctx.restore();
}


function drawGhost(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  opts: CardDrawOptions,
) {
  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  if (opts.assets.portrait) {
    ctx.filter = "grayscale(1) contrast(1.2)";
    coverImage(ctx, opts.assets.portrait, x, y, w, h);
  }
  ctx.restore();
}

function drawIdentity(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  form: LicenseForm,
  theme: CardTheme,
  compact: boolean,
) {
  const family = form.familyName.trim().toUpperCase() || "—";
  const given = [form.firstName, form.middleName === "NONE" ? "" : form.middleName, form.suffix]
    .map((s) => s.trim())
    .filter(Boolean)
    .join(" ")
    .toUpperCase();
  const cityLine = `${form.city.trim().toUpperCase()}, ${form.jurisdictionCode}  ${displayZip(form.postal)}`;
  const row = compact ? 44 : 40;

  stacked(ctx, x, y, compact ? "DLN" : "DL", form.licenseNumber.toUpperCase() || "—", theme, {
    font: '700 20px "IBM Plex Mono"',
  });
  stacked(ctx, x, y + row, compact ? "LN" : "LN", family, theme, { font: '700 22px "IBM Plex Sans"' });
  stacked(ctx, x, y + row * 2, compact ? "FN" : "FN", given || "—", theme, { font: '600 15px "IBM Plex Sans"' });
  stacked(ctx, x, y + row * 3, "ADD", form.street.trim().toUpperCase() || "—", theme, {
    font: '500 13px "IBM Plex Sans"',
  });
  ctx.fillStyle = theme.ink;
  ctx.font = '500 13px "IBM Plex Sans"';
  const addY = y + row * 3 + (form.street2.trim() ? 36 : 22);
  if (form.street2.trim()) {
    ctx.fillText(form.street2.trim().toUpperCase(), x, y + row * 3 + 22);
  }
  ctx.fillText(cityLine, x, addY);
}

function stacked(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  lab: string,
  value: string,
  theme: CardTheme,
  opts?: { font?: string; color?: string },
) {
  label(ctx, x, y, lab, theme);
  ctx.fillStyle = opts?.color ?? theme.ink;
  ctx.font = opts?.font ?? '700 16px "IBM Plex Sans"';
  ctx.fillText(value, x, y + 18);
}

function drawFacts(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  form: LicenseForm,
  theme: CardTheme,
  compact: boolean,
) {
  const cols: [string, string, string?][] = [
    ["DOB", displayDate(form.dob)],
    ["EXP", displayDate(form.expDate), theme.accent],
    ["SEX", displaySex(form.sex)],
    ["HGT", displayHeight(form.height)],
    ["EYES", form.eyes],
    ["HAIR", form.hair],
    ["ISS", displayDate(form.issueDate)],
    ["WGT", form.weightLbs ? `${form.weightLbs} lb` : "—"],
  ];
  const gap = compact ? 148 : 124;
  cols.forEach((col, i) => {
    const cx = x + (i % 4) * gap;
    const cy = y + Math.floor(i / 4) * 48;
    stacked(ctx, cx, cy, col[0], col[1], theme, {
      font: '700 14px "IBM Plex Sans"',
      color: col[2],
    });
  });
}

function drawFooter(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  form: LicenseForm,
  theme: CardTheme,
) {
  ctx.fillStyle = mix(theme.header, theme.ground, 0.86);
  roundRect(ctx, x, y, w, 46, 6);
  ctx.fill();
  const items = [
    ["CLASS", form.vehicleClass || "NONE"],
    ["REST", form.restrictions || "NONE"],
    ["END", form.endorsements || "NONE"],
  ];
  items.forEach((item, i) => {
    const cx = x + 14 + i * Math.min(150, w / 3);
    label(ctx, cx, y + 14, item[0], theme);
    ctx.fillStyle = theme.ink;
    ctx.font = '700 13px "IBM Plex Sans"';
    ctx.fillText(item[1].toUpperCase(), cx, y + 34);
  });
  ctx.font = '700 11px "IBM Plex Sans"';
  ctx.textAlign = "right";
  if (form.organDonor) {
    ctx.fillStyle = theme.accent;
    ctx.fillText("DONOR", x + w - 14, y + 20);
  }
  if (form.veteran) {
    ctx.fillStyle = theme.header;
    ctx.fillText("VETERAN", x + w - 14, y + 36);
  }
  ctx.textAlign = "left";
}

function drawSignature(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  opts: CardDrawOptions,
) {
  ctx.strokeStyle = "rgba(18,21,26,0.16)";
  ctx.beginPath();
  ctx.moveTo(x, y + h - 8);
  ctx.lineTo(x + w, y + h - 8);
  ctx.stroke();
  if (opts.assets.signature) {
    ctx.drawImage(opts.assets.signature, x, y - 6, w, h);
  }
  ctx.fillStyle = "rgba(18,21,26,0.4)";
  ctx.font = '8px "IBM Plex Sans"';
  ctx.fillText("SIGNATURE", x, y + h + 6);
}

function label(ctx: CanvasRenderingContext2D, x: number, y: number, text: string, theme: CardTheme) {
  ctx.fillStyle = theme.muted;
  ctx.font = '600 8px "IBM Plex Sans"';
  ctx.fillText(text, x, y);
}

function drawSecurityOverlay(ctx: CanvasRenderingContext2D, W: number, H: number, theme: CardTheme, opts: CardDrawOptions) {
  const form = opts.form;
  const ovd = opts.assets.ovd ?? opts.assets.foil;
  if (ovd) {
    ctx.save();
    ctx.globalAlpha = 0.32;
    ctx.globalCompositeOperation = "overlay";
    ctx.beginPath();
    ctx.ellipse(W - 148, H - 168, 92, 118, -0.12, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(ovd, W - 250, H - 300, 220, 220);
    ctx.restore();
  }
  drawLaserPerf(ctx, W, H, theme);
  ctx.save();
  ctx.fillStyle = mix(theme.header, "#ffffff", 0.7);
  ctx.font = '6px "IBM Plex Mono"';
  const micro = `SPECIMEN ${form.jurisdictionCode} ${theme.generation.toUpperCase()} ${form.licenseNumber.toUpperCase()} `;
  ctx.globalAlpha = 0.5;
  ctx.fillText(micro.repeat(18), 8, H - 8);
  ctx.fillText(micro.repeat(18), 8, 86);
  ctx.restore();
  drawWatermark(ctx, W, H, 0.09);
}

function drawOviStrip(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, assets: CardAssets) {
  const src = assets.ovi ?? assets.foil;
  if (src) {
    ctx.save();
    ctx.globalAlpha = 0.88;
    ctx.drawImage(src, 0, src.height * 0.35, src.width, src.height * 0.18, x, y, w, h);
    ctx.restore();
    return;
  }
  const g = ctx.createLinearGradient(x, y, x + w, y);
  g.addColorStop(0, "#6ee7f2");
  g.addColorStop(0.35, "#f5d06f");
  g.addColorStop(0.7, "#e879f9");
  g.addColorStop(1, "#67e8f9");
  ctx.fillStyle = g;
  ctx.fillRect(x, y, w, h);
}

function drawLaserPerf(ctx: CanvasRenderingContext2D, W: number, H: number, theme: CardTheme) {
  ctx.save();
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  const n = 56;
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const x = W - 16 - Math.sin(t * Math.PI * 2 + seedFrom(theme.code)) * 5;
    const y = 88 + t * (H - 150);
    ctx.beginPath();
    ctx.arc(x, y, 1.05, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawWatermark(ctx: CanvasRenderingContext2D, W: number, H: number, alpha: number) {
  ctx.save();
  ctx.translate(W / 2, H / 2);
  ctx.rotate(-Math.PI / 5);
  ctx.fillStyle = `rgba(180, 28, 28, ${alpha})`;
  ctx.font = '700 64px "IBM Plex Sans"';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("SPECIMEN", 0, -18);
  ctx.font = '600 18px "IBM Plex Sans"';
  ctx.fillText("NOT A GOVERNMENT DOCUMENT", 0, 28);
  ctx.restore();
}

function drawGuilloche(ctx: CanvasRenderingContext2D, W: number, H: number, theme: CardTheme, seed: number) {
  ctx.save();
  ctx.globalAlpha = 0.16;
  ctx.strokeStyle = theme.header;
  ctx.lineWidth = 0.7;
  for (let i = 0; i < 22; i++) {
    ctx.beginPath();
    for (let x = 0; x <= W; x += 4) {
      const y =
        H * 0.52 +
        Math.sin(x * 0.018 + i * 0.45 + seed) * (28 + (i % 7) * 4) +
        Math.sin(x * 0.041 + i * 0.9) * 16;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.strokeStyle = theme.accent;
  ctx.globalAlpha = 0.1;
  for (let i = 0; i < 10; i++) {
    ctx.beginPath();
    ctx.ellipse(W * 0.72, H * 0.58, 80 + i * 14, 46 + i * 8, -0.4, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

function drawSeal(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, theme: CardTheme) {
  ctx.save();
  ctx.globalAlpha = 0.22;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = theme.gold;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = theme.header;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, r - 8, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = theme.header;
  ctx.font = `700 ${Math.round(r * 0.42)}px "IBM Plex Sans"`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(theme.code, cx, cy - 2);
  ctx.globalAlpha = 0.18;
  drawMotif(ctx, theme.motif, cx, cy + r + 18, 16, theme);
  ctx.restore();
}

function drawMotif(ctx: CanvasRenderingContext2D, motif: Motif, x: number, y: number, s: number, theme: CardTheme) {
  ctx.fillStyle = theme.header;
  ctx.strokeStyle = theme.header;
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  switch (motif) {
    case "star":
      starPath(ctx, x, y, 5, s, s / 2.4);
      ctx.fill();
      break;
    case "sun":
      ctx.arc(x, y, s * 0.45, 0, Math.PI * 2);
      ctx.fill();
      break;
    case "zia":
      ctx.moveTo(x - s, y);
      ctx.lineTo(x + s, y);
      ctx.moveTo(x, y - s);
      ctx.lineTo(x, y + s);
      ctx.stroke();
      break;
    case "anchor":
      ctx.moveTo(x, y - s);
      ctx.lineTo(x, y + s * 0.6);
      ctx.moveTo(x - s * 0.6, y + s * 0.6);
      ctx.quadraticCurveTo(x, y + s, x + s * 0.6, y + s * 0.6);
      ctx.stroke();
      break;
    case "keystone":
      ctx.moveTo(x - s * 0.5, y - s);
      ctx.lineTo(x + s * 0.5, y - s);
      ctx.lineTo(x + s, y + s);
      ctx.lineTo(x - s, y + s);
      ctx.closePath();
      ctx.fill();
      break;
    default:
      ctx.arc(x, y, s * 0.35, 0, Math.PI * 2);
      ctx.fill();
  }
}

function drawRealIdMark(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, theme?: CardTheme) {
  ctx.save();
  ctx.beginPath();
  if (theme?.realId === "star-bear") {
    ctx.ellipse(cx, cy, r * 1.15, r * 0.95, 0, 0, Math.PI * 2);
  } else {
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
  }
  ctx.fillStyle = theme?.gold ?? "#C4A35A";
  ctx.fill();
  ctx.lineWidth = 1.4;
  ctx.strokeStyle = "#F6F3EB";
  ctx.stroke();
  if (theme?.realId === "star-bear") {
    ctx.beginPath();
    ctx.arc(cx - r * 0.7, cy - r * 0.7, r * 0.32, 0, Math.PI * 2);
    ctx.arc(cx + r * 0.7, cy - r * 0.7, r * 0.32, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = "#1A2744";
  starPath(ctx, cx, cy + (theme?.realId === "star-bear" ? 2 : 0), 5, r * 0.55, r * 0.24);
  ctx.fill();
  ctx.restore();
}

function starPath(ctx: CanvasRenderingContext2D, cx: number, cy: number, points: number, outer: number, inner: number) {
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const ang = (i * Math.PI) / points - Math.PI / 2;
    const r = i % 2 === 0 ? outer : inner;
    const x = cx + Math.cos(ang) * r;
    const y = cy + Math.sin(ang) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

function coverImage(
  ctx: CanvasRenderingContext2D,
  img: CanvasImageSource & { width: number; height: number },
  x: number,
  y: number,
  w: number,
  h: number,
) {
  const iw = img.width;
  const ih = img.height;
  const ir = iw / ih;
  const r = w / h;
  let dw = w;
  let dh = h;
  let dx = x;
  let dy = y;
  if (ir > r) {
    dw = h * ir;
    dx = x - (dw - w) / 2;
  } else {
    dh = w / ir;
    dy = y - (dh - h) / 2;
  }
  ctx.drawImage(img, dx, dy, dw, dh);
}

function mix(a: string, b: string, t: number): string {
  const pa = hexToRgb(a);
  const pb = hexToRgb(b);
  const r = Math.round(pa[0] + (pb[0] - pa[0]) * t);
  const g = Math.round(pa[1] + (pb[1] - pa[1]) * t);
  const bl = Math.round(pa[2] + (pb[2] - pa[2]) * t);
  return `rgb(${r},${g},${bl})`;
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  if (h.length === 3) {
    return [parseInt(h[0] + h[0], 16), parseInt(h[1] + h[1], 16), parseInt(h[2] + h[2], 16)];
  }
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxW: number,
  lineH: number,
) {
  const words = text.split(" ");
  let line = "";
  let yy = y;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxW) {
      ctx.fillText(line, x, yy);
      line = word;
      yy += lineH;
    } else line = test;
  }
  if (line) ctx.fillText(line, x, yy);
}
