export type Pdf417Options = {
  columns: number;
  ecLevel: number;
  compact: boolean;
  scale?: number;
  backgroundcolor?: string;
  barcolor?: string;
};

type BwipModule = {
  toCanvas: (
    canvas: HTMLCanvasElement,
    opts: Record<string, unknown>,
  ) => Promise<HTMLCanvasElement> | HTMLCanvasElement;
  toSVG: (opts: Record<string, unknown>) => string;
};

async function loadBwip(): Promise<BwipModule> {
  const mod = await import("bwip-js/browser");
  return (mod.default ?? mod) as unknown as BwipModule;
}

function pdf417Opts(text: string, opts: Pdf417Options) {
  return {
    bcid: opts.compact ? "pdf417compact" : "pdf417",
    text,
    columns: opts.columns,
    securitylevel: opts.ecLevel,
    scale: opts.scale ?? 4,
    rowmult: 4,
    padding: 12,
    binarytext: true,
    parse: false,
    backgroundcolor: opts.backgroundcolor ?? "F4F1EA",
    barcolor: opts.barcolor ?? "0B0C0E",
  };
}

export async function renderPdf417(
  canvas: HTMLCanvasElement,
  text: string,
  opts: Pdf417Options,
): Promise<void> {
  const bwipjs = await loadBwip();
  await bwipjs.toCanvas(canvas, pdf417Opts(text, opts));
}

export async function renderCode128(canvas: HTMLCanvasElement, text: string, height = 14): Promise<void> {
  const bwipjs = await loadBwip();
  await bwipjs.toCanvas(canvas, {
    bcid: "code128",
    text,
    scale: 2,
    height,
    includetext: false,
    padding: 0,
    backgroundcolor: "FFFFFF",
    barcolor: "000000",
  });
}

export async function renderQr(canvas: HTMLCanvasElement, text: string): Promise<void> {
  const bwipjs = await loadBwip();
  await bwipjs.toCanvas(canvas, {
    bcid: "qrcode",
    text,
    scale: 3,
    padding: 10,
    eclevel: "M",
    binarytext: true,
    parse: false,
    backgroundcolor: "F4F1EA",
    barcolor: "0B0C0E",
  });
}

export async function pdf417Svg(text: string, opts: Pdf417Options): Promise<string> {
  const bwipjs = await loadBwip();
  return bwipjs.toSVG(pdf417Opts(text, opts));
}

export async function decodePdf417Canvas(canvas: HTMLCanvasElement): Promise<string | null> {
  try {
    const zxingMod = await import("@zxing/library");
    const zxing = ((zxingMod as { default?: unknown }).default ?? zxingMod) as {
      PDF417Reader: new () => { decode: (bitmap: unknown, hints?: unknown) => { getText: () => string } };
      BinaryBitmap: new (binarizer: unknown) => unknown;
      HybridBinarizer: new (source: unknown) => unknown;
      RGBLuminanceSource: new (pixels: Uint8ClampedArray, w: number, h: number) => unknown;
      DecodeHintType: { TRY_HARDER: unknown; POSSIBLE_FORMATS: unknown; CHARACTER_SET: unknown };
      BarcodeFormat: { PDF_417: unknown };
    };
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const { width, height } = canvas;
    if (!width || !height) return null;
    const img = ctx.getImageData(0, 0, width, height);
    const luminances = new Uint8ClampedArray(width * height);
    for (let i = 0; i < width * height; i++) {
      const o = i * 4;
      luminances[i] = (img.data[o] * 299 + img.data[o + 1] * 587 + img.data[o + 2] * 114) / 1000;
    }
    const source = new zxing.RGBLuminanceSource(luminances, width, height);
    const bitmap = new zxing.BinaryBitmap(new zxing.HybridBinarizer(source));
    const reader = new zxing.PDF417Reader();
    const hints = new Map();
    hints.set(zxing.DecodeHintType.TRY_HARDER, true);
    hints.set(zxing.DecodeHintType.POSSIBLE_FORMATS, [zxing.BarcodeFormat.PDF_417]);
    hints.set(zxing.DecodeHintType.CHARACTER_SET, "ISO-8859-1");
    return reader.decode(bitmap, hints).getText();
  } catch {
    return null;
  }
}

export function downloadCanvas(canvas: HTMLCanvasElement, filename: string) {
  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/png");
  a.download = filename;
  a.click();
}

export function downloadText(text: string, filename: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

export function downloadSvg(svg: string, filename: string) {
  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}
